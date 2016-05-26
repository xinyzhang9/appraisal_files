/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var DeclarationsController = (function () {
        function DeclarationsController(loan, loanAppPageContext, applicationData, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.templateRoot = templateRoot;
            this.borrowerFullName = function () {
                return _this.loan.loanApp.borrower.fullName;
            };
            this.coBorrowerFullName = function () {
                return _this.loan.loanApp.coBorrower.fullName;
            };
            this.hasCoBorrower = function () {
                return _this.loan.loanApp.hasCoBorrower;
            };
            this.checkBorrowerOwnershipInterestLastThreeYears = function () {
                return _this.loan.loanApp.borrower.declarations.hasOwnershipInterestLastThreeYears;
            };
            this.checkCoBorrowerOwnershipInterestLastThreeYears = function () {
                return _this.loan.loanApp.coBorrower.declarations.hasOwnershipInterestLastThreeYears;
            };
            //Common section
            this.applicationDataTypeOfProperty = function () {
                return _this.applicationData.lookup.typeOfProperty;
            };
            this.applicationDataPriorPropertyTitle = function () {
                return _this.applicationData.lookup.priorPropertyTitle;
            };
            // 2016-02-19.  HN.  Below needed to be commented out bc  everytime we revisit page.  these properties are undefined again.   TASK 47680.
            //Quick fix for Task 45686
            //loan.loanApp.borrower.isUsCitizen = undefined;
            //loan.loanApp.borrower.isPermanentAlien = undefined;
            //loan.loanApp.coBorrower.isUsCitizen = undefined;
            //loan.loanApp.coBorrower.isPermanentAlien = undefined;
            //Scroll so just the loanAppNavbarIsVisible
        }
        Object.defineProperty(DeclarationsController.prototype, "borrowerOutStandingJudgmentIndicator", {
            //Borrwer section
            get: function () {
                return this.loan.loanApp.borrower.declarations.outstandingJudgmentsIndicator;
            },
            set: function (outstandingJudgmentsIndicator) {
                this.loan.loanApp.borrower.declarations.outstandingJudgmentsIndicator = outstandingJudgmentsIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerBankrupcyIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.bankrupcyIndicator;
            },
            set: function (bankrupcyIndicator) {
                this.loan.loanApp.borrower.declarations.bankrupcyIndicator = bankrupcyIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerPropertyForeclosedIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.propertyForeclosedIndicator;
            },
            set: function (propertyForeclosedIndicator) {
                this.loan.loanApp.borrower.declarations.propertyForeclosedIndicator = propertyForeclosedIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerPartyToLawsuitIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.partyToLawsuitIndicator;
            },
            set: function (partyToLawsuitIndicator) {
                this.loan.loanApp.borrower.declarations.partyToLawsuitIndicator = partyToLawsuitIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerObligatedLoanIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.obligatedLoanIndicator;
            },
            set: function (obligatedLoanIndicator) {
                this.loan.loanApp.borrower.declarations.obligatedLoanIndicator = obligatedLoanIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerPresentlyDelinquentIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.presentlyDelinquentIndicator;
            },
            set: function (presentlyDelinquentIndicator) {
                this.loan.loanApp.borrower.declarations.presentlyDelinquentIndicator = presentlyDelinquentIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerAlimonyChildSupportObligation", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.alimonyChildSupportObligation;
            },
            set: function (alimonyChildSupportObligation) {
                this.loan.loanApp.borrower.declarations.alimonyChildSupportObligation = alimonyChildSupportObligation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerDownPaymentIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.downPaymentIndicator;
            },
            set: function (downPaymentIndicator) {
                this.loan.loanApp.borrower.declarations.downPaymentIndicator = downPaymentIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerNoteEndorserIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.noteEndorserIndicator;
            },
            set: function (noteEndorserIndicator) {
                this.loan.loanApp.borrower.declarations.noteEndorserIndicator = noteEndorserIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerUsCitizenIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.usCitizenIndicator;
            },
            set: function (usCitizenIndicator) {
                this.loan.loanApp.borrower.usCitizenIndicator = usCitizenIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerPermanentResidentAlienIndicator", {
            get: function () {
                return this.loan.loanApp.borrower.permanentResidentAlienIndicator;
            },
            set: function (permanentResidentAlienIndicator) {
                this.loan.loanApp.borrower.permanentResidentAlienIndicator = permanentResidentAlienIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerPropertyAsPrimaryResidence", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.propertyAsPrimaryResidence;
            },
            set: function (propertyAsPrimaryResidence) {
                this.loan.loanApp.borrower.declarations.propertyAsPrimaryResidence = propertyAsPrimaryResidence;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerOwnershipInterestLastThreeYears", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.ownershipInterestLastThreeYears;
            },
            set: function (ownershipInterestLastThreeYears) {
                this.loan.loanApp.borrower.declarations.ownershipInterestLastThreeYears = ownershipInterestLastThreeYears;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerTypeOfProperty", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.typeOfProperty;
            },
            set: function (typeOfProperty) {
                this.loan.loanApp.borrower.declarations.typeOfProperty = typeOfProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "borrowerPriorPropertyTitleType", {
            get: function () {
                return this.loan.loanApp.borrower.declarations.priorPropertyTitleType;
            },
            set: function (priorPropertyTitleType) {
                this.loan.loanApp.borrower.declarations.priorPropertyTitleType = priorPropertyTitleType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerOutStandingJudgmentIndicator", {
            //CoBorrower section
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.outstandingJudgmentsIndicator;
            },
            set: function (outstandingJudgmentsIndicator) {
                this.loan.loanApp.coBorrower.declarations.outstandingJudgmentsIndicator = outstandingJudgmentsIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerBankrupcyIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.bankrupcyIndicator;
            },
            set: function (bankrupcyIndicator) {
                this.loan.loanApp.coBorrower.declarations.bankrupcyIndicator = bankrupcyIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerPropertyForeclosedIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.propertyForeclosedIndicator;
            },
            set: function (propertyForeclosedIndicator) {
                this.loan.loanApp.coBorrower.declarations.propertyForeclosedIndicator = propertyForeclosedIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerPartyToLawsuitIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.partyToLawsuitIndicator;
            },
            set: function (partyToLawsuitIndicator) {
                this.loan.loanApp.coBorrower.declarations.partyToLawsuitIndicator = partyToLawsuitIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerObligatedLoanIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.obligatedLoanIndicator;
            },
            set: function (obligatedLoanIndicator) {
                this.loan.loanApp.coBorrower.declarations.obligatedLoanIndicator = obligatedLoanIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerPresentlyDelinquentIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.presentlyDelinquentIndicator;
            },
            set: function (presentlyDelinquentIndicator) {
                this.loan.loanApp.coBorrower.declarations.presentlyDelinquentIndicator = presentlyDelinquentIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerAlimonyChildSupportObligation", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.alimonyChildSupportObligation;
            },
            set: function (alimonyChildSupportObligation) {
                this.loan.loanApp.coBorrower.declarations.alimonyChildSupportObligation = alimonyChildSupportObligation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerDownPaymentIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.downPaymentIndicator;
            },
            set: function (downPaymentIndicator) {
                this.loan.loanApp.coBorrower.declarations.downPaymentIndicator = downPaymentIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerNoteEndorserIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.noteEndorserIndicator;
            },
            set: function (noteEndorserIndicator) {
                this.loan.loanApp.coBorrower.declarations.noteEndorserIndicator = noteEndorserIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerUsCitizenIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.usCitizenIndicator;
            },
            set: function (usCitizenIndicator) {
                this.loan.loanApp.coBorrower.usCitizenIndicator = usCitizenIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerPermanentResidentAlienIndicator", {
            get: function () {
                return this.loan.loanApp.coBorrower.permanentResidentAlienIndicator;
            },
            set: function (permanentResidentAlienIndicator) {
                this.loan.loanApp.coBorrower.permanentResidentAlienIndicator = permanentResidentAlienIndicator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerPropertyAsPrimaryResidence", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.propertyAsPrimaryResidence;
            },
            set: function (propertyAsPrimaryResidence) {
                this.loan.loanApp.coBorrower.declarations.propertyAsPrimaryResidence = propertyAsPrimaryResidence;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerOwnershipInterestLastThreeYears", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.ownershipInterestLastThreeYears;
            },
            set: function (ownershipInterestLastThreeYears) {
                this.loan.loanApp.coBorrower.declarations.ownershipInterestLastThreeYears = ownershipInterestLastThreeYears;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerTypeOfProperty", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.typeOfProperty;
            },
            set: function (typeOfProperty) {
                this.loan.loanApp.coBorrower.declarations.typeOfProperty = typeOfProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeclarationsController.prototype, "coBorrowerPriorPropertyTitleType", {
            get: function () {
                return this.loan.loanApp.coBorrower.declarations.priorPropertyTitleType;
            },
            set: function (priorPropertyTitleType) {
                this.loan.loanApp.coBorrower.declarations.priorPropertyTitleType = priorPropertyTitleType;
            },
            enumerable: true,
            configurable: true
        });
        DeclarationsController.className = "declarationsController";
        DeclarationsController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'templateRoot'];
        return DeclarationsController;
    })();
    consumersite.DeclarationsController = DeclarationsController;
    moduleRegistration.registerController(consumersite.moduleName, DeclarationsController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=declarations.controller.js.map