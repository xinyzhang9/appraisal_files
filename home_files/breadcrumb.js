/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var BreadCrumbMNSController = (function () {
        function BreadCrumbMNSController(navigationService, templateRoot) {
            var _this = this;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.isDisclosuresRequired = function () {
                return _this.navigationService.canNavigateDisclosures();
            };
            this.getDisclosuresLink = function () {
                return _this.navigationService.getDisclosuresLink();
            };
            this.hasReachedDisclosures = function () {
                return true;
            };
            this.isAtDisclosures = function () {
                return false;
            };
            this.isAppraisalRequired = function () {
                return _this.navigationService.canNavigateAppraisalOrder();
            };
            this.getAppraisalLink = function () {
                return _this.navigationService.getAppraisalOrderLink();
            };
            this.hasReachedAppraisal = function () {
                return false;
            };
            this.isAtAppraisal = function () {
                return _this.navigationService.isAtAppraisal();
            };
            this.isDocUploadRequired = function () {
                return _this.navigationService.isDocUploadRequired();
            };
            this.getDocUploadLink = function () {
                return _this.navigationService.getDocUploadLink();
            };
            this.hasReachedDocUpload = function () {
                return false;
            };
            this.isAtDocUpload = function () {
                return _this.navigationService.isAtDocUpload();
            };
            this.getSuccessLink = function () {
                return '';
            };
            this.hasReachedCompletion = function () {
                return false;
            };
            this.isAtCompletion = function () {
                return false;
            };
        }
        BreadCrumbMNSController.className = 'breadCrumbMNSController';
        BreadCrumbMNSController.$inject = ['navigationService', 'templateRoot'];
        return BreadCrumbMNSController;
    })();
    directive.BreadCrumbMNSController = BreadCrumbMNSController;
    var BreadCrumbMNSDirective = (function () {
        function BreadCrumbMNSDirective(templateRoot) {
            this.templateRoot = templateRoot;
            this.controller = 'breadCrumbMNSController';
            this.controllerAs = 'breadCrumbMNSCntrl';
            this.transclude = true;
            this.restrict = 'E';
        }
        BreadCrumbMNSDirective.createNew = function (args) {
            return new BreadCrumbMNSDirective(args[0]);
        };
        Object.defineProperty(BreadCrumbMNSDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/breadcrumb/breadcrumb.my-next-step.html';
            },
            enumerable: true,
            configurable: true
        });
        BreadCrumbMNSDirective.className = 'breadCrumbMyNextStep';
        BreadCrumbMNSDirective.$inject = ['templateRoot'];
        return BreadCrumbMNSDirective;
    })();
    directive.BreadCrumbMNSDirective = BreadCrumbMNSDirective;
    moduleRegistration.registerController(consumersite.moduleName, BreadCrumbMNSController);
    moduleRegistration.registerDirective(consumersite.moduleName, BreadCrumbMNSDirective);
})(directive || (directive = {}));
//# sourceMappingURL=breadcrumb.myNextStep.directive.js.map