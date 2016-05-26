/// <reference path='../../../angular/ts/extendedViewModels/property.extendedViewModel.ts' />
/// <reference path='../../../angular/ts/generated/enums.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*********************************************************************
* Jacob Nix
* This entire view model is READ only.  It was designed to only
* handle the products as they return from the get pricing
* product service.  Not to store directly on the loan.
**********************************************************************/
var consumersite;
(function (consumersite) {
    var vm;
    (function (vm) {
        var ProductItem = (function (_super) {
            __extends(ProductItem, _super);
            function ProductItem(applicationData, productItem) {
                var _this = this;
                _super.call(this, applicationData);
                this.getloanType = function (amortizationTypeLookupArray, mortgageTypeLookupArray) {
                    var product = _this.getProductItem();
                    var mortgageType = product.mortgageType.toString();
                    var num = product.amortizationType.toString();
                    var res1 = "";
                    for (var i = 0; i < amortizationTypeLookupArray.length; i++) {
                        if (amortizationTypeLookupArray[i].value === num)
                            res1 = amortizationTypeLookupArray[i].text;
                    }
                    if (res1 !== "Fixed" && res1 !== "ARM") {
                        res1 = "";
                    }
                    var res2 = "";
                    for (var i = 0; i < mortgageTypeLookupArray.length; i++) {
                        if (mortgageTypeLookupArray[i].value === mortgageType)
                            res2 = mortgageTypeLookupArray[i].text;
                    }
                    if (res2 !== "FHA" && res2 !== "VA") {
                        res2 = "";
                    }
                    var res = res1 + " " + res2;
                    return res.trim();
                };
                this.compare = false;
                this.getProductItem = function () { return productItem; };
            }
            Object.defineProperty(ProductItem.prototype, "isForTopPick", {
                get: function () {
                    return this.getProductItem().isForTopPick;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isForLowrateArm", {
                get: function () {
                    return this.getProductItem().isForLowrateArm;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isForPayOffQuickly", {
                get: function () {
                    return this.getProductItem().isForPayOffQuickly;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isForLowFixedRate", {
                get: function () {
                    return this.getProductItem().isForLowFixedRate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isForNoCost", {
                get: function () {
                    return this.getProductItem().isForNoCost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "showPriceDetail", {
                get: function () {
                    return this.getProductItem().showPriceDetail;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "productId", {
                get: function () {
                    return this.getProductItem().productId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "productName", {
                get: function () {
                    return this.getProductItem().productName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "loanAmortizationTerm", {
                get: function () {
                    return this.getProductItem().loanAmortizationTerm;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "amortizationType", {
                get: function () {
                    return this.getProductItem().amortizationType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "adjustmentPeriod", {
                get: function () {
                    return this.getProductItem().adjustmentPeriod;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "titleYears", {
                get: function () {
                    return this.getProductItem().amortizationType == 1 ? this.getProductItem().loanAmortizationTerm : this.getProductItem().loanAmortizationFixedTerm;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "rate", {
                get: function () {
                    return this.getProductItem().rate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "apr", {
                get: function () {
                    return this.getProductItem().paymentBreakdownModalVM.apr;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "pricePercentage", {
                get: function () {
                    return this.getProductItem().pricePercentage;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "pricePoints", {
                get: function () {
                    return this.getProductItem().pricePoints;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "monthlyPayment", {
                get: function () {
                    return this.getProductItem().paymentBreakdownModalVM.totalMonthlyPayment;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "principalAndInterest", {
                get: function () {
                    return this.getProductItem().paymentBreakdownModalVM.principalAndInterest;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "totalLenderCosts", {
                get: function () {
                    return this.getProductItem().costDetails.totalLenderCosts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "loanOptionType", {
                get: function () {
                    return this.getProductItem().loanOptionType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "baseLoanAmount", {
                get: function () {
                    return this.getProductItem().costDetails.baseLoanAmount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "ufmipAddedToLoan", {
                get: function () {
                    return this.getProductItem().costDetails.ufmipAddedToLoan;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "usdaGFeeAddedToLoan", {
                get: function () {
                    return this.getProductItem().costDetails.usdaGFeeAddedToLoan;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "vaffAddedToLoan", {
                get: function () {
                    return this.getProductItem().costDetails.vaffAddedToLoan;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "lenderCost", {
                get: function () {
                    return this.getProductItem().costDetails.lenderCost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "totalLoanAmount", {
                get: function () {
                    return this.getProductItem().costDetails.totalLoanAmount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "thirdPartyCosts", {
                get: function () {
                    return this.getProductItem().costDetails.thirdPartyCosts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "totalThirdPartyCosts", {
                get: function () {
                    return this.getProductItem().costDetails.totalThirdPartyCosts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "reservesCosts", {
                get: function () {
                    return this.getProductItem().costDetails.reservesCosts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "totalReserves", {
                get: function () {
                    return this.getProductItem().costDetails.totalReserves;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "totalEstimatedClosingCosts", {
                get: function () {
                    return this.getProductItem().costDetails.totalEstimatedClosingCosts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "reservesAndPrepaids", {
                get: function () {
                    return this.getProductItem().costDetails.reservesAndPrepaids;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "mortgageType", {
                get: function () {
                    return this.getProductItem().mortgageType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "prepaidCosts", {
                get: function () {
                    return this.getProductItem().costDetails.prepaidCosts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "totalPrepaids", {
                get: function () {
                    return this.getProductItem().costDetails.totalPrepaids;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isLowCost", {
                get: function () {
                    return (this.getProductItem().loanOptionType.toString() == "3" || this.getProductItem().loanOptionType.toString() == "13" || this.getProductItem().loanOptionType.toString() == "14");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isTopPick", {
                get: function () {
                    //return (this.getProductItem().isForTopPick || this.getProductItem().loanOptionType.toString() == "10" || this.getProductItem().loanOptionType.toString() == "11" || this.getProductItem().loanOptionType.toString() == "13" || this.getProductItem().loanOptionType.toString() == "14" || this.getProductItem().loanOptionType.toString() == "16");
                    return (this.getProductItem().isForTopPick);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isLowRateARM", {
                get: function () {
                    //return (this.getProductItem().loanOptionType.toString() == "6");
                    return (this.getProductItem().isForLowrateArm);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isPayoffQuickly", {
                get: function () {
                    //return (this.getProductItem().loanOptionType.toString() == "5" || this.getProductItem().loanOptionType.toString() == "9" || this.getProductItem().loanOptionType.toString() == "15" || this.getProductItem().loanOptionType.toString() == "16");
                    return (this.getProductItem().isForPayOffQuickly);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isLowFixed", {
                get: function () {
                    //return (this.getProductItem().loanOptionType.toString() == "1" || this.getProductItem().loanOptionType.toString() == "11");
                    return (this.getProductItem().isForLowFixedRate);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isNoCost", {
                get: function () {
                    //return (this.getProductItem().loanOptionType.toString() == "2" || this.getProductItem().loanOptionType.toString() == "8");
                    return (this.getProductItem().isForNoCost);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductItem.prototype, "isShowPriceDetail", {
                get: function () {
                    return (this.getProductItem().showPriceDetail);
                },
                enumerable: true,
                configurable: true
            });
            return ProductItem;
        })(vm.ViewModelBase);
        vm.ProductItem = ProductItem;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=productItem.viewModel.js.map