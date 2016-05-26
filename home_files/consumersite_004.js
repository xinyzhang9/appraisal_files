/// <reference path='../../Scripts/typings/ui-router/angular-ui-router.d.ts'/>
/// <reference path='providers/ui.navigation.provider.ts' />
/// <reference path='services/loansnapshot.service.ts' />
/// <reference path='services/leadsource.service.ts' />
/// <reference path='services/user.service.ts' />
var consumersite;
(function (consumersite) {
    var baseUrlQueryParams = '?' + navigation.queryParamToken + '&' + navigation.queryParamLoanId;
    function getBaseQueryParams() {
        return {
            token: { value: null },
            loanId: { value: null }
        };
    }
    var nextStateParams = angular.copy(getBaseQueryParams());
    nextStateParams[navigation.queryParamNextState] = { value: null };
    function getNextStateParams() {
        return nextStateParams;
    }
    var nsParams = angular.copy(getBaseQueryParams());
    nsParams[navigation.queryParamNS] = { value: null };
    function getNSStateParams() {
        return nsParams;
    }
    angular.module(consumersite.moduleName).config(["$stateProvider", "$urlRouterProvider", 'blockUIConfig', 'uiNavigationProvider', '$httpProvider', 'templateRoot', 'cvimp_cookie_contact_data_value', function ($stateProvider, $urlRouterProvider, blockUIConfig, uiNavigationProvider, $httpProvider, templateRoot, cvimp_cookie_contact_data_value) {
        // test for now...
        //var initInjector = angular.injector(['ng']);
        //var $http = initInjector.get('$http');
        //
        // @begin
        //      @see [loancenter.config.js] ; @todo: need to convert to TypeScript and consolodate
        //          $httpProvider.defaults.transformRequest = function (payload) {
        //
        $httpProvider.defaults["transformRequest"] = consumersite.json.removeFields;
        blockUIConfig.autoBlock = false;
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state(navigation.abstractAuthenticate, {
            abstract: true,
            params: getNextStateParams(),
            views: {
                'abstract': {
                    template: '<div ui-view="abstractAuthenticate"><i>Abstract ConsumerSite Failed to Load.</i></div>'
                }
            },
            onEnter: function (navigationService, loanSnapShotService) {
                navigationService.removeLoan();
                loanSnapShotService.clearLoanSnapShots();
            },
            resolve: {
                userAccountContext: function (SecurityService, $stateParams, navigationService) {
                    if ($stateParams[navigation.queryParamToken]) {
                        return SecurityService.GetLoanContext($stateParams[navigation.queryParamToken]).then(function (avm) {
                            return {
                                userAccountName: avm.borrower.email,
                                userAccountId: avm.borrower.userAccountId,
                                loanId: avm.loanId,
                                securityQuestionId: avm.borrower.securityQuestionId,
                            };
                        });
                    }
                    return null;
                }
            }
        }).state(navigation.authenticate, {
            params: getNextStateParams(),
            url: '/authenticate?' + navigation.queryParamToken + '&' + navigation.queryParamNextState,
            views: {
                'abstractAuthenticate': {
                    templateUrl: templateRoot + 'consumersite/authentication/authentication.html',
                    controller: 'authenticateController as authCntrl'
                }
            }
        }).state(navigation.forgotPassword, {
            params: getNextStateParams(),
            url: '/forgotPassword?' + navigation.queryParamToken + '&' + navigation.queryParamNextState,
            views: {
                'abstractAuthenticate': {
                    templateUrl: templateRoot + 'consumersite/authentication/forgot-password.html',
                    controller: 'forgotPasswordController as forPassCntrl'
                }
            }
        }).state(navigation.abstractConsumerSite, {
            'abstract': true,
            params: getBaseQueryParams(),
            resolve: {
                applicationData: function (applicationDataResolver, applicationDataService, $stateParams, $rootScope, enums, apiServiceAccountId) {
                    return applicationDataResolver(applicationDataService, $stateParams, $rootScope, enums, apiServiceAccountId);
                },
                hasGuids: function (applicationDataService) {
                    return applicationDataService.getGuids(5000).then(function (response) {
                        util.IdentityGenerator.setGuids(response.data.Response);
                        return true;
                    });
                },
                leadSourceUserAccount: function (leadSourceService, userService, leadSourceId) {
                    return userService.getCompanyEmployeeByAffinityId(leadSourceId).then(function (userAccount) {
                        leadSourceService.setLeadSourceUserAccount(userAccount);
                        return userAccount;
                    });
                },
            },
            views: {
                'abstract': {
                    template: '<div ui-view="abstractConsumerSite"><i>Abstract ConsumerSite Failed to Load.</i></div>'
                }
            }
        }).state(navigation.abstractMyLoans, {
            'abstract': true,
            params: getBaseQueryParams(),
            views: {
                'abstractConsumerSite': {
                    template: '<div ui-view="mainNavbar"></div><div ui-view="mainView"><i>Main View Failed to Load.</i></div>'
                }
            }
        }).state(navigation.abstractLoadLoan, {
            'abstract': true,
            params: getBaseQueryParams(),
            resolve: {
                userAccount: function (apiServiceAccountId, applicationDataService) {
                    return applicationDataService.getUserAccount(apiServiceAccountId).then(function (response) {
                        return new cls.UserAccountViewModel(response.data);
                    });
                },
                loanSnapShots: function (authenticationService, LoanMethodsService, loanSnapShotService) {
                    // this is the case when there apply for a loan
                    if (!authenticationService.getLoggedInUserId()) {
                        return [];
                    }
                    if (loanSnapShotService.hasLoanSnapShots()) {
                        return loanSnapShotService.getLoanSnapshots();
                    }
                    // this will fire if the user came in with a token because the loadmyloans would not have been called
                    return LoanMethodsService.GetActiveLoanSnapshots(authenticationService.getLoggedInUserId()).then(function (snapshots) {
                        loanSnapShotService.setLoanSnapShots(snapshots);
                        return snapshots;
                    });
                },
                loan: ([consumersite.UINavigationService.className, 'hasGuids', 'apiServiceAccountId', 'leadSourceId', 'applicationData', 'authenticationService', '$stateParams', 'MegaLoanService', 'loanSnapShotService', '$filter', 'uiBlockingMessageService', 'consumerLoanService', function (navigationService, hasGuids, apiServiceAccountId, leadSourceId, applicationData, authenticationService, $stateParams, MegaLoanService, loanSnapShotService, $filter, uiBlockingMessageService, consumerLoanService) {
                    var loanId = $stateParams[navigation.queryParamLoanId];
                    if (loanId) {
                        return MegaLoanService.EagerLoad(loanId, authenticationService.getLoggedInUserId(), function (mode) {
                            if (mode == 0 /* beforeCall */) {
                                uiBlockingMessageService.showMessage('Loading Loan...', 1 /* spinner */);
                            }
                            else if (mode == 1 /* afterCall */) {
                                uiBlockingMessageService.close();
                            }
                        }).then(function (loanVM) {
                            var loan = new consumersite.vm.Loan(applicationData, loanVM, $filter);
                            navigationService.setLoan(loan);
                            loanSnapShotService.selectedLoan(loan);
                            // Apply integration data (e.g. Velocify from CMS Cookie)
                            loan.applyIntegrationContactData(cvimp_cookie_contact_data_value);
                            return loan;
                        });
                    }
                    else {
                        return consumerLoanService.createLoan(apiServiceAccountId, leadSourceId, applicationData, authenticationService).then(function (loan) {
                            navigationService.setLoan(loan);
                            loanSnapShotService.selectedLoan(loan);
                            console.log('new loan created');
                            return loan;
                        });
                    }
                }]),
            },
            views: {
                'abstractConsumerSite': {
                    template: '<div ui-view="mainNavbar"></div><div ui-view="featureNavbar"></div><div ui-view="banner"></div><div ui-view="mainView"><i>Main View Failed to Load.</i></div>'
                }
            }
        }).state(loanApp.abstractLoanApp, {
            'abstract': true,
            params: getBaseQueryParams(),
            views: {
                'mainNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/mainnavbar/main-navbar.html',
                    controller: 'mainNavbarController as mainNavbarCntrl'
                },
                'featureNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/featurenavbar/feature-navbar.html',
                    controller: 'featureNavbarController as featureNavbarCntrl'
                },
                'banner': {
                    templateUrl: templateRoot + 'consumersite/headers/banner/banner.html',
                    controller: 'bannerController as bannerCntrl',
                },
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/loanapp/loanapp.page.html',
                    controller: 'loanAppPageController as loanAppPageCntrl'
                }
            }
        }).state(myNextStep.abstractMyNextStep, {
            'abstract': true,
            params: getNextStateParams(),
            resolve: {
                appraisalOrders: (['enableAppraisal', 'loan', 'apiServiceAccountId', 'AppraisalService', function (enableAppraisal, loan, apiServiceAccountId, AppraisalService) {
                    if (!enableAppraisal) {
                        return null;
                    }
                    return AppraisalService.GetAppraisalOrders(loan.loanId, apiServiceAccountId).then(function (orderViewModel) {
                        loan.appraisalOrders = orderViewModel;
                        return loan.appraisalOrders;
                    });
                }]),
                appraisalReadyToView: (['enableAppraisal', 'loan', 'AppraisalService', function (enableAppraisal, loan, AppraisalService) {
                    return enableAppraisal && navigation.isAppraisalOrdered(loan) && AppraisalService.AppraisalIsReadyToView(loan.loanId).then(function (isAppraisalReadyToView) {
                        loan.isAppraisalReadyToView = isAppraisalReadyToView;
                        return isAppraisalReadyToView;
                    });
                }]),
                loadDocuments: (['loan', 'apiServiceAccountId', 'documentCacheService', function (loan, apiServiceAccountId, documentCacheService) {
                    documentCacheService.setLoan(loan);
                    documentCacheService.loadDocuments();
                    return 1;
                }])
            },
            views: {
                'mainNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/mainnavbar/main-navbar.html',
                    controller: 'mainNavbarController as mainNavbarCntrl'
                },
                'featureNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/featurenavbar/feature-navbar.html',
                    controller: 'featureNavbarController as featureNavbarCntrl'
                },
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/mynextstep/my-next-step.page.html'
                },
            },
            onEnter: function (loan, eConsentModalService, consumerLoanService) {
                return eConsentModalService.promptEConsent(loan, 2 /* singleRequired */, function () {
                    consumerLoanService.saveLoan(loan, null, eConsentModalService.triggerEmailForEConsent(loan, true));
                });
            }
        }).state(affordability.abstractAffordability, {
            'abstract': true,
            params: getBaseQueryParams(),
            views: {
                'mainNavbar': {
                    templateUrl: templateRoot + 'consumersite/affordability/header/affordability-header.html',
                    controller: 'loanAppHeaderController as loanAppHeaderCntrl'
                },
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/affordability/affordability.page.html'
                },
            }
        }).state(navigation.resetPassword, {
            url: '/resetPassword',
            views: {
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/authentication/resetPassword/resetPassword.html',
                    controller: 'resetPasswordController as resetPasswordCntrl'
                }
            }
        }).state(navigation.loadMyLoans, {
            url: '/loadMyLoans' + baseUrlQueryParams,
            params: getBaseQueryParams(),
            resolve: {
                loanSnapshots: function (authenticationService, LoanMethodsService, loanSnapShotService) {
                    if (!authenticationService.getLoggedInUserId()) {
                        loanSnapShotService.setLoanSnapShots([]);
                        return [];
                    }
                    return LoanMethodsService.GetActiveLoanSnapshots(authenticationService.getLoggedInUserId()).then(function (snapshots) {
                        loanSnapShotService.setLoanSnapShots(snapshots);
                        return snapshots;
                    });
                },
            }
        }).state(navigation.myLoans, {
            url: '/myLoans' + baseUrlQueryParams,
            params: getBaseQueryParams(),
            views: {
                'mainNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/mainnavbar/main-navbar.html',
                    controller: 'mainNavbarController as mainNavbarCntrl'
                },
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/myLoans/my-loans.html',
                    controller: 'myLoansController as myLoansCntrl'
                }
            }
        }).state(navigation.loadLoan, {
            url: '/loadLoan' + baseUrlQueryParams,
            params: getBaseQueryParams(),
        }).state(navigation.loanPurpose, {
            url: '/loanPurpose' + baseUrlQueryParams,
            params: getBaseQueryParams(),
            views: {
                'mainNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/mainnavbar/main-navbar.html',
                    controller: 'mainNavbarController as mainNavbarCntrl'
                },
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/loanPurpose/loanPurpose.html',
                    controller: 'loanPurposeController as loanPurposeCntrl'
                },
            }
        }).state(navigation.pricing, {
            url: '/pricing' + baseUrlQueryParams,
            params: getBaseQueryParams(),
            views: {
                'mainNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/mainnavbar/main-navbar.html',
                    controller: 'mainNavbarController as mainNavbarCntrl'
                },
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/pricing/pricing.html',
                    controller: 'pricingController as pricingCntrl'
                },
            }
        }).state(myNextStep.loanReview, {
            url: '/loanReview' + baseUrlQueryParams,
            params: getBaseQueryParams(),
            data: {
                pageStateEnum: myNextStep.loanReview
            },
            views: {
                'mainNavbar': {
                    templateUrl: templateRoot + 'consumersite/headers/mainnavbar/main-navbar.html',
                    controller: 'mainNavbarController as mainNavbarCntrl'
                },
                'mainView': {
                    templateUrl: templateRoot + 'consumersite/loanApp/summary/loan.review.html',
                    controller: 'summaryController as summaryCntrl'
                },
            }
        }).state(navigation.home, {
            url: '/home' + baseUrlQueryParams,
            params: getBaseQueryParams(),
            views: {
                'abstractConsumerSite': {
                    templateUrl: templateRoot + 'consumersite/consumersite.html',
                    controller: 'consumerSiteController as conSiteCntrl'
                }
            }
        });
        var saveForLaterStates = uiNavigationProvider.getSaveForLater();
        for (var i = 0; i < saveForLaterStates.length; i++) {
            var saveForLaterState = saveForLaterStates[i];
            $stateProvider.state({
                params: getBaseQueryParams(),
                name: saveForLaterState.stateName,
                controller: saveForLaterState.controllerName,
                controllerAs: saveForLaterState.controllerAs,
                templateUrl: saveForLaterState.templateUrl,
                data: { pageStateEnum: saveForLaterState.pageStateEnum },
                url: saveForLaterState.url + baseUrlQueryParams
            });
        }
        ;
        var affordabilityStates = uiNavigationProvider.getAffordability();
        for (var i = 0; i < affordabilityStates.length; i++) {
            var affordabilityState = affordabilityStates[i];
            $stateProvider.state({
                params: getBaseQueryParams(),
                name: affordabilityState.stateName,
                controller: affordabilityState.controllerName,
                controllerAs: affordabilityState.controllerAs,
                templateUrl: affordabilityState.templateUrl,
                data: { pageStateEnum: affordabilityState.pageStateEnum },
                url: affordabilityState.url + baseUrlQueryParams
            });
        }
        ;
        var myNextStepStates = uiNavigationProvider.getMyNextStepStates();
        for (var i = 0; i < myNextStepStates.length; i++) {
            var nextStepState = myNextStepStates[i];
            $stateProvider.state({
                params: getNextStateParams(),
                name: nextStepState.stateName,
                controller: nextStepState.controllerName,
                controllerAs: nextStepState.controllerAs,
                templateUrl: nextStepState.templateUrl,
                data: { pageStateEnum: nextStepState.pageStateEnum },
                url: nextStepState.url + baseUrlQueryParams + '&' + navigation.queryParamNS
            });
        }
        ;
        var myNextStepDefaultStates = uiNavigationProvider.getMyNextStepDefaultStates();
        for (var i = 0; i < myNextStepDefaultStates.length; i++) {
            var nextStepDefaultState = myNextStepDefaultStates[i];
            $stateProvider.state({
                params: getNextStateParams(),
                name: nextStepDefaultState.stateName,
                controller: nextStepDefaultState.controllerName,
                controllerAs: nextStepDefaultState.controllerAs,
                templateUrl: nextStepDefaultState.templateUrl,
                data: { pageStateEnum: nextStepDefaultState.pageStateEnum },
                url: nextStepDefaultState.url + baseUrlQueryParams + '&' + navigation.queryParamNS
            });
        }
        ;
        var loanAppStates = uiNavigationProvider.getConsumerLoanAppStates();
        for (var i = 0; i < loanAppStates.length; i++) {
            var loanAppState = loanAppStates[i];
            $stateProvider.state({
                params: getNSStateParams(),
                name: loanAppState.stateName,
                controller: loanAppState.controllerName,
                controllerAs: loanAppState.controllerAs,
                templateUrl: loanAppState.templateUrl,
                data: { pageStateEnum: loanAppState.pageStateEnum, isCoBorrowerState: loanAppState.isCoBorrowerState },
                url: loanAppState.url + baseUrlQueryParams + '&' + navigation.queryParamNS
            });
        }
    }]).run(['$rootScope', '$state', 'authenticationService', 'navigationService', 'loanSnapShotService', function ($rootScope, $state, authenticationService, navigationService, loanSnapShotService) {
        var state = $state;
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            console.log('$stateChangeError error: ' + error);
        });
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            var isGoingToLoanApp = loanApp.regex.test(toState.name);
            //Is there any authentication we need to do before we change state?
            var needToAuthenicate = !isGoingToLoanApp && !navigation.authentication_regex.test(toState.name) && toState.name != navigation.pricing && toState.name != navigation.home && toState.name != navigation.loanPurpose && !authenticationService.isAuthenticated();
            if (needToAuthenicate) {
                event.preventDefault();
                var params = angular.copy(toParams);
                params[navigation.queryParamNextState] = toState.name;
                $state.go(navigation.authenticate, params);
            }
            else if (myNextStep.regex.test(toState.name) && toState.name != myNextStep.myLoans && navigationService.hasLoan() && !navigationService.hasLoanAppBeenCompleted()) {
                event.preventDefault();
            }
            console.log('$stateChangeStart:' + fromState.name + ' -> ' + toState.name);
        });
        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
            if (navigationService.hasLoan()) {
                if ((navigation.authentication_regex.test(fromState.name) || fromState.name == navigation.myLoans || toState.name == navigation.loadLoan) && toState.name != navigation.pricing) {
                    navigationService.navigateAfterAuthentication(toState, toParams, event);
                }
                else {
                    navigationService.onCurrentState(fromState);
                }
            }
            else if (toState.name == navigation.loadMyLoans) {
                navigationService.goToMyLoans();
            }
            console.log('$stateChangeSuccess:' + fromState.name + ' -> ' + toState.name);
        });
        $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
            console.log("Contents loading.");
        });
        $rootScope.$on('$viewContentLoaded', function (event, viewConfig) {
            console.log("Contents loaded.");
        });
    }]);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=consumersite.config.js.map