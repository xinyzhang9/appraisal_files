//
// @todo-cc: Refactor
//      convert to typescript
//      model provided data
//      decompose into further functions/modules
//      review value vs. const (consider angular config)
//

(function () {
    'use strict';

    angular.module("app.services", [])
        .config(["$provide", function ($provide) {
            var elem;

            // ReST API Root
            elem = angular.element(document.querySelector('#restApiRoot'));
            $provide.value("apiRoot", elem.attr("href"));


            // ReST API Service Account ID for anonymous users
            elem = angular.element(document.querySelector('#leadSourceId'));
            // Default if undefined or unparseable
            var leadSourceId = '0000';
            // Parse
            try {
                leadSourceId =elem.val().trim();
            }
            catch (e) {
                console.error(e);
            }
            $provide.value("leadSourceId", leadSourceId);

            // ReST API Service Account ID for anonymous users
            elem = angular.element(document.querySelector('#apiServiceAccountId'));
            // Default if undefined or unparseable
            var apiServiceAccountId = -1;
            // Parse
            try {
                apiServiceAccountId = parseInt(elem.val());
            }
            catch (e) {
                console.error(e);
            }
            $provide.constant("apiServiceAccountId", apiServiceAccountId);

            // AngularJS Template Root
            elem = angular.element(document.querySelector('#angularTemplateRoot'));
            $provide.constant("templateRoot", lib.safeAccess(elem, function (e) { return e.attr("href"); }));

            // enable/disable appraisal
            elem = angular.element(document.querySelector('#enableAppraisal'));
            $provide.constant("enableAppraisal", lib.safeAccess(elem, function (e) { return e.val() == 'true'; }));

            //
            // CMS Configurations
            //

            elem = angular.element(document.querySelector('#cvimp_cookie_contact_data_value'));
            $provide.constant("cvimp_cookie_contact_data_value", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#config_banner_imp_show'));
            $provide.constant("config_banner_imp_show", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#banner_descr'));
            $provide.constant("banner_descr", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_personal'));
            $provide.constant("content_message_loanapp_personal", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_property'));
            $provide.constant("content_message_loanapp_property", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_address'));
            $provide.constant("content_message_loanapp_address", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_employment'));
            $provide.constant("content_message_loanapp_employment", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_assets'));
            $provide.constant("content_message_loanapp_assets", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_governmentinfo'));
            $provide.constant("content_message_loanapp_governmentinfo", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_declarations'));
            $provide.constant("content_message_loanapp_declarations", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_summary'));
            $provide.constant("content_message_loanapp_summary", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_additionalborrowers'));
            $provide.constant("content_message_loanapp_additionalborrowers", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_credit_info'));
            $provide.constant("content_message_loanapp_credit_info", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_account'));
            $provide.constant("content_message_loanapp_account", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_credit_assignloans'));
            $provide.constant("content_message_loanapp_credit_assignloans", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_message_loanapp_credit_results'));
            $provide.constant("content_message_loanapp_credit_results", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_personal'));
            $provide.constant("content_iconclass_loanapp_personal", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_property'));
            $provide.constant("content_iconclass_loanapp_property", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_address'));
            $provide.constant("content_iconclass_loanapp_address", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_employment'));
            $provide.constant("content_iconclass_loanapp_employment", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_assets'));
            $provide.constant("content_iconclass_loanapp_assets", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_governmentinfo'));
            $provide.constant("content_iconclass_loanapp_governmentinfo", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_declarations'));
            $provide.constant("content_iconclass_loanapp_declarations", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_summary'));
            $provide.constant("content_iconclass_loanapp_summary", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_additionalborrowers'));
            $provide.constant("content_iconclass_loanapp_additionalborrowers", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_credit_info'));
            $provide.constant("content_iconclass_loanapp_credit_info", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_account'));
            $provide.constant("content_iconclass_loanapp_account", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_credit_assignloans'));
            $provide.constant("content_iconclass_loanapp_credit_assignloans", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#content_iconclass_loanapp_credit_results'));
            $provide.constant("content_iconclass_loanapp_credit_results", lib.safeAccess(elem, function (e) { return e.val(); }));

            elem = angular.element(document.querySelector('#cvimp_sso_ditech_myaccount_token'));
            $provide.constant("cvimp_sso_ditech_myaccount_token", lib.safeAccess(elem, function (e) { return e.val(); }));

        }]);
})();
