System.register(["@angular/core", "app/base/iField", "app/services/data.service", "app/services/global.service", "app/widgets/piechart/piechart.component", "app/widgets/sunburst/sunburst.component", "app/widgets/stackedBars/stackedBars.component", "app/widgets/MultiLineZoom/MultiLineZoom",  "app/common/widgetcontainer/iWidgetContainer", "app/common/maximizeWidget/iMaximize", "app/common/icon/iIcon"], function (exports_1, context_1) {
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
    function divMove(e) {
        return;
        var div = document.getElementById('info');
        div.style.position = 'absolute';
        div.style.top = (e.clientY - 450) + 'px';
        div.style.left = (e.clientX - 680) + 'px';
    }
    var core_1, iField_1, data_service_1, global_service_1, piechart_component_1, sunburst_component_1, stackedBars_component_1, MultiLineZoom_1, iWidgetContainer_1, iMaximize_1, iIcon_1, DashboardComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iField_1_1) {
                iField_1 = iField_1_1;
            },
            function (piechart_component_1_1) {
                piechart_component_1 = piechart_component_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (stackedBars_component_1_1) {
                stackedBars_component_1 = stackedBars_component_1_1;
            },    
            function (MultiLineZoom_1_1) {
                MultiLineZoom_1 = MultiLineZoom_1_1;
            },         
            function (iWidgetContainer_1_1) {
                iWidgetContainer_1 = iWidgetContainer_1_1;
            },
            function (iMaximize_1_1) {
                iMaximize_1 = iMaximize_1_1;
            },
            function (iIcon_1_1) {
                iIcon_1 = iIcon_1_1;
            }
        ],
        execute: function () {
            DashboardComponent = (function (_super) {
                __extends(DashboardComponent, _super);
                function DashboardComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.helpShow = false;
                    _this.modalFlag = false;
					 _this.isSunburst = false;
                    _this.isAssetPosition = false;
                    _this.isMMds = false;
                    _this.isMMcc = false;
					_this.isPFCurrPosition =false;
                    return _this;
                
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    this.globalService.isConsole = false;
                    console.log("--- calling globalService.setMainEntitlements()");
                    this.globalService.setMainEntitlements();
                    console.log("--- calling userEntitledDashboard()");
                    this.userEntitledDashboardTabs();
                };
                DashboardComponent.prototype.userEntitledDashboardTabs = function () {
                    console.log("--- in userEntitledDashboardTabs:");
					          var _this = this;
                    this.docValue = true;
                    this.modalFlag = true;
                    this.profilePrefValue = false;					
					console.log("---User ********", this.globalService.getUserName());
					console.log("---Dealer ********", this.globalService.getDealer());
					console.log("---Module ********", this.globalService.getModule());
					console.log("---Branch ********", this.globalService.getBranch());
					var dealerObj = {"mUsername": this.globalService.getUserName(), "mDealer": this.globalService.getDealer(), "mBranch": this.globalService.getBranch()};
					var inputJSON = JSON.stringify(dealerObj);
					console.log("---inputJSON ********", inputJSON);
                    //Get the Dealer Assigned Modules Information
                    this.dataService.submit(inputJSON, "/ucf/services/settings/dealerModules").subscribe(function (jsonRes) {
                        console.log("dealerModules ********", jsonRes);
						//var _this = this;
						//{"mUsername":"INTELLECTFO","mDealer":"ANGL","mBranch":"1"}
						//AC,AD,ALL,BN,CU,FI,FR,FT,FU,FX,IM,MM,MT,OP
                        if (jsonRes != null && jsonRes.length > 0) {
                            console.log("dealerModules jsonRes.length:", jsonRes.length);
							//Array operations...
							if (jsonRes.includes("ALL")) {//show all links
								return;
							} else { //enforce module-wise entitlements
							 /*   console.log("_this.dashTab ********", _this.dashTab);
								if (!jsonRes.includes("DB")) {
									_this.dashTab.nativeElement.style.display = "none";
								}								
								if (!jsonRes.includes("FX")) {
									_this.fxTab.nativeElement.style.display = "none";
								}
								if (!jsonRes.includes("FI")) {
									_this.fisTab.nativeElement.style.display = "none";
								}								
								if (!jsonRes.includes("MM")) {
									_this.mmTab.nativeElement.style.display = "none";
								}
								if (!jsonRes.includes("CP")) {
									_this.compTab.nativeElement.style.display = "none";
								}
								if (!jsonRes.includes("LR")) {
									_this.riskTab.nativeElement.style.display = "none";
								}									
								if (!jsonRes.includes("OP")) {
									_this.opTab.nativeElement.style.display = "none";
								}	*/						
							}
                        }
                    });
					
                };				
               
                DashboardComponent.prototype.maximize = function (iaction) {
                    //console.log("********id:",iaction);
                    this.modalFlag = true;
                   /* if (iaction == "sunburst") {
                        this.isSunburst = true;
                    }*/
                    if (iaction == "MMds") {
                        this.isMMds = true;
                    }
                    if (iaction == "MMcc") {
                        this.isMMcc = true;
                    }
					 if (iaction == "pieChart") {
                        this.isAssetPosition = true;
                    }
					if (iaction == "HorzStackedBar") {
                        this.isPFCurrPosition = true;
                    }
					/*if(iaction  == "FX_Dealerwise_MTM"){
						this.isFX_Dealerwise_MTM = true;
					}*/
					if(iaction  == "Currency_Position"){
						this.isBrCurPosition = true;
					}

                };
                DashboardComponent.prototype.minimize = function (ev) {
                    this.close();
                };
                DashboardComponent.prototype.close = function () {
                    this.modalFlag = false;
                    //this.isSunburst = false;
                    this.isAssetPosition = false;
                    this.isMMds = false;
                    this.isMMcc = false;
					this.isBrCurPosition = false;
					this.isPFCurrPosition =false;
					//this.isFX_Dealerwise_MTM = false;
                  
                };
                DashboardComponent.prototype.helpPage = function (iaction) {
                    //console.log("helpPage method called in home iaction:", iaction);
                    this.actionValue = iaction;
                    if (this.actionValue == "sunburst" || this.actionValue == "surface3D" || this.actionValue == "stackedBar"
                        || this.actionValue == "radial" || this.actionValue == "MultiLine"
                        || this.actionValue == "compliance" || this.actionValue == "pieChart" || this.actionValue == "HorzStackedBar") {
                        this.helpShow = true;
                        //console.log("helpPage this.helpShow:", this.helpShow);   
                    }
                    else {
                        this.helpShow = false;
                    }
                };
                DashboardComponent.prototype.helpClose = function () {
                    this.helpShow = false;
                };
                /**
                    help related methods:drag & drop
                   */
                DashboardComponent.prototype.addListeners = function (evId) {
                    //console.log("****addListeners:");
                    document.getElementById('info').addEventListener('mousedown', this.mouseDown, false);
                    window.addEventListener('mouseup', this.mouseUp, false);
                };
                DashboardComponent.prototype.mouseUp = function () {
                    //console.log("****mouseUp:");
                    window.removeEventListener('mousemove', divMove, true);
                };
                DashboardComponent.prototype.mouseDown = function (e) {
                    //console.log("****mouseDown e:", e);
                    // to disable text on selection
                    document.onselectstart = function () { return false; };
                    window.addEventListener('mousemove', divMove, true);
                };
                DashboardComponent.prototype.ngOnDestroy = function () {
                  //  this.globalService.isConsole = true;
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'idashboard',
                        moduleId: __moduleName,
                        templateUrl: 'Dashboard.html',
                        directives: [piechart_component_1.PiechartComponent, sunburst_component_1.SunburstComponent, stackedBars_component_1.StackedBarsComponent,
                            MultiLineZoom_1.MultiLineZoomComponent, iMaximize_1.MaximizeComponent, iWidgetContainer_1.WidgetContainerComponent, iIcon_1.IconComponent],
                        styleUrls: ['Dashboard.css']
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], DashboardComponent);
                return DashboardComponent;
            }(iField_1.FieldComponent));
            exports_1("DashboardComponent", DashboardComponent);
        }
    };
});
//# sourceMappingURL=Dashboard.js.map