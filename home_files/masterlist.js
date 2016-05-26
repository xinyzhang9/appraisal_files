/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../ts/lib/common.util.ts" />
/// <reference path="../../../ts/global/global.ts" />
var directive;
(function (directive) {
    var MasterListController = (function () {
        function MasterListController($scope, templateRoot, $log) {
            var _this = this;
            this.$scope = $scope;
            this.templateRoot = templateRoot;
            this.$log = $log;
            this.itemContentUrl = function () {
                return _this.$scope.itemContentUrl;
            };
            this.isActiveItem = function (index) {
                return _this.$scope.collection[index] == _this.$scope.activeItem;
            };
            this.isItemRemovable = function (index) {
                if (_this._isItemRemovableFunc) {
                    return _this._isItemRemovableFunc(index);
                }
                if (_this.$scope.isItemRemovableFunc) {
                    _this._isItemRemovableFunc = _this.$scope.isItemRemovableFunc;
                    return _this._isItemRemovableFunc(index);
                }
                return true; //default is true
            };
            this.removeItem = function (index) {
                if (!_this.isItemRemovable(index)) {
                    return;
                }
                if (index < _this.collection.length) {
                    //if (!this.collection[index].isRemoved) {
                    //    throw ('IsRemoved not found.  MasterListDirective: 52');
                    //}
                    //to flag the save to remove this object from the facade.
                    _this.collection[index].isRemoved = true;
                    if (_this.$scope.onRemove) {
                        _this.$scope.onRemove(_this.collection[index]);
                    }
                    //remove from array
                    _this.collection.splice(index, 1);
                    if (_this.$scope.collection.length > 0) {
                        _this.setActiveItem(_this.$scope.collection[_this.$scope.collection.length - 1]);
                    }
                }
            };
            if (this.$scope.collection && this.collection.length == 1) {
                this.setActiveItem(this.$scope.collection[0]);
            }
        }
        Object.defineProperty(MasterListController.prototype, "collection", {
            get: function () {
                return this.$scope.collection;
            },
            enumerable: true,
            configurable: true
        });
        MasterListController.prototype.setActiveItem = function (item) {
            this.$scope.activeItem = item;
        };
        Object.defineProperty(MasterListController.prototype, "isItemRemovableFunc", {
            get: function () {
                return this._isItemRemovableFunc;
            },
            set: function (removableCb) {
                this._isItemRemovableFunc = removableCb;
            },
            enumerable: true,
            configurable: true
        });
        MasterListController.className = 'masterListController';
        MasterListController.$inject = ['$scope', 'templateRoot', '$log'];
        return MasterListController;
    })();
    directive.MasterListController = MasterListController;
    var MasterListDirective = (function () {
        function MasterListDirective(templateRoot) {
            this.templateRoot = templateRoot;
            this.controller = 'masterListController';
            this.controllerAs = 'masterListCntrl';
            this.transclude = true;
            this.restrict = 'E';
            this.bindToController = false;
            this.scope = {
                activeItem: '=',
                collection: '=',
                itemContentUrl: '@',
                isItemRemovableFunc: '=',
                onRemove: '=?'
            };
        }
        MasterListDirective.createNew = function (args) {
            return new MasterListDirective(args[0]);
        };
        Object.defineProperty(MasterListDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/masterlist/masterlist.container.template.html';
            },
            enumerable: true,
            configurable: true
        });
        MasterListDirective.className = 'masterList';
        MasterListDirective.$inject = ['templateRoot'];
        return MasterListDirective;
    })();
    directive.MasterListDirective = MasterListDirective;
    moduleRegistration.registerController(consumersite.moduleName, MasterListController);
    moduleRegistration.registerDirective(consumersite.moduleName, MasterListDirective);
})(directive || (directive = {}));
//# sourceMappingURL=masterlist.directive.js.map