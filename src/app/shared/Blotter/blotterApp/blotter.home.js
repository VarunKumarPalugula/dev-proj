System.register(["@angular/core", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, router_1, BlotterHomeComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            BlotterHomeComponent = (function () {
                function BlotterHomeComponent(router) {
					var _this = this;
                    _this.router = router;
					_this.curTheme = "blackTheme";
                }
                BlotterHomeComponent.prototype.getParameterByName = function (name, url) {
                    if (!url)
                        url = window.location.href;
                    console.log("-- url ", url);
                    name = name.replace(/[\[\]]/g, "\\$&");
                    console.log("-- name  ", name);
                    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
                    if (!results)
                        return null;
                    if (!results[2])
                        return '';
                    console.log("-- results ", results);
                    return { "report": decodeURIComponent(results[2].replace(/\+/g, " ")) };
                };
                BlotterHomeComponent.prototype.ngOnInit = function () {
                    // this.quryParam = this.getParameterByName('blotter');
                    // this.router.navigate(['/blotter'], { queryParams: this.quryParam });
					this.curTheme = localStorage.getItem("curntTheme");
                    this.router.navigate(['/blotter/FI_POS_BLTR']);
                };
                BlotterHomeComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'blotter-app',
                        templateUrl: 'blotter.home.html'
                    }),
                    __metadata("design:paramtypes", [router_1.Router])
                ], BlotterHomeComponent);
                return BlotterHomeComponent;
            }());
            exports_1("BlotterHomeComponent", BlotterHomeComponent);
        }
    };
});
//# sourceMappingURL=blotter.home.js.map