/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var PersonalController = (function () {
        function PersonalController(loan, loanAppPageContext, applicationData, authenticationService, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.authenticationService = authenticationService;
            this.templateRoot = templateRoot;
            this._disableHowDidYouHearAboutUs = false;
            this.isAuthenticated = function () {
                return _this.authenticationService.isAuthenticated();
            };
            this.isInHowDidYouHearAboutUs = function (howDidYouHearAboutUs) {
                var index = lib.findIndex(_this.howDidYouHearAboutUsList, function (lss) { return lss.value == howDidYouHearAboutUs; });
                if (index >= 0) {
                    return true;
                }
                return false;
            };
            this.populateHowDidYouHearAboutUsList = function () {
                _this.howDidYouHearAboutUsList = [
                    { text: 'Akasha Center', value: '0384' },
                    { text: 'Anaheim Fire Department', value: '0549' },
                    { text: 'BankRate', value: '0001' },
                    { text: 'CraigEvans', value: '9020' },
                    { text: 'Family', value: '0008' },
                    { text: 'Friend', value: '0003' },
                    { text: 'Internet', value: '0007' },
                    { text: 'GRM', value: '0159' },
                    { text: 'Mailer', value: '0005' },
                    { text: 'Radio (KTTH)', value: '0052' },
                    { text: 'SFC Financial Network', value: '0004' },
                    { text: 'Social Media', value: '0006' },
                ];
            };
            this.getmaritalStatusTypes = function () {
                return _this.applicationData.lookup.maritalStatuses.filter(function (i) { return i.text != "Select One"; });
            };
            //navigator will not let to transition into the next page if it is not valid - see employment.html
            this.isValid = function () {
                var result = false;
                try {
                    //validate fields for every employment
                    result = (_this.isValidFirstName && _this.isValidLastName && _this.isValidEmail && _this.isValidPhone && _this.isValidPhoneType && _this.isValidMaritalStatus && _this.isValidCoBorrower);
                }
                finally {
                    _this.isFormSetToBeTouched = !result;
                }
                return result;
            };
            this.OnValidationErrors = function () {
                return true;
            };
            this.isBorrower = !this.loanAppPageContext.isCoBorrowerState;
            this.borrower = !this.isBorrower ? this.loan.loanApp.coBorrower : this.loan.loanApp.borrower;
            //if authenticated
            if (this.authenticationService.isAuthenticated()) {
                this.loan.loanApp.borrower.email = this.authenticationService.getUserAccountName();
            }
            this.populateHowDidYouHearAboutUsList();
            // if authenticated, set the borrower's email account to the logged in user
            if (this.authenticationService.isAuthenticated()) {
                this.loan.loanApp.borrower.email = this.authenticationService.getUserAccountName();
            }
            // set the intial
            loan.loanApp.initialHasCoBorrowerState = !!this.loan.loanApp.hasCoBorrower;
            //this.loan.hearAboutUs = "0052";
            //if ((this.loan.hearAboutUs == undefined) ||
            //    (this.loan.hearAboutUs == "") ||
            //    (this.loan.hearAboutUs == null) ||
            //    !(this.isInHowDidYouHearAboutUs(this.loan.hearAboutUs))) {
            //    this._disableHearAboutUs = false;
            //}     
            //if ((this.loan.loanApp.howDidYouHearAboutUs == undefined) ||
            //    (this.loan.loanApp.howDidYouHearAboutUs == "") ||
            //    (this.loan.loanApp.howDidYouHearAboutUs == null) ||
            //    !(this.isInHowDidYouHearAboutUs(this.loan.loanApp.howDidYouHearAboutUs))) {
            //    this._disableHowDidYouHearAboutUs = false;
            //}     
        }
        Object.defineProperty(PersonalController.prototype, "disablehowDidYouHearAboutUs", {
            get: function () {
                return this._disableHowDidYouHearAboutUs;
            },
            set: function (val) {
                this._disableHowDidYouHearAboutUs = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "borrowerPhoneType", {
            get: function () {
                return this.borrower.preferredPhoneType;
            },
            set: function (borrowerPhoneType) {
                this.borrower.preferredPhoneType = borrowerPhoneType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "email", {
            get: function () {
                return this.borrower.email;
            },
            set: function (val) {
                this.borrower.email = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "maritalStatus", {
            get: function () {
                return this.borrower.maritalStatus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "howDidYouHearAboutUs", {
            //get hearAboutUs(): string {
            //    return this.loan.hearAboutUs;
            //}
            //set hearAboutUs(hearAboutUs: string) {
            //    this.loan.hearAboutUs = hearAboutUs;
            //}
            get: function () {
                return this.loan.loanApp.howDidYouHearAboutUs;
            },
            set: function (howDidYouHearAboutUs) {
                this.loan.loanApp.howDidYouHearAboutUs = howDidYouHearAboutUs;
            },
            enumerable: true,
            configurable: true
        });
        PersonalController.prototype.onAddCoBorrowerChange = function () {
            if ((this.loanAppPageContext.nextLoanAppNavigationState === 268435471 /* Summary */) && (this.loan.loanApp.initialHasCoBorrowerState != this.loan.loanApp.hasCoBorrower)) {
                this.showNotificationText = true;
            }
            else {
                this.showNotificationText = false;
            }
            this.loan.loanApp.coBorrower.maritalStatus = this.borrower.maritalStatus;
        };
        Object.defineProperty(PersonalController.prototype, "showNotification", {
            get: function () {
                return this.showNotificationText;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "isValidFirstName", {
            get: function () {
                return ((this.borrower.firstName) && (this.borrower.firstName != ""));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "isValidLastName", {
            get: function () {
                return ((this.borrower.lastName) && (this.borrower.lastName != ""));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "isValidEmail", {
            get: function () {
                return ((this.borrower.email) && (this.borrower.email != ""));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "isValidPhone", {
            get: function () {
                return ((this.borrower.preferredPhone) && (this.borrower.preferredPhone != ""));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "isValidPhoneType", {
            get: function () {
                return ((this.borrower.preferredPhoneType) && (this.borrower.preferredPhoneType != ""));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "isValidMaritalStatus", {
            get: function () {
                return ((this.borrower.maritalStatus) && (this.borrower.maritalStatus > -1));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PersonalController.prototype, "isValidCoBorrower", {
            get: function () {
                var hcb = document.getElementById('hasCoBorrower');
                var hncb = document.getElementById('hasNoCoBorrower');
                return true; // ((this.isNotPristine(hcb)) || (this.isNotPristine(hncb)));
            },
            enumerable: true,
            configurable: true
        });
        PersonalController.className = "personalController";
        PersonalController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'authenticationService', 'templateRoot'];
        return PersonalController;
    })();
    consumersite.PersonalController = PersonalController;
    moduleRegistration.registerController(consumersite.moduleName, PersonalController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=personal.controller.js.map