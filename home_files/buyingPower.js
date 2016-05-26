/// <reference path="../../viewModels/loan.viewModel.ts" />
var consumersite;
(function (consumersite) {
    var BuyingPowerController = (function () {
        function BuyingPowerController(loan, templateRoot) {
            this.loan = loan;
            this.templateRoot = templateRoot;
        }
        BuyingPowerController.className = 'buyingPowerController';
        BuyingPowerController.$inject = ['loan', 'templateRoot'];
        return BuyingPowerController;
    })();
    moduleRegistration.registerController(consumersite.moduleName, BuyingPowerController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=buyingPower.controller.js.map