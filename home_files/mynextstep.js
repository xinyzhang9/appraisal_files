var consumersite;
(function (consumersite) {
    var DisplayMilestone;
    (function (DisplayMilestone) {
        DisplayMilestone[DisplayMilestone["unknown"] = 0] = "unknown";
        DisplayMilestone[DisplayMilestone["application"] = 1] = "application";
        DisplayMilestone[DisplayMilestone["disclosures"] = 2] = "disclosures";
        DisplayMilestone[DisplayMilestone["processing"] = 3] = "processing";
        //underwriting, // waiting on this one...
        DisplayMilestone[DisplayMilestone["approved"] = 4] = "approved";
        DisplayMilestone[DisplayMilestone["signDocs"] = 5] = "signDocs";
        DisplayMilestone[DisplayMilestone["funded"] = 6] = "funded";
        DisplayMilestone[DisplayMilestone["adverse"] = 7] = "adverse";
    })(DisplayMilestone || (DisplayMilestone = {}));
    var ConsumerLoanCenterMileStone = (function () {
        function ConsumerLoanCenterMileStone(currentMileStone) {
            var _this = this;
            //        //My Milestones
            this.loadMileStoneStatus = function (currentMileStone) {
                var index = lib.findIndex(_this._mileStoneStatuses, function (ms) { return ms.loanMilestone == currentMileStone; }, 0);
                _this._currentMilestone = _this._mileStoneStatuses[index].displayMilestone;
                for (var i = 0; i < index; i++) {
                    _this._mileStoneStatuses[i].hasCompleted = true;
                }
            };
            this.isApplicationActive = function () {
                return _this.isMilestoneActive(1 /* application */);
            };
            this.isDisclosuresActive = function () {
                return _this.isMilestoneActive(2 /* disclosures */);
            };
            this.isProcessingActive = function () {
                return _this.isMilestoneActive(3 /* processing */);
            };
            this.isApprovedActive = function () {
                return _this.isMilestoneActive(4 /* approved */);
            };
            this.isSignDocsActive = function () {
                return _this.isMilestoneActive(5 /* signDocs */);
            };
            this.isAdverseActive = function () {
                return _this.isMilestoneActive(7 /* adverse */);
            };
            this.isMilestoneActive = function (val) {
                return _this._currentMilestone == val;
            };
            this.isApplicationComplete = function () {
                return _this.isMilestoneComplete(1 /* application */);
            };
            this.isDisclosuresComplete = function () {
                return _this.isMilestoneComplete(2 /* disclosures */);
            };
            this.isProcessingComplete = function () {
                return _this.isMilestoneComplete(3 /* processing */);
            };
            this.isApprovedComplete = function () {
                return _this.isMilestoneComplete(4 /* approved */);
            };
            this.isSignDocsComplete = function () {
                return _this.isMilestoneComplete(5 /* signDocs */);
            };
            this.isFundedComplete = function () {
                return _this._currentMilestone == 6 /* funded */;
            };
            this.isMilestoneComplete = function (val) {
                return val < _this._currentMilestone;
            };
            this._mileStoneStatuses = [
                { loanMilestone: 1 /* prospect */, displayMilestone: 1 /* application */, hasCompleted: false },
                { loanMilestone: 4 /* preApproved */, displayMilestone: 1 /* application */, hasCompleted: false },
                { loanMilestone: 2 /* incomplete */, displayMilestone: 2 /* disclosures */, hasCompleted: false },
                { loanMilestone: 15 /* appCompleted */, displayMilestone: 2 /* disclosures */, hasCompleted: false },
                { loanMilestone: 3 /* processing */, displayMilestone: 3 /* processing */, hasCompleted: false },
                { loanMilestone: 16 /* underwriting */, displayMilestone: 3 /* processing */, hasCompleted: false },
                { loanMilestone: 5 /* approved */, displayMilestone: 4 /* approved */, hasCompleted: false },
                { loanMilestone: 6 /* docsOut */, displayMilestone: 5 /* signDocs */, hasCompleted: false },
                { loanMilestone: 8 /* funded */, displayMilestone: 6 /* funded */, hasCompleted: false },
                { loanMilestone: 14 /* adverse */, displayMilestone: 7 /* adverse */, hasCompleted: false },
            ];
            this.getMileStones = function () {
                return _this._mileStoneStatuses;
            };
            //TODO: Reconsider implementation on load.
            this.loadMileStoneStatus(currentMileStone);
        }
        ConsumerLoanCenterMileStone.prototype.getDisplayMilestoneProgress = function () {
            switch (this._currentMilestone) {
                case 1 /* application */: return 1 / 6;
                case 2 /* disclosures */: return 2 / 6;
                case 3 /* processing */: return 3 / 6;
                case 4 /* approved */: return 4 / 6;
                case 5 /* signDocs */: return 5 / 6;
                case 6 /* funded */: return 6 / 6;
                default: return 0;
            }
        };
        ConsumerLoanCenterMileStone.className = 'ConsumerLoanCenterMileStone';
        return ConsumerLoanCenterMileStone;
    })();
    consumersite.ConsumerLoanCenterMileStone = ConsumerLoanCenterMileStone;
})(consumersite || (consumersite = {}));
//# sourceMappingURL=mynextstep.milestone.js.map