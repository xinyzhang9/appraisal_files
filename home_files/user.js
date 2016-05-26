var consumersite;
(function (consumersite) {
    var UserService = (function () {
        function UserService($resource, apiRoot, apiServiceAccountId, leadSourceId) {
            var _this = this;
            this.$resource = $resource;
            this.apiRoot = apiRoot;
            this.apiServiceAccountId = apiServiceAccountId;
            this.leadSourceId = leadSourceId;
            this.counter = 0;
            this.populateUserAccount = function (clsResp) {
                // take only what data points are affected
                // it is OK to stay at object level , use (shallow-copy)
                // loan
                var userAccountClsProp = new srv.cls.CompanyEmployeeUserAccountViewModel;
                //lib.shollowCopyPrimitive(userAccountClsResp, userAccountClsProp);
                userAccountClsProp = clsResp.response;
                return userAccountClsProp;
            };
            this.getCompanyEmployeeByAffinityId = function (affinityId) {
                return _this.getByAffinityId.save({ affinityId: affinityId }, function (resp) {
                    return resp;
                }, function (err) {
                    console.error(err);
                    return null;
                }).$promise.then(function (resp) {
                    return _this.populateUserAccount(resp);
                });
            };
            var userApiPath = this.apiRoot + UserService.userApiSubPath;
            this.userAccount = this.$resource(userApiPath + 'LoadCompanyEmployeeUserAccountByAffinityId', {}, {
                getByAffinityId: {
                    method: 'POST',
                    url: userApiPath + 'LoadCompanyEmployeeUserAccountByAffinityId',
                    params: { affinityId: '@affinityId' }
                }
            });
            this.getByAffinityId = this.$resource(userApiPath, { affinityId: '@affinityId' });
        }
        UserService.className = 'userService';
        UserService.$inject = ['$resource', 'apiRoot', 'apiServiceAccountId', 'leadSourceId'];
        // @todo: convert to const with upgrade to TS 1.7
        UserService.userApiSubPath = 'User/';
        return UserService;
    })();
    consumersite.UserService = UserService;
    moduleRegistration.registerService(consumersite.moduleName, UserService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=user.service.js.map