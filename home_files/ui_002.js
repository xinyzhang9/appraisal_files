var consumersite;
(function (consumersite) {
    (function (DisplayMode) {
        DisplayMode[DisplayMode["spinner"] = 1] = "spinner";
    })(consumersite.DisplayMode || (consumersite.DisplayMode = {}));
    var DisplayMode = consumersite.DisplayMode;
    var UIBlockingMessageService = (function () {
        function UIBlockingMessageService($uibModal, templateRoot) {
            var _this = this;
            this.$uibModal = $uibModal;
            this.templateRoot = templateRoot;
            this.showMessage = function (message, displayMode) {
                var moduleSettings = {
                    backdrop: 'true',
                    backdropClass: 'custom-modal-backdrop',
                    keyboard: false,
                    templateUrl: _this.templateRoot + 'consumersite/demo/spinner-cloud.html',
                    controller: function () {
                        return { message: message, templateRoot: _this.templateRoot };
                    },
                    controllerAs: 'messageSpinnerCntrl',
                    windowClass: 'common-modal',
                };
                _this.modalInstance = _this.$uibModal.open(moduleSettings);
            };
            this.close = function () {
                _this.modalInstance.close();
            };
        }
        UIBlockingMessageService.$inject = ['$uibModal', 'templateRoot'];
        UIBlockingMessageService.className = 'uiBlockingMessageService';
        return UIBlockingMessageService;
    })();
    consumersite.UIBlockingMessageService = UIBlockingMessageService;
    moduleRegistration.registerService(consumersite.moduleName, UIBlockingMessageService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=ui.blocking.message.service.js.map