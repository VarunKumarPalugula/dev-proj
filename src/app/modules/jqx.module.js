System.register(["@angular/core", "@angular/common", "jqwidgets/angular_jqxgrid", "jqwidgets/angular_jqxtabs", "jqwidgets/angular_jqxdragdrop", "jqwidgets/angular_jqxtreegrid", "jqwidgets/angular_jqxmenu", "jqwidgets/angular_jqxlistbox", "jqwidgets/angular_jqxnotification", "jqwidgets/angular_jqxdropdownlist", "jqwidgets/angular_jqxchart", "jqwidgets/angular_jqxswitchbutton"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, angular_jqxgrid_1, angular_jqxtabs_1, angular_jqxdragdrop_1, angular_jqxtreegrid_1, angular_jqxmenu_1, angular_jqxlistbox_1, angular_jqxnotification_1, angular_jqxdropdownlist_1, angular_jqxchart_1, angular_jqxswitchbutton_1, JQXModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (angular_jqxgrid_1_1) {
                angular_jqxgrid_1 = angular_jqxgrid_1_1;
            },
            function (angular_jqxtabs_1_1) {
                angular_jqxtabs_1 = angular_jqxtabs_1_1;
            },
            function (angular_jqxdragdrop_1_1) {
                angular_jqxdragdrop_1 = angular_jqxdragdrop_1_1;
            },
            function (angular_jqxtreegrid_1_1) {
                angular_jqxtreegrid_1 = angular_jqxtreegrid_1_1;
            },
            function (angular_jqxmenu_1_1) {
                angular_jqxmenu_1 = angular_jqxmenu_1_1;
            },
            function (angular_jqxlistbox_1_1) {
                angular_jqxlistbox_1 = angular_jqxlistbox_1_1;
            },
            function (angular_jqxnotification_1_1) {
                angular_jqxnotification_1 = angular_jqxnotification_1_1;
            },
            function (angular_jqxdropdownlist_1_1) {
                angular_jqxdropdownlist_1 = angular_jqxdropdownlist_1_1;
            },
            function (angular_jqxchart_1_1) {
                angular_jqxchart_1 = angular_jqxchart_1_1;
            },
            function (angular_jqxswitchbutton_1_1) {
                angular_jqxswitchbutton_1 = angular_jqxswitchbutton_1_1;
            }
        ],
        execute: function () {
            JQXModule = (function () {
                function JQXModule() {
                }
                JQXModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule
                        ],
                        declarations: [
                            angular_jqxgrid_1.jqxGridComponent, angular_jqxtabs_1.jqxTabsComponent, angular_jqxdragdrop_1.jqxDragDropComponent, angular_jqxtreegrid_1.jqxTreeGridComponent, angular_jqxmenu_1.jqxMenuComponent, angular_jqxlistbox_1.jqxListBoxComponent,
                            angular_jqxnotification_1.jqxNotificationComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent, angular_jqxchart_1.jqxChartComponent, angular_jqxswitchbutton_1.jqxSwitchButtonComponent
                        ],
                        exports: [
                            angular_jqxgrid_1.jqxGridComponent, angular_jqxtabs_1.jqxTabsComponent, angular_jqxdragdrop_1.jqxDragDropComponent, angular_jqxtreegrid_1.jqxTreeGridComponent, angular_jqxmenu_1.jqxMenuComponent, angular_jqxlistbox_1.jqxListBoxComponent,
                            angular_jqxnotification_1.jqxNotificationComponent, angular_jqxdropdownlist_1.jqxDropDownListComponent, angular_jqxchart_1.jqxChartComponent, angular_jqxswitchbutton_1.jqxSwitchButtonComponent
                        ]
                    })
                ], JQXModule);
                return JQXModule;
            }());
            exports_1("JQXModule", JQXModule);
        }
    };
});
//# sourceMappingURL=jqx.module.js.map