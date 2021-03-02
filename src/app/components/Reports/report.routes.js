System.register(["@angular/core", "@angular/router", "app/components/Reports/template/reportTemplate", "app/components/Reports/config/reportConfig", "app/components/Reports/config/serviceConfig"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, reportTemplate_1, reportConfig_1, serviceConfig_1, ReportRoutes, ReportRoutingModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            exports_1("ReportRoutes", ReportRoutes = [
                { path: 'report', component: reportTemplate_1.ReportTemplateComponent },
                { path: 'reportconfig', component: reportConfig_1.ReportConfigComponent },
                { path: 'serviceconfig', component: serviceConfig_1.ServiceConfigComponent }
            ]);
            ReportRoutingModule = (function () {
                function ReportRoutingModule() {
                }
                ReportRoutingModule = __decorate([
                    core_1.NgModule({
                        imports: [router_1.RouterModule.forChild(ReportRoutes)],
                        exports: [router_1.RouterModule]
                    })
                ], ReportRoutingModule);
                return ReportRoutingModule;
            }());
            exports_1("ReportRoutingModule", ReportRoutingModule);
        }
    };
});
//# sourceMappingURL=report.routes.js.map