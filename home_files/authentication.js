/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../ts/generated/serviceProxies/SecurityService.ts" />
var security;
(function (security) {
    var AuthenticationService = (function () {
        function AuthenticationService(apiRoot, SercurityService, consumerLoanService, cvimp_sso_ditech_myaccount_token) {
            var _this = this;
            this.apiRoot = apiRoot;
            this.SercurityService = SercurityService;
            this.consumerLoanService = consumerLoanService;
            this.cvimp_sso_ditech_myaccount_token = cvimp_sso_ditech_myaccount_token;
            this._isAuthenticated = false;
            this._isBorrowerAuthenticated = false;
            this._isCoBorrowerAuthenticated = false;
            this.currentUserId = -1;
            this.signoutUser = function () {
                _this._isAuthenticated = false;
            };
            this.isAuthenticated = function () {
                return _this._isAuthenticated;
            };
            //TODO: 
            //This is in place strictly to force users to re-pin authenticate if they leave the eSigning workflow and attempt re-entry.
            this.resetPinAuth = function () {
                _this._isBorrowerAuthenticated = false;
                _this._isCoBorrowerAuthenticated = false;
            };
            this.isBorrowerPinAuthenticated = function () {
                return _this._isBorrowerAuthenticated;
            };
            this.isCoBorrowerPinAuthenticated = function () {
                return _this._isCoBorrowerAuthenticated;
            };
            this.getLoggedInUserId = function () {
                return _this.currentUserId;
            };
            this.getUserAccountName = function () {
                return _this.userAccountName;
            };
            this.onError = function (err) {
            };
            this.authenticate = function (authenticationRequest, callback) {
                if (consumersite.ConsumerLoanService.MODE_IS_SSO) {
                    authenticationRequest.authentication.encryptedToken = _this.cvimp_sso_ditech_myaccount_token;
                    _this.authenticateSsoToken(authenticationRequest, callback);
                }
                else {
                    _this.authenticateImpUser(authenticationRequest, callback);
                }
            };
            this.authenticateImpUser = function (authenticationRequest, callback) {
                // this hack is needed because the authentication with a loan id must be done in between loan saves...
                if (authenticationRequest.authenticationRequestType == 1 /* Authenticate */ && authenticationRequest.authentication.loanId) {
                    _this.consumerLoanService.runTask(function () { return _this.SercurityService.Authenticate(authenticationRequest, 'Authenticating User...'); }, function (ar) {
                        _this.update(ar);
                        callback(ar);
                    }, function (err) { return _this.onError(err); });
                }
                else {
                    return _this.SercurityService.Authenticate(authenticationRequest).then(function (ar) {
                        _this.update(ar);
                        callback(ar);
                    }, function (err) { return _this.onError(err); });
                }
            };
            this.update = function (ar) {
                _this._isAuthenticated = ar.succeeded;
                if (ar.succeeded) {
                    _this.currentUserId = ar.authentication.accountIds[0];
                    _this.userAccountName = ar.authentication.userAccountName;
                }
            };
            // @todo-cc: consolodate/configure/abstract-away-ditech-stuff/etc.
            this.authenticateSsoToken = function (authenticationRequest, callback) {
                //
                // @todo-cc: authenticateSsoToken WiP
                //var foo: any;
                //// the iMP-User UserAccount::UserAccountId
                //foo = authenticationRequest.authentication.accountIds[0];
                //// the SSO token
                //foo = authenticationRequest.authentication.encryptedToken;
                //// not needed ?
                //foo = authenticationRequest.authentication.loanId;
                //// var rqst: srv.ILoginVerifyAuthenticationTokenRequest = { loanId: lib.getEmptyGuid(), userAccountId: -1, encryptedToken: cvimp_sso_ditech_myaccount_token };
                //var rqstSso: srv.ILoginVerifyAuthenticationTokenRequest = { };
                //
            };
            this.setPinAuthentication = function (isBorrowerPinAuthenticated, isCoBorrowerPinAuthenticated) {
                _this._isBorrowerAuthenticated = isBorrowerPinAuthenticated;
                _this._isCoBorrowerAuthenticated = isCoBorrowerPinAuthenticated;
            };
            // @todo-cc: Fix this for SSO
            this.updateSso = function (succeeded, userAccountId) {
                _this._isAuthenticated = succeeded;
                if (_this._isAuthenticated) {
                    _this.currentUserId = userAccountId;
                }
            };
            //private authenticateUserComplete = (resp, err, cb: (isAuthenticated: boolean, message: string) => void): void => {
            //    if (err) {
            //        cb(false, "Unexpected error has occurred.");
            //    }
            //    if (resp) {
            //        var message: string = resp.message;
            //        if (resp.isAuthenticated) {
            //            this._isAuthenticated = true;
            //            cb(true, "");
            //        }
            //        else {
            //            cb(false, message);
            //        }
            //    }
            //    else {
            //        cb(false, "Unexpected error has occurred.");
            //    }
            //}
            this.getLoanContext = function (token) {
                if (!_this.isAuthenticated) {
                    return null;
                }
                if (_this.loanContext) {
                    return _this.loanContext;
                }
                else {
                    return _this.SercurityService.GetLoanContext(token).then(function (result) {
                        return _this.loanContext = result;
                    });
                }
            };
        }
        AuthenticationService.className = 'authenticationService';
        AuthenticationService.$inject = ['apiRoot', 'SecurityService', 'consumerLoanService', 'cvimp_sso_ditech_myaccount_token'];
        return AuthenticationService;
    })();
    security.AuthenticationService = AuthenticationService;
    moduleRegistration.registerService(security.moduleName, AuthenticationService);
})(security || (security = {}));
//# sourceMappingURL=authentication.service.js.map