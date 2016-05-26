/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var consumersite;
(function (consumersite) {
    var UIBlockWithSpinner = (function () {
        function UIBlockWithSpinner($uibModal, templateRoot) {
            var _this = this;
            this.$uibModal = $uibModal;
            this.templateRoot = templateRoot;
            this.callWithGears = function (method, message, successHandler, errorHandler) {
                if (errorHandler === void 0) { errorHandler = null; }
                var moduleSettings = {
                    backdrop: '',
                    backdropClass: 'custom-modal-backdrop',
                    keyboard: false,
                    templateUrl: _this.templateRoot + 'consumersite/demo/spinner-message.html',
                    controller: function () {
                        return { message: message, templateRoot: _this.templateRoot };
                    },
                    controllerAs: 'messageSpinnerCntrl',
                    windowClass: 'common-modal',
                };
                var modalInstance = _this.$uibModal.open(moduleSettings);
                method().then(function (data) {
                    modalInstance.close();
                    successHandler(data);
                }, function (error) {
                    modalInstance.dismiss();
                    if (errorHandler)
                        errorHandler(error);
                });
            };
            this.callWithSpinner = function (method, message, successHandler, errorHandler) {
                if (errorHandler === void 0) { errorHandler = null; }
                var moduleSettings = {
                    backdrop: '',
                    backdropClass: 'custom-modal-backdrop',
                    keyboard: false,
                    templateUrl: _this.templateRoot + 'consumersite/demo/spinner-message.html',
                    controller: function () {
                        return { message: message, templateRoot: _this.templateRoot };
                    },
                    controllerAs: 'messageSpinnerCntrl',
                    windowClass: 'common-modal',
                };
                var modalInstance = _this.$uibModal.open(moduleSettings);
                method().then(function (data) {
                    modalInstance.close();
                    successHandler(data);
                }, function (error) {
                    modalInstance.dismiss();
                    if (errorHandler)
                        errorHandler(error);
                });
            };
        }
        UIBlockWithSpinner.className = 'uiBlockWithSpinner';
        UIBlockWithSpinner.$inject = ['$uibModal', 'templateRoot'];
        return UIBlockWithSpinner;
    })();
    consumersite.UIBlockWithSpinner = UIBlockWithSpinner;
    moduleRegistration.registerService(consumersite.moduleName, UIBlockWithSpinner);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=ui.messageBlockWithSpinner.js.map