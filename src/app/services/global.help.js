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
    var core_1, GlobalHelpService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            GlobalHelpService = (function () {
                function GlobalHelpService() {
                    this.userConsoleMessageArr = [];
                    this.refNoArr = [];
                    this.notifArray = [];
                    console.log("****** Glaobal Help initialized-----------------");
                }
                GlobalHelpService.prototype.setGlobalMessage = function (message) {
                    this.globalMessage = 'Enter ' + message;
                };
                GlobalHelpService.prototype.getGlobalMessage = function () {
                    return this.globalMessage;
                };
                GlobalHelpService.prototype.setUserConsoleMessage = function (message) {
                    var currDate = new Date();
                    var consoleMsgKey = 'consoleMessage' + currDate.getDate() + currDate.getMonth() + currDate.getFullYear() + localStorage.getItem('loginUser');
                    var hrs = "" + currDate.getHours();
                    var mns = "" + currDate.getMinutes();
                    var secs = "" + currDate.getSeconds();
                    if (currDate.getHours() < 10) {
                        hrs = "0" + currDate.getHours();
                    }
                    if (currDate.getMinutes() < 10) {
                        mns = "0" + currDate.getMinutes();
                    }
                    if (currDate.getSeconds() < 10) {
                        secs = "0" + currDate.getSeconds();
                    }
                    var cDate = hrs + ":" + mns + ":" + secs;
                    console.log("date**********", cDate);
                    if ((this.userConsoleMessageArr.length == 0) && (JSON.parse(localStorage.getItem(consoleMsgKey))) != null && (JSON.parse(localStorage.getItem(consoleMsgKey))).length > 0) {
                        this.userConsoleMessageArr = JSON.parse(localStorage.getItem(consoleMsgKey));
                    }
                    this.userConsoleMessageArr.unshift({ "date": cDate, "message": message });
                    localStorage.setItem(consoleMsgKey, JSON.stringify(this.userConsoleMessageArr));
                };
                GlobalHelpService.prototype.getUserConsoleMessage = function () {
                    var currDate = new Date();
                    var consoleMsgKey = 'consoleMessage' + currDate.getDate() + currDate.getMonth() + currDate.getFullYear() + localStorage.getItem('loginUser');
                    for (var key in localStorage) {
                        //To remove old storage information
                        if (key == 'consoleMessage') {
                            localStorage.removeItem(key);
                        }
                        //To remove one day old information, retains information till the session is valid
                        if (key.startsWith('consoleMessage') && key != consoleMsgKey) {
                            localStorage.removeItem(key);
                        }
                    }
                    return JSON.parse(localStorage.getItem(consoleMsgKey));
                };
                GlobalHelpService.prototype.setRefNo = function (refNo) {
                    if ((this.refNoArr.indexOf(refNo)) == -1) {
                        this.refNoArr.unshift(refNo);
                        if (this.refNoArr.length > 10) {
                            this.refNoArr.pop();
                        }
                        localStorage.setItem("refNumber", JSON.stringify(this.refNoArr));
                    }
                };
                GlobalHelpService.prototype.getRefNo = function () {
                    return JSON.parse(localStorage.getItem("refNumber"));
                };
                GlobalHelpService.prototype.setNotification = function (notify) {
                    if (this.notifArray.length > 9) {
                        this.notifArray.splice(-1);
                    }
                    this.notifArray.unshift(notify);
                };
                GlobalHelpService.prototype.getNotification = function () {
                    return this.notifArray;
                };
                GlobalHelpService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [])
                ], GlobalHelpService);
                return GlobalHelpService;
            }());
            exports_1("GlobalHelpService", GlobalHelpService);
        }
    };
});
//# sourceMappingURL=global.help.js.map