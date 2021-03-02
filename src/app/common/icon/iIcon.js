System.register(["@angular/core", "app/base/iField"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
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
    var core_1, iField_1, IconComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iField_1_1) {
                iField_1 = iField_1_1;
            }
        ],
        execute: function () {
            IconComponent = (function (_super) {
                __extends(IconComponent, _super);
                function IconComponent(_renderer, _elementRef) {
                    var _this = _super.call(this, _renderer, _elementRef) || this;
                    _this.color = "";
                    _this.bgcolor = "transparent";
                    _this.ilabel = "";
                    _this.itype = "component"; // menu, component, toolbar, application
                    _this.classType = "";
                    _this.handleClickEvent = new core_1.EventEmitter();
                    _this.size = "1.7";
                    _this.placeholder = "";
                    return _this;
                }
                IconComponent.prototype.ngOnInit = function () {
                    if (this.itype == 'application')
                        this.classType = 'ticon';
                    else if (this.itype == 'menu')
                        this.classType = 'tmenuicon';
                    else if (this.itype == 'error')
                        this.classType = 'terroricon';
                    else
                        this.classType = 'tcompicon';
                };
                IconComponent.prototype.handleEvent = function ($event) {
                    console.log("Icon handle event called: " + this.disabled);
                    if (!this.disabled) {
                        console.log("Icon - Event emitted ", $event);
                        this.handleClickEvent.emit({ "value": this.placeholder });
                    }
                };
                IconComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iIcon',
                        templateUrl: "iIcon.html",
                        inputs: ['color', 'bgcolor', 'ilabel', 'itype'],
                        outputs: ['handleClickEvent'],
                        styleUrls: ['iIcon.css']
                    })
                    //This component is used to build the Icon
                    ,
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], IconComponent);
                return IconComponent;
            }(iField_1.FieldComponent));
            exports_1("IconComponent", IconComponent);
        }
    };
});
//# sourceMappingURL=iIcon.js.map