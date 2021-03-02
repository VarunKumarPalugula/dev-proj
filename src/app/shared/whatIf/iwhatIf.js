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
    var core_1, iField_1, WhatIFComponent;
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
            WhatIFComponent = (function (_super) {
                __extends(WhatIFComponent, _super);
                function WhatIFComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.materials = [];
                    _this.headers = [];
                    _this.pagedMaterials = [];
                    _this.whatIfDataList = [[
                            { "header": "MESSAGE", "divisor": "0.0", "precision": "0", "dataType": "NAN", "width": 0, "isSearchable": "false", "fieldType": "LBL" },
                            { "header": "DESCRIPTION", "divisor": "0.0", "precision": "0", "dataType": "NAN", "width": 100, "isSearchable": "false", "fieldType": "LBL" },
                            { "header": "LIMIT", "divisor": "0.0", "precision": "0", "dataType": "NAN", "width": 0, "isSearchable": "false", "fieldType": "CLRWTEXT" }
                        ]];
                    _this.iWhatIfEvent = new core_1.EventEmitter();
                    return _this;
                }
                WhatIFComponent.prototype.ngOnInit = function () {
                    this.createDataList();
                };
                WhatIFComponent.prototype.createDataList = function () {
                    var tempArr = [];
                    var tempArr1 = [];
                    for (var _i = 0, _a = this.whatIfResponce; _i < _a.length; _i++) {
                        var property1 = _a[_i];
                        tempArr1 = [];
                        for (var property2 in property1) {
                            if (property2 == "LIMIT") {
                                if (!property1[property2])
                                    tempArr1.push({ "COLOR": "RED", "TEXT": "LIMIT BURST" });
                                else
                                    tempArr1.push({ "COLOR": "GREEN", "TEXT": "IN LIMIT" });
                            }
                            else {
                                tempArr1.unshift(property1[property2]);
                            }
                        }
                        tempArr.push(tempArr1);
                    }
                    this.whatIfDataList.push(tempArr);
                };
                WhatIFComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iWhatIf',
                        templateUrl: 'iWhatIf.html',
                        inputs: ['whatIfResponce'],
                        outputs: ['iWhatIfEvent'],
                        styleUrls: ['iWhatIf.css']
                    })
                    //This component is built for WhatIf frame
                    ,
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], WhatIFComponent);
                return WhatIFComponent;
            }(iField_1.FieldComponent));
            exports_1("WhatIFComponent", WhatIFComponent);
        }
    };
});
//# sourceMappingURL=iwhatIf.js.map