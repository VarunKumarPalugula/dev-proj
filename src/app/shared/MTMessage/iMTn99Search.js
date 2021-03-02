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
    var core_1, iField_1, MTn99SearchComponent;
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
            MTn99SearchComponent = (function (_super) {
                __extends(MTn99SearchComponent, _super);
                function MTn99SearchComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.rootCtx = "/ucf";
                    _this.baseUrl = "";
                    _this.restServicePath = "";
                    _this.dataServicePath = "";
                    _this.toolbarStatus = 1;
                    _this.choiceList = [];
                    _this.module = "";
                    _this.modalFlag = false;
                    _this.title = "";
                    _this.message = "";
                    _this.statusList = [];
                    _this.isFormIsValid = false;
                    _this.formValid = false;
                    _this.isSearchData = false;
                    _this.noSearchData = false;
                    return _this;
                }
                MTn99SearchComponent.prototype.ngOnInit = function () {
                    this.statusList = [{ id: 'AUTH', name: 'Auth' }, { id: 'UNAUTH', name: 'UnAuth' }, { id: 'ALL', name: 'All' }];
                    this.status.choiceList = this.statusList;
                    this.baseUrl = this.rootCtx + "/services/mtm/" + this.globalService.getBranch() + "/" + this.inputParams.moduleType + "/";
                    this.restServicePath = this.rootCtx + "/services/mtm/" + this.inputParams.officeType + "/";
                    this.dataServicePath = this.rootCtx + "/services/mtm/";
                    this.module = this.inputParams.moduleType;
                    console.log("Module :" + this.module + " ; Base URL : " + this.baseUrl + " ; Rest Service Path :" + this.restServicePath);
                };
                /**
                 * Clear the data
                 */
                MTn99SearchComponent.prototype.clearData = function () {
                    this.msgType.value = "";
                    this.status.value = "";
                    this.fromDate.value = "";
                    this.toDate.value = "";
                    this.isSearchData = false;
                    this.noSearchData = false;
                    this.choiceList = [];
                };
                /**
                 * To Check form  is valid
                 */
                MTn99SearchComponent.prototype.formValidation = function (form) {
                    this.formValid = false;
                    this.isFormIsValid = false;
                    var errField = null;
                    // To fill Non-required  and undefined values with  empty to make form valid 
                    for (var fieldValue in form.value) {
                        if (this[fieldValue] != undefined) {
                            if (this[fieldValue].required == "false") {
                                if (this[fieldValue].value == null || this[fieldValue].value.length == 0 || this[fieldValue].value == -1) {
                                    this[fieldValue].value = null;
                                }
                            }
                            else if (this[fieldValue].required == "true") {
                                console.log("Mandatory field check for -1 value: " + fieldValue);
                                this[fieldValue].errorValidation();
                                if (this[fieldValue].isValidationError == true) {
                                    errField = this[fieldValue].placeholder;
                                    break;
                                }
                            }
                        }
                    }
                    console.log("form validation  ", form.valid, "form required   ", form);
                    this.isFormIsValid = form.valid;
                    if (!form.valid) {
                        this.formValid = true;
                        this.modalFlag = true;
                        this.title = "Error Status";
                        this.message = "Please provide the mandatory information :" + errField;
                    }
                };
                MTn99SearchComponent.prototype.close = function () {
                    this.modalFlag = false;
                    this.isStatus = false;
                    this.isFormIsValid = false;
                    this.formValid = false;
                };
                /**
                 * Search the MTn99 messages
                 * @param form
                 */
                MTn99SearchComponent.prototype.searchData = function (form) {
                    var _this = this;
                    console.log("Form ***********", form.value);
                    this.noSearchData = false;
                    this.isSearchData = false;
                    this.modalFlag = false;
                    this.formValidation(form);
                    console.log("Form Validation ******", this.isFormIsValid);
                    if (this.isFormIsValid) {
                        console.log("Form status :" + this.isFormIsValid);
                        if (this.isFormIsValid) {
                            var path = this.restServicePath + "MTN99_SEARCH";
                            this.dataService.submitForm(form.value, path).subscribe(function (listItems) {
                                _this.globalService.progressMode = "";
                                _this.choiceList = listItems;
                                console.log("Result length :", _this.choiceList.length);
                                console.log("Response *********", _this.choiceList);
                                if (_this.choiceList.length > 0) {
                                    console.log("*************", _this.choiceList[0].status);
                                    if (_this.choiceList[0].status == false) {
                                        _this.modalFlag = true;
                                        _this.isFormIsValid = false;
                                        _this.message = _this.choiceList[0].message;
                                    }
                                    else {
                                        _this.isSearchData = true;
                                    }
                                }
                                else {
                                    _this.modalFlag = true;
                                    _this.noSearchData = true;
                                    _this.message = "No records found";
                                }
                            });
                        }
                    }
                };
                __decorate([
                    core_1.ViewChild('msgType'),
                    __metadata("design:type", Object)
                ], MTn99SearchComponent.prototype, "msgType", void 0);
                __decorate([
                    core_1.ViewChild('status'),
                    __metadata("design:type", Object)
                ], MTn99SearchComponent.prototype, "status", void 0);
                __decorate([
                    core_1.ViewChild('fromDate'),
                    __metadata("design:type", Object)
                ], MTn99SearchComponent.prototype, "fromDate", void 0);
                __decorate([
                    core_1.ViewChild('toDate'),
                    __metadata("design:type", Object)
                ], MTn99SearchComponent.prototype, "toDate", void 0);
                MTn99SearchComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iMTn99Search',
                        templateUrl: 'iMTn99Search.html',
                        styleUrls: ['iMTMessage.css']
                        //inputs:['referenceId','dealInfo']
                    })
                    //This component is built for WhatIf frame
                    ,
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], MTn99SearchComponent);
                return MTn99SearchComponent;
            }(iField_1.FieldComponent));
            exports_1("MTn99SearchComponent", MTn99SearchComponent);
        }
    };
});
//# sourceMappingURL=iMTn99Search.js.map