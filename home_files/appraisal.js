var consumersite;
(function (consumersite) {
    //export class auditLogRequest {
    //    title: string;
    //    description: string;
    //    loanId: string;
    //    userAccountId: number;
    //}
    var AppraisalViewerController = (function () {
        function AppraisalViewerController(loan, loanAppPageContext, applicationData, $state, templateRoot, navigationService, docVaultSvc, apiServiceAccountId, docLoadService, $q, DocumentsService, uiBlockWithSpinner, consumerLoanService, $filter, $log, AppraisalService, authenticationService) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.$state = $state;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.docVaultSvc = docVaultSvc;
            this.apiServiceAccountId = apiServiceAccountId;
            this.docLoadService = docLoadService;
            this.$q = $q;
            this.DocumentsService = DocumentsService;
            this.uiBlockWithSpinner = uiBlockWithSpinner;
            this.consumerLoanService = consumerLoanService;
            this.$filter = $filter;
            this.$log = $log;
            this.AppraisalService = AppraisalService;
            this.authenticationService = authenticationService;
            this._repositoryId = null;
            this._appraisalAvailable = false;
            /// add a log in AuditLog table for the user clicked the view appraisal button.
            this.addAppraisalAuditLog = function () {
                var req = new consumersite.vm.auditLogRequest();
                req.loanId = _this.loan.loanId;
                req.userAccountId = _this._currentUserId;
                req.description = _this.loan.loanApp.borrower.fullName;
                if (_this.loan.loanApp.coBorrower != null && _this.loan.loanApp.coBorrower.fullName != null && _this.loan.loanApp.coBorrower.fullName != '' && _this.loan.loanApp.coBorrower.fullName != 'New Application') {
                    req.description += "/" + _this.loan.loanApp.coBorrower.fullName;
                }
                req.description += ' has confirmed receipt of the appraisal.';
                req.title = "Appraisal Receipt";
                _this.DocumentsService.createAuditLogItem(req).$promise.then((function (data) {
                    if (data != null) {
                        var result = data.$resolved;
                        if (result) {
                        }
                    }
                }), function (error) {
                    _this.$log.error('Failure in Document Type retrieval', error);
                });
            };
            /// add a log in AuditLog table for the user clicked the view appraisal button.
            this.viewMyAppraisal = function () {
                if (_this._repositoryId != null) {
                    _this.addAppraisalAuditLog();
                    _this.AppraisalService.SendReceiptOfAppraisalEmail(_this.loan.loanId, _this.authenticationService.getLoggedInUserId());
                    _this.openDocument(_this._repositoryId, true, true);
                }
                //this.loadLoan(this.loan.loanId); 
            };
            this.loadLoan = function (loanId) {
                if (loanId != '') {
                    _this.uiBlockWithSpinner.callWithGears(function () { return _this.consumerLoanService.loadLoanII(loanId).$promise; }, 'Getting Your Appraisal. Please Wait.', function (loan) {
                        var loanCls = new cls.LoanViewModel(loan, _this.$filter, false);
                        _this.currentLoan = new consumersite.vm.Loan(_this.applicationData, loanCls);
                        _this.getDocVaultDocuments(_this.currentLoan.getLoanApplications()).then(function (data) {
                            _this.docVaultDocuments = data;
                            if (data != null) {
                                var apparisalDoc = Enumerable.from(_this.docVaultDocuments).where(function (item, idx) { return item.documentTypeId == "5056" && item.borrowerViewable; }).orderByDescending(function (item) { return item.lastUpdated; }).firstOrDefault();
                                if (apparisalDoc != null && apparisalDoc.repositoryId != null && apparisalDoc.repositoryId != '') {
                                    _this._repositoryId = apparisalDoc.repositoryId;
                                    _this._appraisalAvailable = true;
                                }
                                else {
                                    _this._appraisalAvailable = false;
                                }
                            }
                            else {
                                _this._appraisalAvailable = false;
                            }
                        });
                        _this.dataLoaded = true;
                    });
                }
            };
            this.getDocVaultDocuments = function (loanApplications) {
                var docVaultDocumentViewModels = [];
                var promises = [];
                var loanApplicationIds = [];
                angular.forEach(loanApplications, function (loan) {
                    loanApplicationIds.push(loan.loanApplicationId);
                });
                angular.forEach(loanApplicationIds, function (loanApplicationId) {
                    promises.push(_this.docLoadService.getDocVaultData(loanApplicationId, _this.apiServiceAccountId));
                });
                return _this.$q.all(promises).then(function (data) {
                    angular.forEach(data, function (object) {
                        docVaultDocumentViewModels = docVaultDocumentViewModels.concat(object);
                    });
                    return docVaultDocumentViewModels;
                }, function (error) {
                    return null;
                });
            };
            this.continueToNextPageCommand = function () {
                _this.navigationService.goToDashboard(_this.loan.loanId);
            };
            this.getDocumentUrl = function (repositoryId, inBrowser) {
                if (!repositoryId)
                    return '';
                var encodedRepositoryId = encodeURIComponent(repositoryId);
                var url = '/Downloader.axd?documentType=repositoryItem&repositoryItemId=' + encodedRepositoryId;
                url += '&userAccountId=' + _this._currentUserId + '&sourceSite=ConsumerSite';
                if (inBrowser != null && inBrowser)
                    url = url + '&browser=true';
                return url;
            };
            this.openDocument = function (documentId, inBrowser, inTab) {
                var downloadLink = _this.getDocumentUrl(documentId, inBrowser);
                if (!common.string.isNullOrWhiteSpace(downloadLink) && !common.string.isEmptyGuid(downloadLink)) {
                    if (inTab)
                        window.open(downloadLink, '_blank', '');
                    else
                        window.open(downloadLink, '_blank', 'location=0');
                }
            };
            this.goToUploadDocuments = function () {
                _this.navigationService.nextMyNextStep();
            };
            this._currentUserId = apiServiceAccountId;
            this._appraisalAvailable = true;
            this.loadLoan(this.loan.loanId);
        }
        Object.defineProperty(AppraisalViewerController.prototype, "appraisalAvailable", {
            get: function () {
                return this._appraisalAvailable;
            },
            set: function (value) {
                this._appraisalAvailable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalViewerController.prototype, "appraisalMessage", {
            get: function () {
                var message = '';
                if (this._appraisalAvailable) {
                    message = 'View My Appraisal';
                }
                else {
                    message = 'Appraisal Not Available.';
                }
                return message;
            },
            set: function (value) {
                // not implemented
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalViewerController.prototype, "dataLoaded", {
            get: function () {
                return this._dataLoaded;
            },
            set: function (value) {
                this._dataLoaded = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalViewerController.prototype, "currentLoan", {
            get: function () {
                return this._currentLoan;
            },
            set: function (value) {
                this._currentLoan = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppraisalViewerController.prototype, "docVaultDocuments", {
            get: function () {
                return this._docVaultDocuments;
            },
            set: function (value) {
                this._docVaultDocuments = value;
            },
            enumerable: true,
            configurable: true
        });
        AppraisalViewerController.className = "appraisalViewerController";
        AppraisalViewerController.$inject = ['loan', 'loanAppPageContext', 'applicationData', '$state', 'templateRoot', 'navigationService', 'docVaultSvc', 'apiServiceAccountId', 'docLoadService', '$q', 'DocumentsService', 'uiBlockWithSpinner', 'consumerLoanService', '$filter', '$log', 'AppraisalService', 'authenticationService'];
        return AppraisalViewerController;
    })();
    consumersite.AppraisalViewerController = AppraisalViewerController;
    moduleRegistration.registerController(consumersite.moduleName, AppraisalViewerController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=appraisal.viewer.controller.js.map