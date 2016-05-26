/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var ActionNotificationController = (function () {
        function ActionNotificationController(navigationService, templateRoot) {
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.coBorrowerChangeNotification = "Adding or removing a Co-Borrower will require you to verify the information you’ve previously entered on each page to ensure we have the right information to process your loan.";
            this.addressChangeNotification = "Changing your current address will require you to verify your previously entered current address information on the next page.";
            this.coBorrowerAddressChangeNotification = "Changing the Co-Borrower current address will require you to provide the Co-Borrower current address information on the next page.";
            this.employmentHistoryChangeNotification = "You're detail oriented and we like it.  To ensure we have enough employment history please provide us with some previous employment information on the next page.";
        }
        Object.defineProperty(ActionNotificationController.prototype, "getCurrentNotificationText", {
            get: function () {
                switch (this.navigationService.currentPageNavigationState) {
                    case 268435457 /* BorrowerPersonalInfo */:
                        this.currentNotificationText = this.coBorrowerChangeNotification;
                        return this.currentNotificationText;
                    case 268435459 /* PropertyInfo */:
                        this.currentNotificationText = this.addressChangeNotification;
                        return this.currentNotificationText;
                    case 268435461 /* CoBorrowerAddressInfo */:
                    case 268435460 /* BorrowerAddressInfo */:
                        this.currentNotificationText = this.coBorrowerAddressChangeNotification;
                        return this.currentNotificationText;
                    case 268435462 /* BorrowerEmployment */:
                        this.currentNotificationText = this.employmentHistoryChangeNotification;
                        return this.currentNotificationText;
                    default:
                        return this.currentNotificationText;
                }
            },
            enumerable: true,
            configurable: true
        });
        ActionNotificationController.className = 'actionNotificationController';
        ActionNotificationController.$inject = ['navigationService', 'templateRoot'];
        return ActionNotificationController;
    })();
    directive.ActionNotificationController = ActionNotificationController;
    var ActionNotificationDirective = (function () {
        function ActionNotificationDirective(templateRoot) {
            this.templateRoot = templateRoot;
            this.controller = 'actionNotificationController';
            this.controllerAs = 'actionNotController';
            this.restrict = 'E';
        }
        ActionNotificationDirective.createNew = function (args) {
            return new ActionNotificationDirective(args[0]);
        };
        Object.defineProperty(ActionNotificationDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/actionnotification/action-notification.html';
            },
            enumerable: true,
            configurable: true
        });
        ActionNotificationDirective.className = 'actionNotification';
        ActionNotificationDirective.$inject = ['templateRoot'];
        return ActionNotificationDirective;
    })();
    directive.ActionNotificationDirective = ActionNotificationDirective;
    moduleRegistration.registerController(consumersite.moduleName, ActionNotificationController);
    moduleRegistration.registerDirective(consumersite.moduleName, ActionNotificationDirective);
})(directive || (directive = {}));
//# sourceMappingURL=actionNotificaiton.directive.js.map