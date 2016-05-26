/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var RadioButtonController = (function () {
        function RadioButtonController($scope) {
            this.$scope = $scope;
        }
        Object.defineProperty(RadioButtonController.prototype, "Model", {
            //#region IRadioButtonController implementation
            get: function () {
                return this.$scope.ngModel;
            },
            set: function (model) {
                this.$scope.ngModel = model;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButtonController.prototype, "Value", {
            get: function () {
                return this.$scope.ngValue;
            },
            set: function (value) {
                this.$scope.ngValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButtonController.prototype, "Label", {
            get: function () {
                return this.$scope.label;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButtonController.prototype, "CSSClass", {
            get: function () {
                return this.$scope.cssClass;
            },
            set: function (cssClass) {
                this.$scope.cssClass = cssClass;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButtonController.prototype, "Group", {
            get: function () {
                return this.$scope.group;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButtonController.prototype, "Required", {
            get: function () {
                return this.$scope.ngRequired;
            },
            set: function (required) {
                this.$scope.ngRequired = required;
            },
            enumerable: true,
            configurable: true
        });
        RadioButtonController.prototype.OnChange = function () {
            this.$scope.ngChange();
        };
        //#endregion
        //#region constructor
        RadioButtonController.$inject = ['$scope'];
        RadioButtonController.className = 'radioButtonController';
        return RadioButtonController;
    })();
    //#endregion
    //#region directive
    var RadioButtonDirective = (function () {
        function RadioButtonDirective(templateRoot) {
            this.templateRoot = templateRoot;
            //#endregion
            //#region properties
            this.restrict = 'E';
            this.transclude = false;
            this.replace = true;
            this.controller = "radioButtonController";
            this.controllerAs = "vm";
            this.bindToController = false;
            this.scope = {
                ngModel: "=",
                ngValue: "=",
                ngRequired: "=",
                cssClass: "@",
                label: "@",
                group: "@",
                ngChange: "&"
            };
        }
        RadioButtonDirective.createNew = function (args) {
            return new RadioButtonDirective(args[0]);
        };
        Object.defineProperty(RadioButtonDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/radioButton/radio-button.template.html';
            },
            enumerable: true,
            configurable: true
        });
        //#region constructor
        RadioButtonDirective.$inject = ['templateRoot'];
        RadioButtonDirective.className = 'radioButton';
        return RadioButtonDirective;
    })();
    //#endregion
    moduleRegistration.registerController(consumersite.moduleName, RadioButtonController);
    moduleRegistration.registerDirective(consumersite.moduleName, RadioButtonDirective);
})(directive || (directive = {}));
//# sourceMappingURL=radioButton.directive.js.map