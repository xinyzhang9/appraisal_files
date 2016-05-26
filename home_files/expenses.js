/// <reference path='../../../../Scripts/typings/angularjs/angular.d.ts'/>
/// <reference path="../../viewModels/loan.viewModel.ts" />
var consumersite;
(function (consumersite) {
    var ExpensesController = (function () {
        function ExpensesController(loan, templateRoot) {
            this.loan = loan;
            this.templateRoot = templateRoot;
        }
        ExpensesController.className = 'expensesController';
        ExpensesController.$inject = ['loan', 'templateRoot'];
        return ExpensesController;
    })();
    moduleRegistration.registerController(consumersite.moduleName, ExpensesController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=expenses.controller.js.map