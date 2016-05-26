/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var TooltipController = (function () {
        function TooltipController($scope, templateRoot) {
            this.$scope = $scope;
            this.templateRoot = templateRoot;
            this.init(this.$scope.cvTooltip);
        }
        TooltipController.prototype.init = function (tooltip) {
            this._tooltips = [];
            switch (tooltip) {
                case 'interest': {
                    this._tooltips.push({ title: "Interest:", text: "The amount charged, expressed as a percentage of the principal, by a lender to a borrower for the use of assets, in this case your home.   Interest is essentially a rental, or leasing charge to the borrower, for the asset's use." });
                    this._tooltips.push({ title: "APR:", text: "The annual rate that is charged for borrowing, expressed as a single percentage number that represents the actual yearly cost of funds over the term of a loan. This includes any fees or additional costs associated with the transaction." });
                    break;
                }
                case 'closingCost': {
                    this._tooltips.push({ title: "Est. Closing Cost:", text: "These are expenses, over and above the price of the property, which buyers and sellers normally incur to complete a real estate transaction.  Based on the location of the property, costs include loan, title and escrow, appraisal, and deed-recording fees." });
                    break;
                }
                case 'payment': {
                    this._tooltips.push({ title: "Payment (P&I):", text: "A periodic payment, usually paid monthly.  Principal is the money used to pay down the balance of the loan; interest is the charge you pay to the lender for the privilege of borrowing the money." });
                    break;
                }
                default: {
                    this._tooltips.push({ title: "", text: "" });
                }
            }
        };
        Object.defineProperty(TooltipController.prototype, "tooltips", {
            get: function () {
                return this._tooltips;
            },
            enumerable: true,
            configurable: true
        });
        TooltipController.className = 'cvTooltipController';
        TooltipController.$inject = ['$scope', 'templateRoot'];
        return TooltipController;
    })();
    var TooltipDirective = (function () {
        function TooltipDirective(templateRoot) {
            this.templateRoot = templateRoot;
            this.scope = {
                cvTooltip: '@'
            };
            //cv == "Cloud Virga"
            this.controller = 'cvTooltipController';
            this.controllerAs = 'cvTooltipCntrl';
            this.restrict = 'A';
            this.replace = false;
        }
        TooltipDirective.createNew = function (args) {
            return new TooltipDirective(args[0]);
        };
        Object.defineProperty(TooltipDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/tooltip/tooltip-template.html';
            },
            enumerable: true,
            configurable: true
        });
        //cv == "Cloud Virga"
        TooltipDirective.className = 'cvTooltip';
        TooltipDirective.$inject = ['templateRoot'];
        return TooltipDirective;
    })();
    moduleRegistration.registerDirective(consumersite.moduleName, TooltipDirective);
    moduleRegistration.registerController(consumersite.moduleName, TooltipController);
})(directive || (directive = {}));
//# sourceMappingURL=tooltip.directive.js.map