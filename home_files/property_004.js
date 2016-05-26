/// <reference path='../../../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../viewModels/loan.viewModel.ts" />
var consumersite;
(function (consumersite) {
    var AffordabilityPropertyController = (function () {
        function AffordabilityPropertyController(loan, templateRoot) {
            this.loan = loan;
            this.templateRoot = templateRoot;
        }
        AffordabilityPropertyController.className = 'affordabilityPropertyController';
        AffordabilityPropertyController.$inject = ['loan', 'templateRoot'];
        return AffordabilityPropertyController;
    })();
    moduleRegistration.registerController(consumersite.moduleName, AffordabilityPropertyController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=property.controller.js.map