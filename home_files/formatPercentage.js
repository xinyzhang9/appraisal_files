var directive;
(function (directive) {
    //------------------------------------------------------------------------
    //------------------------------------------------------------------------
    //  Percentage Directive with parameter for rounding.
    //------------------------------------------------------------------------
    var FormatPercentageRoundDirective = (function () {
        function FormatPercentageRoundDirective($filter, templateRoot) {
            this.$filter = $filter;
            this.templateRoot = templateRoot;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.link = function ($scope, element, attrs, ngModel) {
                if (!ngModel || ngModel.$modelValue == 0)
                    return;
                var formatter = function (value) {
                    value = value ? parseFloat(removeFormat(value)) : "";
                    var formattedValue = value.toString() + " %";
                    element.val(formattedValue);
                    return formattedValue;
                };
                var removeFormat = function (value) {
                    var temp0 = value.toString().replace('%', '');
                    return value.toString().replace(/[^0-9._-]/g, '');
                };
                ngModel.$formatters.push(formatter);
                element.bind('focus', function () {
                    //When you click on it, remove the '%' and any additional garbage.
                    element.val(removeFormat(element.val()));
                });
                element.bind('blur', function () {
                    //When focus is dropped from the input, format our input.
                    if (element.val() != 0)
                        formatter(element.val());
                });
            };
        }
        FormatPercentageRoundDirective.createNew = function (args) {
            return new FormatPercentageRoundDirective(args[0], args[1]);
        };
        FormatPercentageRoundDirective.className = 'formatPercentageRound';
        FormatPercentageRoundDirective.$inject = ['$filter', 'templateRoot'];
        return FormatPercentageRoundDirective;
    })();
    directive.FormatPercentageRoundDirective = FormatPercentageRoundDirective;
    moduleRegistration.registerDirective(consumersite.moduleName, FormatPercentageRoundDirective);
})(directive || (directive = {}));
//# sourceMappingURL=formatPercentage.directive.js.map