/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
var consumersite;
(function (consumersite) {
    var LoanPurposeController = (function () {
        function LoanPurposeController(loan, loanAppPageContext, navigationService, consumerLoanService, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.navigationService = navigationService;
            this.consumerLoanService = consumerLoanService;
            this.templateRoot = templateRoot;
            this.refinanceMyHome = function () {
                _this.loanPurpose = 2 /* Refinance */;
                _this.navigateToPersonalInfo();
            };
            this.purchaseMyHome = function () {
                _this.loanPurpose = 1 /* Purchase */;
                _this.navigateToPersonalInfo();
            };
            this.loanPurpose = 0 /* None */;
        }
        LoanPurposeController.prototype.navigateToPersonalInfo = function () {
            this.loan.loanPurposeType = this.loanPurpose;
            this.navigationService.startLoanApp();
        };
        LoanPurposeController.className = "loanPurposeController";
        LoanPurposeController.$inject = [
            'loan',
            'loanAppPageContext',
            'navigationService',
            'consumerLoanService',
            'templateRoot'
        ];
        return LoanPurposeController;
    })();
    consumersite.LoanPurposeController = LoanPurposeController;
    moduleRegistration.registerController(consumersite.moduleName, LoanPurposeController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=loanPurpose.controller.js.map