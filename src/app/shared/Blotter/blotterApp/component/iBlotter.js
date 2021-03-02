System.register(["@angular/core", "app/base/base.component"], function (exports_1, context_1) {
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
    var core_1, base_component_1, BlotterComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            }
        ],
        execute: function () {
            BlotterComponent = (function (_super) {
                __extends(BlotterComponent, _super);
                function BlotterComponent(_renderer, _elementRef) {
                    var _this = _super.call(this, _renderer, _elementRef) || this;
                    _this.baseUrl = "/ucf/services/blotterhandler/";
                    _this.blotterId = "";
                    _this.blotterOptions = {
                        aggregates: true, csv_export: false, data_group: true, print: false, refresh: true,
                        excel_export: true, filterable: true, pdf_export: false, columnList: true,
                        row_info: false, sortable: true, tree_data: false, graph: false, retainPref: true
                    };
                    _this.secondOptions = {
                        aggregates: true, csv_export: false, data_group: true, print: false, refresh: false,
                        excel_export: true, filterable: false, pdf_export: false, columnList: false,
                        row_info: false, sortable: true, tree_data: false, graph: false
                    };
                    _this.posBlotterList = [[]];
                    _this.tabList = [];
                    _this.chartSource = [];
                    _this.chartPadding = { left: 5, top: 20, right: 5, bottom: 5 };
                    _this.chartTitlePadding = { left: 90, top: 0, right: 0, bottom: 10 };
                    _this.chartXAxis = {};
                    _this.chartSeriesGroups = [];
                    _this.LienDataArr = [];
                    _this.FwdDataArr = [];
                    _this.toolTipCustomFormatFn = function (value, itemIndex, serie, group, categoryValue, categoryAxis) {
                        return '<DIV style="background: #2e3338;color: white;">Value Date: ' +
                            categoryValue + '<br />Quantity: ' +
                            value + '</DIV>';
                    };
                    if (_this.router && _this.router.url) {
                        var lastIndex = _this.router.url.lastIndexOf("/");
                        _this.blotterId = _this.router.url.slice(lastIndex + 1); //FI_POS_BLTR
                        var choiceList = [];
                        _this.tabList = [{
                                "name": "Position Blotter", "active": true, "displayName": "Position Blotter", "isContextMenu": false,
                                "isGroupable": true, "gridWidth": "100%", "firstGridTitle": "Position Blotter", "option": _this.blotterOptions,
                                "closeIcon": false, "gridHeight": "100%"
                            }];
                    }
                    return _this;
                }
                BlotterComponent.prototype.onContextMenuClick = function (event) {
                    var _this = this;
                    var checkTabList;
                    if (this.tabList.length > 0) {
                        checkTabList = this.tabList.filter(function (obj) {
                            if (obj.name != event.selectVal || obj.index != event.rowIndex)
                                return true;
                            return false;
                        });
                        var bps = event.rowData.BPS;
                        var bpsArr = bps.split("-");
                        var jsonObj = { "branch": bpsArr[0], "portfolioCode": bpsArr[1], "strategyCode": bpsArr[2], "securityCode": event.rowData.SECURITY_CODE };
                        if (this.tabList.length == checkTabList.length) {
                            this.tabList = checkTabList;
                            this.globalService.progressMode = "indeterminate";
                            this.dataService.submitForm(jsonObj, this.baseUrl + event.id).subscribe(function (listItems) {
                                _this.globalService.progressMode = "";
                                _this.tabList.push({
                                    "name": event.selectVal, "active": false, "index": event.rowIndex, "firstGridTitle": event.rowData.SECURITY_CODE + " - " + event.rowData.BPS + " - " + event.selectVal,
                                    "displayName": event.rowData.SECURITY_CODE + " - " + event.selectVal, "firstGridData": listItems, "isContextMenu": false,
                                    "isGroupable": false, "gridWidth": "40%", "option": _this.secondOptions, "closeIcon": true, "gridHeight": "50%"
                                });
                            });
                        }
                    }
                };
                BlotterComponent.prototype.onDoubleClick = function (event) {
                    var _this = this;
					if(!event.value.group && event.value.BPS){
                    this.globalService.progressMode = "indeterminate";
                    var lienData = [];
                    var bps = event.value.BPS;
                    var bpsArr = bps.split("-");
                    var jsonObj = { "branch": bpsArr[0], "portfolioCode": bpsArr[1], "strategyCode": bpsArr[2], "securityCode": event.value.SECURITY_CODE, "todayDate": event.value.TODAY_DATE, "branchCode": event.value.BRN_NUM };
                    var index = this.tabList.map(function (x) { return x.index; }).indexOf(event.value.visibleindex);
                    this.dataService.submitForm(jsonObj, this.baseUrl + "lienfwd").subscribe(function (listItems) {
                        _this.LienDataArr = listItems[0].lien;
                        _this.FwdDataArr = listItems[0].fwd;
                        if (index != -1) {
                            _this.tabList[index] = {
                                "name": "both", "active": false, "index": event.value.visibleindex, "firstGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Lien",
                                "secondGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Forward Position",
                                "displayName": event.value.SECURITY_CODE + " - " + bps, "firstGridData": _this.LienDataArr, "secondGridData": _this.FwdDataArr, "isContextMenu": false,
                                "isGroupable": false, "gridWidth": "49.5%", both: true, "option": _this.secondOptions, "closeIcon": true, "gridHeight": "50%"
                            };
                        }
                        else {
                            _this.tabList.push({
                                "name": "both", "active": false, "index": event.value.visibleindex, "firstGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Lien",
                                "secondGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Forward Position",
                                "displayName": event.value.SECURITY_CODE + " - " + bps, "firstGridData": _this.LienDataArr, "secondGridData": _this.FwdDataArr, "isContextMenu": false,
                                "isGroupable": false, "gridWidth": "49.5%", both: true, "option": _this.secondOptions, "closeIcon": true, "gridHeight": "50%"
                            });
                        }
                        _this.drawChart();
                    });
					}
                };
                BlotterComponent.prototype.onTabClose = function (event, tab) {
                    tab.tabs.first.active = true;
                    if (event.value != this.tabList[0].displayName) {
                        var index = this.tabList.map(function (x) {
                            return x.displayName;
                        }).indexOf(event.value);
                        this.tabList.splice(index, 1);
                    }
                };
                BlotterComponent.prototype.drawChart = function () {
                    this.chartXAxis = {
                        dataField: 'VALUE_DATE',
                        displayText: 'VALUE DATE',
                        showGridLines: true,
                        showTickMarks: true,
                        title: { text: 'Value Date' }
                    };
                    this.chartSeriesGroups = [
                        {
                            type: 'column',
                            columnsGapPercent: 25,
                            seriesGapPercent: 10,
                            columnsMaxWidth: 40,
                            columnsMinWidth: 1,
                            toolTipBackground: '#2e3338',
                            toolTipFormatFunction: this.toolTipCustomFormatFn,
                            valueAxis: {
                                logarithmicScale: true,
                                logarithmicScaleBase: 2,
                                unitInterval: 1,
                                tickMarksInterval: 1,
                                gridLinesInterval: 1,
                                displayValueAxis: true
                            },
                            horizontalTextAlignment: 'right',
                            series: [{ "dataField": "QTY", "displayText": "Quantity" }]
                        }
                    ];
                    this.globalService.progressMode = "";
                };
                BlotterComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iBlotter',
                        templateUrl: 'iBlotter.html',
                        styleUrls: ['iBlotter.css']
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], BlotterComponent);
                return BlotterComponent;
            }(base_component_1.BaseComponent));
            exports_1("BlotterComponent", BlotterComponent);
        }
    };
});
//# sourceMappingURL=iBlotter.js.map