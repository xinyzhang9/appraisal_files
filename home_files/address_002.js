/// <reference path='../../../angular/ts/extendedViewModels/property.extendedViewModel.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var consumersite;
(function (consumersite) {
    var vm;
    (function (vm) {
        var Address = (function (_super) {
            __extends(Address, _super);
            function Address(applicationData, property) {
                _super.call(this, applicationData);
                this.getProperty = function () { return property; };
                this.mailingAddress = consumersite.classFactory(cls.PropertyViewModel, vm.Property, this.getApplicationData(), null);
            }
            Object.defineProperty(Address.prototype, "streetName", {
                get: function () {
                    return this.getProperty().streetName;
                },
                set: function (streetName) {
                    this.getProperty().streetName = streetName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "zipCode", {
                get: function () {
                    return this.getProperty().zipCode;
                },
                set: function (zipCode) {
                    this.getProperty().zipCode = zipCode;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "cityName", {
                get: function () {
                    return this.getProperty().cityName;
                },
                set: function (cityName) {
                    this.getProperty().cityName = cityName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "yearsAtAddress", {
                get: function () {
                    return this.getProperty().timeAtAddressYears;
                },
                set: function (yearsAtAddress) {
                    this.getProperty().timeAtAddressYears = yearsAtAddress;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "monthsAtAddress", {
                get: function () {
                    return this.getProperty().timeAtAddressMonths;
                },
                set: function (monthsAtAddress) {
                    this.getProperty().timeAtAddressYears = monthsAtAddress;
                },
                enumerable: true,
                configurable: true
            });
            return Address;
        })(vm.ViewModelBase);
        vm.Address = Address;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=address.viewModel.js.map