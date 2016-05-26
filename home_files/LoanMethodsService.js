// This file (LoanMethodsService.ts - ver 1.0) has been has been automatically generated, do not modify! 
/// <reference path="../../global/global.ts" />	
/// <reference path="../../lib/httpUtil.ts" />	
/// <reference path="../enums.ts" />	
/// <reference path="../viewModels.ts" />	
var srv;
(function (srv) {
    var LoanMethodsService = (function () {
        function LoanMethodsService(httpUtil) {
            var _this = this;
            this.httpUtil = httpUtil;
            this.GetActiveLoanSnapshotsGeneric = function (userAccountId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'LoanMethodsService/GetActiveLoanSnapshots'; }
                return _this.httpUtil.get(methodPath, { userAccountId: userAccountId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.GetActiveLoanSnapshots = function (userAccountId, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'LoanMethodsService/GetActiveLoanSnapshots'; }
                return _this.GetActiveLoanSnapshotsGeneric(userAccountId, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
        }
        LoanMethodsService.className = 'LoanMethodsService';
        LoanMethodsService.$inject = ['httpUtil'];
        return LoanMethodsService;
    })();
    srv.LoanMethodsService = LoanMethodsService;
})(srv || (srv = {}));
moduleRegistration.registerService(moduleNames.services, srv.LoanMethodsService);
//# sourceMappingURL=LoanMethodsService.js.map