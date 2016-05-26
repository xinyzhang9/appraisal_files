/// <reference path='../../../angular/ts/extendedViewModels/loanApplication.extendedViewModel.ts' />
/// <reference path='borrower.viewModel.ts' />
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
        var LoanApplication = (function (_super) {
            __extends(LoanApplication, _super);
            function LoanApplication(applicationData, loanApp) {
                var _this = this;
                _super.call(this, applicationData);
                this.assets = [];
                this.otherIncomes = [];
                this.declineEConcentForAllBorrowers = function () {
                    var borrowers = [_this.borrower];
                    //do we have a coBorrower?
                    if (_this.hasCoBorrower) {
                        borrowers.push(_this.coBorrower);
                    }
                    var now = new Date();
                    borrowers.forEach(function (borrower) {
                        borrower.eConsent.consentStatus = 2 /* Decline */;
                        borrower.eConsent.statusAt = now;
                    });
                    //setup document delivery type as by mail.
                    _this.docDelivery = 0 /* Mail */;
                };
                this.constructBorrowers = function () {
                    // Borrower
                    _this.constructBorrower(false);
                    // Co-Borrower
                    _this.constructBorrower(true);
                };
                this.constructBorrower = function (isCoBorrower) {
                    // getter/setters
                    var getCls;
                    var setCsvm;
                    if (isCoBorrower) {
                        getCls = _this.getLoanApp().getCoBorrower;
                        setCsvm = function (b) { return _this.coBorrower = b; };
                    }
                    else {
                        getCls = _this.getLoanApp().getBorrower;
                        setCsvm = function (b) { return _this.borrower = b; };
                    }
                    // implementation
                    var clsBorrower = getCls();
                    var csvmBorrower;
                    if (!!clsBorrower) {
                        csvmBorrower = new vm.Borrower(_this.getApplicationData(), clsBorrower);
                    }
                    else {
                        csvmBorrower = consumersite.classFactory(cls.BorrowerViewModel, vm.Borrower, _this.getApplicationData(), _this.getLoanApp().getTransactionInfo());
                    }
                    csvmBorrower.isCoBorrower = isCoBorrower;
                    setCsvm(csvmBorrower);
                };
                this._doesBorrowerOrCoBorrowerHaveOtherEmployment = false;
                this.addAsset = function () {
                    return _this.assets.push(new vm.Asset(_this.getApplicationData(), _this.getLoanApp(), new cls.AssetViewModel()));
                };
                this.removeAsset = function (index) {
                    _this.assets[index].isRemoved = true;
                    _this.removeAt(_this.assets, index);
                };
                this.addOtherIncome = function () {
                    var income = _this.borrower.addOtherIncome(_this.getLoanApp());
                    _this.otherIncomes.push(income);
                    return income;
                };
                this.removeOtherIncome = function (index) {
                    _this.removeAt(_this.otherIncomes, index);
                };
                this.removeAt = function (coll, index) {
                    if (index < coll.length) {
                        coll.slice(index, 1);
                    }
                };
                this.getLoanApp = function () { return loanApp; };
                this.constructBorrowers();
                //incomeVerificationType.
            }
            Object.defineProperty(LoanApplication.prototype, "interviewId", {
                get: function () {
                    return this.getLoanApp().getBorrower().userAccount.interviewId;
                },
                set: function (interviewId) {
                    this.getLoanApp().getBorrower().userAccount.interviewId = interviewId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "loanuserAccountId", {
                get: function () {
                    return this.getLoanApp().getBorrower().userAccount.userAccountId;
                },
                set: function (loanuserAccountId) {
                    this.getLoanApp().getBorrower().userAccount.userAccountId = loanuserAccountId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "loanAppVM", {
                get: function () {
                    return this.getLoanApp();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "loanuserName", {
                get: function () {
                    return this.getLoanApp().getBorrower().userAccount.username;
                },
                set: function (loanuserName) {
                    this.getLoanApp().getBorrower().userAccount.username = loanuserName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "disclosureStateEnum", {
                get: function () {
                    return this.getLoanApp().disclosureStatusDetails ? this.getLoanApp().disclosureStatusDetails.disclosureStatus : 2 /* InitialDisclosureRequired */;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "LoanApplicationId", {
                get: function () {
                    return this.getLoanApp().loanApplicationId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "isEsigningRequired", {
                get: function () {
                    return this.getLoanApp().iseSigningRequired;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "creditAuthorizationDate", {
                get: function () {
                    return this.getLoanApp().creditAuthorizationDate;
                },
                set: function (creditAuthorizationDate) {
                    this.getLoanApp().creditAuthorizationDate = creditAuthorizationDate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "loanApplicationId", {
                get: function () {
                    var loanApplication = this.getLoanApp();
                    if (!!loanApplication) {
                        return loanApplication.loanApplicationId;
                    }
                    else {
                        return "";
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "docDelivery", {
                get: function () {
                    return this.getLoanApp().docDelivery;
                },
                set: function (docDelivery) {
                    this.getLoanApp().docDelivery = docDelivery;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "documents", {
                get: function () {
                    return this.getLoanApp().documents;
                },
                set: function (documents) {
                    this.getLoanApp().documents = documents;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "howDidYouHearAboutUs", {
                get: function () {
                    return this.getLoanApp().howDidYouHearAboutUs;
                },
                set: function (howDidYouHearAboutUs) {
                    this.getLoanApp().howDidYouHearAboutUs = howDidYouHearAboutUs;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "coBorrowerHasDifferentCurrentAddress", {
                get: function () {
                    return this.coBorrower.currentAddress.isSameAsPrimaryBorrowerCurrentAddress;
                },
                set: function (coBorrowerHasDifferentCurrentAddress) {
                    this.coBorrower.currentAddress.isSameAsPrimaryBorrowerCurrentAddress = coBorrowerHasDifferentCurrentAddress;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "doesBorrowerOrCoBorrowerHaveOtherEmployment", {
                get: function () {
                    return this._doesBorrowerOrCoBorrowerHaveOtherEmployment;
                },
                set: function (doesBorrowerOrCoBorrowerHaveOtherEmployment) {
                    this._doesBorrowerOrCoBorrowerHaveOtherEmployment = doesBorrowerOrCoBorrowerHaveOtherEmployment;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "hasCoBorrower", {
                get: function () {
                    return this.getLoanApp().isSpouseOnTheLoan;
                },
                set: function (hasCoBorrower) {
                    if (hasCoBorrower && !this.coBorrower) {
                        this.coBorrower = consumersite.classFactory(cls.BorrowerViewModel, vm.Borrower, this.getApplicationData(), this.getLoanApp().getTransactionInfo());
                    }
                    this.getLoanApp().isSpouseOnTheLoan = hasCoBorrower;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanApplication.prototype, "hasLoanCoBorrower", {
                get: function () {
                    if (this.getLoanApp().hasCoborrower == -1 /* Null */) {
                        return undefined;
                    }
                    return this.getLoanApp().hasCoborrower;
                },
                set: function (hasCoborrower) {
                    this.getLoanApp().hasCoborrower = hasCoborrower;
                    switch (hasCoborrower) {
                        case 1 /* True */:
                            this.hasCoBorrower = true;
                            break;
                        case 0 /* False */:
                            this.hasCoBorrower = false;
                            break;
                    }
                },
                enumerable: true,
                configurable: true
            });
            return LoanApplication;
        })(vm.ViewModelBase);
        vm.LoanApplication = LoanApplication;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=loanApplication.viewModel.js.map