System.register(["@angular/core", "@angular/common", "@angular/forms", "@ngx-translate/core", "app/modules/basic.module", "app/common/tabmenu/tab", "app/common/tabmenu/tabs", "app/common/carousel/iCarousel", "app/common/carousel/iNavButton", "app/common/carousel/iDotIndicator"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, core_2, basic_module_1, tab_1, tabs_1, iCarousel_1, iNavButton_1, iDotIndicator_1, NavigationModule;
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
            function (tab_1_1) {
                tab_1 = tab_1_1;
            },
            function (tabs_1_1) {
                tabs_1 = tabs_1_1;
            },
            function (iCarousel_1_1) {
                iCarousel_1 = iCarousel_1_1;
            },
            function (iNavButton_1_1) {
                iNavButton_1 = iNavButton_1_1;
            },
            function (iDotIndicator_1_1) {
                iDotIndicator_1 = iDotIndicator_1_1;
            }
        ],
        execute: function () {
            NavigationModule = (function () {
                function NavigationModule() {
                }
                NavigationModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            core_2.TranslateModule,
                            basic_module_1.BasicModule
                        ],
                        declarations: [
                            tab_1.Tab, tabs_1.Tabs, iCarousel_1.CarouselComponent, iNavButton_1.NavButtonComponent, iDotIndicator_1.DotIndicatorComponent
                        ],
                        exports: [
                            tab_1.Tab, tabs_1.Tabs, iCarousel_1.CarouselComponent, iNavButton_1.NavButtonComponent, iDotIndicator_1.DotIndicatorComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], NavigationModule);
                return NavigationModule;
            }());
            exports_1("NavigationModule", NavigationModule);
        }
    };
});
//# sourceMappingURL=navigation.module.js.map