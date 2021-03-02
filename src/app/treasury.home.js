System.register(["@angular/core", "app/services/global.style", "app/services/global.service"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, global_style_1, global_service_1, TreasuryHomeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (global_style_1_1) {
                global_style_1 = global_style_1_1;
            },
            function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            }
        ],
        execute: function () {
            TreasuryHomeComponent = (function () {
                //public __moduleName: string;
                function TreasuryHomeComponent(globalStyle, globalService) {
                    this.globalStyle = globalStyle;
                    this.globalService = globalService;
                }
                TreasuryHomeComponent = __decorate([
                    core_1.Component({ moduleId: __moduleName,
                        selector: 'my-app',
                        templateUrl: 'treasury.home.html'
                    }),
                    __param(0, core_1.Inject(global_style_1.GlobalStyleComponent)), __param(1, core_1.Inject(global_service_1.GlobalService)),
                    __metadata("design:paramtypes", [typeof (_a = typeof global_style_1.GlobalStyleComponent !== "undefined" && global_style_1.GlobalStyleComponent) === "function" && _a || Object, typeof (_b = typeof global_service_1.GlobalService !== "undefined" && global_service_1.GlobalService) === "function" && _b || Object])
                ], TreasuryHomeComponent);
                return TreasuryHomeComponent;
                var _a, _b;
            }());
            exports_1("TreasuryHomeComponent", TreasuryHomeComponent);
        }
    };
});
//# sourceMappingURL=treasury.home.js.map