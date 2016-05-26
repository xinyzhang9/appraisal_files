/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path='../../../angular/ts/extendedViewModels/employmentInfo.extendedViewModel.ts' />
/// <reference path="../../../angular/ts/lib/common.util.ts" />
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
        var Employment = (function (_super) {
            __extends(Employment, _super);
            function Employment(applicationData, employment) {
                var _this = this;
                _super.call(this, applicationData);
                this.branchConst = "Branch";
                this.companyNameConst = "Company Name"; //used in employment.template.html too
                this.getBaseIncomeInfo = function () {
                    var incomeTypeId;
                    switch (_this.employmentType) {
                        case 2 /* SelfEmployed */:
                            incomeTypeId = 16 /* SelfEmployedIncome */;
                            break;
                        case 0 /* ActiveMilitaryDuty */:
                            incomeTypeId = 11 /* MilitaryBasePay */;
                            break;
                        default:
                            incomeTypeId = 0 /* BaseEmployment */;
                    }
                    var baseEmployment = _this.getEmployment().incomeInfoByTypeId(incomeTypeId);
                    if (!baseEmployment) {
                        baseEmployment = new cls.IncomeInfoViewModel(_this.getEmployment().getTransactionInfo());
                        baseEmployment.incomeTypeId = incomeTypeId;
                        _this.getEmployment().getIncomeInformation().push(baseEmployment);
                    }
                    return baseEmployment;
                };
                this.isCurrentEmployment = function () {
                    return _this.employmentStatusId == 1 /* Current */;
                };
                this.isPreviousEmployment = function () {
                    return _this.employmentStatusId == 2 /* Previous */;
                };
                this.getEmployment = function () {
                    return employment;
                };
            }
            Object.defineProperty(Employment.prototype, "startingDate", {
                get: function () {
                    return this.getEmployment().employmentStartDate;
                },
                set: function (startingDate) {
                    this.getEmployment().employmentStartDate = startingDate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "endingDate", {
                get: function () {
                    return this.getEmployment().employmentEndDate;
                },
                set: function (endingDate) {
                    this.getEmployment().employmentEndDate = endingDate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "employmentType", {
                get: function () {
                    //will return value of srv.EmploymentTypeEnum Type for sure
                    return srv.EmploymentTypeEnum[srv.EmploymentTypeEnum[this.getEmployment().EmploymentTypeId]];
                },
                set: function (value) {
                    this.getEmployment().EmploymentTypeId = srv.EmploymentTypeEnum[srv.EmploymentTypeEnum[value]];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "positionDescription", {
                get: function () {
                    return this.getEmployment().positionDescription;
                },
                set: function (positionDescription) {
                    this.getEmployment().positionDescription = positionDescription;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "typeOfBusiness", {
                get: function () {
                    return this.getEmployment().typeOfBusiness;
                },
                set: function (typeOfBusiness) {
                    this.getEmployment().typeOfBusiness = typeOfBusiness;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "yearsInTheSameField", {
                get: function () {
                    return this.getEmployment().yearsInThisProfession;
                },
                set: function (yearsInTheSameField) {
                    this.getEmployment().yearsInThisProfession = yearsInTheSameField;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "companyName", {
                get: function () {
                    return this.getEmployment().name;
                },
                set: function (companyName) {
                    this.getEmployment().name = companyName;
                },
                enumerable: true,
                configurable: true
            });
            Employment.prototype.displayEmploymentName = function () {
                var _this = this;
                switch (this.employmentType) {
                    case 4 /* OtherOrUnemployed */:
                    case 3 /* Retired */:
                        return this.getApplicationData().lookup.employmentTypes[this.employmentType].text;
                    case 0 /* ActiveMilitaryDuty */:
                        if (this.branchOfService != "-1") {
                            var lookup = this.getApplicationData().lookup;
                            var selectedBranch = Enumerable.from(lookup.branchOfService).firstOrDefault(function (b) { return b.value == _this.branchOfService; }, null);
                            if (!(selectedBranch == null)) {
                                return selectedBranch.text;
                            }
                        }
                        return this.branchConst;
                    default:
                        return this.companyName;
                }
            };
            Employment.prototype.displayEmploymentNameDescription = function () {
                if (this.employmentType === 0 /* ActiveMilitaryDuty */) {
                    return this.branchConst;
                }
                return this.companyNameConst;
            };
            Employment.prototype.displayPositionDescription = function () {
                if (this.employmentType === 0 /* ActiveMilitaryDuty */) {
                    return "Rank";
                }
                return "Position";
            };
            Object.defineProperty(Employment.prototype, "branchOfService", {
                get: function () {
                    if (this.getEmployment().branchOfService == null) {
                        this.getEmployment().branchOfService = "-1";
                    }
                    return this.getEmployment().branchOfService;
                },
                set: function (value) {
                    this.getEmployment().branchOfService = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "businessPhone", {
                get: function () {
                    return this.getEmployment().businessPhone;
                },
                set: function (businessPhone) {
                    this.getEmployment().businessPhone = businessPhone;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "companyFullAddress", {
                get: function () {
                    return this.getEmployment().address.fullAddressString;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "companyStreet", {
                get: function () {
                    return this.getEmployment().address.streetName;
                },
                set: function (companyStreet) {
                    this.getEmployment().address.streetName = companyStreet;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "companyCity", {
                get: function () {
                    return this.getEmployment().address.cityName;
                },
                set: function (companyCity) {
                    this.getEmployment().address.cityName = companyCity;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "companyState", {
                get: function () {
                    return this.getEmployment().address.stateName;
                },
                set: function (companyState) {
                    this.getEmployment().address.stateName = companyState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "companyZip", {
                get: function () {
                    return this.getEmployment().address.zipCode;
                },
                set: function (companyZip) {
                    this.getEmployment().address.zipCode = companyZip;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "preferredPaymentPeriodId", {
                get: function () {
                    return this.getBaseIncomeInfo().preferredPaymentPeriodId;
                },
                set: function (preferredPaymentPeriodType) {
                    this.getBaseIncomeInfo().preferredPaymentPeriodId = preferredPaymentPeriodType;
                },
                enumerable: true,
                configurable: true
            });
            Employment.prototype.displayTotalIncome = function () {
                switch (this.employmentType) {
                    case 3 /* Retired */:
                    case 4 /* OtherOrUnemployed */:
                        return "";
                    default:
                        return common.string.isNullOrWhiteSpace(this.baseSalarayFormatted) ? "$0" : this.baseSalarayFormatted;
                }
            };
            Object.defineProperty(Employment.prototype, "currencyField", {
                get: function () {
                    return this._currencyField;
                },
                set: function (value) {
                    this._currencyField = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "baseSalarayFormatted", {
                //TODO: Research a better way of handling the Master List on the Employment.html page without doing this.
                //TO do: First base Salary returned as string, rest are number. Make it consistent and use currency filter.
                get: function () {
                    if (!this.baseSalary) {
                        return "";
                    }
                    return this.numberFormatted(this.baseSalary.toString()) + (this.getBaseIncomeInfo().preferredPaymentPeriodId == 1 /* Monthly */ ? " /mo" : " /yr");
                },
                enumerable: true,
                configurable: true
            });
            Employment.prototype.numberFormatted = function (valString) {
                if (valString.indexOf("$") > -1) {
                    valString = valString.replace("$", "");
                }
                if (valString.indexOf(",") > -1) {
                    valString = valString.replace(",", "");
                }
                var intNum = Math.round(parseFloat(valString));
                return "$" + intNum.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            };
            Object.defineProperty(Employment.prototype, "baseSalary", {
                get: function () {
                    return lib.getBindingNumericValue(this.getBaseIncomeInfo().amount);
                },
                set: function (value) {
                    this.getBaseIncomeInfo().amount = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "employmentStatusId", {
                get: function () {
                    return this.getEmployment().EmploymentStatusId;
                },
                set: function (employmentStatusId) {
                    /* read only */
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Employment.prototype, "isRemoved", {
                get: function () {
                    return this.getEmployment().isRemoved;
                },
                set: function (isRemove) {
                    this.getEmployment().isRemoved = isRemove;
                },
                enumerable: true,
                configurable: true
            });
            //validation
            Employment.prototype.isValidPositionDescription = function () {
                var verifyEmploymentType = [
                    1 /* SalariedEmployee */,
                    2 /* SelfEmployed */,
                ];
                if (verifyEmploymentType.indexOf(this.employmentType) >= 0) {
                    return !common.string.isNullOrWhiteSpace(this.positionDescription);
                }
                //valid by default for all other employmentTypes
                return true;
            };
            Employment.prototype.isValidCompanyName = function () {
                var verifyEmploymentType = [
                    1 /* SalariedEmployee */,
                    2 /* SelfEmployed */
                ];
                if (verifyEmploymentType.indexOf(this.employmentType) >= 0) {
                    return !common.string.isNullOrWhiteSpace(this.companyName);
                }
                //valid by default for all other employmentTypes
                return true;
            };
            Employment.prototype.isValidStartingDate = function () {
                var verifyEmploymentType = [
                    1 /* SalariedEmployee */,
                    2 /* SelfEmployed */,
                    0 /* ActiveMilitaryDuty */,
                    3 /* Retired */
                ];
                var now = new Date();
                if (verifyEmploymentType.indexOf(this.employmentType) >= 0) {
                    return !(this.startingDate == null) && (this.startingDate < now) && ((this.endingDate == null) || (this.employmentType === 3 /* Retired */) || ((this.employmentType !== 3 /* Retired */) && (this.endingDate >= this.startingDate)));
                }
                //valid by default for all other employmentTypes
                return true;
            };
            Employment.prototype.isValidEndingDate = function () {
                if (this.isCurrentEmployment())
                    return true;
                //assuming startingDate is valid - it needs to be validated first.
                var verifyEmploymentType = [
                    1 /* SalariedEmployee */,
                    2 /* SelfEmployed */,
                    0 /* ActiveMilitaryDuty */
                ];
                var now = new Date();
                if (verifyEmploymentType.indexOf(this.employmentType) >= 0) {
                    return (!(this.endingDate == null)) && (this.endingDate < now) && (this.endingDate >= this.startingDate);
                }
                //valid by default for all other employmentTypes
                return true;
            };
            Employment.prototype.isValidTotalIncome = function () {
                var verifyEmploymentType = [
                    1 /* SalariedEmployee */,
                    2 /* SelfEmployed */,
                    0 /* ActiveMilitaryDuty */
                ];
                if (verifyEmploymentType.indexOf(this.employmentType) >= 0) {
                    return this.baseSalary && this.baseSalary >= 0;
                }
                //valid by default for all other employmentTypes
                return true;
            };
            Employment.prototype.isValidBranch = function () {
                var verifyEmploymentType = [
                    0 /* ActiveMilitaryDuty */
                ];
                if (verifyEmploymentType.indexOf(this.employmentType) >= 0) {
                    return !(this.branchOfService == null) && !(this.branchOfService == "-1"); //-1 string has "select one" text in lookup
                }
                //valid by default for all other employmentTypes
                return true;
            };
            return Employment;
        })(vm.ViewModelBase);
        vm.Employment = Employment;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=employment.viewModel.js.map