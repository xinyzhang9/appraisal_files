var consumersite;
(function (consumersite) {
    var PricingAllOptionsController = (function () {
        function PricingAllOptionsController(modalContext, templateRoot) {
            var _this = this;
            this.modalContext = modalContext;
            this.templateRoot = templateRoot;
            this.currencyFormatting = function (value) {
                return value.toString() + " $";
            };
            this.close = function () {
                _this.modalContext.onAccept(_this.modalContext.model);
            };
            //if the user clicks outside of the modal or on the "close" in the top right corner.
            this.dismiss = function () {
                _this.modalContext.onCancel();
            };
        }
        Object.defineProperty(PricingAllOptionsController.prototype, "showAll", {
            get: function () {
                return (this.showAllFixed && this.showAllARM);
            },
            set: function (value) {
                this.showAllFixed = value;
                this.showAllARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "showAllFixed", {
            get: function () {
                return (this.modalContext.model.show30Fixed && this.modalContext.model.show25Fixed && this.modalContext.model.show20Fixed && this.modalContext.model.show15Fixed && this.modalContext.model.show10Fixed);
            },
            set: function (value) {
                this.modalContext.model.show30Fixed = value;
                this.modalContext.model.show25Fixed = value;
                this.modalContext.model.show20Fixed = value;
                this.modalContext.model.show15Fixed = value;
                this.modalContext.model.show10Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show30Fixed", {
            get: function () {
                return this.modalContext.model.show30Fixed;
            },
            set: function (value) {
                this.modalContext.model.show30Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show25Fixed", {
            get: function () {
                return this.modalContext.model.show25Fixed;
            },
            set: function (value) {
                this.modalContext.model.show25Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show20Fixed", {
            get: function () {
                return this.modalContext.model.show20Fixed;
            },
            set: function (value) {
                this.modalContext.model.show20Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show15Fixed", {
            get: function () {
                return this.modalContext.model.show15Fixed;
            },
            set: function (value) {
                this.modalContext.model.show15Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show10Fixed", {
            get: function () {
                return this.modalContext.model.show10Fixed;
            },
            set: function (value) {
                this.modalContext.model.show10Fixed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "showAllARM", {
            //
            get: function () {
                return (this.modalContext.model.show10ARM && this.modalContext.model.show7ARM && this.modalContext.model.show5ARM && this.modalContext.model.show3ARM);
            },
            set: function (value) {
                this.modalContext.model.show10ARM = value;
                this.modalContext.model.show7ARM = value;
                this.modalContext.model.show5ARM = value;
                this.modalContext.model.show3ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show10ARM", {
            get: function () {
                return this.modalContext.model.show10ARM;
            },
            set: function (value) {
                this.modalContext.model.show10ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show7ARM", {
            get: function () {
                return this.modalContext.model.show7ARM;
            },
            set: function (value) {
                this.modalContext.model.show7ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show5ARM", {
            get: function () {
                return this.modalContext.model.show5ARM;
            },
            set: function (value) {
                this.modalContext.model.show5ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "show3ARM", {
            get: function () {
                return this.modalContext.model.show3ARM;
            },
            set: function (value) {
                this.modalContext.model.show3ARM = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "sortField", {
            //
            get: function () {
                return this.modalContext.model.sortField;
            },
            set: function (value) {
                this.modalContext.model.sortField = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "sortDirection", {
            get: function () {
                return this.modalContext.model.sortDirection;
            },
            set: function (value) {
                this.modalContext.model.sortDirection = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "maxInterest", {
            get: function () {
                return this.modalContext.model.maxInterest;
            },
            set: function (maxInterest) {
                this.modalContext.model.maxInterest = maxInterest;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "maxPayment", {
            get: function () {
                return this.modalContext.model.maxPayment;
            },
            set: function (maxPayment) {
                this.modalContext.model.maxPayment = maxPayment;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PricingAllOptionsController.prototype, "maxCost", {
            get: function () {
                return this.modalContext.model.maxCost;
            },
            set: function (maxCost) {
                this.modalContext.model.maxCost = maxCost;
            },
            enumerable: true,
            configurable: true
        });
        PricingAllOptionsController.$inject = ['modalContext', 'templateRoot'];
        PricingAllOptionsController.className = 'pricingAllOptionsController';
        return PricingAllOptionsController;
    })();
    consumersite.PricingAllOptionsController = PricingAllOptionsController;
    moduleRegistration.registerController(consumersite.moduleName, PricingAllOptionsController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=allOptions.controller.js.map