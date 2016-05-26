var consumersite;
(function (consumersite) {
    var LoanAppPageController = (function () {
        function LoanAppPageController(loan, navigationService, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            this.shouldShow = function () {
                return _this.navigationService.isOnSummaryPage();
            };
            this.populateAllData = function () {
                _this.populatePersonalData();
                _this.populateCoBorrowerData();
                _this.populateEmployment();
                _this.populatePropertyInfo();
                _this.populateAddress();
                _this.populateAssets();
                _this.populateGovtMonitoring();
                _this.populateOtherIncome();
            };
            this.addOtherIncome = function () {
                _this.otherIncomeActive = _this.loan.loanApp.addOtherIncome();
            };
            this.addcoOtherIncome = function () {
                _this.cootherIncomeActive = _this.loan.loanApp.addOtherIncome();
            };
            this.addcoEmployment = function () {
                _this.coemploymentActive = _this.loan.loanApp.coBorrower.employments[_this.loan.loanApp.coBorrower.addEmployment(false, false) - 2];
            };
            this.addEmployment = function () {
                _this.addEmploymentImpl(false, false);
            };
            this.addEmploymentImpl = function (isPrevious, isAdditional) {
                var edx = _this.loan.loanApp.borrower.addEmployment(isPrevious, isAdditional);
                _this.employmentActive = _this.loan.loanApp.borrower.employments[edx - 2];
            };
            this.addAsset = function () {
                _this.assetActive = _this.loan.loanApp.assets[_this.loan.loanApp.addAsset() - 1];
            };
            this.populateOtherIncome = function () {
                // this.loan.loanApp.otherIncomes.
                //Other Income array is empty, add one for the user to begin the page.
                if (_this.loan.loanApp.otherIncomes.length == 0) {
                    _this.addOtherIncome();
                }
                else {
                    _this.otherIncomeActive = _this.loan.loanApp.otherIncomes[_this.loan.loanApp.otherIncomes.length - 1];
                }
                _this.addcoOtherIncome();
                // this.cootherIncomeActive = this.loan.loanApp.otherIncomes[this.loan.loanApp.otherIncomes.length - 1];
                _this.otherIncomeActive.incomeType = 10;
                _this.otherIncomeActive.incomeValue = 57000;
                _this.cootherIncomeActive.incomeType = 16;
                _this.cootherIncomeActive.incomeValue = 25000;
                // this.populateOwnerTypeLookup();
            };
            this.populateGovtMonitoring = function () {
                _this.loan.loanApp.borrower.declarations.ethnicityId = 1;
                _this.loan.loanApp.borrower.declarations.race = _this.setRaceType(2, true);
                _this.loan.loanApp.borrower.declarations.sexId = 1;
                _this.loan.loanApp.borrower.declarations.alimonyChildSupportObligation = 1;
                _this.loan.loanApp.borrower.declarations.bankrupcyIndicator = 1;
                _this.loan.loanApp.borrower.declarations.downPaymentIndicator = 1;
                _this.loan.loanApp.borrower.declarations.noteEndorserIndicator = 1;
                _this.loan.loanApp.borrower.declarations.obligatedLoanIndicator = 1;
                _this.loan.loanApp.borrower.declarations.outstandingJudgmentsIndicator = 1;
                _this.loan.loanApp.borrower.declarations.ownershipInterestLastThreeYears = 1;
                _this.loan.loanApp.borrower.declarations.partyToLawsuitIndicator = 1;
                _this.loan.loanApp.borrower.declarations.permanentResidentAlienIndicator = 1;
                _this.loan.loanApp.borrower.declarations.presentlyDelinquentIndicator = 1;
                _this.loan.loanApp.borrower.declarations.propertyAsPrimaryResidence = 0;
                _this.loan.loanApp.borrower.declarations.propertyForeclosedIndicator = 1;
                _this.loan.loanApp.borrower.declarations.usCitizenIndicator = 0;
                _this.loan.loanApp.coBorrower.declarations.ethnicityId = 0;
                _this.loan.loanApp.coBorrower.declarations.race = _this.setRaceType(3, true);
                _this.loan.loanApp.coBorrower.declarations.sexId = 1;
                _this.loan.loanApp.coBorrower.declarations.alimonyChildSupportObligation = 1;
                _this.loan.loanApp.coBorrower.declarations.bankrupcyIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.downPaymentIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.noteEndorserIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.obligatedLoanIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.outstandingJudgmentsIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.ownershipInterestLastThreeYears = 1;
                _this.loan.loanApp.coBorrower.declarations.partyToLawsuitIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.permanentResidentAlienIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.presentlyDelinquentIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.propertyAsPrimaryResidence = 0;
                _this.loan.loanApp.coBorrower.declarations.propertyForeclosedIndicator = 1;
                _this.loan.loanApp.coBorrower.declarations.usCitizenIndicator = 0;
            };
            this.populateCoBorrowerData = function () {
                _this.loan.loanApp.coBorrower.firstName = "GREGORY";
                _this.loan.loanApp.coBorrower.lastName = "BAILEY";
                _this.loan.loanApp.coBorrower.middleName = "";
                _this.loan.loanApp.coBorrower.maritalStatus = 0 /* Married */;
                _this.loan.loanApp.coBorrower.preferredPhone = "256-555-5556";
                _this.loan.loanApp.coBorrower.preferredPhoneType = '1'; //srv.PhoneNumberType.Cell;
                _this.loan.loanApp.coBorrower.ssn = "666387494";
            };
            this.populatePropertyInfo = function () {
                _this.loan.property.streetName = "1313 Mockingbird Lane";
                _this.loan.property.cityName = "Redmond";
                _this.loan.property.stateName = "NY";
                _this.loan.property.zipCode = "11745";
                _this.loan.property.propertyType = 1;
                _this.loan.property.occupancyType = 2;
                _this.loan.property.currentEstimatedValue = 500000;
                _this.loan.property.purchasePrice = 500000;
                _this.loan.loanPurposeType = 2;
                var pDate = new Date("2009-12-15");
                _this.loan.property.purchaseDate = pDate;
                _this.loan.property.isCurrentAddressSame = false;
                _this.loan.property.numberOfUnits = 1;
                _this.loan.property.monthlyHOADues = 24;
            };
            this.populateEmployment = function () {
                _this.addEmployment();
                // this.employmentActive = new vm.Employment(new cls.EmploymentInfoViewModel()) ;
                var startingDate = new Date("2011-12-10");
                var endingDate = new Date("2015-12-10");
                _this.employmentActive.startingDate = startingDate;
                _this.employmentActive.endingDate = endingDate;
                _this.employmentActive.yearsInTheSameField = endingDate.getFullYear() - startingDate.getFullYear();
                _this.employmentActive.companyName = "Sears";
                _this.employmentActive.employmentType = 1 /* SalariedEmployee */;
                _this.employmentActive.businessPhone = "455-643-8765";
                _this.employmentActive.companyStreet = "101 Empire Avenue";
                _this.employmentActive.companyCity = "Redmond";
                _this.employmentActive.companyState = "WA";
                _this.employmentActive.companyZip = "94521";
                _this.employmentActive.baseSalary = 12000;
                _this.employmentActive.positionDescription = "President";
                _this.employmentActive.typeOfBusiness = "Software";
                //this.coemploymentType = srv.EmploymentTypeEnum.SalariedEmployee;
                //if (this.loan.loanApp.coBorrower.employments.length == 0) {
                //    this.addcoEmployment();
                //}
                //else { // select the last one
                //    this.coemploymentActive = this.loan.loanApp.coBorrower.employments[this.loan.loanApp.coBorrower.employments.length - 1];
                //}
                _this.addcoEmployment();
                _this.coemploymentActive.positionDescription = "Jr Artist";
                _this.coemploymentActive.typeOfBusiness = "Artist";
                _this.coemploymentActive.employmentType = 1 /* SalariedEmployee */;
                _this.coemploymentActive.startingDate = new Date("2008-09-13");
                _this.coemploymentActive.endingDate = new Date("2015-11-05");
                _this.coemploymentActive.companyName = "Grumman Data Systems";
                _this.coemploymentActive.baseSalary = 11000;
            };
            this.populateAssets = function () {
                //Assets array is empty, add one for the user to begin the page.
                if (_this.loan.loanApp.assets.length == 0) {
                    _this.addAsset();
                }
                else {
                    _this.assetActive = _this.loan.loanApp.assets[_this.loan.loanApp.assets.length - 1];
                }
                _this.assetActive.ownerType = 1;
                _this.assetActive.accountNumber = "123456789";
                _this.assetActive.assetValue = 34542;
                _this.assetActive.borrowerFullName = "";
                _this.assetActive.assetType = 0 /* Checking */;
                _this.assetActive.financialInstitutionName = "abc financial institure";
            };
            this.populateAddress = function () {
                _this.loan.loanApp.borrower.currentAddress.streetName = "7655 ELSIE";
                _this.loan.loanApp.borrower.currentAddress.stateName = "CA";
                _this.loan.loanApp.borrower.currentAddress.cityName = "Sacramento";
                _this.loan.loanApp.borrower.currentAddress.zipCode = "90740";
                _this.loan.loanApp.borrower.currentAddress.ownOrRent = 2;
                _this.loan.loanApp.borrower.currentAddress.timeAtAddressYears = 3;
                _this.loan.loanApp.borrower.currentAddress.timeAtAddressMonths = 5;
                _this.loan.loanApp.borrower.currentAddress.isMailingAddressDifferent = false;
                _this.loan.loanApp.coBorrower.currentAddress.streetName = "1225 Pacific";
                _this.loan.loanApp.coBorrower.currentAddress.stateName = "CA";
                _this.loan.loanApp.coBorrower.currentAddress.cityName = "Salinas";
                _this.loan.loanApp.coBorrower.currentAddress.zipCode = "93905";
                _this.loan.loanApp.coBorrower.currentAddress.ownOrRent = 0;
                _this.loan.loanApp.coBorrower.currentAddress.timeAtAddressYears = 5;
                _this.loan.loanApp.coBorrower.currentAddress.timeAtAddressMonths = 2;
                _this.loan.loanApp.coBorrower.currentAddress.isMailingAddressDifferent = false;
            };
            if (consumersite.loadMockData)
                this.populateAllData();
            this._raceType = this.loan.loanApp.borrower.declarations;
        }
        LoanAppPageController.prototype.setRaceType = function (raceType, selected) {
            switch (raceType) {
                case 0:
                    this._raceType.race.iDoNotWishToFurnishThisInformation = selected;
                    break;
                case 1:
                    this._raceType.race.americanIndianOrAlaskaNative = selected;
                    break;
                case 2:
                    this._raceType.race.asian = selected;
                    break;
                case 3:
                    this._raceType.race.blackOrAfricanAmerican = selected;
                    break;
                case 4:
                    this._raceType.race.nativeHawaiianOrOtherPacificIslander = selected;
                    break;
                case 5:
                    this._raceType.race.white = selected;
                    break;
                case 6:
                    this._raceType.race.notApplicable = selected;
                    break;
                default:
                    break;
            }
            return this._raceType;
        };
        LoanAppPageController.prototype.populatePersonalData = function () {
            this.loan.loanApp.borrower.firstName = "KATHY";
            this.loan.loanApp.borrower.lastName = "BAILEY";
            this.loan.loanApp.borrower.middleName = "L";
            this.loan.loanApp.borrower.maritalStatus = 0 /* Married */;
            this.loan.loanApp.borrower.email = "replace@this.email";
            this.loan.loanApp.borrower.preferredPhone = "256-555-5555";
            this.loan.loanApp.borrower.preferredPhoneType = '1'; //srv.PhoneNumberType.Cell;
            this.loan.loanApp.borrower.ssn = "666075832";
            this.loan.loanApp.hasCoBorrower = consumersite.isMockDataJoint;
        };
        LoanAppPageController.className = 'loanAppPageController';
        LoanAppPageController.$inject = ['loan', 'navigationService', 'templateRoot'];
        return LoanAppPageController;
    })();
    moduleRegistration.registerController(consumersite.moduleName, LoanAppPageController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=loanAppPage.controller.js.map