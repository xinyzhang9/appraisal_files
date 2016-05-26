/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var security;
(function (security) {
    var AuthenticateController = (function () {
        function AuthenticateController(authenticationService, $log, navigationService, loanAppPageContext, templateRoot, uiBlockWithSpinner, consumerLoanService, $filter, userAccountContext, consumerSiteUtilService) {
            var _this = this;
            this.authenticationService = authenticationService;
            this.$log = $log;
            this.navigationService = navigationService;
            this.loanAppPageContext = loanAppPageContext;
            this.templateRoot = templateRoot;
            this.uiBlockWithSpinner = uiBlockWithSpinner;
            this.consumerLoanService = consumerLoanService;
            this.$filter = $filter;
            this.userAccountContext = userAccountContext;
            this.consumerSiteUtilService = consumerSiteUtilService;
            this.authenticationVM = new srv.cls.AuthenticationViewModel();
            this._isSecureLinkMode = false;
            this.doPasswordsMatch = function () {
                return _this.password == _this.confirmPassword;
            };
            this.resetAuthentication = function () {
                _this.authenticationFail = false;
                _this.authenticationFailMessage = "";
            };
            this.determineWhetherToCreateAccount = function (authenticationViewModel) {
                var borrower = authenticationViewModel.borrower;
                return false;
            };
            this.isAccountInactive = function () {
                return 2 /* inactive */ == _this.accountStatus;
            };
            this.checkUserAccountStatus = function () {
                _this.consumerLoanService.checkUserAccountStatus(_this.authenticationVM.userAccountName, function (accountStatus, account) {
                    _this.accountStatus = accountStatus;
                    _this.isSecureLinkMode = _this.accountStatus == 2 /* inactive */;
                });
            };
            this.authenticate = function (pageForm) {
                if (_this.consumerSiteUtilService.validateForm(pageForm)) {
                    _this.resetAuthentication();
                    _this.authenticateAccount(1 /* Authenticate */);
                }
            };
            this.activateAccount = function (pageForm) {
                if (_this.consumerSiteUtilService.validateForm(pageForm)) {
                    _this.resetAuthentication();
                    _this.authenticateAccount(4 /* Activate */);
                }
            };
            this.authenticateAccount = function (authenticationRequestType) {
                //disabled the authenticate button when we call the service.
                _this._isAuthEnabled = false;
                _this.authenticationService.authenticate({ authenticationRequestType: authenticationRequestType, authentication: _this.authenticationVM }, function (ar) { return _this.authenticateComplete(ar); });
            };
            this._isAuthEnabled = true;
            this.isAuthEnabled = function () {
                return _this._isAuthEnabled;
            };
            this.authenticateComplete = function (authenticationResponse) {
                //re-enable the authenticate button after the service returns, regardless or response.
                _this._isAuthEnabled = true;
                if (authenticationResponse.succeeded) {
                    var loanId = _this.userAccountContext ? _this.userAccountContext.loanId : null;
                    _this.navigationService.goToAfterAuthenticate(_this.authenticationVM.userAccountName, loanId, !!loanId);
                }
                else {
                    _this.authenticationFail = true;
                    if (authenticationResponse.errorMessage) {
                        _this.authenticationFailMessage = authenticationResponse.errorMessage;
                    }
                    else {
                        _this.authenticationFailMessage = 'An unknown error has occured';
                    }
                }
            };
            this.loadSecurityQuestion = function (securityQuestionId) {
                var securityQuestions = [
                    { value: "0", text: 'What is your favorite hobby?', description: "N/A", stringValue: "What is your favorite hobby?", disabled: false, selected: false },
                    { value: "1", text: 'Who was your favorite teacher?', description: "N/A", stringValue: "Who was your favorite teacher?", disabled: false, selected: false },
                    { value: "2", text: 'What is the name of your favorite pet?', description: "N/A", stringValue: "What is the name of your favorite pet?", disabled: false, selected: false },
                    { value: "3", text: 'In what year was your mother born?', description: "N/A", stringValue: "In what year was your mother born?", disabled: false, selected: false },
                    { value: "4", text: 'What is the name of the model of your first car?', description: "N/A", stringValue: "What is the name of the model of your first car?", disabled: false, selected: false },
                ];
                for (var i = 0; i < securityQuestions.length; i++) {
                    if (securityQuestions[i].value == securityQuestionId) {
                        return securityQuestions[i].text;
                    }
                }
                return "No Security Question Found.";
            };
            this.isInactiveErrorMessage = function () {
                return _this.authenticationFailMessage == "User is not active.";
            };
            this.goToActivateAccountState = function () {
                _this.resetAuthentication();
                _this.accountStatus = 2 /* inactive */;
            };
            this.getForgotPasswordLink = function () {
                return _this.navigationService.getForgotPasswordLink();
            };
            this.authenticationVM.userAccountName = "";
            this.authenticationVM.password = "";
            if (userAccountContext) {
                //activate mode
                this.authenticationVM.userAccountName = userAccountContext.userAccountName;
                this.checkUserAccountStatus();
                this._securityQuestion = this.loadSecurityQuestion(userAccountContext.securityQuestionId.toString());
            }
            //aalt 2016-04-20: Not used
            //if (this.determineWhetherToCreateAccount(docusign.settings.authenticationViewModel))
            //    navigationService.goToAccountCreation();
            this.resetAuthentication();
        }
        Object.defineProperty(AuthenticateController.prototype, "isSecureLinkMode", {
            get: function () {
                return this._isSecureLinkMode;
            },
            set: function (val) {
                this._isSecureLinkMode = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "authenticationFail", {
            get: function () {
                return this._authenticationFail;
            },
            set: function (authenticationFail) {
                this._authenticationFail = authenticationFail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "userAccountName", {
            get: function () {
                return this.authenticationVM.userAccountName;
            },
            set: function (userAccountName) {
                this.authenticationVM.userAccountName = userAccountName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "password", {
            get: function () {
                return this.authenticationVM.password;
            },
            set: function (password) {
                this.authenticationVM.password = password;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "confirmPassword", {
            get: function () {
                return this._confirmPassword;
            },
            set: function (val) {
                this._confirmPassword = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "securityQuestion", {
            get: function () {
                return this._securityQuestion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "securityAnswer", {
            get: function () {
                return this.authenticationVM.securityAnswer;
            },
            set: function (val) {
                this.authenticationVM.securityAnswer = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "signInMode", {
            //aalt 2016-2-22: Added these properties for dynamic styling and showing the correct region
            get: function () {
                //TODO: get the right sign in mode which is either 'dashboard' or 'securelink'
                return 'securelink';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "isUserOnline", {
            get: function () {
                //TODO: check id the login context has an online user on page load.
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "signInButtonText", {
            get: function () {
                //TODO: should be either 'Sign In' or 'Save & Finish' if coming from the Save for Later link.
                return 'Sign In';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "authenticationFailMessage", {
            get: function () {
                return this._authenticationFailMessage;
            },
            set: function (authenticationFailMessage) {
                this._authenticationFailMessage = authenticationFailMessage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthenticateController.prototype, "accountStatus", {
            get: function () {
                return this._accountStatus;
            },
            set: function (val) {
                this._accountStatus = val;
            },
            enumerable: true,
            configurable: true
        });
        AuthenticateController.className = 'authenticateController';
        AuthenticateController.$inject = ['authenticationService', '$log', 'navigationService', 'loanAppPageContext', 'templateRoot', 'uiBlockWithSpinner', 'consumerLoanService', '$filter', 'userAccountContext', 'consumerSiteUtilService'];
        return AuthenticateController;
    })();
    security.AuthenticateController = AuthenticateController;
    moduleRegistration.registerController(security.moduleName, AuthenticateController);
})(security || (security = {}));
//# sourceMappingURL=authentication.controller.js.map