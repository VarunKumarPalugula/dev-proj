System.register(["@angular/core", "@angular/router", "@angular/http", "rxjs/Observable", "app/services/global.service"], function (exports_1, context_1) {
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
    var core_1, router_1, http_1, Observable_1, global_service_1, DataService;
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
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (global_service_1_1) {
                global_service_1 = global_service_1_1;
            }
        ],
        execute: function () {
            DataService = (function () {
                function DataService(_http, globalService, router) {
                    this._http = _http;
                    this.globalService = globalService;
                    this.router = router;
                    this.baseUrl = '';
					this.rootCtx="/ucf/";
                    this.protocolType = window.location.protocol + "//";
                }
                /**
                 * This method is use to get List of items based on requestType and Branch
                 */
                DataService.prototype.getListItems = function (listName) {
                    this.entitlements = this.globalService.getEntitlements();
                    if (this.entitlements != undefined) {
                        listName = listName + "," +
                            this.entitlements[0].superuser + "," +
                            this.entitlements[0].moduleName + "," +
                            this.entitlements[0].dispName;
                    }
                    //console.log("DataService.getListItems: " + listName);
                    return this._http.get(this.baseUrl + this.rootCtx+"services/mmdeal/" + listName + "/" + this.globalService.getBranch())
                        .map(function (res) { return res.json(); });
                };
                /**
                 * This method is use to get List of items based on requestType and Branch (POST method)
                 */
                DataService.prototype.getListItemsByPost = function (listName, data) {
                    //console.log("DataService.getListItemsByPost: " + listName);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers, method: "post" });
                    //console.log("submitDealDetails: *** data: " + data + "; Url: " + this.baseUrl + "/" + listName);
                    return this._http.post(this.baseUrl + this.rootCtx + "services/" + listName, data, options)
                        .map(function (res) { return res.json(); });
                };
                /**
                 * This method is use to perform http.get operation based on path and search string
                 * Get deal (searchStr is dealRefNum) and for user list (searchStr is branchNumber)
                 * Header Information searchStr is empty
                 */
                DataService.prototype.getData = function (requestKey, path) {
                    //console.log("DataService.getData Path : " + path + " and key : " + requestKey);
                    var restPath = '';
					var _this = this;
					
                    if (path && path.startsWith("/data")) {
                        //console.log("***** option1");
                        restPath = "services" + path + requestKey;
                    }
                    else {
                        //console.log("***** option2");
                        restPath = this.protocolType + location.host + path + requestKey;
                    }
                    //console.log("RestPath :" + restPath);
                    var reqHeaders = new http_1.Headers({
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    });
                    return this._http.get(restPath, { headers: reqHeaders })
                        .map(function (res) { 
							_this.globalService.progressMode = "";
							return res.json(); });
                };
                /**
                 * This method is use to perform http.get operation based on path and search string
                 * Get deal (searchStr is dealRefNum) and for user list (searchStr is branchNumber)
                 * Header Information searchStr is empty
                 */
                DataService.prototype.loadPage = function (path) {
                    //console.log("Load Page " + path);
                    return this._http.get(path)
                        .map(function (res) { return res.json(); });
                };
                //This method is use to submit data to service and gets response
                DataService.prototype.submit = function (data, path) {
                    //console.log("data*********", data);
                    //console.log("path*********", path);
					var _this = this;
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this.baseUrl + path, data, options)
                        .map(function (res) { return res.json(); })
                        .catch(function (res) { 
							_this.globalService.progressMode = "";
							return Observable_1.Observable.throw('Server error'); });
                };
                /**
                 * This method is use to form data to json and submits the request
                 */
                DataService.prototype.submitForm = function (form, path) {
                    var _this = this;
                    this.globalService.progressMode = "indeterminate";
                    //this if condition is to test the progress bar logic
                    if (form == "") {
                        setTimeout(function () {
                            _this.globalService.progressMode = "";
                            //console.log("********* stop called");
                        }, 8000);
                    }
                    else {
                        var data = JSON.stringify(form);
                        //console.log("*********** data: " + data);
                        return this.submit(data, path);
                    }
                };
                DataService.prototype.handleError = function () {
                    //console.log("***********handle error ******");
					var _this = this;
                    _this.globalService.progressMode = "";
                    ////console.error(error);
                    //return Observable.throw(error.json().error || 'Server error');
                    return Observable_1.Observable.throw('Server error');
                };
				
				DataService.prototype.uploadIndices=function(fileList,path){
				  console.log("********* uploadIndices called");
					if(fileList.lenght == 0){
						setTimeout(function () {
							console.log("********* stop called");
						}, 8000);

					} else {
						var file = fileList[0];
						var formData = new FormData();
						formData.append('uploadFile', file, file.name);
						var headers =  new http_1.Headers({ 'Content-Type': 'multipart/form-data' });
						headers.append('Accept', 'application/json');
						//let data = JSON.stringify(form);
						var options = new http_1.RequestOptions({ headers: headers, method: "post" });

						console.log("uploadIndex: *** formData: " + formData + "; baseUrl: "+ this.baseUrl+path);
						return this._http.post(this.baseUrl+path, file, options)
							.map(function (res) { return res.json(); });
					 }
				};
                /**
                 * Ajax call to download PDF from server side examples DealSlip, Swift Message
                 */
                DataService.prototype.downloadPDF = function (path, requestParams, fileName) {
                    var _this = this;
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST", path, true);
                    xmlhttp.responseType = 'blob';
                    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var blob = new Blob([xmlhttp.response], { type: 'application/pdf' });
                            //Save File
                            saveAs(blob, fileName);
                            //Open File
                            var url = window.URL.createObjectURL(blob);
                            window.open(url);
                        }
                    };
                    //branchId and branchName hard coded
                    xmlhttp.send(requestParams);
                };
                /**
                 * Ajax call to download html file from server side
                 */
                DataService.prototype.downloadFile = function (form, path) {
                    var _this = this;
                    //console.log("inside download ");
                    this.globalService.progressMode = "indeterminate";
                    //console.log("path*********", path);
                    var data = JSON.stringify(form);
                    //console.log("data*********", data);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    //console.log("this.baseUrl + path, data, options ", this.baseUrl + path, data, options);
                    return this._http.post(this.baseUrl + path, data, options)
                        .map(function (res) {
                        //console.log("rescsf ", res);
                        _this.globalService.progressMode = "";
                        var blob = new Blob([res._body], { type: 'application/html' });
                        //console.log("blob ", blob);
                        //Save File
                        saveAs(blob, form.fileName);
                        return res;
                        //console.log("  rezs   ", res);
                    })
                        .catch(function () {
                        _this.globalService.progressMode = "";
                    });
                };
                DataService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(http_1.Http)),
                    __param(1, core_1.Inject(global_service_1.GlobalService)),
                    __metadata("design:paramtypes", [http_1.Http, typeof (_a = typeof global_service_1.GlobalService !== "undefined" && global_service_1.GlobalService) === "function" && _a || Object, router_1.Router])
                ], DataService);
                return DataService;
                var _a;
            }());
            exports_1("DataService", DataService);
        }
    };
});
//# sourceMappingURL=data.service.js.map