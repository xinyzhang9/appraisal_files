var consumersite;
(function (consumersite) {
    var LoanSnapShotService = (function () {
        function LoanSnapShotService() {
            var _this = this;
            this.loanSnapShots = [];
            this.setLoanSnapShots = function (loanSnapShots) {
                var sortedLoanSnapShots = Enumerable.from(loanSnapShots).orderBy(function (e) { return e.loanCreatedDate; }).orderBy(function (e) { return e.subjectPropertyState; }).thenBy(function (e) { return e.subjectPropertyAddress; }).thenBy(function (e) { return e.subjectPropertyZip; }).toArray();
                _this.loanSnapShots = sortedLoanSnapShots;
                //this.loanSnapShots = loanSnapShots;
            };
            this.clearLoanSnapShots = function () {
                _this.loanSnapShots = [];
            };
            this.hasLoanSnapShots = function () {
                return _this.loanSnapShots && _this.loanSnapShots.length > 0;
            };
            this.selectedLoan = function (loan) {
                //var index = lib.findIndex(this.loanSnapShots, lss => lss.loanId == loan.loanId);
                //if (index >= 0) {
                //    lib.removeAt(this.loanSnapShots, index);
                //}
                //this.loanSnapShots.push(new LoanSnapShotFacade(loan));
            };
            this.getLoanSnapshots = function () {
                //var sortedLoanSnapShots = Enumerable.from(this.loanSnapShots)
                //    //.orderBy((e) => e.loanCreatedDate)
                //     .orderBy((e) => e.subjectPropertyState)
                //    .thenBy((e) => e.subjectPropertyAddress)
                //    .thenBy((e) => e.subjectPropertyZip)
                //    .toArray();
                //this.loanSnapShots = sortedLoanSnapShots;
                return _this.loanSnapShots;
            };
        }
        Object.defineProperty(LoanSnapShotService.prototype, "loanSnapShotsList", {
            get: function () {
                return this.loanSnapShots;
            },
            enumerable: true,
            configurable: true
        });
        LoanSnapShotService.className = 'loanSnapShotService';
        LoanSnapShotService.$inject = [];
        return LoanSnapShotService;
    })();
    consumersite.LoanSnapShotService = LoanSnapShotService;
    var LoanSnapShotFacade = (function () {
        function LoanSnapShotFacade(loan) {
            this.loan = loan;
        }
        Object.defineProperty(LoanSnapShotFacade.prototype, "currentMilestone", {
            get: function () {
                return this.loan.currentMileStone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "loanAmount", {
            get: function () {
                return this.loan.loanAmount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "loanId", {
            //get loanCreatedDate(): Date
            //    return this.loan.
            //}
            get: function () {
                return this.loan.loanId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "loanPurpose", {
            get: function () {
                return this.loan.loanPurposeType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "loanRate", {
            get: function () {
                if (this.loan.pricingProduct && this.loan.pricingProduct.rate) {
                    return this.loan.pricingProduct.rate > 0 ? this.loan.pricingProduct.rate : this.loan.financialInfo.baseInterestRate;
                }
                return 0.0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "subjectPropertyAddress", {
            get: function () {
                if (this.loan.property && this.loan.property.streetName) {
                    return this.loan.property.fullAddress;
                }
                else {
                    return "TBD";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "subjectPropertyCity", {
            get: function () {
                if (this.loan.property && this.loan.property.cityName) {
                    return this.loan.property.cityName;
                }
                else {
                    return "TBD";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "subjectPropertyState", {
            get: function () {
                if (this.loan.property && this.loan.property.stateName) {
                    return this.loan.property.stateName;
                }
                else {
                    return "TBD";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "subjectPropertyZip", {
            get: function () {
                if (this.loan.property && this.loan.property.zipCode) {
                    return this.loan.property.zipCode;
                }
                else {
                    return "TBD";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanSnapShotFacade.prototype, "loanApplicationId", {
            get: function () {
                return this.loan.loanApp.loanApplicationId;
            },
            enumerable: true,
            configurable: true
        });
        return LoanSnapShotFacade;
    })();
    moduleRegistration.registerService(consumersite.moduleName, LoanSnapShotService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=loansnapshot.service.js.map