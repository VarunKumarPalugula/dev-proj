System.register(["@angular/core"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, GlobalService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            GlobalService = (function () {
                function GlobalService() {
                    this.isAuthUser = false;
                    this.homePage = 'OneTreasury';
                    this.count = 0;
                    this.progressMode = ""; //to set the progress mode
                    this.moduleDispName = 'Modules';
                    this.auditInfo = [];
                    this.applicationDate = "";
                    this.applnDate = new Date("01-01-1970");
                    this.applnTime = "00:00:00";
					this.showDashboard = true;
                    this.isConsole = false;
                    console.log("****** GlobalService initialized", this.moduleDispName);
                }
                GlobalService.prototype.setReportParams = function (inParams) {
                    localStorage.setItem(inParams.name, JSON.stringify(inParams));
                };
                GlobalService.prototype.getReportParams = function (reportName) {
                    var reportParams = localStorage.getItem(reportName);
                    localStorage.removeItem(reportName);
                    return reportParams;
                };
                GlobalService.prototype.getHomePage = function () {
                    return this.homePage;
                };
                GlobalService.prototype.setHomePage = function (page) {
                    this.homePage = page;
                };
                // To get the entitlements
                GlobalService.prototype.setEntitlements = function (data) {
                    console.log("****** GlobalService initialized------", this.moduleDispName);
                    this.entitlements = data;
                    localStorage.setItem("entitlements", this.entitlements);
                    console.log("setEntitlements", this.entitlements);
                    this.setModulesList(this.entitlements);
                };
                GlobalService.prototype.getEntitlements = function () {
                    console.log("getEntitlements");
                    //  return localStorage.getItem("entitlements");
                    return this.entitlements;
                };
                //To set the ModulesList
                GlobalService.prototype.setModulesList = function (modules) {
                    console.log("setModulesList  ", modules);
                    /* for(let module of modules){
                      this.modulesList[module]= modules.displayName;
                      console.log(" this.modulesList******", this.modulesList);
                     }*/
                };
                GlobalService.prototype.getModulesList = function () {
                };
				//Dashboard flag either to show or hide
				GlobalService.prototype.setDashboardFlag = function (flag) {
                    this.showDashboard = flag;
                    localStorage.setItem("showDashboard", flag);
                };
                
                GlobalService.prototype.getDashboardFlag = function () {
                    return localStorage.getItem("showDashboard");
                };
                
                //Setting login user --> required for AuditUser
                GlobalService.prototype.setUserName = function (username) {
                    localStorage.setItem("loginUser", username);
                };
                GlobalService.prototype.getUserName = function () {
                    return localStorage.getItem("loginUser");
                };
                //Set Login user branch and branch change default branch
                GlobalService.prototype.setLoginUserBranch = function (branchCode) {
                    localStorage.setItem("loginUserbranch", branchCode);
                    localStorage.setItem("branch", branchCode);
                };
                GlobalService.prototype.getLoginUserBranch = function () {
                    return localStorage.getItem("loginUserbranch");
                };
                //Set Branch change branch
                GlobalService.prototype.setBranch = function (branchCode) {
                    localStorage.setItem("branch", branchCode);
                };
                GlobalService.prototype.getBranch = function () {
                    return localStorage.getItem("branch");
                };
                //Set Login Module
                GlobalService.prototype.setModule = function (moduleName) {
                    localStorage.setItem("moduleName", moduleName);
                };
                GlobalService.prototype.setDealer = function (dealerId) {
                    localStorage.setItem("dealerId", dealerId);
                };
                GlobalService.prototype.getDealer = function () {
                    return localStorage.getItem("dealerId");
                };
                //Get Login module
                GlobalService.prototype.getModule = function () {
                    return localStorage.getItem("moduleName");
                };
                GlobalService.prototype.setLoginTime = function (loginTime) {
                    localStorage.setItem("loginTime", loginTime);
                };
                GlobalService.prototype.getLoginTime = function () {
                    return localStorage.getItem("loginTime");
                };
                GlobalService.prototype.setApplnDate = function (applnDate1) {
                    localStorage.setItem("applnDate", applnDate1);
                    this.applnDate = new Date(applnDate1);
                    var sec = this.applnDate.getSeconds();
                    var min = this.applnDate.getMinutes();
                    var hour = this.applnDate.getHours();
                    this.applnTime = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
                };
                GlobalService.prototype.getHeaderApplnDate = function () {
                    return localStorage.getItem("applnDate"); //this.applicationDate;
                };
                GlobalService.prototype.getApplnDate = function () {
                    //console.log("getApplnDate start ",localStorage.getItem("applnDate"));
                    var applDate = localStorage.getItem("applnDate");
                    var sptdate = String(applDate).split("-");
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var myMonth = sptdate[0];
                    var myDay = sptdate[1];
                    var myYear = sptdate[2];
                    //let combineDatestr:string = myDay.concat(" ", months[myMonth - 1], " ", myYear);
                    return myDay.concat(" ", months[myMonth - 1], " ", myYear);
                };
                GlobalService.prototype.isValidUser = function () {
                    if (localStorage.getItem("authuser")) {
                        this.isAuthUser = (localStorage.getItem("authuser") == "true");
                    }
                    return this.isAuthUser;
                };
                GlobalService.prototype.logoutUser = function () {
                    console.log("Global Service logout called");
                    localStorage.removeItem("authuser");
                    localStorage.removeItem("superuser");
                    //localStorage.removeItem("moduleName");
                    localStorage.removeItem("username");
                    localStorage.removeItem("dispName");
                    localStorage.removeItem("datetime");
					localStorage.removeItem("showDashboard");
                    //localStorage.removeItem("branch");
                    //localStorage.removeItem("dealer");
                    this.moduleDispName = 'Modules';
                    this.isAuthUser = false;
                    this.entitlements = null;
                };
                GlobalService.prototype.setDashBardEntitlements = function (moduleName, dispName) {
                    this.moduleDispName = dispName;
                    this.count = this.count + 1;
                    if (this.count == 1) {
                        this.parentEntitlements = this.entitlements;
                    }
                    this.tempEntitlements = this.entitlements;
                    this.entitlements = [{
                            superuser: localStorage.getItem("superuser"), moduleName: moduleName,
                            username: localStorage.getItem("username"),
                            dispName: localStorage.getItem("dispName")
                        }];
                };
                GlobalService.prototype.setMainEntitlements = function () {
                    this.entitlements = this.parentEntitlements;
                };
                /**
                 * This method is used to set Left Menu List
                 */
                GlobalService.prototype.setLeftMenu = function (leftMenu) {
                    this.leftMenuList = leftMenu;
                };
                /**
                 * This method returns Left Menu List
                 */
                GlobalService.prototype.getLeftMenu = function () {
                    return this.leftMenuList;
                };
                /**
                 * This method is used to set Right Menu List
                 */
                GlobalService.prototype.setRightMenu = function (rightMenu) {
                    this.rightMenuList = rightMenu;
                };
                /**
                 * This method is used to get Right Menu List
                 */
                GlobalService.prototype.getRightMenu = function () {
                    return this.rightMenuList;
                };
                /**
                 * This method is used to set Favorites
                 */
                GlobalService.prototype.setFavorites = function (favoriteList) {
                    if (favoriteList) {
                        console.log("Favorites =" + JSON.stringify(favoriteList));
                        this.favorites = favoriteList;
                        localStorage.setItem("favorites", JSON.stringify(this.favorites));
                    }
                };
                /**
                 * This method is used to get Favorites
                 */
                GlobalService.prototype.getFavoriteStatus = function (name) {
                    if (!this.favorites) {
                        if (localStorage.getItem("favorites")) {
                            this.favorites = JSON.parse(localStorage.getItem("favorites"));
                            console.log("favorites " + JSON.stringify(this.favorites));
                        }
                    }
                    if (this.favorites) {
                        for (var i = 0; i < this.favorites.length; i++) {
                            if (this.favorites[i].name == name) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                GlobalService.prototype.setAuditInfo = function (auditInfo) {
                    this.auditInfo = auditInfo;
                };
                GlobalService.prototype.getAuditInfo = function () {
                    return this.auditInfo;
                };
                
				GlobalService.prototype.getActionList = function(){
                	var actionList = [
						{name: "save",title:"Save",path:"save",color:"#a4f50c",shortName:"Save",imagePath:"/config_files/images/Save24.png"},
						{name:"new_releases",title:"Authorize",path:"authorize",color:"#26a69a",shortName:"Authorize",imagePath:"/config_files/images/Authorize24.png"},
						{name: "check_circle",title:"Save and Authorize",path:"saveAuthorize",color:"#ff7166",shortName:"Save&Auth",imagePath:"/config_files/images/SaveAuth24.png"},
						{name: "picture_as_pdf",title:"Deal Slip",path:"dealSlip",color:"#ffff00",shortName:"Deal Slip",imagePath:"/config_files/images/filedownload.png"},
						{name:"reply",title:"Send Back",path:"sendback",color:"#ffff00",shortName:"Sendback",imagePath:"/config_files/images/reply.png"},
						{name: "layers",title:"Accounting Entries",path:"accEntry",color:"#ffff00",shortName:"Acc. Entries",imagePath:"/config_files/images/filter.png"},
						{name: "message",title:"Swift Message",path:"swiftMessage",color:"#0000ff",shortName:"Swift",imagePath:"/config_files/images/Feedback.png"},
						{name: "delete",title:"Delete",path:"delete",color:"#000000",shortName:"Delete",imagePath:"/config_files/images/Delete.png"},
						{name:"file_download",title:"Download",path:"fileDwnld","color":"#000000",shortName:"Download",imagePath:"/config_files/images/filedownload.png"},
						{name: "cancel",title:"Cancel",path:"cancel",color:"#d61111",shortName:"Cancel",imagePath:"/config_files/images/reject.png"},
						{name:"refresh",title:"Clear",path:"clear",color:"#a4f50c",shortName:"Clear",imagePath:"/config_files/images/refresh.png"},
						{name: "content_copy",title:"Copy",path:"copy",color:"#000000",shortName:"Copy",imagePath:"/config_files/images/Copy24.png"},
						{name: "settings_backup_restore",title:"Reverse",path:"reverse",color:"#0000ff",shortName:"Reverse",imagePath:"/config_files/images/reply.png"},
						{name: "update",title:"Update",path:"update",color:"#a4f50c",shortName:"Update",imagePath:"/config_files/images/Amend24.png"},
						{name: "autorenew",title:"Recall",path:"recall",color:"#d61111",shortName:"Recall",imagePath:"/config_files/images/autorenew.png"},
						{name: "help",title:"What If",path:"whatif",color:"#a4f50c",shortName:"What If",imagePath:"/config_files/images/whatif.png"},
						{name:"compare",title:"Compare",path:"compare",color:"#a4f50c",shortName:"Compare",imagePath:"/config_files/images/Copy24.png"},
						{name:"message",title:"Generate MTn99 Message",path:"MTn99",color:"#a4f50c",shortName:"MTn99",imagePath:"/config_files/images/Feedback.png"},
						{name:"search",title:"MTn99 Search",path:"MTn99 Search",color:"#a4f50c",shortName:"MTn99 Search",imagePath:"/config_files/images/Find24.png"},
						{name:"find_in_page",title:"Risk",path:"risk",color:"#d61111",shortName:"Risk",imagePath:"/config_files/images/find_in_page.png"}
						];
					 return actionList;
                };
                /**       * To set the whatif resonce o bject
                 */
                GlobalService.prototype.setWhatIfResponce = function (response) {
                    console.log(" setWhatIfResponce :  ", response);
                    this.whatIfResponce = response;
                };
                /**
                    To get the Whatif responc e         the grid
                 */
                GlobalService.prototype.gerWhatIfResponce = function () {
                    console.log(" getWhatIfResponce :  ", this.whatIfResponce);
                    return this.whatIfResponce;
                };
                GlobalService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [])
                ], GlobalService);
                return GlobalService;
            }());
            exports_1("GlobalService", GlobalService);
        }
    };
});
//# sourceMappingURL=global.service.js.map