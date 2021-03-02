System.register(["@angular/core", "@angular/router", "@angular/http", "app/services/global.service"], function (exports_1, context_1) {
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
    var core_1, router_1, http_1, global_service_1, PreferencesService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            }
        ],
        execute: function () {
            PreferencesService = (function () {
                function PreferencesService(_http, globalService, router) {
                    this._http = _http;
                    this.globalService = globalService;
                    this.router = router;
                    this.baseUrl = '/services';
                    //Dynamic loading added this 
                    this.page = '';
                }
                /*handleError(error: any) {
                    console.log("***********handle error ******");
                    this.globalService.progressMode = "";
                    console.error(error);
                    //return Observable.throw(error.json().error || 'Server error');
                }*/
                /**
                 * This method is use to set Analytic and Favorite Preferences
                 */
                PreferencesService.prototype.savePreferences = function (list, requestType) {
                    var _this = this;
                    console.log("Save preferences for request : " + requestType + " ; data :" + list);
                    this.entitlements = this.globalService.getEntitlements();
                    return this._http.get(this.baseUrl + "/Preferences" + "/" + this.entitlements[0].dispName + "/" + this.entitlements[0].moduleName + "/" + requestType + "/" + list)
                        .subscribe(
                    // Successful responses call the first callback.
                    function (res) { return res.json(); }, 
                    // Errors will call this callback instead:
                    function (err) {
                        console.log('Something went wrong!');
                        console.log("***********handle error ******");
                        _this.globalService.progressMode = "";
                    });
                    //.map((res: Response) => res.json())
                    //.catch(this.handleError);
                };
                /**
                 * This method is use to reset Analytic and Favorite Preferences
                 */
                PreferencesService.prototype.resetPreferences = function (requestType) {
                    var _this = this;
                    console.log("Reset preferences for request : " + requestType);
                    this.entitlements = this.globalService.getEntitlements();
                    return this._http.get(this.baseUrl + "/Preferences" + "/" + this.entitlements[0].dispName + "/" + this.entitlements[0].moduleName + "/" + requestType + "/" + "true")
                        .subscribe(
                    // Successful responses call the first callback.
                    function (res) { return res.json(); }, 
                    // Errors will call this callback instead:
                    function (err) {
                        console.log('Something went wrong!');
                        console.log("***********handle error ******");
                        _this.globalService.progressMode = "";
                    });
                    //.map((res: Response) => res.json())
                    //.catch(this.handleError);
                };
                PreferencesService.prototype.loadDashboard = function () {
                    console.log("Inside Load Dashboard");
                    this.page = this.globalService.getHomePage();
                    console.log("Page Before =" + this.page);
					this.globalService.isConsole = false;
                    //if (this.page == 'OneTreasury') {
                        this.page = 'Treasury';
                        this.router.navigate(['/OneTreasury']);
                    /*}
                    else {
                        this.page = 'OneTreasury';
                        this.router.navigate(['/Treasury']);
                    }*/
                    console.log("Page After =" + this.page);
                    this.globalService.setHomePage(this.page);
                    console.log("After loading dash board");
                };
                PreferencesService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(http_1.Http)),
                    __param(1, core_1.Inject(global_service_1.GlobalService)),
                    __metadata("design:paramtypes", [http_1.Http, typeof (_a = typeof global_service_1.GlobalService !== "undefined" && global_service_1.GlobalService) === "function" && _a || Object, router_1.Router])
                ], PreferencesService);
                return PreferencesService;
                var _a;
            }());
            exports_1("PreferencesService", PreferencesService);
        }
    };
});
//# sourceMappingURL=preferences.service.js.map