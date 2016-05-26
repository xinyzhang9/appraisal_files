/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var CreditController = (function () {
        function CreditController(loan, loanAppPageContext, templateRoot, apiServiceAccountId, DocumentsService, $log) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.templateRoot = templateRoot;
            this.apiServiceAccountId = apiServiceAccountId;
            this.DocumentsService = DocumentsService;
            this.$log = $log;
            this.controllerAsName = "creditCntrl";
            this.printMe = function () {
                console.log(_this.loan.loanApp.borrower.dateOfBirth);
            };
            this.hasCoBorrower = function () {
                return _this.loan.loanApp.hasCoBorrower;
            };
            this.isBorrowerAgeValid = true;
            this.isCoBorrowerAgeValid = true;
            this.isValid = function () {
                var resTemp;
                resTemp = false;
                if (!_this.loan.loanApp.hasCoBorrower && _this.borrowerAgeVerification()) {
                    resTemp = true;
                }
                if (_this.loan.loanApp.hasCoBorrower && _this.borrowerAgeVerification() && _this.coBorrowerAgeVerification()) {
                    resTemp = true;
                }
                if (resTemp) {
                    _this.addAppraisalAuditLog();
                }
                return resTemp;
            };
            //----------------------------------------------
            // Borrower SSN 
            //----------------------------------------------
            // Set the default value of inputType
            this.BorrowerSSNInputType = 'text';
            this.BorrowerSSNLockHover = false;
            this.borrowerSSNHoverInLock = function () {
                _this.BorrowerSSNLockHover = true;
                return;
            };
            this.borrowerSSNHoverOutLock = function () {
                _this.BorrowerSSNLockHover = false;
                _this.BorrowerSSNInputType = 'password';
                return;
            };
            this.borrowerSSNMouseDownLock = function () {
                if (_this.BorrowerSSNLockHover === true) {
                    _this.BorrowerSSNInputType = 'text';
                }
                return;
            };
            this.borrowerSSNMouseUpLock = function () {
                _this.BorrowerSSNInputType = 'password';
                return;
            };
            //BorrowerSSNInput_IsEntered: boolean = false;
            this.borrowerSSNEnterInput = function () {
                _this.BorrowerSSNInputType = 'text';
                return;
            };
            this.borrowerSSNLeaveInput = function () {
                _this.BorrowerSSNInputType = 'text';
                if (_this.Borrower.ssn !== "") {
                    _this.BorrowerSSNInputType = 'password';
                }
                return;
            };
            //----------------------------------------------  
            // Borrower SSN Confirm
            //----------------------------------------------
            this.BorrowerSSNConfirmInputType = 'text';
            this.BorrowerSSNConfirmLockHover = false;
            this.borrowerSSNConfirmHoverInLock = function () {
                _this.BorrowerSSNConfirmLockHover = true;
                return;
            };
            this.borrowerSSNConfirmHoverOutLock = function () {
                _this.BorrowerSSNConfirmLockHover = false;
                _this.BorrowerSSNConfirmInputType = 'password';
                return;
            };
            this.borrowerSSNConfirmMouseDownLock = function () {
                if (_this.BorrowerSSNConfirmLockHover === true) {
                    _this.BorrowerSSNConfirmInputType = 'text';
                }
                return;
            };
            this.borrowerSSNConfirmMouseUpLock = function () {
                _this.BorrowerSSNConfirmInputType = 'password';
                return;
            };
            // remove "does't match" when enter
            this.BorrowerSSNConfirmInput_IsEntered = false;
            this.borrowerSSNConfirmEnterInput = function () {
                _this.BorrowerSSNConfirmInput_IsEntered = true;
                _this.BorrowerSSNConfirmInputType = 'text';
                return;
            };
            this.borrowerSSNConfirmLeaveInput = function () {
                _this.BorrowerSSNConfirmInput_IsEntered = false;
                _this.BorrowerSSNConfirmInputType = 'password';
                return;
            };
            //----------------------------------------------
            // CoBorrower SSN 
            //----------------------------------------------
            this.CoBorrowerSSNInputType = 'text';
            this.CoBorrowerSSNLockHover = false;
            this.coborrowerSSNHoverInLock = function () {
                _this.CoBorrowerSSNLockHover = true;
                return;
            };
            this.coborrowerSSNHoverOutLock = function () {
                _this.CoBorrowerSSNLockHover = false;
                _this.CoBorrowerSSNInputType = 'password';
                return;
            };
            this.coborrowerSSNMouseDownLock = function () {
                if (_this.CoBorrowerSSNLockHover === true) {
                    _this.CoBorrowerSSNInputType = 'text';
                }
                return;
            };
            this.coborrowerSSNMouseUpLock = function () {
                _this.CoBorrowerSSNInputType = 'password';
                return;
            };
            this.coborrowerSSNEnterInput = function () {
                _this.CoBorrowerSSNInputType = 'text';
                return;
            };
            this.coborrowerSSNLeaveInput = function () {
                _this.CoBorrowerSSNInputType = 'text';
                if (_this.CoBorrower.ssn !== "") {
                    _this.CoBorrowerSSNInputType = 'password';
                }
                return;
            };
            //----------------------------------------------
            // CoBorrower SSN Confirm
            //----------------------------------------------
            this.CoBorrowerSSNConfirmInputType = 'text';
            this.CoBorrowerSSNConfirmLockHover = false;
            this.coborrowerSSNConfirmHoverInLock = function () {
                _this.CoBorrowerSSNConfirmLockHover = true;
                return;
            };
            this.coborrowerSSNConfirmHoverOutLock = function () {
                _this.CoBorrowerSSNConfirmLockHover = false;
                _this.CoBorrowerSSNConfirmInputType = 'password';
                return;
            };
            this.coborrowerSSNConfirmMouseDownLock = function () {
                if (_this.CoBorrowerSSNConfirmLockHover === true) {
                    _this.CoBorrowerSSNConfirmInputType = 'text';
                }
                return;
            };
            this.coborrowerSSNConfirmMouseUpLock = function () {
                _this.CoBorrowerSSNConfirmInputType = 'password';
                return;
            };
            // remove "does't match" when enter
            this.CoBorrowerSSNConfirmInput_IsEntered = false;
            this.coborrowerSSNConfirmEnterInput = function () {
                _this.CoBorrowerSSNConfirmInput_IsEntered = true;
                _this.CoBorrowerSSNConfirmInputType = 'text';
                return;
            };
            this.coborrowerSSNConfirmLeaveInput = function () {
                _this.CoBorrowerSSNConfirmInput_IsEntered = false;
                _this.CoBorrowerSSNConfirmInputType = 'password';
                return;
            };
            //-------------------------------------------------------
            /// add a log in AuditLog table.
            this.addAppraisalAuditLog = function () {
                // commented by Alex R. - due to build error in MAIN
                //var req = new auditLogRequest();
                //req.loanId = this.loan.loanId;
                //req.userAccountId = this._currentUserId;
                //req.description = this.loan.loanApp.borrower.fullName;
                //if (this.loan.loanApp.coBorrower != null && this.loan.loanApp.coBorrower.fullName != null
                //    && this.loan.loanApp.coBorrower.fullName != '' && this.loan.loanApp.coBorrower.fullName != 'New Application') {
                //    req.description += "/" + this.loan.loanApp.coBorrower.fullName;
                //}
                //req.description += ' has authorize lender or its designated representatives to obtain a credit report.';
                //req.title = "Credit Authorization";
                //this.DocumentsService.createAuditLogItem(req).$promise.then((data => {
                //    if (data != null) {
                //        var result = data.$resolved;
                //        if (result) {
                //            /// Credit Authorization
                //        }
                //    }
                //}),
                //    (error) => {
                //        this.$log.error('Failure in Credit Authorize', error);
                //    });
            };
            this._currentUserId = apiServiceAccountId;
            if (this.loan.loanApp.borrower.ssn === undefined || this.loan.loanApp.borrower.ssn === "") {
                this.BorrowerSSNInputType = 'text';
                this.BorrowerSSNConfirmInputType = 'text';
            }
            else {
                this.BorrowerSSNInputType = 'password';
                this.BorrowerSSNConfirmInputType = 'password';
            }
            if (this.loan.loanApp.hasCoBorrower) {
                if (this.loan.loanApp.coBorrower.ssn === undefined || this.loan.loanApp.coBorrower.ssn === "") {
                    this.CoBorrowerSSNInputType = 'text';
                    this.CoBorrowerSSNConfirmInputType = 'text';
                }
                else {
                    this.CoBorrowerSSNInputType = 'password';
                    this.CoBorrowerSSNConfirmInputType = 'password';
                }
            }
        }
        Object.defineProperty(CreditController.prototype, "BorrowerFullName", {
            get: function () {
                return this.loan.loanApp.borrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "borrowerSSN", {
            get: function () {
                return this.loan.loanApp.borrower.ssn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "BorrowerSSN", {
            set: function (value) {
                this.loan.loanApp.borrower.ssn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "SSNValidation", {
            get: function () {
                if (this.loan.loanApp.borrower.ssn !== this.loan.loanApp.coBorrower.ssn)
                    return 'invalid mismatch';
                else
                    return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "BorrowerDOB", {
            get: function () {
                return this.loan.loanApp.borrower.dateOfBirth;
            },
            set: function (value) {
                this.loan.loanApp.borrower.dateOfBirth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "Borrower", {
            get: function () {
                return this.loan.loanApp.borrower;
            },
            set: function (value) {
                this.loan.loanApp.borrower = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "CoBorrowerFullName", {
            get: function () {
                return this.loan.loanApp.coBorrower.fullName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "CoBorrowerSSN", {
            get: function () {
                return this.loan.loanApp.coBorrower.ssn;
            },
            set: function (value) {
                this.loan.loanApp.coBorrower.ssn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "CoBorrowerDOB", {
            get: function () {
                return this.loan.loanApp.coBorrower.dateOfBirth;
            },
            set: function (value) {
                this.loan.loanApp.coBorrower.dateOfBirth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "CoBorrower", {
            get: function () {
                return this.loan.loanApp.coBorrower;
            },
            set: function (value) {
                this.loan.loanApp.coBorrower = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CreditController.prototype, "AuthorizeCreditReport", {
            get: function () {
                return this._authorizeCreditReport;
            },
            set: function (value) {
                this._authorizeCreditReport = value;
                if (!!value) {
                    this.loan.loanApp.creditAuthorizationDate = new Date();
                }
            },
            enumerable: true,
            configurable: true
        });
        CreditController.prototype.borrowerAgeVerification = function () {
            if (typeof this.loan.loanApp.borrower.dateOfBirth === 'undefined') {
                return false;
            }
            var datee = new Date(this.loan.loanApp.borrower.dateOfBirth);
            var today = moment(new Date());
            var age = today.diff(moment(new Date(this.loan.loanApp.borrower.dateOfBirth)), 'years');
            if (age < 18) {
                this.isBorrowerAgeValid = false;
            }
            else {
                this.isBorrowerAgeValid = true;
            }
            return age > 17;
        };
        CreditController.prototype.coBorrowerAgeVerification = function () {
            if (typeof this.loan.loanApp.coBorrower.dateOfBirth === 'undefined') {
                return false;
            }
            var datee = new Date(this.loan.loanApp.coBorrower.dateOfBirth);
            var today = moment(new Date());
            var age = today.diff(moment(new Date(this.loan.loanApp.coBorrower.dateOfBirth)), 'years');
            if (age < 18) {
                this.isCoBorrowerAgeValid = false;
            }
            else {
                this.isCoBorrowerAgeValid = true;
            }
            return age > 17;
        };
        CreditController.className = "creditController";
        CreditController.$inject = ['loan', 'loanAppPageContext', 'templateRoot', 'apiServiceAccountId', 'DocumentsService', '$log'];
        return CreditController;
    })();
    consumersite.CreditController = CreditController;
    moduleRegistration.registerController(consumersite.moduleName, CreditController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=credit.controller.js.map