// This file (WorkflowService.ts - ver 1.0) has been has been automatically generated, do not modify! 
/// <reference path="../../global/global.ts" />	
/// <reference path="../../lib/httpUtil.ts" />	
/// <reference path="../enums.ts" />	
/// <reference path="../viewModels.ts" />	
var srv;
(function (srv) {
    var WorkflowService = (function () {
        function WorkflowService(httpUtil) {
            var _this = this;
            this.httpUtil = httpUtil;
            this.GetMyNextStepStatesGeneric = function (loanId, loanApplicationId, userAccountId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'WorkflowService/GetMyNextStepStates'; }
                return _this.httpUtil.get(methodPath, { loanId: loanId, loanApplicationId: loanApplicationId, userAccountId: userAccountId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.GetMyNextStepStates = function (loanId, loanApplicationId, userAccountId, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'WorkflowService/GetMyNextStepStates'; }
                return _this.GetMyNextStepStatesGeneric(loanId, loanApplicationId, userAccountId, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
        }
        WorkflowService.className = 'WorkflowService';
        WorkflowService.$inject = ['httpUtil'];
        return WorkflowService;
    })();
    srv.WorkflowService = WorkflowService;
})(srv || (srv = {}));
moduleRegistration.registerService(moduleNames.services, srv.WorkflowService);
//# sourceMappingURL=WorkflowService.js.map