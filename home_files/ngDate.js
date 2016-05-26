/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var NgDateDirective = (function () {
        function NgDateDirective() {
            var _this = this;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function ($scope, element, attrs, ngModel) {
                //convert data from view format to model format
                ngModel.$parsers.push(_this.formatDate);
                //convert data from model format to view format
                ngModel.$formatters.push(_this.formatDate);
            };
            this.formatDate = function (data) {
                if (data) {
                    return new Date(data.toString());
                }
            };
        }
        NgDateDirective.createNew = function (args) {
            return new NgDateDirective();
        };
        NgDateDirective.className = 'ngDate';
        NgDateDirective.$inject = [];
        return NgDateDirective;
    })();
    directive.NgDateDirective = NgDateDirective;
    moduleRegistration.registerDirective(consumersite.moduleName, NgDateDirective);
})(directive || (directive = {}));
//# sourceMappingURL=ngDate.directive.js.map