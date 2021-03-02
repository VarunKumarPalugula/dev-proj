System.register(["@angular/core", "app/base/iField", "app/common/textfield/iText", "app/common/grid/iGrid", "app/common/amount/iAmount", "app/common/dropdown/iDropdown", "app/common/textsearch/iTextSearch", "app/validators/iValidators"], function (exports_1, context_1) {
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
    var core_1, iField_1, iText_1, iGrid_1, iAmount_1, iDropdown_1, iTextSearch_1, iValidators_1, DealSettlementComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (iField_1_1) {
                iField_1 = iField_1_1;
            },
            function (iText_1_1) {
                iText_1 = iText_1_1;
            },
            function (iGrid_1_1) {
                iGrid_1 = iGrid_1_1;
            },
            function (iAmount_1_1) {
                iAmount_1 = iAmount_1_1;
            },
            function (iDropdown_1_1) {
                iDropdown_1 = iDropdown_1_1;
            },
            function (iTextSearch_1_1) {
                iTextSearch_1 = iTextSearch_1_1;
            },
            function (iValidators_1_1) {
                iValidators_1 = iValidators_1_1;
            }
        ],
        execute: function () {
            DealSettlementComponent = (function (_super) {
                __extends(DealSettlementComponent, _super);
                function DealSettlementComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.settlementDetails = [];
                    _this.settlementHeaderList = [];
                    _this.getSettlementList = [];
                    _this.gridList = [];
                    _this.dataList = [];
                    _this.rowIndx = -1;
                    _this.isAdd = true;
                    _this.isModify = false;
                    _this.dealStatus = "";
                    _this.isStatusError = false;
                    _this.isFormIsValid = false;
                    _this.isSearchdisable = true;
                    _this.accNumPath = "";
                    _this.rootContext = "";
                    _this.currencyCode = "";
                    //this.accNumPath = this.rootContext+"/services/data/"; 
                    _this.settlementHeaderList = [
                        // { header: "s_SerialNo", divisor: 0.0, "precision": 0, dataType: "NAN", width: 50 },
                        // { header: "s_refNo", divisor: 0.0, "precision": 0, dataType: "NAN", width: 130 },
                        { header: "Acc_Desc", divisor: 0.0, "precision": 0, dataType: "NAN", width: 170 },
                        { header: "s_FlagAccSold", divisor: 0.0, "precision": 0, dataType: "NAN", width: 70 },
                        { header: "s_Amount", divisor: 0.0, "precision": 0, dataType: "AMOUNT", width: 111 },
                        { header: "s_AccSold", divisor: 0.0, "precision": 0, dataType: "NAN", width: 100 },
                        { header: "s_RcnSold", divisor: 0.0, "precision": 0, dataType: "NAN", width: 70 },
                        { header: "s_PayTo", divisor: 0.0, "precision": 0, dataType: "NAN", width: 140 },
                        { header: "ccyCode", divisor: 0.0, "precision": 0, dataType: "NAN", width: 70 },
                        { header: "s_Intermediary", divisor: 0.0, "precision": 0, dataType: "NAN", width: 100 },
                        { header: "s_RecvCorres", divisor: 0.0, "precision": 0, dataType: "NAN", width: 100 },
                        { header: "s_AccBen", divisor: 0.0, "precision": 0, dataType: "NAN", width: 100 },
                        { header: "s_PayAt", divisor: 0.0, "precision": 0, dataType: "NAN", width: 70 }
                    ];
                    return _this;
                }
                DealSettlementComponent.prototype.ngOnInit = function () {
                    console.log(" entered into settlements ", this.contextUrl);
                    	this.accNumPath = this.rootContext+"/services/data/"; 
                    console.log(" entered into settlementsaccNumPath : ", this.accNumPath);
                };
                /**
                 * To Check form  is valid
                 */
                DealSettlementComponent.prototype.subFormValidation = function (form) {
                    // To fill Non-required  and undefined values with  empty to make form valid 
                    console.log("DealSettlement subformvalidation : ", form);
                    for (var fieldValue in form.value) {
                        //  console.log("this[fieldValue] : ",this[fieldValue]);
                        if (this[fieldValue] != undefined) {
                            //  console.log("DealSettlement  fieldValue :",this[fieldValue]);
                            if (this[fieldValue].required == "false") {
                                console.log("DealSettlement  fieldValue ", fieldValue);
                                if (this[fieldValue].value == null || this[fieldValue].value.length == 0 || this[fieldValue].value == -1) {
                                    this[fieldValue].value = " ";
                                }
                            }
                            else if (this[fieldValue].required == "true") {
                                // console.log("DealSettlement  fieldValue  true",fieldValue);
                                this[fieldValue].errorValidation();
                                if (this[fieldValue].isValidationError == true) {
                                    console.log("DealSettlement  fieldValue true 123123 ", fieldValue);
                                    //errField = fieldValue;
                                    return false;
                                    //break;
                                }
                            }
                        }
                    }
                    console.log("form validation  ", form.valid, "form required   ", form);
                    this.isFormIsValid = form.valid; //this.feeForm.form.valid;
                    return true;
                };
                /**
                * This method is use to check Tab validations
                */
                DealSettlementComponent.prototype.checkSubFormErrorValidation = function (form) {
                    for (var fieldValue in form.value) {
                        if (this[fieldValue] != undefined) {
                            if (this[fieldValue].isValidationError == true && this[fieldValue].errorMessage != "") {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                /**
                 * To add form values to grid based on the headerList.
                 */
                DealSettlementComponent.prototype.addToGrid = function (form, headerData) {
                    console.log(" addToGrid ");
                    this.dataList = [];
                    this.gridList = [];
                    this.gridList = form.value;
                    for (var m = 0; m < headerData.length; m++) {
                        for (var fieldValue in form.value) {
                            if (headerData[m].header == fieldValue) {
                               
			  	if( this[fieldValue].choiceList && this[fieldValue].objReq && this[fieldValue].choiceList.length > 0 ){
                                    this.dataList.push( this[fieldValue].selectedItem.name );
                                            
                                }else{
                                    this.dataList.push(this[fieldValue].value);
                                }
                            }
                        }
                    }
                    // To remove the comma for the amount
                    for (var field in form.value) {
                        console.log(" comma for the amount ");
                        if (this[field] != undefined) {
                            if (this[field].compType == "Amount") {
                                var exactValue = this[field].value;
                                console.log("exactValue  ", exactValue);
                                this.gridList[field] = iValidators_1.Validators.indexCommaRemove(exactValue);
                            }
                            else {
                                this.gridList[field] = this[field].value;
                            }
                        }
                    }
                    //return  this.formList,this.dataList
                };
                /**
                *  To add new row to the grid
                */
                DealSettlementComponent.prototype.addNewRow = function (form, headerDetails, gridInfo) {
                    this.modalFlag = false;
                    console.log("START************", this.settlementDetails);
                    this.subFormValidation(form);
                    this.isStatusError = this.checkSubFormErrorValidation(form);
                    console.log("Validation Failed :" + this.isStatusError);
                    this.addToGrid(form, headerDetails);
                    if ((this.isFormIsValid) && !(this.isStatusError)) {
                        this.settlementDetails.push(this.gridList);
                        gridInfo.addRow(this.dataList);
                        this.clear(form.value, false);
                    }
                    console.log("End************", this.settlementDetails);
                };
                /**
                 * To modify the row
                 */
                DealSettlementComponent.prototype.modifyRow = function (form, headerDetails, gridDetails) {
                    console.log("*************inside modify**********");
                    this.subFormValidation(form);
                    this.isStatusError = this.checkSubFormErrorValidation(form);
                    console.log("Validation Failed :" + this.isStatusError);
                    this.addToGrid(form, headerDetails);
                    if ((this.isFormIsValid) && !(this.isStatusError)) {
                        gridDetails.modifyRow(this.dataList, this.rowIndx);
                        this.settlementDetails[this.rowIndx] = this.gridList;
                        this.clear(form.value, false);
                        this.isModify = false;
                        this.isAdd = true;
                    }
                };
                /**
                 * To populate the to modify the data
                 */
                DealSettlementComponent.prototype.populateDeal = function (event) {
                    console.log("*************inside populate**********");
                    this.isModify = true;
                    this.isAdd = false;
                    this.rowIndx = event.rowIndex;
                    this.isSearchdisable = false;
                    this.Acc_Desc.value = this.settlementDetails[this.rowIndx].Acc_Desc;
                    this.s_FlagAccSold.value = this.settlementDetails[this.rowIndx].s_FlagAccSold;
                    this.s_Amount.value = iValidators_1.Validators.amountValidation(this.settlementDetails[this.rowIndx].s_Amount);
                    this.s_AccSold.value = this.settlementDetails[this.rowIndx].s_AccSold;
                    this.s_RcnSold.value = this.settlementDetails[this.rowIndx].s_RcnSold;
                    this.s_PayAt.value = this.settlementDetails[this.rowIndx].s_PayAt;
                    this.ccyCode.getValueObjBasedOnID(this.settlementDetails[this.rowIndx].ccyCode);
                    this.currencyCode = this.ccyCode.selectedItem.name;
                    if (this.settlementDetails[this.rowIndx].s_PayTo) {
                        this.s_PayTo.value = this.settlementDetails[this.rowIndx].s_PayTo;
                    }
                                      
					if (this.settlementDetails[this.rowIndx].s_Intermediary) {
                     				this.s_Intermediary.value = this.settlementDetails[this.rowIndx].s_Intermediary;
					}
					if (this.settlementDetails[this.rowIndx].s_RecvCorres) {
						this.s_RecvCorres.value = this.settlementDetails[this.rowIndx].s_RecvCorres;
					}
					if (this.settlementDetails[this.rowIndx].s_AccBen) {
						 this.s_AccBen.value = this.settlementDetails[this.rowIndx].s_AccBen;
					}
                  
                };
                DealSettlementComponent.prototype.getAccDetails = function (event) {
                    console.log("*************inside getAccDetails**********", event);
                    this.s_AccSold.value = event.selectedObj[5];
                    this.Acc_Desc.value = event.selectedObj[6];
                };
                DealSettlementComponent.prototype.getPayToSwiftCode = function (event) {
                    console.log("*************inside getPayToSwiftCode**********", event);
                    this.s_PayTo.value = event.selectedObj[3];
                };
                /**
                * To delete the deal from the grid
                */
                DealSettlementComponent.prototype.deleteRowFromPool = function ($event) {
                    this.settlementDetails.splice($event.rowIndex, 1);
                };
                /**
                * To clear the Grid , poolArray.
                */
                DealSettlementComponent.prototype.clearArray = function () {
                    //Clearing the Fee Schedule array
                    this.settlementDetails = [];
                    this.settlementDataGrid.resetGridData();
                    this.clear(this.settleGridForm.form.value, false);
                    this.isModify = false;
                    this.isAdd = true;
                };
                /**
                * Clear the deal input fields
                */
                DealSettlementComponent.prototype.clear = function (form, arrayClear) {
                    console.log("Inside Fee Schedule Clear()", form);
                    if (typeof (form) != "undefined") {
                        for (var fieldValue in form) {
                            if (this[fieldValue] != undefined) {
                                if (this[fieldValue].choiceList != undefined) {
                                    this[fieldValue].value = -1;
                                    this[fieldValue].resetComponent();
                                }
                                else {
                                    this[fieldValue].value = "";
                                }
                                // console.log("Fee Schedule clear^^^^^^^^^^ fieldValue", this[fieldValue]);
                            }
                        }
                    }
                    this.isSearchdisable = true;
                    /**
                     * To clear the error Icon after clear the data
                     */
                    if (typeof (form) != "undefined") {
                        for (var fieldValue in form) {
                            if (this[fieldValue] != undefined) {
                                if (this[fieldValue].errorMessage != "") {
                                    this[fieldValue].isValidationError = false;
                                    this[fieldValue].errorMessage = "";
                                }
                            }
                        }
                    }
                    if (arrayClear) {
                        this.clearArray();
                    }
                    console.log("Exiting from Fee Schedule Clear()");
                };
                /**
                 * To retrieve the Fee Schedule Deals
                 */
                DealSettlementComponent.prototype.getSettlementData = function (dataList) {
                    console.log("Fee Schedule data *********", dataList);
                    this.settlementDetails = dataList;
                    /*  View settlementGrid start */
                    if (this.settlementDetails.length > 0) {
                        this.getSettlementList = [];
                        this.settlementDataGrid.resetGridData();
                    }
                    //console.log("-- settlementDataGrid", this.settlementDataGrid);
                    for (var i = 0; i < this.settlementDetails.length; i++) {
                        this.getSettlementList = [];
                        for (var m = 0; m < this.settlementHeaderList.length; m++) {
                            var headerCount = 0; // If details are  not their for header, based on this headerCount,will push empty to the grid 
                            for (var item in this.settlementDetails[i]) {
                                var selectOpt = this.settlementDetails[i][item];
                                if (this.settlementHeaderList[m].header == item) {
                                    headerCount = 1;
                                  
                                    if( this[item].choiceList && this[item].objReq && this[item].choiceList.length > 0){
                                        for (var j = 0; j < this[item].choiceList.length; j++) {
                                             if ( this[item].choiceList[j].id == selectOpt ) {
                                                 this.getSettlementList.push( this[item].choiceList[j].name );
                                                 break;
                                             }
                                         }
                                     }else{
                                             this.getSettlementList.push(selectOpt);
                                     }
                               
                                }
                            }
                            if (headerCount == 0) {
                                this.getSettlementList.push(" ");
                            }
                        }
                        this.settlementDataGrid.addRow(this.getSettlementList);
                    }
                };
                __decorate([
                    core_1.ViewChild('settleGridForm'),
                    __metadata("design:type", Object)
                ], DealSettlementComponent.prototype, "settleGridForm", void 0);
                __decorate([
                    core_1.ViewChild('Acc_Desc'),
                    __metadata("design:type", typeof (_a = typeof iText_1.TextComponent !== "undefined" && iText_1.TextComponent) === "function" && _a || Object)
                ], DealSettlementComponent.prototype, "Acc_Desc", void 0);
                __decorate([
                    core_1.ViewChild('s_FlagAccSold'),
                    __metadata("design:type", typeof (_b = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _b || Object)
                ], DealSettlementComponent.prototype, "s_FlagAccSold", void 0);
                __decorate([
                    core_1.ViewChild('s_Amount'),
                    __metadata("design:type", typeof (_c = typeof iAmount_1.AmountComponent !== "undefined" && iAmount_1.AmountComponent) === "function" && _c || Object)
                ], DealSettlementComponent.prototype, "s_Amount", void 0);
                __decorate([
                    core_1.ViewChild('s_AccSold'),
                    __metadata("design:type", typeof (_d = typeof iTextSearch_1.TextSearchComponent !== "undefined" && iTextSearch_1.TextSearchComponent) === "function" && _d || Object)
                ], DealSettlementComponent.prototype, "s_AccSold", void 0);
                __decorate([
                    core_1.ViewChild('s_RcnSold'),
                    __metadata("design:type", typeof (_e = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _e || Object)
                ], DealSettlementComponent.prototype, "s_RcnSold", void 0);
                __decorate([
                    core_1.ViewChild('s_PayTo'),
                    __metadata("design:type", typeof (_f = typeof iTextSearch_1.TextSearchComponent !== "undefined" && iTextSearch_1.TextSearchComponent) === "function" && _f || Object)
                ], DealSettlementComponent.prototype, "s_PayTo", void 0);
                __decorate([
                    core_1.ViewChild('s_Intermediary'),
                    __metadata("design:type", typeof (_g = typeof iText_1.TextComponent !== "undefined" && iText_1.TextComponent) === "function" && _g || Object)
                ], DealSettlementComponent.prototype, "s_Intermediary", void 0);
                __decorate([
                    core_1.ViewChild('s_RecvCorres'),
                    __metadata("design:type", typeof (_h = typeof iText_1.TextComponent !== "undefined" && iText_1.TextComponent) === "function" && _h || Object)
                ], DealSettlementComponent.prototype, "s_RecvCorres", void 0);
                __decorate([
                    core_1.ViewChild('s_AccBen'),
                    __metadata("design:type", typeof (_j = typeof iText_1.TextComponent !== "undefined" && iText_1.TextComponent) === "function" && _j || Object)
                ], DealSettlementComponent.prototype, "s_AccBen", void 0);
                __decorate([
                    core_1.ViewChild('s_PayAt'),
                    __metadata("design:type", typeof (_k = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _k || Object)
                ], DealSettlementComponent.prototype, "s_PayAt", void 0);
                __decorate([
                    core_1.ViewChild('settlementDataGrid'),
                    __metadata("design:type", typeof (_l = typeof iGrid_1.GridComponent !== "undefined" && iGrid_1.GridComponent) === "function" && _l || Object)
                ], DealSettlementComponent.prototype, "settlementDataGrid", void 0);
                __decorate([
                    core_1.ViewChild('ccyCode'),
                    __metadata("design:type", typeof (_m = typeof iDropdown_1.DropDownComponent !== "undefined" && iDropdown_1.DropDownComponent) === "function" && _m || Object)
                ], DealSettlementComponent.prototype, "ccyCode", void 0);
                DealSettlementComponent = __decorate([
                    core_1.Component({
                        selector: 'iDealSettlement',
                        moduleId: __moduleName,
                        templateUrl: 'iDealSettlement.html',
                        inputs: ['rootContext'],
                        styleUrls: ['iDealSettlement.css']
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], DealSettlementComponent);
                return DealSettlementComponent;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            }(iField_1.FieldComponent));
            exports_1("DealSettlementComponent", DealSettlementComponent);
        }
    };
});
//# sourceMappingURL=iDealSettlement.js.map