System.register(["@angular/core","app/base/iField","app/common/dropdown/iDropdown" ], function (exports_1, context_1) {
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
    var core_1, iField_1, iDropdown_1,PreEodCheckComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iField_1_1) {
                iField_1 = iField_1_1;
            },
            function (iDropdown_1_1) {
                iDropdown_1 = iDropdown_1_1;
            }
        ],
        execute: function () {
            PreEodCheckComponent = (function (_super) {
                __extends(PreEodCheckComponent, _super);
                function PreEodCheckComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.eodArray = [];
                    _this.eodCheckArray = [];
                    _this.eodMesgArray = [];
                    _this.filterColVal = [];
                    _this.popupMessage = [];
                    _this.response = [];
                    _this.message = "";
                    _this.itemIndex = -1;
                    _this.isMaxShow = false;
                    _this.isMessageShow = false;
                    _this.authFlag = false;
                    _this.modalFlag = false;
                    _this.moduleList = [];
                    _this.officeTypeList = [];
                    _this.CategoryGroupList = [];
                    _this.MesssageTypeList = [];
                    _this.isAuthRequired = true;
                    _this.moduleList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"MM\",\"name\": \"MM\"},{\"id\": \"FX\",\"name\": \"FX\"},{\"id\": \"FT\",\"name\": \"FT\"},{\"id\": \"CO\",\"name\": \"CO\"},{\"id\": \"AD\",\"name\": \"AD\"},{\"id\": \"IMF\",\"name\": \"IMF\"},{\"id\": \"FIS\",\"name\": \"FIS\"},{\"id\": \"AD\",\"name\": \"AD\"},{\"id\": \"AD\",\"name\": \"AD\"}]");
                    _this.officeTypeList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"FO\",\"name\": \"FO\"},{\"id\": \"BO\",\"name\": \"BO\"},{\"id\": \"MO\",\"name\": \"MO\"}]");
                    _this.CategoryGroupList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"SWIFT MESSAGES\",\"name\": \"SWIFT MESSAGES\"},{\"id\": \"Maintanance\",\"name\": \"Maintanance\"},{\"id\": \"FIS ODA\",\"name\": \"FIS ODA\"},{\"id\": \"CMS\",\"name\": \"CMS\"},{\"id\": \"Back Office\",\"name\": \"Back Office\"},{\"id\": \"Front Office\",\"name\": \"Front Office\"},{\"id\": \"CASH MANAGEMENT\",\"name\": \"CASH MANAGEMENT\"},{\"id\": \"RULEBREACHED\",\"name\": \"RULEBREACHED\"},{\"id\": \"ACCENTRIES\",\"name\": \"ACCENTRIES\"},{\"id\": \"Maintanance\",\"name\": \"Maintanance\"}]");
                    _this.MesssageTypeList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"E\",\"name\": \"ERROR\"},{\"id\": \"O\",\"name\": \"OVERRIDE\"}]");
                    return _this;
                }
                PreEodCheckComponent.prototype.ngOnInit = function (changes) {
                    this.eodArray = [];
                    this.eodCheckArray = [];
                    this.eodMesgArray = [];
                    this.filterColVal = [];
                    console.log("moduleList", this.moduleList);
                    this.refreshEodRecord();
                };
                PreEodCheckComponent.prototype.ngOnChanges = function (changes) {
                    console.log("PreEodCheckComponent isAuthRequired... ...  ", this.isAuthRequired);
                };
                PreEodCheckComponent.prototype.authorizeEodRecords = function () {
                    var _this = this;
                    console.log("refreshEodRecord");
                    this.globalService.progressMode = "indeterminate";
                    console.log("this.dataService.rootCtx + 'services/preEod/authorize/1", this.dataService.rootCtx + "services/preEod/authorize/1/" + this.globalService.getUserName());
                    this.dataService.submitForm(this.eodCheckArray, this.dataService.rootCtx + "services/preEod/authorize/1/" + this.globalService.getUserName()).subscribe(function (listItems) {
                        _this.globalService.progressMode = "";
                        _this.response = listItems;
                        console.log("Response**********", _this.response);
                        var status = _this.response.status;
                        _this.isMessageShow = true;
                        if (!status) {
                            if (_this.response.message) {
                                _this.message = _this.response.message;
                            }
                            else {
                                _this.message = "Problem exist on serverside";
                            }
                        }
                        else {
                            if (_this.response.message) {
                                _this.message = _this.response.message;
                            }
                        }
                        _this.modalFlag = true;
                    });
                    setTimeout(function () {
                        _this.globalService.progressMode = "";
                    }, 5000);
                };
                PreEodCheckComponent.prototype.refreshEodRecord = function () {
                    var _this = this;
                    console.log("refreshEodRecord");
                    this.globalService.progressMode = "indeterminate";
                    console.log("this.dataService.rootCtx + 'services/preEod/checkEod/1'", this.dataService.rootCtx + "services/preEod/checkEod/1/" + this.globalService.getUserName());
                    this.dataService.getData(this.dataService.rootCtx + "services/preEod/checkEod/1/" + this.globalService.getUserName(), '').subscribe(function (listItems) {
                        console.log("listItems***refreshEodRecord : ", listItems);
                        //  if(listItems.length > 0){
                        _this.eodArray = listItems;
                        console.log("this.eodArray***refreshEodRecord : ", _this.eodArray);
                        if (_this.eodArray["status"] ) {
                            _this.eodMesgArray = _this.eodArray["Eod_messages"];
                            _this.eodCheckArray = _this.eodMesgArray;
                            console.log("_this.eodCheckArray***refreshEodRecord : ", _this.eodCheckArray);
                            _this.authFlag = _this.eodArray["PREEOD_FLAG"];
							_this.moduleList = _this.eodArray["modules"];
							_this.officeTypeList =  _this.eodArray["officeTypes"];
							_this.CategoryGroupList = _this.eodArray["categoryGroup"];
							//_this.MesssageTypeList = _this.eodArray["messages"];
                            /*if (_this.authFlag == 'false') {
                                _this.authFlag = false;
                            }
                            else if (_this.authFlag == 'true') {
                                _this.authFlag = true;
                            }*/
                        }
                        else {
                            _this.message = _this.eodArray["Error_Message"];
                        }
                        console.log("_this.eodCheckArray***refreshEodRecord : ", _this.eodCheckArray);
                        //  this.authFlag =  false;
                        /*if( (this.eodArray.Eod_messages.length > 0)){
                                 this.eodCheckArray = this.eodArray.Eod_messages;
    `							 console.log("this.eodArray*11111**:",this.eodCheckArray);
                        
                        }else{
                            
                        }*/
                        //}
                        _this.globalService.progressMode = "";
                    });
                    setTimeout(function () {
                        _this.globalService.progressMode = "";
                        if (_this.eodArray.length == 0) {
                            _this.message = "Internal Server Error";
                        }
                        _this.eodFilterClear(_this.m_Module, _this.m_Office_Type, _this.m_Category_Group, _this.m_Ovr_Err);
                        _this.popupMessage = [];
                        _this.itemIndex = -1;
                    }, 7000);
                };
                PreEodCheckComponent.prototype.close = function () {
                    this.modalFlag = false;
                    this.isMessageShow = false;
                    this.message = "";
                };
                PreEodCheckComponent.prototype.openMaxPopup = function (indx) {
                    console.log("openMaxPopup*******:", this.eodCheckArray[indx]);
                    this.popupMessage = this.eodCheckArray[indx].m_Action_Message;
                    this.itemIndex = indx;
                    this.isMaxShow = true;
                };
                PreEodCheckComponent.prototype.checkFlag = function () {
                    this.isMaxShow = false;
                };
                PreEodCheckComponent.prototype.openReportWindow = function (indx) {
                    if ((this.eodCheckArray[indx].m_Report_Service != null) && (this.eodCheckArray[indx].m_Report_Id != null)) {
					console.log("this.eodCheckArray[indx]*************",this.eodCheckArray[indx]);
					  var queryParams = JSON.parse("{"
						+ "\"name\": \""+this.eodCheckArray[indx].m_Report_Id+"\","
						+ "\"title\":\""+this.eodCheckArray[indx].m_CategoryCode+"\","
						+ "\"path\":\"/ucf/#/adhocReport/report\","
						+ "\"attributes\":" 
							+ "{\"tree_data\":true,\"row_info\":false,\"data_group\":false,\"sortable\":false,\"filterable\":false,\"aggregates\":true," 
							+ "\"pdf_export\":false,\"excel_export\":false,\"csv_export\":false,\"nested_table\":false,\"nested_rep_serv_id\":\"0\","
							+ "\"print\":true,\"refresh\":false,\"graph\":false},"
						+ "\"graphAttributes\":"
							+ "{\"graph_type\":null,\"title\":null,\"graph_description\":null,\"x_axis\":null,\"x_axis_unit\":null,\"y_axis_unit\":null,\"series\":null},"
						+ "\"report_service_id\":\""+this.eodCheckArray[indx].m_Report_Service+"\","
							 + "\"queryParams\":{\"report_service_id\":\""+this.eodCheckArray[indx].m_Report_Service+"\"," 
							 +"\"report_id\":\""+this.eodCheckArray[indx].m_Report_Id+"\",\"title\":\""+this.eodCheckArray[indx].m_CategoryCode+"\"}"
						+ "}");
                        console.log("openReportWindow*******queryParams**:", queryParams);
                        this.entitlementService.openAngularPopupWindow(queryParams);
                    }
                    else {
                        console.log("this.eodCheckArray[indx].m_Report_Service ******", this.eodCheckArray[indx].m_Report_Service);
                        this.message = 'NO Data Configured';
                        this.isMessageShow = true;
                        this.modalFlag = true;
                    }
                };
                PreEodCheckComponent.prototype.eodFilterDetails = function (colName, event) {
                    var searchValue = event;
                    //if(event.value != 'ALL'){
                    if (event.value)
                        searchValue = event.value;
                    this.filterColVal = this.filterColVal.filter(function (obj) { return obj.colName != colName; });
                    this.filterColVal.push({ colName: colName, colValue: searchValue });
                    console.log("filterColVal", this.filterColVal);
                    this.filterDetails();
                    //}else{
                    //this.eodCheckArray
                    //}              
                };
                PreEodCheckComponent.prototype.filterDetails = function () {
                    var _this = this;
                    this.eodCheckArray = this.eodMesgArray.filter(function (obj) {
                        var filterArr = _this.filterColVal.map(function (colObj) {
                            if (colObj.colValue == 'ALL') {
                                return true;
                            }
                            return (obj[colObj.colName].toLowerCase().indexOf(colObj.colValue.toLowerCase()) == "-1" ? false : true);
                        });
                        var filterFlag = true;
                        filterArr.forEach(function (obj) {
                            console.log("obj********: ", obj);
                            return filterFlag = filterFlag && obj;
                        });
                        return filterFlag;
                    });
                };
                PreEodCheckComponent.prototype.eodRefresh = function () {
                    console.log("Inside eodRefresh");
                    this.refreshEodRecord();
                    this.eodFilterClear(this.m_Module, this.m_Office_Type, this.m_Category_Group, this.m_Ovr_Err);
                };
                PreEodCheckComponent.prototype.eodFilterClear = function (m_Module, m_Office_Type, m_Category_Group, m_Ovr_Err) {
                    console.log("eodFilterClear***********", m_Module, "**", m_Office_Type, "*****", m_Category_Group, "*****", m_Ovr_Err);
                    if (m_Module)
                        m_Module.value = "ALL";
                    if (m_Office_Type)
                        m_Office_Type.value = "ALL";
                    if (m_Category_Group)
                        m_Category_Group.value = "ALL";
                    if (m_Ovr_Err)
                        m_Ovr_Err.value = "ALL";
                    this.eodCheckArray = this.eodMesgArray;
                    this.filterColVal = [];
                };
                __decorate([
                    core_1.Input('isAuthRequired'),
                    __metadata("design:type", Boolean)
                ], PreEodCheckComponent.prototype, "isAuthRequired", void 0);
                __decorate([
                    core_1.ViewChild('m_Module'),
                    __metadata("design:type", typeof (_a = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _a || Object)
                ], PreEodCheckComponent.prototype, "m_Module", void 0);
                __decorate([
                    core_1.ViewChild('m_Office_Type'),
                    __metadata("design:type", typeof (_b = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _b || Object)
                ], PreEodCheckComponent.prototype, "m_Office_Type", void 0);
                __decorate([
                    core_1.ViewChild('m_Category_Group'),
                    __metadata("design:type", typeof (_c = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _c || Object)
                ], PreEodCheckComponent.prototype, "m_Category_Group", void 0);
                __decorate([
                    core_1.ViewChild('m_Ovr_Err'),
                    __metadata("design:type", typeof (_d = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _d || Object)
                ], PreEodCheckComponent.prototype, "m_Ovr_Err", void 0);
                PreEodCheckComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'ipreEodCheck',
                        templateUrl: 'iPreEodCheck.html',
                        styleUrls: ['iPreEodCheck.css'],
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], PreEodCheckComponent);
                return PreEodCheckComponent;
                var _a, _b, _c, _d;
            }(iField_1.FieldComponent));
            exports_1("PreEodCheckComponent", PreEodCheckComponent);
        }
    };
});
//# sourceMappingURL=iPreEodCheck.js.map