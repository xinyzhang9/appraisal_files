/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
/// <reference path="../../services/leadsource.service.ts" />
var consumersite;
(function (consumersite) {
    var MainNavbarController = (function () {
        function MainNavbarController(authenticationService, loanAppPageContext, navigationService, templateRoot, $log, leadSourceService) {
            var _this = this;
            this.authenticationService = authenticationService;
            this.loanAppPageContext = loanAppPageContext;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.$log = $log;
            this.leadSourceService = leadSourceService;
            //properties
            this.isMobileMenuOpen = false;
            this.showLoggedInMenu = false;
            this.getDashboardLink = function () {
                return _this.navigationService.getDashboardLink();
            };
            this.getMyLoansLink = function () {
                return _this.navigationService.getMyLoansLink();
            };
            this.signout_Click = function () {
                _this.navigationService.signOut();
            };
            this.getSignInLink = function () {
                return _this.navigationService.getSignInLink();
            };
            this.$log.info('isAuthenticated: ' + authenticationService.isAuthenticated());
            this.showLoggedInMenu = authenticationService.isAuthenticated();
        }
        MainNavbarController.prototype.toggleMobileMenu = function () {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        };
        Object.defineProperty(MainNavbarController.prototype, "leadSourcePhoneNumber", {
            //Move this into leadSourceService
            get: function () {
                return this.leadSourceService.getLeadSourcePhoneNumber();
            },
            enumerable: true,
            configurable: true
        });
        MainNavbarController.className = "mainNavbarController";
        MainNavbarController.controllerAsName = "mainNavbarCntrl";
        MainNavbarController.$inject = ['authenticationService', 'loanAppPageContext', 'navigationService', 'templateRoot', '$log', 'leadSourceService'];
        return MainNavbarController;
    })();
    consumersite.MainNavbarController = MainNavbarController;
    moduleRegistration.registerController(consumersite.moduleName, MainNavbarController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=mainNavbar.controller.js.map