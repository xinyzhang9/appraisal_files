/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/underscore/underscore.d.ts" />
/// <reference path='providers/ui.navigation.provider.ts' />
var consumersite;
(function (consumersite) {
    var ConsumerSiteController = (function () {
        function ConsumerSiteController($state, uiNavigation, templateRoot, navigationService) {
            var _this = this;
            this.$state = $state;
            this.uiNavigation = uiNavigation;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.goToAuthenticate = function () {
                _this.navigationService.goToAuthentication();
            };
            this.goToDashboard = function () {
                _this.navigationService.goToDashboard();
            };
            this.goToPricing = function () {
                _this.navigationService.goToPricing();
            };
            this.goToLoanPurpose = function () {
                _this.navigationService.goToLoanPurpose();
            };
            this.goToMyLoans = function () {
                _this.navigationService.goToMyLoans();
            };
            this.goToState = function (stateName) {
                return _this.$state.href(stateName);
            };
            this.loanApp = uiNavigation().loanAppStates;
            this.nextStep = uiNavigation().myNextStepStates;
            this.affordability = uiNavigation().affordabilityStates;
        }
        ConsumerSiteController.className = "consumerSiteController";
        ConsumerSiteController.$inject = ['$state', 'uiNavigation', 'templateRoot', 'navigationService'];
        return ConsumerSiteController;
    })();
    consumersite.ConsumerSiteController = ConsumerSiteController;
    moduleRegistration.registerController(consumersite.moduleName, ConsumerSiteController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=consumersite.controller.js.map