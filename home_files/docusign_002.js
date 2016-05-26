/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var ESigningRoomController = (function () {
        function ESigningRoomController($window, navigationService, $sce, $timeout, loan, $controller, eSigningService, loanAppPageContext, apiRoot, templateRoot, eConsentModalService, authenticationService, consumerLoanService) {
            var _this = this;
            this.$window = $window;
            this.navigationService = navigationService;
            this.$sce = $sce;
            this.$timeout = $timeout;
            this.loan = loan;
            this.$controller = $controller;
            this.eSigningService = eSigningService;
            this.loanAppPageContext = loanAppPageContext;
            this.apiRoot = apiRoot;
            this.templateRoot = templateRoot;
            this.eConsentModalService = eConsentModalService;
            this.authenticationService = authenticationService;
            this.consumerLoanService = consumerLoanService;
            this.showESigningRoomIFrame = true;
            this.showSuccessRegion = false;
            this.showCoBorrowerRequiredRegion = false;
            this.showDeclineRegion = false;
            this.showRestartRegion = false;
            this.startOverMessage = "";
            this.setIFrameUrl = function (url) {
                var trustedUrl = _this.$sce.trustAsResourceUrl(url);
                _this.iframeSrc = trustedUrl;
                console.log('iframe url set to ' + trustedUrl);
            };
            this.finishedSigningHandler = function (event) {
                console.log('finishedSigningHandler() called with event "' + event + '".');
                //Hide the iFrame by all accounts
                _this.showESigningRoomIFrame = false;
                //Different Docusign Events
                //event = signing_complete  -this happens even if the first of two borrowers signed.
                //event = decline           -if this happens we have to void everything if anything was saved.
                //event = ttl_expired       -if the signing session was interrupted for any reason
                //event = viewing_complete  - when a borrower comes in to view the signing room that he already signed and clicks "Close".
                if (event != null) {
                    switch (event) {
                        case 'signing_complete':
                            if (_this.loan.loanApp.hasCoBorrower) {
                                if (_this.authenticationService.isBorrowerPinAuthenticated() && !_this.loan.loanApp.borrower.eApprovalConfirmation.confirmationCodeConfirmed) {
                                    _this.loan.loanApp.borrower.eApprovalConfirmation.confirmationCodeConfirmed = true;
                                    _this.loan.loanApp.borrower.eApprovalConfirmation.isModified = true;
                                }
                                if (_this.authenticationService.isCoBorrowerPinAuthenticated() && !_this.loan.loanApp.coBorrower.eApprovalConfirmation.confirmationCodeConfirmed) {
                                    _this.loan.loanApp.coBorrower.eApprovalConfirmation.confirmationCodeConfirmed = true;
                                    _this.loan.loanApp.coBorrower.eApprovalConfirmation.isModified = true;
                                }
                            }
                            else if (!_this.loan.loanApp.borrower.eApprovalConfirmation.confirmationCodeConfirmed) {
                                _this.loan.loanApp.borrower.eApprovalConfirmation.confirmationCodeConfirmed = true;
                                _this.loan.loanApp.borrower.eApprovalConfirmation.isModified = true;
                            }
                        case 'viewing_complete':
                            _this.eSigningService.post('securelink/HandleSigningComplete?EnvelopeId=' + _this.loan.docusignSigningRoom.EnvelopeId, _this.eSigningService.getSecureLinkAuthenticationViewModel(_this.loan)).then(function (response) {
                                if (response.ErrorMsg != null) {
                                }
                                else {
                                    var message = response.Response;
                                    if (message != null) {
                                        if (message.ErrorCode === 1) {
                                        }
                                        else {
                                            if (message.ActionTaken === true) {
                                            }
                                            else {
                                            }
                                        }
                                    }
                                }
                            });
                            //leave no matter what
                            _this.navigationService.nextMyNextStep();
                            break;
                        case 'decline':
                            _this.showRegion("showDeclineRegion");
                            console.log("Borrower(s) declined eSigning.");
                            _this.eSigningService.post('securelink/HandleSigningComplete?EnvelopeId=' + _this.loan.docusignSigningRoom.EnvelopeId, _this.authViewModel).then(function (response) {
                                var message = response.Response;
                            });
                            break;
                        case 'ttl_expired':
                            console.log("Document expired.");
                            _this.startOverMessage = "Your document has expired.  Please restart the signing process by clicking the Restart button below.";
                            _this.showRegion("showRestartRegion");
                            break;
                        case 'cancel':
                            console.log("Borrower(s) cancelled eSigning.");
                            _this.startOverMessage = "You have cancelled out of the signing room.  Please restart the signing process by clicking the Restart button below.";
                            _this.showRegion("showRestartRegion");
                            break;
                    }
                }
            };
            this.showRegion = function (regionName) {
                _this.$timeout(function () {
                    _this[regionName] = true;
                }, 0);
            };
            this.restart = function () {
                //Restart the signing room by navigating back to instructions screen
                _this.navigationService.goToDisclosureInstructions();
            };
            //prompt user to eConsent 
            //TODO: FIX THIS ISSUE - jacob
            //It shouldn't have to check for this, there is an issue with page loading where this constructor is called if the loan application is not complete.
            if (this.navigationService.hasLoanAppBeenCompleted()) {
                this.eConsentModalService.promptEConsent(this.loan, 3 /* allPinAuthRequired */, function () {
                    _this.consumerLoanService.saveLoan(loan);
                });
            }
            if (this.loan.docusignSigningRoom != null) {
                this.setIFrameUrl(this.loan.docusignSigningRoom.Url);
                //set callback in the global namespace so it is easier to connect with from child iFrame
                $window["SecureLinkDocusignComplete"] = function (message) {
                    _this.finishedSigningHandler(message);
                };
            }
            else {
                console.log("No docusign Url was set.", "error");
                this.showESigningRoomIFrame = false;
                this.startOverMessage = "You're signing session was lost.  Please restart the signing process by clicking the Restart button below.";
                this.showRegion("showRestartRegion");
            }
        }
        ESigningRoomController.className = 'eSigningRoomController';
        ESigningRoomController.$inject = [
            '$window',
            'navigationService',
            '$sce',
            '$timeout',
            'loan',
            '$controller',
            'eSigningService',
            'loanAppPageContext',
            'apiRoot',
            'templateRoot',
            'eConsentModalService',
            'authenticationService',
            'consumerLoanService'
        ];
        return ESigningRoomController;
    })();
    consumersite.ESigningRoomController = ESigningRoomController;
    moduleRegistration.registerController(consumersite.moduleName, ESigningRoomController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=docusign.controller.js.map