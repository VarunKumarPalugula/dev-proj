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
    var core_1, iField_1, AppComponent;
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
            AppComponent = (function (_super) {
                __extends(AppComponent, _super);
                function AppComponent(_renderer, _elementRef) {
                    var _this = _super.call(this, _renderer, _elementRef) || this;
                    _this.title = 'Treasury';
                    _this.isLogin = false;
                    _this.listItems = null;
                    _this.headerList = [];
                    _this.entitlementsList = [];
                    _this.loadMainPage = false;
					_this.notifMessage;
					_this.msgEndIndx = 0;
					_this.currMsgIndx = 0;
					_this.quotes = [];
					_this.applnDate = null;
					/*_this.quotes = [
                        'I\'m gonna make him an offer he can\'t refuse.', 'Toto, I\'ve got a feeling we\'re not in Kansas anymore.',
                        'You talkin\' to me?', 'Bond. James Bond.', 'I\'ll be back.', 'Round up the usual suspects.',
                        'I\'m the king of the world!', 'A martini. Shaken, not stirred.',
                        'May the Force be with you.',
                        'Well, nobody\'s perfect.'
                    ];*/
                    return _this;
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activeChildRoute = true;
                    this.globalStyle.setLocale("en");
                    this.treasuryModule = sessionStorage.module;
                    console.log("********* App.Main initialized");
                    this.listItems = [{ "username": "super_user",
                            "datetime": "2016-11-07 12:29:40.407",
                            "moduleName": "super",
                            "superuser": "true",
                            "dispName": "Super User" }];
                    this.dataService.getData("", "/data/loginDetails/FIS").subscribe(function (listItems) {
                        _this.headerList = listItems;
                        //this.globalHelpService.setUserConsoleMessage(this.headerList.logintime);
                        _this.globalService.setModule(_this.headerList.module);
                        _this.globalService.setUserName(_this.headerList.username);
                        _this.globalService.setLoginUserBranch(_this.headerList.branch);
                        _this.globalService.setDealer(_this.headerList.dealer);
                        _this.globalService.setLoginTime(_this.headerList.logintime);
                        _this.globalService.setApplnDate(_this.headerList.applndate); 
						_this.globalService.setDashboardFlag(_this.headerList.showDashboard); 
                        _this.loadMainPage = true;
                        _this.activeChildRoute = false;
                    });
					/*var timeoutId = setInterval(function (){   
						_this.applnDate = _this.globalService.getApplnDate();
						_this.dataService.getData("", _this.dataService.rootCtx+"services/data/getAlertMsgs/" + _this.applnDate + "/" + _this.msgEndIndx).subscribe(function (listItems) {
							if(listItems[0].msgList){
								_this.quotes = listItems[0].msgList;
								_this.currMsgIndx = 0;
								//console.log(_this.quotes);
								_this.msgEndIndx = listItems[0].lstIndx ;
								//_this.notifMessage = _this.quotes[Math.round(Math.random() * _this.quotes.length - 1)];
								//_this.globalHelpService.setNotification(_this.notifMessage);
							}
						});
					  
					}, 60000);
					var msgTimer = setInterval(function (){ 
						//console.log("***** show notif");
						if (_this.quotes && _this.quotes.length > _this.currMsgIndx){
							_this.notifMessage = _this.quotes[_this.currMsgIndx];
							_this.globalHelpService.setNotification(_this.notifMessage);
							_this.currMsgIndx++;
						} 
					},5000);*/
                };
                AppComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'treasury',
                        templateUrl: 'app.main.html'
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], AppComponent);
                return AppComponent;
            }(iField_1.FieldComponent));
            exports_1("AppComponent", AppComponent);
        }
    };
});
//# sourceMappingURL=app.main.js.map