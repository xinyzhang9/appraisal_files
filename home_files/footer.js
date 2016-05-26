/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var FooterController = (function () {
        function FooterController(navigationService, loan, templateRoot) {
            this.navigationService = navigationService;
            this.loan = loan;
            this.templateRoot = templateRoot;
        }
        FooterController.className = "footerController";
        FooterController.$inject = ['navigationService', 'loan', 'templateRoot'];
        return FooterController;
    })();
    consumersite.FooterController = FooterController;
    moduleRegistration.registerController(consumersite.moduleName, FooterController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=footer.controller.js.map