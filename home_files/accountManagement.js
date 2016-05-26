/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var security;
(function (security) {
    var AccountManagementController = (function () {
        function AccountManagementController($log, loan, applicationData) {
            this.$log = $log;
            this.loan = loan;
            this.applicationData = applicationData;
            this.authentication = new srv.cls.AuthenticationViewModel();
            this._confirmPassword = "";
            this._forgotPasswordFailMessage = "";
            this._isErrorDisplayed = false;
            this.updateAccount = function (pageForm) {
            };
            /*Validation Logic*/
            this.isEmailValid = function () {
                return true; //return this.consumerSiteUtilService.validateEmail(this.email);
            };
        }
        Object.defineProperty(AccountManagementController.prototype, "email", {
            get: function () {
                return this.authentication.userAccountName;
            },
            set: function (userAccountName) {
                this.authentication.userAccountName = userAccountName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountManagementController.prototype, "tempPassword", {
            get: function () {
                return this.authentication.password;
            },
            set: function (val) {
                this.authentication.password = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountManagementController.prototype, "newPassword", {
            get: function () {
                return this.authentication.newPassword;
            },
            set: function (val) {
                this.authentication.newPassword = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountManagementController.prototype, "confirmPassword", {
            get: function () {
                return this._confirmPassword;
            },
            set: function (val) {
                this._confirmPassword = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccountManagementController.prototype, "isErrorDisplayed", {
            //get securityQuestionId() {
            //this.loan.loanApp.borrower.userAccount.secu
            //    return this.loan.loanApp.borrower.userAccount.securityQuestionId;
            //}
            //private _securityQuestion: string;
            //get securityQuestion(): string {
            //    return this._securityQuestion;
            //}
            //setSecurityQuestion = (id: number) => {
            //    secQuest: srv.IList < srv.ILookupItem >  = this.applicationData.lookup.sercurityQuestions;
            //    this._securityQuestion = lib.findFirst(this.applicationData.lookup.securityQuestions, sq => sq.value == id);
            //}
            get: function () {
                return this._isErrorDisplayed;
            },
            set: function (val) {
                this._isErrorDisplayed = val;
            },
            enumerable: true,
            configurable: true
        });
        AccountManagementController.className = 'accountManagementController';
        AccountManagementController.$inject = ['$log', 'loan', 'applicationData'];
        return AccountManagementController;
    })();
    security.AccountManagementController = AccountManagementController;
    moduleRegistration.registerController(security.moduleName, AccountManagementController);
})(security || (security = {}));
//# sourceMappingURL=accountManagement.controller.js.map