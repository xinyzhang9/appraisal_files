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
        var Declarations = (function (_super) {
            __extends(Declarations, _super);
            function Declarations(applicationData, declarations) {
                var _this = this;
                _super.call(this, applicationData);
                //REFACTOR: Issue with srv.cls.DeclarationInfoViewModel, ALL ARE NUMBERS! AND THEY ARE BACKWARDS, YES = 0, NO = 1!!!!
                //PS: I hate myself for this.
                this._yes = 0;
                this._no = 1;
                this.isNumberTrue = function (compare) {
                    return compare == 0;
                };
                this.convertBooleanToNumber = function (bool) {
                    if (bool) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                };
                this.clearDeclarations = function () {
                    _this.getDeclarations().race.iDoNotWishToFurnishThisInformation = false;
                    _this.getDeclarations().race.americanIndianOrAlaskaNative = false;
                    _this.getDeclarations().race.asian = false;
                    _this.getDeclarations().race.blackOrAfricanAmerican = false;
                    _this.getDeclarations().race.nativeHawaiianOrOtherPacificIslander = false;
                    _this.getDeclarations().race.white = false;
                    _this.getDeclarations().race.notApplicable = false;
                };
                this.getDeclarations = function () { return declarations; };
            }
            Object.defineProperty(Declarations.prototype, "additionalInformationCheckboxIndicator", {
                //Government Monitoring Page
                //Do you want to disclose this info?
                get: function () {
                    return this.getDeclarations().additionalInformationCheckboxIndicator;
                },
                set: function (additionalInformationCheckboxIndicator) {
                    this.getDeclarations().additionalInformationCheckboxIndicator = additionalInformationCheckboxIndicator;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "ethnicityId", {
                //Are you hispanic or latino?
                get: function () {
                    return this.getDeclarations().ethnicityId;
                },
                set: function (ethnicityId) {
                    this.getDeclarations().ethnicityId = ethnicityId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "race", {
                //Are you Alaska Natice, Black or AA, etc.
                get: function () {
                    return this.getDeclarations().race;
                },
                set: function (race) {
                    this.getDeclarations().race = race;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "sexId", {
                //Are you male or female?
                get: function () {
                    return this.getDeclarations().sexId;
                },
                set: function (sexId) {
                    this.getDeclarations().sexId = sexId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "outstandingJudgmentsIndicator", {
                //Declarations Page
                //a
                get: function () {
                    return this.getDeclarations().outstandingJudgmentsIndicator;
                },
                set: function (value) {
                    this.getDeclarations().outstandingJudgmentsIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "bankrupcyIndicator", {
                //b        
                get: function () {
                    return this.getDeclarations().bankrupcyIndicator;
                },
                set: function (value) {
                    this.getDeclarations().bankrupcyIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "propertyForeclosedIndicator", {
                //c
                get: function () {
                    return this.getDeclarations().propertyForeclosedIndicator;
                },
                set: function (value) {
                    this.getDeclarations().propertyForeclosedIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "partyToLawsuitIndicator", {
                //d
                get: function () {
                    return this.getDeclarations().partyToLawsuitIndicator;
                },
                set: function (value) {
                    this.getDeclarations().partyToLawsuitIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "obligatedLoanIndicator", {
                //e
                get: function () {
                    return this.getDeclarations().obligatedLoanIndicator;
                },
                set: function (value) {
                    this.getDeclarations().obligatedLoanIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "presentlyDelinquentIndicator", {
                //f
                get: function () {
                    return this.getDeclarations().presentlyDelinquentIndicator;
                },
                set: function (value) {
                    this.getDeclarations().presentlyDelinquentIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "alimonyChildSupportObligation", {
                //g
                get: function () {
                    return this.getDeclarations().alimonyChildSupportObligation;
                },
                set: function (value) {
                    this.getDeclarations().alimonyChildSupportObligation = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "downPaymentIndicator", {
                //h
                get: function () {
                    return this.getDeclarations().downPaymentIndicator;
                },
                set: function (value) {
                    this.getDeclarations().downPaymentIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "noteEndorserIndicator", {
                //i
                get: function () {
                    return this.getDeclarations().noteEndorserIndicator;
                },
                set: function (value) {
                    this.getDeclarations().noteEndorserIndicator = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "usCitizenIndicator", {
                //j - from borrower/coborrower view model
                get: function () {
                    return this.getDeclarations().usCitizenIndicator;
                },
                set: function (value) {
                    this.getDeclarations().usCitizenIndicator = value;
                    if (value === this._yes) {
                        this.getDeclarations().permanentResidentAlienIndicator = this._no;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "permanentResidentAlienIndicator", {
                //k - from borrower/coborrower view model
                get: function () {
                    return this.getDeclarations().permanentResidentAlienIndicator;
                },
                set: function (value) {
                    this.getDeclarations().permanentResidentAlienIndicator = value;
                    if (value === this._yes) {
                        this.getDeclarations().usCitizenIndicator = this._no;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "propertyAsPrimaryResidence", {
                //l
                get: function () {
                    return this.getDeclarations().propertyAsPrimaryResidence;
                },
                set: function (value) {
                    this.getDeclarations().propertyAsPrimaryResidence = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "ownershipInterestLastThreeYears", {
                //m
                get: function () {
                    return this.getDeclarations().ownershipInterestLastThreeYears;
                },
                set: function (value) {
                    this.getDeclarations().ownershipInterestLastThreeYears = value;
                    if (value === this._no) {
                        this.getDeclarations().typeOfProperty = undefined;
                        this.getDeclarations().priorPropertyTitleType = undefined;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "hasOwnershipInterestLastThreeYears", {
                get: function () {
                    //since YES = 0, we have issues like this.
                    return this.getDeclarations().ownershipInterestLastThreeYears == this._yes ? true : false;
                },
                set: function (hasOwnershipInterestLastThreeYears) {
                    /*Read-Only*/
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "typeOfProperty", {
                //n
                get: function () {
                    return this.getDeclarations().typeOfProperty;
                },
                set: function (typeOfProperty) {
                    this.getDeclarations().typeOfProperty = typeOfProperty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Declarations.prototype, "priorPropertyTitleType", {
                //o
                get: function () {
                    return this.getDeclarations().priorPropertyTitleType;
                },
                set: function (priorPropertyTitleType) {
                    this.getDeclarations().priorPropertyTitleType = priorPropertyTitleType;
                },
                enumerable: true,
                configurable: true
            });
            return Declarations;
        })(vm.ViewModelBase);
        vm.Declarations = Declarations;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=declarations.viewModel.js.map