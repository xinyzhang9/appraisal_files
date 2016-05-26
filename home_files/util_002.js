var util;
(function (util) {
    var ConsumerSiteUtilService = (function () {
        function ConsumerSiteUtilService($log) {
            var _this = this;
            this.$log = $log;
            this._regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;
            //this method is in place to handle triggering the child elements as "touched" to fire the invalid css classes.
            //returns true if form is valid, false otherwise.
            this.validateForm = function (form) {
                if (form.$invalid || form.$pristine) {
                    angular.forEach(form.$error, function (field) {
                        angular.forEach(field, function (errorField) {
                            //if it has child forms, loop through those and set them as invalid.
                            if (angular.isDefined(errorField.$$parentForm)) {
                                _this.validateForm(errorField);
                            }
                            else {
                                errorField.$setTouched();
                            }
                        });
                    });
                }
                if (!form.$valid) {
                    console.log(form.$name + " is invalid");
                }
                return form.$valid;
            };
            this.validateEmail = function (email) {
                if (email !== "") {
                    return _this._regexEmail.test(email);
                }
                return false;
            };
        }
        ConsumerSiteUtilService.$inject = ['$log'];
        ConsumerSiteUtilService.className = 'consumerSiteUtilService';
        return ConsumerSiteUtilService;
    })();
    util.ConsumerSiteUtilService = ConsumerSiteUtilService;
    (function (LoggedInUser) {
        LoggedInUser[LoggedInUser["Unknown"] = 0] = "Unknown";
        LoggedInUser[LoggedInUser["Borrower"] = 1] = "Borrower";
        LoggedInUser[LoggedInUser["CoBorrower"] = 2] = "CoBorrower";
        LoggedInUser[LoggedInUser["Both"] = 3] = "Both";
    })(util.LoggedInUser || (util.LoggedInUser = {}));
    var LoggedInUser = util.LoggedInUser;
    function getLoggedInUser(loan, authenticationService) {
        // default to the borrower being logged in
        var loggedInUser = 1 /* Borrower */;
        if (navigation.isJointAccount(loan)) {
            loggedInUser = 3 /* Both */;
        }
        else if (loan.loanApp.hasCoBorrower && loan.loanApp.coBorrower.userAccountId == authenticationService.getLoggedInUserId()) {
            loggedInUser = 2 /* CoBorrower */;
        }
        return loggedInUser;
    }
    util.getLoggedInUser = getLoggedInUser;
    moduleRegistration.registerService(consumersite.moduleName, ConsumerSiteUtilService);
})(util || (util = {}));
//# sourceMappingURL=util.service.js.map