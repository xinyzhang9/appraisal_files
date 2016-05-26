/// <reference path="../../../Scripts/typings/moment/moment.d.ts" />
/// <reference path="../../../Scripts/typings/linqjs/linq.d.ts" />
/// <reference path='../../../angular/ts/extendedViewModels/borrower.extendedViewModel.ts' />
/// <reference path='employment.viewModel.ts' />
/// <reference path='otherIncome.viewModel.ts' />
/// <reference path='asset.viewModel.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var consumersite;
(function (consumersite) {
    var vm;
    (function (vm) {
        var Borrower = (function (_super) {
            __extends(Borrower, _super);
            function Borrower(applicationData, borrower) {
                var _this = this;
                _super.call(this, applicationData);
                this.getCoBorrower = function () { return null; };
                this.employments = [];
                this.assignCoBorrower = function () {
                    if (_this.isCoBorrower) {
                        return;
                    }
                    var loanAppId = _this.getBorrower().loanApplicationId;
                    var coBorrower = lib.findFirst(_this.getBorrower().getTransactionalInfo().borrowers, function (b) { return b.loanApplicationId == _this.getBorrower().loanApplicationId && b.isCoBorrower == true; });
                    _this.getCoBorrower = function () { return coBorrower; };
                };
                this.assignCreditIds = function () {
                    // @todo-cc: This needs to go right place
                    if (!_this.getBorrower().miscellaneousDebt) {
                        return;
                    }
                    var ctn = _this.getBorrower().miscellaneousDebt.length;
                    for (var i = 0; i < ctn; i++) {
                        var tempBorrower = _this.getBorrower();
                        var temp = tempBorrower.miscellaneousDebt[i].miscellaneousDebtId;
                        if (temp === '' || temp === undefined) {
                            _this.getBorrower().miscellaneousDebt[i].miscellaneousDebtId = util.IdentityGenerator.nextGuid();
                            _this.getBorrower().miscellaneousDebt[i].identityKey = _this.getBorrower().miscellaneousDebt[i].miscellaneousDebtId;
                        }
                    }
                };
                this.constructeConsent = function () {
                    if (!_this.getBorrower().eConsent) {
                        _this.getBorrower().eConsent = new srv.cls.EConsentViewModel();
                        _this.getBorrower().eConsent.consentStatus = 0 /* None */;
                    }
                };
                this.constructDeclarations = function () {
                    var declarationsCls = _this.getBorrower().declarationsInfo;
                    if (!declarationsCls) {
                        declarationsCls = new srv.cls.DeclarationInfoViewModel();
                    }
                    _this.declarations = new vm.Declarations(_this.getApplicationData(), declarationsCls);
                };
                this.constructEmployment = function () {
                    angular.forEach(_this.getBorrower().getEmploymentInfoes(), function (employmentCls, idx) {
                        var employmentVm = new vm.Employment(_this.getApplicationData(), employmentCls);
                        _this.employments.push(employmentVm);
                    });
                };
                // convenience
                this.getTransactionInfo = function () {
                    return _this.getBorrower().getTransactionalInfo();
                };
                this.constructProperty = function (addressTypeId) {
                    var test = _this.getBorrower().getPreviousAddress();
                    var addrCls = lib.findFirst(_this.getTransactionInfo().property.getValues(), function (p) { return p.borrowerId == _this.borrowerId && p.addressTypeId == addressTypeId; });
                    if (addrCls) {
                        // @todo-cc: Review , should always only ever be zero or one , not sure if we should try to validate
                        return new vm.Property(_this.getApplicationData(), addrCls);
                    }
                    else {
                        var addr = consumersite.classFactory(cls.PropertyViewModel, vm.Property, _this.getApplicationData(), _this.getTransactionInfo());
                        addr.borrowerId = _this.borrowerId;
                        addr.addressTypeId = addressTypeId;
                        return addr;
                    }
                };
                this.addLiability = function (liability) {
                    _this.getBorrower().addLiability(liability);
                };
                //------------------------------------------
                this.isPreviousEmploymentRequiredByDate = function (startDate) {
                    var today = moment(new Date());
                    var yearsEmployed = today.diff(moment(startDate), 'years');
                    return yearsEmployed < 2;
                };
                this.addEmployment = function (isPrevious, isAdditional) {
                    var ti = _this.getBorrower().getTransactionalInfo();
                    var employmentCls;
                    if (isAdditional) {
                        employmentCls = new cls.AdditionalEmploymentInfoViewModel(ti, null, isPrevious);
                    }
                    else {
                        employmentCls = new cls.CurrentEmploymentInfoViewModel(ti, null);
                    }
                    employmentCls.borrowerId = _this.borrowerId;
                    var employmentVm = new vm.Employment(_this.getApplicationData(), employmentCls);
                    return _this.employments.push(employmentVm);
                };
                this.removeEmployment = function (index) {
                    _this.removeAt(_this.employments, index);
                };
                this.addOtherIncome = function (loanApp) {
                    var incomeCls = _this.getBorrower().addOtherIncome();
                    var incomeVm = new vm.OtherIncome(_this.getApplicationData(), loanApp, incomeCls);
                    return incomeVm;
                };
                this.removeAt = function (coll, index) {
                    if (index < coll.length) {
                        coll.slice(index, 1);
                    }
                };
                this.activateUserAccount = function () {
                    _this.setUserAccountActiveStatus(true);
                };
                this.deActivateUserAccount = function () {
                    _this.setUserAccountActiveStatus(false);
                };
                this.setUserAccountActiveStatus = function (isActive) {
                    _this.getBorrower().userAccount.isActivated = isActive;
                    _this.getBorrower().userAccount.isOnlineUser = isActive;
                };
                this.getBorrower = function () { return borrower; };
                // Look for coBorrower if we are not
                this.assignCoBorrower();
                // Always active for all borrowers for now
                borrower.isActive = true;
                this.currentAddress = this.constructProperty(1 /* Present */);
                this.mailingAddress = this.constructProperty(3 /* Mailing */);
                this.mailingAddress.isSameMailingAsBorrowerCurrentAddress = true;
                this.previousAddress = this.constructProperty(2 /* Former */);
                this.constructEmployment();
                this.constructDeclarations();
                this.constructeConsent();
                this.assignCreditIds();
                if (!this.getBorrower().userAccount) {
                    this.getBorrower().userAccount = new cls.UserAccountViewModel();
                }
            }
            Object.defineProperty(Borrower.prototype, "eApprovalConfirmation", {
                get: function () {
                    return this.getBorrower().eApprovalConfirmation;
                },
                set: function (eApprovalConfirmation) {
                    this.getBorrower().eApprovalConfirmation = eApprovalConfirmation;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "eConsent", {
                get: function () {
                    return this.getBorrower().eConsent;
                },
                set: function (eConsent) {
                    this.getBorrower().eConsent = eConsent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "ficoScore", {
                get: function () {
                    return this.getBorrower().ficoScore;
                },
                set: function (ficoScore) {
                    this.getBorrower().ficoScore = ficoScore;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "assets", {
                get: function () {
                    if (!angular.isDefined(this.getBorrower().assets)) {
                        this.getBorrower().assets = [];
                    }
                    return this.getBorrower().getAssets();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "reos", {
                get: function () {
                    var liabilities = this.getBorrower().getLiabilities();
                    var reos = lib.filter(liabilities, function (l) { return l.isPledged; });
                    return reos;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "borrowerId", {
                get: function () {
                    return this.getBorrower().borrowerId;
                },
                set: function (borrowerId) {
                    /*Read Only*/
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "isCoBorrower", {
                get: function () {
                    return this.getBorrower().isCoBorrower;
                },
                set: function (isCoBorrower) {
                    this.getBorrower().isCoBorrower = isCoBorrower;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "firstName", {
                get: function () {
                    return this.getBorrower().firstName;
                },
                set: function (firstName) {
                    this.getBorrower().firstName = firstName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "middleName", {
                get: function () {
                    return this.getBorrower().middleName;
                },
                set: function (middleName) {
                    this.getBorrower().middleName = middleName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "lastName", {
                get: function () {
                    return this.getBorrower().lastName;
                },
                set: function (lastName) {
                    this.getBorrower().lastName = lastName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "fullName", {
                get: function () {
                    return (this.getBorrower().getFullName());
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "suffix", {
                get: function () {
                    return this.getBorrower().suffix;
                },
                set: function (suffix) {
                    this.getBorrower().suffix = suffix;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "email", {
                get: function () {
                    var email = this.getBorrower().email;
                    if (Borrower.isEmailNewProspect(email)) {
                        email = '';
                    }
                    return email;
                },
                set: function (email) {
                    this.getBorrower().email = email;
                    if (this.getCoBorrower()) {
                        this.getCoBorrower().email = email;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "userName", {
                get: function () {
                    return this.getBorrower().userAccount.username;
                },
                set: function (userName) {
                    this.getBorrower().userAccount.username = userName;
                    if (this.getCoBorrower() && this.getCoBorrower().userAccount) {
                        this.getCoBorrower().userAccount.username = userName;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "securityAnswer", {
                //setEmailForReport = (email: string) => {
                //    this.getBorrower().userAccount.username = email;
                //}
                //acceptEmailUserEntered = (emailUserEntered: string) => {
                //    this.email = emailUserEntered;
                //    if (!this.isCoBorrower) {
                //        this.getBorrower().userAccount.username = this.getBorrower().email;
                //        if (this.getCoBorrower()) {
                //            // @todo-cc: Need to default to Joint-Account for username and email
                //            // this.getCoBorrower().userAccount.username = this.getBorrower().email;
                //        }
                //    }
                //}
                get: function () {
                    return this.getBorrower().userAccount.securityAnswer;
                },
                set: function (securityAnswer) {
                    this.getBorrower().userAccount.securityAnswer = securityAnswer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "securityQuestion", {
                get: function () {
                    return this.getBorrower().userAccount.securityQuestion;
                },
                set: function (securityQuestion) {
                    this.getBorrower().userAccount.securityQuestion = securityQuestion;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "preferredPhoneId", {
                get: function () {
                    return this.getBorrower().preferredPhone.phoneId;
                },
                set: function (val) {
                    this.getBorrower().preferredPhone.phoneId = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "preferredPhone", {
                get: function () {
                    return this.getBorrower().preferredPhone.number;
                },
                set: function (preferredPhone) {
                    this.getBorrower().preferredPhone.number = preferredPhone;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "preferredPhoneType", {
                get: function () {
                    if (!this.getBorrower().preferredPhone.type) {
                        // @todo-cc: Enumeration ; Or better yet , move default rules to creation service API's
                        this.getBorrower().preferredPhone.type = "1"; // Cell
                    }
                    return this.getBorrower().preferredPhone.type;
                },
                set: function (preferredPhoneType) {
                    this.getBorrower().preferredPhone.type = preferredPhoneType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "maritalStatus", {
                get: function () {
                    return this.getBorrower().maritalStatus;
                },
                set: function (value) {
                    this.getBorrower().maritalStatus = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "numberOfDependents", {
                get: function () {
                    return this.getBorrower().numberOfDependents;
                },
                set: function (numberOfDependents) {
                    this.getBorrower().numberOfDependents = numberOfDependents;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "agesOfDependents", {
                get: function () {
                    return this.getBorrower().agesOfDependents;
                },
                set: function (agesOfDependents) {
                    this.getBorrower().agesOfDependents = agesOfDependents;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "ssn", {
                get: function () {
                    return this.getBorrower().ssn;
                },
                set: function (_ssn) {
                    this.getBorrower().ssn = _ssn;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "dateOfBirth", {
                get: function () {
                    return this.getBorrower().dateOfBirth;
                },
                set: function (_dateOfBirth) {
                    this.getBorrower().dateOfBirth = _dateOfBirth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "isPermanentAlien", {
                //-------- permanentAlien ----------------------
                //------------------------------------------
                get: function () {
                    return this.getBorrower().permanentAlien;
                },
                set: function (permanentAlien) {
                    this.getBorrower().permanentAlien = permanentAlien;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "permanentResidentAlienIndicator", {
                get: function () {
                    return this.declarations.permanentResidentAlienIndicator;
                },
                set: function (value) {
                    this.declarations.permanentResidentAlienIndicator = value;
                    // Note DB, 1 means false.   0 means true.
                    if (value === 1) {
                        this.getBorrower().permanentAlien = false;
                    }
                    else {
                        this.getBorrower().permanentAlien = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "isUsCitizen", {
                //------------------------------------------
                //-------- US Citizen ----------------------
                //------------------------------------------
                get: function () {
                    return this.getBorrower().usCitizen;
                },
                set: function (usCitizen) {
                    this.getBorrower().usCitizen = usCitizen;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "usCitizenIndicator", {
                get: function () {
                    return this.declarations.usCitizenIndicator;
                },
                set: function (value) {
                    this.declarations.usCitizenIndicator = value;
                    // Note DB, 1 means false.   0 means true.
                    if (value === 1) {
                        this.getBorrower().usCitizen = false;
                    }
                    else {
                        this.getBorrower().usCitizen = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "isPreviousEmploymentRequired", {
                get: function () {
                    var isOtherOrUnemployedExist = !Enumerable.from(this.employments).where(function (emp) { return !emp.isRemoved; }).any(function (emp) { return emp.employmentType != 4 /* OtherOrUnemployed */; });
                    if (isOtherOrUnemployedExist) {
                        return false;
                    }
                    var isPreviousEmploymentExist = Enumerable.from(this.employments).any(function (emp) { return !emp.isRemoved && emp.isPreviousEmployment(); });
                    //allow only one previous employment to exist
                    if (isPreviousEmploymentExist)
                        return false;
                    var currentEmploymentWithMinStartDate = Enumerable.from(this.employments).where(function (emp, idx) { return !emp.isRemoved && emp.isCurrentEmployment(); }).orderBy(function (emp) { return emp.startingDate; }).first();
                    return this.isPreviousEmploymentRequiredByDate(currentEmploymentWithMinStartDate.startingDate);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "isActive", {
                get: function () {
                    return this.getBorrower().isActive;
                },
                set: function (isActive) {
                    /*Read Only*/
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "userAccount", {
                get: function () {
                    return this.getBorrower().userAccount;
                },
                set: function (userAccount) {
                    this.getBorrower().userAccount = userAccount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Borrower.prototype, "userAccountId", {
                get: function () {
                    return this.getBorrower().userAccount.userAccountId;
                },
                set: function (userAccountId) {
                    this.getBorrower().userAccount.userAccountId = userAccountId;
                },
                enumerable: true,
                configurable: true
            });
            // @todo-cc: Review , eliminate or move to common/lib
            // @todo-cc: Upgrade to TS 1.7 , use const
            Borrower.STRING_EMPTY = "";
            // @todo-cc: Upgrade to TS 1.7 , use const
            Borrower.EMAIL_PFX_NEWPROSPECT = "newprospect";
            // @todo-cc: 
            //      Long term needs to fix , this is less than ideal
            Borrower.isEmailNewProspect = function (email) {
                if (!email) {
                    return true;
                }
                if (email.length > Borrower.EMAIL_PFX_NEWPROSPECT.length && email.substr(0, Borrower.EMAIL_PFX_NEWPROSPECT.length) == Borrower.EMAIL_PFX_NEWPROSPECT) {
                    return true;
                }
                return false;
            };
            return Borrower;
        })(vm.ViewModelBase);
        vm.Borrower = Borrower;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=borrower.viewModel.js.map