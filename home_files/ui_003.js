var consumersite;
(function (consumersite) {
    var LoanAppPageContext = (function () {
        function LoanAppPageContext($window, navigationService, $state, $log) {
            var _this = this;
            this.$window = $window;
            this.navigationService = navigationService;
            this.$state = $state;
            this.$log = $log;
            // bcb - get rid of this...
            this.goToDashboard = function () {
                _this.navigationService.goToDashboard();
            };
        }
        Object.defineProperty(LoanAppPageContext.prototype, "loanAppNavigationState", {
            get: function () {
                if (this.$state.current.data && this.$state.current.data.pageStateEnum) {
                    return this.$state.current.data.pageStateEnum;
                }
                else {
                    this.$log.error('Page State Enum not found. LoanAppPageContext: 18');
                    return 0 /* Undefined */;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanAppPageContext.prototype, "nextLoanAppNavigationState", {
            get: function () {
                return this.navigationService.nextState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoanAppPageContext.prototype, "isCoBorrowerState", {
            get: function () {
                return this.navigationService.isCoBorrowerState();
            },
            enumerable: true,
            configurable: true
        });
        LoanAppPageContext.$inject = ['$window', 'navigationService', '$state', '$log'];
        LoanAppPageContext.className = 'loanAppPageContext';
        return LoanAppPageContext;
    })();
    consumersite.LoanAppPageContext = LoanAppPageContext;
    moduleRegistration.registerService(consumersite.moduleName, LoanAppPageContext);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=ui.loanapp.page.context.service.js.map