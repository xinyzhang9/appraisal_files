(function () {
    'use strict';

    angular.module('docVault').factory('docVaultSvc', docVaultSvc);

    docVaultSvc.$inject = ['$log', '$resource', 'apiRoot', 'modalPopoverFactory', '$modal', 'enums', '$q', '$controller', '$interval', '$injector', '$state'];

    function docVaultSvc($log, $resource, ApiRoot, modalPopoverFactory, $modal, enums, $q, $controller, $interval, $injector, $state) {
        var docVaultApiPath = ApiRoot + 'DocVault/';
        var docVaultServiceApiPath = ApiRoot + 'DocVaultService/';

        var docVaultButtonSelected = 0;

        var vm = this;

        var documentCtrl = angular.extend(this, $controller('DocumentCtrl', { $scope: vm }));

        function setDocVaultButtonSelected(value) {
            docVaultButtonSelected = value;
        }

        function getDocVaultButtonSelected() {
            return docVaultButtonSelected;
        }

        function openDocVaultMenu(event, wrappedLoan, document, groupedDocuments) {
            vm.wrappedLoan = wrappedLoan;
            vm.groupedDocuments = groupedDocuments;

            var menuPopup = modalPopoverFactory.openModalPopover('angular/documents/docvault/docvaultmenu.html', this, document, event);
        }

        function openDocVaultFlyoutMenu(event, document) {
            return modalPopoverFactory.openModalPopover('angular/documents/docvault/docvaultflyoutmenu.html', this, document, event);
        }

        function refreshDocVault(loan) {
            // DocVault: Refresh documents asynchronously. This does not block UI.
            if ($state.current.name != 'loanCenter.loan.documents.docvault') {
                preLoadDocumentsAsync(loan, -1);//userAccountId);  TODO: Rihad - get correct UserAccoutId here
            }
            else {
                // If current state is docvault then force reload documents
                loan.documents.documentsLoaded = false;
                $state.go('loanCenter.loan.refresh', {
                    page: 'loanCenter.loan.documents.docvault'
                });
            }
        }

        function groupDocuments(documents, isFlyout) {

            var extDocuments = [];

            if (documents != null) {
                for (var i = 0; i < documents.length; i++)
                    extDocuments.push(new cls.DocVaultDocumentViewModel(documents[i]));
            }

            var groupedDocuments = new lib.referenceWrapper(_.groupBy(_.where(extDocuments, { deleted: false }), 'categorySortName'));

            if (_.size(groupedDocuments.ref) && !isFlyout) {
                groupedDocuments.ref[Object.keys(groupedDocuments.ref).sort()[0]].isExpanded = true;
            }

            if ("01Unclassified" in groupedDocuments.ref) {
                groupedDocuments.ref["01Unclassified"].isUnclassified = true;
            }

            if ("03Individual Disclosures - Signed" in groupedDocuments.ref) {
                groupedDocuments.ref["03Individual Disclosures - Signed"].forEach(correctBorrowerNaming);
            }

            return groupedDocuments;
        }

        function correctBorrowerNaming(element, index, array) {
            var borrowerName = null;
            for (var i = 0; i < element.metadata.length; i++) {
                if (element.metadata[i].key == "Borrower Name(s)")
                    borrowerName = element.metadata[i].value;
            }
            if (borrowerName != null){
                element.updatedBy = borrowerName;
            }
        }

        //get grouped docvault documents, but keep category expansion state from current view
        function refreshGroupedDocuments(docVaultDocuments, groupedDocuments) {
            
            var newGroupedDocuments = groupDocuments(docVaultDocuments, false);

            for (var key in groupedDocuments.ref) {
                newGroupedDocuments.ref[key].isExpanded = groupedDocuments.ref[key].isExpanded;
            }

            return newGroupedDocuments;
        }

        function showDocuments(docVaultDocuments,category) {
            vm.groupedDocuments.ref = _.groupBy(_.where(docVaultDocuments, { deleted: false }), 'categorySortName');
            var groupsNum = _.size(vm.groupedDocuments.ref);
            if (groupsNum && vm.groupedDocuments.ref[documentSortName(category)]) {
                vm.groupedDocuments.ref[documentSortName(category)].isExpanded = true;
            }
            else {
                vm.groupedDocuments.ref[Object.keys(vm.groupedDocuments.ref).sort()[0]].isExpanded = true;
            }

            if ("01Unclassified" in vm.groupedDocuments.ref) {
                vm.groupedDocuments.ref["01Unclassified"].isUnclassified = true;
            }

            return vm.groupedDocuments;
        }

        function classifyDocument(event, document) {
            showDocumentClassificationPopup(document, event).then(function (data) {
                showDocuments(vm.wrappedLoan.ref.documents.docVaultDocuments);
            }, function (error) {
                
            });
        }

        function showDocumentClassificationPopup(document, event) {
            var documentTypes;
            var q = $q.defer();

            DocumentsServices.GetDocTypeFields().$promise.then(
                function (data) {
                    documentTypes = data.documentTypes;

                    var classifyPopup = $modal.open({
                        templateUrl: 'angular/documents/docvault/docvaultclassify.html',
                        controller: 'docVaultClassifyController as controller',
                        windowClass: 'imp-center-modal docvault-classifydocument-popup',
                        backdrop: 'static',
                        resolve: {
                            documentTypes: function () {
                                return documentTypes
                            },
                            wrappedLoan: function () {
                                return vm.wrappedLoan;
                            },
                            document: function () {
                                return document;
                            }
                        }
                    });

                    classifyPopup.result.then(function (classifiedDocument) {
                        for (var i = 0; i < vm.wrappedLoan.ref.documents.docVaultDocuments.length; i++) {
                            if (vm.wrappedLoan.ref.documents.docVaultDocuments[i].uploadedFileId == classifiedDocument.uploadedFileId) {
                                //Documents
                                vm.wrappedLoan.ref.documents.docVaultDocuments[i] = classifiedDocument;
                                q.resolve(vm.wrappedLoan);
                            }
                        }
                    },
                    function (error) {
                        if (error != 'cancel')
                            $log.error('Failure in Document Classification', error);
                        q.reject(error);
                    });
                },
                function (error) {
                    $log.error('Failure in Document Type retrieval', error);
                });
            return q.promise;
        }

        function rejectDocument(document) {
            if (vm.wrappedLoan.ref.documents.docVaultDocuments == null) {
                return null;
            }

            for (var i = 0; i < vm.wrappedLoan.ref.documents.docVaultDocuments.length; i++) {
                if (vm.wrappedLoan.ref.documents.docVaultDocuments[i].uploadedFileId == document.uploadedFileId) {
                    //Documents
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].status = enums.uploadedFileStatus.rejected;
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].modified = true;
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].classified = true;
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].categorySortName = "04Rejected";
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].rejectReasonEdit = true;
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].rejected = true;
                    showDocuments(vm.wrappedLoan.ref.documents.docVaultDocuments, vm.wrappedLoan.ref.documents.docVaultDocuments[i].category);
                }
            }
        }

        function documentStatusChanged(wrappedLoan, groupedDocuments, document, category) {
            vm.wrappedLoan = wrappedLoan;
            vm.groupedDocuments = groupedDocuments;

            for (var i = 0; i < vm.wrappedLoan.ref.documents.docVaultDocuments.length; i++) {
                if (vm.wrappedLoan.ref.documents.docVaultDocuments[i].uploadedFileId == document.uploadedFileId) {
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].modified = true;
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].rejected = false;
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].rejectReason = '';
                    vm.wrappedLoan.ref.documents.docVaultDocuments[i].status = document.status;
                    if (document.status == enums.uploadedFileStatus.inReview)
                        vm.wrappedLoan.ref.documents.docVaultDocuments[i].submitToEdgeMac = false;
                    if (document.status == enums.uploadedFileStatus.rejected)
                        rejectDocument(document);
                    else if (document.categorySortName == "04Rejected") {
                        document.categorySortName = documentSortName(document.category);
                    }

                    showDocuments(vm.wrappedLoan.ref.documents.docVaultDocuments);
                }
            }
        }

        function documentBorrowerViewableChanged(wrappedLoan, document) {
            vm.wrappedLoan = wrappedLoan;

            var doc = lib.findFirst(vm.wrappedLoan.ref.documents.docVaultDocuments, function (x) { return x.repositoryId == document.repositoryId });
            doc.borrowerViewable = document.borrowerViewable;
            doc.modified = true;
        }

        function documentSelectedChanged(category, groupedDocuments) {

            groupedDocuments.ref[category].classifyEnabled = groupedDocuments.ref[category].some(function (e) { return e.submitToEdgeMac == true });
            groupedDocuments.ref[category].importEnabled = groupedDocuments.ref[category].some(function (e) { return e.shouldImport == true })
            groupedDocuments.ref[category].selectedAll = isSelectedAll(groupedDocuments, category);
            groupedDocuments.ref[category].borrowerViewable = groupedDocuments.ref[category].some(function (e) { return e.borrowerViewable == true })
        }

        function downloadDocument(repositoryId) {
            documentCtrl.DownloadDocument(repositoryId);
        }

        function openDocument(repositoryId, inBrowser, inTab) {
            documentCtrl.OpenDocument(repositoryId, inBrowser, inTab);
        }

        function browserSupported(contentType) {
            if (contentType == "pdf")
                return true;

            return false;
        }

        function isSelectedAll(groupedDocuments, category) {
            return !groupedDocuments.ref[category].some(function (e) { return e.submitToEdgeMac == false && !selectDisabled(e) })
        }

        function selectDisabled(document) {
            if (document.status == enums.uploadedFileStatus.inReview || !edgeMacSupported(document.contentType))
                return true;

            return false;
        }

        function edgeMacSupported(contentType) {
            if (contentType == "pdf" || contentType == "doc" || contentType == "docx" || contentType == "tif")
                return true;

            return false;
        }

        function documentSortName(category) {
            if (common.string.isNullOrWhiteSpace(category)) {
                category = '';
            }

            switch (category.toLowerCase()) {
                case "unclassified":
                    return "01" + category;
                case "unassigned":
                    return "02" + category;
                case "rejected":
                    return "04" + category;
                default:
                    return "03" + category;
            }
        }

        function formatCategoryName(categoryName) {
            if (common.string.isNullOrWhiteSpace(categoryName)) {
                return categoryName;
            }
            return categoryName.replace("01", "").replace("02", "").replace("03", "").replace("04", "");
        }

        function toggleGrid(isExpanded, documentsRef) {
            for (var key in documentsRef) {
                if (documentsRef.hasOwnProperty(key))
                    documentsRef[key].isExpanded = isExpanded;
            }
        }

        function importDocs(groupedDocuments, loanId, borrowerId, userAccountId) {
            if (groupedDocuments == null)
                return;

            var importDocuments = [];

            for (var key in groupedDocuments.ref) {
                for (var i = 0; i < groupedDocuments.ref[key].length; i++) {
                    if (groupedDocuments.ref[key][i].shouldImport) {
                        importDocuments.push(groupedDocuments.ref[key][i]);
                    }
                }
            }

            var docVaultViewModel = { DocVaultDocuments: importDocuments };
            return DocumentsServices.ImportDocuments({ userAccountId: userAccountId, loanId: loanId, borrowerId: borrowerId }, docVaultViewModel);
        }

        ///Pre-loads documents asynchronously, if not already loaded
        function preLoadDocumentsAsync(loan, userAccountId) {
            var documents = { docVaultDocuments: [] };
            var promises = [];

            angular.forEach(loan.getLoanApplications(), function (loanApplication) {
                promises.push(DocumentsServices.GetDocVaultData({ loanId: loanApplication.loanApplicationId, userAccountId: userAccountId }).$promise);
            });

            $q.all(promises).then(function (data) {
                angular.forEach(data, function (object) {
                    documents.docVaultDocuments = documents.docVaultDocuments.concat(object.docVaultDocuments);
                })

                loan.documents = documents;
                loan.documents.documentsLoaded = true;
            },
            function (errorMsg) {
                console.log("Error:" + JSON.stringify(errorMsg));
            });

        }

        function checkDocumentStatuses(applicationData, groupedDocuments, documents) {
            for (var key in groupedDocuments.ref) {
                for (var i = 0; i < groupedDocuments.ref[key].length; i++) {
                    if (groupedDocuments.ref[key][i].exportDocumentToEncompassStatus == 1) {
                        checkEncompassStatusForDocument(applicationData, groupedDocuments.ref[key][i], documents);
                    }
                }
            }
        }

        function checkEncompassStatusForDocument(applicationData, document, documents) {
            // inject encopmassSvc at runtime because of circular dependency
            var encompassSvc;
            if (!encompassSvc) { encompassSvc = $injector.get('encompassSvc'); }

            var selectedDocument = lib.findFirst(documents, function (x) { return x.documentId == document.documentId });

            var counter = 1;
            var timeOut = 500;

            var timer = $interval(function () {
                encompassSvc.GetExportDocumentToEncompassRequestCompleted(document.restRequestId).then(
                    function (result) {
                        if (result.data == 2) {
                            addDocumentHistory(applicationData, document, "Exported");
                            $interval.cancel(timer);
                            document.exportDocumentToEncompassStatus = result.data
                            document.runningExportToEncompass = false;
                            selectedDocument.exportDocumentToEncompassStatus = result.data
                            selectedDocument.runningExportToEncompass = false;
                        }
                        if (result.data == 3) {
                            addDocumentHistory(applicationData, document, "Export Failed");
                            $interval.cancel(timer);
                            document.exportDocumentToEncompassStatus = result.data
                            document.runningExportToEncompass = false;
                            selectedDocument.exportDocumentToEncompassStatus = result.data
                            selectedDocument.runningExportToEncompass = false;
                        }
                        if (counter * 5 > timeOut) {
                            $interval.cancel(timer);
                            document.runningExportToEncompass = false;
                            document.exportDocumentToEncompassStatus = 3;
                            selectedDocument.runningExportToEncompass = false;
                            selectedDocument.exportDocumentToEncompassStatus = 3;
                        }
                        counter++;
                    },
                    function (error) {
                        //handle error
                        addDocumentHistory(applicationData, document, "Export Failed");
                        $interval.cancel(timer);
                        document.runningExportToEncompass = false;
                    });

            }, 5000);
        }

        function addDocumentHistory(applicationData, document, status) {
            document.documentHistory.unshift({ modifiedBy: applicationData.currentUser.firstName + ' ' + applicationData.currentUser.lastName, statusChange: status, modifiedDate: new Date().format("M/d/yyyy h:mm:ss tt") });
        }

        var DocumentsServices = $resource(docVaultApiPath + ':path', { path: '@path' }, {
            GetDocVaultData: { method: 'GET', params: { loanId: 'loanId', userAccountId: 'userAccountId' } },
            SaveDocVaultData: { method: 'POST', params: { userAccountId: 'userAccountId' } },
            GetDocTypeFields: { method: 'GET', params: {} },
            ImportDocuments: { method: 'POST', params: { userAccountId: 'userAccountId', loanId: 'loanId', borrowerId: 'borrowerId' }, url: docVaultApiPath + 'ImportDocuments' }
        });

        var DocVaultServices = $resource(docVaultServiceApiPath + ':path', { path: '@path' }, {
            FilterByLoanNumber: { method: 'GET', params: { loanNumber: 'loanNumber', counter: 'counter', currentUserId: 'currentUserId' } }
        });

        var documentsService =
        {
            DocumentsServices: DocumentsServices,
            DocVaultServices: DocVaultServices,
            classifyDocument: classifyDocument,
            rejectDocument: rejectDocument,
            showDocuments: showDocuments,
            openDocVaultMenu: openDocVaultMenu,
            openDocVaultFlyoutMenu: openDocVaultFlyoutMenu,
            documentStatusChanged: documentStatusChanged,
            documentSelectedChanged: documentSelectedChanged,
            documentBorrowerViewableChanged: documentBorrowerViewableChanged,
            selectDisabled: selectDisabled,
            downloadDocument: downloadDocument,
            browserSupported: browserSupported,
            openDocument: openDocument,
            isSelectedAll: isSelectedAll,
            formatCategoryName: formatCategoryName,
            groupDocuments: groupDocuments,
            toggleGrid: toggleGrid,
            importDocs: importDocs,
            preLoadDocumentsAsync: preLoadDocumentsAsync,
            setDocVaultButtonSelected: setDocVaultButtonSelected,
            getDocVaultButtonSelected: getDocVaultButtonSelected,
            refreshGroupedDocuments: refreshGroupedDocuments,
            checkEncompassStatusForDocument: checkEncompassStatusForDocument,
            checkDocumentStatuses: checkDocumentStatuses,
            refreshDocVault: refreshDocVault
        };


        return documentsService;
    };

})();


