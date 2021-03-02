System.register(["@angular/core", "@angular/common", "@angular/forms", "@ngx-translate/core", "@angular/material", "app/modules/basic.module", "app/common/panel/iPanel", "app/common/toolbar/iToolbar", "app/common/amount/iAmount", "app/common/textfield/iText", "app/common/textarea/iTextarea", "app/common/number/iNumber", "app/common/rate/iRate", "app/common/calendar/iCalendar", "app/common/dropdown/iDropdown", "app/common/checkbox/iCheckbox", "app/common/radio/iRadio", "app/common/toggleBtn/iToggleBtn"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, core_2, material_1, basic_module_1, iPanel_1, iToolbar_1, iAmount_1, iText_1, iTextarea_1, iNumber_1, iRate_1, iCalendar_1, iDropdown_1, iCheckbox_1, iRadio_1, iToggleBtn_1, MainModule;
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
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (basic_module_1_1) {
                basic_module_1 = basic_module_1_1;
            },
            function (iPanel_1_1) {
                iPanel_1 = iPanel_1_1;
            },
            function (iToolbar_1_1) {
                iToolbar_1 = iToolbar_1_1;
            },
            function (iAmount_1_1) {
                iAmount_1 = iAmount_1_1;
            },
            function (iText_1_1) {
                iText_1 = iText_1_1;
            },
            function (iTextarea_1_1) {
                iTextarea_1 = iTextarea_1_1;
            },
            function (iNumber_1_1) {
                iNumber_1 = iNumber_1_1;
            },
            function (iRate_1_1) {
                iRate_1 = iRate_1_1;
            },
            function (iCalendar_1_1) {
                iCalendar_1 = iCalendar_1_1;
            },
            function (iDropdown_1_1) {
                iDropdown_1 = iDropdown_1_1;
            },
            function (iCheckbox_1_1) {
                iCheckbox_1 = iCheckbox_1_1;
            },
            function (iRadio_1_1) {
                iRadio_1 = iRadio_1_1;
            },
            function (iToggleBtn_1_1) {
                iToggleBtn_1 = iToggleBtn_1_1;
            }
        ],
        execute: function () {
            MainModule = (function () {
                function MainModule() {
                }
                MainModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            core_2.TranslateModule,
                            material_1.MaterialModule,
                            basic_module_1.BasicModule
                        ],
                        declarations: [
                            iPanel_1.PanelComponent, iToolbar_1.ToolbarComponent, iAmount_1.AmountComponent, iText_1.TextComponent, iTextarea_1.TextareaComponent, iNumber_1.NumberComponent, iRate_1.RateComponent, iCalendar_1.CalendarComponent, iDropdown_1.DropDownComponent,
                            iCheckbox_1.CheckboxComponent, iRadio_1.RadioComponent, iToggleBtn_1.ToggleButtonComponent
                        ],
                        exports: [
                            iPanel_1.PanelComponent, iToolbar_1.ToolbarComponent, iAmount_1.AmountComponent, iText_1.TextComponent, iTextarea_1.TextareaComponent, iNumber_1.NumberComponent, iRate_1.RateComponent, iCalendar_1.CalendarComponent, iDropdown_1.DropDownComponent,
                            iCheckbox_1.CheckboxComponent, iRadio_1.RadioComponent, iToggleBtn_1.ToggleButtonComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], MainModule);
                return MainModule;
            }());
            exports_1("MainModule", MainModule);
        }
    };
});
//# sourceMappingURL=main.module.js.map