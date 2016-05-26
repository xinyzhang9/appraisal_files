/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../angular/ts/generated/serviceProxies/UserService.ts"/>
var security;
(function (security) {
    var ForgotPasswordController = (function () {
        function ForgotPasswordController($log, templateRoot, navigationService, authenticationService, consumerSiteUtilService, $uibModal, userAccountContext, UserService) {
            var _this = this;
            this.$log = $log;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.authenticationService = authenticationService;
            this.consumerSiteUtilService = consumerSiteUtilService;
            this.$uibModal = $uibModal;
            this.userAccountContext = userAccountContext;
            this.UserService = UserService;
            this.authentication = new srv.cls.AuthenticationViewModel();
            this._confirmPassword = "";
            this._forgotPasswordFailMessage = "";
            this._isErrorDisplayed = false;
            this.isEmailSent = false;
            this.updateAccount = function (pageForm) {
                if (_this.consumerSiteUtilService.validateForm(pageForm)) {
                    _this.authenticationService.authenticate({ authenticationRequestType: 3 /* UpdateAccount */, authentication: _this.authentication }, function (ar) { return _this.authenticateComplete(ar); });
                }
                else {
                    _this.$log.warn("Forgot Password Form Invalid");
                }
            };
            this.authenticateComplete = function (authenticationResponse) {
                //if it failed, display the message
                _this.isErrorDisplayed = authenticationResponse.succeeded;
                if (authenticationResponse.succeeded) {
                    var loanId = _this.userAccountContext ? _this.userAccountContext.loanId : null;
                    _this.navigationService.goToAfterAuthenticate(_this.email, loanId, !!loanId);
                }
                else {
                    _this._forgotPasswordFailMessage = authenticationResponse.errorMessage ? authenticationResponse.errorMessage : 'An unknown error has occured';
                    _this.$log.error(_this._forgotPasswordFailMessage);
                }
            };
            this.sendTemporaryPassword = function (pageForm) {
                //yes, we are validating the email two different ways, for 2 different scenarios, need to comb out validation, task in place - jacob
                if (_this.consumerSiteUtilService.validateForm(pageForm) && _this.isEmailValid()) {
                    _this.UserService.GenerateTemporaryPasswordAndSendEmail(_this.email).then(function (result) {
                        _this.isEmailSent = result;
                        _this.openForgotPasswordModal();
                    }, function (error) {
                        _this.$log.error('Error occurred while sending SecureLink Email..!', error);
                        _this.isEmailSent = false;
                    });
                    _this.$log.info("Temporary Password Sent");
                }
                else {
                    _this.$log.warn("Email Invalid");
                }
            };
            this.getSignInLink = function () {
                return _this.navigationService.getSignInLink();
            };
            this.openForgotPasswordModal = function () {
                var forgotPasswordModalInstance;
                forgotPasswordModalInstance = _this.$uibModal.open({
                    templateUrl: _this.templateRoot + 'consumersite/authentication/sendTempPasswordModal/send-temp-password.template.html',
                    backdrop: 'static',
                    controller: function () {
                        return new MessageNotifyModalController(forgotPasswordModalInstance, _this.sendTempPassMessage);
                    },
                    controllerAs: 'notifyModalCntrl',
                    windowClass: 'send-temp-password-modal',
                    openedClass: 'send-temp-password-container',
                });
            };
            /*Validation Logic*/
            this.isEmailValid = function () {
                return _this.consumerSiteUtilService.validateEmail(_this.email);
            };
        }
        Object.defineProperty(ForgotPasswordController.prototype, "email", {
            get: function () {
                return this.authentication.userAccountName;
            },
            set: function (userAccountName) {
                this.authentication.userAccountName = userAccountName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ForgotPasswordController.prototype, "tempPassword", {
            get: function () {
                return this.authentication.password;
            },
            set: function (val) {
                this.authentication.password = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ForgotPasswordController.prototype, "newPassword", {
            get: function () {
                return this.authentication.newPassword;
            },
            set: function (val) {
                this.authentication.newPassword = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ForgotPasswordController.prototype, "confirmPassword", {
            get: function () {
                return this._confirmPassword;
            },
            set: function (val) {
                this._confirmPassword = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ForgotPasswordController.prototype, "isErrorDisplayed", {
            get: function () {
                return this._isErrorDisplayed;
            },
            set: function (val) {
                this._isErrorDisplayed = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ForgotPasswordController.prototype, "forgotPasswordFailMessage", {
            get: function () {
                return this._forgotPasswordFailMessage;
            },
            set: function (val) {
                this._forgotPasswordFailMessage = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ForgotPasswordController.prototype, "sendTempPassMessage", {
            get: function () {
                return "Your temporary password has been delivered to " + this.email;
            },
            enumerable: true,
            configurable: true
        });
        ForgotPasswordController.className = 'forgotPasswordController';
        ForgotPasswordController.$inject = ['$log', 'templateRoot', 'navigationService', 'authenticationService', 'consumerSiteUtilService', '$uibModal', 'userAccountContext', 'UserService'];
        return ForgotPasswordController;
    })();
    security.ForgotPasswordController = ForgotPasswordController;
    moduleRegistration.registerController(security.moduleName, ForgotPasswordController);
    //TODO: Make this reusable - jacob
    /*********************************************
     * Message Notify Modal
     *********************************************/
    var MessageNotifyModalController = (function () {
        function MessageNotifyModalController($modalInstance, message) {
            this.$modalInstance = $modalInstance;
            this.message = message;
        }
        MessageNotifyModalController.className = 'messageNotifyModalController';
        MessageNotifyModalController.$inject = ['modalContext'];
        return MessageNotifyModalController;
    })();
})(security || (security = {}));
//# sourceMappingURL=forgotPassword.controller.js.map