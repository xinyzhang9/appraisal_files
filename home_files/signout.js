/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var SignoutController = (function () {
        function SignoutController(loan, loanAppPageContext, templateRoot, $uibModal, authenticationService, navigationService) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.templateRoot = templateRoot;
            this.$uibModal = $uibModal;
            this.authenticationService = authenticationService;
            this.navigationService = navigationService;
            this.controllerAsName = "signoutCntrl";
            this.openConfirmSignoutModal = function () {
                var textSettings = {
                    header: 'Sign out confirmation',
                    body: 'Are you sure?',
                    cancel: 'Cancel',
                    confirm: 'Sign out'
                };
                var signoutModal = _this.$uibModal.open({
                    templateUrl: _this.templateRoot + 'consumersite/loanApp/signout/confirm.template.html',
                    controller: function () {
                        return new consumersite.ConfirmController(signoutModal, _this.templateRoot, textSettings);
                    },
                    controllerAs: 'confirmCtrl',
                    backdrop: true,
                    backdropClass: 'noBackdrop',
                    windowClass: 'confirm-flyout'
                });
                signoutModal.result.then(function (response) {
                    if (response) {
                        _this.authenticationService.signoutUser();
                        _this.navigationService.goToSignOut();
                    }
                }, 
                //cancel
                function () {
                });
            };
            this.phone = "(800)-555-1212";
        }
        SignoutController.className = "signoutController";
        SignoutController.$inject = ['loan', 'loanAppPageContext', 'templateRoot', '$uibModal', 'authenticationService', 'navigationService'];
        return SignoutController;
    })();
    consumersite.SignoutController = SignoutController;
    moduleRegistration.registerController(consumersite.moduleName, SignoutController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=signout.controller.js.map