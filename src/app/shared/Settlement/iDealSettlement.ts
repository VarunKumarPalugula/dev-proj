import { Component, Inject, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';

import { FieldComponent } from '../../base/iField';

// import { TextComponent } from '../../common/textfield/iText';
// import { GridComponent } from '../../common/grid/iGrid';
// import { AmountComponent } from '../../common/amount/iAmount';
// import { DropDownComponent } from '../../common/dropdown/iDropdown';
// import { TextSearchComponent } from '../../common/textsearch/iTextSearch';
import { Validators } from '../../validators/iValidators';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'iDealSettlement',
    templateUrl: 'iDealSettlement.html',
    inputs: ['rootContext'],
    styleUrls: ['iDealSettlement.css']
})

export class DealSettlementComponent extends FieldComponent implements OnInit {

    public settlementDetails: any = [];
    public settlementHeaderList: any = [];
    public getSettlementList: any = [];

    public gridList: any = [];
    public dataList: any = [];

    public rowIndx: number = -1;
    public isAdd: boolean = true;
    public isModify: boolean = false;
    public dealStatus: string = "";

    public isStatusError: boolean = false;
    public isFormIsValid: boolean = false;
    public isSearchdisable: boolean = true;
    public accNumPath: any = "";
    public rootContext: any = "";
    public currencyCode: any = "";

    // @ViewChild('settleGridForm', { static: false }) settleGridForm: NgForm;
    // @ViewChild('Acc_Desc', { static: false }) Acc_Desc: TextComponent;
    // @ViewChild('s_FlagAccSold', { static: false }) s_FlagAccSold: DropDownComponent;
    // @ViewChild('s_Amount', { static: false }) s_Amount: AmountComponent;
    // @ViewChild('s_AccSold', { static: false }) s_AccSold: TextSearchComponent;
    // @ViewChild('s_RcnSold', { static: false }) s_RcnSold: DropDownComponent;
    // @ViewChild('s_PayTo', { static: false }) s_PayTo: TextSearchComponent;
    // @ViewChild('s_Intermediary', { static: false }) s_Intermediary: TextComponent;
    // @ViewChild('s_RecvCorres', { static: false }) s_RecvCorres: TextComponent;
    // @ViewChild('s_AccBen', { static: false }) s_AccBen: TextComponent;
    // @ViewChild('s_PayAt', { static: false }) s_PayAt: DropDownComponent;
    // @ViewChild('settlementDataGrid', { static: false }) settlementDataGrid: GridComponent;
    // @ViewChild('ccyCode', { static: false }) ccyCode: DropDownComponent;
    
    @ViewChild('settleGridForm', { static: false }) settleGridForm: NgForm;
    @ViewChild('Acc_Desc', { static: false }) Acc_Desc: any;
    @ViewChild('s_FlagAccSold', { static: false }) s_FlagAccSold: any;
    @ViewChild('s_Amount', { static: false }) s_Amount: any;
    @ViewChild('s_AccSold', { static: false }) s_AccSold: any;
    @ViewChild('s_RcnSold', { static: false }) s_RcnSold: any;
    @ViewChild('s_PayTo', { static: false }) s_PayTo: any;
    @ViewChild('s_Intermediary', { static: false }) s_Intermediary: any;
    @ViewChild('s_RecvCorres', { static: false }) s_RecvCorres: any;
    @ViewChild('s_AccBen', { static: false }) s_AccBen: any;
    @ViewChild('s_PayAt', { static: false }) s_PayAt: any;
    @ViewChild('settlementDataGrid', { static: false }) settlementDataGrid: any;
    @ViewChild('ccyCode', { static: false }) ccyCode: any;
    modalFlag: boolean;

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
        //this.accNumPath = this.rootContext+"/services/data/"; 

