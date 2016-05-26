var consumersite;
(function (consumersite) {
    var ESigningService = (function () {
        function ESigningService($resource, apiRoot, $http, $q, $timeout, $log, authenticationService) {
            var _this = this;
            this.$resource = $resource;
            this.apiRoot = apiRoot;
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
            this.$log = $log;
            this.authenticationService = authenticationService;
            this.post = function (url, data) {
                var q = _this.$q.defer();
                var fullUrl = _this.apiRoot + url;
                _this.$http.post(fullUrl, data).success(function (response) {
                    console.log(response);
                    if (response.ErrMsg == null) {
                        q.resolve(response);
                    }
                    else {
                        q.reject(response);
                    }
                }.bind(_this)).error(function (error) {
                    console.log("Error");
                    console.log(error);
                    q.reject(error);
                }.bind(_this));
                return q.promise;
            };
            // comment to update file only
            this.getSecureLinkAuthenticationViewModel = function (loan) {
                // default to joint account eSigning using pin authentication
                var isBorrowerContinueWithout = _this.authenticationService.isBorrowerPinAuthenticated();
                var isContinueWithoutLogin = (_this.authenticationService.isBorrowerPinAuthenticated() != _this.authenticationService.isCoBorrowerPinAuthenticated());
                var loggedInUser = util.getLoggedInUser(loan, _this.authenticationService);
                switch (loggedInUser) {
                    case 1 /* Borrower */:
                        isContinueWithoutLogin = true;
                        isBorrowerContinueWithout = true;
                        break;
                    case 2 /* CoBorrower */:
                        isContinueWithoutLogin = true;
                        isBorrowerContinueWithout = false;
                        break;
                }
                return {
                    borrower: _this.getSecureLinkBorrowerViewModel(loan.loanApp.borrower),
                    coBorrower: _this.getSecureLinkBorrowerViewModel(loan.loanApp.coBorrower),
                    hasCoBorrower: loan.loanApp.hasCoBorrower,
                    isBorrowerContinueWithout: isBorrowerContinueWithout,
                    //if only one of the borrowers has successfully pin authenticated, it is continue without.
                    isContinueWithoutLogin: isContinueWithoutLogin,
                    loanApplicationId: loan.loanApp.loanApplicationId,
                    loanId: loan.loanId,
                    loEmail: "LoanOfficer@email.mail",
                    token: "",
                    documentId: "",
                    signinSecurityQuestionId: 0,
                    signinUserAccountId: 0,
                    signinUserEmailAddress: "",
                };
            };
        }
        ESigningService.prototype.getSecureLinkBorrowerViewModel = function (val) {
            return {
                borrowerId: val.borrowerId,
                continueWithoutText: "Are you serious right now?",
                email: val.email,
                fullName: val.fullName,
                inputPIN: "0000",
                isAuthenticated: true,
                showContinueWithoutLink: false,
                userAccountId: val.userAccountId,
                securityQuestionId: val.securityQuestion
            };
        };
        ESigningService.className = 'eSigningService';
        ESigningService.$inject = ['$resource', 'apiRoot', '$http', '$q', '$timeout', '$log', 'authenticationService'];
        return ESigningService;
    })();
    consumersite.ESigningService = ESigningService;
    moduleRegistration.registerService(consumersite.moduleName, ESigningService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=esigning.service.js.map