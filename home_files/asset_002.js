/// <reference path='../../../angular/ts/extendedViewModels/asset.extendedViewModel.ts' />
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
        (function (OwnerTypeEnum) {
            OwnerTypeEnum[OwnerTypeEnum["None"] = 0] = "None";
            OwnerTypeEnum[OwnerTypeEnum["Borrower"] = 1] = "Borrower";
            OwnerTypeEnum[OwnerTypeEnum["CoBorrower"] = 2] = "CoBorrower";
            OwnerTypeEnum[OwnerTypeEnum["Joint"] = 3] = "Joint";
        })(vm.OwnerTypeEnum || (vm.OwnerTypeEnum = {}));
        var OwnerTypeEnum = vm.OwnerTypeEnum;
        var Asset = (function (_super) {
            __extends(Asset, _super);
            function Asset(applicationData, loanApplication, asset) {
                var _this = this;
                _super.call(this, applicationData);
                this._borrowerFullName = "";
                this._borrowerFirstLastName = "";
                this.ownerTypePushIfNotExists = function (borrower) {
                    var thisAsset = _this.getAsset();
                    var existingAsset = lib.findFirst(borrower.getAssets(), function (a) { return a.assetId == thisAsset.assetId; });
                    if (!existingAsset) {
                        borrower.getAssets().push(thisAsset);
                    }
                };
                this.getLoanApplication = function () { return loanApplication; };
                this.getAsset = function () { return asset; };
                // @todo: Review , more thought needed on overal factory/construction standards
                if (!asset.assetId) {
                    asset.assetId = util.IdentityGenerator.nextGuid();
                }
            }
            Object.defineProperty(Asset.prototype, "borrowerFullName", {
                get: function () {
                    switch (this.getAsset().ownerType) {
                        case 1 /* Borrower */:
                            this._borrowerFullName = this.getLoanApplication().getBorrower().getFullName();
                            break;
                        case 2 /* CoBorrower */:
                            this._borrowerFullName = this.getLoanApplication().getCoBorrower().getFullName();
                            break;
                        case 3 /* Joint */:
                            this._borrowerFullName = "Joint";
                            break;
                    }
                    return this._borrowerFullName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Asset.prototype, "borrowerFirstLastName", {
                get: function () {
                    switch (this.getAsset().ownerType) {
                        case 1 /* Borrower */:
                            this._borrowerFirstLastName = this.getLoanApplication().getBorrower().getFirstLastName();
                            break;
                        case 2 /* CoBorrower */:
                            this._borrowerFirstLastName = this.getLoanApplication().getCoBorrower().getFirstLastName();
                            break;
                        case 3 /* Joint */:
                            this._borrowerFirstLastName = "Joint";
                            break;
                    }
                    return this._borrowerFirstLastName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Asset.prototype, "ownerType", {
                get: function () {
                    return this.getAsset().ownerType;
                },
                set: function (ownerType) {
                    var _this = this;
                    if (ownerType == 2 /* CoBorrower */ && this.getAsset().ownerType == 1 /* Borrower */) {
                        lib.removeFirst(this.getLoanApplication().getBorrower().getAssets(), function (asset) { return asset.assetId == _this.getAsset().assetId; });
                    }
                    else if ((ownerType == 1 /* Borrower */ || ownerType == 3 /* Joint */) && this.getAsset().ownerType == 2 /* CoBorrower */) {
                        lib.removeFirst(this.getLoanApplication().getCoBorrower().getAssets(), function (asset) { return asset.assetId == _this.getAsset().assetId; });
                    }
                    var owningBorrower;
                    if (ownerType == 2 /* CoBorrower */) {
                        owningBorrower = this.getLoanApplication().getCoBorrower();
                    }
                    else {
                        owningBorrower = this.getLoanApplication().getBorrower();
                    }
                    this.ownerTypePushIfNotExists(owningBorrower);
                    this.getAsset().ownerType = ownerType;
                    this.getAsset().jointAccount = ownerType == 3 /* Joint */;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Asset.prototype, "assetType", {
                get: function () {
                    return this.getAsset().assetType;
                },
                set: function (assetType) {
                    this.getAsset().assetType = assetType;
                    ;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Asset.prototype, "assetTypeName", {
                get: function () {
                    return this._assetTypeName;
                },
                enumerable: true,
                configurable: true
            });
            Asset.prototype.setAssetTypeName = function (lookupArray, typeVal) {
                for (var i = 0; i < lookupArray.length; i++) {
                    if (lookupArray[i].value == typeVal)
                        this._assetTypeName = lookupArray[i].text;
                }
            };
            Object.defineProperty(Asset.prototype, "financialInstitutionName", {
                get: function () {
                    return this.getAsset().institiutionContactInfo.companyName;
                },
                set: function (financialInstitutionName) {
                    this.getAsset().institiutionContactInfo.companyName = financialInstitutionName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Asset.prototype, "accountNumber", {
                get: function () {
                    return this.getAsset().accountNumber;
                },
                set: function (accountNumber) {
                    this.getAsset().accountNumber = accountNumber;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Asset.prototype, "assetValue", {
                get: function () {
                    return lib.getBindingNumericValue(this.getAsset().monthlyAmount);
                },
                set: function (assetValue) {
                    this.getAsset().monthlyAmount = assetValue;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Asset.prototype, "isRemoved", {
                get: function () {
                    return this.getAsset().isRemoved;
                },
                set: function (isRemove) {
                    this.getAsset().isRemoved = isRemove;
                },
                enumerable: true,
                configurable: true
            });
            return Asset;
        })(vm.ViewModelBase);
        vm.Asset = Asset;
    })(vm = consumersite.vm || (consumersite.vm = {}));
})(consumersite || (consumersite = {}));
//# sourceMappingURL=asset.viewModel.js.map