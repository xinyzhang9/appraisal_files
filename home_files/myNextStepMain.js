/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
/// <reference path='../../providers/ui.navigation.provider.ts' />
/// <reference path='../mynextstep.milestone.ts' />
var consumersite;
(function (consumersite) {
    var MyNextStepMainController = (function () {
        function MyNextStepMainController($state, loan, navigationService, templateRoot, applicationData) {
            var _this = this;
            this.$state = $state;
            this.loan = loan;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.applicationData = applicationData;
            this._contacts = [];
            this.populateMyContacts = function (loan) {
                var displayMyLender = true;
                var contact = null;
                _this.companyProfile = _this.applicationData.companyProfile;
                _this.concierge = _.find(_this.applicationData.companyEmployees.userAccounts, function (employee) { return loan.conciergeId == employee.userAccountId; });
                _this.conciergePhone = "";
                if (_this.concierge != null && _this.concierge.phones != null && _this.concierge.phones.length > 0) {
                    var conciergePhoneWork = _.find(_this.concierge.phones, function (p) { return p.type == "2"; }); // phone number type, work
                    displayMyLender = false;
                    if (conciergePhoneWork != null)
                        _this.conciergePhone = conciergePhoneWork.number;
                    else {
                        var conciergePhoneCell = _.find(_this.concierge.phones, function (p) { return p.type == "1"; }); // phone number type, cell
                        if (conciergePhoneCell != null)
                            _this.conciergePhone = conciergePhoneCell.number;
                    }
                    contact = {
                        fullName: _this.concierge.firstName + " " + _this.concierge.lastName,
                        contactType: "Loan Officer",
                        phone: _this.conciergePhone,
                        email: _this.concierge.emailAddress,
                        isViewable: true
                    };
                    _this._contacts.push(contact);
                }
                _this.processor = _.find(_this.applicationData.companyEmployees.userAccounts, function (employee) { return loan.callCenterId == employee.userAccountId; });
                _this.processorPhone = "";
                if (_this.processor != null && _this.processor.phones != null && _this.processor.phones.length > 0) {
                    var processorPhoneWork = _.find(_this.processor.phones, function (p) { return p.type == "2"; }); // phone number type, work
                    displayMyLender = false;
                    if (processorPhoneWork != null)
                        _this.processorPhone = processorPhoneWork.number;
                    else {
                        var processorPhoneCell = _.find(_this.processor.phones, function (p) { return p.type == "1"; }); // phone number type, cell
                        if (processorPhoneCell != null)
                            _this.processorPhone = processorPhoneCell.number;
                    }
                    contact = {
                        fullName: _this.processor.firstName + " " + _this.processor.lastName,
                        contactType: "Processor",
                        phone: _this.processorPhone,
                        email: _this.processor.emailAddress,
                        isViewable: true
                    };
                    _this._contacts.push(contact);
                }
                displayMyLender = true;
                if (displayMyLender) {
                    contact = {
                        fullName: _this.companyProfile.companyName,
                        contactType: "Lender",
                        phone: _this.companyProfile.companyPhone,
                        email: "",
                        isViewable: true
                    };
                    _this._contacts.push(contact);
                }
            };
            this.getConsumerLoanCenterMileStone = function () {
                return _this._consumerLoanCenterMileStone;
            };
            this.constructEmptyProductItem = function () {
                var emptyProduct = new srv.cls.ProductItemViewModel();
                // IPaymentBreakdownModalViewModel
                emptyProduct.paymentBreakdownModalVM = new srv.cls.PaymentBreakdownModalViewModel();
                // IDetailedClosingCost
                emptyProduct.costDetails = new srv.cls.DetailedClosingCost();
                // number
                emptyProduct.loanOptionType = 0;
                var emptyProductItem = new consumersite.vm.ProductItem(_this.applicationData, emptyProduct);
                return emptyProductItem;
            };
            this.getIconClass = function () {
                return _this.nextState.cssClassName;
            };
            this.getNextStepDisplayName = function () {
                return _this.nextState.navigationDisplayName;
            };
            this.navigateTo = function () {
                _this.navigationService.navigateTo(_this.nextState.stateName);
            };
            //My Action Items
            this.getLoanReviewLink = function () {
                return _this.navigationService.getLoanReviewLink();
            };
            this.canReviewLoan = function () {
                return _this.navigationService.canReviewLoan();
            };
            this.getDisclosuresLink = function () {
                return _this.navigationService.getDisclosuresLink();
            };
            this.canNavigateDisclosures = function () {
                return _this.navigationService.canNavigateDisclosures();
            };
            this.isAppraisalEnabled = function () {
                return _this.navigationService.getEnableAppraisal();
            };
            this.canViewAppraisal = function () {
                return _this.navigationService.canViewAppraisal();
            };
            this.getViewAppraisalLink = function () {
                return _this.navigationService.getAppraisalViewLink();
            };
            this.getAppraisalOrderLink = function () {
                return _this.navigationService.getAppraisalOrderLink();
            };
            this.canNavigateAppraisalOrder = function () {
                return _this.navigationService.canNavigateAppraisalOrder();
            };
            //isAppraisalOrdered = (): boolean => {
            //    return this.navigationService.isAppraisalOrdered();
            //}
            this.getDocUploadLink = function () {
                return _this.navigationService.getDocUploadLink();
            };
            this.canNavigateDocUpload = function () {
                return _this.navigationService.canNavigateDocUpload();
            };
            this.getEConsentSettingsLink = function () {
                return _this.navigationService.getEConsentSettingsLink();
            };
            this.canNavigateEConsentSettings = function () {
                return _this.navigationService.canNavigateEConsentSettings();
            };
            this.getDocReviewLink = function () {
                return _this.navigationService.getDocReviewLink();
            };
            this.canNavigateDocReview = function () {
                return _this.navigationService.canNavigateDocReview();
            };
            this.getLoanCurrentStatus = function (loanSnapshot) {
                var lookupItem = _.find(_this.applicationData.lookup.milestonestatuses, function (item) {
                    return item.value === String(loanSnapshot.currentMilestone);
                });
                // return lookupItem ? lookupItem.text : '';
                return lookupItem ? lookupItem.value : -1;
            };
            //My Contacts
            this.getContacts = function () {
                return _this._contacts;
            };
            this._consumerLoanCenterMileStone = new consumersite.ConsumerLoanCenterMileStone(this.loan.currentMileStone);
            //@TODO: DEV: Temporary to allow the UI not to throw errors if a pricing product hasn't been selected in development.  
            if (!this.loan.pricingProduct) {
                console.log("MyNextStepMainController:: Pricing Null");
                this.loan.pricingProduct = this.constructEmptyProductItem();
            }
            /*    */
            this.populateMyContacts(this.loan);
            this.nextState = this.navigationService.getMyNextStepNavigationState();
        }
        Object.defineProperty(MyNextStepMainController.prototype, "hasNextSteps", {
            //My Next Step Button
            get: function () {
                return this.navigationService.hasMyNextSteps();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "street", {
            //goToMyNextStep = () => {
            //    this.navigationService.navigateToMyNextStep();
            //}
            get: function () {
                return this.loan.property.streetName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "formattedAddress", {
            get: function () {
                if (angular.isDefined(this.city) && angular.isDefined(this.state) && angular.isDefined(this.zipCode)) {
                    return this.city + ", " + this.state + " " + this.zipCode;
                    ;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "city", {
            get: function () {
                return this.loan.property.cityName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "state", {
            get: function () {
                return this.loan.property.stateName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "zipCode", {
            get: function () {
                return this.loan.property.zipCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "loanNumber", {
            get: function () {
                return this.loan.loanNumber;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "interestRate", {
            get: function () {
                return this.loan.financialInfo.baseInterestRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "apr", {
            get: function () {
                return this.loan.financialInfo.apr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "loanAmount", {
            get: function () {
                return this.loan.loanAmount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "downPayment", {
            get: function () {
                return this.loan.downPaymentAmount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "payment", {
            get: function () {
                return this.loan.financialInfo.monthlyPayment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyNextStepMainController.prototype, "breadcrumbArrowPath", {
            get: function () {
                return this.templateRoot + "../content/ConsumerSite/images/breadcrumb-arrow.png";
            },
            enumerable: true,
            configurable: true
        });
        MyNextStepMainController.className = 'myNextStepMainController';
        MyNextStepMainController.controllerAsName = 'myNextStepMainCntrl';
        MyNextStepMainController.$inject = ['$state', 'loan', 'navigationService', 'templateRoot', 'applicationData'];
        return MyNextStepMainController;
    })();
    consumersite.MyNextStepMainController = MyNextStepMainController;
    moduleRegistration.registerController(consumersite.moduleName, MyNextStepMainController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=myNextStepMain.controller.js.map