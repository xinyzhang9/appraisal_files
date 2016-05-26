/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var ExpandCollapseController = (function () {
        function ExpandCollapseController($scope, templateRoot) {
            var _this = this;
            this.$scope = $scope;
            this.templateRoot = templateRoot;
            this.toggleIsShown = function () {
                //console.log("Yep");
                _this.$scope.isShown = !_this.$scope.isShown;
            };
        }
        Object.defineProperty(ExpandCollapseController.prototype, "isShown", {
            get: function () {
                return this.$scope.isForceOpen || this.$scope.isShown;
            },
            enumerable: true,
            configurable: true
        });
        ExpandCollapseController.className = 'expandCollapseController';
        ExpandCollapseController.$inject = ['$scope', 'templateRoot'];
        return ExpandCollapseController;
    })();
    directive.ExpandCollapseController = ExpandCollapseController;
    var ExpandCollapseDirective = (function () {
        function ExpandCollapseDirective(templateRoot) {
            this.templateRoot = templateRoot;
            this.controller = 'expandCollapseController';
            this.controllerAs = 'expandCollapseCntrl';
            this.transclude = true;
            this.restrict = 'E';
            this.bindToController = false;
            this.scope = {
                isShown: '=',
                isForceOpen: '=',
            };
        }
        ExpandCollapseDirective.createNew = function (args) {
            return new ExpandCollapseDirective(args[0]);
        };
        Object.defineProperty(ExpandCollapseDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/expandcollapse/expand-collapse.template.html';
            },
            enumerable: true,
            configurable: true
        });
        ExpandCollapseDirective.className = 'expandCollapse';
        ExpandCollapseDirective.$inject = ['templateRoot'];
        return ExpandCollapseDirective;
    })();
    directive.ExpandCollapseDirective = ExpandCollapseDirective;
    moduleRegistration.registerController(consumersite.moduleName, ExpandCollapseController);
    moduleRegistration.registerDirective(consumersite.moduleName, ExpandCollapseDirective);
})(directive || (directive = {}));
//# sourceMappingURL=expandCollapse.directive.js.map