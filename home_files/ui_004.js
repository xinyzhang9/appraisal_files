// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
// <reference path="../../ts/global/global.ts" />
var navigation;
(function (navigation) {
    navigation.abstractAuthenticate = 'authenticate'; //'abstract'
    navigation.authenticate = 'authenticate.signIn';
    navigation.forgotPassword = 'authenticate.forgotPassword';
    navigation.authentication_regex = /^authenticate[.].+/i; //authenticate[.].+
    navigation.abstractConsumerSite = 'consumerSite'; //'abstract'
    navigation.loadMyLoans = 'consumerSite.loadMyLoans'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.home = 'consumerSite.home'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.abstractMyLoans = 'consumerSite.myLoans'; //'abstractConsumerSite'
    navigation.myLoans = 'consumerSite.myLoans.displayLoans'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.abstractLoadLoan = 'consumerSite.loadLoan'; //'abstractConsumerSite'
    navigation.loadLoan = 'consumerSite.loadLoan.loadLoan'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.pricing = 'consumerSite.loadLoan.pricing'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.loanPurpose = 'consumerSite.loadLoan.loanPurpose'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.resetPassword = 'consumerSite.loadLoan.resetPassword'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.pinAuthenticate = 'consumerSite.loadLoan.pinAuthenticate'; //'mainNavBar', 'featureNavbar', 'mainView'
    navigation.pricing_regex = /^consumerSite[.]pricing/i;
    navigation.queryParamToken = 'token';
    navigation.queryParamUserAccountId = 'userAccountId';
    navigation.queryParamLoanId = 'loanId';
    navigation.queryParamLeadSourceId = "leadSourceId";
    navigation.queryParamNextState = 'nextState';
    navigation.queryParamNS = 'ns';
})(navigation || (navigation = {}));
// convert these value to 'const' when TypeScript version is updated
var loanApp;
(function (loanApp) {
    loanApp.abstractLoanApp = 'consumerSite.loadLoan.loanApp';
    loanApp.borrowerInfo = 'consumerSite.loadLoan.loanApp.borrowerPersonalInfo';
    loanApp.coBorrowerInfo = 'consumerSite.loadLoan.loanApp.coBorrowerPersonalInfo';
    loanApp.propertyInfo = 'consumerSite.loadLoan.loanApp.propertyInfo';
    loanApp.borrowerAddressInfo = 'consumerSite.loadLoan.loanApp.borrowerAddressInfo';
    loanApp.coBorrowerAddressInfo = 'consumerSite.loadLoan.loanApp.coBorrowerAddressInfo';
    loanApp.borrowerEmployment = 'consumerSite.loadLoan.loanApp.borrowerEmployment';
    loanApp.borrowerPreviousEmployment = 'consumerSite.loadLoan.loanApp.borrowerPreviousEmployment';
    loanApp.coBorrowerEmployment = 'consumerSite.loadLoan.loanApp.coBorrowerEmployment';
    loanApp.coBorrowerPreviousEmployment = 'consumerSite.loadLoan.loanApp.coBorrowerPreviousEmployment';
    loanApp.otherIncome = 'consumerSite.loadLoan.loanApp.otherIncome';
    loanApp.assets = 'consumerSite.loadLoan.loanApp.assets';
    loanApp.borrowerGovernmentMonitoring = 'consumerSite.loadLoan.loanApp.borrowerGovernmentMonitoring';
    loanApp.coBorrowerGovernmentMonitoring = 'consumerSite.loadLoan.loanApp.coBorrowerGovernmentMonitoring';
    loanApp.declarations = 'consumerSite.loadLoan.loanApp.declarations';
    loanApp.summary = 'consumerSite.loadLoan.loanApp.summary';
    loanApp.credit = 'consumerSite.loadLoan.loanApp.credit';
    loanApp.creditError = 'consumerSite.loadLoan.loanApp.creditError';
    loanApp.additionalBorrower = 'consumerSite.loadLoan.loanApp.additionalBorrower';
    loanApp.account = 'consumerSite.loadLoan.loanApp.account';
    loanApp.creditResults = 'consumerSite.loadLoan.loanApp.creditResults';
    loanApp.success = 'consumerSite.loadLoan.loanApp.success';
    loanApp.alertPreferences = 'consumerSite.loadLoan.loanApp.alertPreferences';
    loanApp.activationCode = 'consumerSite.loadLoan.loanApp.activationCode';
    loanApp.signout = 'consumerSite.loadLoan.loanApp.signout';
    loanApp.saveForLaterLandingPage = 'consumerSite.loadLoan.loanApp.saveForLaterLanding';
    loanApp.saveForLaterCreateAccount = 'consumerSite.loadLoan.loanApp.saveForLaterCreateAccount';
    loanApp.regex = /^consumerSite[.]loadLoan[.]loanApp/i;
})(loanApp || (loanApp = {}));
var myNextStep;
(function (myNextStep) {
    myNextStep.abstractMyNextStep = 'consumerSite.loadLoan.myNextStep';
    myNextStep.dashboard = 'consumerSite.loadLoan.myNextStep.dashboard';
    myNextStep.pinAuthenticate = 'consumerSite.loadLoan.myNextStep.pinAuthenticate';
    myNextStep.eSignInstructions = 'consumerSite.loadLoan.myNextStep.eSignInstructions';
    myNextStep.eSign = 'consumerSite.loadLoan.myNextStep.eSign';
    myNextStep.appraisal = 'consumerSite.loadLoan.myNextStep.appraisal';
    myNextStep.appraisalViewer = 'consumerSite.loadLoan.myNextStep.appraisalViewer';
    myNextStep.documentUpload = 'consumerSite.loadLoan.myNextStep.documentUpload';
    myNextStep.myDocuments = 'consumerSite.loadLoan.myNextStep.myDocuments';
    myNextStep.eConsentSettings = 'consumerSite.loadLoan.myNextStep.eConsentSettings';
    myNextStep.loanReview = 'consumerSite.loadLoan.loanReview';
    myNextStep.myLoans = 'consumerSite.loadLoan.myNextStep.myLoans';
    myNextStep.accountManagement = 'consumerSite.loadLoan.myNextStep.accountManagement';
    myNextStep.regex = /^consumerSite[.]loadLoan[.]myNextStep/i;
})(myNextStep || (myNextStep = {}));
var affordability;
(function (affordability) {
    affordability.abstractAffordability = 'consumerSite.affordability';
    affordability.finances = 'consumerSite.affordability.fianances';
    affordability.expenses = 'consumerSite.affordability.expenses';
    affordability.property = 'consumerSite.affordability.property';
    affordability.buyingPower = 'consumerSite.affordability.buyingPower';
    affordability.regex = /^consumerSite[.]affordability/i;
})(affordability || (affordability = {}));
var navigation;
(function (navigation) {
    function getPageNavigationCategory(pageNavType) {
        // this step is due to a crazy TypeScript issue...
        var num = pageNavType;
        if (num & 268435456 /* LoanApplication */)
            return 268435456 /* LoanApplication */;
        else if (num & 1073741824 /* BorrowerPreferences */) {
            return 1073741824 /* BorrowerPreferences */;
        }
        else if (num & 536870912 /* BorrowerLoanRequirements */) {
            return 536870912 /* BorrowerLoanRequirements */;
        }
        else if (num & 16777216 /* Affordability */) {
            return 16777216 /* Affordability */;
        }
        else if (num & 33554432 /* SaveForLater */) {
            return 33554432 /* SaveForLater */;
        }
        else {
            return 0 /* Undefined */;
        }
    }
    navigation.getPageNavigationCategory = getPageNavigationCategory;
    (function (pageEvent) {
        pageEvent[pageEvent["noEvent"] = 0] = "noEvent";
        pageEvent[pageEvent["coBorrowerAddedOrRemoved"] = 1] = "coBorrowerAddedOrRemoved";
    })(navigation.pageEvent || (navigation.pageEvent = {}));
    var pageEvent = navigation.pageEvent;
    // creating these methods to help with debugging
    function hasCoBorrower(loan, authenticationService) {
        return loan.loanApp.hasCoBorrower;
    }
    function doesCoBorrowerHaveDifferentCurrentAddress(loan) {
        return loan.loanApp.coBorrowerHasDifferentCurrentAddress;
    }
    function canAlwaysTransitionTo(loan, authenticationService) {
        return true;
    }
    function canNeverTransitionTo(loan, authenticationService) {
        return false;
    }
    function canTransitionToCreditResult(loan) {
        return loan.loanPurposeType != 1 /* Purchase */;
    }
    function neverReturnTo(loan) {
        return false;
    }
    function borrowerHasValidSSN(borrower) {
        return borrower.ssn && borrower.ssn.length == 9;
    }
    function borrowersHaveNotEnteredSocialSecurityNumbers(loan, authenticationService) {
        var borrowerDoesNotHaveValidSSN = !borrowerHasValidSSN(loan.loanApp.borrower);
        return loan.loanApp.hasCoBorrower ? (borrowerDoesNotHaveValidSSN || !borrowerHasValidSSN(loan.loanApp.coBorrower)) : borrowerDoesNotHaveValidSSN;
    }
    function canViewAppraisal(loan, authenticationService) {
        return loan.isAppraisalReadyToView;
    }
    navigation.canViewAppraisal = canViewAppraisal;
    function doesBorrowerNeedToSignDisclosure(borrower) {
        return borrower.eApprovalConfirmation && !borrower.eApprovalConfirmation.confirmationCodeConfirmed;
    }
    function hasIntentToProceed(loan) {
        return (loan.loanApp.borrower.eApprovalConfirmation && loan.loanApp.borrower.eApprovalConfirmation.confirmationCodeConfirmed) || (loan.loanApp.hasCoBorrower && loan.loanApp.coBorrower.eApprovalConfirmation && loan.loanApp.coBorrower.eApprovalConfirmation.confirmationCodeConfirmed);
    }
    navigation.hasIntentToProceed = hasIntentToProceed;
    function isAppraisalRequired(loan, authenticationService) {
        return hasIntentToProceed(loan) && !isAppraisalOrdered(loan);
    }
    navigation.isAppraisalRequired = isAppraisalRequired;
    function isAppraisalOrdered(loan) {
        return lib.isNotNullOrEmpty(loan.appraisalOrders) && lib.isNotNullOrEmpty(loan.appraisalOrders[0].orderAppraisals) && loan.appraisalOrders[0].orderAppraisals[0].orderStatus && loan.appraisalOrders[0].orderAppraisals[0].orderStatus != 0 /* NeedToOrder */;
    }
    navigation.isAppraisalOrdered = isAppraisalOrdered;
    function isJointAccount(loan) {
        return loan.loanApp.hasCoBorrower && loan.loanApp.borrower.userAccount && loan.loanApp.borrower.userAccount.jointAccountId == loan.loanApp.coBorrower.userAccount.userAccountId;
    }
    navigation.isJointAccount = isJointAccount;
    function needToPinAuthenticate(loan, authenticationService) {
        var isEsigningRequiredForJointAccount = loan.loanApp.isEsigningRequired && isJointAccount(loan);
        if (!isEsigningRequiredForJointAccount) {
            return false;
        }
        return doesBorrowerNeedToSignDisclosure(loan.loanApp.borrower) || doesBorrowerNeedToSignDisclosure(loan.loanApp.coBorrower);
    }
    function eSignRequired(loan, authenticationService) {
        if (loan.loanApp.isEsigningRequired) {
            // first determine who is logged, then determine whether or not they need to eSign
            var loggedInUser = util.getLoggedInUser(loan, authenticationService);
            switch (loggedInUser) {
                case 1 /* Borrower */:
                    return doesBorrowerNeedToSignDisclosure(loan.loanApp.borrower);
                case 3 /* Both */:
                    return doesBorrowerNeedToSignDisclosure(loan.loanApp.borrower) || doesBorrowerNeedToSignDisclosure(loan.loanApp.coBorrower);
                case 2 /* CoBorrower */:
                    return doesBorrowerNeedToSignDisclosure(loan.loanApp.coBorrower);
            }
        }
        return false;
    }
    navigation.eSignRequired = eSignRequired;
    function hasNotAuthenticated(loan, authenticationService) {
        return !authenticationService.isAuthenticated();
    }
    function canGoToDocUpdate(loan, authenticationService) {
        return hasIntentToProceed(loan) && lib.any(loan.loanApp.documents, function (document) { return document.uploadedFiles != null && document.uploadedFiles.length > 0; });
    }
    function coBorrowerAddedOrRemoved(loan) {
        return loan.loanApp.hasCoBorrower != loan.loanApp.initialHasCoBorrowerState ? 1 /* coBorrowerAddedOrRemoved */ : 0 /* noEvent */;
    }
    var UINavigationProvider = (function () {
        function UINavigationProvider(templateRoot, enableAppraisal) {
            var _this = this;
            this.templateRoot = templateRoot;
            this.enableAppraisal = enableAppraisal;
            this.consumerLoanAppStates = [
                {
                    stateName: loanApp.borrowerInfo,
                    url: '/borrowerPersonalInfo',
                    controllerName: 'personalController',
                    controllerAs: 'personalCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/personal/personal-info.html',
                    pageStateEnum: 268435457 /* BorrowerPersonalInfo */,
                    isCoBorrowerState: false,
                    canTransistionTo: canAlwaysTransitionTo,
                    pageEventMethod: coBorrowerAddedOrRemoved
                },
                {
                    stateName: loanApp.coBorrowerInfo,
                    url: '/coBorrowerPersonalInfo',
                    controllerName: 'personalController',
                    controllerAs: 'personalCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/personal/personal-info.html',
                    pageStateEnum: 268435458 /* CoBorrowerPersonalInfo */,
                    isCoBorrowerState: true,
                    canTransistionTo: hasCoBorrower
                },
                {
                    stateName: loanApp.propertyInfo,
                    url: '/propertyInfo',
                    controllerName: 'propertyController',
                    controllerAs: 'propertyCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/property/property.html',
                    pageStateEnum: 268435459 /* PropertyInfo */,
                    isCoBorrowerState: false,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.borrowerAddressInfo,
                    url: '/borrowerAddressInfo',
                    controllerName: 'addressController',
                    controllerAs: 'addressCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/addresses/address.html',
                    pageStateEnum: 268435460 /* BorrowerAddressInfo */,
                    isCoBorrowerState: false,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.coBorrowerAddressInfo,
                    url: '/coBorrowerAddressInfo',
                    controllerName: 'addressController',
                    controllerAs: 'addressCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/addresses/address.html',
                    pageStateEnum: 268435461 /* CoBorrowerAddressInfo */,
                    isCoBorrowerState: true,
                    canTransistionTo: function (loan, authenticationService) { return hasCoBorrower(loan, authenticationService) && doesCoBorrowerHaveDifferentCurrentAddress(loan); }
                },
                {
                    stateName: loanApp.borrowerEmployment,
                    url: '/borrowerEmployment',
                    controllerName: 'employmentController',
                    controllerAs: 'employmentCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/employment/employment.html',
                    pageStateEnum: 268435462 /* BorrowerEmployment */,
                    isCoBorrowerState: false,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.coBorrowerEmployment,
                    url: '/coBorrowerEmployment',
                    controllerName: 'employmentController',
                    controllerAs: 'employmentCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/employment/employment.html',
                    isCoBorrowerState: true,
                    pageStateEnum: 268435464 /* CoBorrowerEmployment */,
                    canTransistionTo: hasCoBorrower
                },
                {
                    stateName: loanApp.otherIncome,
                    url: '/otherIncome',
                    controllerName: 'otherIncomeController',
                    controllerAs: 'otherIncomeCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/otherincome/otherincome.html',
                    pageStateEnum: 268435466 /* OtherIncome */,
                    isCoBorrowerState: false,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.assets,
                    url: '/assets',
                    controllerName: 'assetsController',
                    controllerAs: 'assetsCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/assets/assets.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435467 /* Assets */,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.borrowerGovernmentMonitoring,
                    url: '/borrowerGovernmentMonitoring',
                    controllerName: 'governmentMonitoringController',
                    controllerAs: 'governmentMonitoringCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/governmentmonitoring/government-monitoring.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435468 /* BorrowerGovernmentMonitoring */,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.coBorrowerGovernmentMonitoring,
                    url: '/coBorrowerGovernmentMonitoring',
                    controllerName: 'governmentMonitoringController',
                    controllerAs: 'governmentMonitoringCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/governmentmonitoring/government-monitoring.html',
                    isCoBorrowerState: true,
                    pageStateEnum: 268435469 /* CoBorrowerGovernmentMonitoring */,
                    canTransistionTo: hasCoBorrower
                },
                {
                    stateName: loanApp.declarations,
                    url: '/declarations',
                    controllerName: 'declarationsController',
                    controllerAs: 'declarationsCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/declarations/declarations.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435470 /* Declarations */,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.summary,
                    url: '/summary',
                    controllerName: 'summaryController',
                    controllerAs: 'summaryCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/summary/summary.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435471 /* Summary */,
                    canTransistionTo: canAlwaysTransitionTo,
                    navigationDisplayName: 'Save & Back to Summary'
                },
                {
                    stateName: loanApp.additionalBorrower,
                    url: '/additionalBorrower',
                    controllerName: 'additionalBorrowerController',
                    controllerAs: 'additionalBorrowerCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/additionalborrower/additional-borrower.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435472 /* AdditionalBorrower */,
                    canTransistionTo: neverReturnTo
                },
                {
                    stateName: loanApp.credit,
                    url: '/credit',
                    controllerName: 'creditController',
                    controllerAs: 'creditCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/credit/credit.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435473 /* Credit */,
                    canTransistionTo: borrowersHaveNotEnteredSocialSecurityNumbers
                },
                {
                    stateName: loanApp.creditError,
                    url: '/credit',
                    controllerName: 'creditController',
                    controllerAs: 'creditCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/credit/credit.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435477 /* CreditError */,
                    canTransistionTo: borrowersHaveNotEnteredSocialSecurityNumbers
                },
                {
                    stateName: loanApp.account,
                    url: '/account',
                    controllerName: 'accountController',
                    controllerAs: 'accountCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/account/account.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435474 /* Account */,
                    canTransistionTo: hasNotAuthenticated
                },
                {
                    stateName: loanApp.creditResults,
                    url: '/creditResults',
                    controllerName: 'creditResultsController',
                    controllerAs: 'creditResultsCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/credit/credit-results.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435475 /* CreditResults */,
                    canTransistionTo: canTransitionToCreditResult
                },
                {
                    stateName: loanApp.success,
                    url: '/creditScores',
                    controllerName: 'successController',
                    controllerAs: 'successCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/success/success.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 268435476 /* Success */,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.alertPreferences,
                    url: '/alertPref',
                    controllerName: 'alertPreferencesController',
                    controllerAs: 'alertPrefCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/alertpreferences/alertpreferences.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 1073741825 /* AlertPreferences */,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.activationCode,
                    url: '/activation',
                    controllerName: 'activationCodeController',
                    controllerAs: 'activationCodedCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/activationcode/activationcode.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 1073741826 /* ActivationCode */,
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: loanApp.signout,
                    url: '/signout',
                    controllerName: 'signoutController',
                    controllerAs: 'signoutCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/signout/signout.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 1073741827 /* Signout */,
                    canTransistionTo: canAlwaysTransitionTo
                }
            ];
            this.myNextStepStates = [
                {
                    stateName: myNextStep.pinAuthenticate,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/pinAuthentication/pin-authentication.html',
                    controllerName: 'pinAuthenticationController',
                    controllerAs: 'pinAuthCntrl',
                    pageStateEnum: 536870923 /* PinAuthentication */,
                    url: '/pinAuthentication',
                    canTransistionTo: needToPinAuthenticate,
                    navigationDisplayName: 'Sign Disclosures'
                },
                {
                    stateName: myNextStep.eSignInstructions,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/docusign/docusign.instructions.html',
                    controllerName: 'docusignInstructionsController',
                    controllerAs: 'docusignInstructionsCntrl',
                    pageStateEnum: 536870914 /* DisclosureInstructions */,
                    url: '/instructions',
                    canTransistionTo: eSignRequired,
                    navigationDisplayName: 'Sign Disclosures',
                    cssClassName: 'fa-folder-open-o'
                },
                {
                    stateName: myNextStep.eSign,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/docusign/docusign.html',
                    controllerName: 'eSigningRoomController',
                    controllerAs: 'eSigningRoomCntrl',
                    navigationDisplayName: 'Sign Disclosures',
                    pageStateEnum: 536870915 /* DisclosureSigning */,
                    url: '/esigning',
                    canTransistionTo: eSignRequired
                },
                {
                    stateName: myNextStep.appraisal,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/appraisal/appraisal.html',
                    controllerName: 'appraisalController',
                    controllerAs: 'appraisalCntrl',
                    pageStateEnum: 536870916 /* OrderAppraisal */,
                    url: '/appraisal',
                    canTransistionTo: function (loan, authenticationService) { return _this.enableAppraisal && isAppraisalRequired(loan, authenticationService); },
                    navigationDisplayName: 'Order Appraisal',
                },
                {
                    stateName: myNextStep.appraisalViewer,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/appraisalViewer/appraisal-viewer.html',
                    controllerName: 'appraisalViewerController',
                    controllerAs: 'appraisalViewerCntrl',
                    pageStateEnum: 536870921 /* ViewAppraisal */,
                    url: '/appraisalViewer',
                    canTransistionTo: canViewAppraisal,
                    navigationDisplayName: 'View My Appraisal',
                },
                {
                    stateName: myNextStep.documentUpload,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/documentupload/document-upload.html',
                    controllerName: 'documentUploadController',
                    controllerAs: 'documentUploadCntrl',
                    pageStateEnum: 536870917 /* DocumentUpload */,
                    url: '/documentUpload',
                    navigationDisplayName: 'Upload Documents',
                    canTransistionTo: canGoToDocUpdate,
                },
                {
                    stateName: myNextStep.myDocuments,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/mydocuments/my-documents.html',
                    controllerName: 'myDocumentsController',
                    controllerAs: 'myDocumentsCntrl',
                    pageStateEnum: 536870922 /* MyDocuments */,
                    url: '/myDocuments',
                    navigationDisplayName: 'My Documents',
                    canTransistionTo: canGoToDocUpdate,
                },
                {
                    stateName: myNextStep.eConsentSettings,
                    url: '/eConsentSettings',
                    controllerName: 'eConsentSettingsController',
                    controllerAs: 'eConsentSettingsCntrl',
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/eConsentSettings/econsentsettings.html',
                    pageStateEnum: 536870920 /* EConsentSettings */,
                    canTransistionTo: function (loan, authenticationService) { return false; },
                },
                {
                    stateName: myNextStep.myLoans,
                    url: '/myNextStepLoans',
                    controllerName: 'myLoansController',
                    controllerAs: 'myLoansCntrl',
                    templateUrl: this.templateRoot + 'consumersite/myLoans/my-loans.html',
                    pageStateEnum: 0 /* Undefined */,
                    canTransistionTo: function (loan, authenticationService) { return false; },
                }
            ];
            this.myNextStepDefaultStates = [
                {
                    stateName: myNextStep.dashboard,
                    templateUrl: this.templateRoot + 'consumersite/mynextstep/mynextstepmain/my-next-step-main.html',
                    controllerName: 'myNextStepMainController',
                    controllerAs: 'myNextStepMainCntrl',
                    pageStateEnum: 536870913 /* DashBoard */,
                    url: '/dashboard',
                    canTransistionTo: canAlwaysTransitionTo
                },
                {
                    stateName: myNextStep.accountManagement,
                    url: '/accountManagement',
                    controllerName: 'accountManagementController',
                    controllerAs: 'accountMgmtCntrl',
                    templateUrl: this.templateRoot + 'consumersite/accountManagement/account-management.html',
                    pageStateEnum: 0 /* Undefined */,
                    canTransistionTo: canNeverTransitionTo,
                },
            ];
            this.affordabilityStates = [
                {
                    stateName: affordability.finances,
                    templateUrl: this.templateRoot + 'consumersite/affordability/fianances/fianances.template.html',
                    controllerName: 'fianancesController',
                    controllerAs: 'financesCntrl',
                    pageStateEnum: 16777217 /* Fianaces */,
                    url: '/fianances',
                    canTransistionTo: canAlwaysTransitionTo,
                },
                {
                    stateName: affordability.expenses,
                    templateUrl: this.templateRoot + 'consumersite/affordability/expenses/expenses.template.html',
                    controllerName: 'expensesController',
                    controllerAs: 'expensesCntrl',
                    pageStateEnum: 16777218 /* Expenses */,
                    url: '/expenses',
                    canTransistionTo: canAlwaysTransitionTo,
                },
                {
                    stateName: affordability.property,
                    templateUrl: this.templateRoot + 'consumersite/affordability/property/property.template.html',
                    controllerName: 'affordabilityPropertyController',
                    controllerAs: 'propertyCntrl',
                    pageStateEnum: 16777219 /* Property */,
                    url: '/property',
                    canTransistionTo: canAlwaysTransitionTo,
                },
                {
                    stateName: affordability.buyingPower,
                    templateUrl: this.templateRoot + 'consumersite/affordability/buyingpower/buying-power.template.html',
                    controllerName: 'buyingPowerController',
                    controllerAs: 'buyingPowerCntrl',
                    pageStateEnum: 16777220 /* BuyingPower */,
                    url: '/buyingPower',
                    canTransistionTo: canAlwaysTransitionTo,
                },
            ];
            this.saveForLaterStates = [
                {
                    stateName: loanApp.saveForLaterCreateAccount,
                    templateUrl: this.templateRoot + 'consumersite/loanapp/account/account.html',
                    controllerName: 'accountController',
                    controllerAs: 'accountCntrl',
                    pageStateEnum: 33554433 /* AccountCreation */,
                    url: '/createAccount',
                    canTransistionTo: hasNotAuthenticated,
                },
                {
                    stateName: loanApp.saveForLaterLandingPage,
                    url: '/saveforlaterLanding',
                    controllerName: 'saveForLaterLandingController',
                    controllerAs: 'saveForLaterLandingCntrl',
                    templateUrl: this.templateRoot + 'consumersite/loanapp/saveforlater/saveforlater-landing.html',
                    isCoBorrowerState: false,
                    pageStateEnum: 33554434 /* SeeYouLater */,
                    canTransistionTo: canAlwaysTransitionTo,
                    hideBack: true
                },
            ];
            this.$get = function () {
                return function () {
                    return {
                        loanAppStates: _this.consumerLoanAppStates,
                        myNextStepStates: _this.myNextStepStates,
                        affordabilityStates: _this.affordabilityStates,
                        saveForLaterStates: _this.saveForLaterStates,
                        myNextStepDefaultStates: _this.myNextStepDefaultStates,
                    };
                };
            };
            this.getConsumerLoanAppStates = function () { return _this.consumerLoanAppStates; };
            this.getMyNextStepStates = function () { return _this.myNextStepStates; };
            this.getMyNextStepDefaultStates = function () { return _this.myNextStepDefaultStates; };
            this.getAffordability = function () { return _this.affordabilityStates; };
            this.getSaveForLater = function () { return _this.saveForLaterStates; };
        }
        UINavigationProvider.className = 'uiNavigation';
        UINavigationProvider.$inject = ['templateRoot', 'enableAppraisal'];
        return UINavigationProvider;
    })();
    navigation.UINavigationProvider = UINavigationProvider;
    moduleRegistration.registerProvider(consumersite.moduleName, UINavigationProvider);
})(navigation || (navigation = {}));
//# sourceMappingURL=ui.navigation.provider.js.map