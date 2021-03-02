import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { IResponse } from '../../interfaces/IResponse';
import { FieldComponent } from '../../base/iField';



@Component({
    selector: 'iMTn99Search',
    templateUrl: 'iMTn99Search.html',
    styleUrls: ['iMTMessage.css']
    //inputs:['referenceId','dealInfo']
})
//This component is built for WhatIf frame
export class MTn99SearchComponent extends FieldComponent {

    public rootCtx: string = "/ucf";
    public baseUrl: string = "";
    public restServicePath = "";

    public dataServicePath = "";
    public toolbarStatus: number = 1;
    public choiceList: any = [];

    public module: string = "";
    public modalFlag: boolean = false;
    public title: string = "";
    public message: string = "";
    public statusList: any = [];

    public isFormIsValid: boolean = false;
    public formValid: boolean = false;
    public isSearchData: boolean = false;
    public noSearchData: boolean = false;

    @ViewChild('msgType', { static: false }) msgType: any;
    @ViewChild('status', { static: false }) status: any;

    @ViewChild('fromDate', { static: false }) fromDate: any;
    @ViewChild('toDate', { static: false }) toDate: any;
    isStatus: boolean;

    // @ViewChild('msgType', { static: false }) msgType: DropDownComponent;
    // @ViewChild('status', { static: false }) status: DropDownComponent;

    // @ViewChild('fromDate', { static: false }) fromDate: CalendarComponent;
    // @ViewChild('toDate', { static: false }) toDate: CalendarComponent;


    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.statusList = [{ id: 'AUTH', name: 'Auth' }, { id: 'UNAUTH', name: 'UnAuth' }, { id: 'ALL', name: 'All' }];

        this.status.choiceList = this.statusList;
        this.baseUrl = this.rootCtx + "/services/mtm/" + this.globalService.getBranch() + "/" + this.inputParams.moduleType + "/";
        this.restServicePath = this.rootCtx + "/services/mtm/" + this.inputParams.officeType + "/";
        this.dataServicePath = this.rootCtx + "/services/mtm/";
        this.module = this.inputParams.moduleType;

        console.log("Module :" + this.module + " ; Base URL : " + this.baseUrl + " ; Rest Service Path :" + this.restServicePath);
    }

    /**
     * Clear the data
     */
    clearData() {
        this.msgType.value = "";
        this.status.value = "";
        this.fromDate.value = "";
        this.toDate.value = "";
        this.isSearchData = false;
        this.noSearchData = false;
        this.choiceList = [];

    }


    /**
     * To Check form  is valid
     */
    formValidation(form) {
        this.formValid = false;
        this.isFormIsValid = false;
        let errField = null;

        // To fill Non-required  and undefined values with  empty to make form valid 
        for (let fieldValue in form.value) {
            if (this[fieldValue] != undefined) {
                if (this[fieldValue].required == "false") {
                    if (this[fieldValue].value == null || this[fieldValue].value.length == 0 || this[fieldValue].value == -1) {
                        this[fieldValue].value = null;
                    }
                } else if (this[fieldValue].required == "true") {
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
    }

    close() {
        this.modalFlag = false;
        this.isStatus = false;
        this.isFormIsValid = false;
        this.formValid = false;
    }

    /**
     * Search the MTn99 messages
     * @param form
     */
    searchData(form) {
        console.log("Form ***********", form.value);
        this.noSearchData = false;
        this.isSearchData = false;
        this.modalFlag = false;
        this.formValidation(form);
        console.log("Form Validation ******", this.isFormIsValid);
        if (this.isFormIsValid) {
            console.log("Form status :" + this.isFormIsValid);
            if (this.isFormIsValid) {
                let path = this.restServicePath + "MTN99_SEARCH";
                this.dataService.submitForm(form.value, path).subscribe(
                    (listItems: IResponse) => {
                        this.globalService.progressMode = "";

                        this.choiceList = listItems;

                        console.log("Result length :", this.choiceList.length);
                        console.log("Response *********", this.choiceList);
                        if (this.choiceList.length > 0) {
                            console.log("*************", this.choiceList[0].status);
                            if (this.choiceList[0].status == false) {
                                this.modalFlag = true;
                                this.isFormIsValid = false;
                                this.message = this.choiceList[0].message;
                            } else {
                                this.isSearchData = true;
                            }
                        } else {
                            this.modalFlag = true;
                            this.noSearchData = true;
                            this.message = "No records found";
                        }
                    });
            }
        }
    }
}