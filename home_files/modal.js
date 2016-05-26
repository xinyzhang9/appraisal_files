var directive;
(function (directive) {
    var ModalDirective = (function () {
        function ModalDirective($modal, $log) {
            var _this = this;
            this.$modal = $modal;
            this.$log = $log;
            this.scope = {
                templateUrl: '@',
                getModel: '&',
                controller: '@',
                controllerAs: '@',
                onCancel: '=?',
                onAccept: '=?',
                backdrop: '@?',
                size: '@?',
                cssClasses: '@?'
            };
            this.restrict = 'A';
            this.link = function (scope, instanceElement, instanceAttributes, controller, transclude) {
                ModalDirective.validateInput(scope);
                instanceElement.bind('click', function () {
                    var modalInstance = _this.$modal.open({
                        controller: scope.controller,
                        controllerAs: scope.controllerAs,
                        templateUrl: scope.templateUrl,
                        backdrop: scope.backdrop ? scope.backdrop : 'true',
                        size: scope.size ? scope.size : 'sm',
                        openedClass: scope.cssClasses ? scope.cssClasses : '',
                        resolve: {
                            modalContext: function () {
                                return {
                                    model: angular.copy(scope.getModel()),
                                    onCancel: function () {
                                        modalInstance.close();
                                        if (scope.onCancel) {
                                            scope.onCancel();
                                        }
                                    },
                                    onAccept: function (model) {
                                        modalInstance.close();
                                        if (scope.onAccept) {
                                            scope.onAccept(model);
                                        }
                                    }
                                };
                            }
                        }
                    });
                });
            };
        }
        ModalDirective.createNew = function (args) {
            return new ModalDirective(args[0], args[1]);
        };
        ModalDirective.validateInput = function (scope) {
            var errors = '';
            if (!scope.templateUrl) {
                errors += 'templateUrl was not defined\n';
            }
            if (!scope.getModel) {
                errors += 'getModel was not defined\n';
            }
            if (!scope.controller) {
                errors += 'controller was not defined\n';
            }
            if (!scope.controllerAs) {
                errors += 'controllerAs was not defined\n';
            }
            if (errors) {
                throw new Error('directive modal: ' + errors);
            }
        };
        ModalDirective.$inject = ['$modal', '$log']; // keep this as $model instead of $uibModal for now so it can be used by LoanCenter
        ModalDirective.className = 'modal';
        return ModalDirective;
    })();
    moduleRegistration.registerDirective(directive.moduleName, ModalDirective);
})(directive || (directive = {}));
//# sourceMappingURL=modal.directive.js.map