/// <reference path = "../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path = "../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var GovernmentMonitoringController = (function () {
        function GovernmentMonitoringController(loan, loanAppPageContext, applicationData, templateRoot) {
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.templateRoot = templateRoot;
            this._borrower = this.loanAppPageContext.isCoBorrowerState ? this.loan.loanApp.coBorrower : this.loan.loanApp.borrower;
            this._hasAdditionalInfo = this._borrower.declarations.additionalInformationCheckboxIndicator;
            this._isRaceSectionValid = undefined;
            this._isEthnicitySectionValid = undefined;
            this._isGenderSectionValid = undefined;
        }
        Object.defineProperty(GovernmentMonitoringController.prototype, "fullName", {
            get: function () {
                return this._borrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceType", {
            get: function () {
                return this._borrower.declarations.race;
            },
            set: function (val) {
                this._borrower.declarations.race = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "ethnicityType", {
            get: function () {
                if (this._borrower.declarations.ethnicityId == 2) {
                    this.showHideEthnicity = true;
                }
                return this._borrower.declarations.ethnicityId;
            },
            set: function (val) {
                this._borrower.declarations.ethnicityId = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "genderType", {
            get: function () {
                if (this._borrower.declarations.sexId == 2) {
                    this.showHideGender = true;
                }
                return this._borrower.declarations.sexId;
            },
            set: function (val) {
                this._borrower.declarations.sexId = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceTypes", {
            get: function () {
                return this.applicationData.lookup.races;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "ethnicities", {
            get: function () {
                return this.applicationData.lookup.ethnicities;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "genders", {
            get: function () {
                return this.applicationData.lookup.sexTypes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "hasAdditionalInfo", {
            get: function () {
                return this._hasAdditionalInfo;
            },
            set: function (val) {
                this._hasAdditionalInfo = val;
                this._borrower.declarations.additionalInformationCheckboxIndicator = this._hasAdditionalInfo;
                this.raceAmerican = false;
                this.raceAsian = false;
                this.raceBlack = false;
                this.raceDoNotFurnish = false;
                this.raceHawaiian = false;
                this.raceWhite = false;
                this.ethnicityType = undefined;
                this.genderType = undefined;
                this.showHideEthnicity = false;
                this.showHideGender = false;
                this._isEthnicitySectionValid = true;
                this._isGenderSectionValid = true;
                this._isRaceSectionValid = true;
                if (val) {
                    this._borrower.declarations.race.iDoNotWishToFurnishThisInformation = true;
                    this._borrower.declarations.ethnicityId = 2;
                    this._borrower.declarations.sexId = 2;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceIndicator", {
            get: function () {
                return (this._borrower.declarations.race.americanIndianOrAlaskaNative || this._borrower.declarations.race.asian || this._borrower.declarations.race.blackOrAfricanAmerican || this._borrower.declarations.race.iDoNotWishToFurnishThisInformation || this._borrower.declarations.race.nativeHawaiianOrOtherPacificIslander || this._borrower.declarations.race.notApplicable || this._borrower.declarations.race.white);
            },
            enumerable: true,
            configurable: true
        });
        GovernmentMonitoringController.prototype.clearCheckbox = function (enable) {
            this.raceAmerican = enable;
            this.raceAsian = enable;
            this.raceBlack = enable;
            this.raceHawaiian = enable;
            this.raceWhite = enable;
        };
        GovernmentMonitoringController.prototype.clearEthnicityRace = function () {
            this.ethnicityType = undefined;
            this.raceType = undefined;
        };
        Object.defineProperty(GovernmentMonitoringController.prototype, "showHideEthnicity", {
            get: function () {
                return this._ethnicityIndicator;
            },
            set: function (showHideEthnicity) {
                this._ethnicityIndicator = showHideEthnicity;
                this._isEthnicitySectionValid = false;
                if (this._ethnicityIndicator == true) {
                    this.ethnicityType = 2; //Do not wish to furnish the info
                }
                else {
                    this.ethnicityType = undefined;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "showHideGender", {
            get: function () {
                return this._genderIndicator;
            },
            set: function (showHideGender) {
                this._genderIndicator = showHideGender;
                if (this._genderIndicator == true) {
                    this.genderType = 2; //Do not wish to furnish the info
                }
                else {
                    this.genderType = undefined;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceAmerican", {
            get: function () {
                return this._borrower.declarations.race.americanIndianOrAlaskaNative;
            },
            set: function (raceAmerican) {
                this._borrower.declarations.race.americanIndianOrAlaskaNative = raceAmerican;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceAsian", {
            get: function () {
                return this._borrower.declarations.race.asian;
            },
            set: function (raceAsian) {
                this._borrower.declarations.race.asian = raceAsian;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceBlack", {
            get: function () {
                return this._borrower.declarations.race.blackOrAfricanAmerican;
            },
            set: function (raceBlack) {
                this._borrower.declarations.race.blackOrAfricanAmerican = raceBlack;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "isRaceSectionValid", {
            get: function () {
                if (this.raceAmerican || this.raceAsian || this.raceBlack || this.raceHawaiian || this.raceWhite || this.raceNotApplicable || this.raceDoNotFurnish) {
                    this._isRaceSectionValid = true;
                }
                else if (this._isRaceSectionValid != undefined) {
                    this._isRaceSectionValid = false;
                }
                else {
                    return true;
                }
                return this._isRaceSectionValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "isEthnicitySectionValid", {
            get: function () {
                if (this.ethnicityType == 2) {
                    this._isEthnicitySectionValid = true;
                }
                else if (this._isEthnicitySectionValid != undefined) {
                    this._isEthnicitySectionValid = false;
                }
                else {
                    return true;
                }
                return this._isEthnicitySectionValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "isGenderSectionValid", {
            get: function () {
                if (this.genderType == 2) {
                    this._isGenderSectionValid = true;
                }
                else if (this._isGenderSectionValid != undefined) {
                    this._isGenderSectionValid = false;
                }
                else {
                    return true;
                }
                return this._isGenderSectionValid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceNotApplicable", {
            get: function () {
                return this._borrower.declarations.race.notApplicable;
            },
            set: function (raceNotApplicable) {
                this._borrower.declarations.race.notApplicable = raceNotApplicable;
                if (raceNotApplicable) {
                    this.clearCheckbox(false);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceWhite", {
            get: function () {
                return this._borrower.declarations.race.white;
            },
            set: function (raceWhite) {
                this._borrower.declarations.race.white = raceWhite;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceHawaiian", {
            get: function () {
                return this._borrower.declarations.race.nativeHawaiianOrOtherPacificIslander;
            },
            set: function (raceHawaiian) {
                this._borrower.declarations.race.nativeHawaiianOrOtherPacificIslander = raceHawaiian;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GovernmentMonitoringController.prototype, "raceDoNotFurnish", {
            get: function () {
                return this._borrower.declarations.race.iDoNotWishToFurnishThisInformation;
            },
            set: function (raceDoNotFurnish) {
                this._borrower.declarations.race.iDoNotWishToFurnishThisInformation = raceDoNotFurnish;
                this._isRaceSectionValid = false;
                this.raceAmerican = false;
                this.raceAsian = false;
                this.raceBlack = false;
                this.raceNotApplicable = false;
                this.raceHawaiian = false;
                this.raceWhite = false;
            },
            enumerable: true,
            configurable: true
        });
        GovernmentMonitoringController.className = "governmentMonitoringController";
        GovernmentMonitoringController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'templateRoot'];
        return GovernmentMonitoringController;
    })();
    consumersite.GovernmentMonitoringController = GovernmentMonitoringController;
    moduleRegistration.registerController(consumersite.moduleName, GovernmentMonitoringController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=governmentMonitoring.controller.js.map