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
    var core_1, iField_1, CompareComponent;
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
            CompareComponent = (function (_super) {
                __extends(CompareComponent, _super);
                function CompareComponent(_renderer, _elementRef) {
                    var _this = _super.call(this, _renderer, _elementRef) || this;
                    _this.dataList = [];
                    _this.headerData = [];
                    _this.gridHeight = '25vw';
                    _this.rowHeight = '1vw';
                    _this.colWidth = '10vw';
                    _this.headWidth = '90vw';
                    _this.labelPrefix = "";
                    _this.compareList = [];
                    return _this;
                }
                CompareComponent.prototype.ngOnInit = function () {
                    if (this.requestType && this.requestType.length > 0) {
                        this.loadData();
                    }
                    else if (this.dataItemList && this.dataItemList.length != 0) {
                        this.dataList = this.dataItemList[1];
                        this.headerData = this.dataItemList[0];
                        for (var k = 0; k < this.dataItemList[1].length; k++) {
                            this.compareList.push(Array(this.headerData.length).fill('same-text'));
                        }
                        this.compareData();
                    }
                };
                CompareComponent.prototype.compareData = function () {
                    if (this.dataList.length > 1) {
                        for (var i = 0; i < (this.dataList.length - 1); i++) {
                            for (var j = 0; j < this.headerData.length; j++) {
                                if (this.dataList[i][j] != this.dataList[i + 1][j]) {
                                    this.compareList[i][j] = "diff-text";
                                    this.compareList[i + 1][j] = "diff-text";
                                }
								else{
									this.compareList[i][j] = "same-text";
                                    this.compareList[i + 1][j] = "same-text";
								}
                            }
                        }
                    }
                };
                CompareComponent.prototype.loadData = function () {
                    var _this = this;
                    if (this.requestType && this.requestType.length > 0) {
                        this.globalService.progressMode = "indeterminate";
                        this.dataService.getData(this.contextUrl + this.requestType, '').subscribe(function (listItems) {
                            _this.dataList = listItems[1];
                            _this.headerData = listItems[0];
                            _this.compareData();
                            _this.globalService.progressMode = "";
                        });
                        setTimeout(function () {
                            _this.globalService.progressMode = "";
                        }, 8000);
                    }
                };
                /**
                 * To get only number(X) from the measurement data( X%,Xpx,Xvw,Xvh).
                 */
                CompareComponent.prototype.parseNumber = function (val) {
                    var valNum = 0;
                    var len = val.length;
                    if (val.indexOf("%") > 0) {
                        valNum = Number(val.substring(0, len - 1));
                    }
                    else if (val.indexOf("px") > 0 || val.indexOf("vw") > 0 || val.indexOf("vh") > 0) {
                        valNum = Number(val.substring(0, len - 2));
                    }
                    else {
                        valNum = Number(val);
                    }
                    return valNum;
                };
                /**
                 *  This method  will call automatically when data changes, grid is refreshed.
                 */
                CompareComponent.prototype.ngOnChanges = function (changes) {
                    // To get the headerName 
                    if (this.advSearchLabelType && this.advSearchLabelType.length > 0)
                        this.labelPrefix = this.inputParams.moduleType + "." + this.advSearchLabelType + ".";
                };
                CompareComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iCompare',
                        templateUrl: 'iCompare.html',
                        inputs: ['headWidth', 'gridHeight', 'headerData', 'rowHeight', 'colWidth', 'headerData', 'dataItemList'],
                        styleUrls: ['iCompare.css']
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], CompareComponent);
                return CompareComponent;
            }(iField_1.FieldComponent));
            exports_1("CompareComponent", CompareComponent);
        }
    };
});
//# sourceMappingURL=iCompare.js.map