System.register(["@angular/core", "app/common/toolbar/iToolbar", "app/base/iField"], function (exports_1, context_1) {
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
    var core_1, iToolbar_1, iField_1, MTMessageComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iToolbar_1_1) {
                iToolbar_1 = iToolbar_1_1;
            },
            function (iField_1_1) {
                iField_1 = iField_1_1;
            }
        ],
        execute: function () {
            MTMessageComponent = (function (_super) {
                __extends(MTMessageComponent, _super);
                function MTMessageComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.rootCtx = "/ucf";
                    _this.baseUrl = "";
                    _this.restServicePath = "";
                    _this.textSearchRestServicePath = "";
                    //public dealRestServicePath = "";
                    _this.dataServicePath = "";
                    _this.toolbarStatus = 1;
                    _this.choiceList = [];
                    _this.referenceId = "";
                    _this.module = "";
                    _this.modalFlag = false;
                    _this.title = "";
                    _this.message = "";
                    _this.isStatus = false;
                    _this.isStatusError = false;
                    _this.isFormIsValid = false;
                    _this.formValid = false;
                    _this.toolbarList = [{ status: 1, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: true }, { name: 'Save and Authorize', disabled: false }, { name: 'Delete', disabled: true }, { name: 'Clear', disabled: false }] },
                        { status: 2, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: true }, { name: 'Save and Authorize', disabled: false }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] },
                        { status: 3, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: false }, { name: 'Save and Authorize', disabled: false }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] },
                        { status: 5, list: [{ name: 'Save', disabled: true }, { name: 'Authorize', disabled: false }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] },
                        { status: 6, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: true }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] }
                    ];
                    return _this;
                }
                MTMessageComponent.prototype.ngOnInit = function () {
                    this.baseUrl = this.rootCtx + "/services/mtm/" + this.globalService.getBranch() + "/" + this.inputParams.moduleType + "/";
                    this.restServicePath = this.rootCtx + "/services/mtm/" + this.inputParams.officeType + "/";
                    this.dataServicePath = this.rootCtx + "/services/mtm/";
                    //this.dealRestServicePath = this.rootCtx  + "/services/deal/" + this.inputParams.officeType + "/";
                    this.module = this.inputParams.moduleType;
                   this.textSearchRestServicePath = this.rootCtx + "/services/mtm/" + this.module + "/";
                    console.log("Module :" + this.module + " ; Base URL : " + this.baseUrl + " ; Rest Service Path :" + this.restServicePath);
                };
                /**
                 * Check Field Errors, if any error then return
                 */
                MTMessageComponent.prototype.checkErrorValidation = function (form) {
                    var errorStatus = false;
                    for (var fieldValue in form.value) {
                        if (this[fieldValue] != undefined) {
                            if (this[fieldValue].isValidationError == true && this[fieldValue].errorMessage != "") {
                                console.log("Field : " + fieldValue + " ; is Error : " + this[fieldValue].isValidationError);
                                this.formValid = true;
                                this.modalFlag = true;
                                this.title = "Error Status";
                                this.message = "Please provide required information";
                                errorStatus = true;
                                break;
                            }
                        }
                    }
                    return errorStatus;
                };
                /**
                 * To Check form  is valid
                 */
                MTMessageComponent.prototype.formValidation = function (form) {
                    this.formValid = false;
                    this.isFormIsValid = false;
                    var errField = null;
                    // To fill Non-required  and undefined values with  empty to make form valid 
                    for (var fieldValue in form.value) {
                        if (this[fieldValue] != undefined) {
                            if (this[fieldValue].required == "false") {
                                if (this[fieldValue].value == null || this[fieldValue].value.length == 0 || this[fieldValue].value == -1) {
                                    this[fieldValue].value = " ";
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
                    if (!form.valid && this.m_toolBar.flag) {
                        this.formValid = true;
                        this.modalFlag = true;
                        this.title = "Error Status";
                        this.message = "Please provide the mandatory information :" + errField;
                    }
                    else {
                        this.isStatusError = this.checkErrorValidation(form);
                        console.log("Validation Failed :" + this.isStatusError);
                    }
                };
                /**
                
                 * To check form  is valid
                 * To get the Accounting entries before Manual Confirm
                 */
                MTMessageComponent.prototype.onToolbarClick = function (form) {
                    console.log("form.value toolbar ******************", form.value);
                    this.formValid = false;
                    if (this.m_toolBar.toolbarPath != 'clear') {
                        this.formValidation(form);
                    }
                    if ((this.isFormIsValid && !this.isStatusError) || (this.m_toolBar.toolbarPath == 'clear')) {
                        this.m_toolBar.formvalid = true;
                    }
                    else {
                        this.m_toolBar.formvalid = false;
                        this.m_toolBar.flag = false;
                    }
                };
                /**
                 * This method is use to submit operation based on value and retrieves data and displays result
                 */
                MTMessageComponent.prototype.onSubmit = function (form, value) {
                    var _this = this;
                    console.log("form.value ***************", form.value);
                    //Temporary Fix Start
                    if (this.refId.value == 0) {
                        this.refId.value = null;
                    }
                    if (value == 'clear') {
                        this.clear();
                    }
                    else {
						if(value== 'authorize'){
							form.value['refIdList']=[this.refId.value];
							}
                        var path = "";
                        path = this.restServicePath + value;
                        this.modalFlag = false;
                        console.log("Submit Path**********" + path);
                        console.log("form*****", form.value);
                        this.dataService.submitForm(form.value, path).subscribe(function (listItems) {
                            _this.globalService.progressMode = "";
                            _this.response = listItems;
                            _this.getResponse();
                        });
                    }
                };
                /**
                 *  This message is to read the response
                 */
                MTMessageComponent.prototype.getResponse = function () {
                    console.log("Response**********", this.response);
                    var status = this.response.status;
                    console.log("status  ", status);
                    this.isStatus = true;
                    this.title = "Status";
                    this.message = this.response.message;
                    this.clear();
                    this.modalFlag = true;
                };
                /**
                 * Close Popup and Clear all flags
                 */
                MTMessageComponent.prototype.close = function () {
                    this.modalFlag = false;
                    this.isStatus = false;
                    this.isFormIsValid = false;
                    this.formValid = false;
                };
                /**
                 * This method is use to clear the form
                 */
                MTMessageComponent.prototype.clear = function () {
                    this.comboMapper1.value = "";
                    this.tagMapper2.value = "";
                    this.tagMapper3.value = "";
                    this.tagMapper4.value = "";
                    this.tagMapper5.value = "";
                    this.areaMapper1.value = "";
                    this.refId.value = "";
                };
                /**
                 * Set Priority
                 * @param event
                 */
                MTMessageComponent.prototype.messageTypeChange = function (event) {
                    console.log("event ********", event.target.value);
                    this.tagMapper2.value = this.comboMapper1.selectedItem.priority;
                    console.log("MTMessage Deal retrieve Data*************", this.dealInfo);
                    if (event.target.value == '199' || event.target.value == '299') {
                        console.log("***********199/299*********");
                        this.tagMapper3.value = this.dealInfo.correspondent;
                    }
                    else {
                        console.log("***********399*********");
                        this.tagMapper3.value = this.dealInfo.cpSwiftAddress;
                    }
                    this.tagMapper4.value = this.referenceId;
                    this.tagMapper5.value = this.referenceId;
                };
                /**
                 * Get Message Info
                 * @param event
                 * @param form
                 */
                MTMessageComponent.prototype.getMTMessageInfo = function (event, form) {
                    var _this = this;
                    console.log("getMTMessageInfo() refId **********", this.refId.value);
                    this.dataService.getData(this.refId.value, this.dataServicePath + "view/").subscribe(function (listItems) {
                        _this.choiceList = listItems;
                        console.log("MTN99 retrieve Data", _this.choiceList);
                        _this.comboMapper1.value = _this.choiceList.comboMapper1;
                        _this.tagMapper2.value = _this.choiceList.tagMapper2;
                        _this.tagMapper3.value = _this.choiceList.tagMapper3;
                        _this.tagMapper4.value = _this.choiceList.tagMapper4;
                        _this.tagMapper5.value = _this.choiceList.tagMapper5;
                        _this.areaMapper1.value = _this.choiceList.areaMapper1;
                        _this.mtn99Status = _this.choiceList.recStatus;
                        _this.getToolbarButtonStatus();
                    });
                };
                /**
                 * button enable/disable functionality
                 */
                MTMessageComponent.prototype.getToolbarButtonStatus = function () {
                    console.log("this.officeType  ", this.officeType);
                    if (!this.mtn99Status || this.mtn99Status.length == 0) {
                        this.toolbarStatus = 1;
                    }
                    else {
                        if (this.inputParams.officeType == "FO") {
                            //console.log("etered into officeType FO");
                            if (this.mtn99Status == "NEW" || this.mtn99Status == "MODIFY") {
                                this.toolbarStatus = 3;
                            }
                            else if (this.mtn99Status == "AUTH") {
                                this.toolbarStatus = 2;
                            }
                        }
                        else if (this.officeType == "BO") {
                            if (this.dealStatus == "NEW" || this.dealStatus == "MODIFY") {
                                this.toolbarStatus = 5;
                            }
                            else if (this.dealStatus == "AUTH") {
                                this.toolbarStatus = 6;
                            }
                        }
                    }
                    console.log("Office Type :" + this.inputParams.officeType + " ; Status :" + this.mtn99Status + " ; Toolbar status :" + this.toolbarStatus);
                };
                __decorate([
                    core_1.ViewChild('refId'),
                    __metadata("design:type", Object)
                ], MTMessageComponent.prototype, "refId", void 0);
                __decorate([
                    core_1.ViewChild('m_toolBar'),
                    __metadata("design:type", typeof (_a = typeof iToolbar_1.ToolbarComponent !== "undefined" && iToolbar_1.ToolbarComponent) === "function" && _a || Object)
                ], MTMessageComponent.prototype, "m_toolBar", void 0);
                __decorate([
                    core_1.ViewChild('comboMapper1'),
                    __metadata("design:type", Object)
                ], MTMessageComponent.prototype, "comboMapper1", void 0);
                __decorate([
                    core_1.ViewChild('tagMapper2'),
                    __metadata("design:type", Object)
                ], MTMessageComponent.prototype, "tagMapper2", void 0);
                __decorate([
                    core_1.ViewChild('tagMapper3'),
                    __metadata("design:type", Object)
                ], MTMessageComponent.prototype, "tagMapper3", void 0);
                __decorate([
                    core_1.ViewChild('tagMapper4'),
                    __metadata("design:type", Object)
                ], MTMessageComponent.prototype, "tagMapper4", void 0);
                __decorate([
                    core_1.ViewChild('tagMapper5'),
                    __metadata("design:type", Object)
                ], MTMessageComponent.prototype, "tagMapper5", void 0);
                __decorate([
                    core_1.ViewChild('areaMapper1'),
                    __metadata("design:type", Object)
                ], MTMessageComponent.prototype, "areaMapper1", void 0);
                MTMessageComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'iMTMessage',
                        templateUrl: 'iMTMessage.html',
                        styleUrls: ['iMTMessage.css'],
                        inputs: ['referenceId', 'dealInfo']
                    })
                    //This component is built for WhatIf frame
                    ,
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], MTMessageComponent);
                return MTMessageComponent;
                var _a;
            }(iField_1.FieldComponent));
            exports_1("MTMessageComponent", MTMessageComponent);
        }
    };
});
//# sourceMappingURL=iMTMessage.js.map