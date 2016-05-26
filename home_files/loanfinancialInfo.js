var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var consumersite;
(function (consumersite) {
    var vm;
    (function (vm) {
        var LoanFinancialInfo = (function (_super) {
            __extends(LoanFinancialInfo, _super);
            function LoanFinancialInfo(applicationData, loanFinancialInfo) {
                _super.call(this, applicationData);
                this.getLoanFinancialInfo = function () { return loanFinancialInfo; };
            }
            Object.defineProperty(LoanFinancialInfo.prototype, "dti", {
                get: function () {
                    return this.getLoanFinancialInfo().dti;
                },
                set: function (dti) {
                    this.getLoanFinancialInfo().dti = dti;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "apr", {
                get: function () {
                    return this.getLoanFinancialInfo().apr;
                },
                set: function (apr) {
                    this.getLoanFinancialInfo().apr = apr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "isNoCost", {
                get: function () {
                    return this.getLoanFinancialInfo().isNoCost;
                },
                set: function (isNoCost) {
                    this.getLoanFinancialInfo().isNoCost = isNoCost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "amortizationType", {
                get: function () {
                    return this.getLoanFinancialInfo().amortizationType;
                },
                set: function (amortizationType) {
                    this.getLoanFinancialInfo().amortizationType = amortizationType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "adjustmentPeriod", {
                get: function () {
                    return this.getLoanFinancialInfo().adjustmentPeriod;
                },
                set: function (adjustmentPeriod) {
                    this.getLoanFinancialInfo().adjustmentPeriod = adjustmentPeriod;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "monthlyPayment", {
                get: function () {
                    return this.getLoanFinancialInfo().monthlyPayment;
                },
                set: function (monthlyPayment) {
                    this.getLoanFinancialInfo().monthlyPayment = monthlyPayment;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "baseInterestRate", {
                get: function () {
                    return this.getLoanFinancialInfo().baseInterestRate;
                },
                set: function (baseInterestRate) {
                    this.getLoanFinancialInfo().baseInterestRate = baseInterestRate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "term", {
                get: function () {
                    return this.getLoanFinancialInfo().term;
                },
                set: function (term) {
                    this.getLoanFinancialInfo().term = term;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "adjustedInterestRate", {
                get: function () {
                    return this.getLoanFinancialInfo().adjustedInterestRate;
                },
                set: function (adjustedInterestRate) {
                    this.getLoanFinancialInfo().adjustedInterestRate = adjustedInterestRate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "totalCost", {
                get: function () {
                    return this.getLoanFinancialInfo().totalCost;
                },
                set: function (totalCost) {
                    this.getLoanFinancialInfo().totalCost = totalCost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "mortgageType", {
                //mortgageType
                get: function () {
                    return this.getLoanFinancialInfo().mortgageType;
                },
                set: function (mortgageType) {
                    this.getLoanFinancialInfo().mortgageType = mortgageType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "cashOut", {
                /// set cashout flag
                get: function () {
                    return this.getLoanFinancialInfo().cashOut;
                },
                set: function (cashOut) {
                    this.getLoanFinancialInfo().cashOut = cashOut;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoanFinancialInfo.prototype, "cashOutAmount", {
                get: function () {
                    return this.getLoanFinancialInfo().cashOutAmount;
                },
                set: function (cashOutAmount) {
                    this.getLoanFinancialInfo().cashOutAmount = cashOutAmount;
                },
                enumerable: true,
                configurable: true
            });
            return LoanFinancialInfo;
        })(vm.ViewModelBase);
        vm.LoanFinancialInfo = LoanFinancialInfo;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=loanfinancialInfo.viewModel.js.map