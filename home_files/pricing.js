// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
// <reference path="../../../Scripts/typings/underscore/underscore.d.ts" />
// <reference path="../advancedSearch/advancedSearch.service.ts" />
var consumersite;
(function (consumersite) {
    var PricingController = (function () {
        function PricingController(loan, loanAppPageContext, pricingService, navigationService, consumerLoanService, applicationData, mockPricingService, uiBlockWithSpinner, pricingAdvancedSearchService, $uibModal, modalWindowType, pricingResultsSvc, userSelectedProductCategoriesService, templateRoot, modalPopoverFactory, $window, leadSourceService) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.pricingService = pricingService;
            this.navigationService = navigationService;
            this.consumerLoanService = consumerLoanService;
            this.applicationData = applicationData;
            this.mockPricingService = mockPricingService;
            this.uiBlockWithSpinner = uiBlockWithSpinner;
            this.pricingAdvancedSearchService = pricingAdvancedSearchService;
            this.$uibModal = $uibModal;
            this.modalWindowType = modalWindowType;
            this.pricingResultsSvc = pricingResultsSvc;
            this.userSelectedProductCategoriesService = userSelectedProductCategoriesService;
            this.templateRoot = templateRoot;
            this.modalPopoverFactory = modalPopoverFactory;
            this.$window = $window;
            this.leadSourceService = leadSourceService;
            this._products = {};
            this.vf = {
                show30Fixed: true,
                show25Fixed: true,
                show20Fixed: true,
                show15Fixed: true,
                show10Fixed: true,
                show10ARM: true,
                show7ARM: true,
                show5ARM: true,
                show3ARM: true,
                sortField: 'Payment',
                sortDirection: 'ASC',
            };
            //public properties
            this.showAdvancedSearch = false;
            this.showAllOptionsFlyout = false;
            //
            // @todo-cc: Review this tuple , consider defining a class
            //
            this.metricsPricingAPR = { min: 0, avg: 0, max: 0 };
            this.metricsPricingMonthlyPayment = { min: 0, avg: 0, max: 0 };
            this.metricsPricingTotalCost = { min: 0, avg: 0, max: 0 };
            this.comparedId = null;
            this.haveMetricsBeenCalculated = false;
            this.resultsEx = [];
            //parentSlide: boolean = false;
            //parentSlide2: boolean = false;
            //slide: boolean = false;
            //slide2: boolean = false;
            //view filter
            //get vf(): vm.PricingFilterViewModel {
            //    return this.loan.pricingFilter;
            //}
            //set vf(val: vm.PricingFilterViewModel) {
            //    this.loan.pricingFilter = val;
            //}
            //view search
            //get vs(): vm.IPricingAdvancedSearchViewModel {
            //    return this.loan.pricingSearch;
            //}
            //set vs(val: vm.IPricingAdvancedSearchViewModel) {
            //    this.loan.pricingSearch = val;
            //}
            //private showAllOptionsModal = () => {
            //    this.pricingAllOptionsService.doModal(this.loan, this.vf);
            //}
            this.getPricingFilterViewModel = function () {
                _this.vf.minCost = lib.min(_this.products, function (product) { return product.totalLenderCosts; });
                _this.vf.maxCost = lib.max(_this.products, function (product) { return product.totalLenderCosts; });
                _this.vf.minInterest = lib.min(_this.products, function (product) { return product.apr; });
                _this.vf.maxInterest = lib.max(_this.products, function (product) { return product.apr; });
                _this.vf.minPayment = lib.min(_this.products, function (product) { return product.monthlyPayment; });
                _this.vf.maxPayment = lib.max(_this.products, function (product) { return product.monthlyPayment; });
                return _this.vf;
            };
            this.getNumericValue = function (value) {
                var numericValue;
                if (isNaN(Number(value))) {
                    if (value == undefined) {
                        numericValue = 0;
                    }
                    else {
                        var stringValue = value.toString();
                        stringValue = stringValue.replace(',', '');
                        numericValue = Number(stringValue);
                    }
                }
                else {
                    numericValue = value;
                }
                return numericValue;
            };
            this.getProductPricingDetail = function (product) {
                var detail = (product.isShowPriceDetail ? product.productName : '') + ' (' + product.pricePercentage + ' / ' + ((100 - product.pricePercentage) * product.baseLoanAmount) / 100 + ')';
                return detail;
            };
            this.updatePricingFilterViewModel = function (pricingFilterVM) {
                _this.vf = pricingFilterVM;
            };
            this.showSearchModal = function () {
                _this.pricingAdvancedSearchService.openAdvancedSearchModal(_this.loan, _this.applicationData, function (getRates) {
                    if (getRates) {
                        _this.getProducts();
                    }
                });
            };
            this.openIntegrationXmlMenu = function (event, logListItem, logType) {
                var optionUrl = _this.templateRoot + 'consumersite/pricing/integrations-xmloptions.html';
                var detailedClosingCostPopup = _this.modalPopoverFactory.openModalPopover(optionUrl, { getIntegrationItem: _this.getIntegrationItem }, { logListItem: logListItem, logType: logType }, event, {
                    className: 'tooltip-arrow-integration-logs',
                    calculateVerticalPositionFromTopBorder: true,
                    verticalPopupPositionPerHeight: 1,
                    horisontalPopupPositionPerWidth: 0.5
                });
                detailedClosingCostPopup.result.then(function (data) {
                }, function () {
                });
            };
            this.getIntegrationItem = function (itemId, logType) {
                var result = _this.pricingResultsSvc.GetIntegrationLogItem(_this.loan.loanApp.borrower.userAccountId, itemId, logType); //85347, 72436, 'pricing');
            };
            this.toggleDisclaimer = function (showDisclaimer) {
                _this.disclaimersHidden = showDisclaimer;
                window.scrollTo(0, document.body.scrollHeight);
            };
            this.getMyRates = function () {
                _this.products = [];
                _this.showNoProductMessage = false;
                _this._activeFilterButton = "TopPicks";
                _this.loan.pricingRequired = true;
                _this.getProducts();
            };
            this.pricingResultsFull = null;
            this.validateSearchForm = function () {
                if (_this.loanPurposeType == 1 /* Purchase */) {
                    //Purchase Validation
                    //console.log('Purchase Validation');
                    //ZipCode must contain 5 digits
                    var zipCodePurch = _this.loan.property.zipCode;
                    //console.log('zipCodePurch: ' + zipCodePurch);
                    if (zipCodePurch == null || zipCodePurch.length !== 5) {
                        return false;
                    }
                    //Purchase Price must be greater than 0
                    var purchasePrice = _this.loan.property.purchasePrice;
                    //console.log('purchasePrice: ' + purchasePrice);
                    if (purchasePrice == null || purchasePrice <= 0) {
                        return false;
                    }
                    //Downpayment must contain a value
                    var downPaymentAmount = _this.DownPaymentAmount;
                    //console.log('downPaymentAmount: ' + downPaymentAmount);
                    if (downPaymentAmount == null) {
                        return false;
                    }
                }
                else {
                    //Refinance validation
                    //console.log('Refinance Validation');
                    //Estimated Property Value - must be greater than 0
                    var currentEstimatedValue = _this.loan.property.currentEstimatedValue;
                    //console.log('currentEstimatedValue: ' + currentEstimatedValue);
                    if (currentEstimatedValue == null || currentEstimatedValue <= 0) {
                        return false;
                    }
                    //Existing 1st Mortgage - must contain a value
                    var firstMortgage = _this.loan.firstMortgage;
                    //console.log('firstMortgage: ' + firstMortgage);
                    if (firstMortgage == null) {
                        return false;
                    }
                    //Cash Out- must contain a value
                    var cashOutAmount = _this.loan.cashOutAmount;
                    //console.log('cashOutAmount: ' + cashOutAmount);
                    if (cashOutAmount == null) {
                        return false;
                    }
                    //ZipCode must contain 5 digits
                    var zipCodeRefi = _this.subjPropZipCode;
                    //console.log('zipCodeRefi: ' + zipCodeRefi);
                    if (zipCodeRefi == null || zipCodeRefi.length !== 5) {
                        return false;
                    }
                    if (_this.has2nd) {
                        //2nd Mortgage Balance - when displayed, must be greater than 0
                        var helocBalance = _this.helocBalance;
                        //console.log('helocBalance: ' + helocBalance);
                        if (helocBalance == null || helocBalance <= 0) {
                            return false;
                        }
                        if (_this.is2ndHeloc) {
                            //HELOC Credit Line Limit - when displayed, must be greater than 0
                            var helocCreditLimit = _this.helocCreditLimit;
                            //console.log('helocCreditLimit: ' + helocCreditLimit);
                            if (helocCreditLimit == null) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            };
            this.getProducts = function () {
                //Validation
                if (_this.validateSearchForm() == false)
                    return false;
                //
                // @todo: generalize for default values (e.g. (VALUE || LITERAL) == LITERAL )
                //
                _this.productFilter = "TopPicks";
                _this.haveMetricsBeenCalculated = false;
                //Hide the advanced search section if it's open
                if (_this.showAdvancedSearch == true)
                    _this.showAdvancedSearch = false;
                //var lvm = this.loan.getLoan();
                // mapped 
                if ((_this.loan.property.propertyType || "") == "") {
                    _this.loan.property.propertyType = 1; //srv.PropertyTypeEnum.SingleFamily;
                }
                //mapped 
                //lvm.active.occupancyType = srv.PropertyUsageTypeEnum.PrimaryResidence;
                if ((_this.loan.property.occupancyType || 0 /* None */) == 0 /* None */) {
                    _this.loan.property.occupancyType = 1 /* PrimaryResidence */;
                }
                //not mapped 
                if ((_this.loan.loanAmount || 0) == 0) {
                    _this.loan.loanAmount = 500000;
                }
                //removed 
                if ((_this.loan.property.stateName || "") == "") {
                    _this.loan.property.stateName = "CA";
                }
                if ((_this.loan.financialInfo.dti || 0) == 0) {
                    _this.loan.financialInfo.dti = 40;
                }
                if ((_this.loan.property.ltv || "0") == "0") {
                    _this.loan.property.ltv = "80";
                    _this.loan.property.ltv;
                }
                //removed  
                //if ((this.loan.property.purchasePrice || 0) == 0) {
                //    this.loan.property.purchasePrice = this.loan.property.currentEstimatedValue;
                //}
                // removed 
                if ((_this.loan.property.appraisedValue || 0) == 0) {
                    //lvm.getSubjectProperty().appraisedValue = lvm.getSubjectProperty().currentEstimatedValue;
                    _this.loan.property.appraisedValue = 0.00;
                }
                //removed 
                if ((_this.loan.firstPayment || 0) == 0) {
                    _this.loan.firstPayment = 5555;
                }
                //mapped 
                if ((_this.loan.property.numberOfStories || 0) == 0) {
                    _this.loan.property.numberOfStories = 1;
                }
                //mapped but not used....
                if ((_this.loan.property.numberOfUnits || -1) == -1) {
                    _this.loan.property.numberOfUnits = 1;
                }
                if ((_this.loan.property.downPayment || 0) == 0) {
                    _this.loan.property.downPayment = _this.downPaymentAmount;
                }
                //mapped 
                //lvm.getSubjectProperty().OccupancyType = srv.PropertyUsageTypeEnum.PrimaryResidence;
                if ((_this.loan.selectedDecisionScoreRange || "-1") == "-1") {
                    _this.loan.selectedDecisionScoreRange = "0";
                }
                if (!_this.loan.otherInterviewId || _this.loan.otherInterviewId == lib.getEmptyGuid()) {
                    _this.loan.otherInterviewId = util.IdentityGenerator.nextGuid();
                }
                //interview.AddItem(LCX.InterviewQuestions.SearchCriteriaAmortizationType, GetSearchCriteria(loanVm.taOtherInterviewData.SearchCriteria.AmortizationTypeList));
                _this.loan.searchCriteria = new srv.cls.SearchCriteriaViewModel();
                _this.loan.searchCriteria.amortizationTypeList = [new srv.cls.CriteriaDictionaryViewModel(), new srv.cls.CriteriaDictionaryViewModel()];
                _this.loan.searchCriteria.amortizationTypeList[0].value = true;
                _this.loan.searchCriteria.amortizationTypeList[0].name = "Fixed";
                _this.loan.searchCriteria.amortizationTypeList[1].value = true;
                _this.loan.searchCriteria.amortizationTypeList[1].name = "ARM";
                // this.getDefaultLoanTerms(lvm);
                _this.getDefaultLoanTerms(_this.loan);
                _this.loan.loanApp.interviewId = _this.loan.otherInterviewId;
                // lvm.getLoanApplications()[0].getBorrower().userAccount.isOnlineUser = true; // @todo-cc: Does not work on UserAccount Entity , and cannot be used until after email change anyhow
                //
                var loanCls = _this.consumerLoanService.prepareLoanViewModelForSubmit(_this.loan);
                var mock = false; // do not check in as true !!! please.....
                if (mock == true) {
                    _this.getMockPricing();
                }
                if (mock == false) {
                    //this.uiBlockWithSpinner.callWithGears<srv.ILoanViewModel>(() => this.pricingService.getProducts(loanCls).$promise, 'Getting Your Rates', loanData => {
                    _this.uiBlockWithSpinner.callWithGears(function () { return _this.pricingService.getProductsWithLeadSource(loanCls).$promise; }, 'Getting Your Rates', function (loanData) {
                        _this.pricingResultsFull = loanData.pricingResults;
                        //Capture UserAccountId
                        //lvm.getLoanApplications()[0].getBorrower().userAccount.userAccountId = loanData.transactionInfo.borrowers[0].userAccount.userAccountId;
                        _this.loan.loanApp.loanuserAccountId = loanData.transactionInfo.borrowers[0].userAccount.userAccountId;
                        _this.loan.loanApp.loanuserName = loanData.transactionInfo.borrowers[0].userAccount.username;
                        //Transform the Eligible Products from LoanVM to PricingRowVM
                        //
                        var eProducts = loanData.pricingResults.productListViewModel.eligibleProducts;
                        var results = lib.projectAll(eProducts, function (product) { return new consumersite.vm.ProductItem(_this.applicationData, product); });
                        //var results: vm.ProductItem[] = [];
                        //for (var product in eProducts) {
                        //    results.push(new vm.ProductItem(product));
                        //        //{
                        //        //    productId: eProducts[item].productId,
                        //        //    loanAmortizationTerm: eProducts[item].loanAmortizationTerm,
                        //        //    amortizationType: eProducts[item].amortizationType == 1 ? "Fixed" : "ARM",
                        //        //    adjustmentPeriod: eProducts[item].adjustmentPeriod,
                        //        //    titleYears: (eProducts[item].amortizationType == 1 ? eProducts[item].loanAmortizationTerm : eProducts[item].loanAmortizationFixedTerm),
                        //        //    rate: eProducts[item].rate,
                        //        //    apr: eProducts[item].paymentBreakdownModalVM.apr,
                        //        //    monthlyPayment: eProducts[item].paymentBreakdownModalVM.totalMonthlyPayment,
                        //        //    totalLenderCosts: eProducts[item].costDetails.totalLenderCosts,
                        //        //    loanOptionType: eProducts[item].loanOptionType.toString(),
                        //        //    baseLoanAmount: eProducts[item].costDetails.baseLoanAmount,
                        //        //    ufmipAddedToLoan: eProducts[item].costDetails.ufmipAddedToLoan,
                        //        //    usdaFGeeAddedToLoan: eProducts[item].costDetails.usdaGFeeAddedToLoan,
                        //        //    vaffAddedToLoan: eProducts[item].costDetails.vaffAddedToLoan,
                        //        //    lenderCost: eProducts[item].costDetails.lenderCost,
                        //        //    totalLoanAmount: eProducts[item].costDetails.totalLoanAmount,
                        //        //    thirdPartyCosts: eProducts[item].costDetails.thirdPartyCosts,
                        //        //    totalThirdPartyCosts: eProducts[item].costDetails.totalThirdPartyCosts,
                        //        //    reservesCosts: eProducts[item].costDetails.reservesCosts,
                        //        //    totalReserves: eProducts[item].costDetails.totalReserves,
                        //        //    totalEstimatedClosingCosts: eProducts[item].costDetails.totalEstimatedClosingCosts,
                        //        //    reservesAndPrepaids: eProducts[item].costDetails.reservesAndPrepaids,
                        //        //    isLowCost: (eProducts[item].loanOptionType.toString() == "3" || eProducts[item].loanOptionType.toString() == "13" || eProducts[item].loanOptionType.toString() == "14"),
                        //        //    isTopPick: (eProducts[item].loanOptionType.toString() == "10" || eProducts[item].loanOptionType.toString() == "11" || eProducts[item].loanOptionType.toString() == "13" || eProducts[item].loanOptionType.toString() == "14" || eProducts[item].loanOptionType.toString() == "19"),
                        //        //    isLowRateARM: (eProducts[item].loanOptionType.toString() == "6" || eProducts[item].loanOptionType.toString() == "10"),
                        //        //    isPayoffQuickly: (eProducts[item].loanOptionType.toString() == "5" || eProducts[item].loanOptionType.toString() == "9" || eProducts[item].loanOptionType.toString() == "15" || eProducts[item].loanOptionType.toString() == "16"),
                        //        //    isLowFixed: (eProducts[item].loanOptionType.toString() == "1" || eProducts[item].loanOptionType.toString() == "11"),
                        //        //    isNoCost: (eProducts[item].loanOptionType.toString() == "2" || eProducts[item].loanOptionType.toString() == "8"),
                        //        //    compare: false,
                        //        //    //editMode: false
                        //        //});
                        //} 
                        // @todo: Review: Static for now due to some 'this' keyword issue?
                        _this.haveMetricsBeenCalculated = false;
                        _this.resultsEx = results;
                        if (results == null || results.length == 0) {
                            _this._showNoProductMessage = true;
                        }
                        else {
                            _this._showNoProductMessage = false;
                        }
                    });
                }
            };
            this.getDefaultLoanTerms = function (loan) {
                var loanTermValues = ["Loan40yr", "Loan30yr", "Loan25yr", "Loan20yr", "Loan15yr", "Loan10yr", "Loan7yr", "Loan5yr", "Loan4yr", "Loan2yr"];
                loan.searchCriteria = new srv.cls.SearchCriteriaViewModel();
                loan.searchCriteria.loanTermsList = [];
                for (var i = 0; i < loanTermValues.length; i++) {
                    loan.searchCriteria.loanTermsList[i] = new srv.cls.CriteriaDictionaryViewModel();
                    loan.searchCriteria.loanTermsList[i].value = true;
                    loan.searchCriteria.loanTermsList[i].name = loanTermValues[i];
                }
                return loan.searchCriteria.loanTermsList;
            };
            this.selectImage = function (product) {
                product.compare = !product.compare;
                _this._isProductSelected = false;
                for (var i = 0; i < _this.products.length; i++) {
                    if (_this.products[i].compare) {
                        _this._isProductSelected = true;
                        break;
                    }
                }
                return;
                //var productId = product.productId;
                //this._products[productId] = this._products[productId] ? !this._products[productId] : true;
                //var selected = false;
                //for (var key in this._products) {
                //    if (this._products[key]) {
                //        selected = true;
                //        break;
                //    }
                //}            
                //this._isProductSelected = selected;
            };
            this.isImageSelected = function (product) {
                return product.compare;
                //return !!this._products[productId];
            };
            this.openEmailReportModal = function () {
                var theProducts = _this.products;
                var theLoan = _this.loan;
                var theLoanApplicationData = _this.applicationData;
                var sendEmailReportModal = _this.$uibModal.open({
                    templateUrl: _this.templateRoot + 'consumersite/pricing/send-email-report.template.html',
                    controller: function () {
                        return new consumersite.SendEmailReportController(sendEmailReportModal, _this.templateRoot);
                    },
                    controllerAs: 'sendEmailReportCtrl',
                    backdrop: true,
                    //backdropClass: 'noBackdrop',
                    windowClass: 'email-report-flyout'
                });
                sendEmailReportModal.result.then(function (emailFormData) {
                    //var selectedProducts = _.filter(theProducts,(prod) => { return prod.compare==true; });
                    var selectedProducts = [];
                    for (var i = 0; i < theProducts.length; i++) {
                        if (theProducts[i].compare) {
                            selectedProducts.push(theProducts[i]);
                        }
                    }
                    var userSelectedProductCategoriesViewModel = _this.userSelectedProductCategoriesService.createViewModel(theLoan, theLoanApplicationData, emailFormData, selectedProducts);
                    theLoan.loanApp.borrower.firstName = userSelectedProductCategoriesViewModel.firstName;
                    theLoan.loanApp.borrower.lastName = userSelectedProductCategoriesViewModel.lastName;
                    if (!!userSelectedProductCategoriesViewModel.email) {
                        theLoan.loanApp.borrower.userName = userSelectedProductCategoriesViewModel.email;
                    }
                    var loanCls = theLoan.currentLoan();
                    if (!!_this.pricingResultsFull) {
                        loanCls.pricingResults = _this.pricingResultsFull;
                    }
                    else {
                        if (!loanCls.pricingResults) {
                            // IPricingResultsViewModel
                            loanCls.pricingResults = new srv.cls.PricingResultsViewModel();
                        }
                        if (!loanCls.pricingResults.productListViewModel) {
                            // IProductListViewModel
                            loanCls.pricingResults.productListViewModel = new srv.cls.ProductListViewModel();
                        }
                    }
                    loanCls.pricingResults.productListViewModel.eligibleProducts = userSelectedProductCategoriesViewModel.products;
                    _this.consumerLoanService.saveLoanWithPostOper(theLoan, function (loan, data) {
                        _this.saveAndSendUserSelectedProductCategories(userSelectedProductCategoriesViewModel);
                    });
                }, 
                //cancel
                function () {
                });
            };
            this.saveAndSendUserSelectedProductCategories = function (viewModel) {
                viewModel.loanId = _this.loan.loanId;
                //this.commonModalWindowFactory.open({ type: 0, message: 'Saving Comparison PDF ...' });
                _this.pricingResultsSvc.SaveAndSendUserSelectedProductCategories(viewModel).then(function (result) {
                    _this.clearBorrowerEmailForReport();
                    //if (result.data)
                    //    this.commonModalWindowFactory.close('close');
                }, function (error) {
                    _this.clearBorrowerEmailForReport();
                    //this.commonModalWindowFactory.open({ type: 1, message: 'An error occured during saving and sending Comparison PDF.' });
                    console.log("Error:" + JSON.stringify(error));
                });
            };
            this.clearBorrowerEmailForReport = function () {
                _this.loan.loanApp.borrower.userName = "";
            };
            this.getMockPricing = function () {
                var eProducts = _this.mockPricingService.pregetProducts(_this.loan);
                var results = lib.projectAll(eProducts, function (product) { return new consumersite.vm.ProductItem(_this.applicationData, product); });
                // @todo: Review: Static for now due to some 'this' keyword issue?
                _this.haveMetricsBeenCalculated = false;
                _this.resultsEx = results;
                return _this.resultsEx;
            };
            this.getProductMetrics = function (pricingRowViewModels) {
                _this.metricsPricingAPR = _this.calcMetrics(pricingRowViewModels, 'apr', parseFloat);
                _this.metricsPricingMonthlyPayment = _this.calcMetrics(pricingRowViewModels, 'monthlyPayment', parseInt);
                _this.metricsPricingTotalCost = _this.calcMetrics(pricingRowViewModels, 'totalLenderCosts', parseInt);
            };
            this.filterBtnClicked = function (val) {
                if (val == "GetAdvancedFilter") {
                    _this.productFilter = "";
                    _this._activeFilterButton = val;
                }
                else {
                    _this._activeFilterButton = val;
                    _this.productFilter = val;
                }
            };
            this.selectProduct = function (productId) {
                _this.setSelectedRate(productId);
                if (_this.selectedRate != null) {
                    _this.loan.pricingProduct = _this.selectedRate;
                    _this.loan.financialInfo.amortizationType = _this.selectedRate.amortizationType;
                    _this.loan.financialInfo.adjustmentPeriod = _this.selectedRate.adjustmentPeriod;
                    _this.loan.financialInfo.apr = _this.selectedRate.apr;
                    _this.loan.financialInfo.isNoCost = _this.selectedRate.isNoCost;
                    _this.loan.financialInfo.baseInterestRate = _this.selectedRate.rate;
                    _this.loan.financialInfo.monthlyPayment = _this.selectedRate.monthlyPayment;
                    _this.loan.financialInfo.totalCost = _this.selectedRate.totalLenderCosts;
                    _this.loan.financialInfo.term = _this.selectedRate.loanAmortizationTerm;
                    _this.loan.financialInfo.mortgageType = _this.selectedRate.mortgageType;
                    _this.loan.financialInfo.cashOut = _this.cashoutAmount > 0 ? 1 : 0;
                    _this.loan.financialInfo.cashOutAmount = _this.cashoutAmount;
                }
                //this.navigationService.loanLoaded = true;
                //Save and Continue
                //@todo-cc: SEND IN THE PRICE & SAVE SERVICE   
                var invoke = _this.consumerLoanService.invokeMegaLoanPriceAndSavePromise(_this.loan, _this.loan.pricingProduct.productId);
                var callback = _this.consumerLoanService.mergePricedLoanCallback(_this.loan);
                _this.navigationService.startLoanApp(invoke, callback);
            };
            this.getPrepaidInterestPerDay = function (product) {
                var result = product.totalPrepaids / 30;
                return result;
            };
            this.getTargetClosingDate = function (product) {
                var targetClosingDateString = "";
                var today = new Date();
                var targetMonth = today.getMonth() + 1; /// the month is 0 based
                var targetYear = today.getFullYear();
                var todayDate = today.getDate();
                today.setDate(todayDate + 30);
                var targetDay = today.getDate();
                if (targetDay != 31) {
                    if (targetMonth == 11) {
                        targetMonth = 1;
                        targetYear++;
                    }
                    else {
                        targetMonth++;
                    }
                }
                targetClosingDateString = targetMonth.toString() + '/' + targetDay.toString() + '/' + targetYear.toString();
                return targetClosingDateString;
            };
            this.setSelectedRate = function (productId) {
                var found = false;
                for (var i = 0; i <= _this.products.length; i++) {
                    if (_this.products[i].productId === productId) {
                        found = true;
                        _this.selectedRate = _this.products[i];
                        break;
                    }
                }
                if (!found) {
                    _this.selectedRate = null;
                }
            };
            //View Details Flyout
            this.showViewDetailsFlyout = false;
            this._viewDetailsTop = 92;
            this.showViewDetails_Click = function (productId) {
                console.log('here');
                _this.setSelectedRate(productId);
                if (_this.selectedRate != null) {
                    _this._viewDetailsTop = _this.$window.scrollY + 92;
                    _this.showViewDetailsFlyout = true;
                }
            };
            this.hideViewDetails_Click = function () {
                console.log('here2');
                _this.showViewDetailsFlyout = false;
            };
            this.productSortFunction = function (productA, productB) {
                var sortAsc = _this.vf.sortDirection != "DESC";
                switch (_this.vf.sortField) {
                    case "Term":
                        {
                            if (productA.titleYears < productB.titleYears) {
                                return (sortAsc ? -1 : 1);
                            }
                            else {
                                return (sortAsc ? 1 : -1);
                            }
                        }
                        break;
                    case "Rate":
                        {
                            if (productA.apr < productB.apr) {
                                return (sortAsc ? -1 : 1);
                            }
                        }
                        break;
                    case "Payment":
                        {
                            var paymenta = productA.monthlyPayment;
                            var paymentb = productB.monthlyPayment;
                            if (paymenta < paymentb) {
                                return (sortAsc ? -1 : 1);
                            }
                            else {
                                if (paymenta > paymentb) {
                                    return (sortAsc ? 1 : -1);
                                }
                            }
                        }
                        break;
                    default:
                        {
                            if (productA.monthlyPayment < productB.monthlyPayment) {
                                return (sortAsc ? -1 : 1);
                            }
                            else {
                                return (sortAsc ? 1 : -1);
                            }
                        }
                        break;
                }
                return 0;
            };
            this.allOptionsFilter = function (product) {
                if (!_this.vf.show30Fixed && product.amortizationType == 1 /* Fixed */ && product.titleYears == 30) {
                    return false;
                }
                if (!_this.vf.show25Fixed && product.amortizationType == 1 /* Fixed */ && product.titleYears == 25) {
                    return false;
                }
                if (!_this.vf.show20Fixed && product.amortizationType == 1 /* Fixed */ && product.titleYears == 20) {
                    return false;
                }
                if (!_this.vf.show15Fixed && product.amortizationType == 1 /* Fixed */ && product.titleYears == 15) {
                    return false;
                }
                if (!_this.vf.show10Fixed && product.amortizationType == 1 /* Fixed */ && product.titleYears == 10) {
                    return false;
                }
                if (!_this.vf.show10ARM && product.amortizationType == 2 /* ARM */ && product.titleYears == 10) {
                    return false;
                }
                if (!_this.vf.show7ARM && product.amortizationType == 2 /* ARM */ && product.titleYears == 7) {
                    return false;
                }
                if (!_this.vf.show5ARM && product.amortizationType == 2 /* ARM */ && product.titleYears == 5) {
                    return false;
                }
                if (!_this.vf.show3ARM && product.amortizationType == 2 /* ARM */ && product.titleYears == 3) {
                    return false;
                }
                if (_this.vf.maxInterest < product.apr) {
                    return false;
                }
                if (_this.vf.maxPayment < product.monthlyPayment) {
                    return false;
                }
                if (_this.vf.maxCost < product.totalLenderCosts) {
                    return false;
                }
                return true;
            };
            this.productFilterFunction = function (product) {
                //If it doesn't exist, don't filter it.
                if (!angular.isDefined(product.productId)) {
                    return false;
                }
                if (!_this.allOptionsFilter(product)) {
                    return false;
                }
                switch (_this.productFilter) {
                    case "TopPicks":
                        return product.isTopPick;
                    case "LowRateARMs":
                        return product.isLowRateARM;
                    case "PayoffQuickly":
                        return product.isPayoffQuickly;
                    case "LowFixedRates":
                        return product.isLowFixed;
                    case "NoCost":
                        return product.isNoCost;
                    case "AllOptions":
                        return true;
                    case "CompareMyFavorites":
                        return product.compare;
                    default:
                        return true;
                }
            };
            this._showNoProductMessage = false;
            this.clearVAInfomation = function () {
                if (!_this._isVAEligible) {
                    _this.isVAUsedBefore = false;
                    _this.isOnVADisablity = false;
                    _this.militaryBranch = "";
                }
            };
            this.isActiveFilter = function (title) {
                if (_this._activeFilterButton == title.toString()) {
                    return "filter-tile active";
                }
                else {
                    return "filter-tile";
                }
            };
            //AdvancedSearchModal
            this.showAdvancedSearchModal = function () {
                //this.showSearchModal();
                _this.showAdvancedSearch = true;
            };
            this.hideAdvancedSearchModal = function () {
                //this.showSearchModal();
                _this.showAdvancedSearch = false;
            };
            //AllOptionsFlyout
            this.showAllOptionsFlyoutClick = function () {
                //this.showSearchModal();
                _this.showAllOptionsFlyout = true;
            };
            this.hideAllOptionsFlyoutClick = function () {
                //this.showSearchModal();
                _this.showAllOptionsFlyout = false;
            };
            //---------------------------------------
            // Down Payment
            //---------------------------------------
            this.DownPaymentAmount = 60000; // default
            this.DownPaymentPercentage = 20; // default
            this.DownPaymentPercentageRounded = '20 %'; // default
            this.downpaymentAmountUpdate = function () {
                var purchasePrice = _this.loan.property.purchasePrice;
                //console.log('downpaymentAmountUpdate');
                //console.log(purchasePrice);
                //console.log('DownPaymentAmount: ' + this.DownPaymentAmount);
                if (purchasePrice !== 0 && isNaN(_this.DownPaymentAmount) === false) {
                    _this.DownPaymentPercentage = 100.00 * (_this.DownPaymentAmount / purchasePrice);
                    _this.updateDownPaymentPercentageRounded();
                    //console.log('DownPaymentPercentageRounded: ' + this.DownPaymentPercentageRounded);
                    _this.loan.loanAmount = purchasePrice - _this.DownPaymentAmount;
                }
                _this.updateDownPaymentInModel();
                return;
            };
            this.updateDownPaymentInModel = function () {
                _this.loan.property.downPayment = _this.DownPaymentAmount;
            };
            this.downpaymentPercentageUpdate = function () {
                var dp = _this.parseDownPaymentPercentageRounded();
                var purchasePrice = _this.loan.property.purchasePrice;
                if (dp !== 0) {
                    _this.DownPaymentPercentage = dp;
                    if (purchasePrice !== 0 && isNaN(_this.DownPaymentPercentage) === false) {
                        _this.DownPaymentAmount = 0.01 * (_this.DownPaymentPercentage * purchasePrice);
                    }
                }
                else {
                    _this.DownPaymentPercentage = 0;
                    _this.DownPaymentAmount = 0;
                }
                _this.loan.loanAmount = purchasePrice - _this.DownPaymentAmount;
                _this.updateDownPaymentInModel();
            };
            this.formatDownpaymentPercentageUpdate = function () {
                _this.updateDownPaymentPercentageRounded();
            };
            this.loanPurpose = [{ val: 1, text: 'Purchase' }, { val: 2, text: 'Refinance' }];
            this.creditScores = [{ val: 1, text: '720-739' }, { val: 2, text: '740-759' }];
            this._activeFilterButton = "TopPicks";
            this.productFilter = "TopPicks";
            this.loan.setDefaultsForPricing();
            this.getProducts();
            this._isProductSelected = false;
        }
        Object.defineProperty(PricingController.prototype, "leadSourcePhoneNumber", {
            get: function () {
                return this.leadSourceService.getLeadSourcePhoneNumber();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "showAllOptions", {
            get: function () {
                return this.activeFilterButton == "GetAdvancedFilter";
            },
            set: function (val) {
                //read only
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isRefi", {
            get: function () {
                return this.loanPurposeType == 2 /* Refinance */;
            },
            set: function (isRefi) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isPurch", {
            get: function () {
                return this.loanPurposeType == 1 /* Purchase */;
            },
            set: function (isPurch) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "loanPurposeType", {
            get: function () {
                return this.loan.loanPurposeType;
            },
            set: function (loanPurposeType) {
                this.loan.loanPurposeType = loanPurposeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "propertyType", {
            get: function () {
                return this.loan.property.SubjectPropertyType; // ? this.loan.property.propertyType.toString() + '.99' : this.loan.property.propertyType.toString();
                //  return !!this.loan.getLoan().getSubjectProperty().attachmentType ? this.loan.getLoan().getSubjectProperty().propertyType + '.99' : this.loan.getLoan().getSubjectProperty().propertyType;
            },
            set: function (value) {
                this.loan.property.SubjectPropertyType = value;
                //var splittedPropertyValue = value.split('.');
                //if (splittedPropertyValue.length > 1) {
                //    this.loan.property.propertyType = +splittedPropertyValue[0];
                //    this.loan.property.attachmentType = Number(splittedPropertyValue[1]) == 99 ? 2 : Number(splittedPropertyValue[1]); //if it is Condo or PUD selected on Consumer site, set attachment type as Detached!
                //}
                //else {
                //    this.loan.property.propertyType = +value;
                //    this.loan.property.attachmentType = null;
                //}
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "firstMortgage", {
            get: function () {
                return this.loan.firstMortgage;
            },
            set: function (value) {
                var numbericValue = this.getNumericValue(value);
                this.loan.firstMortgage = numbericValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "cashoutAmount", {
            get: function () {
                return this.loan.cashOutAmount;
            },
            set: function (value) {
                var numericValue = this.getNumericValue(value);
                this.loan.cashOutAmount = numericValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "homeUseType", {
            get: function () {
                return this.loan.property.occupancyType;
            },
            set: function (value) {
                this.loan.property.occupancyType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "taxType", {
            get: function () {
                return this.loan.selectedImpoundsOption;
            },
            set: function (taxType) {
                this.loan.selectedImpoundsOption = taxType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "addressWidgetTemplateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/loanapp/templates/address.widget.template-zip-only.html';
            },
            set: function (addressWidgetTemplateUrl) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "subjPropZipCode", {
            get: function () {
                return this.loan.property.zipCode;
            },
            set: function (zipCode) {
                this.loan.property.zipCode = zipCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "subjPropStreetName", {
            get: function () {
                return this.loan.property.streetName;
            },
            set: function (subjPropStreetName) {
                this.loan.property.streetName = subjPropStreetName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "subjPropCityName", {
            get: function () {
                return this.loan.property.cityName;
            },
            set: function (subjPropCityName) {
                this.loan.property.cityName = subjPropCityName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "subjPropStateName", {
            get: function () {
                return this.loan.property.stateName;
            },
            set: function (subjPropStateName) {
                this.loan.property.stateName = subjPropStateName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "employmentStatusType", {
            get: function () {
                var employmentType = this.loan.loanApp.borrower.employments[0].employmentType;
                var employmentTypeStr = employmentType.toString();
                return employmentTypeStr;
            },
            set: function (employmentStatusType) {
                var employmentStatusTypeNum = parseInt(employmentStatusType);
                if (employmentStatusTypeNum != NaN) {
                    this.loan.loanApp.borrower.employments[0].employmentType = employmentStatusTypeNum;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "militaryBranches", {
            get: function () {
                return PricingController.militaryBranches_lookup;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "secondMortgageType", {
            get: function () {
                return this.loan.existingSecondMortgage;
            },
            set: function (secondMortgageType) {
                this.loan.existingSecondMortgage = secondMortgageType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "payoffSecondMortgageType", {
            get: function () {
                return this.loan.secondMortgageRefinanceComment;
            },
            set: function (payoffSecondMortgageType) {
                this.loan.secondMortgageRefinanceComment = payoffSecondMortgageType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "helocCreditLimit", {
            get: function () {
                return this.loan.maximumCreditLine;
            },
            set: function (helocCreditLimit) {
                this.loan.maximumCreditLine = helocCreditLimit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "helocBalance", {
            get: function () {
                return this.loan.outstandingBalance;
            },
            set: function (value) {
                var numericValue = this.getNumericValue(value);
                this.loan.outstandingBalance = numericValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "has2nd", {
            get: function () {
                // secondMortgageType = "0"; // 0:"No" ; 1:"Fixed Rate" ; 2:"Home Equity Line of Credit"
                return this.isRefi && this.secondMortgageType != "0";
            },
            set: function (has2nd) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isFixed2nd", {
            get: function () {
                // secondMortgageType = "0"; // 0:"No" ; 1:"Fixed Rate" ; 2:"Home Equity Line of Credit"
                return this.isRefi && this.secondMortgageType == "1";
            },
            set: function (isFixed2nd) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isFirstTimeHomeBuyer", {
            get: function () {
                return this.loan.firstTimeHomebuyer;
            },
            set: function (isFirstTimeHomeBuyer) {
                this.loan.firstTimeHomebuyer = isFirstTimeHomeBuyer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "is2ndHeloc", {
            get: function () {
                // secondMortgageType = "0"; // 0:"No" ; 1:"Fixed Rate" ; 2:"Home Equity Line of Credit"
                return this.has2nd && this.secondMortgageType == "2";
            },
            set: function (is2ndHeloc) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "is2ndFixed", {
            get: function () {
                // secondMortgageType = "0"; // 0:"No" ; 1:"Fixed Rate" ; 2:"Home Equity Line of Credit"
                return this.has2nd && this.secondMortgageType == "1";
            },
            set: function (is2ndFixed) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "mortgageTypeFHA", {
            get: function () {
                return 1 /* FHA */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "mortgageTypeVA", {
            get: function () {
                return 4 /* VA */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "mortgageTypeUSDA", {
            get: function () {
                return 5 /* USDA */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isProductSelected", {
            get: function () {
                return this._isProductSelected;
            },
            set: function (value) {
                this._isProductSelected = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "pricingIntegrationLogItems", {
            get: function () {
                var items = this.pricingResultsFull.productListViewModel.pricingIntegrationLogItems;
                return items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "closingCorpIntegrationLogItems", {
            get: function () {
                var items = this.pricingResultsFull.productListViewModel.closingCorpIntegrationLogItems;
                return items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "rateTableName", {
            get: function () {
                var item;
                if (this.pricingResultsFull && this.pricingResultsFull.productListViewModel) {
                    item = this.pricingResultsFull.productListViewModel.rateTable;
                }
                else {
                    item = "";
                }
                return item;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "products", {
            get: function () {
                var filtered = this.resultsEx.filter(this.productFilterFunction, this);
                //filtered.sort(this.productSortFunction);
                if (!this.haveMetricsBeenCalculated) {
                    this.getProductMetrics(filtered);
                    this.haveMetricsBeenCalculated = true;
                }
                var skippedProduct = null;
                var filteredForTopPicks = [];
                /// we need to place no-cost product below with-cost product for Toppicks per Mark's specification
                if (filtered != null && filtered.length > 0 && this.productFilter == "TopPicks") {
                    for (var i = 0; i < filtered.length; i++) {
                        if (skippedProduct != null) {
                            filteredForTopPicks.push(filtered[i]);
                            filteredForTopPicks.push(skippedProduct);
                            skippedProduct = null;
                        }
                        else {
                            if (i + 1 < filtered.length && filtered[i + 1] != null) {
                                var currentProduct = filtered[i];
                                var nextProduct = filtered[i + 1];
                                var currentProductLoanType = currentProduct.getloanType(this.applicationData.lookup.amortizationTypes, this.applicationData.lookup.mortgageType);
                                var nextProductLoanType = nextProduct.getloanType(this.applicationData.lookup.amortizationTypes, this.applicationData.lookup.mortgageType);
                                if (currentProduct.titleYears == nextProduct.titleYears && currentProductLoanType == nextProductLoanType && currentProduct.totalEstimatedClosingCosts <= 0) {
                                    skippedProduct = currentProduct;
                                    continue;
                                }
                                else {
                                    filteredForTopPicks.push(filtered[i]);
                                }
                            }
                        }
                    }
                    return filteredForTopPicks;
                }
                return filtered;
            },
            set: function (value) {
                this.resultsEx = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "disclaimersHidden", {
            get: function () {
                return this._disclaimersHidden;
            },
            set: function (value) {
                this._disclaimersHidden = value;
            },
            enumerable: true,
            configurable: true
        });
        PricingController.prototype.calcMetrics = function (array, prop, fn) {
            var values = array.map(function (el) {
                return fn(el[prop]);
            });
            var sum = 0;
            values.forEach(function (item) {
                sum += item;
            });
            return {
                max: Math.max.apply(Math, values),
                min: Math.min.apply(Math, values),
                avg: sum / ((values.length > 0 ? values.length : 1) * 1.)
            };
        };
        Object.defineProperty(PricingController.prototype, "viewDetailsTop", {
            get: function () {
                return this._viewDetailsTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "viewDetailsGovernmentFee", {
            get: function () {
                var fee = 0;
                if (this.selectedRate != null) {
                    if (this.selectedRate.mortgageType == 1 /* FHA */) {
                        fee = this.selectedRate.ufmipAddedToLoan;
                    }
                    if (this.selectedRate.mortgageType == 4 /* VA */) {
                        fee = this.selectedRate.vaffAddedToLoan;
                    }
                    if (this.selectedRate.mortgageType == 5 /* USDA */) {
                        fee = this.selectedRate.usdaGFeeAddedToLoan;
                    }
                }
                return fee;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "viewDetailsGovernmentFeeTypeName", {
            get: function () {
                var feeTypeName = '';
                if (this.selectedRate != null) {
                    if (this.selectedRate.mortgageType == 1 /* FHA */) {
                        feeTypeName = 'Up Front Mortgage Insurance';
                    }
                    if (this.selectedRate.mortgageType == 4 /* VA */) {
                        feeTypeName = 'VA Funding Fee';
                    }
                    if (this.selectedRate.mortgageType == 5 /* USDA */) {
                        feeTypeName = 'USDA Guarantee Fee';
                    }
                }
                return feeTypeName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "productFilter", {
            get: function () {
                return this._productFilter;
            },
            set: function (value) {
                switch (value) {
                    case "AllOptions":
                        break;
                    case "ClearFilter":
                        this._productFilter = "";
                        this.haveMetricsBeenCalculated = false;
                        break;
                    default:
                        this._productFilter = value;
                        this.haveMetricsBeenCalculated = false;
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "purchasePrice", {
            get: function () {
                return this.loan.getSubjectProperty().purchasePrice;
            },
            set: function (value) {
                var numericValue = this.getNumericValue(value);
                this.loan.getSubjectProperty().purchasePrice = numericValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "currentEstimatedValue", {
            get: function () {
                return this.loan.property.currentEstimatedValue;
            },
            set: function (val) {
                var numericValue = this.getNumericValue(val);
                this.loan.property.currentEstimatedValue = numericValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "showGrid", {
            get: function () {
                return (this.products.length > 0); // && (this.state == vm.PricingState.None));
            },
            set: function (value) {
                /// read only
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "showNoProductMessage", {
            get: function () {
                return this._showNoProductMessage;
            },
            set: function (value) {
                this._showNoProductMessage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "showAll", {
            get: function () {
                return (this.showAllFixed && this.showAllARM);
            },
            set: function (value) {
                if (this.showAll != value) {
                    this.showAllFixed = value;
                    this.showAllARM = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "showAllFixed", {
            get: function () {
                return (this.vf.show30Fixed && this.vf.show25Fixed && this.vf.show20Fixed && this.vf.show15Fixed && this.vf.show10Fixed);
            },
            set: function (value) {
                if (this.showAllFixed != value) {
                    this.vf.show30Fixed = value;
                    this.vf.show25Fixed = value;
                    this.vf.show20Fixed = value;
                    this.vf.show15Fixed = value;
                    this.vf.show10Fixed = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show30Fixed", {
            get: function () {
                return this.vf.show30Fixed;
            },
            set: function (value) {
                this.vf.show30Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show25Fixed", {
            get: function () {
                return this.vf.show25Fixed;
            },
            set: function (value) {
                this.vf.show25Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show20Fixed", {
            get: function () {
                return this.vf.show20Fixed;
            },
            set: function (value) {
                this.vf.show20Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show15Fixed", {
            get: function () {
                return this.vf.show15Fixed;
            },
            set: function (value) {
                this.vf.show15Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show10Fixed", {
            get: function () {
                return this.vf.show10Fixed;
            },
            set: function (value) {
                this.vf.show10Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "showAllARM", {
            //
            get: function () {
                return (this.vf.show10ARM && this.vf.show7ARM && this.vf.show5ARM && this.vf.show3ARM);
            },
            set: function (value) {
                if (this.showAllARM != value) {
                    this.vf.show10ARM = value;
                    this.vf.show7ARM = value;
                    this.vf.show5ARM = value;
                    this.vf.show3ARM = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show10ARM", {
            get: function () {
                return this.vf.show10ARM;
            },
            set: function (value) {
                this.vf.show10ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show7ARM", {
            get: function () {
                return this.vf.show7ARM;
            },
            set: function (value) {
                this.vf.show7ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show5ARM", {
            get: function () {
                return this.vf.show5ARM;
            },
            set: function (value) {
                this.vf.show5ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "show3ARM", {
            get: function () {
                return this.vf.show3ARM;
            },
            set: function (value) {
                this.vf.show3ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "sortField", {
            //
            get: function () {
                return this.vf.sortField;
            },
            set: function (value) {
                this.vf.sortField = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "sortDirection", {
            get: function () {
                return this.vf.sortDirection;
            },
            set: function (value) {
                this.vf.sortDirection = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isVAEligible", {
            get: function () {
                this._isVAEligible = this.loan.isvaLoan;
                return this._isVAEligible;
            },
            set: function (value) {
                this.loan.isvaLoan = value;
                this._isVAEligible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isVAUsedBefore", {
            get: function () {
                this._isVAUsedBefore = this.loan.isVaUsedInPast;
                return this._isVAUsedBefore;
            },
            set: function (val) {
                this.loan.isVaUsedInPast = val;
                this._isVAUsedBefore = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "isOnVADisablity", {
            get: function () {
                this._isOnVADisablity = this.loan.isCurrentLoanVA;
                return this._isOnVADisablity;
            },
            set: function (val) {
                this.loan.isCurrentLoanVA = val;
                this._isOnVADisablity = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "militaryBranch", {
            get: function () {
                this._militaryBranch = this.loan.militaryBranch;
                return this._militaryBranch;
            },
            set: function (val) {
                this.loan.militaryBranch = val;
                this._militaryBranch = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "typeImpounds", {
            get: function () {
                return PricingController.lookup_impounds;
            },
            set: function (typeImpounds) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "numberOfUnits", {
            get: function () {
                return this.loan.property.numberOfUnits;
            },
            set: function (value) {
                var valNum = lib.getNumericValue(value);
                this.loan.property.numberOfUnits = valNum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "occupancyType", {
            get: function () {
                return this.loan.property.occupancyType;
            },
            set: function (value) {
                this.loan.property.occupancyType = value;
            },
            enumerable: true,
            configurable: true
        });
        PricingController.prototype.NumberOfUnitTypes = function () {
            return this.applicationData.lookup.numberOfUnits;
        };
        Object.defineProperty(PricingController.prototype, "activeFilterButton", {
            get: function () {
                return this._activeFilterButton;
            },
            set: function (value) {
                this._activeFilterButton = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "occupancyTypeList", {
            get: function () {
                return this.applicationData.lookup.occupancyTypeList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "downPaymentAmount", {
            get: function () {
                return this.DownPaymentAmount;
            },
            set: function (dp) {
                var numericValue = this.getNumericValue(dp);
                this.DownPaymentAmount = numericValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingController.prototype, "downPaymentPercentageRounded", {
            get: function () {
                return this.DownPaymentPercentageRounded;
            },
            set: function (dp) {
                this.DownPaymentPercentageRounded = dp;
            },
            enumerable: true,
            configurable: true
        });
        PricingController.prototype.updateDownPaymentPercentageRounded = function () {
            var dp = this.DownPaymentPercentage;
            var dpRounded = '';
            if (dp) {
                var rounded = Math.round(dp);
                if (rounded.toString().length == 1) {
                    dpRounded = '0' + rounded;
                }
                else {
                    dpRounded = rounded.toString();
                }
            }
            this.downPaymentPercentageRounded = dpRounded + ' %';
        };
        PricingController.prototype.parseDownPaymentPercentageRounded = function () {
            var dp = 0;
            var dpr = this.DownPaymentPercentageRounded;
            //console.log('parseDownPaymentPercentageRounded');
            //console.log(dpr);
            if (dpr) {
                var temp = parseFloat(dpr);
                //console.log(temp);
                if (temp && !isNaN(temp)) {
                    dp = temp;
                }
            }
            return dp;
        };
        PricingController.className = "pricingController";
        PricingController.$inject = [
            'loan',
            'loanAppPageContext',
            'pricingService',
            'navigationService',
            'consumerLoanService',
            'applicationData',
            'mockPricingService',
            'uiBlockWithSpinner',
            'pricingAdvancedSearchService',
            '$uibModal',
            'modalWindowType',
            'pricingResultsSvc',
            'userSelectedProductCategoriesService',
            'templateRoot',
            'modalPopoverFactory',
            '$window',
            'leadSourceService'
        ];
        PricingController.militaryBranches_lookup = [
            { text: 'Army', value: 1 },
            { text: 'Navy', value: 2 },
            { text: 'Marines', value: 3 },
            { text: 'Air Force', value: 4 },
            { text: 'Coast Guard', value: 5 },
            { text: 'Other', value: 6 },
        ];
        //Not happy about this.  Quick fix for release 01/06/16 
        PricingController.lookup_impounds = [
            { text: 'Include in Payment', value: 0 /* taxesAndInsurance */.toString() },
            { text: 'Don\'t Include in Payment.', value: 3 /* noImpound */.toString() },
        ];
        return PricingController;
    })();
    consumersite.PricingController = PricingController;
    moduleRegistration.registerController(consumersite.moduleName, PricingController); //.filter("productFilter", productFilterFunction);   
    var RangedSelection = (function () {
        function RangedSelection() {
        }
        Object.defineProperty(RangedSelection.prototype, "Max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                this._max = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangedSelection.prototype, "Min", {
            get: function () {
                return this._min;
            },
            set: function (value) {
                this._min = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangedSelection.prototype, "Selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                this._selected = value;
            },
            enumerable: true,
            configurable: true
        });
        return RangedSelection;
    })();
    consumersite.RangedSelection = RangedSelection;
    var PricingFilterViewModel = (function () {
        function PricingFilterViewModel() {
        }
        return PricingFilterViewModel;
    })();
    consumersite.PricingFilterViewModel = PricingFilterViewModel;
})(consumersite || (consumersite = {}));
//# sourceMappingURL=pricing.controller.js.map