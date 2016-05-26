/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var displayMilestone;
    (function (displayMilestone) {
        displayMilestone[displayMilestone["application"] = 0] = "application";
        displayMilestone[displayMilestone["disclosures"] = 1] = "disclosures";
        displayMilestone[displayMilestone["processing"] = 2] = "processing";
        displayMilestone[displayMilestone["underwriting"] = 3] = "underwriting";
        displayMilestone[displayMilestone["approved"] = 4] = "approved";
        displayMilestone[displayMilestone["signDocs"] = 5] = "signDocs";
        displayMilestone[displayMilestone["funded"] = 6] = "funded";
    })(displayMilestone || (displayMilestone = {}));
    var Milestone = (function () {
        function Milestone() {
        }
        return Milestone;
    })();
    consumersite.Milestone = Milestone;
    var MyLoansController = (function () {
        function MyLoansController(templateRoot, loanSnapShotService, applicationData, navigationService) {
            //var loanStatus = this.getConsumerLoanStatus(srv.milestoneStatus.processing);
            var _this = this;
            this.templateRoot = templateRoot;
            this.loanSnapShotService = loanSnapShotService;
            this.applicationData = applicationData;
            this.navigationService = navigationService;
            this._consumerMilestoneNames = ["Application", "Disclosures", "Processing", "Approved", "SignDocs", "Funded"];
            this._milestoneStatuses = [
                { value: 1 /* prospect */, text: "Application" },
                { value: 4 /* preApproved */, text: "Application" },
                { value: 2 /* incomplete */, text: "Disclosures" },
                { value: 15 /* appCompleted */, text: "Disclosures" },
                { value: 3 /* processing */, text: "Processing" },
                { value: 16 /* underwriting */, text: "Processing" },
                { value: 5 /* approved */, text: "Approved" },
                { value: 6 /* docsOut */, text: "SignDocs" },
                { value: 8 /* funded */, text: "Funded" },
            ];
            this.getMileStones = function () {
                return _this._milestoneStatuses;
            };
            this.getConsumerLoanStatus = function (loanSnapshot) {
                var loanCenterStatus = _this.getLoanCurrentStatus(loanSnapshot);
                for (var i = 0; i < _this._milestoneStatuses.length; i++) {
                    if (_this._milestoneStatuses[i].value == loanCenterStatus) {
                        return _this._milestoneStatuses[i].text;
                    }
                }
            };
            this.getLoanPurposeType = function (loanSnapshot) {
                var lookupItem = _.find(_this.applicationData.lookup.loanTransactionTypes, function (item) {
                    return item.value === String(loanSnapshot.loanPurpose);
                });
                return lookupItem ? lookupItem.text : '';
            };
            this.getLoanCurrentStatus = function (loanSnapshot) {
                var lookupItem = _.find(_this.applicationData.lookup.milestonestatuses, function (item) {
                    return item.value === String(loanSnapshot.currentMilestone);
                });
                // return lookupItem ? lookupItem.text : '';
                return lookupItem ? lookupItem.value : -1;
            };
            this.getLoanPurposeTypes = function () {
                return _this.applicationData.lookup.loanTransactionTypes;
            };
            this.getMilestoneStatusTypes = function () {
                return _this.applicationData.lookup.milestonestatuses;
            };
            //A service will be created to calulate this value.
            this.getProgressPercent = function (loanSnapshot) {
                var loanCenterStatus = _this.getLoanCurrentStatus(loanSnapshot);
                for (var i = 0; i < _this._milestoneStatuses.length; i++) {
                    if (_this._milestoneStatuses[i].value == loanCenterStatus) {
                        var milestoneText = _this._milestoneStatuses[i].text;
                        for (var j = 0; j < _this._consumerMilestoneNames.length; j++) {
                            if (_this._consumerMilestoneNames[j] == milestoneText) {
                                return (j + 1) / _this._consumerMilestoneNames.length;
                            }
                        }
                    }
                }
                //var percentageComplete = consumersite.getLoanApplicationProgressPercentage(loanSnapshot.currentMilestone, this._mileStoneStatuses);
                ///var percent = Math.floor((Math.random() * 100) + 1) / 100;
                //return 0.35;
            };
            this.addNewLoan = function () {
                //this.navigationService.goToPricing();
                _this.navigationService.goToLoanPurpose();
            };
            this.goToLoan = function (loanId) {
                _this.navigationService.loanLoan(loanId);
            };
        }
        Object.defineProperty(MyLoansController.prototype, "myLoans", {
            get: function () {
                return this.loanSnapShotService.loanSnapShotsList;
            },
            enumerable: true,
            configurable: true
        });
        MyLoansController.className = "myLoansController";
        MyLoansController.$inject = ['templateRoot', 'loanSnapShotService', 'applicationData', 'navigationService'];
        return MyLoansController;
    })();
    consumersite.MyLoansController = MyLoansController;
    moduleRegistration.registerController(consumersite.moduleName, MyLoansController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=myLoans.controller.js.map