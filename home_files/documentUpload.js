/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var DocumentUploadController = (function () {
        function DocumentUploadController(loan, applicationData, $uibModal, uploadFilesSvc, $log, enums, uiBlockWithSpinner, $q, apiServiceAccountId, templateRoot, navigationService, DocumentsService, blockUI, userAccount, documentCacheService) {
            var _this = this;
            this.loan = loan;
            this.applicationData = applicationData;
            this.$uibModal = $uibModal;
            this.uploadFilesSvc = uploadFilesSvc;
            this.$log = $log;
            this.enums = enums;
            this.uiBlockWithSpinner = uiBlockWithSpinner;
            this.$q = $q;
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.DocumentsService = DocumentsService;
            this.blockUI = blockUI;
            this.userAccount = userAccount;
            this.documentCacheService = documentCacheService;
            this.controllerAsName = "documentUploadCntrl";
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
            // Print Disclosers.
            this.downloadRequestedDocs = function () {
                if (_this.canDownloadDocPrintSign) {
                    // Opens up a new tab and the document can be viewed within that tab.
                    _this.OpenDocument(_this.wetSignaturePackageDocumentId, true, true);
                    // Opens up a new browser modal window 
                    //this.OpenDocument(this.wetSignaturePackageDocumentId, false, false);
                    _this.hasDownloadedDocPrintSign = true;
                    _this.isDownloadDocPrintSignPrimary = false;
                    _this.isChooseFileToUploadPrimary = true;
                    _this.isNextPagePrimary = false;
                }
            };
            // Upload History
            // Opens up a new tab and the document can be viewed within that tab.
            //public downloadUploadHistoryDoc = (doc: srv.IUploadedFileViewModel): void => {           
            //    this.OpenDocument(doc.repositoryItemId, true, true);
            //}  
            this.downloadUploadHistoryDoc = function (doc) {
                _this.OpenDocument(doc.documentId, true, true);
            };
            // Incomplete Documents
            // Opens up a new tab and the document can be viewed within that tab.
            this.downloadRejectedDoc = function (doc) {
                _this.OpenDocument(doc.documentId, true, true);
            };
            this.downloadFaxCoversheet = function () {
                if (_this._hasFaxCoverSheetDocument) {
                    _this.OpenDocument(_this._faxCoverSheetDocumentId, true, true);
                }
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
            this.toggleModal = function () {
                var filePickerModal = _this.$uibModal.open({
                    templateUrl: _this.templateRoot + 'consumersite/mynextstep/documentupload/file-picker.template.html',
                    controller: function () {
                        return new consumersite.FilePickerController(_this.enums, filePickerModal, _this.templateRoot);
                    },
                    controllerAs: 'filePickerCtrl',
                    backdrop: true,
                    backdropClass: 'noBackdrop',
                    windowClass: 'file-picker-flyout'
                });
                var tempLoanId = _this.loan.loanId;
                var tempCurrentUserId = _this.loan.loanApp.borrower.userAccountId; // this._currentUserId;  this.userAccount.userAccountId;// 
                var tempBorrowerId = _this.loan.loanApp.borrower.borrowerId;
                var tempUploadedByConsumer = 1;
                filePickerModal.result.then(function (newFiles) {
                    if (newFiles) {
                        //13 == VariousDocuments
                        var docCategory = _this.applicationData.documentCategories.find(function (documentCategory) {
                            return documentCategory.documentClassId == 13 && documentCategory.name == 'Others';
                        });
                        var newDocs = [];
                        _this.blockUI.start('Uploading files..');
                        _this.uploadFilesSvc.uploadFiles(tempLoanId, tempCurrentUserId, tempBorrowerId, docCategory.categoryId, newFiles, tempUploadedByConsumer).then(function (data) {
                            _this.blockUI.stop();
                            _this.reloadUploadDocuments();
                            //this.uploadedDocuments = this.uploadedDocuments.concat(this.getNewUploadedDocuments(newFiles));                                
                            _this.setPrimaryAfterUploadFile();
                        }).catch(function (err) {
                            _this.blockUI.stop();
                            _this.$log.error('Document save error.');
                            alert('Your documents could not be uploaded. Please try again.');
                        });
                    }
                    ;
                }, 
                //cancel
                function () {
                });
            };
            this.setPrimaryAfterUploadFile = function () {
                if (_this.canDownloadDocPrintSign && !_this.hasDownloadedDocPrintSign) {
                    _this.isDownloadDocPrintSignPrimary = true;
                    _this.isChooseFileToUploadPrimary = false;
                    _this.isNextPagePrimary = false;
                }
                else {
                    _this.isDownloadDocPrintSignPrimary = false;
                    _this.isChooseFileToUploadPrimary = false;
                    _this.isNextPagePrimary = true;
                }
            };
            this.setDocumentLists = function () {
                if (_this._documentsEnvelope) {
                    _this.borrowersNeeds = _this._documentsEnvelope.borrowersNeedsList;
                    _this.rejectedDocuments = _this._documentsEnvelope.rejectedDocumentsList;
                    _this.uploadedDocuments = _this._documentsEnvelope.uploadedDocumentsList;
                    // ----------------------------------------------
                    // Wet Signature
                    _this.canDownloadDocPrintSign = _this._documentsEnvelope.wetSignaturePackageExists;
                    if (_this.canDownloadDocPrintSign) {
                        _this.isDownloadDocPrintSignPrimary = true;
                        _this.isChooseFileToUploadPrimary = false;
                        _this.isNextPagePrimary = false;
                    }
                    else {
                        _this.isDownloadDocPrintSignPrimary = false;
                        _this.isChooseFileToUploadPrimary = true;
                        _this.isNextPagePrimary = false;
                    }
                    _this.wetSignaturePackageDocumentId = _this._documentsEnvelope.wetSignaturePackageDocumentId;
                    // ----------------------------------------------
                    // Fax CoverSheet
                    _this._hasFaxCoverSheetDocument = _this._documentsEnvelope.faxCoverSheetExists;
                    if (_this._hasFaxCoverSheetDocument) {
                        _this._faxCoverSheetDocumentId = _this._documentsEnvelope.faxCoverSheetDocumentId;
                    }
                }
            };
            this.getDocumentListBorrowersNeeds = function () {
                _this.wetSignaturePackageDocumentId = "";
                _this._faxCoverSheetDocumentId = "";
                var req = new srv.cls.DocumentListRequestEnvelope();
                req.loanApplicationId = _this.loan.loanApp.loanApplicationId;
                req.loanId = _this.loan.loanId;
                req.userAccountId = _this._currentUserId;
                req.documentListType = 1;
                req.isBorrowersNeedsRequested = true;
                req.isRejectedDocumentsRequested = true;
                req.isUploadedDocumentsRequested = true;
                req.isWetSignaturePackageRequested = true;
                req.isFaxCoverSheetRequested = true;
                _this.DocumentsService.getDocumentList(req).$promise.then((function (data) {
                    if (data != null) {
                        _this._documentsEnvelope = data;
                        _this.setDocumentLists();
                    }
                }), function (error) {
                    _this.$log.error('Failure in Document Type retrieval', error);
                });
            };
            this.continueToNextPageCommand = function () {
                _this.navigationService.goToDashboard(_this.loan.loanId);
            };
            this.reloadUploadDocuments = function () {
                var req = new srv.cls.DocumentListRequestEnvelope();
                req.loanApplicationId = _this.loan.loanApp.loanApplicationId;
                req.loanId = _this.loan.loanId;
                req.userAccountId = _this._currentUserId;
                req.documentListType = 1;
                req.isBorrowersNeedsRequested = false;
                req.isRejectedDocumentsRequested = false;
                req.isUploadedDocumentsRequested = true;
                req.isWetSignaturePackageRequested = false;
                req.isFaxCoverSheetRequested = false;
                _this.DocumentsService.getDocumentList(req).$promise.then((function (data) {
                    if (data != null) {
                        _this.uploadedDocuments = data.uploadedDocumentsList;
                        _this._documentsEnvelope.uploadedDocumentsList = _this.uploadedDocuments;
                        _this.documentCacheService.setUploadDocuments(_this.uploadedDocuments);
                    }
                }), function (error) {
                    _this.$log.error('Failure in Document Type retrieval', error);
                });
            };
            this._currentUserId = apiServiceAccountId;
            this._uploadedDocuments = [];
            this._borrowersNeeds = [];
            this._rejectedDocuments = [];
            this._canDownloadDocPrintSign = false;
            this._hasBorrowersNeeds = false;
            this._hasRejectedDocuments = false;
            this._wetSignaturePackageDocumentId = "";
            this._hasDownloadedDocPrintSign = false;
            this._isDownloadDocPrintSignPrimary = false;
            this._isChooseFileToUploadPrimary = false;
            this._isNextPagePrimary = false;
            this._hasFaxCoverSheetDocument = false;
            this._faxCoverSheetDocumentId = "";
            this._modalShown = false;
            this._loanId = this.loan.loanId;
            documentCacheService.getDocuments(function (documents) {
                _this._documentsEnvelope = documents;
                _this.setDocumentLists();
            });
        }
        Object.defineProperty(DocumentUploadController.prototype, "titleRequestedDocuments", {
            get: function () {
                return "Review My List of Requested Documents";
            },
            set: function (value) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "titleChooseFilesToSend", {
            get: function () {
                return "Choose Files to Send";
            },
            set: function (value) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "titleRejectedDocuments", {
            get: function () {
                return "Incomplete Documents";
            },
            set: function (value) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "titleUploadHistory", {
            get: function () {
                return "Upload History";
            },
            set: function (value) {
                /*Read-Only*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "uploadedDocuments", {
            get: function () {
                return this._uploadedDocuments;
            },
            set: function (value) {
                this._uploadedDocuments = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "borrowersNeeds", {
            get: function () {
                return this._borrowersNeeds;
            },
            set: function (value) {
                this._borrowersNeeds = value;
                this.hasBorrowersNeeds = false;
                if (this._borrowersNeeds != null && this._borrowersNeeds != undefined) {
                    if (this._borrowersNeeds.length > 0) {
                        this.hasBorrowersNeeds = true;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "rejectedDocuments", {
            get: function () {
                return this._rejectedDocuments;
            },
            set: function (value) {
                this._rejectedDocuments = value;
                this.hasRejectedDocuments = false;
                if (this._rejectedDocuments != null && this._rejectedDocuments != undefined) {
                    if (this._rejectedDocuments.length > 0) {
                        this.hasRejectedDocuments = true;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "modalShown", {
            get: function () {
                return this._modalShown;
            },
            set: function (value) {
                this._modalShown = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "canDownloadDocPrintSign", {
            get: function () {
                return this._canDownloadDocPrintSign;
            },
            set: function (value) {
                this._canDownloadDocPrintSign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "wetSignaturePackageDocumentId", {
            get: function () {
                return this._wetSignaturePackageDocumentId;
            },
            set: function (value) {
                this._wetSignaturePackageDocumentId = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "hasBorrowersNeeds", {
            get: function () {
                return this._hasBorrowersNeeds;
            },
            set: function (value) {
                this._hasBorrowersNeeds = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "hasRejectedDocuments", {
            get: function () {
                return this._hasRejectedDocuments;
            },
            set: function (value) {
                this._hasRejectedDocuments = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "hasDownloadedDocPrintSign", {
            get: function () {
                return this._hasDownloadedDocPrintSign;
            },
            set: function (value) {
                this._hasDownloadedDocPrintSign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "isDownloadDocPrintSignPrimary", {
            // Primary Button.  Set / Get
            get: function () {
                return this._isDownloadDocPrintSignPrimary;
            },
            set: function (value) {
                this._isDownloadDocPrintSignPrimary = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "isChooseFileToUploadPrimary", {
            get: function () {
                return this._isChooseFileToUploadPrimary;
            },
            set: function (value) {
                this._isChooseFileToUploadPrimary = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentUploadController.prototype, "isNextPagePrimary", {
            get: function () {
                return this._isNextPagePrimary;
            },
            set: function (value) {
                this._isNextPagePrimary = value;
            },
            enumerable: true,
            configurable: true
        });
        DocumentUploadController.className = "documentUploadController";
        DocumentUploadController.$inject = ['loan', 'applicationData', '$uibModal', 'uploadFilesSvc', '$log', 'enums', 'uiBlockWithSpinner', '$q', 'apiServiceAccountId', 'templateRoot', 'navigationService', 'DocumentsService', 'blockUI', 'userAccount', 'documentCacheService'];
        return DocumentUploadController;
    })();
    consumersite.DocumentUploadController = DocumentUploadController;
    moduleRegistration.registerController(consumersite.moduleName, DocumentUploadController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=documentUpload.controller.js.map