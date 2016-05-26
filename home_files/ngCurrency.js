/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
/*
//Attribute Directive designed to allow formatting input as currency filtered.
//
//example:
<input type="text" ng-model="myField" ng-currency fraction="2" min="1" max="1000000" currency-symbol="Y" required />
or
<input type="text" ng-model="myField" ng-currency/>


*/
//original Source:
/*
 * ng-currency
 * http://alaguirre.com/

 * Version: 0.9.5 - 2016-04-01
 * License: MIT
*/
//AlexK 2016-04-03: converted to TS, changed default fraction to 0, restricted typing
//TODO: unable to access locale constants (like this.$locale.DECIMAL_SEP) - hardcoded decimal and group separators.
var directive;
(function (directive) {
    var NgCurrencyDirective = (function () {
        function NgCurrencyDirective($filter, templateRoot, $timeout, $locale) {
            var _this = this;
            this.$filter = $filter;
            this.templateRoot = templateRoot;
            this.$timeout = $timeout;
            this.$locale = $locale;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.scope = {
                min: '=?min',
                max: '=?max',
                currencySymbol: '@',
                ngRequired: '=?ngRequired',
                fraction: '=?fraction' //default 0
            };
            this.restrictTyping = false;
            this.link = function ($scope, element, attrs, ngModel) {
                if (attrs["ngCurrency"] === 'false')
                    return;
                $scope.fraction = (typeof $scope.fraction !== 'undefined') ? $scope.fraction : 0;
                var decimalRex = function (dChar) {
                    return RegExp("\\d|\\-|\\" + dChar, 'g');
                };
                var clearRex = function (dChar) {
                    return RegExp("\\-{0,1}((\\" + dChar + ")|([0-9]{1,}\\" + dChar + "?))&?[0-9]{0," + $scope.fraction + "}", 'g');
                };
                var clearValue = function (value) {
                    value = String(value);
                    var dSeparator = "."; //this.$locale.DECIMAL_SEP;
                    var gSeparator = ","; //this.$locale.GROUP_SEP;
                    var cleared = null;
                    if (value.indexOf(dSeparator) == -1 && value.indexOf('.') != -1 && $scope.fraction) {
                        dSeparator = '.';
                    }
                    // Replace negative pattern to minus sign (-)
                    var neg_dummy = _this.$filter('currency')("-1", getCurrencySymbol(), $scope.fraction);
                    var neg_regexp = RegExp("[0-9." + dSeparator + gSeparator + "]+");
                    var neg_dummy_txt = neg_dummy.replace(neg_regexp.exec(neg_dummy), "");
                    var value_dummy_txt = value.replace(neg_regexp.exec(value), "");
                    // If is negative
                    if (neg_dummy_txt == value_dummy_txt) {
                        value = '-' + neg_regexp.exec(value);
                    }
                    if (RegExp("^-[\\s]*$", 'g').test(value)) {
                        value = "-0";
                    }
                    if (decimalRex(dSeparator).test(value)) {
                        cleared = value.match(decimalRex(dSeparator)).join("").match(clearRex(dSeparator));
                        cleared = cleared ? cleared[0].replace(dSeparator, ".") : null;
                    }
                    return cleared;
                };
                var getCurrencySymbol = function () {
                    if (angular.isDefined($scope.currencySymbol)) {
                        return $scope.currencySymbol;
                    }
                    else {
                        return _this.$locale.CURRENCY_SYM;
                    }
                };
                var reformatViewValue = function () {
                    var formatters = ngModel.$formatters, idx = formatters.length;
                    var viewValue = ngModel.$modelValue;
                    while (idx--) {
                        viewValue = formatters[idx](viewValue);
                    }
                    ngModel.$setViewValue(viewValue);
                    ngModel.$render();
                };
                ngModel.$parsers.push(function (viewValue) {
                    var cVal = clearValue(viewValue);
                    // Check for fast digitation (-. or .)
                    if (cVal == "." || cVal == "-.") {
                        cVal = ".0";
                    }
                    var retVal = parseFloat(cVal);
                    if (viewValue === undefined || viewValue == "" || viewValue == null || (cVal == null && (viewValue.toString() == "NaN")) || viewValue.toString() == "-") {
                        //to prevent stack overflow
                        return retVal;
                    }
                    if (_this.restrictTyping) {
                        if (!lib.hasNumericValue(viewValue)) {
                            ngModel.$setViewValue(retVal);
                            ngModel.$render();
                        }
                    }
                    return retVal;
                });
                element.on("blur", function () {
                    _this.restrictTyping = false;
                    ngModel.$commitViewValue();
                    reformatViewValue();
                });
                ngModel.$formatters.unshift(function (value) {
                    return _this.$filter('currency')(value, getCurrencySymbol(), $scope.fraction);
                });
                ngModel.$validators["min"] = function (cVal) {
                    if (!$scope.ngRequired && isNaN(cVal)) {
                        return true;
                    }
                    if (typeof $scope.min !== 'undefined') {
                        return cVal >= parseFloat($scope.min);
                    }
                    return true;
                };
                $scope.$watch('min', function (val) {
                    ngModel.$validate();
                });
                ngModel.$validators["max"] = function (cVal) {
                    if (!$scope.ngRequired && isNaN(cVal)) {
                        return true;
                    }
                    if (typeof $scope.max !== 'undefined') {
                        return cVal <= parseFloat($scope.max);
                    }
                    return true;
                };
                $scope.$watch('max', function (val) {
                    ngModel.$validate();
                });
                ngModel.$validators["fraction"] = function (cVal) {
                    if (!!cVal && isNaN(cVal)) {
                        return false;
                    }
                    return true;
                };
                $scope.$on('currencyRedraw', function () {
                    var prevRestrictTyping = _this.restrictTyping;
                    _this.restrictTyping = false;
                    ngModel.$commitViewValue();
                    reformatViewValue();
                    _this.restrictTyping = prevRestrictTyping;
                });
                element.on('focus', function () {
                    var viewValue = ngModel.$modelValue;
                    if (isNaN(viewValue) || viewValue === '' || viewValue == null) {
                        viewValue = '';
                    }
                    else {
                        viewValue = parseFloat(viewValue).toFixed($scope.fraction);
                    }
                    ngModel.$setViewValue(viewValue);
                    ngModel.$render();
                    _this.restrictTyping = true;
                });
            };
        }
        NgCurrencyDirective.createNew = function (args) {
            return new NgCurrencyDirective(args[0], args[1], args[2], args[3]);
        };
        NgCurrencyDirective.className = 'ngCurrency';
        NgCurrencyDirective.$inject = ['$filter', 'templateRoot', '$timeout', '$locale'];
        return NgCurrencyDirective;
    })();
    directive.NgCurrencyDirective = NgCurrencyDirective;
    moduleRegistration.registerDirective(consumersite.moduleName, NgCurrencyDirective);
})(directive || (directive = {}));
//# sourceMappingURL=ngCurrency.directive.js.map