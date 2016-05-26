var consumersite;
(function (consumersite) {
    var LeadSourceService = (function () {
        function LeadSourceService() {
            var _this = this;
            this.hasLeadSource = function () {
                return _this.leadSourceUserAccount;
            };
            this.phoneNumber = '(800)555-5555';
            this.setLeadSourceUserAccount = function (leadSourceUserAccount) {
                _this.leadSourceUserAccount = leadSourceUserAccount;
            };
            this.getLeadSourceUserAccount = function () {
                return _this.leadSourceUserAccount;
            };
            this.getLeadSourcePhoneNumber = function () {
                var workPhone;
                if (_this.leadSourceUserAccount != null && _this.leadSourceUserAccount.phones != null && _this.leadSourceUserAccount.phones.length > 0) {
                    workPhone = _.find(_this.leadSourceUserAccount.phones, function (phone) { return phone.type == "2"; });
                    return workPhone.number;
                }
                return _this.phoneNumber;
            };
        }
        LeadSourceService.className = 'leadSourceService';
        LeadSourceService.$inject = [];
        return LeadSourceService;
    })();
    consumersite.LeadSourceService = LeadSourceService;
    moduleRegistration.registerService(consumersite.moduleName, LeadSourceService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=leadsource.service.js.map