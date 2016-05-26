// This file (AppraisalService.ts - ver 1.0) has been has been automatically generated, do not modify! 
/// <reference path="../../global/global.ts" />	
/// <reference path="../../lib/httpUtil.ts" />	
/// <reference path="../enums.ts" />	
/// <reference path="../viewModels.ts" />	
var srv;
(function (srv) {
    var AppraisalService = (function () {
        function AppraisalService(httpUtil) {
            var _this = this;
            this.httpUtil = httpUtil;
            this.GetAppraisalOrdersGeneric = function (loanId, userAccountId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalOrders'; }
                return _this.httpUtil.get(methodPath, { loanId: loanId, userAccountId: userAccountId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.GetAppraisalOrders = function (loanId, userAccountId, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalOrders'; }
                return _this.GetAppraisalOrdersGeneric(loanId, userAccountId, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
            this.GetAppraisalProductsAndFeesGeneric = function (request, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalProductsAndFees'; }
                return _this.httpUtil.post(methodPath, { request: request }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.GetAppraisalProductsAndFees = function (request, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalProductsAndFees'; }
                return _this.GetAppraisalProductsAndFeesGeneric(request, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
            this.GetAppraisalProductFeeGeneric = function (request, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalProductFee'; }
                return _this.httpUtil.post(methodPath, { request: request }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.GetAppraisalProductFee = function (request, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalProductFee'; }
                return _this.GetAppraisalProductFeeGeneric(request, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
            this.SubmitAppraisalOrderGeneric = function (loanNumber, isBorrowerOrdered, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/SubmitAppraisalOrder'; }
                return _this.httpUtil.get(methodPath, { loanNumber: loanNumber, isBorrowerOrdered: isBorrowerOrdered }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.SubmitAppraisalOrder = function (loanNumber, isBorrowerOrdered, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/SubmitAppraisalOrder'; }
                return _this.SubmitAppraisalOrderGeneric(loanNumber, isBorrowerOrdered, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
            this.SubmitToLenderXGeneric = function (loanId, loanNumber, userAccountId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/SubmitToLenderX'; }
                return _this.httpUtil.get(methodPath, { loanId: loanId, loanNumber: loanNumber, userAccountId: userAccountId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.SubmitToLenderX = function (loanId, loanNumber, userAccountId, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/SubmitToLenderX'; }
                return _this.SubmitToLenderXGeneric(loanId, loanNumber, userAccountId, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
            this.GetAppraisalOrderStatusGeneric = function (appraisalOrderId, loanId, userAccountId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalOrderStatus'; }
                return _this.httpUtil.get(methodPath, { appraisalOrderId: appraisalOrderId, loanId: loanId, userAccountId: userAccountId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.GetAppraisalOrderStatus = function (appraisalOrderId, loanId, userAccountId, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/GetAppraisalOrderStatus'; }
                return _this.GetAppraisalOrderStatusGeneric(appraisalOrderId, loanId, userAccountId, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
            this.CancelAppraisalOrderGeneric = function (appraisalOrderId, loanId, userAccountId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/CancelAppraisalOrder'; }
                return _this.httpUtil.get(methodPath, { appraisalOrderId: appraisalOrderId, loanId: loanId, userAccountId: userAccountId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.SendReceiptOfAppraisalEmailGeneric = function (loanId, userAccountId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/SendReceiptOfAppraisalEmail'; }
                return _this.httpUtil.get(methodPath, { loanId: loanId, userAccountId: userAccountId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.SendReceiptOfAppraisalEmail = function (loanId, userAccountId, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/SendReceiptOfAppraisalEmail'; }
                return _this.SendReceiptOfAppraisalEmailGeneric(loanId, userAccountId, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
            this.AppraisalIsReadyToViewGeneric = function (loanId, successHandler, serviceEventOrMessage, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/AppraisalIsReadyToView'; }
                return _this.httpUtil.get(methodPath, { loanId: loanId }, serviceEventOrMessage, errorHandler, config, successHandler);
            };
            this.AppraisalIsReadyToView = function (loanId, serviceEventOrMessage, successHandler, errorHandler, methodPath, config) {
                if (methodPath === void 0) { methodPath = 'AppraisalService/AppraisalIsReadyToView'; }
                return _this.AppraisalIsReadyToViewGeneric(loanId, successHandler || _this.httpUtil.defaultSuccessHandler, serviceEventOrMessage, errorHandler, methodPath, config);
            };
        }
        AppraisalService.className = 'AppraisalService';
        AppraisalService.$inject = ['httpUtil'];
        return AppraisalService;
    })();
    srv.AppraisalService = AppraisalService;
})(srv || (srv = {}));
moduleRegistration.registerService(moduleNames.services, srv.AppraisalService);
//# sourceMappingURL=AppraisalService.js.map