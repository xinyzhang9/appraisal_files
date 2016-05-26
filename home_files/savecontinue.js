/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var SaveContinueController = (function () {
        function SaveContinueController($scope, navigationService) {
            var _this = this;
            this.$scope = $scope;
            this.navigationService = navigationService;
            this.shouldHide = function () {
                return _this.$scope.isHidden;
            };
            this.getButtonName = function () {
                return _this.$scope.btnName ? _this.$scope.btnName : _this.navigationService.getNavigationDisplayName();
            };
            this.onInvalid = function () {
                //if (this.buttonClicked) {//after the button has been clicked and this has been set as true once, sync it with the canNavigate
                //    this.alertCannotNavigate = !this.$scope.form.$valid && this.$scope.form.$dirty;
                //}
                if (_this.$scope.form.$valid)
                    _this.alertCannotNavigate = false;
                return _this.alertCannotNavigate;
            };
            this.onClick = function () {
                //this.buttonClicked = true;
                if (_this.validateForm(_this.$scope.form)) {
                    if (!_this.$scope.canPageNavigate || _this.$scope.canPageNavigate()) {
                        _this.navigationService.next();
                    }
                    else {
                        _this.alertCannotNavigate = false;
                        _this.$scope.form.$setPristine();
                        _this.$scope.form.$setUntouched();
                    }
                }
                else {
                    _this.alertCannotNavigate = true;
                    if (_this.$scope.onValidationErrors) {
                        _this.$scope.onValidationErrors(_this.$scope.form.$error);
                    }
                }
            };
            this.validateForm = function (form) {
                if (form.$invalid) {
                    angular.forEach(form.$error, function (field) {
                        angular.forEach(field, function (errorField) {
                            //if it has child forms, loop through those and set them as invalid.
                            if (angular.isDefined(errorField.$$parentForm)) {
                                _this.validateForm(errorField);
                            }
                            else {
                                errorField.$setTouched();
                            }
                        });
                    });
                    console.log(form.$name + " is invalid");
                    _this.alertCannotNavigate = true;
                    return false;
                }
                _this.alertCannotNavigate = false;
                return true;
            };
        }
        //private buttonClicked: boolean;
        SaveContinueController.className = 'saveContinueController';
        SaveContinueController.$inject = ['$scope', 'navigationService'];
        return SaveContinueController;
    })();
    var SaveContinueDirective = (function () {
        function SaveContinueDirective(templateRoot, navigationService) {
            this.templateRoot = templateRoot;
            this.navigationService = navigationService;
            this.require = ['^form'];
            this.link = function (scope, instanceElement, instanceAttributes, controller, transclude) {
                scope.form = controller[0];
            };
            this.scope = {
                isHidden: '=?',
                btnName: '=?',
                btnClass: '=?',
                canPageNavigate: '=?',
                onValidationErrors: '=?'
            };
            this.transclude = true;
            this.controller = 'saveContinueController';
            this.controllerAs = 'saveContCntrl';
            this.restrict = 'E';
        }
        SaveContinueDirective.createNew = function (args) {
            return new SaveContinueDirective(args[0], args[1]);
        };
        Object.defineProperty(SaveContinueDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/savecontinue/savecontinue.template.html';
            },
            enumerable: true,
            configurable: true
        });
        SaveContinueDirective.className = 'saveContinue';
        SaveContinueDirective.$inject = ['templateRoot', 'navigationService'];
        return SaveContinueDirective;
    })();
    moduleRegistration.registerDirective(consumersite.moduleName, SaveContinueDirective);
    moduleRegistration.registerController(consumersite.moduleName, SaveContinueController);
})(directive || (directive = {}));
//# sourceMappingURL=savecontinue.directive.js.map