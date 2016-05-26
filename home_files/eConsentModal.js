//-Jacob Nix
//calls the open eConsent modal to allow the borrower and/or the coBorrower to eConsent
//loan: The loan to eConsent borrowers against.
//isRequired: If true, the decline event will trigger the sign out functionality.
//changeCallback: Executes function passed if a change to the loan view model was made.  (Primarily for saving).
var consumersite;
(function (consumersite) {
    (function (eConsentStateEnum) {
        eConsentStateEnum[eConsentStateEnum["noneRequired"] = 1] = "noneRequired";
        eConsentStateEnum[eConsentStateEnum["singleRequired"] = 2] = "singleRequired";
        eConsentStateEnum[eConsentStateEnum["allPinAuthRequired"] = 3] = "allPinAuthRequired";
    })(consumersite.eConsentStateEnum || (consumersite.eConsentStateEnum = {}));
    var eConsentStateEnum = consumersite.eConsentStateEnum;
    var EConsentModalService = (function () {
        function EConsentModalService($uibModal, templateRoot, consumerLoanService, authenticationService, navigationService, $log, apiRoot, $http) {
            var _this = this;
            this.$uibModal = $uibModal;
            this.templateRoot = templateRoot;
            this.consumerLoanService = consumerLoanService;
            this.authenticationService = authenticationService;
            this.navigationService = navigationService;
            this.$log = $log;
            this.apiRoot = apiRoot;
            this.$http = $http;
            this.promptEConsent = function (loan, eConsentState, saveCallback) {
                var isEConsentRequired = eConsentState != 1 /* noneRequired */;
                var borrowers = _this.getBorrowers(loan, eConsentState);
                _this.openEConsentModal(borrowers, loan.loanApp, function () { return _this.acceptCallback(saveCallback); }, function () { return _this.declineCallback(isEConsentRequired, saveCallback); });
            };
            this.getBorrowers = function (loan, eConsentState) {
                var borrowers = [];
                //this state should only be opened from the loan application workflow, and display all borrowers but not require any eConsent.
                if (eConsentState == 1 /* noneRequired */) {
                    borrowers = _this.getAllNonEConsentedBorrowers(loan);
                }
                else if (eConsentState == 2 /* singleRequired */) {
                    if (loan.loanApp.hasCoBorrower) {
                        if (_this.isEConsentIncomplete(loan.loanApp.borrower) && _this.isEConsentIncomplete(loan.loanApp.coBorrower)) {
                            borrowers = _this.getAllNonEConsentedBorrowers(loan);
                        }
                    }
                    else if (_this.isEConsentIncomplete(loan.loanApp.borrower)) {
                        borrowers = _this.getAllNonEConsentedBorrowers(loan);
                    }
                }
                else if (3 /* allPinAuthRequired */) {
                    borrowers = _this.getAllNonEConsentedPinAuthBorrowers(loan);
                }
                return borrowers;
            };
            this.openEConsentModal = function (borrowers, loanApp, acceptCallback, declineCallback) {
                if (borrowers.length > 0) {
                    var eConsentModalInstance = _this.$uibModal.open({
                        templateUrl: _this.templateRoot + 'consumersite/mynextstep/econsent/e-consent.html',
                        backdrop: 'static',
                        controller: function () {
                            return new consumersite.ModalEConsentController(loanApp, borrowers, eConsentModalInstance, _this.templateRoot);
                        },
                        controllerAs: 'modalEConsentCntrl',
                        windowClass: 'econsent-modal',
                    });
                    eConsentModalInstance.result.then(function () {
                        acceptCallback();
                    }, function () {
                        declineCallback();
                    });
                }
            };
            this.acceptCallback = function (saveCallback) {
                if (angular.isFunction(saveCallback)) {
                    saveCallback();
                }
            };
            this.declineCallback = function (isRequired, saveCallback) {
                //if the eConsent is required, signout the user on decline
                if (isRequired) {
                    _this.authenticationService.signoutUser(); //sign out
                    _this.navigationService.goToAuthentication(); //navigate to authentication page
                }
                //save the loan
                if (angular.isFunction(saveCallback)) {
                    saveCallback();
                }
            };
            this.triggerEmailForEConsent = function (loan, isNotificationTypeForConsent) {
                var path = _this.apiRoot + 'LoanEx/SendEConsentEmail/';
                var userAccountId = _this.authenticationService.getLoggedInUserId();
                var notificationEmailType = 2 /* BorrowerESigntITP */;
                if (loan.loanApp && loan.loanApp.borrower && loan.loanApp.borrower.userAccountId == userAccountId) {
                    if (isNotificationTypeForConsent) {
                        if (loan.loanApp.borrower.eConsent.consentStatus == 1 /* Accept */) {
                            notificationEmailType = 0 /* BorrowerAcceptEConsent */;
                        }
                        else if (loan.loanApp.borrower.eConsent.consentStatus == 2 /* Decline */) {
                            notificationEmailType = 1 /* BorrowerDeclineEConsent */;
                        }
                    }
                    else if (loan.loanApp && loan.loanApp.coBorrower && loan.loanApp.coBorrower.userAccountId == userAccountId) {
                        if (loan.loanApp.coBorrower.eConsent.consentStatus == 1 /* Accept */) {
                            notificationEmailType = 0 /* BorrowerAcceptEConsent */;
                        }
                        else if (loan.loanApp.coBorrower.eConsent.consentStatus == 2 /* Decline */) {
                            notificationEmailType = 1 /* BorrowerDeclineEConsent */;
                        }
                    }
                }
                var params = {
                    loanId: loan.loanId ? loan.loanId : "",
                    userAccountId: userAccountId,
                    notificationEmailType: notificationEmailType
                };
                return _this.$http.post(path, null, { params: params });
            };
            this.getAllNonEConsentedPinAuthBorrowers = function (loan) {
                var borrowers = [];
                //if pin auth is required, only eConsent for the borrowers that are pin auth.
                if (_this.navigationService.isPinAuthenticateRequired()) {
                    if (_this.authenticationService.isBorrowerPinAuthenticated()) {
                        _this.addBorrowerIfEConcentIncomplete(loan.loanApp.borrower, borrowers);
                    }
                    if (_this.authenticationService.isCoBorrowerPinAuthenticated()) {
                        _this.addBorrowerIfEConcentIncomplete(loan.loanApp.coBorrower, borrowers);
                    }
                }
                return borrowers;
            };
            this.addBorrowerIfEConcentIncomplete = function (borrower, borrowers) {
                if (_this.isEConsentIncomplete(borrower)) {
                    borrowers.push(borrower);
                }
            };
            this.getAllNonEConsentedBorrowers = function (loan) {
                var borrowers = [];
                var loggedInUser = util.getLoggedInUser(loan, _this.authenticationService);
                switch (loggedInUser) {
                    case 3 /* Both */:
                        _this.addBorrowerIfEConcentIncomplete(loan.loanApp.borrower, borrowers);
                        _this.addBorrowerIfEConcentIncomplete(loan.loanApp.coBorrower, borrowers);
                        break;
                    case 1 /* Borrower */:
                        _this.addBorrowerIfEConcentIncomplete(loan.loanApp.borrower, borrowers);
                        break;
                    case 2 /* CoBorrower */:
                        _this.addBorrowerIfEConcentIncomplete(loan.loanApp.coBorrower, borrowers);
                        break;
                }
                return borrowers;
            };
            this.isEConsentIncomplete = function (borrower) {
                return borrower.eConsent.consentStatus != 1 /* Accept */;
            };
        }
        EConsentModalService.className = 'eConsentModalService';
        EConsentModalService.$inject = ['$uibModal', 'templateRoot', 'consumerLoanService', 'authenticationService', 'navigationService', '$log', 'apiRoot', '$http'];
        return EConsentModalService;
    })();
    consumersite.EConsentModalService = EConsentModalService;
    moduleRegistration.registerService(consumersite.moduleName, EConsentModalService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=eConsentModal.service.js.map