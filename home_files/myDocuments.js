var consumersite;
(function (consumersite) {
    var MyDocumentsController = (function () {
        function MyDocumentsController(loan, loanAppPageContext, consumerLoanService, $filter, applicationData, $uibModal, uploadFilesSvc, $log, enums, $state, uiBlockWithSpinner, docLoadService, $q, apiServiceAccountId, templateRoot, navigationService, docVaultSvc, DocumentsService, blockUI) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.consumerLoanService = consumerLoanService;
            this.$filter = $filter;
            this.applicationData = applicationData;
            this.$uibModal = $uibModal;
            this.uploadFilesSvc = uploadFilesSvc;
            this.$log = $log;
            this.enums = enums;
            this.$state = $state;
            this.uiBlockWithSpinner = uiBlockWithSpinner;
            this.docLoadService = docLoadService;
            this.$q = $q;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.docVaultSvc = docVaultSvc;
            this.DocumentsService = DocumentsService;
            this.blockUI = blockUI;
            this.controllerAsName = "myDocumentsCntrl";
            this.getDescription = function (item) {
                if (item.description == null || item.description === '') {
                    var documentCategory = _.filter(_this.applicationData.documentCategories, function (documentCategory) {
                        return item.documentCategoryId == documentCategory.categoryId;
                    })[0];
                    if (documentCategory != null) {
                        item.description = documentCategory.description;
                    }
                }
                return item.description;
            };
            this.getFullDocumentDescription = function (documentCategoryId) {
                var docTypeId = _this.getDocumentTypeIdFromMapping(documentCategoryId);
                var fullDocumentDescriptionObject = _.findWhere(_this.getDocVaultTypes(), { documentTypeId: docTypeId });
                if (fullDocumentDescriptionObject)
                    return fullDocumentDescriptionObject.fullDescription;
                else
                    return null;
            };
            this.getDocumentTypeIdFromMapping = function (documentCategoryId) {
                return _this.DocumentsService.getDocumentTypeIdFromMapping(_this.applicationData, documentCategoryId);
            };
            this.getDocVaultTypes = function () {
                return _this.DocumentsService.DocVaultTypes;
            };
            this.next = function () {
                _this.navigationService.goToDashboard();
            };
            this.setPropertyAddresses = function (loanApplication) {
                var dropDownAddress = [];
                loanApplication.getUniqueProperties().forEach(function (property) {
                    if (property)
                        dropDownAddress.push(new cls.LookupItem(property.fullAddressString, property.propertyId));
                });
                return dropDownAddress;
            };
            // Opens up a new tab and the document can be viewed within that tab.
            this.downloadDoc = function (doc) {
                _this.OpenDocument(doc.documentId, true, true);
            };
            this.getDocumentUrl = function (repositoryId, inBrowser) {
                if (repositoryId == null || repositoryId == '') {
                    return '';
                }
                var encodedRepositoryId = encodeURIComponent(repositoryId);
                var url = '/Downloader.axd?documentType=repositoryItem&repositoryItemId=' + encodedRepositoryId + '&userAccountId=' + _this.loan.loanApp.borrower.userAccountId + '&sourceSite=ConsumerSite';
                if (inBrowser)
                    url = url + '&browser=true';
                return url;
            };
            this.OpenDocument = function (repositoryId, inBrowser, inTab) {
                var downloadLink = _this.getDocumentUrl(repositoryId, inBrowser);
                if (!common.string.isNullOrWhiteSpace(downloadLink) && !common.string.isEmptyGuid(downloadLink)) {
                    if (inTab)
                        window.open(downloadLink, '_blank', '');
                    else
                        window.open(downloadLink, '_blank', 'location=0');
                }
            };
            this.loadLoanDocuments = function (loanId) {
                if (loanId != '') {
                    var req = new srv.cls.MyDocumentsRequestEnvelope();
                    req.loanApplicationId = _this.loan.loanApp.loanApplicationId;
                    req.loanId = _this.loan.loanId;
                    req.userAccountId = _this.loan.loanApp.borrower.userAccountId; //this._currentUserId;
                    _this.uiBlockWithSpinner.callWithGears(function () { return _this.DocumentsService.getMyDocuments(req).$promise; }, 'Getting Documents. Please Wait.', function (data) {
                        if (data != null) {
                            _this.categoryDocumentList = data.categoryDocumentsList;
                        }
                    });
                }
            };
            this.continueToNextPageCommand = function () {
                _this.navigationService.goToDashboard(_this.loan.loanId);
            };
            this.initializeDocumentCategories = function () {
                angular.forEach(_this.docVaultDocuments, function (item) {
                    var tempIndx = _this.documentCategories.indexOf(item.category);
                    if (tempIndx < 0) {
                        _this.documentCategories.push(item.category);
                    }
                });
            };
            this.getDocVaultDocuments = function (loanApplications) {
                var docVaultDocumentViewModels = [];
                var promises = [];
                var loanApplicationIds = [];
                angular.forEach(loanApplications, function (loan) {
                    loanApplicationIds.push(loan.loanApplicationId);
                });
                angular.forEach(loanApplicationIds, function (loanApplicationId) {
                    promises.push(_this.docLoadService.getDocVaultData(loanApplicationId, _this._currentUserId));
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
            this.getMyDocumentsList = function () {
                var req = new srv.cls.MyDocumentsRequestEnvelope();
                req.loanApplicationId = _this.loan.loanApp.loanApplicationId;
                req.loanId = _this.loan.loanId;
                req.userAccountId = _this._currentUserId;
                _this.DocumentsService.getMyDocuments(req).$promise.then((function (data) {
                    if (data != null) {
                        _this.categoryDocumentList = data.categoryDocumentsList;
                    }
                }), function (error) {
                    _this.$log.error('Failure in My Documents retrieval', error);
                });
            };
            this._currentUserId = apiServiceAccountId;
            this._documentCategories = [];
            this._categoryDocumentList = [];
            this.dataLoaded = false;
            this._loanId = this.loan.loanId;
            this.loadLoanDocuments(this._loanId);
        }
        Object.defineProperty(MyDocumentsController.prototype, "documentCategories", {
            /* Properties */
            get: function () {
                return this._documentCategories;
            },
            set: function (value) {
                this._documentCategories = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyDocumentsController.prototype, "currentLoan", {
            get: function () {
                return this._currentLoan;
            },
            set: function (value) {
                this._currentLoan = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyDocumentsController.prototype, "docVaultDocuments", {
            get: function () {
                return this._docVaultDocuments;
            },
            set: function (value) {
                this._docVaultDocuments = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyDocumentsController.prototype, "dataLoaded", {
            get: function () {
                return this._dataLoaded;
            },
            set: function (value) {
                this._dataLoaded = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MyDocumentsController.prototype, "categoryDocumentList", {
            get: function () {
                return this._categoryDocumentList;
            },
            set: function (value) {
                this._categoryDocumentList = value;
            },
            enumerable: true,
            configurable: true
        });
        MyDocumentsController.className = "myDocumentsController";
        MyDocumentsController.$inject = ['loan', 'loanAppPageContext', 'consumerLoanService', '$filter', 'applicationData', '$uibModal', 'uploadFilesSvc', '$log', 'enums', '$state', 'uiBlockWithSpinner', 'docLoadService', '$q', 'apiServiceAccountId', 'templateRoot', 'navigationService', 'docVaultSvc', 'DocumentsService', 'blockUI'];
        return MyDocumentsController;
    })();
    consumersite.MyDocumentsController = MyDocumentsController;
    moduleRegistration.registerController(consumersite.moduleName, MyDocumentsController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=myDocuments.controller.js.map