var consumersite;
(function (consumersite) {
    var UINavigationService = (function () {
        function UINavigationService(uiNavigation, $state, consumerLoanService, $location, $window, authenticationService, loanSnapShotService, enableAppraisal) {
            //this.initialize(uiNavigation());
            var _this = this;
            this.uiNavigation = uiNavigation;
            this.$state = $state;
            this.consumerLoanService = consumerLoanService;
            this.$location = $location;
            this.$window = $window;
            this.authenticationService = authenticationService;
            this.loanSnapShotService = loanSnapShotService;
            this.enableAppraisal = enableAppraisal;
            this.linkCache = new Object();
            this.backQueue = [];
            // loan App
            // private currNavStateIndex = 0;
            this.nextDestNavStateIndex = -1;
            this.highestLoanAppIndex = 0;
            this.currentLoanAppIndex = -1;
            this.isDisplayed = true;
            this.userHasToken = false;
            this.allStates = [];
            this.hasLoanAppBeenCompleted = function () {
                return _this.loan.currentMileStone != 1 /* Prospect */;
            };
            this.hasLoan = function () {
                return !!_this.loan;
            };
            this.isPinAuthenticateRequired = function () {
                return navigation.isJointAccount(_this.loan) && _this.isESignRequired() && _this.authenticationService.isAuthenticated();
            };
            this.isESignRequired = function () {
                return _this.loan.loanApp.disclosureStateEnum == 5 /* DisclosuresCreated */;
            };
            this.removeLoan = function () {
                console.log('removing loan..');
                _this.loan = null;
            };
            this.setLoan = function (loan) {
                _this.loan = loan;
            };
            // this call checks for calls made on the loanApp via link clicks
            this.onCurrentState = function (fromState) {
                var currentLoanAppIndex = _this.getCurrentNavigationStateIndex(_this.consumerLoanAppStates);
                if (currentLoanAppIndex != _this.currentLoanAppIndex) {
                    _this.currentLoanAppIndex = currentLoanAppIndex;
                    _this.backQueue.push(fromState.name);
                    _this.nextDestNavStateIndex = (_this.$state.params && _this.$state.params['ns']) ? lib.findIndex(_this.consumerLoanAppStates, function (cs) { return cs.pageStateEnum == +_this.$state.params['ns']; }) : -1;
                }
            };
            this.getProgressPercent = function () {
                var percent = 0.0;
                switch (_this.getProgress()) {
                    case 268435457 /* BorrowerPersonalInfo */:
                    case 268435458 /* CoBorrowerPersonalInfo */:
                        percent = 0.05;
                        break;
                    case 268435459 /* PropertyInfo */:
                    case 268435460 /* BorrowerAddressInfo */:
                    case 268435461 /* CoBorrowerAddressInfo */:
                        percent = 0.18;
                        break;
                    case 268435462 /* BorrowerEmployment */:
                    case 268435463 /* BorrowerPreviousEmployment */:
                    case 268435464 /* CoBorrowerEmployment */:
                    case 268435465 /* CoBorrowerPreviousEmployment */:
                        percent = 0.46;
                        break;
                    case 268435466 /* OtherIncome */:
                        percent = 0.54;
                        break;
                    case 268435467 /* Assets */:
                        percent = 0.65;
                        break;
                    case 268435468 /* BorrowerGovernmentMonitoring */:
                    case 268435469 /* CoBorrowerGovernmentMonitoring */:
                    case 268435470 /* Declarations */:
                    case 268435471 /* Summary */:
                        percent = 0.79;
                        break;
                    case 268435472 /* AdditionalBorrower */:
                    case 268435473 /* Credit */:
                    case 268435477 /* CreditError */:
                    case 268435474 /* Account */:
                    case 268435475 /* CreditResults */:
                    case 1073741825 /* AlertPreferences */:
                    case 1073741826 /* ActivationCode */:
                    case 1073741827 /* Signout */:
                        percent = 0.92;
                        break;
                    case 268435476 /* Success */:
                        percent = 1.0;
                        break;
                    default:
                        console.log('getProgressPercent(): value ' + _this.getProgress() + ' not handled');
                }
                return percent;
            };
            this.startLoanApp = function (saveSvcPromise, successCallback, errorCallback) {
                _this.consumerLoanService.saveLoan(_this.loan, saveSvcPromise, successCallback, errorCallback);
                _this.$state.go(loanApp.borrowerInfo);
            };
            this.isNavigationDisplayed = function () {
                return _this.isDisplayed;
            };
            this.displayNavigation = function () {
                _this.isDisplayed = true;
            };
            this.hideNavigation = function () {
                _this.isDisplayed = false;
            };
            this.isCoBorrowerState = function () {
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(_this.consumerLoanAppStates);
                return _this.consumerLoanAppStates[currNavStateIndex].isCoBorrowerState;
            };
            this.hasReachedPersonal = function () {
                return _this.hasReachedState(268435457 /* BorrowerPersonalInfo */);
            };
            this.isAtPersonal = function () {
                return _this.isAt(268435457 /* BorrowerPersonalInfo */, 268435458 /* CoBorrowerPersonalInfo */);
            };
            this.hasReachedProperty = function () {
                return _this.hasReachedState(268435459 /* PropertyInfo */);
            };
            this.isAtProperty = function () {
                return _this.isAt(268435459 /* PropertyInfo */, 268435460 /* BorrowerAddressInfo */, 268435461 /* CoBorrowerAddressInfo */);
            };
            this.hasReachedFinancial = function () {
                return _this.hasReachedState(268435462 /* BorrowerEmployment */);
            };
            this.isAtFinancial = function () {
                return _this.isAt(268435462 /* BorrowerEmployment */, 268435464 /* CoBorrowerEmployment */, 268435466 /* OtherIncome */, 268435467 /* Assets */);
            };
            this.hasReachedSummary = function () {
                return _this.hasReachedState(268435468 /* BorrowerGovernmentMonitoring */);
            };
            this.isAtSummary = function () {
                return _this.isAt(268435468 /* BorrowerGovernmentMonitoring */, 268435469 /* CoBorrowerGovernmentMonitoring */, 268435470 /* Declarations */, 268435471 /* Summary */);
            };
            this.isAtSummaryFinl = function () {
                return _this.isAt(268435471 /* Summary */);
            };
            this.hasReachedCredit = function () {
                return _this.hasReachedState(268435473 /* Credit */);
            };
            this.isAtCredit = function () {
                return _this.isAt(268435473 /* Credit */, 268435474 /* Account */, 268435475 /* CreditResults */);
            };
            this.isAtCreditResults = function () {
                return _this.isAt(268435475 /* CreditResults */);
            };
            this.isAtAccount = function () {
                return _this.isAt(268435474 /* Account */);
            };
            this.isOnSummaryPage = function () {
                return _this.currentPageNavigationState == 268435471 /* Summary */;
            };
            // where the "flag" state begins is TBD
            this.hasReachedCompletion = function () {
                return _this.hasReachedState(268435476 /* Success */);
            };
            this.isAtCompletion = function () {
                return _this.isAt(268435475 /* CreditResults */, 1073741825 /* AlertPreferences */, 1073741826 /* ActivationCode */, 1073741827 /* Signout */);
            };
            this.goToProperty = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435459 /* PropertyInfo */);
            };
            this.goToAddress = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435460 /* BorrowerAddressInfo */);
            };
            this.goToPersonal = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435457 /* BorrowerPersonalInfo */);
            };
            this.goToFinanical = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435462 /* BorrowerEmployment */);
            };
            this.goToSummary = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435471 /* Summary */);
            };
            this.goToCredit = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435473 /* Credit */);
            };
            this.goToCreditError = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435477 /* CreditError */);
            };
            this.goToCreditResults = function () {
                _this.goToSection(_this.consumerLoanAppStates, 268435475 /* CreditResults */);
            };
            this.goToAccountCreation = function () {
                _this.goToSectionInAccountCreation(33554433 /* AccountCreation */);
            };
            this.goToNextSaveForLaterState = function () {
                var i = 0;
                while (!_this.saveForLaterStates[i].canTransistionTo(_this.loan, _this.authenticationService) && _this.saveForLaterStates.length > i) {
                    i++;
                }
                _this.$state.go(_this.saveForLaterStates[i].stateName);
            };
            this.saveForLater = function () {
                if (_this.loan.pageNavigationState != 268435476 /* Success */) {
                    var currNavStateIndex = _this.getCurrentNavigationStateIndex(_this.consumerLoanAppStates);
                    _this.loan.pageNavigationState = _this.consumerLoanAppStates[currNavStateIndex].pageStateEnum;
                }
                _this.consumerLoanService.saveLoan(_this.loan);
                _this.goToNextSaveForLaterState();
                //if (!this.authenticationService.isAuthenticated()) {
                //    this.$state.go(saveForLater.accountCreation);
                //}
                //else {
                //    this.$state.go(saveForLater.saveForLaterLanding);
                //}
            };
            this.isMyNextStepActive = function (pageStateEnum) {
                var myNextStepState = _this.getNavigationState(_this.myNextStepStates, pageStateEnum);
                if (!myNextStepState) {
                    throw pageStateEnum + ' is not in myNextStepStates';
                }
                return myNextStepState.canTransistionTo(_this.loan, _this.authenticationService);
            };
            //for standard sign in navigation with no redirect.
            this.goToAuthentication = function () {
                _this.$state.go(navigation.authenticate);
            };
            this.goToPricing = function () {
                _this.$state.go(navigation.pricing, null, { inherit: false });
            };
            this.goToLoanPurpose = function () {
                _this.$state.go(navigation.loanPurpose, null, { inherit: false });
            };
            this.goToAfterAuthenticate = function (userAccount, loanId, userHasToken) {
                if (userHasToken === void 0) { userHasToken = false; }
                _this.userHasToken = userHasToken;
                if (loanId) {
                    var nextState = _this.$state.params['nextState'] ? _this.$state.params['nextState'] : myNextStep.dashboard; // default to the dashboard
                    _this.$state.go(nextState, { token: _this.$state.params['token'], userAccount: userAccount, loanId: loanId });
                }
                else {
                    _this.$state.go(navigation.loadMyLoans, { userAccount: userAccount });
                }
            };
            this.goToLoanAppState = function (params) {
                var lastNavigationIndex = lib.findIndex(_this.consumerLoanAppStates, function (state) { return state.pageStateEnum == _this.loan.pageNavigationState; }, 0);
                _this.$state.go(_this.consumerLoanAppStates[lastNavigationIndex].stateName, params);
            };
            this.goToLogIn = function () {
                _this.$state.go(navigation.authenticate);
            };
            this.goToLogOut = function () {
                _this.authenticationService.signoutUser();
                _this.goToAuthentication();
            };
            // this method is for the myloanscontroller...
            this.loanLoan = function (loanId) {
                _this.userHasToken = false;
                _this.goToDashboard(loanId);
            };
            this.goToDashboard = function (loanId) {
                if (loanId) {
                    _this.$state.go(myNextStep.dashboard, { loanId: loanId });
                }
                else {
                    _this.$state.go(myNextStep.dashboard);
                }
            };
            // this is to avoid too much testing right now, all of this should be handle within the next method
            this.afterAccountCreation = function (pageNavEnum) {
                var pageNavCategory = navigation.getPageNavigationCategory(pageNavEnum);
                switch (pageNavCategory) {
                    case 268435456 /* LoanApplication */:
                        _this.next();
                        break;
                    case 33554432 /* SaveForLater */:
                        _this.goToNextSaveForLaterState();
                        break;
                    default:
                        throw pageNavCategory + ' is not mapped to a workflow...';
                }
            };
            // next is the method that is linked to the Save & Continue button
            this.next = function (saveSvcPromise, successCallback, errorCallback) {
                // check to see if we are done with the loan before we go anywhere
                if (_this.shouldReleaseLoan()) {
                    _this.loan.isFinalSavePending = true;
                }
                var loanAppWF = _this.getWorkflow(268435456 /* LoanApplication */);
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(loanAppWF.navigationStates);
                _this.consumerLoanService.saveLoan(_this.loan, saveSvcPromise, successCallback, errorCallback);
                _this.pageEvent();
                _this.goToStateInLoanApp(_this.getNextValidStateIndex(), _this.nextDestNavStateIndex < 0);
            };
            this.getCurrentNavigationStateIndex = function (navigationStates, defaultIndex) {
                if (defaultIndex === void 0) { defaultIndex = 0; }
                return lib.findIndex(navigationStates, function (state) { return state.stateName == _this.$state.current.name; }, defaultIndex);
            };
            this.getWorkflow = function (pageNavigationCategory) {
                return lib.findFirst(_this.workflows, function (workflow) { return workflow.pageNavigationCategory == pageNavigationCategory; });
            };
            this.getNavigationState = function (navigationStates, pageNavState) {
                return lib.findFirst(navigationStates, function (state) { return state.pageStateEnum == pageNavState; });
            };
            this.nextAffordability = function () {
            };
            this.back = function () {
                if (_this.backQueue.length > 0) {
                    var backState = _this.backQueue.pop();
                    _this.currentLoanAppIndex = lib.findIndex(_this.consumerLoanAppStates, function (state) { return state.stateName == backState; });
                    while (_this.backQueue.length > 0 && !_this.consumerLoanAppStates[_this.currentLoanAppIndex].canTransistionTo(_this.loan, _this.authenticationService)) {
                        backState = _this.backQueue.pop();
                        _this.currentLoanAppIndex = lib.findIndex(_this.consumerLoanAppStates, function (state) { return state.stateName == backState; });
                    }
                    _this.nextDestNavStateIndex = -1;
                    _this.$state.go(backState);
                }
            };
            this.canGoBack = function () {
                return _this.backQueue.length > 0 && !_this.hideBack();
            };
            this.hideBack = function () {
                var currentState = lib.findFirst(_this.allStates, function (state) { return state.pageStateEnum == _this.currentPageNavigationState; });
                return currentState && currentState.hideBack;
            };
            this.pageEvent = function () {
                var loanAppWF = _this.getWorkflow(268435456 /* LoanApplication */);
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(loanAppWF.navigationStates);
                if (loanAppWF.navigationStates[currNavStateIndex].pageEventMethod) {
                    switch (loanAppWF.navigationStates[currNavStateIndex].pageEventMethod(_this.loan)) {
                        case 1 /* coBorrowerAddedOrRemoved */:
                            _this.coBorrowerAddedOrRemoved(currNavStateIndex);
                            break;
                    }
                }
            };
            this.shouldReleaseLoan = function () {
                var lptyp;
                try {
                    lptyp = lib.getNumericValue(_this.loan.loanPurposeType);
                }
                catch (e) {
                    lptyp = 0 /* None */;
                }
                var isAtLoc = lptyp == 1 /* Purchase */ ? _this.isAtAccount() : _this.isAtCreditResults();
                return isAtLoc;
            };
            this.coBorrowerAddedOrRemoved = function (currNavStateIndex) {
                _this.highestLoanAppIndex = currNavStateIndex;
                _this.nextDestNavStateIndex = -1;
                _this.backQueue = [];
                // set all the borrower's asset to borrower (override any that were set as Joint)
                if (!_this.loan.loanApp.hasCoBorrower) {
                    lib.forEach(_this.loan.loanApp.borrower.assets, function (asset) { return asset.ownerType = 1 /* Borrower */; });
                }
            };
            this.borrowerSameAddressChanged = function () {
                _this.nextDestNavStateIndex = 268435460 /* BorrowerAddressInfo */;
            };
            this.coBorrowerSameAddressChanged = function () {
                _this.nextDestNavStateIndex = 268435461 /* CoBorrowerAddressInfo */;
            };
            this.getBorrowerLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435457 /* BorrowerPersonalInfo */, loanAppState);
            };
            this.getCoBorrowerLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435458 /* CoBorrowerPersonalInfo */, loanAppState);
            };
            this.getBorrowerEmploymentLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435462 /* BorrowerEmployment */, loanAppState);
            };
            this.getCoBorrowerEmploymentLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435464 /* CoBorrowerEmployment */, loanAppState);
            };
            this.getBorrowerGovermentMonitoringLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435468 /* BorrowerGovernmentMonitoring */, loanAppState);
            };
            this.getCoBorrowerGovermentMonitoringLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435469 /* CoBorrowerGovernmentMonitoring */, loanAppState);
            };
            this.getBorrowerAddressLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435460 /* BorrowerAddressInfo */, loanAppState);
            };
            this.getCoBorrowerAddressLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435461 /* CoBorrowerAddressInfo */, loanAppState);
            };
            this.getOtherIncomeLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435466 /* OtherIncome */, loanAppState);
            };
            this.getDeclarationsLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435470 /* Declarations */, loanAppState);
            };
            this.getPropertyLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435459 /* PropertyInfo */, loanAppState);
            };
            this.getFinancialLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435462 /* BorrowerEmployment */, loanAppState);
            };
            this.getSummaryLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435471 /* Summary */, loanAppState);
            };
            this.getAdditionalBorrowerLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435472 /* AdditionalBorrower */, loanAppState);
            };
            this.getCreditLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435473 /* Credit */, loanAppState);
            };
            this.getAssetsLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435467 /* Assets */, loanAppState);
            };
            this.getSuccessLink = function (loanAppState) {
                if (loanAppState === void 0) { loanAppState = 0 /* Undefined */; }
                return _this.getLink(268435476 /* Success */, loanAppState);
            };
            this.getEConsentSettingsLink = function () {
                return _this.getLink(536870920 /* EConsentSettings */);
            };
            this.getDashboardLink = function () {
                return _this.$state.href(myNextStep.dashboard);
            };
            this.getMyLoansLink = function () {
                return _this.$state.href(myNextStep.myLoans);
            };
            this.signOut = function () {
                _this.authenticationService.signoutUser();
                _this.$state.go(navigation.authenticate);
            };
            this.getSignInLink = function () {
                return _this.$state.href(navigation.authenticate);
            };
            this.getForgotPasswordLink = function () {
                return _this.$state.href(navigation.forgotPassword);
            };
            this.getCreateAccountLink = function () {
                return _this.$state.href(loanApp.saveForLaterCreateAccount);
            };
            this.goToMyLoans = function () {
                if (_this.loanSnapShotService.getLoanSnapshots().length == 1) {
                    _this.$state.go(navigation.loadLoan, { loanId: _this.loanSnapShotService.getLoanSnapshots()[0].loanId });
                }
                else {
                    _this.$state.go(navigation.myLoans);
                }
            };
            this.getLink = function (pageStateEnum, pageNavigationState) {
                if (pageNavigationState === void 0) { pageNavigationState = 0 /* Undefined */; }
                var lookupKey = pageStateEnum.toString();
                var param = pageNavigationState != 0 /* Undefined */ ? pageNavigationState : null;
                if (param) {
                    lookupKey += param;
                }
                if (!_this.linkCache[lookupKey]) {
                    var navState = _this.getNavigationState(_this.getNavigationStateArray(pageStateEnum), pageStateEnum);
                    _this.linkCache[lookupKey] = navState.stateName;
                }
                return _this.$state.href(_this.linkCache[lookupKey], { ns: pageNavigationState });
            };
            this.getNavigationStateArray = function (pageNavType) {
                var pageNavigationCategory = navigation.getPageNavigationCategory(pageNavType);
                return _this.getWorkflow(pageNavigationCategory).navigationStates;
            };
            this.getProgress = function () {
                return _this.consumerLoanAppStates[_this.highestLoanAppIndex].pageStateEnum;
            };
            this.getNavigationDisplayName = function () {
                return _this.doesNextDestinationStateHaveNavigationDisplayName() ? _this.getPreviousNavigationDisplayName() : 'Save & Continue';
            };
            this.doesNextDestinationStateHaveNavigationDisplayName = function () {
                return _this.nextDestNavStateIndex > 0 && _this.getPreviousNavigationDisplayName() != null;
            };
            this.getPreviousNavigationDisplayName = function () {
                return _this.consumerLoanAppStates[_this.nextDestNavStateIndex].navigationDisplayName;
            };
            this.goToStateInLoanApp = function (index, pushCurrentStateToBackQueue, nextStateIndex) {
                if (pushCurrentStateToBackQueue === void 0) { pushCurrentStateToBackQueue = true; }
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(_this.consumerLoanAppStates);
                if (index < _this.consumerLoanAppStates.length) {
                    if (pushCurrentStateToBackQueue && index != currNavStateIndex) {
                        _this.backQueue.push(_this.consumerLoanAppStates[currNavStateIndex].stateName);
                    }
                    _this.currentLoanAppIndex = index;
                    var nextState = _this.consumerLoanAppStates[_this.currentLoanAppIndex];
                    _this.highestLoanAppIndex = Math.max(_this.currentLoanAppIndex, _this.highestLoanAppIndex);
                    _this.$state.go(nextState.stateName);
                    console.log("Going to ::: " + nextState.stateName);
                }
            };
            this.getLoanAppPageLink = function (pageNavState) {
                var state = lib.findFirst(_this.consumerLoanAppStates, function (state) { return state.pageStateEnum == pageNavState; });
                return _this.$state.href(state.stateName);
            };
            this.navigateAfterAuthentication = function (toState, params, event) {
                if (_this.hasLoanAppBeenCompleted()) {
                    // this ugly code is due to an issue with the UI Router...
                    if (!_this.userHasToken && toState.name == myNextStep.dashboard) {
                        return;
                    }
                    event.preventDefault();
                    if (_this.userHasToken) {
                        _this.$state.go(_this.getMyNextStepNavigationState().stateName, params);
                    }
                    else {
                        _this.$state.go(myNextStep.dashboard, params);
                    }
                }
                else {
                    event.preventDefault();
                    _this.goToLoanAppState(params);
                }
            };
            this.goToStateInMyNextSteps = function (index) {
                _this.goToState(_this.myNextStepStates, index);
            };
            this.goToState = function (stateArray, index) {
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(stateArray);
                _this.$state.go(stateArray[index].stateName);
                console.log("Going to ::: " + stateArray[currNavStateIndex].stateName);
            };
            this.goToSectionInLoanApp = function (loanAppNavState) {
                _this.goToSection(_this.consumerLoanAppStates, loanAppNavState);
            };
            this.goToSectionInMyNextSteps = function (loanAppNavState) {
                _this.goToSection(_this.myNextStepStates, loanAppNavState);
            };
            this.goToSectionInAccountCreation = function (loanAppNavState) {
                _this.goToSection(_this.saveForLaterStates, loanAppNavState);
            };
            this.goToSection = function (stateArray, loanAppNavState) {
                var index = lib.findIndex(stateArray, function (s) { return s.pageStateEnum == loanAppNavState; });
                if (index < 0) {
                    throw Error(loanAppNavState + " state was not found");
                }
                _this.goToState(stateArray, index);
            };
            this.getNextValidStateIndex = function () {
                if (_this.nextDestNavStateIndex > 0) {
                    var index = _this.nextDestNavStateIndex;
                    _this.nextDestNavStateIndex = -1;
                    return index;
                }
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(_this.consumerLoanAppStates);
                // check if trying to navigate pass the end of the array
                if (_this.consumerLoanAppStates.length - currNavStateIndex == 1) {
                    console.log('attempting to navigate pass the end of consumerLoanAppStates');
                    return currNavStateIndex;
                }
                var startingIndex = currNavStateIndex + 1;
                while (startingIndex < _this.consumerLoanAppStates.length && !_this.consumerLoanAppStates[startingIndex].canTransistionTo(_this.loan, _this.authenticationService)) {
                    startingIndex++;
                }
                return startingIndex;
            };
            this.hasReachedState = function (pageAppState) {
                return _this.consumerLoanAppStates[_this.highestLoanAppIndex].pageStateEnum >= pageAppState;
            };
            this.isAt = function () {
                var pageAppStates = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    pageAppStates[_i - 0] = arguments[_i];
                }
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(_this.consumerLoanAppStates);
                for (var i = 0; i < pageAppStates.length; i++) {
                    if (_this.consumerLoanAppStates[currNavStateIndex].pageStateEnum == pageAppStates[i]) {
                        return true;
                    }
                }
                return false;
            };
            this.isAtMyNextStep = function () {
                var pageAppStates = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    pageAppStates[_i - 0] = arguments[_i];
                }
                var currNavStateIndex = _this.getCurrentNavigationStateIndex(_this.myNextStepStates);
                for (var i = 0; i < pageAppStates.length; i++) {
                    if (_this.myNextStepStates[currNavStateIndex].pageStateEnum == pageAppStates[i]) {
                        return true;
                    }
                }
                return false;
            };
            this.saveLoan = function (successCallback) {
                return _this.consumerLoanService.saveLoan(_this.loan, null, successCallback);
            };
            this.nextMyNextStep = function (successCallback) {
                _this.consumerLoanService.saveLoan(_this.loan, null, successCallback);
                _this.navigateToMyNextStep();
            };
            this.hasMyNextSteps = function () {
                var index = _this.getCurrentNavigationStateIndex(_this.myNextStepStates) + 1;
                return _this.getMyNextStepNavigationState(index).pageStateEnum != 536870913 /* DashBoard */;
            };
            this.navigateTo = function (stateName) {
                _this.$state.go(stateName);
            };
            this.navigateToMyNextStep = function () {
                var index = _this.getCurrentNavigationStateIndex(_this.myNextStepStates) + 1;
                _this.$state.go(_this.getMyNextStepNavigationState(index).stateName);
            };
            this.goToDisclosureInstructions = function () {
                _this.goToSection(_this.myNextStepStates, 536870914 /* DisclosureInstructions */);
            };
            this.goToDisclosureSigning = function () {
                _this.goToSection(_this.myNextStepStates, 536870915 /* DisclosureSigning */);
            };
            //private getNextActiveStateIndex = (): number => {
            //    var currentIndex = this.getCurrentNavigationStateIndex(this.myNextStepStates, 0);
            //    return this.getNextActiveIndexFromIndex(currentIndex + 1);
            //}
            this.getMyNextStepNavigationState = function (index) {
                if (index === void 0) { index = 0; }
                while (index < _this.myNextStepStates.length && !_this.myNextStepStates[index].canTransistionTo(_this.loan, _this.authenticationService)) {
                    index++;
                }
                return (index < _this.myNextStepStates.length) ? _this.myNextStepStates[index] : _this.myNextStepDefaultStates[0];
            };
            this.canReviewLoan = function () {
                return true;
            };
            this.getLoanReviewLink = function () {
                return _this.$state.href(myNextStep.loanReview);
            };
            this.canNavigateDisclosures = function () {
                return navigation.eSignRequired(_this.loan, _this.authenticationService);
            };
            this.getDisclosuresLink = function () {
                var index = lib.findIndex(_this.myNextStepStates, function (state) { return state.pageStateEnum == 536870923 /* PinAuthentication */; });
                if (_this.myNextStepStates[index].canTransistionTo(_this.loan, _this.authenticationService)) {
                    return _this.getLink(536870923 /* PinAuthentication */);
                }
                return _this.getLink(536870914 /* DisclosureInstructions */);
            };
            this.isAtDisclosures = function () {
                return _this.isAtMyNextStep(536870914 /* DisclosureInstructions */) || _this.isAtMyNextStep(536870915 /* DisclosureSigning */);
            };
            this.canNavigateAppraisalOrder = function () {
                return _this.enableAppraisal && navigation.isAppraisalRequired(_this.loan, _this.authenticationService);
            };
            //isAppraisalRequired = (): boolean => {
            //    return this.enableAppraisal && navigation.isAppraisalRequired(this.loan, this.authenticationService);
            //}
            this.getAppraisalOrderLink = function () {
                return _this.getLink(536870916 /* OrderAppraisal */);
            };
            this.canViewAppraisal = function () {
                return navigation.canViewAppraisal(_this.loan, _this.authenticationService);
            };
            this.isAtAppraisal = function () {
                return _this.isAtMyNextStep(536870916 /* OrderAppraisal */);
            };
            //isAppraisalPlaced = (): boolean => {
            //    return navigation.isAppraisalOrdered(this.loan);
            //}
            //isAppraisalOrdered = (): boolean => {
            //    return navigation.isAppraisalOrdered(this.loan);
            //}
            this.canNavigateDocUpload = function () {
                return true;
            };
            this.getEnableAppraisal = function () {
                return _this.enableAppraisal;
            };
            this.getAppraisalViewLink = function () {
                return _this.getLink(536870921 /* ViewAppraisal */);
            };
            this.isDocUploadRequired = function () {
                return true;
            };
            this.getDocUploadLink = function () {
                return _this.getLink(536870917 /* DocumentUpload */);
            };
            this.isAtDocUpload = function () {
                return _this.isAtMyNextStep(536870917 /* DocumentUpload */);
            };
            //My Documents
            this.getMyDocumentsLink = function () {
                return _this.getLink(536870922 /* MyDocuments */);
            };
            //Document Review
            this.getDocReviewLink = function () {
                return _this.getLink(536870922 /* MyDocuments */);
            };
            this.canNavigateDocReview = function () {
                return true;
            };
            //EConsent Settings
            this.canNavigateEConsentSettings = function () {
                return true;
            };
            //My Next Step Progress
            this.getMyNextStepProgress = function () {
                return 0.25;
            };
            //Sign Out
            this.goToSignOut = function () {
                _this.$location.path('http://skylinehomeloans.com/');
                _this.$location.replace();
            };
            this.workflows = [
                { pageNavigationCategory: 268435456 /* LoanApplication */, gotoNextState: this.next, navigationStates: uiNavigation().loanAppStates },
                { pageNavigationCategory: 1073741824 /* BorrowerPreferences */, gotoNextState: this.next, navigationStates: uiNavigation().loanAppStates },
                { pageNavigationCategory: 536870912 /* BorrowerLoanRequirements */, gotoNextState: this.nextMyNextStep, navigationStates: uiNavigation().myNextStepStates },
                { pageNavigationCategory: 16777216 /* Affordability */, gotoNextState: this.nextAffordability, navigationStates: uiNavigation().affordabilityStates },
                { pageNavigationCategory: 33554432 /* SaveForLater */, gotoNextState: this.saveForLater, navigationStates: uiNavigation().saveForLaterStates },
            ];
            // cache for simplicity
            this.consumerLoanAppStates = uiNavigation().loanAppStates;
            this.myNextStepStates = uiNavigation().myNextStepStates;
            this.saveForLaterStates = uiNavigation().saveForLaterStates;
            this.myNextStepDefaultStates = uiNavigation().myNextStepDefaultStates;
            this.allStates = this.consumerLoanAppStates.concat(this.myNextStepStates).concat(this.saveForLaterStates);
        }
        Object.defineProperty(UINavigationService.prototype, "currentPageNavigationState", {
            get: function () {
                return this.$state.current.data && this.$state.current.data.pageStateEnum ? this.$state.current.data.pageStateEnum : 0 /* Undefined */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UINavigationService.prototype, "nextState", {
            get: function () {
                return this.nextDestNavStateIndex >= 0 ? this.consumerLoanAppStates[this.nextDestNavStateIndex].pageStateEnum : 0 /* Undefined */;
            },
            enumerable: true,
            configurable: true
        });
        UINavigationService.$inject = ['uiNavigation', '$state', 'consumerLoanService', '$location', '$window', 'authenticationService', 'loanSnapShotService', 'enableAppraisal'];
        UINavigationService.className = 'navigationService';
        return UINavigationService;
    })();
    consumersite.UINavigationService = UINavigationService;
    moduleRegistration.registerService(consumersite.moduleName, UINavigationService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=ui.navigation.service.js.map