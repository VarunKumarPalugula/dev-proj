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
    var core_1, base_component_1, ReportTemplateComponent;
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
            ReportTemplateComponent = (function (_super) {
                __extends(ReportTemplateComponent, _super);
                function ReportTemplateComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.blotterList = [];
                    _this.profileList = [];
                    _this.gridChoiceList = [];
                    _this.modalFlag = false;
                    _this.blotterFlag = true;
                    _this.profileFlag = true;
                    _this.blotterId = "";
                    _this.blotterPref = false;
                    _this.groupData = false;
					_this.rowdetails = false;
					_this.treeData = false;
					_this.title = "";
					_this.inParams = "";
					
					_this.reportServiceId = "";
                    _this.userImagePath = "";
                    _this.bnkLogoPath = "";
                    
                    _this.userImagePath = _this.dataService.protocolType + location.host + _this.dataService.rootCtx + "services/data/getImage/userImage/";
                    _this.bnkLogoPath = _this.dataService.protocolType + location.host + _this.dataService.rootCtx + "services/data/getImage/bankLogo/";
                    _this.userImageUrl = _this.userImagePath + "1";
                    _this.bnkLogoUrl = _this.bnkLogoPath + "1";
					console.log("****** Query Params123 : " , _this.qryParams); 
					if(_this.qryParams['report']){
						_this.inParams = JSON.parse(_this.globalService.getReportParams(_this.qryParams['report']));
					}
					console.log("****** inParams123 : ", _this.inParams); 
					
					if (_this.inParams['report_service_id']) {
						_this.reportServiceId = _this.inParams['report_service_id'];
						_this.reportId = _this.inParams['name'];
						_this.title = _this.inParams['title'];
						_this.fetchGridData();
					}
					
                    return _this;
                }
                ReportTemplateComponent.prototype.blotterChange = function (event) {
                    var _this = this;
                    this.blotterFlag = false;
					 this.profileList=[];
					 this.m_Profile.value = -1;
                    this.blotterId = event.value;
					console.log("############# event: ", event);
                    this.refreshProfileList();
                };
				
				ReportTemplateComponent.prototype.refreshProfileList = function () {
					var _this = this;
					if (this.blotterId && this.blotterId.length > 0) {
                        console.log("this.blotterId path**********  :", "/services/reportservice/reports/" + this.blotterId);
						this.globalService.progressMode = "indeterminate";
                        this.dataService.getData(_this.dataService.rootCtx + "services/reportservice/reports/" + this.blotterId, '').subscribe(function (listItems) {
                            console.log("listItems*** ", listItems);
                            _this.profileList = listItems;
							_this.globalService.progressMode = "";
                        });
						setTimeout(function () {
                            _this.globalService.progressMode = "";
                        }, 5000);
                    }
				};
				
                ReportTemplateComponent.prototype.profileChange = function (event) {
                    if (event && event.value) {
                        this.profileFlag = false;
                    }
                };
				
				ReportTemplateComponent.prototype.fetchGridData = function () {
                    console.log("############## FetchGridData called: ", this.reportServiceId, " : ", this.reportId);
                    this.reqType = "/reportservice/" + this.reportServiceId + "/" + this.reportId;
                    this.gridChoiceList = [];
					//this.groupData = this.m_blotterType.selectedItem.data_group;
					//this.rowdetails = this.m_blotterType.selectedItem.row_info;
					//this.treeData = this.m_blotterType.selectedItem.tree_data;
					this.groupData = false;
					this.rowdetails = false;
					this.treeData = false;
                };
				
                ReportTemplateComponent.prototype.onGoClick = function (blotterValue, profileValue) {
                    console.log(blotterValue, profileValue, "- sdsd  ", this.gridChoiceList);
                    this.reqType = "/reportservice/" + blotterValue.selectedItem.id + "/" + profileValue.selectedItem.id;
                    this.gridChoiceList = [];
					this.groupData = this.m_blotterType.selectedItem.data_group;
					this.rowdetails = this.m_blotterType.selectedItem.row_info;
					this.treeData = this.m_blotterType.selectedItem.tree_data;
                };
                ReportTemplateComponent.prototype.toggleUserProfile = function () {
                    this.blotterPref = !this.blotterPref;
                    this.modalFlag = !this.modalFlag;
					if(!this.modalFlag && !this.blotterPref){
						this.refreshProfileList();
					}
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], ReportTemplateComponent.prototype, "dataList", void 0);
               /* __decorate([
                    core_1.ViewChild("m_blotterType"),
                    __metadata("design:type", Object)
                ], ReportTemplateComponent.prototype, "m_blotterType", void 0);
				 __decorate([
                    core_1.ViewChild("m_Profile"),
                    __metadata("design:type", Object)
                ], ReportTemplateComponent.prototype, "m_Profile", void 0);*/
                ReportTemplateComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'reportTemplate',
                        templateUrl: 'reportTemplate.html',
                        styleUrls: ['reportTemplate.css']
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], ReportTemplateComponent);
                return ReportTemplateComponent;
            }(base_component_1.BaseComponent));
            exports_1("ReportTemplateComponent", ReportTemplateComponent);
        }
    };
});
//# sourceMappingURL=reportTemplate.js.map