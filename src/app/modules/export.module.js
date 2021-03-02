System.register(["@angular/core", "@angular/common", "@angular/forms", "ng2-file-upload", "@ngx-translate/core", "app/modules/basic.module", "app/common/print/iPrint", "app/common/spool/iSpool", "app/common/spoolPdf/iSpoolPdf", "app/common/fileUpload/file.upload"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, ng2_file_upload_1, core_2, basic_module_1, iPrint_1, iSpool_1, iSpoolPdf_1, file_upload_1, ExportModule;
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
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (basic_module_1_1) {
                basic_module_1 = basic_module_1_1;
            },
            function (iPrint_1_1) {
                iPrint_1 = iPrint_1_1;
            },
            function (iSpool_1_1) {
                iSpool_1 = iSpool_1_1;
            },
            function (iSpoolPdf_1_1) {
                iSpoolPdf_1 = iSpoolPdf_1_1;
            },
            function (file_upload_1_1) {
                file_upload_1 = file_upload_1_1;
            }
        ],
        execute: function () {
            ExportModule = (function () {
                function ExportModule() {
                }
                ExportModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            ng2_file_upload_1.FileUploadModule,
                            core_2.TranslateModule,
                            basic_module_1.BasicModule
                        ],
                        declarations: [
                            iPrint_1.PrintComponent, iSpool_1.SpoolComponent, iSpoolPdf_1.SpoolPdfComponent, file_upload_1.FileUploadComponent
                        ],
                        exports: [
                            iPrint_1.PrintComponent, iSpool_1.SpoolComponent, iSpoolPdf_1.SpoolPdfComponent, file_upload_1.FileUploadComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], ExportModule);
                return ExportModule;
            }());
            exports_1("ExportModule", ExportModule);
        }
    };
});
//# sourceMappingURL=export.module.js.map