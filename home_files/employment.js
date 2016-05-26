/// <reference path="../../../../Scripts/typings/linqjs/linq.d.ts" />
/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
/// <reference path="../../../../Scripts/typings/moment/moment.d.ts" />
var consumersite;
(function (consumersite) {
    var EmploymentController = (function () {
        function EmploymentController(loan, loanAppPageContext, applicationData, navigationService, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.navigationService = navigationService;
            this.templateRoot = templateRoot;
            //navigator will not let to transition into the next page if it is not valid - see employment.html
            this.isValid = function () {
                var result = false;
                try {
                    //validate fields for every employment
                    if (!_this.isValidPositionDescription || !_this.isValidCompanyName || !_this.isValidStartingDate || !_this.isValidEndingDate || !_this.isValidTotalIncome || !_this.isValidBranch) {
                        _this.employmentActive = _this.invalidEmployment;
                        return false;
                    }
                    var prevRequired = _this.borrower.isPreviousEmploymentRequired;
                    if (prevRequired)
                        _this.addEmploymentImpl(true, true);
                    result = !prevRequired;
                    return result;
                }
                finally {
                    _this.isFormSetToBeTouched = !result;
                }
            };
            //used in employment.html
            this.isItemRemovable = function (index) {
                var result = (_this.borrower.employments.length > 1) && (index > 0) && (!_this.isCurrentEmployment(index) || !_this.isOnlyOneCurrent);
                return result;
            };
            this.isCurrentEmployment = function (index) {
                return _this.borrower.employments[index].isCurrentEmployment();
            };
            this.setCurrentEmployerProperty = function () {
                _this.isCurrentEmployer = _this.employmentActive.isCurrentEmployment();
            };
            this.addEmployment = function () {
                _this.addEmploymentImpl(false, true); //1st is never deleted, user can add only current employment
            };
            this.addEmploymentImpl = function (isPrevious, isAdditional) {
                var edx = _this.borrower.addEmployment(isPrevious, isAdditional);
                _this.employmentActive = _this.borrower.employments[edx - 1];
            };
            //used in employment.html
            this.isEditSectionVisible = function () {
                return true;
            };
            this.isSalariedEmployee = function () {
                return _this.employmentType === 1 /* SalariedEmployee */;
            };
            this.isSelfEmployed = function () {
                return _this.employmentType === 2 /* SelfEmployed */;
            };
            this.isActiveMilitaryDuty = function () {
                return _this.employmentType === 0 /* ActiveMilitaryDuty */;
            };
            this.isRetired = function () {
                return _this.employmentType === 3 /* Retired */;
            };
            this.isOtherOrUnemployed = function () {
                return _this.employmentType === 4 /* OtherOrUnemployed */;
            };
            this.isBorrower = !this.loanAppPageContext.isCoBorrowerState;
            this.borrower = !this.isBorrower ? this.loan.loanApp.coBorrower : this.loan.loanApp.borrower;
            this.isCurrentEmployer = loanAppPageContext.loanAppNavigationState == 268435462 /* BorrowerEmployment */ || loanAppPageContext.loanAppNavigationState == 268435464 /* CoBorrowerEmployment */;
            if (this.borrower.employments.length == 0) {
                this.addEmploymentImpl(!this.isCurrentEmployer, false);
            }
            else {
                if (loanAppPageContext.nextLoanAppNavigationState == 268435471 /* Summary */) {
                    this.employmentActive = this.borrower.employments[0]; //select the first one if coming from summary page
                }
                else {
                    this.employmentActive = this.borrower.employments[this.borrower.employments.length - 1]; // select the last one
                }
            }
            if (this.employmentType == null) {
                this.employmentType = 1 /* SalariedEmployee */;
            }
        }
        Object.defineProperty(EmploymentController.prototype, "employmentType", {
            get: function () {
                this.setCurrentEmployerProperty();
                return this.employmentActive.employmentType;
            },
            set: function (employmentType) {
                this.employmentActive.employmentType = employmentType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "isOnlyOneCurrent", {
            get: function () {
                var q = !Enumerable.from(this.borrower.employments).where(function (emp) { return emp.isCurrentEmployment(); }).skip(1).any();
                return q;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "currentStartingDate", {
            get: function () {
                return this.employmentActive.startingDate;
            },
            set: function (startingDate) {
                this.employmentActive.startingDate = startingDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "activeEmployerEndingDate", {
            get: function () {
                return this.employmentActive.endingDate;
            },
            set: function (endingDate) {
                this.employmentActive.endingDate = endingDate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "addressWidgetTemplateUrl", {
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
        Object.defineProperty(EmploymentController.prototype, "addressWidgetTemplateUrlLeft", {
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
        Object.defineProperty(EmploymentController.prototype, "addressWidgetTemplateUrlRight", {
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
        Object.defineProperty(EmploymentController.prototype, "addressWidgetTemplateUrl2", {
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
        EmploymentController.prototype.checkAndAssignInvalidEmployment = function (value) {
            if (!(value == null)) {
                this.invalidEmployment = value;
                return true;
            }
            return false;
        };
        Object.defineProperty(EmploymentController.prototype, "isValidPositionDescription", {
            get: function () {
                var firstInvalid = Enumerable.from(this.borrower.employments).where(function (e) { return !e.isRemoved; }).firstOrDefault(function (emp) { return !emp.isValidPositionDescription(); }, null);
                return !this.checkAndAssignInvalidEmployment(firstInvalid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "isValidCompanyName", {
            get: function () {
                var firstInvalid = Enumerable.from(this.borrower.employments).where(function (e) { return !e.isRemoved; }).firstOrDefault(function (emp) { return !emp.isValidCompanyName(); }, null);
                return !this.checkAndAssignInvalidEmployment(firstInvalid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "isValidStartingDate", {
            get: function () {
                var firstInvalid = Enumerable.from(this.borrower.employments).where(function (e) { return !e.isRemoved; }).firstOrDefault(function (emp) { return !emp.isValidStartingDate(); }, null);
                return !this.checkAndAssignInvalidEmployment(firstInvalid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "isValidEndingDate", {
            get: function () {
                var firstInvalid = Enumerable.from(this.borrower.employments).where(function (e) { return !e.isRemoved; }).firstOrDefault(function (emp) { return !emp.isValidEndingDate(); }, null);
                return !this.checkAndAssignInvalidEmployment(firstInvalid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "isValidTotalIncome", {
            get: function () {
                var firstInvalid = Enumerable.from(this.borrower.employments).where(function (e) { return !e.isRemoved; }).firstOrDefault(function (emp) { return !emp.isValidTotalIncome(); }, null);
                return !this.checkAndAssignInvalidEmployment(firstInvalid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmploymentController.prototype, "isValidBranch", {
            get: function () {
                var firstInvalid = Enumerable.from(this.borrower.employments).where(function (e) { return !e.isRemoved; }).firstOrDefault(function (emp) { return !emp.isValidBranch(); }, null);
                return !this.checkAndAssignInvalidEmployment(firstInvalid);
            },
            enumerable: true,
            configurable: true
        });
        EmploymentController.className = "employmentController";
        EmploymentController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'navigationService', 'templateRoot'];
        return EmploymentController;
    })();
    consumersite.EmploymentController = EmploymentController;
    moduleRegistration.registerController(consumersite.moduleName, EmploymentController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=employment.controller.js.map