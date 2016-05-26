/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/*
-Jacob
This file is under the premise the navigation has decided whether we need to be
on this page or not.  It must satisfy the following.
- Joint Account
- Is SecureLink Token

End result is the PIN Auth borrowers.
*/
var consumersite;
(function (consumersite) {
    var PinAuthViewModel = (function () {
        function PinAuthViewModel() {
        }
        return PinAuthViewModel;
    })();
    var PinAuthenticationController = (function () {
        function PinAuthenticationController(loan, consumerLoanService, templateRoot, authenticationService, navigationService, consumerSiteUtilService) {
            var _this = this;
            this.loan = loan;
            this.consumerLoanService = consumerLoanService;
            this.templateRoot = templateRoot;
            this.authenticationService = authenticationService;
            this.navigationService = navigationService;
            this.consumerSiteUtilService = consumerSiteUtilService;
            this.authenticationVM = new srv.cls.AuthenticationViewModel();
            this.hasAuthenticated = false;
            this.indexOf_lastFourSocial = 5;
            this.authenticate = function (pageForm) {
                _this.consumerSiteUtilService.validateForm(pageForm);
                //set flag to UI that authentication has been attempted
                _this.hasAuthenticated = true;
                //if they haven't eSigned and their pin is a match.
                var isBorrowerValid = _this.borrowerPIN == _this.loan.loanApp.borrower.ssn.slice(_this.indexOf_lastFourSocial);
                var isCoBorrowerValid = _this.coBorrowerPIN == _this.loan.loanApp.coBorrower.ssn.slice(_this.indexOf_lastFourSocial);
                //set flags on authenticationService as the borrowers that need to eSign and are pinAuth.
                _this.authenticationService.setPinAuthentication(!_this.hasBorrowerESigned && isBorrowerValid, !_this.hasCoBorrowerESigned && isCoBorrowerValid);
                //if the coBorrower has already signed.
                if (!_this.hasBorrowerESigned && isBorrowerValid && _this.hasCoBorrowerESigned) {
                    _this.navigate();
                }
                else if (!_this.hasCoBorrowerESigned && isCoBorrowerValid && _this.hasBorrowerESigned) {
                    _this.navigate();
                }
                else if (!_this.hasBorrowerESigned && isBorrowerValid && !_this.hasCoBorrowerESigned && isCoBorrowerValid) {
                    _this.navigate();
                }
            };
            this.navigate = function () {
                _this.navigationService.goToDisclosureInstructions();
            };
            this._borrowerPIN = "";
            this._coBorrowerPIN = "";
            this.authenticationService.resetPinAuth();
        }
        Object.defineProperty(PinAuthenticationController.prototype, "borrowerFullName", {
            get: function () {
                return this.loan.loanApp.borrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "coBorrowerFullName", {
            get: function () {
                return this.loan.loanApp.coBorrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "borrowerPIN", {
            get: function () {
                return this._borrowerPIN;
            },
            set: function (val) {
                this._borrowerPIN = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "coBorrowerPIN", {
            get: function () {
                return this._coBorrowerPIN;
            },
            set: function (val) {
                this._coBorrowerPIN = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "pinPlaceholder", {
            get: function () {
                return "Enter Last 4 of SSN";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "borrowerContinueWithoutText", {
            get: function () {
                return "Continue without " + this.borrowerFullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "coBorrowerContinueWithoutText", {
            get: function () {
                return "Continue without " + this.coBorrowerFullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "isBorrowerPinAuth", {
            //tie this to the facade where we set the borrower/coBorrower as pin authenticated.
            get: function () {
                return this.authenticationService.isBorrowerPinAuthenticated();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "isCoBorrowerPinAuth", {
            get: function () {
                return this.authenticationService.isCoBorrowerPinAuthenticated();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "hasBorrowerESigned", {
            get: function () {
                return this.loan.loanApp.borrower.eApprovalConfirmation.confirmationCodeConfirmed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "hasCoBorrowerESigned", {
            get: function () {
                return this.loan.loanApp.coBorrower.eApprovalConfirmation.confirmationCodeConfirmed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "borrowerEApprovalDate", {
            get: function () {
                return this.loan.loanApp.borrower.eApprovalConfirmation.timeStamp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "coBorrowerEApprovalDate", {
            get: function () {
                return this.loan.loanApp.coBorrower.eApprovalConfirmation.timeStamp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "isBorrowerContinueWithout", {
            get: function () {
                return this.isBorrowerPinAuth && !this.isCoBorrowerPinAuth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PinAuthenticationController.prototype, "isCoBorrowerContinueWithout", {
            get: function () {
                return this.isCoBorrowerPinAuth && !this.isBorrowerPinAuth;
            },
            enumerable: true,
            configurable: true
        });
        PinAuthenticationController.className = "pinAuthenticationController";
        PinAuthenticationController.$inject = ['loan', 'consumerLoanService', 'templateRoot', 'authenticationService', 'navigationService', 'consumerSiteUtilService'];
        return PinAuthenticationController;
    })();
    consumersite.PinAuthenticationController = PinAuthenticationController;
    moduleRegistration.registerController(consumersite.moduleName, PinAuthenticationController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=pinAuthentication.controller.js.map