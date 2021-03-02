System.register(["app/services/global.service", "@angular/core"], function (exports_1, context_1) {
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
    var global_service_1, core_1, EntitlementService;
    return {
        setters: [
            function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            EntitlementService = (function () {
                function EntitlementService(globalService) {
                    this.globalService = globalService;
                    console.log("****** EntitlmentService initialized");
                }
                EntitlementService.prototype.openAngularPopupWindow = function (queryParams) {
                    console.log("########### Received query params: ", queryParams);
                    this.globalService.setReportParams(queryParams);
                    //var query="?";
                    var winname = queryParams['report_service_id'] + queryParams['name'];
                    var indx = openedRepWinNames.indexOf(winname);
                    console.log("Report Window Indx: " + indx);
                    if (indx > -1) {
                        console.log("******Is window Closed", openedRepWindows[indx].closed);
                        if (!openedRepWindows[indx].closed) {
                            openedRepWindows[indx].focus();
                            return;
                        }
                        else {
                            openedRepWinNames.splice(indx, 1);
                            openedRepWindows.splice(indx, 1);
                        }
                    }
                    /*var queryKeys = Object.keys(queryParams);
                    
                    for(var i = 0; i < queryKeys.length; i++){
                        query = query + queryKeys[i] + "=" + queryParams[queryKeys[i]] + "&";
                    }*/
                    var popupWin = parent.window.open(queryParams.path + "?report=" + queryParams['name'], winname, "directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,top=50,left=100");
                    openedRepWindows.push(popupWin);
                    openedRepWinNames.push(winname);
                };
                EntitlementService.prototype.saveWindowLocation = function (winname) {
                    if (winname != 'None') {
                        var indx1 = openedWinNames.indexOf("launcher");
                        var launcherPage = openedWindows[indx1];
                        var appWin = openedWindows[openedWinNames.indexOf(winname)];
                        console.log("########### winname: ", winname, launcherPage);
                        if (appWin && !appWin.closed) {
                            if (launcherPage && !launcherPage.closed) {
                                if (winname.endsWith('FO')) {
                                    console.log("###########Front office window location being saved ");
                                    launcherPage.frames[winname].document.FrontOffice.performAction("SAVEWINLOC");
                                }
                                else {
                                    console.log("###########Back office window location being saved ");
                                    launcherPage.frames[winname].document.BackOffice.performAction("SAVEWINLOC");
                                }
                            }
                        }
                    }
                    //setTimeout(function(){ 
                    //  window.resizeTo(screen.availWidth, screen.availHeight);
                    //  window.focus();
                    //}, 1000);
                };
				EntitlementService.prototype.openWindow = function (selectedMenuItem) {
					var _this = this;
                    console.log("########## selectedMenuItem: ", selectedMenuItem);
                    this.globalService.progressMode = "indeterminate";
                    var tmpPath = "";
                    var tmpModule = "";
                    var tmpOffType = "";
                    var tmpFileType = "";

					tmpPath = selectedMenuItem.path;
					tmpModule = selectedMenuItem.moduleType;
					tmpOffType = selectedMenuItem.officeType;
					tmpFileType = selectedMenuItem.fileType;
                    if (tmpPath == null) {
                        tmpPath = selectedMenuItem.path;
                        tmpFileType = selectedMenuItem.fileType;
                    }
                    // console.log("path**********" + selectedMenuItem.path, "module***********", selectedMenuItem.moduleType, "offType***********", selectedMenuItem.officeType, "actionType***********", selectedMenuItem.actionType, "title***********", selectedMenuItem.title);
                    var windowPath = tmpPath;
                    var winname = '';
                    if (tmpModule == null || tmpOffType == null) {
                        winname = selectedMenuItem.name;
                    }
                    else {
                        winname = tmpModule + tmpOffType;
                    }
                    console.log("*********winname***", winname);
                    var indx = openedWinNames.indexOf(winname);
                    console.log("Window Indx: " + indx);
                    if (tmpFileType == 'other' && indx > -1) {
                        console.log("******", openedWindows[indx].closed);
                        if (!openedWindows[indx].closed) {
                            this.globalService.progressMode = "";
                            return;
                        }
                        else {
                            openedWinNames.splice(indx, 1);
                            openedWindows.splice(indx, 1);
                            openedAppNames.splice(openedAppNames.indexOf(winname), 1);
                        }
                    }
                    else if (tmpFileType == 'applet' && indx > -1) {
                        console.log("####### this.appLauncher.closed: ", this.appLauncher.closed);
                        if (this.appLauncher && !this.appLauncher.closed) {
                            this.globalService.progressMode = "";
                            if (tmpOffType == 'FO')
                                this.appLauncher.frames[winname].document.FrontOffice.performAction(selectedMenuItem.actionType);
                            else
                                this.appLauncher.frames[winname].document.BackOffice.performAction(selectedMenuItem.actionType);
                            return;
                        }
                        else {
                            this.appLauncher = undefined;
                            openedWinNames = [];
                            openedWindows = [];
                            openedAppNames = [];
                        }
                    }
			windowPath = document.location.protocol + '//' + document.location.host + "/" + encodeURI(windowPath + "?showMenu=false&actionType=" + selectedMenuItem.actionType);
                    console.log("windowPath: " + windowPath);
                    if (selectedMenuItem.isPopup) {
                        var popupWin = void 0;
                        if (tmpFileType == 'other') {
				 if(!tmpPath.startsWith('http')) 				     
                            	tmpPath = document.location.protocol + '//' + document.location.host + "/" + tmpPath;
                            popupWin = parent.window.open(tmpPath, "_blank", "directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,top=100,left=200");
                            openedWindows.push(popupWin);
                            openedWinNames.push(winname);
                            setTimeout(function () {
                                _this.globalService.progressMode = "";
                            }, 1000);
                            return;
                        }
                        else if (tmpFileType == 'applet') {
                            console.log("####### this.appLauncher111: ", this.appLauncher);
                            if (!this.appLauncher || (this.appLauncher && this.appLauncher.closed)) {
                                console.log("####### this.appLauncher123: ", this.appLauncher);
                                popupWin = parent.window.open("applauncher.html", "_blank", "directories=no, status=no, menubar=no, scrollbars=no, resizable=no,top=100,left=200");
                                //popupWin.blur();
                                //parent.window.focus();
                                this.appLauncher = popupWin;
                                this.appLauncher.focus();
                                openedWindows.push(popupWin);
                                openedWinNames.push("launcher");
                            }
                            setTimeout(function () {
                                var indx1 = openedWinNames.indexOf("launcher");
                                var launcherPage = openedWindows[indx1];
                                console.log("####### window path: " , windowPath);
                                //console.log("####### winname: " , winname);
                                //console.log("launcherPage[winname]: " , launcherPage[winname]);
                                launcherPage[winname].location = windowPath;
                                openedWindows.push(launcherPage.frames[winname]);
                                openedWinNames.push(winname);
                                openedAppNames.push(winname);
                            }, 2000);
                        }
                        ;
                        setTimeout(function () {
                            _this.globalService.progressMode = "";
                        }, 15000);
                    }
				};
				
                EntitlementService.prototype.openSelectedWindow = function (parentMenu, selectedMenuItem, menuIndx) {
                    this.openWindow(selectedMenuItem);
                };
                EntitlementService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(global_service_1.GlobalService)),
                    __metadata("design:paramtypes", [typeof (_a = typeof global_service_1.GlobalService !== "undefined" && global_service_1.GlobalService) === "function" && _a || Object])
                ], EntitlementService);
                return EntitlementService;
                var _a;
            }());
            exports_1("EntitlementService", EntitlementService);
        }
    };
});
//# sourceMappingURL=entitlement.service.js.map