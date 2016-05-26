/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
var consumersite;
(function (consumersite) {
    var SuccessController = (function () {
        function SuccessController(loan, loanAppPageContext, consumerLoanService, templateRoot, leadSourceService) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.consumerLoanService = consumerLoanService;
            this.templateRoot = templateRoot;
            this.leadSourceService = leadSourceService;
            this.controllerAsName = "successCntrl";
            this.IncomeTypeSelected = 1;
            this.FICOScoreArr = [this.loan.loanApp.borrower.ficoScore.equifax, this.loan.loanApp.borrower.ficoScore.experian, this.loan.loanApp.borrower.ficoScore.transunion];
            this.dualFICOScoreArr = [this.loan.loanApp.borrower.ficoScore.equifax, this.loan.loanApp.borrower.ficoScore.experian, this.loan.loanApp.borrower.ficoScore.transunion, this.loan.loanApp.coBorrower.ficoScore.equifax, this.loan.loanApp.coBorrower.ficoScore.experian, this.loan.loanApp.coBorrower.ficoScore.transunion];
            this.BelongsToVals = [
                { id: 1, name: 'Borrower' },
                { id: 2, name: 'CoBorrower' }
            ];
            this.BelongsToSelected = 1;
            this.IncomeTypeVals = [
                { id: 1, name: 'Social Security' },
                { id: 2, name: 'Alimony' },
                { id: 3, name: 'Child Support' },
                { id: 4, name: 'Other' }
            ];
            this.Scores = [
                { ScoreName: 'Experian', BorrowerScore: 755, CoBorrowerScore: 700 },
                { ScoreName: 'Equifax', BorrowerScore: 590, CoBorrowerScore: 500 },
                { ScoreName: 'TransUnion', BorrowerScore: 726, CoBorrowerScore: 350 }
            ];
            this.submit = function () {
                try {
                    _this.loan.currentMileStone = 2 /* Incomplete */;
                    _this.consumerLoanService.saveLoan(_this.loan);
                    // Nothing to do , just navigate to dashbaord
                    _this.loanAppPageContext.goToDashboard();
                }
                catch (e) {
                    // @todo-cc: Error handling
                    console.error(e);
                }
            };
            this._borrower = this.loan.loanApp.borrower;
            this._coBorrower = this.loan.loanApp.coBorrower;
        }
        Object.defineProperty(SuccessController.prototype, "BorrowerFullName", {
            get: function () {
                return this._borrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "BorrowerFirstName", {
            get: function () {
                return this._borrower.firstName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "BorrowerLastName", {
            get: function () {
                return this._borrower.lastName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "BorrowerFICOScores", {
            get: function () {
                var ficoScores = this.loan.loanApp.borrower.ficoScore;
                return ficoScores;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "CoBorrowerFullName", {
            get: function () {
                return this._coBorrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "CoBorrowerFirstName", {
            get: function () {
                return this._coBorrower.firstName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "CoBorrowerLastName", {
            get: function () {
                return this._coBorrower.lastName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "CoBorrowerFICOScores", {
            get: function () {
                var ficoScores = this.loan.loanApp.coBorrower.ficoScore;
                return ficoScores;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SuccessController.prototype, "maxFICOScore", {
            get: function () {
                var maxScore;
                if (this.CoBorrowerFullName === '' || this.CoBorrowerFullName === 'New Application') {
                    maxScore = Math.max.apply(Math, this.FICOScoreArr);
                }
                else {
                    maxScore = Math.max.apply(Math, this.dualFICOScoreArr);
                }
                return maxScore;
            },
            enumerable: true,
            configurable: true
        });
        SuccessController.prototype.calculateWidth = function (variableFICO) {
            var width = ((variableFICO - 500) / ((this.maxFICOScore - 500) / 150)) + 50;
            if (variableFICO == 0) {
                width = 50;
            }
            return width;
        };
        SuccessController.prototype.calculateWidthNarrowBP = function (variableFICO) {
            var width = ((variableFICO - 500) / ((this.maxFICOScore - 500) / 65)) + 40;
            if (variableFICO == 0) {
                width = 40;
            }
            return width;
        };
        Object.defineProperty(SuccessController.prototype, "leadSourcePhoneNumber", {
            get: function () {
                return this.leadSourceService.getLeadSourcePhoneNumber();
            },
            enumerable: true,
            configurable: true
        });
        SuccessController.className = "successController";
        SuccessController.$inject = ['loan', 'loanAppPageContext', 'consumerLoanService', 'templateRoot', 'leadSourceService'];
        return SuccessController;
    })();
    consumersite.SuccessController = SuccessController;
    moduleRegistration.registerController(consumersite.moduleName, SuccessController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=success.controller.js.map