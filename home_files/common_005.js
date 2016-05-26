var directive;
(function (directive) {
    function touchAllFormErrors(error) {
        for (var key in error) {
            for (var i = 0; i < error[key].length; i++) {
                error[key][i].$setTouched();
            }
        }
    }
    directive.touchAllFormErrors = touchAllFormErrors;
})(directive || (directive = {}));
//# sourceMappingURL=common.functions.js.map