/// <reference path='../../../angular/ts/extendedViewModels/loan.extendedViewModel.ts' />
/// <reference path='../../../angular/ts/extendedViewModels/loanApplication.extendedViewModel.ts' />
/// <reference path='loanApplication.viewModel.ts' />
/// <reference path='loanfinancialInfo.viewModel.ts' />
/// <reference path='property.viewModel.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var consumersite;
(function (consumersite) {
    var vm;
    (function (vm) {
        (function (CreditStatusEnum) {
            CreditStatusEnum[CreditStatusEnum["None"] = 0] = "None";
            CreditStatusEnum[CreditStatusEnum["NotInitiated"] = 1] = "NotInitiated";
            CreditStatusEnum[CreditStatusEnum["InProgress"] = 2] = "InProgress";
            CreditStatusEnum[CreditStatusEnum["CompletedSuccess"] = 3] = "CompletedSuccess";
            CreditStatusEnum[CreditStatusEnum["CompletedError"] = 4] = "CompletedError";
        })(vm.CreditStatusEnum || (vm.CreditStatusEnum = {}));
        var CreditStatusEnum = vm.CreditStatusEnum;
        var Loan = (function (_super) {
            __extends(Loan, _super);
            //private _pricingFilter: consumersite.PricingFilterViewModel;
            function Loan(applicationData, loanVM, $filter) {
                var _this = this;
                _super.call(this, applicationData);
                this.isAppraisalReadyToView = false;
                this.getTransactionInfoRef = function () {
                    return _this.getLoan().getTransactionInfoRef();
                };
                this.getSubjectProperty = function () {
                    return _this.getLoan().getSubjectProperty();
                };
                this.getLoanApplications = function () {
                    return _this.getLoan().getLoanApplications();
                };
                this.getdocVaultDocuments = function () {
                    return _this.getLoan().documents.docVaultDocuments;
                };
                this.currentLoan = function () {
                    return _this.getLoan();
                };
                // @todo-cc: Review , fix asynch conflicts between save loan in flight and lock  release
                this._isUserSignedOut = false;
                //
                // @todo-cc: Must be refactored
                //
                this._creditNotify = {};
                this.registerCreditNotify = function (reciever, cb) {
                    _this._creditNotify[reciever] = cb;
                };
                this.notifyCreditStatus = function (creditStatusCd) {
                    for (var item in _this._creditNotify) {
                        var cbx = _this._creditNotify[item];
                        if (!!cbx && cbx instanceof Function) {
                            try {
                                cbx(creditStatusCd);
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                    }
                };
                this.isCreditInitiated = function () {
                    return _this.creditStatusCd > 1 /* NotInitiated */ && _this.creditStatusCd != 4 /* CompletedError */;
                };
                this.isCreditInProgress = function () {
                    return _this.creditStatusCd == 2 /* InProgress */;
                };
                this.isCreditCompleted = function () {
                    return _this.creditStatusCd > 2 /* InProgress */;
                };
                this.isCreditSuccessful = function () {
                    return _this.creditStatusCd == 3 /* CompletedSuccess */;
                };
                this._isFinalSavePending = false;
                this._isFinalSaveCompleted = false;
                // @see BindLeadSourceToLoan API
                this.bindLeadSourceToLoan = function (loanClsResp) {
                    // take only what data points are affected
                    // it is OK to stay at object level , use (shallow-copy)
                    // loan
                    var loanClsProp = _this.getLoan();
                    lib.shollowCopyPrimitive(loanClsResp, loanClsProp);
                    // loan financial info
                    var lfiClsResp = loanClsResp.financialInfo;
                    var lfiClsProp = loanClsProp.financialInfo;
                    lib.shollowCopyPrimitive(lfiClsResp, lfiClsProp);
                    // loan application ; first and only first
                    var loanAppClsResp = loanClsResp.transactionInfo.loanApplications[0];
                    var loanAppClsProp = loanClsProp.transactionInfo.loanApplications[0];
                    lib.shollowCopyPrimitive(loanAppClsResp, loanAppClsProp);
                };
                this.canRunCredit = function () {
                    // @todo-cc: review and harden implementation
                    //      Need to check before save but run after save , this could be better encapsulated ; pre-Save state tuple should be implemented (remove credit specific flags)
                    if (_this.loanApp.creditAuthorizationDate == undefined || _this.loanApp.creditAuthorizationDate == null) {
                        return false;
                    }
                    // Do not run credit more than once
                    if (_this.isCreditDataAvailable) {
                        return false;
                    }
                    // Run only if we have enough data
                    var borrower = _this.getLoan().getLoanApplications()[0].getBorrower();
                    if (!!borrower) {
                        var ssn = borrower.ssn;
                        if (ssn && ssn.length == 9) {
                            return true;
                        }
                    }
                    return false;
                };
                this.constructExisting = function (applicationData, loan) {
                    //
                    // @todo:
                    // Refine object model usage for PropertyViewModel
                    //
                    // Loan
                    _this.getLoan = function () { return loan; };
                    if (!!applicationData) {
                        cls.LoanViewModel["_lookupInfo"] = applicationData.lookup;
                    }
                    // Loan Application ; Loan and LoanApplication have same ID
                    _this.loanApp = new vm.LoanApplication(_this.getApplicationData(), loan.getLoanApplications()[0]);
                    loan.loanId = _this.loanApp.loanApplicationId;
                    // Facade Subject Property
                    _this.property = new vm.Property(_this.getApplicationData(), loan.subjectProperty);
                    // Default interview if neeeded
                    if (!loan.otherInterviewData) {
                        loan.otherInterviewData = new srv.cls.OtherInterviewDataViewModel();
                    }
                    if (!loan.vaInformation) {
                        loan.vaInformation = new srv.cls.VAInformationViewModel();
                    }
                    // Pricing , not too important
                    //this._pricingProduct = null; //todo: populate and tie to underlying loan app...
                };
                this.calculateDesiredLoanAmount = function () {
                    if (_this.loanPurposeType == 1 /* Purchase */) {
                        _this.calculateDesiredLoanAmountPurch();
                    }
                    else {
                        _this.calculateDesiredLoanAmountRefi();
                    }
                };
                this.calculateDesiredLoanAmountPurch = function () {
                    _this.loanAmount = _this.purchasePrice - _this.downPaymentAmount;
                };
                this.calculateDesiredLoanAmountRefi = function () {
                    // "0"; // Do not payoff ; // " ; 1:Do not payoff", " ; 2:Payoff at closing", " ; 3:Payoff and don't close account", " ; 4:Payoff and close account"]
                    var subordinateLienAmt;
                    switch (_this.secondMortgageRefinanceComment) {
                        case "2":
                        case "3":
                        case "4":
                            subordinateLienAmt = _this.outstandingBalance;
                            break;
                        default:
                            subordinateLienAmt = 0;
                            break;
                    }
                    _this.loanAmount = lib.reduceNumeric(function (x, y) { return x + y; }, _this.firstMortgage, _this.cashOutAmount, subordinateLienAmt);
                };
                this._haveDefaultsForPricingBeenSet = false;
                this.setDefaultsForPricing = function () {
                    if (_this._haveDefaultsForPricingBeenSet) {
                        return;
                    }
                    _this.setDefaultsForPricingImpl();
                };
                this.resetDefaultsForPricing = function (loanPurpose) {
                    _this.setDefaultsForPricingImpl(loanPurpose);
                };
                this.setDefaultsForPricingImpl = function (loanPurpose) {
                    //
                    // Convenience variables
                    //
                    var lvm = _this.getLoan();
                    var sp = lvm.getSubjectProperty();
                    var ivw = lvm.otherInterviewData;
                    var fi = lvm.financialInfo;
                    //
                    // COLUMN 1f
                    //
                    // @todo
                    _this.purchasePrice = 300000;
                    _this.downPaymentAmount = 60000;
                    ivw.firstTimeHomebuyer = false;
                    _this.getLoan().incomeVerificationType == 1 /* VAStreamlineCredit */;
                    //Loan Purpose
                    //ng-model="pricingCntrl.loan.loanPurposeType"
                    if (!!loanPurpose) {
                        _this.getLoan().loanPurposeType = loanPurpose;
                    }
                    else {
                        _this.getLoan().loanPurposeType = 2 /* Refinance */;
                    }
                    if (loanPurpose != 1 /* Purchase */) {
                        _this.loanApp.borrower.currentAddress.isSameAsPropertyAddress = true;
                        /// if refinance, the default purchase price should be set to null.
                        /// Task 46192:My Property Info - Orig Purchase Price default value
                        /// zzp, 02/14/2016
                        _this.purchasePrice = null;
                    }
                    //Zip Code
                    //ng-model="pricingCntrl.loan.getLoan().getSubjectProperty().zipCode"
                    sp.zipCode = "90001";
                    //Existing 1st Mortgage
                    //ng-model="pricingCntrl.loan.getLoan().otherInterviewData.firstMortgage"
                    _this.firstMortgage = 300000;
                    //Cash Out
                    //ng-model="pricingCntrl.loan.getLoan().financialInfo.cashOutAmount"
                    _this.cashOutAmount = 0;
                    //Estimated Property Value
                    //ng-model="pricingCntrl.loan.getLoan().getSubjectProperty().currentEstimatedValue"
                    sp.currentEstimatedValue = 400000;
                    sp.ltv = "" + (_this.firstMortgage / sp.currentEstimatedValue) * 100;
                    //Credit Score
                    //ng-model="pricingCntrl.loan.getLoan().otherInterviewData.selectedDecisionScoreRange"
                    ivw.selectedDecisionScoreRange = "4"; // @todo-cc: gotta use the enum for 720-739
                    //
                    // COLUMN 2
                    //
                    //Property Type
                    //ng-model="pricingCntrl.propertyType"
                    sp.propertyType = 1 /* SingleFamily */.toString();
                    //Number of Units
                    //ng-model="pricingCntrl.NumberOfUnits"
                    sp.numberOfUnits = 1;
                    //How is the Home Used?
                    //ng-model="pricingCntrl.homeUseType"
                    _this.getLoan().active.occupancyType = 1 /* PrimaryResidence */;
                    //Taxes & Insurance (Impounds)
                    //ng-model="pricingCntrl.taxType"
                    ivw.selectedImpoundsOption = 0 /* taxesAndInsurance */.toString();
                    //Employment Status
                    //ng-model="pricingCntrl.employmentStatusType"
                    _this.loanApp.borrower.employments[0].employmentType = 1 /* SalariedEmployee */;
                    //
                    // COLUMN 3
                    //
                    //Have a 2nd Mortgage?
                    //ng-model="pricingCntrl.secondMortgageType"
                    ivw.existingSecondMortgage = "0"; // No. // 0:"No" ; 1:"Fixed Rate" ; 2:"Home Equity Line of Credit"
                    //Payoff a 2nd Mortgage?
                    //ng-model="pricingCntrl.payoffSecondMortgageType"
                    _this.secondMortgageRefinanceComment = "1"; // Do not payoff ; // " ; 1:Do not payoff", " ; 2:Payoff at closing", " ; 3:Payoff and don't close account", " ; 4:Payoff and close account"]
                    //HELOC Credit Line Limit
                    //ng-model="pricingCntrl.helocCreditLimit"
                    ivw.maximumCreditLine = 0;
                    //HELOC Balance --or-- 2nd mgtg amt
                    //ng-model="pricingCntrl.helocBalance"
                    _this.outstandingBalance = 0;
                    _this._haveDefaultsForPricingBeenSet = true;
                };
                this.applyIntegrationContactData = function (integrationDataSer) {
                    // one time only
                    if (_this._hasIntegrationContactDataBeenApplied) {
                        return;
                    }
                    else {
                        _this._hasIntegrationContactDataBeenApplied = true;
                    }
                    // parse
                    var customer = _this.parseIntegrationContactData(integrationDataSer);
                    // bind
                    _this.bindIntegrationCustomerData(customer);
                };
                this.parseIntegrationContactData = function (integrationDataSer) {
                    try {
                        if (!integrationDataSer) {
                            return null;
                        }
                        // decode
                        integrationDataSer = integrationDataSer.replace(/\\/gi, "");
                        var integrationDataObj = JSON.parse(integrationDataSer);
                        return integrationDataObj;
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                this.bindIntegrationCustomerData = function (customer) {
                    if (!customer) {
                        return;
                    }
                    // Do loan purpose type first because it restets the loan defaults , we don't want our other stuff to be overwritten
                    if (customer.loanType == 1 /* Refinance */.toString()) {
                        _this.loanPurposeType = 2 /* Refinance */;
                    }
                    else {
                        _this.loanPurposeType = 1 /* Purchase */;
                    }
                    // ICustomer
                    _this.cashOutAmount = 0;
                    _this.downPaymentAmount = 0;
                    if (_this.loanPurposeType == 2 /* Refinance */) {
                        // pricingCntrl.loan.firstMortgage
                        _this.firstMortgage = customer.loanAmount;
                    }
                    else {
                        // pricingCntrl.loan.getLoan().getSubjectProperty().purchasePrice
                        _this.getLoan().getSubjectProperty().purchasePrice = customer.loanAmount;
                    }
                    _this.loanAmount = customer.loanAmount;
                    // IContact
                    _this.bindIntegrationContactData(customer.contact);
                };
                this.bindIntegrationContactData = function (contact) {
                    if (!contact) {
                        return;
                    }
                    // IContact
                    _this.loanApp.borrower.email = contact.email;
                    _this.loanApp.borrower.firstName = contact.firstName;
                    _this.loanApp.borrower.lastName = contact.lastName;
                    _this.loanApp.borrower.preferredPhone = contact.phone;
                };
                //
                // @todo:
                //      Refine object model usage for PropertyViewModel
                //      Get these constructors/constructor-overloads/factories(?) under control
                //          Consider making pricing defaults (and other stuff) explicit , and leverage provider/service/factory for creating loan per various use cases
                //
                if (!!loanVM) {
                    // double-positive is negative , true means don't do it again
                    this._haveDefaultsForPricingBeenSet = true;
                }
                this._hasIntegrationContactDataBeenApplied = false;
                var localLoan = new cls.LoanViewModel(loanVM, $filter);
                this.getLoan = function () { return localLoan; };
                this.financialInfo = new vm.LoanFinancialInfo(this.getApplicationData(), loanVM ? loanVM.financialInfo : new srv.cls.LoanFinancialInfoViewModel());
                // ridiculous ; english language has dissapointed by lack of words to express
                var loanInner = new cls.LoanViewModel();
                this.getLoan()["loan"] = loanInner;
                this.getLoan().enableDigitalDocsCall = true;
                if (!!applicationData) {
                    cls.LoanViewModel["_lookupInfo"] = applicationData.lookup;
                }
                this.loanApp = new vm.LoanApplication(this.getApplicationData(), this.getLoan().getLoanApplications()[0]);
                // Loan and LoanApplication have same ID
                //... if we don't already have one.
                if (!this.loanId) {
                    this.getLoan().loanId = this.loanApp.loanApplicationId;
                }
                // @todo-cc: Review , hard-coded , copy/paste , etc.
                if (!loanVM) {
                    this.getLoan().status = 2;
                    this.getLoan().currentMilestone = 1;
                    this.getLoan().loanNumber = 'Pending';
                    this.getLoan().getLoanApplications()[0].declarations.loanOriginatorSource = 3; // @todo-cc: use enum [<option value="3">By the applicant and submitted via email or the Internet</option>]
                }
                if (loanVM) {
                    this.property = new vm.Property(this.getApplicationData(), this.getLoan().getSubjectProperty());
                    this.loanApp = new vm.LoanApplication(this.getApplicationData(), this.getLoan().active);
                }
                else {
                    var propertyVM = new cls.PropertyViewModel(this.getLoan().getTransactionInfoRef());
                    propertyVM.needPreApproval = true;
                    propertyVM.isSubjectProperty = true;
                    propertyVM.loanId = this.getLoan().loanId;
                    propertyVM.loanApplicationId = this.loanApp.loanApplicationId;
                    propertyVM.PropertyType = "1"; // @todo: USE ENUM
                    this.property = new vm.Property(this.getApplicationData(), propertyVM);
                }
                if (!this.getLoan().otherInterviewData) {
                    this.getLoan().otherInterviewData = new srv.cls.OtherInterviewDataViewModel();
                }
                if (!this.getLoan().vaInformation) {
                    this.getLoan().vaInformation = new srv.cls.VAInformationViewModel();
                }
                this.setDefaultsForPricing();
                //           this._pricingProduct = null; //todo: populate and tie to underlying loan app...
            }
            Object.defineProperty(Loan.prototype, "homeBuyingType", {
                get: function () {
                    return this.getLoan().homeBuyingType ? this.getLoan().homeBuyingType : 0 /* None */;
                },
                //get homeBuyingType(): srv.HomeBuyingTypeEnum {
                //    var res = this.getLoan().homeBuyingType;
                //    if (!res) {
                //        return srv.HomeBuyingTypeEnum.None;
                //    }
                //    return res;
                //}
                set: function (value) {
                    this.getLoan().homeBuyingType = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "hearAboutUs", {
                get: function () {
                    return this.getLoan().hearAboutUs;
                },
                set: function (hearAboutUs) {
                    this.getLoan().hearAboutUs = hearAboutUs;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "leadSource", {
                get: function () {
                    return this.getLoan().leadSource;
                },
                set: function (leadSource) {
                    this.getLoan().leadSource = leadSource;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "callCenterId", {
                get: function () {
                    return this.getLoan().callCenterId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "conciergeId", {
                get: function () {
                    return this.getLoan().conciergeId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "loanId", {
                get: function () {
                    return this.getLoan().loanId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "homeUseType", {
                get: function () {
                    return this.getLoan().active.occupancyType;
                },
                set: function (homeUseType) {
                    this.getLoan().active.occupancyType = homeUseType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "maximumCreditLine", {
                get: function () {
                    return this.getLoan().otherInterviewData.maximumCreditLine;
                },
                set: function (maximumCreditLine) {
                    this.getLoan().otherInterviewData.maximumCreditLine = maximumCreditLine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "firstTimeHomebuyer", {
                get: function () {
                    return this.getLoan().otherInterviewData.firstTimeHomebuyer;
                },
                set: function (firstTimeHomebuyer) {
                    this.getLoan().otherInterviewData.firstTimeHomebuyer = firstTimeHomebuyer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "pricingRequired", {
                get: function () {
                    return this.getLoan().pricingRequired;
                },
                set: function (pricingRequired) {
                    this.getLoan().pricingRequired = pricingRequired;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "isvaLoan", {
                get: function () {
                    return this.getLoan().vaInformation.isvaLoan;
                },
                set: function (isvaLoan) {
                    this.getLoan().vaInformation.isvaLoan = isvaLoan;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "isVaUsedInPast", {
                get: function () {
                    return this.getLoan().vaInformation.isVaUsedInPast;
                },
                set: function (isVaUsedInPast) {
                    this.getLoan().vaInformation.isVaUsedInPast = isVaUsedInPast;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "isCurrentLoanVA", {
                get: function () {
                    return this.getLoan().vaInformation.isCurrentLoanVA;
                },
                set: function (isCurrentLoanVA) {
                    this.getLoan().vaInformation.isCurrentLoanVA = isCurrentLoanVA;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "militaryBranch", {
                get: function () {
                    return this.getLoan().vaInformation.militaryBranch;
                },
                set: function (militaryBranch) {
                    this.getLoan().vaInformation.militaryBranch = militaryBranch;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "controlStatus", {
                get: function () {
                    return this.getLoan().controlStatus;
                },
                set: function (controlStatus) {
                    this.getLoan().controlStatus = controlStatus;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "property", {
                get: function () {
                    return this._property;
                },
                set: function (property) {
                    vm.Property.setSubjectProperty(property, this.getLoan());
                    this._property = property;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "isUserSignedOut", {
                get: function () {
                    return this._isUserSignedOut;
                },
                set: function (isUserSignedOut) {
                    this._isUserSignedOut = isUserSignedOut;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "appraisalOrders", {
                //AppraisalOrders
                get: function () {
                    var loanCls = this.getLoan();
                    return loanCls.appraisalOrders;
                },
                set: function (appraisalOrders) {
                    var loanCls = this.getLoan();
                    loanCls.appraisalOrders = appraisalOrders;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "docusignSigningRoom", {
                get: function () {
                    return this._docusignSigningRoom;
                },
                set: function (val) {
                    this._docusignSigningRoom = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "loanNumber", {
                get: function () {
                    return this.getLoan().loanNumber;
                },
                set: function (val) {
                    this.getLoan().loanNumber = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "firstPayment", {
                get: function () {
                    return this.getLoan().otherInterviewData.firstPayment;
                },
                set: function (firstPayment) {
                    this.getLoan().otherInterviewData.firstPayment = firstPayment;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "selectedDecisionScoreRange", {
                get: function () {
                    return this.getLoan().otherInterviewData.selectedDecisionScoreRange;
                },
                set: function (selectedDecisionScoreRange) {
                    this.getLoan().otherInterviewData.selectedDecisionScoreRange = selectedDecisionScoreRange;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "otherInterviewId", {
                get: function () {
                    return this.getLoan().otherInterviewData.interviewId;
                },
                set: function (otherInterviewId) {
                    this.getLoan().otherInterviewData.interviewId = otherInterviewId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "searchCriteria", {
                get: function () {
                    return this.getLoan().otherInterviewData.searchCriteria;
                },
                set: function (searchCriteria) {
                    this.getLoan().otherInterviewData.searchCriteria = searchCriteria;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "selectedImpoundsOption", {
                get: function () {
                    return this.getLoan().otherInterviewData.selectedImpoundsOption;
                },
                set: function (selectedImpoundsOption) {
                    this.getLoan().otherInterviewData.selectedImpoundsOption = selectedImpoundsOption;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "existingSecondMortgage", {
                get: function () {
                    return this.getLoan().otherInterviewData.existingSecondMortgage;
                },
                set: function (existingSecondMortgage) {
                    this.getLoan().otherInterviewData.existingSecondMortgage = existingSecondMortgage;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "creditStatusCd", {
                get: function () {
                    return this._creditStatusCd;
                },
                set: function (creditStatusCd) {
                    this._creditStatusCd = creditStatusCd;
                    // set the current milestone per the requirements
                    if (creditStatusCd == 3 /* CompletedSuccess */) {
                        this.currentMileStone = (this.homeBuyingType == 2 /* OfferPendingFoundAHouse */ || this.homeBuyingType == 1 /* OfferAccepted */) ? 2 /* Incomplete */ : 4 /* PreApproved */;
                    }
                    this.notifyCreditStatus(creditStatusCd);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "isFinalSavePending", {
                get: function () {
                    return this._isFinalSavePending;
                },
                set: function (isFinalSavePending) {
                    this._isFinalSavePending = isFinalSavePending;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "isFinalSaveCompleted", {
                get: function () {
                    return this._isFinalSaveCompleted;
                },
                set: function (isFinalSaveCompleted) {
                    this._isFinalSaveCompleted = isFinalSaveCompleted;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "isCreditDataAvailable", {
                get: function () {
                    return (!!this.loanApp.borrower.ficoScore && (this.loanApp.borrower.ficoScore.equifax > 0 || this.loanApp.borrower.ficoScore.experian > 0 || this.loanApp.borrower.ficoScore.transunion > 0));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "loanPurposeType", {
                get: function () {
                    return this.getLoan().loanPurposeType;
                },
                set: function (loanPurposeType) {
                    var lvm = this.getLoan();
                    lvm.loanPurposeType = loanPurposeType;
                    // ridiculous ; english language has dissapointed by lack of words to express
                    var lvmInner = lvm["loan"];
                    if (!!lvmInner) {
                        lvmInner.loanPurposeType = loanPurposeType;
                    }
                    // reset defaults for Pricing UI
                    this.resetDefaultsForPricing(loanPurposeType);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "pricingProduct", {
                get: function () {
                    return this._pricingProduct;
                },
                set: function (value) {
                    this._pricingProduct = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "loanAmount", {
                get: function () {
                    return this.getLoan().loanAmount;
                },
                set: function (loanAmount) {
                    this.getLoan().loanAmount = loanAmount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "currentMileStone", {
                get: function () {
                    //
                    //return this.getLoan().currentMilestone;
                    //
                    return this.getLoan().currentMileStoneConsumerSite;
                },
                set: function (currentMileStone) {
                    this.getLoan().currentMilestone = currentMileStone;
                    this.getLoan().currentMileStoneConsumerSite = currentMileStone;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "pageNavigationState", {
                get: function () {
                    return this.getLoan().currentWorkflowState;
                },
                set: function (pageNavigationState) {
                    this.getLoan().currentWorkflowState = pageNavigationState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "downPaymentAmount", {
                //loanAmount
                //purchasePrice
                //downPaymentAmount
                //secondMortgageRefinanceComment
                //firstMortgage
                //cashOutAmount
                //outstandingBalance
                get: function () {
                    var paramnullnum;
                    var downPaymentAmount = this.getLoan().downPaymentAmount(paramnullnum);
                    return downPaymentAmount;
                },
                set: function (downPaymentAmount) {
                    this.getLoan().downPaymentAmount(downPaymentAmount);
                    // @dependency: LoanViewModel::loanAmount ("Desired Loan Amount")
                    this.calculateDesiredLoanAmount();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "purchasePrice", {
                get: function () {
                    return this.property.purchasePrice;
                },
                set: function (purchasePrice) {
                    this.property.purchasePrice = purchasePrice;
                    // @dependency: LoanViewModel::loanAmount ("Desired Loan Amount")
                    this.calculateDesiredLoanAmount();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "firstMortgage", {
                get: function () {
                    return this.getLoan().otherInterviewData.firstMortgage;
                },
                set: function (firstMortgage) {
                    this.getLoan().otherInterviewData.firstMortgage = firstMortgage;
                    // @dependency: LoanViewModel::loanAmount ("Desired Loan Amount")
                    this.calculateDesiredLoanAmount();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "cashOutAmount", {
                get: function () {
                    return this.getLoan().financialInfo.cashOutAmount;
                },
                set: function (cashOutAmount) {
                    this.getLoan().financialInfo.cashOutAmount = cashOutAmount;
                    // @dependency: LoanViewModel::loanAmount ("Desired Loan Amount")
                    this.calculateDesiredLoanAmount();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "downPaymentTypeCode", {
                get: function () {
                    return this.getLoan().financialInfo.downPaymentTypeCode;
                },
                set: function (downPaymentTypeCode) {
                    this.getLoan().financialInfo.downPaymentTypeCode = downPaymentTypeCode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "outstandingBalance", {
                get: function () {
                    return this.getLoan().otherInterviewData.outstandingBalance;
                },
                set: function (outstandingBalance) {
                    this.getLoan().otherInterviewData.outstandingBalance = outstandingBalance;
                    // @dependency: LoanViewModel::loanAmount ("Desired Loan Amount")
                    this.calculateDesiredLoanAmount();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Loan.prototype, "secondMortgageRefinanceComment", {
                get: function () {
                    return this.getLoan().otherInterviewData.secondMortgageRefinanceComment;
                },
                set: function (secondMortgageRefinanceComment) {
                    this.getLoan().otherInterviewData.secondMortgageRefinanceComment = secondMortgageRefinanceComment;
                    // @dependency: LoanViewModel::loanAmount ("Desired Loan Amount")
                    this.calculateDesiredLoanAmount();
                },
                enumerable: true,
                configurable: true
            });
            return Loan;
        })(vm.ViewModelBase);
        vm.Loan = Loan;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
// @todo-cc: Move out
var consumersite;
(function (consumersite) {
    var vm;
    (function (vm) {
        var integrationcontact;
        (function (integrationcontact) {
            (function (LoanType) {
                // static LOAN_TYPE_REFI = "Refinance";
                LoanType[LoanType["Refinance"] = 1] = "Refinance";
                LoanType[LoanType["Purchase"] = 2] = "Purchase";
            })(integrationcontact.LoanType || (integrationcontact.LoanType = {}));
            var LoanType = integrationcontact.LoanType;
            (function (AgentType) {
                AgentType[AgentType["None"] = 0] = "None";
                AgentType[AgentType["HLS"] = 1] = "HLS";
            })(integrationcontact.AgentType || (integrationcontact.AgentType = {}));
            var AgentType = integrationcontact.AgentType;
        })(integrationcontact = vm.integrationcontact || (vm.integrationcontact = {}));
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=loan.viewModel.js.map