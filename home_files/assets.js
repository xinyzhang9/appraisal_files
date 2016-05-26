/// <reference path="../../../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../../Scripts/typings/underscore/underscore.d.ts" />
/// <reference path='../../../../angular/ts/extendedViewModels/asset.extendedViewModel.ts' />
/// <reference path="../../../../angular/ts/generated/viewModels.ts" />
/// <reference path="../../../../angular/ts/generated/viewModelClasses.ts" />
var consumersite;
(function (consumersite) {
    var AssetsController = (function () {
        function AssetsController(loan, loanAppPageContext, applicationData, templateRoot) {
            var _this = this;
            this.loan = loan;
            this.loanAppPageContext = loanAppPageContext;
            this.applicationData = applicationData;
            this.templateRoot = templateRoot;
            this.getborrowerassets = function () {
                return lib.filter(_this.loan.loanApp.borrower.assets, function (a) { return a.assetValue > 0; });
            };
            this.hasAssets = function () {
                return _this.assetCount() > 0;
            };
            this.addAsset = function () {
                _this.assetActive = _this.loan.loanApp.assets[_this.loan.loanApp.addAsset() - 1];
            };
            this.assetCount = function () {
                return _this.loan.loanApp.assets.length;
            };
            this.populateOwnerTypeLookup = function () {
                _this.ownerTypeLookup = [];
                _this.ownerTypeLookup.push({ value: 1 /* Borrower */, text: _this.loan.loanApp.borrower.fullName });
                if (_this.loan.loanApp.hasCoBorrower) {
                    _this.ownerTypeLookup.push({ value: 2 /* CoBorrower */, text: _this.loan.loanApp.coBorrower.fullName });
                    _this.ownerTypeLookup.push({ value: 3 /* Joint */, text: "Joint" });
                }
            };
            this.getOwnerTypeLookups = function () {
                return _this.ownerTypeLookup;
            };
            this.filterAssetTypes = function () {
                if (angular.isDefined(_this.applicationData.lookup.accountTypes)) {
                    var assetTypes = _.filter(_this.applicationData.lookup.accountTypes, function (accountType) {
                        return accountType.value != String(17 /* BridgeLoan */) && accountType.value != String(16 /* SecuredBorrowerFundsNotDeposited */) && accountType.value != String(23 /* OtherNonLiquidAsset */) && accountType.value != String(99 /* NotRequired */) && accountType.value != String(21 /* NetWorthOfBusinessOwned */) && accountType.value != String(20 /* NetEquity */);
                    });
                    return assetTypes;
                }
            };
            this.accountTypes = applicationData.lookup.accountTypes;
            lib.forEach(this.accountTypes, function (actype) {
                _this.accountTypes = lib.filter(_this.accountTypes, function (p) { return (p.value != "16" && p.value != "99"); });
            });
            this.populateOwnerTypeLookup();
            this.filterAssetTypes();
            this.loan.loanApp.assets = [];
            for (var x = 0; x < this.loan.loanApp.borrower.assets.length; x++) {
                var _asset = this.loan.loanApp.borrower.assets[x];
                if ((_asset.assetValue > 0) && ((_asset.assetType != 14) && (_asset.assetType != 15))) {
                    var ast = new cls.AssetViewModel(_asset);
                    var item = new consumersite.vm.Asset(applicationData, this.loan.loanApp.loanAppVM, ast);
                    if (_asset.jointAccount) {
                        item.ownerType = 3 /* Joint */;
                        item.borrowerFullName = "Joint";
                    }
                    else {
                        item.ownerType = 1 /* Borrower */;
                        item.borrowerFullName = this.loan.loanApp.coBorrower.fullName;
                    }
                    item.borrowerFullName = this.loan.loanApp.borrower.fullName;
                    item.assetTypeName = this.setAssetTypeName(this.filterAssetTypes(), item.assetType);
                    this.loan.loanApp.assets.push(item);
                }
            }
            if (this.loan.loanApp.hasCoBorrower) {
                for (var x = 0; x < this.loan.loanApp.coBorrower.assets.length; x++) {
                    var _asset = this.loan.loanApp.coBorrower.assets[x];
                    if ((_asset.assetValue > 0) && ((_asset.assetType != 14) && (_asset.assetType != 15))) {
                        var ast = new cls.AssetViewModel(_asset);
                        var item = new consumersite.vm.Asset(applicationData, this.loan.loanApp.loanAppVM, ast);
                        if (_asset.jointAccount) {
                            item.ownerType = 3 /* Joint */;
                            item.borrowerFullName = "Joint";
                        }
                        else {
                            item.ownerType = 2 /* CoBorrower */;
                            item.borrowerFullName = this.loan.loanApp.coBorrower.fullName;
                        }
                        item.borrowerFullName = this.loan.loanApp.coBorrower.fullName;
                        item.assetTypeName = this.setAssetTypeName(this.filterAssetTypes(), item.assetType);
                        this.loan.loanApp.assets.push(item);
                    }
                }
            }
            //Assets array is empty, add one for the user to begin the page.
            if (this.loan.loanApp.assets.length > 0) {
                this.assetActive = this.loan.loanApp.assets[0]; //Select the current one
            }
        }
        AssetsController.prototype.setAssetTypeName = function (lookupArray, typeVal) {
            for (var i = 0; i < lookupArray.length; i++) {
                if (lookupArray[i].value == typeVal)
                    return lookupArray[i].text;
            }
            return "";
        };
        AssetsController.className = "assetsController";
        AssetsController.$inject = ['loan', 'loanAppPageContext', 'applicationData', 'templateRoot'];
        return AssetsController;
    })();
    consumersite.AssetsController = AssetsController;
    moduleRegistration.registerController(consumersite.moduleName, AssetsController);
})(consumersite || (consumersite = {}));
//# sourceMappingURL=assets.controller.js.map