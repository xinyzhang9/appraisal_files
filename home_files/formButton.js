/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var FormButtonController = (function () {
        function FormButtonController($scope, templateRoot) {
            var _this = this;
            this.$scope = $scope;
            this.templateRoot = templateRoot;
            this.getName = function () {
                return _this.$scope.name;
            };
            this.onClick = function () {
                if (_this.$scope.form.$valid) {
                    _this.$scope.onClick();
                    _this.$scope.form.$setPristine();
                    _this.$scope.form.$setUntouched();
                }
                else {
                    directive.touchAllFormErrors(_this.$scope.form.$error);
                }
            };
            this.cssClass = function () {
                return _this.$scope.cssClass;
            };
        }
        FormButtonController.className = 'formButtonController';
        FormButtonController.$inject = ['$scope', 'templateRoot'];
        return FormButtonController;
    })();
    directive.FormButtonController = FormButtonController;
    var FormButtonDirective = (function () {
        function FormButtonDirective(templateRoot) {
            this.templateRoot = templateRoot;
            this.require = ['^form'];
            this.link = function (scope, instanceElement, instanceAttributes, controller, transclude) {
                scope.form = controller[0];
            };
            this.controller = 'formButtonController';
            this.controllerAs = 'formButtonCntrl';
            this.transclude = true;
            this.restrict = 'E';
            this.scope = {
                cssClass: '@?',
                onClick: '&',
                name: '@'
            };
        }
        FormButtonDirective.createNew = function (args) {
            return new FormButtonDirective(args[0]);
        };
        Object.defineProperty(FormButtonDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/formbutton/form-button.template.html';
            },
            enumerable: true,
            configurable: true
        });
        FormButtonDirective.className = 'formButton';
        FormButtonDirective.$inject = ['templateRoot'];
        return FormButtonDirective;
    })();
    directive.FormButtonDirective = FormButtonDirective;
    moduleRegistration.registerController(consumersite.moduleName, FormButtonController);
    moduleRegistration.registerDirective(consumersite.moduleName, FormButtonDirective);
})(directive || (directive = {}));
//# sourceMappingURL=formButton.directive.js.map