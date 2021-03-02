System.register(["@angular/platform-browser", "@angular/core", "@angular/common", "@angular/http", "@angular/material", "@ngx-translate/core", "@ngx-translate/http-loader", "@angular/common/http", "@angular/router", "app/app.routing", "app/services/entitlement.service", "app/services/global.service", "app/services/global.help", "app/services/global.style", "app/services/locator.service", "app/services/data.service", "app/services/preferences.service", "app/treasury.home", "app/page.loader", "app/common/progress/iProgress", "app/app.main", "app/modules/widgets.module", "app/modules/container.module"], function (exports_1, context_1) {
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
    //AoT requires an exported function for factories
    function HttpLoaderFactory(httpClient) {
        return new http_loader_1.TranslateHttpLoader(httpClient, 'i18n/', '.json');
    }
    exports_1("HttpLoaderFactory", HttpLoaderFactory);
    var platform_browser_1, core_1, common_1, http_1, material_1, core_2, http_loader_1, http_2, router_1, app_routing_1, entitlement_service_1, global_service_1, global_help_1, global_style_1, locator_service_1, data_service_1, preferences_service_1, treasury_home_1, page_loader_1, iProgress_1, app_main_1, widgets_module_1, container_module_1, AppModule;
    return {
        setters: [
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_loader_1_1) {
                http_loader_1 = http_loader_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (entitlement_service_1_1) {
                entitlement_service_1 = entitlement_service_1_1;
            },
            function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            },
            function (global_help_1_1) {
                global_help_1 = global_help_1_1;
            },
            function (global_style_1_1) {
                global_style_1 = global_style_1_1;
            },
            function (locator_service_1_1) {
                locator_service_1 = locator_service_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (preferences_service_1_1) {
                preferences_service_1 = preferences_service_1_1;
            },
            function (treasury_home_1_1) {
                treasury_home_1 = treasury_home_1_1;
            },
            function (page_loader_1_1) {
                page_loader_1 = page_loader_1_1;
            },
            function (iProgress_1_1) {
                iProgress_1 = iProgress_1_1;
            },
            function (app_main_1_1) {
                app_main_1 = app_main_1_1;
            },
            function (widgets_module_1_1) {
                widgets_module_1 = widgets_module_1_1;
            },
            function (container_module_1_1) {
                container_module_1 = container_module_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                //Required to instantiate all common services in Base class iField
                function AppModule(injector, router, _http) {
                    this.injector = injector;
                    this.router = router;
                    this._http = _http;
                    locator_service_1.ServiceLocator.injector = this.injector;
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            common_1.CommonModule,
                            http_1.HttpModule,
                            material_1.MaterialModule,
                            http_2.HttpClientModule,
                            core_2.TranslateModule.forRoot({
                                loader: {
                                    provide: core_2.TranslateLoader,
                                    useFactory: HttpLoaderFactory,
                                    deps: [http_2.HttpClient]
                                }
                            }),
                            app_routing_1.routing,
                            widgets_module_1.WidgetsModule,
                            container_module_1.ContainerModule
                        ],
                        exports: [
                            treasury_home_1.TreasuryHomeComponent, page_loader_1.PageLoaderComponent, iProgress_1.ProgressBarComponent, app_main_1.AppComponent
                        ],
                        declarations: [
                            treasury_home_1.TreasuryHomeComponent, page_loader_1.PageLoaderComponent, iProgress_1.ProgressBarComponent, app_main_1.AppComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA],
                        providers: [
                            app_routing_1.appRoutingProviders, data_service_1.DataService, global_service_1.GlobalService, global_help_1.GlobalHelpService, global_style_1.GlobalStyleComponent, preferences_service_1.PreferencesService,
                            entitlement_service_1.EntitlementService, iProgress_1.ProgressBarComponent, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
                        ],
                        entryComponents: [treasury_home_1.TreasuryHomeComponent],
                        bootstrap: [treasury_home_1.TreasuryHomeComponent]
                    }),
                    __metadata("design:paramtypes", [core_1.Injector, router_1.Router, http_1.Http])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map