var consumersite;
(function (consumersite) {
    var DocumentCacheService = (function () {
        // private gears;
        function DocumentCacheService($log, apiServiceAccountId, DocumentsService, uiBlockWithSpinner) {
            var _this = this;
            this.$log = $log;
            this.DocumentsService = DocumentsService;
            this.uiBlockWithSpinner = uiBlockWithSpinner;
            this._documents = null;
            this._loan = null;
            this.getDocuments = function (documentsCallback) {
                if (_this._documents) {
                    documentsCallback(_this._documents);
                }
                else {
                    // start gears....
                    //this._documents = documentsCallback;
                    //this.loadDocuments();
                    var req = new srv.cls.DocumentListRequestEnvelope();
                    req.loanApplicationId = _this._loan.loanApp.loanApplicationId;
                    req.loanId = _this._loan.loanId;
                    req.userAccountId = _this._currentUserId;
                    req.documentListType = 1;
                    req.isBorrowersNeedsRequested = true;
                    req.isRejectedDocumentsRequested = true;
                    req.isUploadedDocumentsRequested = true;
                    req.isWetSignaturePackageRequested = true;
                    req.isFaxCoverSheetRequested = true;
                    //this.DocumentsService.getDocumentList(req).$promise.then((data => {
                    //    if (data != null) {
                    //        this._documents = data;
                    //    }
                    //}),
                    //    (error) => {
                    //        this.$log.error('Failure in Document Type retrieval', error);
                    //    });
                    _this.uiBlockWithSpinner.callWithGears(function () { return _this.DocumentsService.getDocumentList(req).$promise; }, 'Getting Documents. Please Wait.', function (data) {
                        if (data != null) {
                            _this._documents = data;
                            documentsCallback(_this._documents);
                        }
                    });
                }
            };
            this.setUploadDocuments = function (docs) {
                _this._documents.uploadedDocumentsList = docs;
            };
            this._currentUserId = apiServiceAccountId;
        }
        DocumentCacheService.prototype.setLoan = function (loan) {
            this._loan = loan;
        };
        DocumentCacheService.prototype.loadDocuments = function () {
            var _this = this;
            this._documents = null;
            var req = new srv.cls.DocumentListRequestEnvelope();
            req.loanApplicationId = this._loan.loanApp.loanApplicationId;
            req.loanId = this._loan.loanId;
            req.userAccountId = this._currentUserId;
            req.documentListType = 1;
            req.isBorrowersNeedsRequested = true;
            req.isRejectedDocumentsRequested = true;
            req.isUploadedDocumentsRequested = true;
            req.isWetSignaturePackageRequested = true;
            req.isFaxCoverSheetRequested = true;
            this.DocumentsService.getDocumentList(req).$promise.then((function (data) {
                if (data != null) {
                    _this._documents = data;
                }
            }), function (error) {
                _this.$log.error('Failure in Document Type retrieval', error);
            });
        };
        DocumentCacheService.className = 'documentCacheService';
        DocumentCacheService.$inject = ['$log', 'apiServiceAccountId', 'DocumentsService', 'uiBlockWithSpinner'];
        return DocumentCacheService;
    })();
    consumersite.DocumentCacheService = DocumentCacheService;
    moduleRegistration.registerService(consumersite.moduleName, DocumentCacheService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=document.cache.service.js.map