System.register(["@angular/platform-browser", "@angular/core", "@angular/common", "@angular/forms", "@angular/http", "@angular/router", "@angular/material", "@ngx-translate/core", "blotterApp/blotter.home", "blotterApp/blotter.routing", "app/page.loader", "app/common/progress/iProgress", "blotterApp/blotter.main", "app/common/treeGrid/iTreeGrid", "app/common/spoolPdf/iSpoolPdf", "app/common/spool/iSpool", "app/common/button/iButton", "app/common/icon/iIcon", "app/common/tabmenu/tab", "app/common/tabmenu/tabs", "jqwidgets/angular_jqxgrid", "jqwidgets/angular_jqxtreegrid", "jqwidgets/angular_jqxmenu", "jqwidgets/angular_jqxchart", "jqwidgets/angular_jqxdropdownlist", "blotterApp/component/iBlotter", "app/services/entitlement.service", "app/services/global.service", "app/services/global.help", "app/services/global.style", "app/services/locator.service", "app/services/data.service", "app/services/preferences.service", "angular2-perfect-scrollbar"], function (exports_1, context_1) {
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
    var platform_browser_1, core_1, common_1, forms_1, http_1, router_1, material_1, core_2, blotter_home_1, blotter_routing_1, page_loader_1, iProgress_1, blotter_main_1, iTreeGrid_1, iSpoolPdf_1, iSpool_1, iButton_1, iIcon_1, tab_1, tabs_1, angular_jqxgrid_1, angular_jqxtreegrid_1, angular_jqxmenu_1, angular_jqxchart_1, angular_jqxdropdownlist_1, iBlotter_1, entitlement_service_1, global_service_1, global_help_1, global_style_1, locator_service_1, data_service_1, preferences_service_1, angular2_perfect_scrollbar_1, PERFECT_SCROLLBAR_CONFIG, BlotterModule;
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
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (blotter_home_1_1) {
                blotter_home_1 = blotter_home_1_1;
            },
            function (blotter_routing_1_1) {
                blotter_routing_1 = blotter_routing_1_1;
            },
            function (page_loader_1_1) {
                page_loader_1 = page_loader_1_1;
            },
            function (iProgress_1_1) {
                iProgress_1 = iProgress_1_1;
            },
            function (blotter_main_1_1) {
                blotter_main_1 = blotter_main_1_1;
            },
            function (iTreeGrid_1_1) {
                iTreeGrid_1 = iTreeGrid_1_1;
            },
            function (iSpoolPdf_1_1) {
                iSpoolPdf_1 = iSpoolPdf_1_1;
            },
            function (iSpool_1_1) {
                iSpool_1 = iSpool_1_1;
            },
            function (iButton_1_1) {
                iButton_1 = iButton_1_1;
            },
            function (iIcon_1_1) {
                iIcon_1 = iIcon_1_1;
            },
            function (tab_1_1) {
                tab_1 = tab_1_1;
            },
            function (tabs_1_1) {
                tabs_1 = tabs_1_1;
            },
            function (angular_jqxgrid_1_1) {
                angular_jqxgrid_1 = angular_jqxgrid_1_1;
            },
            function (angular_jqxtreegrid_1_1) {
                angular_jqxtreegrid_1 = angular_jqxtreegrid_1_1;
            },
            function (angular_jqxmenu_1_1) {
                angular_jqxmenu_1 = angular_jqxmenu_1_1;
            },
            function (angular_jqxchart_1_1) {
                angular_jqxchart_1 = angular_jqxchart_1_1;
            },
            function (angular_jqxdropdownlist_1_1) {
                angular_jqxdropdownlist_1 = angular_jqxdropdownlist_1_1;
            },
            function (iBlotter_1_1) {
                iBlotter_1 = iBlotter_1_1;
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
            function (angular2_perfect_scrollbar_1_1) {
                angular2_perfect_scrollbar_1 = angular2_perfect_scrollbar_1_1;
            }
        ],
        execute: function () {
            PERFECT_SCROLLBAR_CONFIG = {
                suppressScrollX: true
            };
            BlotterModule = (function () {
                //Required to instantiate all common services in Base class iField
                function BlotterModule(injector, mdIconRegistry, sanitizer, router, _http) {
                    this.injector = injector;
                    this.sanitizer = sanitizer;
                    this.router = router;
                    this._http = _http;
                    //SVG ICON Replacement
                    mdIconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('/ucf/assets/svgicons/mdi.svg'));
                    locator_service_1.ServiceLocator.injector = this.injector;
                }
                BlotterModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule, common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, blotter_routing_1.routing, material_1.MaterialModule,
                            angular2_perfect_scrollbar_1.PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), core_2.TranslateModule.forRoot()
                        ],
                        exports: [
                            common_1.CommonModule, forms_1.FormsModule, page_loader_1.PageLoaderComponent, iProgress_1.ProgressBarComponent, blotter_main_1.BlotterMainComponent, iTreeGrid_1.TreeGridComponent, iSpoolPdf_1.SpoolPdfComponent,
                            iSpool_1.SpoolComponent, iButton_1.ButtonComponent, iIcon_1.IconComponent, tab_1.Tab, tabs_1.Tabs, angular_jqxgrid_1.jqxGridComponent, angular_jqxtreegrid_1.jqxTreeGridComponent, angular_jqxmenu_1.jqxMenuComponent,
                            angular_jqxchart_1.jqxChartComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent, iBlotter_1.BlotterComponent
                        ],
                        declarations: [
                            blotter_home_1.BlotterHomeComponent, page_loader_1.PageLoaderComponent, iProgress_1.ProgressBarComponent, blotter_main_1.BlotterMainComponent, iTreeGrid_1.TreeGridComponent, iSpoolPdf_1.SpoolPdfComponent,
                            iSpool_1.SpoolComponent, iButton_1.ButtonComponent, iIcon_1.IconComponent, tab_1.Tab, tabs_1.Tabs,
                            angular_jqxgrid_1.jqxGridComponent, angular_jqxtreegrid_1.jqxTreeGridComponent, angular_jqxmenu_1.jqxMenuComponent, angular_jqxchart_1.jqxChartComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent, iBlotter_1.BlotterComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA],
                        providers: [
                            material_1.MdIconRegistry, blotter_routing_1.appRoutingProviders, data_service_1.DataService, global_service_1.GlobalService, global_help_1.GlobalHelpService, global_style_1.GlobalStyleComponent, preferences_service_1.PreferencesService,
                            entitlement_service_1.EntitlementService, iProgress_1.ProgressBarComponent, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
                        ],
                        entryComponents: [blotter_home_1.BlotterHomeComponent],
                        bootstrap: [blotter_home_1.BlotterHomeComponent]
                    }),
                    __metadata("design:paramtypes", [core_1.Injector, material_1.MdIconRegistry, platform_browser_1.DomSanitizer,
                        router_1.Router, http_1.Http])
                ], BlotterModule);
                return BlotterModule;
            }());
            exports_1("BlotterModule", BlotterModule);
        }
    };
});
//# sourceMappingURL=blotter.module.js.map