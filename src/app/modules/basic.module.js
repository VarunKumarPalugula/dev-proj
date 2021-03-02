System.register(["@angular/core", "@angular/common", "@angular/forms", "@ngx-translate/core", "@angular/platform-browser", "@angular/material", "app/common/errorIcon/iErrorIcon", "app/common/icon/iIcon", "app/common/breadcrumb/iBreadcrumb", "app/common/label/ilabel", "app/common/button/iButton", "app/common/popup/iPopup", "app/common/popup/iPopup-Footer"], function (exports_1, context_1) {
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
    var core_1, common_1, forms_1, core_2, platform_browser_1, material_1, iErrorIcon_1, iIcon_1, iBreadcrumb_1, ilabel_1, iButton_1, iPopup_1, iPopup_Footer_1, BasicModule;
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
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (iErrorIcon_1_1) {
                iErrorIcon_1 = iErrorIcon_1_1;
            },
            function (iIcon_1_1) {
                iIcon_1 = iIcon_1_1;
            },
            function (iBreadcrumb_1_1) {
                iBreadcrumb_1 = iBreadcrumb_1_1;
            },
            function (ilabel_1_1) {
                ilabel_1 = ilabel_1_1;
            },
            function (iButton_1_1) {
                iButton_1 = iButton_1_1;
            },
            function (iPopup_1_1) {
                iPopup_1 = iPopup_1_1;
            },
            function (iPopup_Footer_1_1) {
                iPopup_Footer_1 = iPopup_Footer_1_1;
            }
        ],
        execute: function () {
            BasicModule = (function () {
                function BasicModule(mdIconRegistry, sanitizer) {
                    this.sanitizer = sanitizer;
                    mdIconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('/ucf/assets/svgicons/mdi.svg')); //SVG ICON Replacement
                }
                BasicModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            core_2.TranslateModule,
                            material_1.MaterialModule
                        ],
                        declarations: [
                            iErrorIcon_1.ErrorIconComponent, iIcon_1.IconComponent, iBreadcrumb_1.BreadcrumbComponent, ilabel_1.LabelComponent, iButton_1.ButtonComponent, iPopup_1.PopupComponent, iPopup_Footer_1.PopupFooterComponent
                        ],
                        exports: [
                            iErrorIcon_1.ErrorIconComponent, iIcon_1.IconComponent, iBreadcrumb_1.BreadcrumbComponent, ilabel_1.LabelComponent, iButton_1.ButtonComponent, iPopup_1.PopupComponent, iPopup_Footer_1.PopupFooterComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA],
                        providers: [material_1.MdIconRegistry]
                    }),
                    __metadata("design:paramtypes", [material_1.MdIconRegistry, platform_browser_1.DomSanitizer])
                ], BasicModule);
                return BasicModule;
            }());
            exports_1("BasicModule", BasicModule);
        }
    };
});
//# sourceMappingURL=basic.module.js.map