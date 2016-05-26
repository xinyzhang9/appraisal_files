var consumersite;
(function (consumersite) {
    // @todo-TS.1.6
    consumersite.moduleName = 'consumersite';
    // export var authenticateNextState = 'consumerSite.myNextStep.instructions';
    consumersite.loadMockData = false;
    consumersite.isMockDataJoint = false;
    angular.module(consumersite.moduleName, ['ngAnimate', 'ngSanitize', 'ngResource', 'ui.router', 'util', 'queue', 'blockUI', 'ui.bootstrap', 'ui.mask', 'app.services', 'generated.services', 'uploadFiles', 'security', 'modal-directive', 'ui.bootstrap-slider', 'docVault', 'PricingResults', 'CalculatorModule', 'documents', 'dateCompatibility']);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=consumersite.module.js.map