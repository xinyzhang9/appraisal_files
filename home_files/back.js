/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var BackController = (function () {
        function BackController(navigationService, templateRoot) {
            var _this = this;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.goToPreviousState = function () {
                _this.navigationService.back();
            };
            this.showBackButton = function () {
                return _this.navigationService.canGoBack();
            };
        }
        BackController.className = 'backController';
        BackController.$inject = ['navigationService', 'templateRoot'];
        return BackController;
    })();
    directive.BackController = BackController;
    var BackDirective = (function () {
        function BackDirective(templateRoot) {
            this.templateRoot = templateRoot;
            this.controller = 'backController';
            this.controllerAs = 'backCntrl';
            this.transclude = true;
            this.restrict = 'E';
            this.bindToController = false;
        }
        BackDirective.createNew = function (args) {
            return new BackDirective(args[0]);
        };
        Object.defineProperty(BackDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/back/back.template.html';
            },
            enumerable: true,
            configurable: true
        });
        BackDirective.className = 'backButton';
        BackDirective.$inject = ['templateRoot'];
        return BackDirective;
    })();
    directive.BackDirective = BackDirective;
    moduleRegistration.registerController(consumersite.moduleName, BackController);
    moduleRegistration.registerDirective(consumersite.moduleName, BackDirective);
})(directive || (directive = {}));
//# sourceMappingURL=back.directive.js.map