/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var AppraisalController = (function () {
        function AppraisalController(loan, loanAppPageContext, applicationData, $state, httpUtil, templateRoot, navigationService, AppraisalService, apiServiceAccountId, httpUIBlockService, leadSourceService, authenticationService) {
            //console.log('appraisal controller start');
            //console.log(this.loan.appraisalOrders);
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.$state = $state;
            this.httpUtil = httpUtil;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.AppraisalService = AppraisalService;
            this.apiServiceAccountId = apiServiceAccountId;
            this.httpUIBlockService = httpUIBlockService;
            this.leadSourceService = leadSourceService;
            this.authenticationService = authenticationService;
            this.addressWidgetTemplateUrl = null;
            this._newContactId = null;
            this._newPreferredPhoneId = null;
            this.setTestFields = function (appraisalOrders) {
                //appraisalOrders.appraisalProducts = [{
                //    name: "1004 - Single Family Residence (conventional)",
                //    value: "1004UniformResidentialAppraisal",
                //    shortName: "",
                //    message: "",
                //    messageStatus: "",
                //    fee: {
                //        "amount": 450.0,
                //        "comment": "",
                //        "message": "",
                //        "messageStatus": ""
                //    }
                //}];
                appraisalOrders.billingInformation.creditCardType = 0;
                appraisalOrders.billingInformation.creditCardNumber = '4124667270844920';
                appraisalOrders.billingInformation.ccv = '555';
                appraisalOrders.billingInformation.expirationMonth = 2;
                appraisalOrders.billingInformation.expirationYear = 2016;
                appraisalOrders.billingInformation.nameOnCard = 'Beatrice A. Bellomy';
            };
            this.setAddressFields = function (srcAddress, destAddress) {
                if (srcAddress == null || destAddress == null) {
                    console.log('[setAddressFields()] srcAddress: ' + srcAddress + ' or destAddress: ' + destAddress + ' is null.');
                    return;
                }
                destAddress.streetName = srcAddress.streetName;
                destAddress.cityName = srcAddress.cityName;
                destAddress.stateName = srcAddress.stateName;
                var states = _this.states;
                for (var i = 0; i < states.length; i++) {
                    if (states[i].text === destAddress.stateName) {
                        destAddress.stateId = states[i].value;
                        break;
                    }
                }
                destAddress.zipCode = srcAddress.zipCode;
                destAddress.countyName = srcAddress.countyName;
            };
            this.clearAddressFields = function (destAddress) {
                destAddress.streetName = null;
                destAddress.cityName = null;
                destAddress.stateName = null;
                destAddress.stateId = null;
                destAddress.zipCode = null;
            };
            //expirationMonth
            this._expirationMonthOptions = [
                { text: '01 - Jan', value: 1 },
                { text: '02 - Feb', value: 2 },
                { text: '03 - Mar', value: 3 },
                { text: '04 - Apr', value: 4 },
                { text: '05 - May', value: 5 },
                { text: '06 - Jun', value: 6 },
                { text: '07 - Jul', value: 7 },
                { text: '08 - Aug', value: 8 },
                { text: '09 - Sep', value: 9 },
                { text: '10 - Oct', value: 10 },
                { text: '11 - Nov', value: 11 },
                { text: '12 - Dec', value: 12 },
            ];
            //preferredContactTypes
            this._preferredContactTypes = [
                { text: 'Borrower', value: -2 },
                { text: 'Buyer Agent', value: 5 },
                { text: 'Property Manager', value: 6 },
                { text: 'Seller Agent', value: 4 },
                { text: 'Others', value: 7 }
            ];
            this._preferredContactTypes2 = [
                { text: 'Borrower', value: -2 },
                { text: 'Buyer Agent', value: 5 },
                { text: 'Co-Borrower', value: -3 },
                { text: 'Property Manager', value: 6 },
                { text: 'Seller Agent', value: 4 },
                { text: 'Others', value: 7 }
            ];
            //contactType
            this.isBorrowerContact = false;
            //Validation
            this.appraisalFormValid = function () {
                //Credit Card Validation - all fields required
                //Credit Card Type
                var creditCardType = _this.creditCardType;
                if (creditCardType == null || creditCardType < 0) {
                    return false;
                }
                //Credit Card Number
                var creditCardNumber = _this.creditCardNumber;
                if (creditCardNumber == null || !_this.validateCreditCardNumber(creditCardNumber)) {
                    return false;
                }
                //Credit Card Verification Code
                var ccv = _this.ccv;
                if (ccv == null || ccv.length < 3) {
                    return false;
                }
                //Expiration Month
                var expirationMonth = _this.expirationMonth;
                if (expirationMonth == null) {
                    return false;
                }
                //Expiration Year
                var expirationYear = _this.expirationYear;
                if (expirationYear == null) {
                    return false;
                }
                //Name on Card
                var nameOnCard = _this.nameOnCard;
                if (nameOnCard == null || nameOnCard.length <= 0) {
                    return false;
                }
                //Billing Address Validation - all fields required
                //Billing Street
                var streetName = _this.streetName;
                if (streetName == null || streetName.length <= 0) {
                    return false;
                }
                //Billing City
                var cityName = _this.cityName;
                if (cityName == null || cityName.length <= 0) {
                    return false;
                }
                //Billing State
                //var stateId = this.stateId;
                //if (stateId == null || stateId <= 0) {
                //    return false;
                //}
                var stateName = _this.stateName;
                if (stateName == null || stateName.length == 0) {
                    return false;
                }
                //Billing Zip
                var zipCode = _this.zipCode;
                if (zipCode == null || zipCode.length < 5) {
                    return false;
                }
                //Contact Validation - all fields required except email and preferredPhoneType
                //Contact Type
                var contactType = _this.contactType;
                if (contactType == null) {
                    return false;
                }
                //First Name
                var firstName = _this.firstName;
                if (firstName == null || firstName.length <= 0) {
                    return false;
                }
                //Last Name
                var lastName = _this.lastName;
                if (lastName == null || lastName.length <= 0) {
                    return false;
                }
                //Preferred Phone Number
                var preferredPhoneNumber = _this.preferredPhoneNumber;
                if (preferredPhoneNumber == null || preferredPhoneNumber.length < 10) {
                    return false;
                }
                return true;
            };
            this.validateCreditCardNumber = function (ccNumber) {
                if (ccNumber == null || ccNumber.length !== 16)
                    return false;
                var ccNumberLength = ccNumber.length, mul = 0, prodArr = [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
                ], sum = 0;
                while (ccNumberLength--) {
                    sum += prodArr[mul][parseInt(ccNumber.charAt(ccNumberLength), 10)];
                    mul ^= 1;
                }
                return sum % 10 === 0 && sum > 0;
            };
            //Place Order Button Click
            this.showRequiredForms = false;
            this.placeOrder = function () {
                if (_this.appraisalFormValid() === false) {
                    console.log('appraisal validation failed');
                    _this.showRequiredForms = true;
                    return false;
                }
                //Call code to save and move to next step
                //var serviceEvent = this.httpUIBlockService.getServiceEventMethod('Saving Loan...');
                //serviceEvent(util.ServiceEventStatus.beforeCall);
                _this.navigationService.saveLoan(function (data) {
                    //serviceEvent(util.ServiceEventStatus.afterCall);
                    var request = {};
                    request.loanId = _this.loan.loanId;
                    request.loanNumber = _this.loan.loanNumber;
                    request.userAccountId = _this.authenticationService.getLoggedInUserId();
                    request.isBorrowerOrdered = true;
                    _this.httpUtil.get('AppraisalService/SubmitAppraisalOrder', request, '', null, null, function () {
                        //Optimistic update
                        _this.loan.appraisalOrders[0].orderAppraisals[0].orderStatus = 1 /* SentToHVM */;
                    });
                });
                //Save in the background
                _this.navigationService.navigateToMyNextStep();
            };
            //Skip Button Click
            this.skip_click = function () {
                _this.navigationService.navigateToMyNextStep();
            };
            var doSetContactType = false;
            //Contructor Code
            var data = this.loan.appraisalOrders;
            if (data == null || data.length == 0) {
                data = [new srv.cls.OrderViewModel()];
                data[0].orderID = util.IdentityGenerator.nextGuid();
            }
            if (data[0].orderAppraisals == null || data[0].orderAppraisals.length == 0) {
                data[0].orderAppraisals = [new srv.cls.AppraisalOrderViewModel()];
                data[0].orderAppraisals[0].orderAppraisalId = util.IdentityGenerator.nextGuid();
            }
            if (data[0].orderAppraisals[0].paymentMethod == null) {
                data[0].orderAppraisals[0].paymentMethod = 1 /* CreditCard */; //Every payment through this site is credit card.  If this is not set billingInformation won't save!
            }
            if (data[0].orderAppraisals[0].appraisalProducts == null) {
                //Get the products from the service if they are empty
                var request = new srv.cls.AppraisalProductsAndFeesRequest();
                request.county = this.loan.getSubjectProperty().countyName;
                request.mortgageType = this.loan.financialInfo.mortgageType;
                request.numberOfUnits = this.loan.getSubjectProperty().numberOfUnits;
                request.propertyType = Number(this.loan.getSubjectProperty().propertyType);
                request.propertyUsageType = this.loan.getSubjectProperty().occupancyType;
                request.propertyValue = this.loan.getSubjectProperty().currentEstimatedValue;
                request.state = this.loan.getSubjectProperty().stateName;
                this.httpUtil.post('AppraisalService/GetAppraisalProductsAndFees', request, '', null, null, function (data2) {
                    var products = data2.data.response;
                    if (products != null) {
                        for (var i = 0; i < products.length; i++) {
                            products[i].orderAppraisalProductsFeesId = util.IdentityGenerator.nextGuid();
                        }
                        data[0].orderAppraisals[0].appraisalProducts = products;
                    }
                    else {
                        data[0].orderAppraisals[0].appraisalProducts = [new srv.cls.AppraisalOrderProductViewModel()];
                    }
                });
            }
            if (data[0].orderAppraisals[0].billingInformation == null) {
                data[0].orderAppraisals[0].billingInformation = new srv.cls.BillingInformationViewModel();
                data[0].orderAppraisals[0].billingInformation.billingInformationId = util.IdentityGenerator.nextGuid();
                if (this.loan.loanPurposeType === 2 /* Refinance */) {
                    data[0].orderAppraisals[0].billingInformation.billingAddressSameAsPropertyAddress = true;
                }
                else {
                    data[0].orderAppraisals[0].billingInformation.billingAddressSameAsPropertyAddress = false;
                }
            }
            if (data[0].orderAppraisals[0].billingInformation.billingAddress == null) {
                data[0].orderAppraisals[0].billingInformation.billingAddress = new srv.cls.PropertyViewModel();
                data[0].orderAppraisals[0].billingInformation.billingAddress.propertyId = util.IdentityGenerator.nextGuid();
                if (this.loan.loanPurposeType === 2 /* Refinance */) {
                    var billingAddress = data[0].orderAppraisals[0].billingInformation.billingAddress;
                    var currentAddress = this.loan.loanApp.borrower.currentAddress;
                    this.setAddressFields(currentAddress, billingAddress);
                }
            }
            if (data[0].orderAppraisals[0].appraisalContact == null) {
                data[0].orderAppraisals[0].appraisalContact = new srv.cls.AppraisalOrderContactViewModel();
                doSetContactType = true;
                if (this.loan.loanPurposeType === 2 /* Refinance */) {
                    data[0].orderAppraisals[0].appraisalContact.contactType = -2 /* Borrower */;
                }
                else {
                    data[0].orderAppraisals[0].appraisalContact.contactType = 5 /* BuyerAgent */;
                }
            }
            if (data[0].orderAppraisals[0].appraisalContact.preferredPhone == null) {
                data[0].orderAppraisals[0].appraisalContact.preferredPhone = new srv.cls.PhoneViewModel();
                data[0].orderAppraisals[0].appraisalContact.preferredPhone.phoneId = this.newPreferredPhoneId;
            }
            //this.setTestFields(data[0].orderAppraisals[0]);
            this.loan.appraisalOrders = data;
            if (doSetContactType) {
                var contactType = this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.contactType;
                this.setContactTypeFields(contactType);
            }
            this.setIsBorrowerContact(contactType);
            //console.log('appraisal controller end');
            //console.log(this.loan.appraisalOrders);
            if (this.addressWidgetTemplateUrl == null) {
                this.addressWidgetTemplateUrl = '../../angular/consumersite/loanapp/templates/address-widget.template-appraisal.html';
            }
        }
        Object.defineProperty(AppraisalController.prototype, "leadSourcePhoneNumber", {
            get: function () {
                return this.leadSourceService.getLeadSourcePhoneNumber();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "newContactId", {
            get: function () {
                if (this._newContactId == null) {
                    this._newContactId = util.IdentityGenerator.nextGuid();
                }
                return this._newContactId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "newPreferredPhoneId", {
            get: function () {
                if (this._newPreferredPhoneId == null) {
                    this._newPreferredPhoneId = util.IdentityGenerator.nextGuid();
                }
                return this._newPreferredPhoneId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "appraisalOrder", {
            //appraisalProducts
            get: function () {
                return this.loan.appraisalOrders[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "appraisalProducts", {
            //appraisalProducts
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalProducts;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "totalProductAmount", {
            //totalProductAmount
            get: function () {
                var totalAmount = 0;
                var appraisalProducts = this.appraisalProducts;
                if (appraisalProducts && appraisalProducts.length > 0) {
                    for (var i = 0; i < appraisalProducts.length; i++) {
                        if (appraisalProducts[i].fee && appraisalProducts[i].fee.amount) {
                            totalAmount += appraisalProducts[i].fee.amount;
                        }
                    }
                }
                return totalAmount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "billingInformation", {
            //billingInformation - for testing only
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "creditCardTypeOptions", {
            get: function () {
                return this.applicationData.lookup.appraisalCardTypes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "creditCardType", {
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.creditCardType;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.creditCardType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "creditCardNumber", {
            //creditCardNumber
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.creditCardNumber;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.creditCardNumber = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "ccv", {
            //ccv
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.ccv;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.ccv = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "expirationMonthOptions", {
            get: function () {
                return this._expirationMonthOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "expirationMonth", {
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.expirationMonth;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.expirationMonth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "expirationYearOptions", {
            //expirationYearOptions
            get: function () {
                var expirationYearOptions = [];
                var currentYear = new Date().getFullYear();
                for (var i = 0; i <= 10; i++) {
                    expirationYearOptions.push(currentYear + i);
                }
                return expirationYearOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "expirationYear", {
            //expirationYear
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.expirationYear;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.expirationYear = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "nameOnCard", {
            //nameOnCard
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.nameOnCard;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.nameOnCard = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "billingAddressSameAsPropertyAddress", {
            //billingAddressSameAsPropertyAddress
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    if (this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.billingAddressSameAsPropertyAddress) {
                        return true;
                    }
                }
                return false;
            },
            set: function (value) {
                this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.billingAddressSameAsPropertyAddress = value;
            },
            enumerable: true,
            configurable: true
        });
        AppraisalController.prototype.billingAddressSameChanged = function () {
            var billingAddressSame = this.billingAddressSameAsPropertyAddress;
            var billingAddress = this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.billingAddress;
            if (billingAddressSame === true) {
                var currentAddress = this.loan.loanApp.borrower.currentAddress;
                this.setAddressFields(currentAddress, billingAddress);
            }
            else {
                this.clearAddressFields(billingAddress);
            }
        };
        Object.defineProperty(AppraisalController.prototype, "billingAddress", {
            //billingAddress
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].billingInformation.billingAddress;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "streetName", {
            //streetName
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.billingAddress.streetName;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.billingAddress.streetName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "cityName", {
            //cityName
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.billingAddress.cityName;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.billingAddress.cityName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "states", {
            //states
            get: function () {
                return this.applicationData.lookup.allStates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "stateName", {
            //get stateId(): number {
            //    if (this.loan.appraisalOrders.length > 0) {
            //        return this.billingAddress.stateId;
            //    } else {
            //        return null;
            //    }
            //}
            //set stateId(value: number) {
            //    this.billingAddress.stateId = value;
            //}
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.billingAddress.stateName;
                }
                else {
                    return null;
                }
            },
            set: function (val) {
                this.billingAddress.stateName = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "zipCode", {
            //stateIdChanged() {
            //    var stateId = this.stateId;
            //    var stateName = null;
            //    if (stateId != null) {
            //        var states = this.states;
            //        for (var i = 0; i < states.length; i++) {
            //            if (states[i].value == stateId) {
            //                stateName = states[i].text;
            //                break;
            //            }
            //        }
            //    }
            //    this.billingAddress.stateName = stateName;
            //}
            //zipCode
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.billingAddress.zipCode;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.billingAddress.zipCode = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "appraisalContact", {
            //appraisalContact - for testing only
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "preferredContactTypes", {
            get: function () {
                if (this.loan.loanApp.hasCoBorrower)
                    return this._preferredContactTypes2;
                else
                    return this._preferredContactTypes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "contactType", {
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.contactType;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.contactType = value;
            },
            enumerable: true,
            configurable: true
        });
        AppraisalController.prototype.contactTypeChanged = function () {
            if (this.loan.appraisalOrders.length > 0) {
                var contactType = this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.contactType;
                this.setContactTypeFields(contactType);
                this.setIsBorrowerContact(contactType);
            }
        };
        AppraisalController.prototype.setContactTypeFields = function (contactType) {
            if (contactType == -2 /* Borrower */ || contactType == -3 /* CoBorrower */) {
                var borrower;
                if (contactType == -2 /* Borrower */)
                    borrower = this.loan.loanApp.borrower;
                else
                    borrower = this.loan.loanApp.coBorrower;
                this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.contactId = borrower.borrowerId;
                this.firstName = borrower.firstName;
                this.lastName = borrower.lastName;
                if (borrower.userAccount != null) {
                    this.email = borrower.userAccount.username;
                }
                this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.preferredPhone.phoneId = borrower.preferredPhoneId; //Right now the borrower.preferredPhoneId isn't set in MegaLoad logic.
                this.preferredPhoneNumber = borrower.preferredPhone;
                this.phoneType = borrower.preferredPhoneType;
            }
            else {
                this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.contactId = this.newContactId;
                this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.preferredPhone.phoneId = this.newPreferredPhoneId;
                this.firstName = null;
                this.lastName = null;
                this.email = null;
                this.preferredPhoneNumber = null;
                this.phoneType = null;
            }
        };
        AppraisalController.prototype.setIsBorrowerContact = function (contactType) {
            if (contactType == -2 /* Borrower */ || contactType == -3 /* CoBorrower */) {
                this.isBorrowerContact = true;
            }
            else {
                this.isBorrowerContact = false;
            }
        };
        Object.defineProperty(AppraisalController.prototype, "firstName", {
            //firstName
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.firstName;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.firstName = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "lastName", {
            //lastName
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.lastName;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.lastName = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "email", {
            //email
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.email;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.email = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "preferredPhoneNumber", {
            //preferredPhoneNumber
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.preferredPhone.number;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.preferredPhone.number = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "phoneType", {
            //phoneType
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.preferredPhone.type;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.loan.appraisalOrders[0].orderAppraisals[0].appraisalContact.preferredPhone.type = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalController.prototype, "specialInstructions", {
            //specialInstructions
            get: function () {
                if (this.loan.appraisalOrders.length > 0) {
                    return this.loan.appraisalOrders[0].orderAppraisals[0].specialInstructions;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                if (this.loan.appraisalOrders.length > 0) {
                    this.loan.appraisalOrders[0].orderAppraisals[0].specialInstructions = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        AppraisalController.className = "appraisalController";
        AppraisalController.$inject = ['loan', 'loanAppPageContext', 'applicationData', '$state', 'httpUtil', 'templateRoot', 'navigationService', 'AppraisalService', 'apiServiceAccountId', 'HttpUIBlockService', 'leadSourceService', 'authenticationService'];
        return AppraisalController;
    })();
    consumersite.AppraisalController = AppraisalController;
    moduleRegistration.registerController(consumersite.moduleName, AppraisalController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=appraisal.controller.js.map