System.register(["@angular/core", "@angular/common", "@angular/forms", "@ngx-translate/core", "app/modules/basic.module", "app/modules/main.module", "app/modules/advance.module", "app/modules/navigation.module", "app/shared/whatIf/iwhatIf", "app/shared/AccountingEntries/iAccountEntry", "app/shared/Settlement/iDealSettlement", "app/shared/MTMessage/iMTMessage", "app/shared/MTMessage/iMTn99Search", "app/shared/Compare/iCompare"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, forms_1, core_2, basic_module_1, main_module_1, advance_module_1, navigation_module_1, iwhatIf_1, iAccountEntry_1, iDealSettlement_1, iMTMessage_1, iMTn99Search_1, iCompare_1, SharedModule;
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
            function (advance_module_1_1) {
                advance_module_1 = advance_module_1_1;
            },
            function (navigation_module_1_1) {
                navigation_module_1 = navigation_module_1_1;
            },
            function (iwhatIf_1_1) {
                iwhatIf_1 = iwhatIf_1_1;
            },
            function (iAccountEntry_1_1) {
                iAccountEntry_1 = iAccountEntry_1_1;
            },
            function (iDealSettlement_1_1) {
                iDealSettlement_1 = iDealSettlement_1_1;
            },
            function (iMTMessage_1_1) {
                iMTMessage_1 = iMTMessage_1_1;
            },
            function (iMTn99Search_1_1) {
                iMTn99Search_1 = iMTn99Search_1_1;
            },
            function (iCompare_1_1) {
                iCompare_1 = iCompare_1_1;
            }
        ],
        execute: function () {
            SharedModule = (function () {
                function SharedModule() {
                }
                SharedModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            forms_1.FormsModule,
                            core_2.TranslateModule,
                            basic_module_1.BasicModule,
                            main_module_1.MainModule,
                            advance_module_1.AdvanceModule,
                            navigation_module_1.NavigationModule
                            //SharedRoutingModule
                        ],
                        declarations: [
                            iwhatIf_1.WhatIFComponent, iAccountEntry_1.AccountingEntriesComponent, iDealSettlement_1.DealSettlementComponent, iMTMessage_1.MTMessageComponent, iMTn99Search_1.MTn99SearchComponent,
                            iCompare_1.CompareComponent
                        ],
                        exports: [
                            iwhatIf_1.WhatIFComponent, iAccountEntry_1.AccountingEntriesComponent, iDealSettlement_1.DealSettlementComponent, iMTMessage_1.MTMessageComponent, iMTn99Search_1.MTn99SearchComponent,
                            iCompare_1.CompareComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], SharedModule);
                return SharedModule;
            }());
            exports_1("SharedModule", SharedModule);
        }
    };
});
//# sourceMappingURL=shared.module.js.map