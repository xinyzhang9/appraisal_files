/// <reference path="../otherincome/otherincome.controller.ts" />
/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var AddressController = (function () {
        function AddressController(loan, loanAppPageContext, applicationData, navigationService, consumerLoanService, templateRoot) {
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.navigationService = navigationService;
            this.consumerLoanService = consumerLoanService;
            this.templateRoot = templateRoot;
            this.isBorrower = true;
            this.isBorrower = !loanAppPageContext.isCoBorrowerState;
            //Modified to proper syntax
            if (!this.borrower.currentAddress.isSameAsPropertyAddress) {
                this.borrower.currentAddress.isSameAsPropertyAddress = false;
            }
            this.isBorrowerCurrentAddressSameAsPropertyAddress = this.borrower.currentAddress.isSameAsPropertyAddress;
            this.isAddressSameOnLoad = this.loan.loanApp.coBorrowerHasDifferentCurrentAddress;
        }
        Object.defineProperty(AddressController.prototype, "hasCoBorrower", {
            get: function () {
                return this.loan.loanApp.hasCoBorrower;
            },
            set: function (hasCoBorrower) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerName", {
            get: function () {
                return this.loan.loanApp.borrower.fullName;
            },
            set: function (borrowerName) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "coBorrowerName", {
            get: function () {
                if (this.loan.loanApp.hasCoBorrower) {
                    return this.loan.loanApp.coBorrower.fullName;
                }
                else {
                    return "";
                }
            },
            set: function (coBorrowerName) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrower", {
            get: function () {
                var borrower = this.isBorrower ? this.loan.loanApp.borrower : this.loan.loanApp.coBorrower;
                return borrower;
            },
            set: function (borrower) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "ownershipTypesList", {
            /// zzp, 02/09/2016
            get: function () {
                return this.applicationData.lookup.ownershipTypesList;
            },
            set: function (ownershipTypesList) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerCurrentAddressOwnOrRent", {
            get: function () {
                return this.borrower.currentAddress.ownOrRent;
            },
            set: function (borrowerCurrentAddressOwnOrRent) {
                this.borrower.currentAddress.ownOrRent = borrowerCurrentAddressOwnOrRent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerPreviousAddressOwnOrRent", {
            get: function () {
                return this.borrower.previousAddress.ownOrRent;
            },
            set: function (borrowerPreviousAddressOwnOrRent) {
                this.borrower.previousAddress.ownOrRent = borrowerPreviousAddressOwnOrRent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerTimeAtAddressYears", {
            //borrower Current Address Years
            get: function () {
                var years;
                //BE-- Quick fix
                //The coborrower is initialized with the value from borrower, 
                //so when coborrower is displayed it takes the years from borrower.
                if (this.isBorrower) {
                    years = this.borrower.currentAddress.timeAtAddressYears;
                }
                else {
                    years = this.loan.loanApp.coBorrower.currentAddress.timeAtAddressYears;
                }
                return years;
            },
            set: function (borrowerTimeAtAddressYears) {
                this.borrower.currentAddress.timeAtAddressYears = borrowerTimeAtAddressYears;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerTimeAtAddressMonths", {
            //borrower Current Months Months
            get: function () {
                var months = this.borrower.currentAddress.timeAtAddressMonths;
                return months;
            },
            set: function (borrowerTimeAtAddressMonths) {
                this.borrower.currentAddress.timeAtAddressMonths = borrowerTimeAtAddressMonths;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerTimeAtPreviousAddressYears", {
            //borrower Previous Address Years
            get: function () {
                var years = this.borrower.previousAddress.timeAtAddressYears;
                return years;
            },
            set: function (borrowerTimeAtPreviousAddressYears) {
                this.borrower.previousAddress.timeAtAddressYears = borrowerTimeAtPreviousAddressYears;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerTimeAtPreviousAddressMonths", {
            //borrower Previous Months Months
            get: function () {
                var months = this.borrower.previousAddress.timeAtAddressMonths;
                return months;
            },
            set: function (borrowerTimeAtPreviousAddressMonths) {
                this.borrower.previousAddress.timeAtAddressMonths = borrowerTimeAtPreviousAddressMonths;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerCurrentMonthlyRent", {
            get: function () {
                var months = this.borrower.currentAddress.monthlyRent;
                return months;
            },
            set: function (monthlyRent) {
                this.borrower.currentAddress.monthlyRent = monthlyRent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "borrowerPreviousMonthlyRent", {
            get: function () {
                var months = this.borrower.previousAddress.monthlyRent;
                return months;
            },
            set: function (monthlyRent) {
                this.borrower.previousAddress.monthlyRent = monthlyRent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "addressCurrent", {
            get: function () {
                var addressCurrent;
                if (this.borrower.currentAddress.isSameAsPropertyAddress) {
                    this.borrower.currentAddress = this.loan.property;
                    addressCurrent = this.loan.property;
                }
                else {
                    addressCurrent = this.borrower.currentAddress;
                }
                return addressCurrent;
            },
            set: function (addressCurrent) {
                // read only
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "isSameMailingAsBorrowerCurrentAddress", {
            get: function () {
                return this.borrower.mailingAddress.isSameMailingAsBorrowerCurrentAddress;
            },
            set: function (isSameMailingAsBorrowerCurrentAddress) {
                this.borrower.mailingAddress.isSameMailingAsBorrowerCurrentAddress = isSameMailingAsBorrowerCurrentAddress;
                if (!this.borrower.isCoBorrower)
                    this.loan.loanApp.borrower.currentAddress.isMailingAddressDifferent = !isSameMailingAsBorrowerCurrentAddress;
                else
                    this.loan.loanApp.coBorrower.currentAddress.isMailingAddressDifferent = !isSameMailingAsBorrowerCurrentAddress;
                // TFS Task #46214. Mailing address should be blank by default.
                //if (isSameMailingAsBorrowerCurrentAddress) {
                //    this.addressMailing = this.borrower.currentAddress;
                //}     
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "addressMailing", {
            get: function () {
                if (this.isSameMailingAsBorrowerCurrentAddress) {
                    return this.addressCurrent;
                }
                else {
                    return this.borrower.mailingAddress;
                }
            },
            set: function (addressMailing) {
                this.borrower.mailingAddress.streetName = addressMailing.streetName;
                this.borrower.mailingAddress.cityName = addressMailing.cityName;
                this.borrower.mailingAddress.stateName = addressMailing.stateName;
                this.borrower.mailingAddress.zipCode = addressMailing.zipCode;
                this.borrower.mailingAddress.fullAddress = addressMailing.fullAddress;
                this.borrower.mailingAddress.countyName = addressMailing.countyName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "isPreviousAddressRequired", {
            get: function () {
                if (!this.borrower.currentAddress.timeAtAddressYears && !this.borrower.currentAddress.timeAtAddressMonths) {
                    return false;
                }
                var years = lib.getNumericValue(this.borrower.currentAddress.timeAtAddressYears);
                var months = lib.getNumericValue(this.borrower.currentAddress.timeAtAddressMonths);
                var monthsTotal = (years * 12) + months;
                return monthsTotal < 24;
            },
            set: function (isPreviousAddressRequired) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "addressPrevious", {
            get: function () {
                return this.borrower.previousAddress;
            },
            set: function (addressPrevious) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "isCoborrowerAddressSame", {
            get: function () {
                return this.loan.loanApp.coBorrowerHasDifferentCurrentAddress;
            },
            set: function (isCoborrowerAddressSame) {
                this.loan.loanApp.coBorrowerHasDifferentCurrentAddress = isCoborrowerAddressSame;
                this.loan.loanApp.borrower.currentAddress.occupancyType = 1 /* PrimaryResidence */;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "addressWidgetTemplateUrl", {
            // @todo-cc: 
            // Generalize ; lib/module
            //
            //      Review; Using suppressed setter to avoid Error: [$compile: nonassign], below one- time and function binding attempts did not seem to work
            //      <address-widget content-url="::(propertyCntrl.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html')"
            //          Error: [$compile:nonassign] Expression '::(propertyCntrl.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html')' is non-assignable!
            //      <address-widget content-url="::propertyCntrl.addressWidgetTemplateUrl()"
            //          Error: [$compile:nonassign] Expression '::propertyCntrl.addressWidgetTemplateUrl()' used with directive 'addressWidget' is non-assignable!
            get: function () {
                // return this.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html';
                var tr = this.templateRoot;
                var tp = '/angUlar/consumersite/loanapp/templates/address-widget.template.html';
                var tu = tp;
                return tu;
            },
            set: function (addressWidgetTemplateUrl) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "addressWidgetTemplateUrlLeft", {
            get: function () {
                // return this.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html';
                var tr = this.templateRoot;
                var tp = '/angular/consumersite/loanapp/templates/address-widget.template-left.html';
                var tu = tp;
                return tu;
            },
            set: function (addressWidgetTemplateUrlLeft) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "addressWidgetTemplateUrlRight", {
            get: function () {
                // return this.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html';
                var tr = this.templateRoot;
                var tp = '/angular/consumersite/loanapp/templates/address-widget.template-right.html';
                var tu = tp;
                return tu;
            },
            set: function (addressWidgetTemplateUrlRight) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddressController.prototype, "addressWidgetTemplateUrl2", {
            get: function () {
                // return this.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html';
                var tr = this.templateRoot;
                var tp = '/angular/consumersite/loanapp/templates/address-widget.template2.html';
                var tu = tp;
                return tu;
            },
            set: function (addressWidgetTemplateUrl2) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        AddressController.prototype.onHasSameAddressChange = function () {
            if ((this.loanAppPageContext.nextLoanAppNavigationState === 268435471 /* Summary */) && (this.loan.loanApp.coBorrowerHasDifferentCurrentAddress != this.isAddressSameOnLoad)) {
                this.navigationService.borrowerSameAddressChanged();
                this.showNotificationText = true;
            }
            else {
                this.showNotificationText = false;
            }
            //When Co-borrower has different current address than Borrower
            if (this.isCoborrowerAddressSame) {
                this.loan.loanApp.coBorrower.currentAddress.isSameAsPrimaryBorrowerCurrentAddress = this.isCoborrowerAddressSame;
            }
        };
        Object.defineProperty(AddressController.prototype, "showNotification", {
            get: function () {
                return this.showNotificationText;
            },
            enumerable: true,
            configurable: true
        });
        AddressController.className = "addressController";
        AddressController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'navigationService', 'consumerLoanService', 'templateRoot'];
        return AddressController;
    })();
    consumersite.AddressController = AddressController;
    moduleRegistration.registerController(consumersite.moduleName, AddressController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=address.controller.js.map