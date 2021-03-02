System.register(["@angular/core", "@angular/router", "@angular/material", "app/common/breadcrumb/iBreadcrumb", "app/services/global.style", "app/services/preferences.service", "app/services/global.service", "@ngx-translate/core", "app/common/icon/iIcon", "app/services/data.service"], function (exports_1, context_1) {
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
    var core_1, router_1, material_1, material_2, iBreadcrumb_1, global_style_1, preferences_service_1, global_service_1, core_2, iIcon_1, data_service_1, WidgetContainerComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
                material_2 = material_1_1;
            },
            function (iBreadcrumb_1_1) {
                iBreadcrumb_1 = iBreadcrumb_1_1;
            },
            function (global_style_1_1) {
                global_style_1 = global_style_1_1;
            },
            function (preferences_service_1_1) {
                preferences_service_1 = preferences_service_1_1;
            },
            function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (iIcon_1_1) {
                iIcon_1 = iIcon_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            }
        ],
        execute: function () {
            WidgetContainerComponent = (function () {
                function WidgetContainerComponent(dataService, router, globalStyle, preferencesService, globalService, translate) {
                    this.dataService = dataService;
                    this.globalStyle = globalStyle;
                    this.preferencesService = preferencesService;
                    this.globalService = globalService;
                    this.opened = true;
                    this.requestType = "favorites";
                    this.MaxMinFlag = "false";
					 this.isStackedBar = false;
                    this.zoomOut = false;
                    this.helpFlag = false;
                    this.maxWidgetEvent = new core_1.EventEmitter();
                    this.minWidgetEvent = new core_1.EventEmitter();
					this.backWidgetEvent = new core_1.EventEmitter();
                    this.helpWidgetEvent = new core_1.EventEmitter();
                    this.reloadWidgetEvent = new core_1.EventEmitter();
					this.downloadImageEvent = new core_1.EventEmitter();
                    
					this.menuFlag = false;
					this.menuList = [];
					this.widgetInfo = [];
					this.brdcrmb=[];
                }
                WidgetContainerComponent.prototype.ngOnInit = function () {
					var _this = this;
                    this.launchDate = new Date();
                    var sec = this.launchDate.getSeconds();
                    var min = this.launchDate.getMinutes();
                    var hour = this.launchDate.getHours();
                    //console.log("header ", this.launchDate);
                    this.launchTime = hour + ":" + min + ":" + sec;
                    this.launchTime = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
					
					/*
					var winName = "FXFO";
                    var winPath = "FXFrontOfficeLoader.jsp?showMenu=false&actionType=" + winName + action;					
					*/
					/*_this.menuList = [
					{"action":"Deal_Settlement","displayName":"Front Office - Deal Settlement"},
					{"action":"Deal_Blotter","displayName":"Front Office - Deal Blotter"},
					{"action":"Deal_Settlement","displayName":"Back Office - Deal Settlement"},
					{"action":"Deal_Blotter","displayName":"Back Office - Deal Blotter"},
					{"action":"Deal_Blotter","displayName":"Back Office - Deal Blotter"},
					{"action":"Deal_Blotter","displayName":"Back Office - Deal Blotter"},
					{"action":"Deal_Blotter","displayName":"Back Office - Deal Blotter"},
					{"action":"Deal_Blotter","displayName":"Back Office - Deal Blotter"}
					];*/
                };
				
				WidgetContainerComponent.prototype.showMenu = function () {
					var _this = this;
					console.log("Deal Operations - showMenu for requestType:", _this.ititle);
          console.log("widgetReqType::",_this.widgetReqType);
					//show operations menu list
					_this.menuFlag = !_this.menuFlag;
					var requestType = _this.widgetReqType; //this.ititle.replace(/ /g, '_');
					//get the menu
                   this.dataService.getListItemsByPost('analytics/widgetInfo', requestType).subscribe(function (listItems) {
                        console.log("--- widgetInfo:",listItems);
						//{"module":"FX", "officeType":"FO","page":"Deal_Settlement","displayName":"Front Office - Deal Settlement"}		
						_this.widgetInfo = listItems;
						if (listItems.length > 0) {
							var operationsStr = listItems[0].DEAL_OPERATIONS;
							console.log("--- widgetInfo: operationsStr",operationsStr);
							_this.menuList = JSON.parse("["+operationsStr+"]");
							console.log("--- widgetInfo: menuList",_this.menuList);
							
						} else {
							//Deal Operations menu items not configured
							console.log("--- widgetInfo: menuList, not configured");
							//Do not show menu
							_this.menuFlag = !_this.menuFlag;
						}
					});					
                    //this.maxWidgetEvent.emit({ value: this.zoomOut });						
                };	
				
                WidgetContainerComponent.prototype.zoomOutPage = function (event) {
					var _this = this;
					_this.menuFlag = false;
                    //console.log("zoomOutPage ", event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
                    //console.log("zoom-out:",this.zoomOut);
                    this.zoomOut = !this.zoomOut;
                    this.maxWidgetEvent.emit({ value: this.zoomOut });
                };
                WidgetContainerComponent.prototype.exitFullScreen = function () {
					var _this = this;
					_this.menuFlag = false;
                    //console.log("**exit full screen:");
                    this.zoomOut = !this.zoomOut;
                    this.minWidgetEvent.emit({ value: this.zoomOut });
                };
                WidgetContainerComponent.prototype.help = function (event) {
					var _this = this;
					_this.menuFlag = false;
                    //console.log("**help:");
                    this.helpFlag = !this.helpFlag;
                    this.helpWidgetEvent.emit({ value: this.helpFlag });
                };
				 WidgetContainerComponent.prototype.breadcrumbEvent = function (event) {
					var _this = this;
					console.log("************ breadcrumbEvent:",event);
					var widReqType = event;
					this.backWidgetEvent.emit({value:widReqType});
                };
                WidgetContainerComponent.prototype.reload = function () {
                    this.zoomOut = !this.zoomOut;
                    this.reloadWidgetEvent.emit({ value: this.zoomOut });
					 this.launchDate = new Date();
                    var sec = this.launchDate.getSeconds();
                    var min = this.launchDate.getMinutes();
                    var hour = this.launchDate.getHours();
                    //console.log("header ", this.launchDate);
                    this.launchTime = hour + ":" + min + ":" + sec;
                    this.launchTime = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
                    this.menuFlag = false;
                };
                WidgetContainerComponent.prototype.downloadAsImage = function (event) {
					var _this = this;
					_this.menuFlag = false;
					console.log("downloadAsImage*******event:",event);
                    console.log("downloadAsImage title:", this.ititle," 555this.isStackedBar ",this.isStackedBar);
					if(this.isStackedBar){
						this.downloadImageEvent.emit({ value: true ,title:this.ititle});
					}else{
						var containerNode = this.widgetContainer.nativeElement;
						var svgNode = containerNode.getElementsByTagName("svg")[0];
						var fileType = "image/png";
						var dataURL = svgNode.toDataURL(fileType, {
							renderer: "canvg",
							callback: function (data) {
								//console.log("***  data", data);
								var image = new Image();
								image.src = data;
							}
						});
						//console.log("*** after canvas.toDataURL", dataURL);
						var binStr = atob(dataURL.split(',')[1]);
						var len = binStr.length;
						var arr = new Uint8Array(len);
						for (var i = 0; i < len; i++) {
							arr[i] = binStr.charCodeAt(i);
						}
						var blob = new Blob([arr], { type: fileType });
						var fileName = this.ititle;
						//fileName.replace(/ /g, '_');
						if (fileName == "") {
							fileName = "Widget";
						}
						saveAs(blob, fileName + '.png');
					}
                };
                
          WidgetContainerComponent.prototype.getPage = function (menuIndex) {
				console.log("--- selectedMenuItem: ", menuIndex);
				//{"module":"MM","office":"FO","action":"MMFODeal_Settlement","displayName":"MM - Deal Settlement","JSP":"MMFrontOfficeLoader.jsp","URL":""},{"module":"MM","office":"FO","action":"MMFORisk_Sheet","displayName":"MM - Risk Sheet","JSP":"MMFrontOfficeLoader.jsp","URL":""}
					var _this = this;
					//hide operations menu list
					_this.menuFlag = false;
					
					console.log("widgetReqType::",_this.widgetReqType);
					var jspName ='';
					var urlPath ='';
					var action ='';
					var winPath = "";
					var winName ="";

					if (_this.menuList[menuIndex].JSP != null) {
						console.log("---Menu Item - JSP: ",_this.menuList[menuIndex].JSP);
						jspName = _this.menuList[menuIndex].JSP;
					}
					if (_this.menuList[menuIndex].URL != null) {
						console.log("---Menu Item - URL: ",_this.menuList[menuIndex].URL);
						urlPath = _this.menuList[menuIndex].URL;
					}	
					if (_this.menuList[menuIndex].action != null) {
						console.log("---Menu Item - action: ",_this.menuList[menuIndex].action);
						action = _this.menuList[menuIndex].action;
					}
					
					//var tmpPath = "FISFrontOfficeLoader.jsp";
                    //var tmpModule = "FI";
                    //var tmpOffType = "FO";
                    //var tmpFileType = "applet";
					//var tmpActionType = "FISDeal_Capture";                    
					
                    this.globalService.progressMode = "indeterminate";
                    var tmpPath = jspName;
                    var tmpModule = _this.widgetInfo[0].MODULE;
                    var tmpOffType = _this.widgetInfo[0].OFFICETYPE;
                    var tmpFileType = "applet";
					var tmpActionType = _this.menuList[menuIndex].action;
					
					if (_this.menuList[menuIndex].module != null) {
						if (_this.menuList[menuIndex].module != "") {
							tmpModule = _this.menuList[menuIndex].module;
							console.log("-- Menu Item Module: " + tmpModule);
						}
					}
					if (_this.menuList[menuIndex].office != null) {
						if (_this.menuList[menuIndex].office != "") {
							tmpOffType = _this.menuList[menuIndex].office;
							console.log("-- Menu Item Office: " + tmpOffType);
						}
					}					

					var indx1 = openedWinNames.indexOf("launcher");
					var appLauncher;
					if (indx1 > -1){
						appLauncher = openedWindows[indx1];
					}
					
                    var windowPath = tmpPath;
                    var winname = tmpModule + tmpOffType;

                    var indx = openedWinNames.indexOf(winname);
                    console.log("Window Indx: " + indx);
					
					if (tmpFileType == 'applet' && indx > -1) {
						console.log("####### this.appLauncher: ", appLauncher);
                        console.log("####### this.appLauncher.closed: ", appLauncher.closed);
                        if (appLauncher && !appLauncher.closed) {
                            this.globalService.progressMode = "";
                            if (tmpOffType == 'FO')
                                appLauncher.frames[winname].document.FrontOffice.performAction(tmpActionType);
                            else
                                appLauncher.frames[winname].document.BackOffice.performAction(tmpActionType);
                            return;
                        }
                        else {
                            appLauncher = undefined;
                            openedWinNames = [];
                            openedWindows = [];
							//openedAppNames = [];
                        }
                    }
                    windowPath = document.location.protocol + '//' + document.location.host + "/" + encodeURI(windowPath + "?showMenu=false&actionType=" + tmpActionType);
                    console.log("--- windowPath: " + windowPath);
					
                        var popupWin = void 0;
                        if (tmpFileType == 'applet') {
                            console.log("####### this.appLauncher111: ", appLauncher);
                            if (!appLauncher) {
                                console.log("####### this.appLauncher123: ", appLauncher);
                                popupWin = parent.window.open("applauncher.html", "_blank", "directories=no, status=no, menubar=no, scrollbars=no, resizable=no,top=100,left=200");
                                //popupWin.blur();
                                //parent.window.focus();
                                appLauncher = popupWin;
								appLauncher.focus();
                                openedWindows.push(popupWin);
                                openedWinNames.push("launcher");
                            }
                            setTimeout(function () {
                                var indx1 = openedWinNames.indexOf("launcher");
                                var launcherPage = openedWindows[indx1];
                                //console.log("####### window path: " , launcherPage);
                                //console.log("####### winname: " , winname);
                                //console.log("launcherPage[winname]: " , launcherPage[winname]);
                                launcherPage[winname].location = windowPath;
                                openedWindows.push(launcherPage.frames[winname]);
                                openedWinNames.push(winname);
								//openedAppNames.push(winname);
                            }, 2000);
                        }
						
                        setTimeout(function () {
                            _this.globalService.progressMode = "";
                        }, 15000);
                };
				
                WidgetContainerComponent.prototype.toggle = function () {
                    this.opened = !this.opened;
                };
                __decorate([
                    core_1.ViewChild('widgetContainer'),
                    __metadata("design:type", core_1.ElementRef)
                ], WidgetContainerComponent.prototype, "widgetContainer", void 0);
                WidgetContainerComponent = __decorate([
                    core_1.Component({
                        selector: 'iWidgetContainer',
                        moduleId: __moduleName,
                        styleUrls: ['iWidgetContainer.css'],
                        templateUrl: 'iWidgetContainer.html',
                        inputs: ['ititle', 'zoomOut', 'MaxMinFlag','widgetReqType','brdcrmb','isStackedBar'],
                        outputs: ['maxWidgetEvent', 'helpWidgetEvent', 'minWidgetEvent', 'reloadWidgetEvent','backWidgetEvent','downloadImageEvent'],
                        directives: [material_1.MdCard, material_2.MdButton, iBreadcrumb_1.BreadcrumbComponent, iIcon_1.IconComponent],
                        providers: [data_service_1.DataService, preferences_service_1.PreferencesService]
                    })
                    //This component is built for Panel
                    ,
                    __param(0, core_1.Inject(data_service_1.DataService)), __param(1, core_1.Inject(router_1.Router)), __param(2, core_1.Inject(global_style_1.GlobalStyleComponent)),
                    __param(3, core_1.Inject(preferences_service_1.PreferencesService)),
                    __param(4, core_1.Inject(global_service_1.GlobalService)),
                    __param(5, core_1.Inject(core_2.TranslateService)),
                    __metadata("design:paramtypes", [typeof (_a = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _a || Object, router_1.Router, typeof (_b = typeof global_style_1.GlobalStyleComponent !== "undefined" && global_style_1.GlobalStyleComponent) === "function" && _b || Object, typeof (_c = typeof preferences_service_1.PreferencesService !== "undefined" && preferences_service_1.PreferencesService) === "function" && _c || Object, typeof (_d = typeof global_service_1.GlobalService !== "undefined" && global_service_1.GlobalService) === "function" && _d || Object, typeof (_e = typeof core_2.TranslateService !== "undefined" && core_2.TranslateService) === "function" && _e || Object])
                ], WidgetContainerComponent);
                return WidgetContainerComponent;
                var _a, _b, _c, _d, _e;
            }());
            exports_1("WidgetContainerComponent", WidgetContainerComponent);
        }
    };
});
//# sourceMappingURL=iWidgetContainer.js.map