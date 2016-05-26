var consumersite;
(function (consumersite) {
    var EConsentSettingsController = (function () {
        function EConsentSettingsController(loan, loanAppPageContext, applicationData, eConsentModalService, templateRoot, navigationService, $log, consumerLoanService, authenticationService) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.eConsentModalService = eConsentModalService;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.$log = $log;
            this.consumerLoanService = consumerLoanService;
            this.authenticationService = authenticationService;
            this.save = function () {
                _this.loan.loanApp.docDelivery = 0 /* Mail */;
                //decline for all borrowers
                _this.loan.loanApp.declineEConcentForAllBorrowers();
                //save the loan AND THEN sign out the user
                _this.consumerLoanService.saveLoanWithPostOper(_this.loan, function (loan, data) {
                    _this.authenticationService.signoutUser(); //sign out
                    _this.navigationService.goToAuthentication(); //navigate to authentication page
                });
            };
            this.cancel = function () {
                _this.navigationService.goToDashboard();
            };
        }
        Object.defineProperty(EConsentSettingsController.prototype, "isBorrowerEConsented", {
            get: function () {
                return this.loan.loanApp.borrower.eConsent.consentStatus == 1 /* Accept */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EConsentSettingsController.prototype, "isCoBorrowerEConsented", {
            get: function () {
                return this.loan.loanApp.coBorrower.eConsent.consentStatus == 1 /* Accept */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EConsentSettingsController.prototype, "hasCoBorrower", {
            get: function () {
                return this.loan.loanApp.hasCoBorrower;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EConsentSettingsController.prototype, "borrowerFullname", {
            get: function () {
                return this.loan.loanApp.borrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EConsentSettingsController.prototype, "borrowerStatusAt", {
            get: function () {
                return this.loan.loanApp.borrower.eConsent.statusAt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EConsentSettingsController.prototype, "coBorrowerFullname", {
            get: function () {
                if (this.hasCoBorrower) {
                    return this.loan.loanApp.coBorrower.fullName;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EConsentSettingsController.prototype, "coBorrowerStatusAt", {
            get: function () {
                return this.loan.loanApp.coBorrower.eConsent.statusAt;
            },
            enumerable: true,
            configurable: true
        });
        EConsentSettingsController.className = 'eConsentSettingsController';
        EConsentSettingsController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'eConsentModalService', 'templateRoot', 'navigationService', '$log', 'consumerLoanService', 'authenticationService'];
        return EConsentSettingsController;
    })();
    consumersite.EConsentSettingsController = EConsentSettingsController;
    moduleRegistration.registerController(consumersite.moduleName, EConsentSettingsController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=eConsentSettings.controller.js.map