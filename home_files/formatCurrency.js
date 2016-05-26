/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
//Jacob Nix - 01/05/2016
//Attribute Directive designed to allow formatting input as currency filtered.
//
//example:
//<input type"text" ng-model="myDollarInput" format-currency />
var directive;
(function (directive) {
    var FormatCurrencyDirective = (function () {
        function FormatCurrencyDirective($filter, templateRoot, $timeout) {
            var _this = this;
            this.$filter = $filter;
            this.templateRoot = templateRoot;
            this.$timeout = $timeout;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function ($scope, element, attrs, ngModel) {
                if (!ngModel || ngModel.$modelValue == 0)
                    return;
                var formatter = function (value) {
                    value = value ? parseFloat(removeFormat(value)) : "";
                    var formattedValue = _this.$filter('currency')(value);
                    element.val(formattedValue);
                    return formattedValue;
                };
                var format = function () {
                    if (element.val() != 0) {
                        formatter(element.val());
                    }
                };
                var removeFormat = function (value) {
                    return value.toString().replace(/[^\d\.\-]/g, '');
                };
                _this.$timeout(function () {
                    ngModel.$formatters.push(formatter);
                    format();
                }, 0);
                element.bind('focus', function () {
                    //When you click on it, remove the '$' and any additional garbage.
                    element.val(removeFormat(element.val()));
                });
                element.bind('blur', function () {
                    //When focus is dropped from the input, format our input.
                    format();
                });
            };
        }
        FormatCurrencyDirective.createNew = function (args) {
            return new FormatCurrencyDirective(args[0], args[1], args[2]);
        };
        FormatCurrencyDirective.className = 'formatCurrency';
        FormatCurrencyDirective.$inject = ['$filter', 'templateRoot', '$timeout'];
        return FormatCurrencyDirective;
    })();
    directive.FormatCurrencyDirective = FormatCurrencyDirective;
    moduleRegistration.registerDirective(consumersite.moduleName, FormatCurrencyDirective);
    var FormatCurrencyRoundDirective = (function () {
        function FormatCurrencyRoundDirective($filter, templateRoot) {
            var _this = this;
            this.$filter = $filter;
            this.templateRoot = templateRoot;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function ($scope, element, attrs, ngModel) {
                if (!ngModel || ngModel.$modelValue == 0)
                    return;
                attrs.$observe('roundParam', function (value) {
                    $scope.isRound = value;
                });
                var formatter = function (value) {
                    value = value ? parseFloat(removeFormat(value)) : "";
                    var formattedValue = _this.$filter('currency')(value);
                    if ($scope.isRound === "true") {
                        var indexOfDecimal = formattedValue.indexOf(".");
                        // after rounding above and applying format filter for currency.  
                        //we remove from decimal to end.
                        if (indexOfDecimal > 0) {
                            formattedValue = formattedValue.substring(0, indexOfDecimal);
                        }
                    }
                    element.val(formattedValue);
                    return formattedValue;
                };
                var removeFormat = function (value) {
                    if ($scope.isRound === "true") {
                        var temp2 = value.toString().replace(/[^0-9._-]/g, '');
                        if (temp2 === "" || isNaN(temp2)) {
                            return "";
                        }
                        else {
                            var floatValue = parseFloat(temp2);
                            return Math.round(floatValue).toString();
                        }
                    }
                    else {
                        return value.toString().replace(/[^0-9._-]/g, '');
                    }
                };
                ngModel.$formatters.push(formatter);
                element.bind('focus', function () {
                    //When you click on it, remove the '$' and any additional garbage.
                    element.val(removeFormat(element.val()));
                });
                element.bind('blur', function () {
                    //When focus is dropped from the input, format our input.
                    if (element.val() != 0)
                        formatter(element.val());
                });
            };
        }
        FormatCurrencyRoundDirective.createNew = function (args) {
            return new FormatCurrencyRoundDirective(args[0], args[1]);
        };
        FormatCurrencyRoundDirective.className = 'formatCurrencyRound';
        FormatCurrencyRoundDirective.$inject = ['$filter', 'templateRoot'];
        return FormatCurrencyRoundDirective;
    })();
    directive.FormatCurrencyRoundDirective = FormatCurrencyRoundDirective;
    moduleRegistration.registerDirective(consumersite.moduleName, FormatCurrencyRoundDirective);
})(directive || (directive = {}));
//# sourceMappingURL=formatCurrency.directive.js.map