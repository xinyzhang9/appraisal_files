/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var consumersite;
(function (consumersite) {
    var BannerController = (function () {
        function BannerController($sce, navigationService, templateRoot, consumerLoanService, loan, leadSourceService) {
            var _this = this;
            this.$sce = $sce;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.consumerLoanService = consumerLoanService;
            this.loan = loan;
            this.leadSourceService = leadSourceService;
            this.bannerEntries = [
                {
                    loanAppState: 0 /* Undefined */,
                    iconClass: 'cv-icon-bullet-train',
                    header: "[Sponser this Page]",
                    message: '[Sponser Message]',
                },
                {
                    loanAppState: 268435457 /* BorrowerPersonalInfo */,
                    iconClass: 'cv-icon-bullet-train',
                    header: "You're on the fast track to get your new loan.",
                    message: 'We just need a little info from you.',
                },
                {
                    loanAppState: 268435458 /* CoBorrowerPersonalInfo */,
                    iconClass: 'cv-icon-bullet-train',
                    header: "You're on the fast track to get your new loan.",
                    message: 'We just need a little info from you.',
                },
                {
                    loanAppState: 268435459 /* PropertyInfo */,
                    iconClass: 'cv-icon-map',
                    header: "We're about to give your home a mortgage makeover.",
                    message: "We just need to know where it's at (figuratively & literally).",
                },
                {
                    loanAppState: 268435460 /* BorrowerAddressInfo */,
                    iconClass: 'cv-icon-map',
                    header: "We're about to give your home a mortgage makeover.",
                    message: "We just need to know where it's at (figuratively & literally).",
                },
                {
                    loanAppState: 268435461 /* CoBorrowerAddressInfo */,
                    iconClass: 'cv-icon-map',
                    header: "We're about to give your home a mortgage makeover.",
                    message: "We just need to know where it's at (figuratively & literally).",
                },
                {
                    loanAppState: 268435462 /* BorrowerEmployment */,
                    iconClass: 'cv-icon-piggy-bank',
                    header: "You're halfway to the finish line",
                    message: 'What does your <b>employment</b> look like?',
                },
                {
                    loanAppState: 268435463 /* BorrowerPreviousEmployment */,
                    iconClass: 'cv-icon-piggy-bank',
                    header: "You're halfway to the finish line",
                    message: 'What does your <b>employment</b> look like?',
                },
                {
                    loanAppState: 268435464 /* CoBorrowerEmployment */,
                    iconClass: 'cv-icon-piggy-bank',
                    header: "You're halfway to the finish line",
                    message: 'What does your <b>employment</b> look like?',
                },
                {
                    loanAppState: 268435465 /* CoBorrowerPreviousEmployment */,
                    iconClass: 'cv-icon-piggy-bank',
                    header: "You're halfway to the finish line",
                    message: 'What does your <b>employment</b> look like?',
                },
                {
                    loanAppState: 268435466 /* OtherIncome */,
                    iconClass: 'cv-icon-piggy-bank',
                    header: 'You’ve passed the midpoint.',
                    message: 'What does your <b>other income</b> look like?',
                },
                {
                    loanAppState: 268435467 /* Assets */,
                    iconClass: 'cv-icon-piggy-bank',
                    header: 'It looks like free credit scores are on the menu',
                    message: "You're almost there, we just need to know what kind of <b>Assets</b> you have.",
                },
                {
                    loanAppState: 268435468 /* BorrowerGovernmentMonitoring */,
                    iconClass: 'cv-icon-court',
                    header: "You're nearly to the <b>finish line</b>.",
                    message: "We just have a few questions the government requires us to ask.",
                },
                {
                    loanAppState: 268435469 /* CoBorrowerGovernmentMonitoring */,
                    iconClass: 'cv-icon-court',
                    header: "You're nearly to the <b>finish line</b>.",
                    message: "We just have a few questions the government requires us to ask.",
                },
                {
                    loanAppState: 268435470 /* Declarations */,
                    iconClass: 'cv-icon-court',
                    header: "You're nearly to the <b>finish line</b>.",
                    message: "We just have a few questions the government requires us to ask.",
                },
                {
                    loanAppState: 268435471 /* Summary */,
                    iconClass: 'cv-icon-report',
                    header: "You’re minutes away from your 3 FREE Credit Scores.",
                    message: "Just <b>confirm the info</b> you entered is correct and you'll be on your way!",
                },
                {
                    loanAppState: 268435473 /* Credit */,
                    iconClass: 'cv-icon-keychain',
                    header: "Good to Go! We’re ready for the keys to your mortgage universe.",
                    message: "With these last tidbits of info we’ll give you your FREE credit scores.",
                },
                {
                    loanAppState: 268435474 /* Account */,
                    iconClass: 'cv-icon-gears',
                    header: "While we’re running credit lets create your account.",
                    message: 'Also let us know if you’d like to add anyone else to the loan.',
                },
                {
                    loanAppState: 268435475 /* CreditResults */,
                    iconClass: 'cv-icon-house',
                    header: "We’re waiting to receive your credit report.",
                    message: "Please hang tight for just a few more moments to view your credit scores.",
                },
                {
                    loanAppState: 268435476 /* Success */,
                    iconClass: 'cv-icon-finish-flag-flip',
                    header: 'Congratulations, you finished your Loan Application like a Boss.',
                    message: "As promised your free credit scores are below.",
                },
                {
                    loanAppState: 1073741825 /* AlertPreferences */,
                    iconClass: 'cv-icon-doc',
                    header: 'Tell us how you’d like to receive important alerts about your loan.',
                    message: 'You can always change these preferences later if you’d like.',
                },
                {
                    loanAppState: 1073741826 /* ActivationCode */,
                    iconClass: 'cv-icon-doc',
                    header: 'Tell us how you’d like to receive important alerts about your loan.',
                    message: 'You can always change these preferences later if you’d like.',
                },
                {
                    loanAppState: 1073741827 /* Signout */,
                    iconClass: 'cv-icon-guitar',
                    header: 'You are a Loan Rockstar.',
                    message: "You’ve finished all that there is to do for the moment",
                },
                {
                    loanAppState: 268435472 /* AdditionalBorrower */,
                    iconClass: 'cv-icon-speedometer',
                    header: "At this rate you're gonna set a  landspeed record.",
                    message: "After this you're on to getting your FREE Credit Scores.",
                },
                {
                    loanAppState: 33554433 /* AccountCreation */,
                    iconClass: 'cv-icon-keychain',
                    header: "Your progress will be saved.",
                    message: "Enter a password for safe keeping.",
                },
                {
                    loanAppState: 33554434 /* SeeYouLater */,
                    iconClass: 'cv-icon-safe',
                    header: "Your loan has been saved.",
                    message: "We have locked it in our vault for safe keeping.",
                },
                {
                    loanAppState: 268435477 /* CreditError */,
                    iconClass: '',
                    header: "Whoops!  We had an issue getting your credit report.",
                    message: "<span class='banner-error-message'>Please verify the information below and try again.</span>",
                },
            ];
            this.bannerEntry = this.bannerEntries[0];
            this.saveForLater = function () {
                _this.navigationService.saveForLater();
            };
            this.showHide = function () {
                return _this.navigationService.currentPageNavigationState == 268435475 /* CreditResults */ || _this.navigationService.currentPageNavigationState == 268435476 /* Success */ || _this.navigationService.currentPageNavigationState == 33554434 /* SeeYouLater */ || _this.navigationService.currentPageNavigationState == 268435457 /* BorrowerPersonalInfo */ || _this.navigationService.currentPageNavigationState == 268435474 /* Account */ || _this.navigationService.currentPageNavigationState == 33554433 /* AccountCreation */;
            };
            this.checkState = function () {
                _this.bannerEntry = lib.findFirst(_this.bannerEntries, function (be) { return be.loanAppState == _this.navigationService.currentPageNavigationState; });
            };
            this.bannerEntry = lib.findFirst(this.bannerEntries, function (be) { return be.loanAppState == navigationService.currentPageNavigationState; });
        }
        Object.defineProperty(BannerController.prototype, "leadSourcePhoneNumber", {
            get: function () {
                return this.leadSourceService.getLeadSourcePhoneNumber();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BannerController.prototype, "iconClass", {
            get: function () {
                this.checkState();
                return this.bannerEntry.iconClass;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BannerController.prototype, "header", {
            get: function () {
                this.checkState();
                return this.$sce.trustAsHtml(this.bannerEntry.header);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BannerController.prototype, "message", {
            get: function () {
                this.checkState();
                return this.$sce.trustAsHtml(this.bannerEntry.message);
            },
            enumerable: true,
            configurable: true
        });
        BannerController.className = 'bannerController';
        BannerController.$inject = ['$sce', 'navigationService', 'templateRoot', 'consumerLoanService', 'loan', 'leadSourceService'];
        return BannerController;
    })();
    moduleRegistration.registerController(consumersite.moduleName, BannerController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=banner.controller.js.map