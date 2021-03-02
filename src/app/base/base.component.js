System.register(["@angular/core", "@angular/router", "app/services/data.service", "@ngx-translate/core", "app/services/global.style", "app/services/global.help", "app/services/global.service", "app/services/locator.service", "app/services/preferences.service", "app/services/entitlement.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, data_service_1, core_2, global_style_1, global_help_1, global_service_1, locator_service_1, preferences_service_1, entitlement_service_1, BaseComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (global_style_1_1) {
                global_style_1 = global_style_1_1;
            },
            function (global_help_1_1) {
                global_help_1 = global_help_1_1;
            },
            function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            },
            function (locator_service_1_1) {
                locator_service_1 = locator_service_1_1;
            },
            function (preferences_service_1_1) {
                preferences_service_1 = preferences_service_1_1;
            },
            function (entitlement_service_1_1) {
                entitlement_service_1 = entitlement_service_1_1;
            }
        ],
        execute: function () {
            BaseComponent = (function () {
                function BaseComponent() {
                    var _this = this;
                    this.modalFlag = false;
                    this.isAcceptOverride = false;
                    this.isAcceptError = false;
                    this.operationType = '';
                    this.choiceList = [];
                    this.count = 1;
                    this.isSearchdisable = true;
                    this.contextBasedUrl = "";
                    this.dataService = locator_service_1.ServiceLocator.injector.get(data_service_1.DataService);
                    this.preferencesService = locator_service_1.ServiceLocator.injector.get(preferences_service_1.PreferencesService);
                    this.globalHelpService = locator_service_1.ServiceLocator.injector.get(global_help_1.GlobalHelpService);
                    this.translate = locator_service_1.ServiceLocator.injector.get(core_2.TranslateService);
                    this.globalService = locator_service_1.ServiceLocator.injector.get(global_service_1.GlobalService);
                    this.globalStyle = locator_service_1.ServiceLocator.injector.get(global_style_1.GlobalStyleComponent);
                    this.router = locator_service_1.ServiceLocator.injector.get(router_1.Router);
                    this.activatedRoute = locator_service_1.ServiceLocator.injector.get(router_1.ActivatedRoute);
                    this.entitlementService = locator_service_1.ServiceLocator.injector.get(entitlement_service_1.EntitlementService);
                    this.activeSubscription = this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.moduleType = params['moduleType'];
                        _this.officeType = params['officeType'];
                        _this.subModuleType = params['subModule'];
                        _this.qryParams = params;
                        //this.contextBasedUrl = "" + this.module +
                    });
                }
                BaseComponent.prototype.ngOnDestroy = function () {
                    if (this.activeSubscription) {
                        this.activeSubscription.unsubscribe();
                    }
                };
                BaseComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'BaseComponent',
                        template: '<p></p>',
                    }),
                    __metadata("design:paramtypes", [])
                ], BaseComponent);
                return BaseComponent;
            }());
            exports_1("BaseComponent", BaseComponent);
        }
    };
});
//# sourceMappingURL=base.component.js.map