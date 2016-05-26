/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var DocusignInstructionsController = (function () {
        function DocusignInstructionsController(loan, loanAppPageContext, applicationData, eConsentModalService, $timeout, eSigningService, apiRoot, templateRoot, navigationService, consumerLoanService) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.eConsentModalService = eConsentModalService;
            this.$timeout = $timeout;
            this.eSigningService = eSigningService;
            this.apiRoot = apiRoot;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.consumerLoanService = consumerLoanService;
            this.continueButtonText = 'Continue';
            this.isSigningRoomReady = false;
            this.signingRoomErrorMessage = null;
            this.getDocusignUrl = function (loan) {
                var returnVal = null;
                _this.authViewModel = _this.eSigningService.getSecureLinkAuthenticationViewModel(loan);
                _this.continueButtonText = 'Preparing...';
                _this.eSigningService.post('securelink/GetSigningRoom', _this.authViewModel).then(function (response) {
                    var newData = response.Response;
                    if ((newData != null) && (newData.ErrorCode > 0)) {
                        if (newData.ErrorCode == 1) {
                            loan.docusignSigningRoom = null;
                            _this.continueButtonText = 'Error';
                            _this.isSigningRoomReady = false;
                            _this.signingRoomErrorMessage = 'The document has been declined by one of the signers.  Please contact your loan officer to continue.';
                        }
                    }
                    else {
                        loan.docusignSigningRoom = newData;
                        _this.continueButtonText = 'Continue';
                        _this.isSigningRoomReady = true;
                        _this.signingRoomErrorMessage = 'The document has been declined by one of the signers.  Please contact your loan officer to continue.';
                    }
                }, function (reason) {
                    loan.docusignSigningRoom = null;
                    _this.continueButtonText = 'Error';
                    _this.isSigningRoomReady = false;
                    _this.signingRoomErrorMessage = reason;
                });
                _this.unblockUI;
            };
            this.continue = function () {
                if (_this.isSigningRoomReady) {
                    _this.navigationService.nextMyNextStep(_this.eConsentModalService.triggerEmailForEConsent(_this.loan, false));
                }
            };
            this.unblockUI = function () {
                _this.$timeout(function () {
                    // Stop the block after some async operation.
                    this.blockUI.reset();
                }.bind(_this), 0);
            };
            this.getDocusignUrl(this.loan);
            //prompt user to eConsent 
            //TODO: FIX THIS ISSUE - jacob
            //It shouldn't have to check for this, there is an issue with page loading where this constructor is called if the loan application is not complete.
            if (this.navigationService.hasLoanAppBeenCompleted()) {
                this.eConsentModalService.promptEConsent(this.loan, 3 /* allPinAuthRequired */, function () {
                    _this.consumerLoanService.saveLoan(loan);
                });
            }
        }
        DocusignInstructionsController.className = "docusignInstructionsController";
        DocusignInstructionsController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'eConsentModalService', '$timeout', 'eSigningService', 'apiRoot', 'templateRoot', 'navigationService', 'consumerLoanService'];
        return DocusignInstructionsController;
    })();
    consumersite.DocusignInstructionsController = DocusignInstructionsController;
    moduleRegistration.registerController(consumersite.moduleName, DocusignInstructionsController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=docusign.instructions.controller.js.map