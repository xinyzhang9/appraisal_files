/// <reference path="../viewModels/loan.viewModel.ts" />
/// <reference path="../../common/credit/creditext.service.ts" />
var consumersite;
(function (consumersite) {
    (function (UserAccountStatusEnum) {
        UserAccountStatusEnum[UserAccountStatusEnum["none"] = 0] = "none";
        UserAccountStatusEnum[UserAccountStatusEnum["active"] = 1] = "active";
        UserAccountStatusEnum[UserAccountStatusEnum["inactive"] = 2] = "inactive";
    })(consumersite.UserAccountStatusEnum || (consumersite.UserAccountStatusEnum = {}));
    var UserAccountStatusEnum = consumersite.UserAccountStatusEnum;
    var ConsumerLoanService = (function () {
        function ConsumerLoanService($resource, apiRoot, $log, creditSvcExt, apiServiceAccountId, pricingService, $filter) {
            var _this = this;
            this.$resource = $resource;
            this.apiRoot = apiRoot;
            this.$log = $log;
            this.creditSvcExt = creditSvcExt;
            this.apiServiceAccountId = apiServiceAccountId;
            this.pricingService = pricingService;
            this.$filter = $filter;
            this.counter = 0;
            this.taskList = [];
            this.releaseLockedLoan = function (loan) {
                try {
                    _this.releaseLockedLoanImpl(loan);
                }
                catch (e) {
                    console.error(e);
                }
            };
            this.runTask = function (task, successCallback, errorCallback) {
                if (!_this.isSaving) {
                    _this.blockSaving = true;
                    task().then(function (t) {
                        _this.blockSaving = false;
                        successCallback(t);
                    }, function (err) {
                        _this.blockSaving = false;
                        errorCallback(err);
                    });
                }
                else {
                    _this.blockSaving = true;
                    _this.taskList.push({
                        task: task,
                        successCallback: successCallback,
                        errorCallback: errorCallback
                    });
                }
            };
            this.releaseLockedLoanImpl = function (loan) {
                // flag for concurrent/in-flight API calls
                loan.isUserSignedOut = true;
                var userAccountId = _this.apiServiceAccountId;
                var releaseLockedLoanRqst = {
                    loanId: loan.loanId,
                    userAccountId: userAccountId,
                };
                _this.megaLoanReleaseControlResource.get(releaseLockedLoanRqst).$promise.then(function (data) {
                    loan.controlStatus = data;
                }, function (err) {
                    console.log("releaseControl(" + loan.loanApp.loanApplicationId + ", ) FAIL:" + err.lockOwnerUserName);
                });
            };
            this.loadLoan = function (loanId, happyPath, unHappyPath) {
                _this.megaLoanLoadResource.get({ loanId: loanId, userAccountId: _this.apiServiceAccountId }).$promise.then(happyPath, unHappyPath);
            };
            this.loadLoanII = function (loanId) {
                return _this.megaLoanLoadResource.get({ loanId: loanId, userAccountId: _this.apiServiceAccountId });
            };
            this.prepareLoanViewModelForSubmit = function (loan) {
                //
                // @todo:
                //      Refine object model usage for PropertyViewModel
                //
                // Loan
                var loanViewModel = loan.currentLoan();
                var property = loanViewModel.getSubjectProperty();
                if (!!property && !property.propertyType) {
                    var propertyVm = property;
                    propertyVm.PropertyType = "1"; // @todo: USE ENUM
                }
                loanViewModel.ClosingDate = loancenter.populateDefaultValueClosingDate(loanViewModel.ClosingDate);
                loanViewModel.prepareSave();
                return loanViewModel;
            };
            this.createLoan = function (serviceAccountId, leadSourceId, applicationData, authenticationService) {
                var loan = new consumersite.vm.Loan(applicationData);
                var loanCls = _this.prepareLoanViewModelForSubmit(loan);
                //Loancenter.populateDefaultValueClosingDate(loanCls.closingDate);
                //var pricingResultsApiPath = this.apiRoot + PricingService.pricingResultsApiSubPath;
                //var leadSource = this.$resource(pricingResultsApiPath + 'BindLeadSourceToLoan', {}, {
                //    bindLeadSource: {
                //        method: 'POST',
                //        url: pricingResultsApiPath + 'BindLeadSourceToLoan',
                //        params: { serviceAccountId: '@serviceAccountId', leadSourceId: '@leadSourceId', loanViewModel: '@loanViewModel' }
                //    }
                //});
                // chained promise to have promise for resolve
                //
                //this.bindLeadSourceToLoanResource = this.$resource(pricingResultsApiPath, { serviceAccountId: '@serviceAccountId', leadSourceId: '@leadSourceId', loanViewModel: '@loanViewModel' });
                return _this.bindLeadSourceToLoanResource.save({ serviceAccountId: serviceAccountId, leadSourceId: leadSourceId }, loanCls, function (resp) {
                    return resp;
                }, function (err) {
                    console.error(err);
                    return null;
                }).$promise.then(function (resp) {
                    if (resp != null) {
                        var respVm = resp;
                        loan.bindLeadSourceToLoan(respVm);
                    }
                    // if the user is currently authenticated, bind the new loan's account values to the borrower's account
                    if (authenticationService.isAuthenticated()) {
                        loan.loanApp.borrower.userAccount.userAccountId = authenticationService.getLoggedInUserId();
                        loan.loanApp.borrower.userAccount.username = authenticationService.getUserAccountName();
                        loan.loanApp.borrower.email = authenticationService.getUserAccountName();
                    }
                    return loan;
                });
            };
            /**
            * @todo-cc:
            *       Refactor for proper "Post Processing" notion that this should be , function names in particular
            *       Pre-Save state tuple should be implemented (remove credit specific flags)
            *       Save processing pipeline in API required , current implementation is not perfectly thread-safe , but is working fine in practical sense
            *
            */
            this.saveRqstDx = 0;
            this.saveLoanWithPostOper = function (loan, cb) {
                _this.isSaving = true;
                // don't queue this one , can run in parallel in the rare case , but let's queue any others
                var saveRqstDx = _this.saveRqstDx;
                var loanViewModel = _this.prepareLoanViewModelForSubmit(loan);
                var rslt = _this.megaLoanSaveResource.save({ userAccountId: _this.apiServiceAccountId }, loanViewModel).$promise.then(function (data) { return _this.saveLoanWithPostOperCb(saveRqstDx, null, data, loan, cb); }, function (err) { return _this.saveLoanWithPostOperCb(saveRqstDx, err, null, loan, null); });
            };
            this.saveLoanWithPostOperCb = function (saveRqstDx, err, data, loan, cb) {
                _this.isSaving = false;
                try {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        cb(loan, data);
                    }
                }
                catch (e) {
                    console.log(e);
                }
                //
                // submit next request if exists ; @todo-cc: Consolodate all the places
                //
                if (saveRqstDx < _this.saveRqstDx) {
                    // it is OK to pass in same [loan] , it is reference to the same one
                    _this.saveLoan(loan);
                }
            };
            this.isSaving = false;
            this.blockSaving = false;
            this.saveLoan = function (loan, p, successCallback, errorCallback, forEConsent) {
                var rqstDx = ++_this.saveRqstDx;
                if (_this.isSaving) {
                    _this.$log.log("saveLoan SKIP @" + rqstDx.toString());
                    return;
                }
                else {
                    _this.isSaving = true;
                    _this.$log.log("saveLoan SAVE @" + rqstDx.toString());
                }
                if (loan.isFinalSaveCompleted) {
                    return;
                }
                var canRunCredit = loan.canRunCredit();
                if (p == null) {
                    var loanViewModel = _this.prepareLoanViewModelForSubmit(loan);
                    if (forEConsent == true)
                        p = _this.megaLoanSaveForEConsentResource.save({ userAccountId: _this.apiServiceAccountId }, loanViewModel).$promise;
                    else
                        p = _this.megaLoanSaveResource.save({ userAccountId: _this.apiServiceAccountId }, loanViewModel).$promise;
                }
                var cbSuccess = function (data) {
                    _this.megaLoanSaveSuccess(loan, canRunCredit, data);
                    if (successCallback) {
                        successCallback(data);
                    }
                };
                var cbError = function (err) {
                    _this.megaLoanSaveFail(err);
                    if (errorCallback) {
                        errorCallback(err);
                    }
                };
                p.then(function (data) { return _this.megaLoanSaveComplete(rqstDx, loan, function () { return cbSuccess(data); }); }, function (err) { return _this.megaLoanSaveComplete(rqstDx, loan, function () { return cbError(err); }); });
            };
            this.saveLoanAsynch = function (loan, cb) {
                var runCredit = loan.canRunCredit();
                var loanViewModel = _this.prepareLoanViewModelForSubmit(loan);
                _this.megaLoanSaveAsynchResource.save({ userAccountId: _this.apiServiceAccountId, runCredit: runCredit }, loanViewModel).$promise.then(function (data) { return _this.saveLoanAsynchComplete(data, null, loan, cb); }, function (err) { return _this.saveLoanAsynchComplete(null, err, loan, cb); });
            };
            this.saveLoanAsynchComplete = function (data, err, loan, cb) {
                if (!!err) {
                    _this.$log.error(err);
                }
                else {
                    _this.$log.info("saveLoanAsynchComplete success:" + loan.loanId);
                    cb(data, loan);
                }
            };
            this.invokeMegaSaveAsynchPromise = function (loan) {
                var runCredit = loan.canRunCredit();
                var loanViewModel = _this.prepareLoanViewModelForSubmit(loan);
                var p = _this.megaLoanSaveAsynchResource.save({ userAccountId: _this.apiServiceAccountId, runCredit: runCredit }, loanViewModel).$promise;
                return p;
            };
            // @todo: review API can remove productId from parameter 
            this.invokeMegaLoanPriceAndSavePromise = function (loan, productId) {
                var loanViewModel = _this.prepareLoanViewModelForSubmit(loan);
                var p = _this.megaLoanPriceAndSaveResource.save({ productId: productId, currentUserId: _this.apiServiceAccountId }, loanViewModel).$promise;
                return p;
            };
            this.mergePricedLoanCallback = function (loan) {
                //
                // Logical merge for any values updated by pricing operation
                //
                var cb = function (loanCls) {
                    // 1) Keep the values we need to maintain on UI
                    //      a) LoanAmount
                    var loanAmount = loan.loanAmount;
                    // 2) Apply all top-level values from the loanCls input (shallow-copy)
                    var loanClsTarget = loan.currentLoan();
                    var loanClsSource = loanCls;
                    lib.shollowCopyPrimitive(loanClsSource, loanClsTarget);
                    loanClsTarget.product = loanClsSource.product;
                    loanClsTarget.financialInfo = loanClsSource.financialInfo;
                    loan.pricingProduct.rate = loanClsTarget.financialInfo.adjustedInterestRate;
                    loan.pricingProduct.monthlyPayment = loanClsTarget.financialInfo.monthlyPayment;
                    // 3) Apply back any values we need to maintain on the UI
                    //      a) LoanAmount
                    loan.loanAmount = loanAmount;
                };
                return cb;
            };
            this.megaLoanSaveComplete = function (saveRqstDx, loan, cb) {
                _this.isSaving = false;
                try {
                    cb();
                }
                catch (e) {
                    _this.$log.error(e.toString());
                }
                if (!_this.blockSaving) {
                    _this.scheduleNextSave(saveRqstDx, loan);
                }
                else if (_this.taskList.length > 0) {
                    var callableTask = _this.taskList.pop();
                    callableTask.task().then(function (t) {
                        _this.blockSaving = false;
                        callableTask.successCallback(t);
                        _this.scheduleNextSave(saveRqstDx, loan);
                    }, function (err) {
                        _this.blockSaving = false;
                        callableTask.errorCallback(err);
                        _this.scheduleNextSave(saveRqstDx, loan);
                    });
                }
            };
            this.scheduleNextSave = function (saveRqstDx, loan) {
                var isNextRqstDxSaveSpawned = false;
                //
                // submit next request if exists ; @todo-cc: Consolodate all the places
                //
                if (saveRqstDx < _this.saveRqstDx) {
                    if (!ConsumerLoanService.MODE_IS_SSO) {
                        // it is OK to pass in same [loan] , it is reference to the same one
                        _this.saveLoan(loan);
                        isNextRqstDxSaveSpawned = true;
                    }
                }
                if (loan.isFinalSavePending) {
                    loan.isFinalSaveCompleted = true;
                    if (!isNextRqstDxSaveSpawned) {
                        // Release when done
                        _this.releaseLockedLoan(loan);
                    }
                }
            };
            this.buildRunCreditRqst = function (loan) {
                var loanApp = loan.currentLoan().getLoanApplications()[0];
                var loanApplicationId = loanApp.loanApplicationId;
                var borrowerId = null; // For Remove Borrower/CoBorrower , not used on consumer site
                var userAccountId = _this.apiServiceAccountId; // @todo: this.applicationData.currentUserId;
                var isReRunReport = false; // not used on consumer site ; (@see !!loan.getLoan().getLoanApplications()[0].credit.creditFileStoreItemId)
                var paidOffFreeAndClear = false; // not clear if this is useful on consumer site
                var rqst = new credit.RunCreditRqst(loanApplicationId, userAccountId.toString(), isReRunReport, paidOffFreeAndClear, borrowerId);
                return rqst;
            };
            this.runCreditComplete = function (loan, isSuccess, creditDataWithBorrowers, error) {
                if (isSuccess) {
                    //
                    loan.creditStatusCd = 3 /* CompletedSuccess */;
                }
                else {
                    //
                    loan.creditStatusCd = 4 /* CompletedError */;
                    //
                    // this.displayErrorMessage(this.activeLoanApplicationId);
                    _this.$log.error('RunCredit Fail');
                }
            };
            this.pollCreditStatus = function (loan) {
                var rqst = _this.buildRunCreditRqst(loan);
                var cp = credit.CreditPoll.CreditPollDefaults();
                _this.creditSvcExt.pollCreditStatus(rqst, loan.currentLoan(), function () { return _this.runCreditShouldCancel(loan, cp); }, function (data) { return _this.runCreditComplete(loan, true, data); }, function (err) { return _this.runCreditComplete(loan, false, err); });
            };
            /**
            * username and userAccountId are only meaningful in consumersite when user changes their email back and forth and back to some previous available email address
            *       This is rare , but could happen , most often by QA testing
            *       This is *not* intended to relate to any sort of previous account lookup from the UI in any way whatsoever
            *       Currently , the user cannot select an exsiting account when applying for a loan from anonymous entry point
            *       They must log in first in which case this service will not be used
            */
            this.checkUserAccountAvailable = function (userAccountId, username, cb) {
                _this.userAccountResource.get({ username: username }).$promise.then(function (resp) { return _this.checkUserAccountAvailableComplete(resp, null, userAccountId, username, cb); }, function (err) { return _this.checkUserAccountAvailableComplete(null, err, userAccountId, username, cb); });
            };
            this.checkUserAccountAvailableComplete = function (resp, err, userAccountId, username, cb) {
                if (err) {
                    console.error(err.toString());
                    cb(false, -1);
                }
                else {
                    if (resp && resp.manageUserAccountsList && resp.manageUserAccountsList.length > 0) {
                        var acct = lib.findFirst(resp.manageUserAccountsList, function (a) { return a.userAccount.username == username; });
                        var existingUserAccountId;
                        if (acct && acct.userAccount && acct.userAccount.userAccountId) {
                            existingUserAccountId = acct.userAccount.userAccountId;
                        }
                        else {
                            existingUserAccountId = -1;
                        }
                        if (existingUserAccountId == userAccountId) {
                            cb(true, existingUserAccountId);
                        }
                        else {
                            cb(false, existingUserAccountId);
                        }
                    }
                    else {
                        cb(true, -1);
                    }
                }
            };
            this.checkUserAccountStatus = function (username, cb) {
                _this.userAccountResource.get({ username: username }).$promise.then(function (resp) { return _this.checkUserAccountStatusComplete(resp, null, username, cb); }, function (err) { return _this.checkUserAccountStatusComplete(null, err, username, cb); });
            };
            this.checkUserAccountStatusComplete = function (resp, err, username, cb) {
                if (err) {
                    console.error(err.toString());
                    cb(2 /* inactive */, null);
                }
                else {
                    if (resp && resp.manageUserAccountsList && resp.manageUserAccountsList.length > 0) {
                        var respAccount = lib.findFirst(resp.manageUserAccountsList, function (a) { return a.userAccount.username == username; });
                        //Not sure if necessary, it was there before...
                        if (respAccount && respAccount.userAccount) {
                            var accountStatus = respAccount.userAccount.isActivated ? 1 /* active */ : 2 /* inactive */;
                            var account = new srv.cls.AuthenticationViewModel();
                            ;
                            account.password = respAccount.userAccount.originalSecurityAnswer;
                            cb(accountStatus, account);
                        }
                    }
                    else {
                        cb(2 /* inactive */, null);
                    }
                }
            };
            this.verifyUserSsoToken = function (loanId, cvimp_sso_ditech_myaccount_token, userAccountId, emailAddress, cb) {
                var encryptedToken = cvimp_sso_ditech_myaccount_token; //  = this.cvimp_sso_ditech_myaccount_token;
                if (!encryptedToken) {
                    encryptedToken = "";
                }
                var rqst = { loanId: loanId, userAccountId: userAccountId, emailAddress: emailAddress, encryptedToken: encryptedToken };
                _this.userSsoResource.save({ userAccountId: userAccountId }, rqst).$promise.then(function (data) { return _this.verifyUserSsoTokenCb(data, null, cb); }, function (err) { return _this.verifyUserSsoTokenCb(null, err, cb); });
            };
            this.verifyUserSsoTokenCb = function (data, err, cb) {
                if (!!err) {
                    _this.$log.error(err);
                    cb(false, null, null, null);
                }
                else {
                    _this.$log.info("verifyUserSsoTokenCb SUCCESS (" + data.isVerified + ", " + data.affinityId + ", " + data.userAccountId + ", " + data.emailAddress + ")");
                    var resp = data;
                    cb(resp.isVerified, resp.userAccountId, resp.affinityId, resp.emailAddress);
                }
            };
            var loanApiPath = apiRoot + 'loan/';
            var loanExApiPath = apiRoot + 'LoanEx/';
            var userAccountApiPath = apiRoot + 'user/UserAccounts';
            this.megaLoanSaveResource = this.$resource(loanExApiPath + "MegaSave", { viewModel: '@viewModel', userAccountId: '@userAccountId' });
            this.megaLoanSaveForEConsentResource = this.$resource(loanExApiPath + "EConsent", { viewModel: '@viewModel', userAccountId: '@userAccountId' });
            this.megaLoanSaveAsynchResource = this.$resource(loanExApiPath + "MegaSaveAsynch", { userAccountId: '@userAccountId', runCredit: '@runCredit' });
            this.megaLoanPriceAndSaveResource = this.$resource(loanApiPath + "PriceAndSaveLoan/:productId", { productId: '@productId', currentUserId: '@currentUserId' });
            this.megaLoanLoadResource = this.$resource(loanApiPath);
            this.megaLoanReleaseControlResource = this.$resource(loanExApiPath, {}, { get: { method: 'GET', params: { loanId: 'loanId', userAccountId: 'userAccountId' } } });
            this.userAccountResource = this.$resource(userAccountApiPath, { username: 'username' });
            this.userSsoResource = this.$resource(apiRoot + 'consumeraccount/ditechmyaccountverifyauthenticationtoken', { userAccountId: '@userAccountId' });
            this.loanSnapshotsBySsoResource = this.$resource(apiRoot + 'consumeraccount/getactiveloansnapshotsbysso', { userAccountId: '@userAccountId' }, { loadSnapshots: { method: 'POST', isArray: true } });
            var pricingResultsApiPath = this.apiRoot + consumersite.PricingService.pricingResultsApiSubPath;
            this.bindLeadSourceToLoanResource = this.$resource(pricingResultsApiPath, { serviceAccountId: '@serviceAccountId', leadSourceId: '@leadSourceId', loanViewModel: '@loanViewModel' });
        }
        //gets UserAccount informaton from response and assigns it to vm.Loan
        ConsumerLoanService.prototype.transefUserAccounts = function (loan, source) {
            if (source == null || source.transactionInfo == null || source.transactionInfo.borrowers == null) {
                return; //nothing to do
            }
            if ((source.transactionInfo.borrowers.length > 0) && !(source.transactionInfo.borrowers[0].userAccount == null)) {
                loan.loanApp.borrower.userAccount = source.transactionInfo.borrowers[0].userAccount;
            }
            if ((source.transactionInfo.borrowers.length > 1) && !(source.transactionInfo.borrowers[1].userAccount == null)) {
                loan.loanApp.coBorrower.userAccount = source.transactionInfo.borrowers[1].userAccount;
            }
        };
        ConsumerLoanService.prototype.megaLoanSaveSuccess = function (loan, canRunCredit, data) {
            //
            this.$log.log('loan saved successfully');
            var src = data;
            //keep UserAccounts;
            this.transefUserAccounts(loan, src);
            if (!ConsumerLoanService.MODE_IS_SSO) {
                //
                // run credit every time , it will check
                //
                this.runCredit(loan, canRunCredit);
            }
        };
        ConsumerLoanService.prototype.megaLoanSaveFail = function (err) {
            this.$log.error('loan failed to save');
        };
        ConsumerLoanService.prototype.runCredit = function (loan, canRunCredit) {
            // Run only if we have enough data
            if (!canRunCredit) {
                return;
            }
            // Run only once
            if (loan.isCreditInitiated()) {
                return;
            }
            //
            this.runCreditImpl(loan);
        };
        ConsumerLoanService.prototype.runCreditImpl = function (loan) {
            var _this = this;
            // setup
            var rqst = this.buildRunCreditRqst(loan);
            // invoke
            var cp = credit.CreditPoll.CreditPollDefaults();
            this.creditSvcExt.runCredit(rqst, loan.currentLoan(), function () { return _this.runCreditShouldCancel(loan, cp); }, function (data) { return _this.runCreditComplete(loan, true, data); }, function (err) { return _this.runCreditComplete(loan, false, err); });
            // update status
            loan.creditStatusCd = 2 /* InProgress */;
        };
        ConsumerLoanService.prototype.runCreditShouldCancel = function (loan, cp) {
            cp.increment();
            var shouldCancel = cp.hasTimedOut();
            return shouldCancel;
        };
        ConsumerLoanService.MODE_IS_SSO = false;
        ConsumerLoanService.$inject = ['$resource', 'apiRoot', '$log', 'CreditSvcExt', 'apiServiceAccountId', 'pricingService', '$filter'];
        ConsumerLoanService.className = 'consumerLoanService';
        //
        // browser session storage
        //
        ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CLS = "com.cloudvirga.session.loan.cls";
        ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CVM = "com.cloudvirga.session.loan.cvm";
        ConsumerLoanService.getFromSessionStorage = function (applicationData, $filter, remove) {
            if (remove === void 0) { remove = true; }
            var loanClsSessionString = lib.sessionStorageGetItem(ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CLS);
            var loanCvmSessionString = lib.sessionStorageGetItem(ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CVM);
            if (!!loanClsSessionString) {
                if (remove) {
                    lib.sessionStorageRemoveItem(ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CLS);
                    lib.sessionStorageRemoveItem(ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CVM);
                }
                // get cls.LoanViewModel first , use for instantiation
                var loanClsSessionObject = lib.parseForWebStorage(loanClsSessionString);
                var loanSessionConstructed = new consumersite.vm.Loan(applicationData, loanClsSessionObject, $filter);
                // get consumersite.vm.Loan second , use for properties (shallow copy primatives)
                var loanCvmSessionObject = lib.parseForWebStorage(loanCvmSessionString);
                lib.shollowCopyPrimitive(loanCvmSessionObject, loanSessionConstructed);
                //
                return loanSessionConstructed;
            }
            else {
                return null;
            }
        };
        ConsumerLoanService.putIntoSessionStorage = function (loan) {
            // consumersite.vm.Loan
            var loanCvmStr = lib.stringifyForWebStorage(loan);
            lib.sessionStorageSetItem(ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CVM, loanCvmStr);
            // cls.LoanViewModel
            var loanCls = loan.currentLoan();
            loanCls.prepareSave();
            var loanClsStr = lib.stringifyForWebStorage(loanCls);
            lib.sessionStorageSetItem(ConsumerLoanService.STORAGE_SESSION_KEY_LOAN_CLS, loanClsStr);
        };
        return ConsumerLoanService;
    })();
    consumersite.ConsumerLoanService = ConsumerLoanService;
    moduleRegistration.registerService(consumersite.moduleName, ConsumerLoanService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=loan.service.js.map