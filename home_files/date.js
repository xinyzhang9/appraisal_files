var common;
(function (common) {
    var placeholderFormat = 'datePlaceholderFormat';
    var DatePlaceholder = (function () {
        function DatePlaceholder(datePlaceholderFormat) {
            var _this = this;
            this.datePlaceholderFormat = datePlaceholderFormat;
            //require = '^input ngModel';
            //input[type = "date"]
            this.require = ['ngModel'];
            this.restrict = 'A';
            this.link = function (scope, instanceElement, instanceAttributes, controller, transclude) {
                instanceElement.attr("placeholder", _this.datePlaceholderFormat);
            };
        }
        DatePlaceholder.createNew = function (args) {
            return new DatePlaceholder(args[0]);
        };
        DatePlaceholder.$inject = ['datePlaceholderFormat'];
        DatePlaceholder.className = 'datePlaceholder';
        return DatePlaceholder;
    })();
    var moduleName = 'dateCompatibility';
    angular.module(moduleName, []);
    moduleRegistration.registerDirective(moduleName, DatePlaceholder);
    angular.module(moduleName).value(placeholderFormat, getDatePlaceHolder());
    // Per now, Chrome and Edge support the desired format.
    // other browsers default.
    function getDatePlaceHolder() {
        var defaultDatePlaceHolder = 'yyyy-mm-dd';
        var desiredDatePlaceHolder = 'mm/dd/yyyy';
        var sUsrAg = window.navigator.userAgent;
        if (sUsrAg.indexOf("Chrome") > -1 || sUsrAg.indexOf("Edge") > -1) {
            //sBrowser = "Google Chrome";
            return desiredDatePlaceHolder;
        }
        else {
            // sBrowser = "Apple Safari";
            return defaultDatePlaceHolder;
        }
        //var msie = parseInt((/msie (\d+)/.exec(sUsrAg.toLowerCase()) || [])[1]);
        //if (isNaN(msie)) {
        //    msie = parseInt((/trident\/.*; rv:(\d+)/.exec(sUsrAg.toLowerCase()) || [])[1]);
        //    //sBrowser = "Microsoft Internet Explorer"
        //    return defaultDatePlaceHolder;
        //}
        //else {
        //    if (sUsrAg.indexOf("Chrome") > -1) {
        //        //sBrowser = "Google Chrome";
        //        return desiredDatePlaceHolder;
        //    } else if (sUsrAg.indexOf("Safari") > -1) {
        //       // sBrowser = "Apple Safari";
        //        return defaultDatePlaceHolder;
        //    } else if (sUsrAg.indexOf("Opera") > -1) {
        //        //sBrowser = "Opera";
        //        return defaultDatePlaceHolder;
        //    } else if (sUsrAg.indexOf("Firefox") > -1) {
        //       // sBrowser = "Mozilla Firefox";
        //        return defaultDatePlaceHolder;
        //    } else if (sUsrAg.indexOf("MSIE") > -1) {
        //       // sBrowser = "Microsoft Internet Explorer";
        //        return defaultDatePlaceHolder;
        //    }
        //    else {
        //        //sBrowser = "Edge";
        //        return desiredDatePlaceHolder;
        //    }
        //}
        //return defaultDatePlaceHolder;
    }
})(common || (common = {}));
//# sourceMappingURL=date.placeholder.directive.js.map