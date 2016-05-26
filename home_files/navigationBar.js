var directive;
(function (directive) {
    var NavigationBarController = (function () {
        function NavigationBarController($scope, templateRoot) {
            this.$scope = $scope;
            this.templateRoot = templateRoot;
        }
        NavigationBarController.className = 'navigationBarController';
        NavigationBarController.$inject = ['$scope', 'templateRoot'];
        return NavigationBarController;
    })();
    directive.NavigationBarController = NavigationBarController;
    var NavigationBarDirective = (function () {
        function NavigationBarDirective(templateRoot) {
            var _this = this;
            this.templateRoot = templateRoot;
            this.isMobileMenuOpen = false;
            this.controller = 'navigationBarController';
            this.controllerAs = 'navigationBarCntrl';
            this.link = function ($scope) {
                $scope.toggleMobileMenu = function () {
                    //console.log('hello');
                    this.isMobileMenuOpen = !this.isMobileMenuOpen;
                };
                $scope.isMobileMenuOpen = _this.isMobileMenuOpen;
            };
        }
        NavigationBarDirective.createNew = function (args) {
            return new NavigationBarDirective(args[0]);
        };
        Object.defineProperty(NavigationBarDirective.prototype, "templateUrl", {
            get: function () {
                return this.templateRoot + 'consumersite/directives/navigationbar/navigation-bar.html';
            },
            enumerable: true,
            configurable: true
        });
        NavigationBarDirective.className = 'navigationBar';
        NavigationBarDirective.$inject = ['templateRoot'];
        return NavigationBarDirective;
    })();
    moduleRegistration.registerController(consumersite.moduleName, NavigationBarController);
    moduleRegistration.registerDirective(consumersite.moduleName, NavigationBarDirective);
})(directive || (directive = {}));
//# sourceMappingURL=navigationBar.directive.js.map