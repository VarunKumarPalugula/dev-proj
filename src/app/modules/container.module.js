System.register(["@angular/core", "@angular/common", "@angular/forms", "@angular/router", "@ngx-translate/core", "@angular/material", "angular2-perfect-scrollbar", "app/modules/jqx.module", "app/modules/basic.module", "app/modules/main.module", "app/modules/export.module", "app/common/header/iHeader", "app/common/leftsidenav/iLeftSideNav", "app/common/consoleBar/iConsoleBar", "app/common/helpContent/iHelpContent", "app/common/auditInfo/iAuditInfo", "app/common/notification/iNotification","app/shared/Eod/iPreEodAuth","app/shared/Eod/iPreEodCheck"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, router_1, core_2, material_1, angular2_perfect_scrollbar_1, jqx_module_1, basic_module_1, main_module_1, export_module_1, iHeader_1, iLeftSideNav_1, iConsoleBar_1, iHelpContent_1, iAuditInfo_1, iNotification_1,iPreEodAuth_1,iPreEodCheck_1, PERFECT_SCROLLBAR_CONFIG, ContainerModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (angular2_perfect_scrollbar_1_1) {
                angular2_perfect_scrollbar_1 = angular2_perfect_scrollbar_1_1;
            },
            function (jqx_module_1_1) {
                jqx_module_1 = jqx_module_1_1;
            },
            function (basic_module_1_1) {
                basic_module_1 = basic_module_1_1;
            },
            function (main_module_1_1) {
                main_module_1 = main_module_1_1;
            },
            function (export_module_1_1) {
                export_module_1 = export_module_1_1;
            },
            function (iHeader_1_1) {
                iHeader_1 = iHeader_1_1;
            },
            function (iLeftSideNav_1_1) {
                iLeftSideNav_1 = iLeftSideNav_1_1;
            },
            function (iConsoleBar_1_1) {
                iConsoleBar_1 = iConsoleBar_1_1;
            },
            function (iHelpContent_1_1) {
                iHelpContent_1 = iHelpContent_1_1;
            },
            function (iAuditInfo_1_1) {
                iAuditInfo_1 = iAuditInfo_1_1;
            },
            function (iNotification_1_1) {
                iNotification_1 = iNotification_1_1;
            },
			function (iPreEodAuth_1_1) {
                iPreEodAuth_1 = iPreEodAuth_1_1;
            },
			function (iPreEodCheck_1_1) {
                iPreEodCheck_1 = iPreEodCheck_1_1;
            }
			
        ],
        execute: function () {
            PERFECT_SCROLLBAR_CONFIG = {
                suppressScrollX: true
            };
            ContainerModule = (function () {
                function ContainerModule() {
                }
                ContainerModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            router_1.RouterModule,
                            core_2.TranslateModule,
                            material_1.MaterialModule,
                            angular2_perfect_scrollbar_1.PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
                            jqx_module_1.JQXModule,
                            basic_module_1.BasicModule,
                            main_module_1.MainModule,
                            export_module_1.ExportModule
                        ],
                        exports: [
                            iHeader_1.HeaderComponent, iLeftSideNav_1.LeftSideNavComponent, iConsoleBar_1.ConsoleBarComponent, iHelpContent_1.HelpContentComponent, iAuditInfo_1.AuditInfoComponent, iNotification_1.NotificationComponent,
iPreEodAuth_1.PreEodAuthComponent,iPreEodCheck_1.PreEodCheckComponent
                        ],
                        declarations: [
                            iHeader_1.HeaderComponent, iLeftSideNav_1.LeftSideNavComponent, iConsoleBar_1.ConsoleBarComponent, iHelpContent_1.HelpContentComponent, iAuditInfo_1.AuditInfoComponent, iNotification_1.NotificationComponent,
iPreEodAuth_1.PreEodAuthComponent,iPreEodCheck_1.PreEodCheckComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], ContainerModule);
                return ContainerModule;
            }());
            exports_1("ContainerModule", ContainerModule);
        }
    };
});
//# sourceMappingURL=container.module.js.map