        this.settlementHeaderList = [
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
            { header: "s_PayAt", divisor: 0.0, "precision": 0, dataType: "NAN", width: 70 }];
    }

    ngOnInit() {
        this.accNumPath = this.rootContext + "/services/data/ACCSEARCH/";
        console.log(" entered into settlementsaccNumPath : ", this.accNumPath);


    }

    // contextUrl(arg0: string, contextUrl: any) {
    //     throw new Error('Method not implemented.');
    // }

    /**
     * To Check form  is valid
     */
    subFormValidation(form) {
        // To fill Non-required  and undefined values with  empty to make form valid 
        console.log("DealSettlement subformvalidation : ", form);
        for (let fieldValue in form.value) {
            //  console.log("this[fieldValue] : ",this[fieldValue]);
            if (this[fieldValue] != undefined) {
                //  console.log("DealSettlement  fieldValue :",this[fieldValue]);
                if (this[fieldValue].required == "false") {
                    console.log("DealSettlement  fieldValue ", fieldValue);
                    if (this[fieldValue].value == null || this[fieldValue].value.length == 0 || this[fieldValue].value == -1) {
                        this[fieldValue].value = " ";
                    }
                } else if (this[fieldValue].required == "true") {
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
    }

    /**
    * This method is use to check Tab validations
    */
    checkSubFormErrorValidation(form) {
        for (let fieldValue in form.value) {
            if (this[fieldValue] != undefined) {
                if (this[fieldValue].isValidationError == true && this[fieldValue].errorMessage != "") {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * To add form values to grid based on the headerList.
     */
    addToGrid(form, headerData) {
        console.log(" addToGrid ");
        this.dataList = [];
        this.gridList = [];
        this.gridList = form.value;
        for (let m = 0; m < headerData.length; m++) {
            for (let fieldValue in form.value) {
                if (headerData[m].header == fieldValue) {

                    if (this[fieldValue].choiceList && this[fieldValue].objReq && this[fieldValue].choiceList.length > 0) {
                        this.dataList.push(this[fieldValue].selectedItem.name);

                    } else {
                        this.dataList.push(this[fieldValue].value);
                    }
                }
            }

        }

        // To remove the comma for the amount
        for (let field in form.value) {
            console.log(" comma for the amount ");
            if (this[field] != undefined) {
                if (this[field].compType == "Amount") {
                    let exactValue = this[field].value;
                    console.log("exactValue  ", exactValue);
                    this.gridList[field] = Validators.indexCommaRemove(exactValue);
                } else {
                    this.gridList[field] = this[field].value;
                }
            }

        }
        //return  this.formList,this.dataList
    }

    /**
    *  To add new row to the grid
    */
    addNewRow(form, headerDetails, gridInfo) {
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
    }

    /**
     * To modify the row
     */
    modifyRow(form, headerDetails, gridDetails) {
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
    }

    /**
     * To populate the to modify the data
     */
    populateDeal(event) {
        console.log("*************inside populate**********");

        this.isModify = true;
        this.isAdd = false;
        this.rowIndx = event.rowIndex;
        this.isSearchdisable = false;

        this.Acc_Desc.value = this.settlementDetails[this.rowIndx].Acc_Desc;
        this.s_FlagAccSold.value = this.settlementDetails[this.rowIndx].s_FlagAccSold;

        this.s_Amount.value = Validators.amountValidation(this.settlementDetails[this.rowIndx].s_Amount);
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

    }

    getAccDetails(event) {
        console.log("*************inside getAccDetails**********", event);
        this.s_AccSold.value = event.selectedObj[5];
        this.Acc_Desc.value = event.selectedObj[6];


    }

    getPayToSwiftCode(event) {
        console.log("*************inside getPayToSwiftCode**********", event);
        this.s_PayTo.value = event.selectedObj[3];

    }

    /**
    * To delete the deal from the grid
    */
    deleteRowFromPool($event) {

        this.settlementDetails.splice($event.rowIndex, 1);
    }

    /**
    * To clear the Grid , poolArray.
    */
    clearArray() {
        //Clearing the Fee Schedule array
        this.settlementDetails = [];

        this.settlementDataGrid.resetGridData();
        this.clear(this.settleGridForm.form.value, false);
        this.isModify = false;
        this.isAdd = true;
    }
    /**
    * Clear the deal input fields
    */
    clear(form, arrayClear: boolean) {
        console.log("Inside Fee Schedule Clear()", form);
        if (typeof (form) != "undefined") {
            for (let fieldValue in form) {
                if (this[fieldValue] != undefined) {
                    if (this[fieldValue].choiceList != undefined) {
                        this[fieldValue].value = -1;
                        this[fieldValue].resetComponent();

                    } else {
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
            for (let fieldValue in form) {
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
    }

    /**
     * To retrieve the Fee Schedule Deals
     */

    getSettlementData(dataList) {
        console.log("Fee Schedule data *********", dataList);
        this.settlementDetails = dataList;
        /*  View settlementGrid start */
        if (this.settlementDetails.length > 0) {
            this.getSettlementList = [];
            this.settlementDataGrid.resetGridData();
        }
        //console.log("-- settlementDataGrid", this.settlementDataGrid);
        for (let i = 0; i < this.settlementDetails.length; i++) {
            this.getSettlementList = [];
            for (let m = 0; m < this.settlementHeaderList.length; m++) {
                let headerCount = 0; // If details are  not their for header, based on this headerCount,will push empty to the grid 
                for (let item in this.settlementDetails[i]) {
                    let selectOpt = this.settlementDetails[i][item];
                    if (this.settlementHeaderList[m].header == item) {
                        headerCount = 1;

                        if (this[item].choiceList && this[item].objReq && this[item].choiceList.length > 0) {
                            for (let j = 0; j < this[item].choiceList.length; j++) {
                                if (this[item].choiceList[j].id == selectOpt) {
                                    this.getSettlementList.push(this[item].choiceList[j].name);
                                    break;
                                }
                            }
                        } else {
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
    }




}