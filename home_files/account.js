/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var AccountController = (function () {
        function AccountController(loan, applicationData, consumerLoanService, templateRoot, navigationService, authenticationService, loanAppPageContext, consumerSiteUtilService) {
            var _this = this;
            this.loan = loan;
            this.applicationData = applicationData;
            this.consumerLoanService = consumerLoanService;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.authenticationService = authenticationService;
            this.loanAppPageContext = loanAppPageContext;
            this.consumerSiteUtilService = consumerSiteUtilService;
            this.authentication = new srv.cls.AuthenticationViewModel();
            this.isEmailReadOnly = false;
            this.controllerAsName = "accountCntrl";
            this.goToForgotPassword = function () {
                //this.navigationService.goToForgotPassword();
            };
            this.goToSignIn = function () {
                _this.resetBindings();
                _this.isPageCreateAccount = false;
            };
            this.goToCreateAccount = function () {
                _this.resetBindings();
                _this.isPageCreateAccount = true;
            };
            //TODO: Fix this page so there aren't so many flags getting thrown around.  -jacob
            this.resetBindings = function () {
                if (_this.isEmailReadOnly) {
                    _this.username = "";
                    _this.isEmailReadOnly = false;
                    _this.IsEmailValid = false;
                }
                _this.isPasswordValidationShown = false;
                _this.signInFail = false;
                _this.password = "";
                _this.confirmPassword = "";
                _this.securityQuestion = -1;
                _this.securityAnswer = "";
            };
            this.checkUserAccountAvailableOnPageLoad = function () {
                _this.consumerLoanService.checkUserAccountAvailable(_this.loan.loanApp.borrower.userAccountId, _this.username, function (isAvailable, existingUserAccountId) {
                    //set reference for ui
                    //if the username is available, load create account.
                    _this.isPageCreateAccount = isAvailable;
                    //if the username is taken, on page load, set the email as readOnly.
                    _this.isEmailReadOnly = !isAvailable;
                    //set the User account active status to active if it is available.  Wait, available == activatedAccount ...really?[yep, yep]
                    _this.loan.loanApp.borrower.setUserAccountActiveStatus(isAvailable);
                });
            };
            this.checkUserAccountAvailableOnChange = function () {
                //if it's not a valid email, don't do anything.
                if (_this.checkEmailCommand()) {
                    //if the email has been changed, do not allow the user to Sign In
                    _this.isEmailPending = true;
                    _this.consumerLoanService.checkUserAccountAvailable(_this.loan.loanApp.borrower.userAccountId, _this.username, function (isAvailable, existingUserAccountId) {
                        //if the email is available it's not pending anymore, otherwise still pending.
                        _this.isEmailPending = !isAvailable;
                        //set the User account active status to active if it is available.  Wait, available == activatedAccount ...really?[yep, yep]
                        _this.loan.loanApp.borrower.setUserAccountActiveStatus(isAvailable);
                    });
                }
                else {
                    _this.isEmailPending = false;
                }
            };
            this.createAccount = function (pageForm) {
                _this.checkEmailCommand();
                _this.checkPwdCommand();
                if (_this.consumerSiteUtilService.validateForm(pageForm)) {
                    _this.authentication.userAccountName = _this.loan.loanApp.borrower.email;
                    _this.authenticationService.authenticate({ authenticationRequestType: 2 /* CreateAccount */, authentication: _this.authentication }, function (ar) { return _this.createAccountCallback(ar); });
                }
            };
            this.createAccountCallback = function (authenticationResponse) {
                if (authenticationResponse.succeeded) {
                    _this.legacyAssociateWithLoan(authenticationResponse.authentication);
                    _this.navigationService.afterAccountCreation(_this.loanAppPageContext.loanAppNavigationState);
                }
                else {
                }
            };
            this.legacyAssociateWithLoan = function (authentication) {
                _this.loan.loanApp.borrower.userAccountId = authentication.accountIds[0];
                _this.loan.loanApp.borrower.userName = authentication.userAccountName;
                if (_this.loan.loanApp.hasCoBorrower && authentication.accountIds.length > 1) {
                    _this.loan.loanApp.coBorrower.userAccountId = authentication.accountIds[1];
                }
            };
            this.signIn = function (pageForm) {
                if (_this.consumerSiteUtilService.validateForm(pageForm)) {
                    _this.authenticationService.authenticate({ authenticationRequestType: 1 /* Authenticate */, authentication: _this.authentication }, function (b) { return _this.signInCallback(b); });
                }
            };
            this.signInCallback = function (authenticationResponse) {
                if (authenticationResponse.succeeded) {
                    _this._signInFail = false;
                    _this.legacyAssociateWithLoan(authenticationResponse.authentication);
                    _this.navigationService.afterAccountCreation(_this.loanAppPageContext.loanAppNavigationState);
                }
                else {
                    _this._signInFail = true;
                }
            };
            //-------------------------------------------
            // Email
            //-------------------------------------------
            this.checkEmail = function (str) {
                var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;
                return re.test(str);
            };
            this.IsEmailValid = true;
            this.checkEmailCommand = function () {
                if (_this.username !== "") {
                    _this.IsEmailValid = _this.checkEmail(_this.username);
                }
                else {
                    _this.IsEmailValid = false;
                }
                return _this.IsEmailValid;
            };
            //-------------------------------------------
            // Password
            //-------------------------------------------
            this.checkPassword = function (str) {
                // at least one number, one lowercase and one uppercase letter
                // at least six characters
                var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
                return re.test(str);
            };
            this.IsAccountPwdValid = true;
            this.checkPwdCommand = function () {
                if (_this.password !== "") {
                    _this.IsAccountPwdValid = _this.checkPassword(_this.password);
                    if (_this.IsAccountPwdValid) {
                        _this.setIsPasswordValidationShown();
                    }
                }
                else {
                    _this.IsAccountPwdValid = false;
                }
                return _this.IsAccountPwdValid;
            };
            this.AccountPwdInputType = 'password';
            this.AccountPwdLockHover = false;
            this.accountPwdHoverInLock = function () {
                _this.AccountPwdLockHover = true;
                return;
            };
            this.accountPwdHoverOutLock = function () {
                _this.AccountPwdLockHover = false;
                _this.AccountPwdInputType = 'password';
                return;
            };
            this.accountPwdMouseDownLock = function () {
                if (_this.AccountPwdLockHover === true) {
                    _this.AccountPwdInputType = 'text';
                }
                return;
            };
            this.accountPwdMouseUpLock = function () {
                _this.AccountPwdInputType = 'password';
                return;
            };
            //-------------------------------------------
            // Confirm Password
            //-------------------------------------------
            this.AccountConfirmPwdInputType = 'password';
            this.AccountConfirmPwdLockHover = false;
            this.accountConfirmPwdHoverInLock = function () {
                _this.AccountConfirmPwdLockHover = true;
                return;
            };
            this.accountConfirmPwdHoverOutLock = function () {
                _this.AccountConfirmPwdLockHover = false;
                _this.AccountConfirmPwdInputType = 'password';
                return;
            };
            this.accountConfirmPwdMouseDownLock = function () {
                if (_this.AccountConfirmPwdLockHover === true) {
                    _this.AccountConfirmPwdInputType = 'text';
                }
                return;
            };
            this.accountConfirmPwdMouseUpLock = function () {
                _this.AccountConfirmPwdInputType = 'password';
                return;
            };
            this._isPasswordValidationShown = false;
            //todo, refactor popover to have custom triggers for opening closing to allow us to remove this logic.  -jacob
            //called by the blur event on the password input, true if password is invalid, false if password is valid
            this.setIsPasswordValidationShown = function () {
                _this.isPasswordValidationShown = !_this.IsAccountPwdValid;
            };
            this.resetPasswordInputValidation = function () {
                _this.password = "";
            };
            this._confirmPassword = "";
            this._isConfirmPasswordValidationShown = false;
            this.setIsConfirmPasswordValidationShown = function () {
                //if the real password is valid, and it is not equal to the confirm password.
                _this.isConfirmPasswordValidationShown = (_this.password != _this._confirmPassword);
            };
            this.resetConfirmPasswordInputValidation = function () {
                if (!_this.IsAccountPwdValid) {
                    _this.confirmPassword = "";
                }
                _this.isConfirmPasswordValidationShown = false;
            };
            // legency nonsense...
            this.authentication.loanId = this.loan.loanId;
            this.authentication.userAccountName = this.loan.loanApp.borrower.email;
            this.authentication.accountIds = [this.loan.loanApp.borrower.userAccountId];
            this.isPageCreateAccount = true;
            this.checkUserAccountAvailableOnPageLoad();
            this._signInFail = false;
        }
        Object.defineProperty(AccountController.prototype, "password", {
            //Variables
            get: function () {
                return this.authentication.password;
            },
            set: function (value) {
                this.authentication.password = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "isPasswordValidationShown", {
            get: function () {
                return this._isPasswordValidationShown;
            },
            set: function (val) {
                this._isPasswordValidationShown = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "confirmPassword", {
            get: function () {
                return this._confirmPassword;
            },
            set: function (val) {
                this._confirmPassword = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "isConfirmPasswordValidationShown", {
            get: function () {
                return this._isConfirmPasswordValidationShown;
            },
            set: function (val) {
                this._isConfirmPasswordValidationShown = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "securityQuestion", {
            get: function () {
                return this.authentication.securityQuestionId;
            },
            set: function (securityQuestionId) {
                this.authentication.securityQuestionId = securityQuestionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "securityAnswer", {
            get: function () {
                return this.authentication.securityAnswer;
            },
            set: function (securityAnswer) {
                this.authentication.securityAnswer = securityAnswer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "username", {
            get: function () {
                return this.loan.loanApp.borrower.email;
            },
            set: function (email) {
                this.loan.loanApp.borrower.email = email;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "isEmailPending", {
            get: function () {
                return this._allowSubmit;
            },
            set: function (value) {
                this._allowSubmit = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "isPageCreateAccount", {
            get: function () {
                return this._isUserNameAvailable;
            },
            set: function (val) {
                this._isUserNameAvailable = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "signInFail", {
            get: function () {
                return this._signInFail;
            },
            set: function (signInFail) {
                this._signInFail = signInFail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountController.prototype, "securityQuestions", {
            get: function () {
                return this.applicationData.lookup.securityQuestions;
            },
            enumerable: true,
            configurable: true
        });
        AccountController.className = "accountController";
        AccountController.$inject = ['loan', 'applicationData', 'consumerLoanService', 'templateRoot', 'navigationService', 'authenticationService', 'loanAppPageContext', 'consumerSiteUtilService'];
        return AccountController;
    })();
    consumersite.AccountController = AccountController;
    moduleRegistration.registerController(consumersite.moduleName, AccountController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=account.controller.js.map