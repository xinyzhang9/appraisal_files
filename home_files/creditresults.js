/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    /// for testing with MOCK data, 
    /// 1.  uncomment this.populateMockLiabilityViewModels(); in constructor
    /// 2.  uncomment  return this.getMockLiabilityViewModels();
    /// 3.  set isCreditDataAvailable() = true
    var CreditResultsController = (function () {
        function CreditResultsController(loan, loanAppPageContext, applicationData, eConsentModalService, templateRoot, consumerLoanService) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.eConsentModalService = eConsentModalService;
            this.templateRoot = templateRoot;
            this.consumerLoanService = consumerLoanService;
            this.controllerAsName = "creditResultsCntrl";
            this._liabilityViewModels = [];
            this._takenLienPositions = [];
            this.displayNavigation = true;
            this.validationErrors = function (error) {
                _this.isAtLeastOnePropertySelected();
            };
            this.isAtLeastOnePropertySelected = function () {
                _this._showValidationError = !(_this.hasSelectedAnyLoans || _this.isPropertyFreeAndClear || _this.isCustomLienAdded);
                return !_this._showValidationError;
            };
            this.preProcessSaveContinue = function () {
                var canNavigate = _this.isAtLeastOnePropertySelected();
                if (canNavigate) {
                    _this.addCustomLien();
                }
                return canNavigate;
            };
            this.addCustomLien = function () {
                if (_this.isCustomLienAdded) {
                    if (_this.loan.loanApp.borrower.reos.length == 0) {
                        _this._customLien = new cls.LiabilityViewModel(_this.loan.getTransactionInfoRef());
                        _this._customLien.propertyId = _this.loan.property.propertyId;
                        _this._customLien.isUserEntry = true;
                        _this._customLien.isPledged = true;
                        _this._customLien.companyData.companyName = _this.lenderName;
                        _this._customLien.lienPosition = 1 /* First */;
                        _this._customLien.borrowerDebtCommentId = 2 /* PayoffAtClose */;
                        if (_this.customLienMonthlyPayment && _this.customLienMonthlyPayment != '') {
                            _this._customLien.minPayment = parseFloat(_this.customLienMonthlyPayment);
                        }
                    }
                    _this.loan.loanApp.borrower.addLiability(_this._customLien);
                }
            };
            this.notifyCreditStatus = function (status) {
                if (_this.loan.isCreditSuccessful()) {
                    _this.displayNavigation = true;
                }
            };
            //Property Tax
            this.propertyTaxExpense = '';
            this.homeOwnerExpense = '';
            this.floodInsuranceExpense = '';
            this.lenderName = '';
            this.customLienMonthlyPayment = '';
            this.calculateMonthlyExpense = function (inputValue, preferredPayPeriod) {
                if (preferredPayPeriod == String(2 /* Annually */))
                    return Math.round(inputValue / 12 * 10000) / 10000;
                else if (preferredPayPeriod == String(6 /* SemiAnnually */))
                    return Math.round(inputValue / 6 * 10000) / 10000;
                else if (preferredPayPeriod == String(5 /* Quarterly */))
                    return Math.round(inputValue / 3 * 10000) / 10000;
                else
                    return inputValue;
            };
            this.propertyTaxExpenseChanged = function () {
                var propertyTaxExpense = _this.propertyTaxExpense;
                if (propertyTaxExpense && propertyTaxExpense != '') {
                    var inputNumber = parseFloat(propertyTaxExpense);
                    var preferredPayPeriod = _this.subjectProperty.propertyTaxExpense.preferredPayPeriod;
                    var calculatedMonthlyExpense = _this.calculateMonthlyExpense(inputNumber, preferredPayPeriod);
                    _this.subjectProperty.propertyTaxExpense.monthlyAmount = calculatedMonthlyExpense;
                }
                else {
                    _this.subjectProperty.propertyTaxExpense.monthlyAmount = 0;
                }
            };
            this.homeOwnerExpenseChanged = function () {
                var expense = _this.homeOwnerExpense;
                if (expense && expense != '') {
                    var inputNumber = parseFloat(expense);
                    var preferredPayPeriod = _this.subjectProperty.homeOwnerExpense.preferredPayPeriod;
                    var calculatedMonthlyExpense = _this.calculateMonthlyExpense(inputNumber, preferredPayPeriod);
                    _this.subjectProperty.homeOwnerExpense.monthlyAmount = calculatedMonthlyExpense;
                }
                else {
                    _this.subjectProperty.homeOwnerExpense.monthlyAmount = 0;
                }
            };
            this.floodInsuranceExpenseChanged = function () {
                var expense = _this.floodInsuranceExpense;
                if (expense && expense != '') {
                    var inputNumber = parseFloat(expense);
                    var preferredPayPeriod = _this.subjectProperty.floodInsuranceExpense.preferredPayPeriod;
                    var calculatedMonthlyExpense = _this.calculateMonthlyExpense(inputNumber, preferredPayPeriod);
                    _this.subjectProperty.floodInsuranceExpense.monthlyAmount = calculatedMonthlyExpense;
                }
                else {
                    _this.subjectProperty.floodInsuranceExpense.monthlyAmount = 0;
                }
            };
            this.checkFreeAndClearFlag = function (liability) {
                var liens = _this.getBorrowerLiens();
                if (liens != null) {
                    var allocatedSubjProp = lib.findFirst(liens, function (b) { return b.isAllocatedSubjProp; });
                    if (allocatedSubjProp) {
                        _this._isPropertyFreeAndClear = false;
                        _this._hasSelectedAnyLoans = true;
                        _this._showValidationError = false;
                    }
                    else {
                        _this._hasSelectedAnyLoans = false;
                    }
                }
                if (liability.isAllocatedSubjProp) {
                    var propertyId = _this.loan.property.propertyId;
                    liability.propertyId = propertyId;
                }
                else {
                    liability.propertyId = null;
                    liability.lienPosition = null;
                }
                if (liability.lienPosition == 1 /* First */)
                    liability.borrowerDebtCommentId = 2 /* PayoffAtClose */;
                _this.isAtLeastOnePropertySelected();
            };
            this.checkShowPaymentsIncludeOptions = function (libility) {
                // show PaymentsInclude option for first mortgage only
                return (libility.lienPosition == 1);
            };
            this.checkShowPayoffOptions = function (libility) {
                // show payoff option for non first mortgage only
                return (libility.lienPosition > 1);
            };
            this.checkPaymentsIncludeRequired = function (libility) {
                // show payoff option for non first mortgage only
                return (libility.lienPosition == 1);
            };
            this.checkPayoffRequired = function (libility) {
                // show payoff option for non first mortgage only
                return (libility.lienPosition > 1);
            };
            this.getBorrowerLiens = function () {
                return _this.loan.loanApp.borrower.reos;
            };
            this.getCoBorrowerLiens = function () {
                for (var i = 0; i < _this.loan.loanApp.borrower.reos.length; i++) {
                    for (var j = 0; j < _this.loan.loanApp.coBorrower.reos.length; j++) {
                        if (_this.loan.loanApp.coBorrower.reos[j].accountNumber == _this.loan.loanApp.borrower.reos[i].accountNumber) {
                            _this.loan.loanApp.coBorrower.reos[j].isDuplicated = true;
                        }
                    }
                }
                return _this.loan.loanApp.coBorrower.reos;
            };
            this.checkLienPosition = function (liability) {
                var takenLienPositions = [];
                if (!liability.lienPosition || liability.lienPosition == 0)
                    return;
                else if (liability.lienPosition == 1 /* First */)
                    liability.borrowerDebtCommentId = 2 /* PayoffAtClose */;
                var liens = _this.getBorrowerLiens();
                if (liens != null) {
                    angular.forEach(liens, function (value, key) {
                        if (value.liabilityInfoId !== liability.liabilityInfoId && value.lienPosition === liability.lienPosition) {
                            liability.lienPosition = 0;
                        }
                        if (value.lienPosition && takenLienPositions.indexOf(value.lienPosition) == -1)
                            takenLienPositions.push(value.lienPosition);
                    });
                }
                if (liability.lienPosition != 0 && takenLienPositions.indexOf(liability.lienPosition) == -1)
                    takenLienPositions.push(liability.lienPosition);
                _this.takenLienPositions = takenLienPositions;
            };
            this.isPositionDisabled = function (opt) {
                return _this.takenLienPositions.indexOf(opt.value) > -1;
            };
            this._borrower = this.loan.loanApp.borrower;
            this._isPropertyFreeAndClear = false;
            this._isCustomLienAdded = false;
            /// for test with MOCK data only
            //this.populateMockLiabilityViewModels();
            //this.subjectProperty.propertyTaxExpense.monthlyAmount
            // register for credit status
            this.loan.registerCreditNotify(consumersite.CreditController.className, function (status) { return _this.notifyCreditStatus(status); });
            // check credit status for this button
            if (this.loan.isCreditSuccessful()) {
                this.displayNavigation = true;
            }
            else {
                this.displayNavigation = false;
            }
            //prompt user to eConsent 
            this.eConsentModalService.promptEConsent(this.loan, 1 /* noneRequired */, function () {
                _this.consumerLoanService.saveLoan(_this.loan, null, null, null, true);
            });
        }
        Object.defineProperty(CreditResultsController.prototype, "isCreditDataAvailable", {
            get: function () {
                return (!!this.loan && this.loan.isCreditDataAvailable);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditResultsController.prototype, "subjectProperty", {
            get: function () {
                return this.loan.getSubjectProperty();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditResultsController.prototype, "sortOrder", {
            get: function () {
                return "-amount";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditResultsController.prototype, "takenLienPositions", {
            get: function () {
                return this._takenLienPositions;
            },
            set: function (value) {
                this._takenLienPositions = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditResultsController.prototype, "hasSelectedAnyLoans", {
            get: function () {
                return this._hasSelectedAnyLoans;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditResultsController.prototype, "showValidationError", {
            get: function () {
                return this._showValidationError;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditResultsController.prototype, "isPropertyFreeAndClear", {
            get: function () {
                return this._isPropertyFreeAndClear;
                //if (!this.loan.isCreditInitiated)
                //    return false;
                ////else if (this.loan.isCreditSuccessful)
                ////    return !(lib.findFirst(this.getBorrowerLiens(), b => b.isAllocatedSubjProp));
                //else if (this.isCreditDataAvailable) {
                //    if (this.getBorrowerLiens().length == 0) {
                //        return true;
                //    }
                //}
                //else
                //    return false;           
            },
            set: function (isPropertyFreeAndClear) {
                var lians = this.getBorrowerLiens();
                if (isPropertyFreeAndClear && lians != null) {
                    angular.forEach(lians, function (value, key) {
                        value.isAllocatedSubjProp = false;
                        if (!!value.propertyId) {
                            value.lienPosition = null;
                            value.propertyId = null;
                        }
                    });
                    this._hasSelectedAnyLoans = false;
                    this.takenLienPositions = [];
                    this.isCustomLienAdded = false;
                }
                this._hasSelectedAnyLoans = false;
                this._isPropertyFreeAndClear = isPropertyFreeAndClear;
                //if (value && !!this.isCreditDataAvailable) {
                //    angular.forEach(this.getBorrowerLiens(), function (value, key) {
                //        if (!!value.propertyId) {
                //            value.lienPosition = null;
                //            value.propertyId = null;
                //        }
                //    });  
                //}
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditResultsController.prototype, "isCustomLienAdded", {
            get: function () {
                return this._isCustomLienAdded;
            },
            set: function (value) {
                this._isCustomLienAdded = value;
                if (value)
                    this.isPropertyFreeAndClear = false;
            },
            enumerable: true,
            configurable: true
        });
        CreditResultsController.prototype.getMockLiabilityViewModels = function () {
            console.log(this._liabilityViewModels);
            return this._liabilityViewModels;
        };
        CreditResultsController.prototype.populateMockLiabilityViewModels = function () {
            var newLiabilityViewModel = new srv.cls.LiabilityViewModel();
            newLiabilityViewModel.identityKey = "1";
            newLiabilityViewModel.liabilityInfoId = "1";
            newLiabilityViewModel.amount = 10000;
            newLiabilityViewModel.calculatedMonthlyAmount = 100;
            newLiabilityViewModel.accountNumber = 'ABC123';
            newLiabilityViewModel.payoffLender = 'Big Bank';
            newLiabilityViewModel.propertyId = null;
            newLiabilityViewModel.lienPosition = 0; //srv.LienPosition.Fifth;
            newLiabilityViewModel["subjectPropertyId"] = 'Property1';
            this._liabilityViewModels.push(newLiabilityViewModel);
            newLiabilityViewModel = new srv.cls.LiabilityViewModel();
            newLiabilityViewModel.identityKey = "2";
            newLiabilityViewModel.liabilityInfoId = "2";
            newLiabilityViewModel.amount = 20000;
            newLiabilityViewModel.calculatedMonthlyAmount = 200;
            newLiabilityViewModel.accountNumber = 'DEF456';
            newLiabilityViewModel.payoffLender = 'Really Big Bank';
            newLiabilityViewModel.propertyId = null;
            newLiabilityViewModel.lienPosition = 3 /* Third */;
            newLiabilityViewModel["subjectPropertyId"] = 'Property1';
            this._liabilityViewModels.push(newLiabilityViewModel);
            newLiabilityViewModel = new srv.cls.LiabilityViewModel();
            newLiabilityViewModel.identityKey = "3";
            newLiabilityViewModel.liabilityInfoId = "3";
            newLiabilityViewModel.amount = 30000;
            newLiabilityViewModel.calculatedMonthlyAmount = 300;
            newLiabilityViewModel.accountNumber = 'GHI789';
            newLiabilityViewModel.payoffLender = 'Super Big Bank';
            newLiabilityViewModel.propertyId = null;
            newLiabilityViewModel.lienPosition = 4 /* Fourth */;
            newLiabilityViewModel["subjectPropertyId"] = 'Property1';
            this._liabilityViewModels.push(newLiabilityViewModel);
        };
        CreditResultsController.className = "creditResultsController";
        CreditResultsController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'eConsentModalService', 'templateRoot', 'consumerLoanService'];
        return CreditResultsController;
    })();
    consumersite.CreditResultsController = CreditResultsController;
    moduleRegistration.registerController(consumersite.moduleName, CreditResultsController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=creditresults.controller.js.map