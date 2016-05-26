var consumersite;
(function (consumersite) {
    var vm;
    (function (vm) {
        var ViewModelBase = (function () {
            function ViewModelBase(applicationData) {
                this.getApplicationData = function () { return applicationData; };
            }
            return ViewModelBase;
        })();
        vm.ViewModelBase = ViewModelBase;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=viewModelBase.js.map