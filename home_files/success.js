var consumersite;
(function (consumersite) {
    var SuccessModalController = (function () {
        function SuccessModalController($modalInstance, templateRoot) {
            var _this = this;
            this.$modalInstance = $modalInstance;
            this.templateRoot = templateRoot;
            this.close = function () {
                _this.$modalInstance.close();
            };
        }
        return SuccessModalController;
    })();
    var SuccessModalService = (function () {
        function SuccessModalService($modal, templateRoot) {
            var _this = this;
            this.$modal = $modal;
            this.templateRoot = templateRoot;
            this.openSuccessModal = function () {
                var successModalInstance = _this.$modal.open({
                    templateUrl: _this.templateRoot + 'consumersite/mynextstep/success/success.esigning.html',
                    backdrop: 'static',
                    controller: function () {
                        return new SuccessModalController(successModalInstance, _this.templateRoot);
                    },
                    controllerAs: 'modalSuccessCntrl',
                });
                successModalInstance.result.then(
                //success
                function (results) {
                }, 
                //cancel
                function (reason) {
                    console.log(reason);
                });
            };
        }
        SuccessModalService.className = 'successModalService';
        SuccessModalService.$inject = ['$modal', 'templateRoot'];
        return SuccessModalService;
    })();
    consumersite.SuccessModalService = SuccessModalService;
    moduleRegistration.registerService(consumersite.moduleName, SuccessModalService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=success.service.js.map