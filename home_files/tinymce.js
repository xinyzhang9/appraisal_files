var wysiwyg;
(function (wysiwyg) {
    var TinyMCEDirectiveController = (function () {
        function TinyMCEDirectiveController($sce) {
            var _this = this;
            this.$sce = $sce;
            this.updateHtml = function () {
                _this._html = _this.$sce.trustAsHtml(_this.tinymce);
            };
            this.tinymce = this.html;
        }
        Object.defineProperty(TinyMCEDirectiveController.prototype, "html", {
            // html is bound from within the directive
            get: function () {
                return this._html;
            },
            set: function (html) {
                this.tinymce = html;
            },
            enumerable: true,
            configurable: true
        });
        TinyMCEDirectiveController.className = 'TinyMCEDirectiveController';
        TinyMCEDirectiveController.$inject = ['$sce'];
        return TinyMCEDirectiveController;
    })();
    moduleRegistration.registerController('ui.tinymce', TinyMCEDirectiveController);
    var TinyMCEDirective = (function () {
        function TinyMCEDirective() {
            this.bindToController = true;
            this.restrict = 'E';
            this.controller = TinyMCEDirectiveController.className;
            this.controllerAs = 'tinyMCECntrl';
            this.scope = {
                html: '=',
                cssClass: '@?',
                options: '='
            };
            this.templateUrl = '/angular/common/tinyMCE/tinyMCE.template.html';
        }
        TinyMCEDirective.createNew = function (args) {
            return new TinyMCEDirective();
        };
        TinyMCEDirective.$inject = [];
        TinyMCEDirective.className = 'tinyMce';
        return TinyMCEDirective;
    })();
    moduleRegistration.registerDirective('ui.tinymce', TinyMCEDirective);
})(wysiwyg || (wysiwyg = {}));
//# sourceMappingURL=tinyMCE.directive.js.map