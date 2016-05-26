/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
var consumersite;
(function (consumersite) {
    var FeatureNavbarController = (function () {
        function FeatureNavbarController(navigationService, loan, templateRoot, authenticationService, $state, $window, $timeout) {
            //Constructor Code Here
            var _this = this;
            this.navigationService = navigationService;
            this.loan = loan;
            this.templateRoot = templateRoot;
            this.authenticationService = authenticationService;
            this.$state = $state;
            this.$window = $window;
            this.$timeout = $timeout;
            //properties
            this.isMobileMenuOpen = false;
            this.currentStateName = '';
            this.showFeatureNavbar = false;
            this.showLoanAppBreadcrumb = true;
            this.refreshBreadcrumb = function () {
                _this.showLoanAppBreadcrumb = loanApp.regex.test(_this.$state.current.name);
            };
            this.getShowFeatureNavbar = function (currentStateName) {
                var showFeatureNavbar = true;
                switch (currentStateName) {
                    case navigation.authenticate:
                    case navigation.pinAuthenticate:
                    case navigation.pricing:
                    case myNextStep.dashboard:
                    case myNextStep.myLoans:
                    case loanApp.signout:
                    case myNextStep.eConsentSettings:
                        showFeatureNavbar = false;
                        break;
                }
                return showFeatureNavbar;
            };
            this.scrollToTop = function () {
                _this.$timeout(function () {
                    _this.$window.scroll(0, 90);
                }, 0);
            };
            this.authenticate = function () {
                _this.navigationService.goToLogIn();
            };
            this.signout = function () {
                _this.navigationService.goToLogOut();
            };
            //We need to hide the feature navbar if we are on dashboard home
            //console.log('FeatureNavbarController constructor called');
            //console.log('this.$state.current: ' + this.$state.current.name);
            //if (navigationService.showFeatureNavbar) {
            //    navigationService.scrollToTop();
            //}
        }
        //refreshFeatureNavbar() returns true if the feature navbar should be visible, as well as any processes that need to be called whenever navigation changes
        FeatureNavbarController.prototype.refreshFeatureNavbar = function () {
            var currentStateName = this.$state.current.name;
            if (this.currentStateName !== currentStateName) {
                this.currentStateName = currentStateName;
                this.refreshBreadcrumb();
                this.showFeatureNavbar = this.getShowFeatureNavbar(currentStateName);
                if (this.showFeatureNavbar) {
                    this.scrollToTop();
                }
            }
            return this.showFeatureNavbar;
        };
        Object.defineProperty(FeatureNavbarController.prototype, "isAuthenticated", {
            get: function () {
                return this.authenticationService.isAuthenticated();
            },
            enumerable: true,
            configurable: true
        });
        FeatureNavbarController.prototype.getProgressPercent = function () {
            var percent = this.navigationService.getProgressPercent();
            return percent;
        };
        FeatureNavbarController.prototype.getProgressRounded = function () {
            var percent = Math.round(this.navigationService.getProgressPercent() * 100);
            return percent;
        };
        Object.defineProperty(FeatureNavbarController.prototype, "loanAmount", {
            get: function () {
                if (this.loan.loanAmount)
                    return this.loan.loanAmount;
                else
                    return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FeatureNavbarController.prototype, "loanRate", {
            get: function () {
                return this.loan.financialInfo ? this.loan.financialInfo.baseInterestRate : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FeatureNavbarController.prototype, "monthlyPayment", {
            get: function () {
                if (this.loan.financialInfo.monthlyPayment != null)
                    var roundedMonthlyPayment = +this.loan.financialInfo.monthlyPayment.toFixed(2);
                return roundedMonthlyPayment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FeatureNavbarController.prototype, "cashOutAmount", {
            get: function () {
                return this.loan.cashOutAmount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FeatureNavbarController.prototype, "downPaymentAmount", {
            get: function () {
                //return this.loan.downPaymentAmount;
                //return this.loan.getSubjectProperty().downPayment;
                return this.loan.property.downPayment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FeatureNavbarController.prototype, "isPurchase", {
            get: function () {
                return this.loan.loanPurposeType == 1 /* Purchase */;
            },
            enumerable: true,
            configurable: true
        });
        //Click Events
        FeatureNavbarController.prototype.toggleMobileMenu = function () {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        };
        FeatureNavbarController.className = "featureNavbarController";
        FeatureNavbarController.$inject = ['navigationService', 'loan', 'templateRoot', 'authenticationService', '$state', '$window', '$timeout'];
        return FeatureNavbarController;
    })();
    consumersite.FeatureNavbarController = FeatureNavbarController;
    moduleRegistration.registerController(consumersite.moduleName, FeatureNavbarController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=featureNavbar.controller.js.map