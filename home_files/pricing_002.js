var consumersite;
(function (consumersite) {
    var PricingService = (function () {
        function PricingService($resource, apiRoot, apiServiceAccountId, leadSourceId) {
            var _this = this;
            this.$resource = $resource;
            this.apiRoot = apiRoot;
            this.apiServiceAccountId = apiServiceAccountId;
            this.leadSourceId = leadSourceId;
            this.getProductsWithLeadSource = function (loanViewModel) {
                return _this.loanScenariosWithLeadSource.shopForRatesWithLeadSource({ serviceAccountId: _this.apiServiceAccountId, leadSourceId: _this.leadSourceId, curentUserId: _this.apiServiceAccountId, sixPieces: false }, loanViewModel);
            };
            this.getProducts = function (loanViewModel) {
                return _this.loanScenarios.shopForRates({ currentUserId: _this.apiServiceAccountId, sixPieces: false }, loanViewModel);
            };
            this.getLeadSource = function (loanViewModel) {
                return _this.leadSource.bindLeadSource({ serviceAccountId: _this.apiServiceAccountId, leadSourceId: _this.leadSourceId }, loanViewModel);
            };
            var pricingResultsApiPath = this.apiRoot + PricingService.pricingResultsApiSubPath;
            this.loanScenariosWithLeadSource = this.$resource(pricingResultsApiPath + 'GetPricingResultsUsingLeadSource', {}, {
                shopForRatesWithLeadSource: {
                    method: 'POST',
                    url: pricingResultsApiPath + 'GetPricingResultsUsingLeadSource',
                    params: { serviceAccountId: '@serviceAccountId', leadSourceId: '@leadSourceId', currentUserId: '@currentUserId', sixPieces: '@sixPieces', loanViewModel: '@loanViewModel' }
                }
            });
            this.loanScenarios = this.$resource(pricingResultsApiPath + 'GetPricingResultsWithLoanOptions', {}, {
                shopForRates: {
                    method: 'POST',
                    url: pricingResultsApiPath + 'GetPricingResultsWithLoanOptions',
                    params: { currentUserId: '@currentUserId', sixPieces: '@sixPieces', loanViewModel: '@loanViewModel' }
                }
            });
            this.leadSource = this.$resource(pricingResultsApiPath + 'BindLeadSourceToLoan', {}, {
                bindLeadSource: {
                    method: 'POST',
                    url: pricingResultsApiPath + 'BindLeadSourceToLoan',
                    params: { serviceAccountId: '@serviceAccountId', leadSourceId: '@leadSourceId', loanViewModel: '@loanViewModel' }
                }
            });
        }
        PricingService.className = 'pricingService';
        PricingService.$inject = ['$resource', 'apiRoot', 'apiServiceAccountId', 'leadSourceId'];
        // @todo: convert to const with upgrade to TS 1.7
        PricingService.pricingResultsApiSubPath = 'PricingResults/';
        return PricingService;
    })();
    consumersite.PricingService = PricingService;
    moduleRegistration.registerService(consumersite.moduleName, PricingService);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=pricing.service.js.map