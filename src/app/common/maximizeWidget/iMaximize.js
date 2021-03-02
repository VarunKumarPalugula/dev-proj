System.register(["@angular/core", "app/common/button/iButton", "app/services/global.style", "app/common/icon/iIcon","@ngx-translate/core"], function (exports_1, context_1) {
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
    var core_1, iButton_1, global_style_1, iIcon_1, core_2, MaximizeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iButton_1_1) {
                iButton_1 = iButton_1_1;
            },
            function (global_style_1_1) {
                global_style_1 = global_style_1_1;
            },
            function (iIcon_1_1) {
                iIcon_1 = iIcon_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }
        ],
        execute: function () {
            MaximizeComponent = (function () {
                function MaximizeComponent(globalStyle, translate) {
                    this.globalStyle = globalStyle;
                    this.popupclick = new core_1.EventEmitter();
                }
                MaximizeComponent.prototype.ngOnInit = function () {
                    if (this.popUpType != 'undefined') {
                        this.popType = this.popUpType;
                    }
                };
                // This methode send the value to the Component
                MaximizeComponent.prototype.onConfirmation = function (value) {
                    this.modalFlag = !this.modalFlag;
                    this.popupclick.emit(value);
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], MaximizeComponent.prototype, "popupclick", void 0);
                MaximizeComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iMaximize',
                        templateUrl: 'iMaximize.html',
                        styleUrls: ['iMaximize.css'],
                        inputs: ['modalFlag', 'popUpType', 'title', 'popUpHeight', 'popUpWidth', 'actionType'],
                        directives: [iIcon_1.IconComponent, iButton_1.ButtonComponent]
                    })
                    //This component is built for Rate Values 
                    ,
                    __param(1, core_1.Inject(core_2.TranslateService)),
                    __metadata("design:paramtypes", [typeof (_a = typeof global_style_1.GlobalStyleComponent !== "undefined" && global_style_1.GlobalStyleComponent) === "function" && _a || Object, typeof (_b = typeof core_2.TranslateService !== "undefined" && core_2.TranslateService) === "function" && _b || Object])
                ], MaximizeComponent);
                return MaximizeComponent;
                var _a, _b;
            }());
            exports_1("MaximizeComponent", MaximizeComponent);
        }
    };
});
//# sourceMappingURL=iMaximize.js.map