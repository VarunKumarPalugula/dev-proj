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
    var core_1, iField_1, HeaderComponent;
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
            HeaderComponent = (function (_super) {
                __extends(HeaderComponent, _super);
                function HeaderComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.prefValue = false;
                    _this.modalFlag = false;
                    _this.profilePrefValue = false;
                    _this.docValue = false;
                    _this.aboutValue = false;
                    _this.aboutObj = { "mBuildDate": "14-Jan-2019", "mRevision": "19.1" };
                    _this.treeList = [];
                    _this.treeListRight = [];
                    _this.filteredList = [];
                    _this.currTheme = 'theme1';
                    _this.settingsMenuOpen = false;
                    _this.isModuleHide = true;
                    _this.uploadFlag = false;
					_this.eodCheck = false;
                    _this.allowedMimeType = ['image/png', 'image/jpg', 'image/jpeg'];
                    _this.tickerList = [];
                    _this.notifFlag = false;
					_this.logoutFlag = false;
                    _this.winNames = [];
                    _this.menuStatusChange = new core_1.EventEmitter();
                    _this.refreshReportEvent = new core_1.EventEmitter();
                    return _this;
                }
                HeaderComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userImagePath = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/getImage/userImage/";
                    this.bnkLogoPath = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/getImage/bankLogo/";
                    this.url = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/upload/";
                    this.userImageUrl = this.userImagePath + "1";
                    this.bnkLogoUrl = this.bnkLogoPath + "1";
                    //Get the Scroll Information
                    this.dataService.getData("", "/data/tickerInfo").subscribe(function (listItems) {
                        _this.tickerList = listItems;
                        console.log("tickerList ********", _this.tickerList);
                    });
                    this.prefAvailData = [
                        {
                            "FUNCTION_NAME": "Current Bond Prices",
                            "WIDGET_NAME": "stackedBars"
                        },
                        {
                            "FUNCTION_NAME": "Current FX Rates",
                            "WIDGET_NAME": "stackedBars"
                        },
                        {
                            "FUNCTION_NAME": "FIS Composition",
                            "WIDGET_NAME": "pieChart"
                        },
                        {
                            "FUNCTION_NAME": "FX Position",
                            "WIDGET_NAME": "sunburst"
                        },
                        {
                            "FUNCTION_NAME": "FX Rates",
                            "WIDGET_NAME": "multiLine"
                        },
                        {
                            "FUNCTION_NAME": "FX Status",
                            "WIDGET_NAME": "pieChart"
                        },
                        {
                            "FUNCTION_NAME": "Forex Reserves",
                            "WIDGET_NAME": "sunburst"
                        },
                        {
                            "FUNCTION_NAME": "Historical Bond Prices",
                            "WIDGET_NAME": "multiLine"
                        },
                        {
                            "FUNCTION_NAME": "Cashflow",
                            "WIDGET_NAME": "sunburst"
                        },
                        {
                            "FUNCTION_NAME": "Composition",
                            "WIDGET_NAME": "sunburst"
                        },
                        {
                            "FUNCTION_NAME": "FIS Issuer",
                            "WIDGET_NAME": "pieChart"
                        },
                        {
                            "FUNCTION_NAME": "Operations Throughput",
                            "WIDGET_NAME": "radialProgress"
                        },
                        {
                            "FUNCTION_NAME": "Liquidity and Risk",
                            "WIDGET_NAME": "surface3D"
                        }
                    ];
                    this.prefSelData = [
                        {
                            "FUNCTION_NAME": "Forex Reserves",
                            "WIDGET_NAME": "stackedBars"
                        },
                        {
                            "FUNCTION_NAME": "Liquidity and Risk",
                            "WIDGET_NAME": "stackedBars"
                        },
                        {
                            "FUNCTION_NAME": "Current FX Rates",
                            "WIDGET_NAME": "stackedBars"
                        },
                        {
                            "FUNCTION_NAME": "Operations Throughput",
                            "WIDGET_NAME": "stackedBars"
                        },
                    ];
                    this.prefAvailData.sort();
                    for (var i = 0; i < this.prefAvailData.length; i++) {
                        for (var j = 0; j < this.prefSelData.length; j++) {
                            if (this.prefSelData[j].FUNCTION_NAME == this.prefAvailData[i].FUNCTION_NAME) {
                                this.prefAvailData.splice(this.prefAvailData.indexOf(this.prefAvailData[i]), 1);
                            }
                        }
                    }
                    //Get the About Information
                    this.dataService.getData("", _this.dataService.rootCtx + "services/settings/about").subscribe(function (jsonRes) {
                        console.log("About response********", JSON.stringify(jsonRes));
                        if (jsonRes != null && jsonRes.mBuildDate != null) {
                            var strMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            var s1dat = jsonRes.mBuildDate.split("-");
                            var bDate = new Date(s1dat[0], s1dat[1], s1dat[2]);
                            console.log("bDate ********", bDate);
                            var formatDate = bDate.getDate() + "-" + strMonth[bDate.getMonth() - 1] + "-" + bDate.getFullYear();
                            console.log("Formatted Build Date ********", formatDate);
                            _this.aboutObj.mBuildDate = formatDate;
                            _this.aboutObj.mRevision = jsonRes.mRevision;
                        }
                    });
                    this.notifArray = this.globalHelpService.getNotification();
                };
                HeaderComponent.prototype.saveWinLocation = function (winIndx) {
                    this.settingsMenuOpen = false;
                    //window.resizeTo(0,0);
                    //window.blur();
                    //setTimeout(()=>{ 
                    this.entitlementService.saveWindowLocation(winIndx);
                    //}, 200);                  
                };
                HeaderComponent.prototype.logout = function (value) {
                    console.log("******logout****",value);
					if(value){
						this.globalService.logoutUser();
						this.dataService.loadPage('MLLogout.jsp');
						window.close();
					}
					this.logoutFlag = value;
                    //this.router.navigate(['']);
                };
                HeaderComponent.prototype.menuChange = function () {
                    this.menuStatusChange.emit();
                };
                //This methode open and close the setting div
                HeaderComponent.prototype.toggleSettingsMenu = function () {
                    if (this.settingsMenuOpen) {
                        this.settingsMenuOpen = false;
                    }
                    else {
                        this.winNames = openedAppNames;
                        this.settingsMenuOpen = true;
                        console.log("##### this.saveLocOptions", this.saveLocOptions);
                        this.saveLocOptions.nativeElement.value = 'None';
                    }
                };
                HeaderComponent.prototype.navigate = function () {
                    this.globalService.setMainEntitlements();
                    this.preferencesService.loadDashboard();
                };
                HeaderComponent.prototype.openWindow = function (entry) {
                    console.log("Window ************", entry);
                    this.entitlementService.openSelectedWindow(null, entry, 1);
                };
                //ChildMenu Search
                HeaderComponent.prototype.childMenusSearch = function (entry) {
					//console.log("-- childMenusSearch  ",entry);
					var value = this.value.trim();
                    if (entry.subMenus != null) {
                        for (var i = 0; i < entry.subMenus.length; i++) {
                            if (entry.subMenus[i].title.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                                if (entry.subMenus[i].subMenus.length == 0){//entry.subMenus[i].subMenus == null) {
                                    console.log(" --  entery  ",entry.subMenus[i].subMenus);
									if (entry.moduleType != null) {
                                        entry.subMenus[i].dispName = entry.moduleType + " " + entry.officeType + " " + entry.subMenus[i].title;
                                        entry.subMenus[i].moduleType = entry.moduleType;
                                        entry.subMenus[i].officeType = entry.officeType;
                                        entry.subMenus[i].subModuleType = entry.subModuleType;
                                    }
                                    else {
                                        if (entry.subMenus[i].isPopup == false) {
                                            entry.subMenus[i].dispName = (entry.subMenus[i].moduleType != null ? entry.subMenus[i].moduleType : "") + " " 
												+ (entry.subMenus[i].officeType!= null ? entry.subMenus[i].officeType:"") + " " + entry.subMenus[i].title;
                                        }
                                        else {
                                            entry.subMenus[i].dispName = entry.title + " " + entry.subMenus[i].title;
                                        }
                                    }
                                    this.filteredList = this.filteredList.concat(entry.subMenus[i]);
                                }
                            }
                            this.childMenusSearch(entry.subMenus[i]); //Recursive
                        }
                    }
                };
                //This methode is for header search
                HeaderComponent.prototype.filter = function () {
                    this.filteredList = []; //empty the filteredList 
                    this.treeList = this.globalService.getLeftMenu();
                    this.treeListRight = this.globalService.getRightMenu();
					var value  = "";

                    if (this.value && this.value.match(/[a-z]/i)) {
						value = this.value.trim()
                        this.showFilteredList = !this.showFilteredList;
                        for (var _i = 0, _a = this.treeList; _i < _a.length; _i++) {
                            var entry = _a[_i];
                            if (entry.title != null) {
                                if (entry.title.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                                    if (entry.subMenus == null) {
                                        entry.dispName = entry.title;
                                        this.filteredList = this.filteredList.concat(entry);
                                    }
                                }
                                this.childMenusSearch(entry);
                            }
                        }
                        /*for (let entry of this.treeListRight)  //traverse the treeListRight
                        {
                            if (entry.dispName.toUpperCase().indexOf(this.value.toUpperCase()) !== -1)//match the  name to the given value
                            {
                                this.filteredList = this.filteredList.concat([entry]);
                            }
            
                            if (typeof entry.subnodes == "object")//check for the subnodes
                            {
                                for (var i = 0; i < entry.subnodes.length; i++) //traverse the subnodes
                                {
                                    if (entry.subnodes[i].dispName.toUpperCase().indexOf(this.value.toUpperCase()) !== -1) //match the subnodes name to the given value
                                    {
                                        this.filteredList = this.filteredList.concat(entry.subnodes[i]);
                                    }
                                }
            
                            }//end of subnodes
            
                        }*/
                        length = this.filteredList.length;
                    }
                };
                HeaderComponent.prototype.hideSearchResult = function () {
                    this.search.nativeElement.value = "";
                    this.filteredList = [];
                };
                HeaderComponent.prototype.changeSettingsFlag = function () {
                    this.settingsMenuOpen = false;
                };
                //This methode is for theme
                HeaderComponent.prototype.changeStyle = function (selIndex) {
                    this.settingsMenuOpen = false;
                    this.globalStyle.setStyleCode(selIndex);
                };
                HeaderComponent.prototype.dashbrdPref = function (val) {
                    console.log("**in pref:");
                    this.prefValue = true;
                    this.modalFlag = true;
                    this.profilePrefValue = false;
                };
                HeaderComponent.prototype.profilePref = function (val) {
                    console.log("**in profile pref:");
                    this.profilePrefValue = true;
                    this.modalFlag = true;
                };
                HeaderComponent.prototype.refreshAdhocReports = function () {
                    console.log("**refreshAdhocReports:");
                    this.refreshReportEvent.emit();
                };
                HeaderComponent.prototype.docPref = function () {
                    var _this = this;
                    console.log("**in Documentation:");
                    this.docValue = true;
                    this.modalFlag = true;
                    this.profilePrefValue = false;
                    console.log("---User ********", this.globalService.getUserName());
                    console.log("---Dealer ********", this.globalService.getDealer());
                    console.log("---Module ********", this.globalService.getModule());
                    console.log("---Branch ********", this.globalService.getBranch());
                    var dealerObj = { "mUsername": this.globalService.getUserName(), "mDealer": this.globalService.getDealer(), "mBranch": this.globalService.getBranch() };
                    var inputJSON = JSON.stringify(dealerObj);
                    console.log("---inputJSON ********", inputJSON);
                    //Get the Dealer Assigned Modules Information
                    this.dataService.submit(inputJSON, _this.dataService.rootCtx + "services/settings/dealerModules").subscribe(function (jsonRes) {
                        console.log("dealerModules ********", jsonRes);
                        //{"mUsername":"INTELLECTFO","mDealer":"ANGL","mBranch":"1"}
                        //AC,AD,ALL,BN,CU,FI,FR,FT,FU,FX,IM,MM,MT,OP
                        if (jsonRes != null && jsonRes.length > 0) {
                            console.log("dealerModules jsonRes.length:", jsonRes.length);
              							//Array operations...
              							if (jsonRes.includes("ALL")) {//show all links
              								return;
              							} else { //enforce module-wise entitlements
              							    console.log("_this.FX ********", _this.FX);
              								if (!jsonRes.includes("FX")) {
              									_this.FX.nativeElement.style.display = "none";
              								}
              								if (!jsonRes.includes("MM")) {
              									_this.MM.nativeElement.style.display = "none";
              								}
              								if (!jsonRes.includes("FI")) {
              									_this.FI.nativeElement.style.display = "none";
              								}
              								if (!jsonRes.includes("SP")) {
              									_this.SP.nativeElement.style.display = "none";
              								}								
              							}
                        }
                    });
					
                };
                HeaderComponent.prototype.aboutPref = function (val) {
                    console.log("**in About:");
                    this.aboutValue = true;
                    this.modalFlag = true;
                    this.profilePrefValue = false;
                };
                HeaderComponent.prototype.close = function () {
                    //this.settingsMenuOpen = false;
                    this.prefValue = false;
                    this.profilePrefValue = false;
                    this.docValue = false;
                    this.aboutValue = false;
                    this.modalFlag = false;
                    this.settingsMenuOpen = false;
					this.eodCheck = false;
					this.logoutFlag = false;
                };
                HeaderComponent.prototype.getImage = function ($event) {
                    this.userImageUrl = this.userImagePath + $event.src;
                };
                HeaderComponent.prototype.getLogo = function ($event) {
                    this.bnkLogoUrl = this.bnkLogoPath + $event.src;
                };
                HeaderComponent.prototype.profileSettings = function () {
                    this.prefValue = false;
                    this.modalFlag = false;
                };
                /**
                 * For toggle Alert
                 *
                 */
                HeaderComponent.prototype.toggleNotif = function () {
                    this.notifFlag = !this.notifFlag;
                };
                /**
                 * for delete the alert message
                 */
                HeaderComponent.prototype.onNotifClose = function (index) {
                    this.notifArray.splice(index, 1);
                };
                HeaderComponent.prototype.openAngularWindow = function (queryParams) {
                    this.entitlementService.openAngularPopupWindow(queryParams);
                };
				HeaderComponent.prototype.preEodDetails = function () {
					console.log("preEodDetails******************",this.eodCheck);
					this.eodCheck = true;
					 this.modalFlag = true;
				};
				HeaderComponent.prototype.onClickLogout = function () {
                    this.logoutFlag = true;
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], HeaderComponent.prototype, "menuStatusChange", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], HeaderComponent.prototype, "refreshReportEvent", void 0);
                __decorate([
                    core_1.ViewChild('search'),
                    __metadata("design:type", core_1.ElementRef)
                ], HeaderComponent.prototype, "search", void 0);
                __decorate([
                    core_1.ViewChild('imgValue'),
                    __metadata("design:type", core_1.ElementRef)
                ], HeaderComponent.prototype, "imgValue", void 0);
                __decorate([
                    core_1.ViewChild('saveLocOptions'),
                    __metadata("design:type", core_1.ElementRef)
                ], HeaderComponent.prototype, "saveLocOptions", void 0);
                __decorate([
                    core_1.ViewChild('FX'),
                    __metadata("design:type", core_1.ElementRef)
                ], HeaderComponent.prototype, "FX", void 0);
                __decorate([
                    core_1.ViewChild('MM'),
                    __metadata("design:type", core_1.ElementRef)
                ], HeaderComponent.prototype, "MM", void 0);
                __decorate([
                    core_1.ViewChild('FI'),
                    __metadata("design:type", core_1.ElementRef)
                ], HeaderComponent.prototype, "FI", void 0);
                __decorate([
                    core_1.ViewChild('SP'),
                    __metadata("design:type", core_1.ElementRef)
                ], HeaderComponent.prototype, "SP", void 0);				
                HeaderComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iHeader',
                        templateUrl: "iHeader.html",
                        inputs: ['menuStatus', 'isModuleHide'],
                        styleUrls: ['iHeader.css']
                    })
                    //This component is built for Header
                    ,
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], HeaderComponent);
                return HeaderComponent;
            }(iField_1.FieldComponent));
            exports_1("HeaderComponent", HeaderComponent);
        }
    };
});
//# sourceMappingURL=iHeader.js.map