/// <reference path='../../../angular/ts/extendedViewModels/incomeInfo.extendedViewModel.ts' />
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
        var OtherIncome = (function (_super) {
            __extends(OtherIncome, _super);
            function OtherIncome(applicationData, loanApplication, otherIncome) {
                _super.call(this, applicationData);
                this._borrowerFullName = "";
                this._borrowerInitials = "";
                this._borrowerFirstLastName = "";
                this.getLoanApplication = function () { return loanApplication; };
                this.getIncome = function () { return otherIncome; };
            }
            Object.defineProperty(OtherIncome.prototype, "borrowerFullName", {
                get: function () {
                    switch (this.currentOwnerType) {
                        case 1 /* Borrower */:
                            this._borrowerFullName = this.getLoanApplication().getBorrower().getFullName();
                            break;
                        case 2 /* CoBorrower */:
                            this._borrowerFullName = this.getLoanApplication().getCoBorrower().getFullName();
                            break;
                        case 3 /* Joint */:
                            this._borrowerFullName = "Joint";
                            break;
                    }
                    return this._borrowerFullName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "borrowerFirstLastName", {
                get: function () {
                    switch (this.currentOwnerType) {
                        case 1 /* Borrower */:
                            this._borrowerFirstLastName = this.getLoanApplication().getBorrower().getFirstLastName();
                            break;
                        case 2 /* CoBorrower */:
                            this._borrowerFirstLastName = this.getLoanApplication().getCoBorrower().getFirstLastName();
                            break;
                        case 3 /* Joint */:
                            this._borrowerFirstLastName = "Joint";
                            break;
                    }
                    return this._borrowerFirstLastName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "borrowerInitials", {
                get: function () {
                    switch (this.currentOwnerType) {
                        case 1 /* Borrower */:
                            {
                                if ((!this.getLoanApplication().getBorrower().firstName) || (!this.getLoanApplication().getBorrower().lastName))
                                    this._borrowerInitials = "";
                                else {
                                    switch (this.getLoanApplication().getBorrower().middleName != null) {
                                        case false:
                                            this._borrowerInitials = this.getLoanApplication().getBorrower().firstName.substring(0, 1) + this.getLoanApplication().getBorrower().lastName.substring(0, 1);
                                            break;
                                        case true:
                                            this._borrowerInitials = this.getLoanApplication().getBorrower().firstName.substring(0, 1) + this.getLoanApplication().getBorrower().middleName.substring(0, 1) + this.getLoanApplication().getBorrower().lastName.substring(0, 1);
                                            break;
                                    }
                                }
                            }
                            break;
                        case 2 /* CoBorrower */:
                            {
                                if ((!this.getLoanApplication().getCoBorrower().firstName) || (!this.getLoanApplication().getCoBorrower().lastName))
                                    this._borrowerInitials = "";
                                else {
                                    switch (this.getLoanApplication().getCoBorrower().middleName != null) {
                                        case false:
                                            this._borrowerInitials = this.getLoanApplication().getCoBorrower().firstName.substring(0, 1) + this.getLoanApplication().getCoBorrower().lastName.substring(0, 1);
                                            break;
                                        case true:
                                            this._borrowerInitials = this.getLoanApplication().getCoBorrower().firstName.substring(0, 1) + this.getLoanApplication().getCoBorrower().middleName.substring(0, 1) + this.getLoanApplication().getCoBorrower().lastName.substring(0, 1);
                                            break;
                                    }
                                }
                            }
                            break;
                    }
                    return this._borrowerInitials;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "borrowerId", {
                get: function () {
                    return this.getIncome().borrowerId;
                },
                set: function (borrowerId) {
                    this.getIncome().borrowerId = borrowerId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "ownerType", {
                get: function () {
                    return this.currentOwnerType;
                },
                set: function (ownerType) {
                    var _this = this;
                    if (ownerType == 2 /* CoBorrower */ && this.currentOwnerType == 1 /* Borrower */) {
                        lib.removeFirst(this.getLoanApplication().getBorrower().getOtherIncomes(), function (income) { return income.incomeInfoId == _this.getIncome().incomeInfoId; });
                    }
                    else if ((ownerType == 1 /* Borrower */) && this.currentOwnerType == 2 /* CoBorrower */) {
                        lib.removeFirst(this.getLoanApplication().getCoBorrower().getOtherIncomes(), function (income) { return income.incomeInfoId == _this.getIncome().incomeInfoId; });
                    }
                    if (ownerType == 2 /* CoBorrower */) {
                        this.getLoanApplication().getCoBorrower().setOtherIncomes([this.getIncome()]);
                    }
                    else {
                        this.getLoanApplication().getBorrower().setOtherIncomes([this.getIncome()]);
                    }
                    this.currentOwnerType = ownerType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "incomeType", {
                //Test this after we are saving.
                get: function () {
                    return this.getIncome().incomeTypeId;
                },
                set: function (incomeType) {
                    this.getIncome().incomeTypeId = incomeType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "incomeTypeName", {
                get: function () {
                    return this._incomeTypeName;
                },
                set: function (value) {
                    this._incomeTypeName = value;
                },
                enumerable: true,
                configurable: true
            });
            OtherIncome.prototype.setIncomeTypeName = function (lookupArray, typeVal) {
                for (var i = 0; i < lookupArray.length; i++) {
                    if (lookupArray[i].value == typeVal)
                        this._incomeTypeName = lookupArray[i].text;
                }
            };
            OtherIncome.prototype.setIncomeOwnerName = function (lookupArray, typeVal) {
                for (var i = 0; i < lookupArray.length; i++) {
                    if (lookupArray[i].value == typeVal) {
                        this.currentOwnerType = typeVal;
                        this.borrowerFullName = lookupArray[i].text;
                    }
                }
            };
            Object.defineProperty(OtherIncome.prototype, "incomeValue", {
                //The view doesn't want a zero if it is empty.  It wants null or ""
                //This is done to ensure the cls.IncomeInfoViewModel does not change the value of the amount to be zero if it is undefined/null/empty.
                get: function () {
                    var amount = lib.getBindingNumericValue(this.getIncome().amount);
                    //Make sure that value is populated without currency format
                    //Currency format is being handled in html file
                    if (amount != null && (amount.toString().indexOf('$') > 0 || amount.toString().indexOf(',') > 0 || amount.toString().indexOf('.00') > 0)) {
                        var val = amount.toString().replace("$", "").replace(",", "").replace(".00", "");
                        amount = parseFloat(val);
                    }
                    return amount;
                },
                set: function (incomeValue) {
                    if (angular.isDefined(incomeValue) && (incomeValue.toString().indexOf('$') > 0 || incomeValue.toString().indexOf(',') > 0 || incomeValue.toString().indexOf('.00') > 0)) {
                        //Make sure that value is populated without currency format
                        //So that save will not fail
                        var val = incomeValue.toString().replace("$", "").replace(",", "").replace(".00", "");
                        incomeValue = parseFloat(val);
                    }
                    this.getIncome().amount = incomeValue;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "preferredPaymentPeriodId", {
                get: function () {
                    return this.getIncome().PreferredPaymentPeriodId;
                },
                set: function (id) {
                    this.getIncome().PreferredPaymentPeriodId = id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OtherIncome.prototype, "isRemoved", {
                get: function () {
                    return this.getIncome().isRemoved;
                },
                set: function (isRemove) {
                    this.getIncome().isRemoved = isRemove;
                },
                enumerable: true,
                configurable: true
            });
            return OtherIncome;
        })(vm.ViewModelBase);
        vm.OtherIncome = OtherIncome;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=otherIncome.viewModel.js.map