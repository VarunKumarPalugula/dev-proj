System.register(["@angular/core", "@angular/common", "@angular/forms", "@angular/material", "@ngx-translate/core", "app/modules/basic.module", "app/modules/main.module", "app/modules/advance.module", "app/modules/navigation.module", "app/modules/jqx.module", "app/components/Reports/report.routes", "app/components/Reports/template/reportTemplate", "app/components/Reports/config/reportConfig", "app/components/Reports/config/serviceConfig"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, material_1, core_2, basic_module_1, main_module_1, advance_module_1, navigation_module_1, jqx_module_1, report_routes_1, reportTemplate_1, reportConfig_1, serviceConfig_1, ReportModule;
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
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (basic_module_1_1) {
                basic_module_1 = basic_module_1_1;
            },
            function (main_module_1_1) {
                main_module_1 = main_module_1_1;
            },
            function (advance_module_1_1) {
                advance_module_1 = advance_module_1_1;
            },
            function (navigation_module_1_1) {
                navigation_module_1 = navigation_module_1_1;
            },
            function (jqx_module_1_1) {
                jqx_module_1 = jqx_module_1_1;
            },
            function (report_routes_1_1) {
                report_routes_1 = report_routes_1_1;
            },
            function (reportTemplate_1_1) {
                reportTemplate_1 = reportTemplate_1_1;
            },
            function (reportConfig_1_1) {
                reportConfig_1 = reportConfig_1_1;
            },
            function (serviceConfig_1_1) {
                serviceConfig_1 = serviceConfig_1_1;
            }
        ],
        execute: function () {
            ReportModule = (function () {
                function ReportModule() {
                }
                ReportModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            material_1.MaterialModule,
                            core_2.TranslateModule.forChild(),
                            basic_module_1.BasicModule,
                            main_module_1.MainModule,
                            advance_module_1.AdvanceModule,
                            navigation_module_1.NavigationModule,
                            jqx_module_1.JQXModule,
                            report_routes_1.ReportRoutingModule
                        ],
                        declarations: [
                            reportTemplate_1.ReportTemplateComponent, reportConfig_1.ReportConfigComponent, serviceConfig_1.ServiceConfigComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], ReportModule);
                return ReportModule;
            }());
            exports_1("ReportModule", ReportModule);
        }
    };
});
//# sourceMappingURL=report.module.js.map