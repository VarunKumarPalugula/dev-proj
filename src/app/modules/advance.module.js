System.register(["@angular/core", "@angular/common", "@angular/forms", "@ngx-translate/core", "app/modules/basic.module", "app/modules/main.module", "app/modules/export.module", "app/modules/jqx.module", "app/common/textsearch/iTextSearch", "app/common/dropdownsearch/iDropdown2", "app/common/grid/iGrid", "app/common/datasearch/iDataSearch", "app/common/treeGrid/iTreeGrid"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, core_2, basic_module_1, main_module_1, export_module_1, jqx_module_1, iTextSearch_1, iDropdown2_1, iGrid_1, iDataSearch_1, iTreeGrid_1, AdvanceModule;
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
            function (core_2_1) {
                core_2 = core_2_1;
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
            function (jqx_module_1_1) {
                jqx_module_1 = jqx_module_1_1;
            },
            function (iTextSearch_1_1) {
                iTextSearch_1 = iTextSearch_1_1;
            },
            function (iDropdown2_1_1) {
                iDropdown2_1 = iDropdown2_1_1;
            },
            function (iGrid_1_1) {
                iGrid_1 = iGrid_1_1;
            },
            function (iDataSearch_1_1) {
                iDataSearch_1 = iDataSearch_1_1;
            },
            function (iTreeGrid_1_1) {
                iTreeGrid_1 = iTreeGrid_1_1;
            }
        ],
        execute: function () {
            AdvanceModule = (function () {
                function AdvanceModule() {
                }
                AdvanceModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            core_2.TranslateModule,
                            basic_module_1.BasicModule,
                            main_module_1.MainModule,
                            export_module_1.ExportModule,
                            jqx_module_1.JQXModule
                        ],
                        declarations: [
                            iTextSearch_1.TextSearchComponent, iDropdown2_1.DropDown2Component, iGrid_1.GridComponent, iDataSearch_1.DataSearchComponent, iTreeGrid_1.TreeGridComponent
                        ],
                        exports: [
                            iTextSearch_1.TextSearchComponent, iDropdown2_1.DropDown2Component, iGrid_1.GridComponent, iDataSearch_1.DataSearchComponent, iTreeGrid_1.TreeGridComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], AdvanceModule);
                return AdvanceModule;
            }());
            exports_1("AdvanceModule", AdvanceModule);
        }
    };
});
//# sourceMappingURL=advance.module.js.map