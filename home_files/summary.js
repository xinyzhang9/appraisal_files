var consumersite;
(function (consumersite) {
    var SummaryController = (function () {
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function SummaryController(loan, loanAppPageContext, applicationData, navigationService, $location1, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.navigationService = navigationService;
            this.$location1 = $location1;
            this.templateRoot = templateRoot;
            this.currencyFormatting = function (value) { return value.toString() + " $"; };
            this.canEdit = true;
            this.hideNavigation = false;
            this._race = '';
            this._CoRace = '';
            this.assets = function () {
                _this.assetActives = _this.loan.loanApp.assets;
                lib.forEach(_this.assetActives, function (assetType) {
                    _this.assetActives = lib.filter(_this.assetActives, function (c) { return (c.ownerType != 2 /* CoBorrower */ || (c.ownerType == 2 /* CoBorrower */ && _this.hasCoBorrower())); });
                });
                return _this.assetActives;
            };
            this.otherIncomes = function () {
                _this.otherIncomeActives = _this.loan.loanApp.otherIncomes;
                lib.forEach(_this.otherIncomeActives, function (assetType) {
                    _this.otherIncomeActives = lib.filter(_this.otherIncomeActives, function (c) { return (c.ownerType != 2 /* CoBorrower */ || (c.ownerType == 2 /* CoBorrower */ && _this.hasCoBorrower())); });
                });
                return _this.otherIncomeActives;
            };
            this.getBorrowerLink = function () {
                return _this.navigationService.getBorrowerLink(268435471 /* Summary */);
            };
            this.getCoBorrowerLink = function () {
                return _this.navigationService.getCoBorrowerLink(268435471 /* Summary */);
            };
            this.getBorrowerAddressLink = function () {
                return _this.navigationService.getBorrowerAddressLink(268435471 /* Summary */);
            };
            this.getCoBorrowerAddressLink = function () {
                return _this.navigationService.getCoBorrowerAddressLink(268435471 /* Summary */);
            };
            this.getPropertyLink = function () {
                return _this.navigationService.getPropertyLink(268435471 /* Summary */);
            };
            this.getBorrowerEmploymentLink = function () {
                return _this.navigationService.getBorrowerEmploymentLink(268435471 /* Summary */);
            };
            this.getCoBorrowerEmploymentLink = function () {
                return _this.navigationService.getCoBorrowerEmploymentLink(268435471 /* Summary */);
            };
            this.getBorrowerGovermentMonitoringLink = function () {
                return _this.navigationService.getBorrowerGovermentMonitoringLink(268435471 /* Summary */);
            };
            this.getCoBorrowerGovermentMonitoringLink = function () {
                return _this.navigationService.getCoBorrowerGovermentMonitoringLink(268435471 /* Summary */);
            };
            this.getOtherIncomeLink = function () {
                return _this.navigationService.getOtherIncomeLink(268435471 /* Summary */);
            };
            this.getAssetsLink = function () {
                return _this.navigationService.getAssetsLink(268435471 /* Summary */);
            };
            this.getDeclarationsLink = function () {
                return _this.navigationService.getDeclarationsLink(268435471 /* Summary */);
            };
            this.getOwnerTypeLookups = function () {
                return _this.ownerTypeLookup;
            };
            this.populateOwnerTypeLookup = function () {
                _this.ownerTypeLookup = [];
                _this.ownerTypeLookup.push({ value: 1 /* Borrower */, text: _this.loan.loanApp.borrower.fullName });
                if (_this.loan.loanApp.hasCoBorrower) {
                    _this.ownerTypeLookup.push({ value: 2 /* CoBorrower */, text: _this.loan.loanApp.coBorrower.fullName });
                }
                _this.ownerTypeLookup.push({ value: 3 /* Joint */, text: "Joint" });
            };
            this.formatPhone = function (phoneNumber) {
                if (phoneNumber === undefined || phoneNumber === null) {
                    return '';
                }
                var numbers = phoneNumber.replace(/\D/g, ''), char = { 0: '(', 3: ') ', 6: '-' };
                phoneNumber = '';
                for (var i = 0; i < numbers.length; i++) {
                    phoneNumber += (char[i] || '') + numbers[i];
                }
                return phoneNumber;
            };
            this.hasCoBorrower = function () {
                return _this.loan.loanApp.hasCoBorrower;
            };
            this.showCoBorrower = function () {
                if (_this.loan.loanApp.hasCoBorrower && _this.loan.loanApp.coBorrower.fullName != 'New Application')
                    return true;
                return false;
                //summaryCntrl.hasCoBorrower() && summaryCntrl.loan.loanApp.coBorrower.fullName != 'New Application'"
            };
            this.showYesNo = function (val) {
                //Interpreting the Radio button Yes/No to match with that of Conceirge site
                //if (val) {
                //    return "Yes";
                //}
                //else {
                //    return "No";
                //}
                if (val) {
                    return "No";
                }
                else {
                    return "Yes";
                }
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
            this.isBorrower = !this.loanAppPageContext.isCoBorrowerState;
            this.canEdit = loanAppPageContext.loanAppNavigationState == 268435471 /* Summary */;
            this.hideNavigation = loanAppPageContext.loanAppNavigationState != 268435471 /* Summary */;
            this.populateHowDidYouHearAboutUsList();
            this.populateOwnerTypeLookup();
            this.assets();
            this.otherIncomes();
            this.employmentActives = [];
            for (var i = 0; i < this.loan.loanApp.borrower.employments.length; i++) {
                this.employmentActives.push(this.loan.loanApp.borrower.employments[i]);
            }
            this.coemploymentActives = [];
            for (var i = 0; i < this.loan.loanApp.coBorrower.employments.length; i++) {
                this.coemploymentActives.push(this.loan.loanApp.coBorrower.employments[i]);
            }
            this.declarations = this.loan.loanApp.borrower.declarations;
            this.codeclarations = this.loan.loanApp.coBorrower.declarations;
        }
        Object.defineProperty(SummaryController.prototype, "referralSource", {
            get: function () {
                return this.loan.loanApp.howDidYouHearAboutUs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummaryController.prototype, "borrowerFullAddressCurrent", {
            get: function () {
                var fullAddress;
                if (this.loan.loanApp.borrower.currentAddress.isSameAsPropertyAddress) {
                    fullAddress = this.loan.property.fullAddress;
                }
                else {
                    fullAddress = this.loan.loanApp.borrower.currentAddress.fullAddress;
                }
                return fullAddress;
            },
            set: function (borrowerFullAddressCurrent) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummaryController.prototype, "coBorrowerPreferredPhone", {
            get: function () {
                var preferredPhone = this.formatPhone(this.loan.loanApp.coBorrower.preferredPhone);
                return preferredPhone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummaryController.prototype, "borrowerPreferredPhone", {
            get: function () {
                var preferredPhone = this.formatPhone(this.loan.loanApp.borrower.preferredPhone);
                return preferredPhone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummaryController.prototype, "borrowerRace", {
            //Seperate multiple race selection for borrower with ', ' and display in summary page
            get: function () {
                this._race = '';
                for (var i = 0; i < this.applicationData.lookup.races.length; i++) {
                    switch (this.applicationData.lookup.races[i].value) {
                        case "0":
                            this._race = this.declarations.race.iDoNotWishToFurnishThisInformation == true ? (this._race = this._race.length > 0 ? this._race + ', ' : this._race) + this.applicationData.lookup.races[i].text : this._race + '';
                            break;
                        case "1":
                            this._race = this.declarations.race.americanIndianOrAlaskaNative == true ? (this._race = this._race.length > 0 ? this._race + ', ' : this._race) + this.applicationData.lookup.races[i].text : this._race + '';
                            break;
                        case "2":
                            this._race = this.declarations.race.asian == true ? (this._race = this._race.length > 0 ? this._race + ', ' : this._race) + this.applicationData.lookup.races[i].text : this._race + '';
                            break;
                        case "3":
                            this._race = this.declarations.race.blackOrAfricanAmerican == true ? (this._race = this._race.length > 0 ? this._race + ', ' : this._race) + this.applicationData.lookup.races[i].text : this._race + '';
                            break;
                        case "4":
                            this._race = this.declarations.race.nativeHawaiianOrOtherPacificIslander == true ? (this._race = this._race.length > 0 ? this._race + ', ' : this._race) + this.applicationData.lookup.races[i].text : this._race + '';
                            break;
                        case "5":
                            this._race = this.declarations.race.white == true ? (this._race = this._race.length > 0 ? this._race + ', ' : this._race) + this.applicationData.lookup.races[i].text : this._race + '';
                            break;
                        case "6":
                            this._race = this.declarations.race.notApplicable == true ? (this._race = this._race.length > 0 ? this._race + ', ' : this._race) + this.applicationData.lookup.races[i].text : this._race + '';
                            break;
                        default:
                            break;
                    }
                }
                return this._race;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SummaryController.prototype, "coBorrowerRace", {
            //Seperate multiple race selection for Coborrower with ', ' and display in summary page
            get: function () {
                this._CoRace = '';
                for (var i = 0; i < this.applicationData.lookup.races.length; i++) {
                    switch (this.applicationData.lookup.races[i].value) {
                        case "0":
                            this._CoRace = this.codeclarations.race.iDoNotWishToFurnishThisInformation == true ? (this._CoRace = this._CoRace.length > 0 ? this._CoRace + ', ' : this._CoRace) + this.applicationData.lookup.races[i].text : this._CoRace + '';
                            break;
                        case "1":
                            this._CoRace = this.codeclarations.race.americanIndianOrAlaskaNative == true ? (this._CoRace = this._CoRace.length > 0 ? this._CoRace + ', ' : this._CoRace) + this.applicationData.lookup.races[i].text : this._CoRace + '';
                            break;
                        case "2":
                            this._CoRace = this.codeclarations.race.asian == true ? (this._CoRace = this._CoRace.length > 0 ? this._CoRace + ', ' : this._CoRace) + this.applicationData.lookup.races[i].text : this._CoRace + '';
                            break;
                        case "3":
                            this._CoRace = this.codeclarations.race.blackOrAfricanAmerican == true ? (this._CoRace = this._CoRace.length > 0 ? this._CoRace + ', ' : this._CoRace) + this.applicationData.lookup.races[i].text : this._CoRace + '';
                            break;
                        case "4":
                            this._CoRace = this.codeclarations.race.nativeHawaiianOrOtherPacificIslander == true ? (this._CoRace = this._CoRace.length > 0 ? this._CoRace + ', ' : this._CoRace) + this.applicationData.lookup.races[i].text : this._CoRace + '';
                            break;
                        case "5":
                            this._CoRace = this.codeclarations.race.white == true ? (this._CoRace = this._CoRace.length > 0 ? this._CoRace + ', ' : this._CoRace) + this.applicationData.lookup.races[i].text : this._CoRace + '';
                            break;
                        case "6":
                            this._CoRace = this.codeclarations.race.notApplicable == true ? (this._CoRace = this._CoRace.length > 0 ? this._CoRace + ', ' : this._CoRace) + this.applicationData.lookup.races[i].text : this._CoRace + '';
                            break;
                        default:
                            break;
                    }
                }
                return this._CoRace;
            },
            enumerable: true,
            configurable: true
        });
        SummaryController.className = "summaryController";
        SummaryController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'navigationService', '$location', 'templateRoot'];
        return SummaryController;
    })();
    consumersite.SummaryController = SummaryController;
    moduleRegistration.registerController(consumersite.moduleName, SummaryController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=summary.controller.js.map