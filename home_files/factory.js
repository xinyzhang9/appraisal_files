var consumersite;
(function (consumersite) {
    function classFactory(fc, wc, applicationData, transactionInfo) {
        return new wc(applicationData, new fc(transactionInfo));
    }
    consumersite.classFactory = classFactory;
})(consumersite || (consumersite = {}));
//# sourceMappingURL=factory.js.map