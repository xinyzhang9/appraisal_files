/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var PropertyController = (function () {
        function PropertyController(loan, loanAppPageContext, applicationData, navigationService, $scope, $location, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.downPaymentValue = 0;
            this.downPaymentPercentage = 0;
            this.showCurrentAddressRadioButton = function () {
                if (!_this.loan.property.NeedPreApproval && _this.loan.loanPurposeType == 1 /* Purchase */)
                    return true;
                return false;
            };
            //state:true means "Pre-approved" , false means "been accepted"
            this.needPreApproval_Click = function (state) {
                _this.loan.property.NeedPreApproval = state;
                _this.stateEnabled = false;
                _this.cityEnabled = false;
                if (_this.loan.property.NeedPreApproval) {
                    _this.streetEnabled = false;
                    _this.streetPlaceHolderName = "TBD";
                    _this.isStreetRequired = false;
                    _this.loan.property.streetName = "TBD"; //Removing previously held values during different selection
                    _this.loan.loanApp.borrower.currentAddress.isSameAsPropertyAddress = _this.isSameAddAsPropertyNumberValue == 1 ? !_this.isSameAddAsPropertyNumberValue : !!_this.isSameAddAsPropertyNumberValue; //false;
                    _this.loan.homeBuyingType = 3 /* GetPreApproved */;
                }
                else {
                    _this.streetEnabled = true;
                    _this.streetPlaceHolderName = "";
                    _this.isStreetRequired = true;
                    if (_this.loan.property.streetName == "TBD")
                        _this.loan.property.streetName = "";
                    _this.loan.homeBuyingType = 1 /* OfferAccepted */;
                }
                return;
            };
            this.getDownPmtSourceTypes = function () {
                return _this.applicationData.lookup.downPaymentSourcesTypes.filter(function (i) { return i.value == "1" || i.value == "4" || i.value == "6" || i.value == "7" || i.value == "11" || i.value == "12" || i.value == "13" || i.value == "19"; });
            };
            this.calculateDownPayment = function (base) {
                var purchasePrice = this.loan.property.purchasePrice;
                var loanAmount = this.loan.loanAmount;
                var downPayment = this.loan.property.downPayment;
                switch (base) {
                    case "PurchasePrice":
                        this.loan.loanAmount = purchasePrice - downPayment;
                        break;
                    case "LoanAmount":
                        this.loan.property.downPayment = purchasePrice - loanAmount;
                        break;
                    case "DownPayment":
                        this.loan.loanAmount = purchasePrice - downPayment;
                        break;
                }
                //console.log('loanAmount: ' + this.loan.property.downPayment);
                //console.log('downPayment: ' + this.loan.loanAmount);
                var downPaymentPercentage = 100.00 * (this.loan.property.downPayment / this.loan.property.purchasePrice); //this.indicators.downPaymentPercentageToFixed;
                //console.log('downPaymentPct: ' + downPaymentPercentage);
                //  var result = this.commonCalculatorSvc.recalculateDownPayment(purchasePrice, loanAmount, downPayment, downPaymentPercentage, 0, base);
                //this.loan.downPaymentAmount(result.downPayment);
                //this.loan.downPaymentValue = result.downPayment;
                //this.loan.loanAmount = result.loanAmount;
                ////this.indicators.downPaymentPercentageToFixed = result.downPaymentPercentage;
                //this.loan.getSubjectProperty().purchasePrice = result.purchasePrice;
            };
            this.downpaymentAmountUpdate = function () {
                var purchasePrice = _this.loan.property.purchasePrice;
                //console.log('downpaymentAmountUpdate');
                //console.log(purchasePrice);
                //console.log('DownPaymentAmount: ' + this.DownPaymentAmount);
                if (purchasePrice !== 0 && isNaN(_this.downPaymentValue) === false) {
                    // this.DownPaymentPercentage = 100.00 * (this.downPaymentValue / purchasePrice);
                    //this.updateDownPaymentPercentageRounded();
                    //console.log('DownPaymentPercentageRounded: ' + this.DownPaymentPercentageRounded);
                    _this.loan.loanAmount = purchasePrice - _this.downPaymentValue;
                }
                _this.updateDownPaymentInModel();
                return;
            };
            this.updateDownPaymentInModel = function () {
                _this.loan.property.downPayment = _this.downPaymentValue;
            };
            this.isAddressSameOnLoad = this.loan.loanApp.borrower.currentAddress.isSameAsPropertyAddress;
            //  this.commonCalc = commonCalculatorSvc;
            //(setting default values)
            this.stateEnabled = true;
            this.cityEnabled = true;
            this.streetEnabled = true;
            this.applicationData.lookup.subjectPropertyTypes[12].disabled = true;
            if (this.loan.loanPurposeType == 1 /* Purchase */) {
                if (this.loan.property.NeedPreApproval) {
                    this.streetPlaceHolderName = "TBD";
                    this.isStreetRequired = false;
                    this.loan.property.streetName = "TBD";
                    this.loan.loanApp.borrower.currentAddress.isSameAsPropertyAddress = false; //By default Current address is different for PreApproval condition
                }
                else {
                    this.isStreetRequired = true;
                    if (this.isAddressSameOnLoad) {
                        this.isSameAddAsPropertyNumberValue = 1;
                    }
                    else {
                        this.isSameAddAsPropertyNumberValue = 0;
                    }
                }
                if (this.loan.homeBuyingType === 0 /* None */) {
                    this.loan.homeBuyingType = 3 /* GetPreApproved */;
                }
            }
        }
        Object.defineProperty(PropertyController.prototype, "occupancyType", {
            get: function () {
                return this.loan.property.occupancyType;
            },
            set: function (occupancyType) {
                this.loan.property.occupancyType = occupancyType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "isPurchaseTypeLoan", {
            get: function () {
                return this.loan.loanPurposeType == 1 /* Purchase */;
            },
            set: function (isPurchaseTypeLoan) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "isRefinanceTypeLoan", {
            get: function () {
                return this.loan.loanPurposeType == 2 /* Refinance */;
            },
            set: function (value) {
                /*Read Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "purchasePrice", {
            get: function () {
                //return this.loan.getLoan().getSubjectProperty().currentEstimatedValue;
                return this.loan.property.purchasePrice;
            },
            set: function (val) {
                this.loan.property.purchasePrice = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "currentEstimatedValue", {
            get: function () {
                //return this.loan.getLoan().getSubjectProperty().currentEstimatedValue;
                return this.loan.property.currentEstimatedValue;
            },
            set: function (val) {
                this.loan.property.currentEstimatedValue = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "isSameAsPropertyAddressNumberType", {
            get: function () {
                return this.isSameAddAsPropertyNumberValue;
            },
            set: function (value) {
                this.isSameAddAsPropertyNumberValue = value;
                if (this.isSameAddAsPropertyNumberValue) {
                    this.loan.loanApp.borrower.currentAddress.isSameAsPropertyAddress = true;
                }
                else {
                    this.loan.loanApp.borrower.currentAddress.isSameAsPropertyAddress = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "propertyZipCode", {
            get: function () {
                return this.loan.property.zipCode;
            },
            set: function (propertyZipCode) {
                this.loan.property.zipCode = propertyZipCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "originalPurchaseDate", {
            get: function () {
                // return (this.loan.property.purchaseDate.getMonth() + 1) + '/' + this.loan.property.purchaseDate.getFullYear();
                return this.loan.property.purchaseDate;
            },
            set: function (originalPurchaseDate) {
                // var newDate = value.split('/');
                // this.loan.property.purchaseDate = new Date(parseInt(newDate[2]), parseInt(newDate[0]) - 1, parseInt(newDate[1]));
                if (originalPurchaseDate)
                    this.loan.property.purchaseDate = originalPurchaseDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "addressWidgetTemplateUrl", {
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
                var tp = '/angular/consumersite/loanapp/templates/address-widget.template.html';
                var tu = tp;
                return tu;
            },
            set: function (addressWidgetTemplateUrl) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "addressWidgetTemplateUrlLeftPropertyInfoPreApproval", {
            get: function () {
                // return this.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html';
                var tr = this.templateRoot;
                var tp = '/angular/consumersite/loanapp/templates/address-widget.template-left-property-info-preapproval.html';
                var tu = tp;
                return tu;
            },
            set: function (addressWidgetTemplateUrlLeftPropertyInfoPreApproval) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "addressWidgetTemplateUrlLeft", {
            get: function () {
                // return this.templateRoot + 'consumersite/loanapp/templates/address-widget.template-left.html';
                var tr = "";
                if (this.templateRoot.indexOf("/Angular/") != this.templateRoot.lastIndexOf("/Angular/"))
                    tr = this.templateRoot;
                else
                    tr = "/AngulaR/";
                var tp = '/angular/consumersite/loanapp/templates/address-widget.template-left.html';
                var tu = tp; //tr + 
                return tu;
            },
            set: function (addressWidgetTemplateUrlLeft) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PropertyController.prototype, "addressWidgetTemplateUrlRight", {
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
        Object.defineProperty(PropertyController.prototype, "addressWidgetTemplateUrl2", {
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
        PropertyController.prototype.onHasSameAddressChange = function () {
            if ((this.loanAppPageContext.nextLoanAppNavigationState === 268435471 /* Summary */) && (this.loan.loanApp.borrower.currentAddress.isSameAsPropertyAddress != this.isAddressSameOnLoad)) {
                this.navigationService.borrowerSameAddressChanged();
                this.showNotificationText = true;
            }
            else {
                this.showNotificationText = false;
            }
        };
        PropertyController.prototype.onOccupancyTypeChange = function () {
            if (this.isRefinanceTypeLoan) {
                if (this.loan.property.occupancyType == 1 /* PrimaryResidence */) {
                    this.isSameAsPropertyAddressNumberType = 1;
                }
                else {
                    this.isSameAsPropertyAddressNumberType = 0;
                }
            }
        };
        PropertyController.prototype.onPropertyTypeChange = function () {
            if (this.loan.property.SubjectPropertyType != "2.99") {
                this.loan.property.numberOfUnits = 1;
            }
            else {
                this.loan.property.numberOfUnits = undefined;
            }
        };
        Object.defineProperty(PropertyController.prototype, "showNotification", {
            get: function () {
                return this.showNotificationText;
            },
            enumerable: true,
            configurable: true
        });
        PropertyController.prototype.onpurchasePriceChange = function () {
            //this.loanEvent.broadcastPropertyChangedEvent(true, 2 /* PurchasePrice */, this.loan.getSubjectProperty().purchasePrice);
            if (!this.isRefinanceTypeLoan) {
                this.calculateDownPayment("PurchasePrice");
            }
        };
        PropertyController.prototype.onloanAmountChange = function () {
            // this.loan.financialInfo. .mortgageAmount = this.loan.loanAmount;
            //this.loanEvent.broadcastPropertyChangedEvent(true, 0 /* LoanAmount */, this.loan.loanAmount);
            if (!this.isRefinanceTypeLoan) {
                this.calculateDownPayment("LoanAmount");
            }
        };
        PropertyController.prototype.ondownPaymentChange = function () {
            //this.loanEvent.broadcastPropertyChangedEvent(true, 25 /* downPaymentValue */, this.loan.downPayment);
            this.calculateDownPayment("DownPayment");
        };
        PropertyController.className = "propertyController";
        //private commonCalc: CommonCalculatorSvc;
        //, 'commonCalculatorSvc'
        PropertyController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'navigationService', '$scope', '$location', 'templateRoot'];
        return PropertyController;
    })();
    consumersite.PropertyController = PropertyController;
    moduleRegistration.registerController(consumersite.moduleName, PropertyController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=property.controller.js.map