/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var SaveForLaterLandingController = (function () {
        function SaveForLaterLandingController(loan, navigationService) {
            var _this = this;
            this.loan = loan;
            this.navigationService = navigationService;
            this.logOut = function () {
                _this.navigationService.goToLogOut();
            };
            this.getLoanAppPageLink = function () {
                return _this.navigationService.getLoanAppPageLink(_this.loan.pageNavigationState);
            };
        }
        SaveForLaterLandingController.className = 'saveForLaterLandingController';
        SaveForLaterLandingController.$inject = ['loan', 'navigationService'];
        return SaveForLaterLandingController;
    })();
    consumersite.SaveForLaterLandingController = SaveForLaterLandingController;
    moduleRegistration.registerController(consumersite.moduleName, SaveForLaterLandingController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=saveforlaterLanding.controller.js.map