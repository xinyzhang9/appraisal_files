// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
// <reference path="../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var SendEmailReportController = (function () {
        function SendEmailReportController($modalInstance, templateRoot) {
            var _this = this;
            this.$modalInstance = $modalInstance;
            this.templateRoot = templateRoot;
            this._firstName = '';
            this._lastName = '';
            this._ccAddress1 = '';
            this._ccAddress2 = '';
            this._ccAddress3 = '';
            this._ccAddress4 = '';
            this._ccAddress5 = '';
            this._countOfCCAddresses = 1;
            this._emailSettings = {
                loanId: '',
                email: '',
                firstName: '',
                lastName: '',
                additionalRecipients: []
            };
            this.addRecipient = function () {
                _this.countOfCCAddresses += 1;
            };
            this.sendEmailSettings = function (form) {
                if (form.$invalid) {
                    return;
                }
                _this.updateCCAddresses();
                _this.$modalInstance.close(_this._emailSettings);
            };
            this.dismiss = function () {
                _this.$modalInstance.dismiss('cancel');
            };
            this.updateCCAddresses = function () {
                _this._emailSettings.additionalRecipients = [];
                if (!_.isEmpty(_this._ccAddress1) && !_.contains(_this._emailSettings.additionalRecipients, _this._ccAddress1)) {
                    _this._emailSettings.additionalRecipients.push(_this._ccAddress1);
                }
                if (!_.isEmpty(_this._ccAddress2) && !_.contains(_this._emailSettings.additionalRecipients, _this._ccAddress2)) {
                    _this._emailSettings.additionalRecipients.push(_this._ccAddress2);
                }
                if (!_.isEmpty(_this._ccAddress3) && !_.contains(_this._emailSettings.additionalRecipients, _this._ccAddress3)) {
                    _this._emailSettings.additionalRecipients.push(_this._ccAddress3);
                }
                if (!_.isEmpty(_this._ccAddress4) && !_.contains(_this._emailSettings.additionalRecipients, _this._ccAddress4)) {
                    _this._emailSettings.additionalRecipients.push(_this._ccAddress4);
                }
                if (!_.isEmpty(_this._ccAddress5) && !_.contains(_this._emailSettings.additionalRecipients, _this._ccAddress5)) {
                    _this._emailSettings.additionalRecipients.push(_this._ccAddress5);
                }
            };
        }
        Object.defineProperty(SendEmailReportController.prototype, "toAddress", {
            get: function () {
                return this._emailSettings.email;
            },
            set: function (value) {
                this._emailSettings.email = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "firstName", {
            get: function () {
                return this._firstName;
            },
            set: function (value) {
                this._firstName = value;
                this._emailSettings.firstName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "lastName", {
            get: function () {
                return this._lastName;
            },
            set: function (value) {
                this._lastName = value;
                this._emailSettings.lastName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "ccAddress1", {
            get: function () {
                return this._ccAddress1;
            },
            set: function (value) {
                this._ccAddress1 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "ccAddress2", {
            get: function () {
                return this._ccAddress2;
            },
            set: function (value) {
                this._ccAddress2 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "ccAddress3", {
            get: function () {
                return this._ccAddress3;
            },
            set: function (value) {
                this._ccAddress3 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "ccAddress4", {
            get: function () {
                return this._ccAddress4;
            },
            set: function (value) {
                this._ccAddress4 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "ccAddress5", {
            get: function () {
                return this._ccAddress5;
            },
            set: function (value) {
                this._ccAddress5 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SendEmailReportController.prototype, "countOfCCAddresses", {
            get: function () {
                return this._countOfCCAddresses;
            },
            set: function (value) {
                this._countOfCCAddresses = value;
            },
            enumerable: true,
            configurable: true
        });
        SendEmailReportController.className = "sendEmailReportController";
        SendEmailReportController.controllerAsName = "sendEmailReportCtrl";
        SendEmailReportController.$inject = ['templateRoot'];
        return SendEmailReportController;
    })();
    consumersite.SendEmailReportController = SendEmailReportController;
    moduleRegistration.registerController(consumersite.moduleName, SendEmailReportController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=sendEmailReport.controller.js.map