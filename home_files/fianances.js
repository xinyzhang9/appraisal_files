/// <reference path='../../../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../viewModels/loan.viewModel.ts" />
var consumersite;
(function (consumersite) {
    var FianancesController = (function () {
        function FianancesController(loan, templateRoot) {
            this.loan = loan;
            this.templateRoot = templateRoot;
        }
        FianancesController.className = 'fianancesController';
        FianancesController.$inject = ['loan', 'templateRoot'];
        return FianancesController;
    })();
    moduleRegistration.registerController(consumersite.moduleName, FianancesController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=fianances.controller.js.map