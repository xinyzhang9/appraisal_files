/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var ModalEConsentController = (function () {
        function ModalEConsentController(loanApp, borrowers, $modalInstance, templateRoot) {
            var _this = this;
            this.loanApp = loanApp;
            this.borrowers = borrowers;
            this.$modalInstance = $modalInstance;
            this.templateRoot = templateRoot;
            this.borrowerIsSelected = false;
            this.selectedBorrowerChanged = function () {
                _this.borrowerIsSelected = true;
            };
            this.close = function () {
                //if they did not accept, close out, return false.
                if (_this.eConsentStatus != 1 /* Accept */) {
                    _this.loanApp.declineEConcentForAllBorrowers();
                    _this.$modalInstance.dismiss("User Declined eConsent");
                }
                else {
                    //send back the borrower that accepted
                    _this.loanApp.docDelivery = 1 /* Electronic */;
                    _this.$modalInstance.close(_this.activeBorrower);
                }
            };
            this.dismiss = function () {
                _this.loanApp.declineEConcentForAllBorrowers();
                _this.$modalInstance.dismiss("User Canceled eConsent");
            };
            if (this.borrowers.length > 0) {
                this.activeBorrower = this.borrowers[0];
                this.selectedBorrowerChanged();
            }
        }
        Object.defineProperty(ModalEConsentController.prototype, "consentStatusAccept", {
            get: function () {
                return 1 /* Accept */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModalEConsentController.prototype, "consentStatusDecline", {
            get: function () {
                return 2 /* Decline */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModalEConsentController.prototype, "fullName", {
            get: function () {
                return this.activeBorrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModalEConsentController.prototype, "isMultiBorrower", {
            get: function () {
                return this.borrowers.length > 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModalEConsentController.prototype, "eConsentStatus", {
            get: function () {
                return this.activeBorrower.eConsent.consentStatus;
            },
            set: function (consentStatus) {
                this.activeBorrower.eConsent.consentStatus = consentStatus;
                this.activeBorrower.eConsent.statusAt = new Date();
            },
            enumerable: true,
            configurable: true
        });
        return ModalEConsentController;
    })();
    consumersite.ModalEConsentController = ModalEConsentController;
})(consumersite || (consumersite = {}));
//# sourceMappingURL=eConsent.controller.js.map