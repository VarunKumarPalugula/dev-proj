import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../../common/toolbar/iToolbar';
import { FieldComponent } from '../../base/iField';
import { IResponse } from '../../interfaces/IResponse';

@Component({
    selector: 'iMTMessage',
    templateUrl: 'iMTMessage.html',
    styleUrls: ['iMTMessage.css'],
    inputs: ['referenceId', 'dealInfo']
})
//This component is built for WhatIf frame
export class MTMessageComponent extends FieldComponent {

    public rootCtx: string = "/ucf";
    public baseUrl: string = "";
    public restServicePath = "";
    public textSearchRestServicePath = "";
    //public dealRestServicePath = "";
    public dataServicePath = "";
    public toolbarStatus: number = 1;
    public choiceList: any = [];
    public mtn99Status: any;

    public dealInfo: any;
    public referenceId: string = "";
    public module: string = "";
    public modalFlag: boolean = false;
    public title: string = "";
    public message: string = "";
    public response: IResponse;
    public isStatus: boolean = false;
    public isStatusError: boolean = false;
    public isFormIsValid: boolean = false;
    public formValid: boolean = false;

    @ViewChild('refId', { static: false }) refId: any;

    @ViewChild('m_toolBar', { static: false }) m_toolBar: ToolbarComponent;
    @ViewChild('comboMapper1', { static: false }) comboMapper1: any;

    @ViewChild('tagMapper2', { static: false }) tagMapper2: any;
    @ViewChild('tagMapper3', { static: false }) tagMapper3: any;
    @ViewChild('tagMapper4', { static: false }) tagMapper4: any;
    @ViewChild('tagMapper5', { static: false }) tagMapper5: any;

    @ViewChild('areaMapper1', { static: false }) areaMapper1: any;
    // @ViewChild('refId', { static: false }) refId: TextSearchComponent;

    // @ViewChild('m_toolBar', { static: false }) m_toolBar: ToolbarComponent;
    // @ViewChild('comboMapper1', { static: false }) comboMapper1: DropDownComponent;

    // @ViewChild('tagMapper2', { static: false }) tagMapper2: TextComponent;
    // @ViewChild('tagMapper3', { static: false }) tagMapper3: TextComponent;
    // @ViewChild('tagMapper4', { static: false }) tagMapper4: TextComponent;
    // @ViewChild('tagMapper5', { static: false }) tagMapper5: TextComponent;

    // @ViewChild('areaMapper1', { static: false }) areaMapper1: TextAreaComponent;

    toolbarList: any[] = [{ status: 1, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: true }, { name: 'Save and Authorize', disabled: false }, { name: 'Delete', disabled: true }, { name: 'Clear', disabled: false }] },
    { status: 2, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: true }, { name: 'Save and Authorize', disabled: false }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] },
    { status: 3, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: false }, { name: 'Save and Authorize', disabled: false }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] },

    { status: 5, list: [{ name: 'Save', disabled: true }, { name: 'Authorize', disabled: false }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] },
    { status: 6, list: [{ name: 'Save', disabled: false }, { name: 'Authorize', disabled: true }, { name: 'Delete', disabled: false }, { name: 'Clear', disabled: false }] }

    ];
    officeType: string;
    dealStatus: string;

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.baseUrl = this.rootCtx + "/services/mtm/" + this.globalService.getBranch() + "/" + this.inputParams.moduleType + "/";
        this.restServicePath = this.rootCtx + "/services/mtm/" + this.inputParams.officeType + "/";


        this.dataServicePath = this.rootCtx + "/services/mtm/";
        //this.dealRestServicePath = this.rootCtx  + "/services/deal/" + this.inputParams.officeType + "/";
        this.module = this.inputParams.moduleType;
        //   this.textSearchRestServicePath = this.rootCtx + "/services/mtm/" + this.module + "/";
        console.log("Module :" + this.module + " ; Base URL : " + this.baseUrl + " ; Rest Service Path :" + this.restServicePath);
    }

    /**
     * Check Field Errors, if any error then return
     */
    checkErrorValidation(form) {

        let errorStatus: boolean = false;
        for (let fieldValue in form.value) {
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
                        this[fieldValue].value = " ";
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
        if (!form.valid && this.m_toolBar.flag) {
            this.formValid = true;
            this.modalFlag = true;
            this.title = "Error Status";
            this.message = "Please provide the mandatory information :" + errField;

        } else {
            this.isStatusError = this.checkErrorValidation(form);
            console.log("Validation Failed :" + this.isStatusError);
        }
    }

    /**
    
     * To check form  is valid
     * To get the Accounting entries before Manual Confirm 
     */
    onToolbarClick(form) {
        console.log("form.value toolbar ******************", form.value);

        this.formValid = false;
        if (this.m_toolBar.toolbarPath != 'clear') {
            this.formValidation(form);
        }

        if ((this.isFormIsValid && !this.isStatusError) || (this.m_toolBar.toolbarPath == 'clear')) {
            this.m_toolBar.formvalid = true;
        } else {
            this.m_toolBar.formvalid = false;
            this.m_toolBar.flag = false;
        }

    }

    /**
     * This method is use to submit operation based on value and retrieves data and displays result
     */
    onSubmit(form, value) {

        console.log("form.value ***************", form.value);
        //Temporary Fix Start
        if (this.refId.value == 0) {
            this.refId.value = null;
        }

        if (value == 'clear') {
            this.clear();
        }
        else {
            if (value == 'authorize') {
                form.value['refIdList'] = [this.refId.value];
            }
            let path = "";
            path = this.restServicePath + value;
            this.modalFlag = false;
            console.log("Submit Path**********" + path);
            console.log("form*****", form.value);
            this.dataService.submitForm(form.value, path).subscribe(
                (listItems: IResponse) => {
                    this.globalService.progressMode = "";
                    this.response = listItems;
                    this.getResponse();
                });
        }
    }


    /**
     *  This message is to read the response
     */
    getResponse() {
        console.log("Response**********", this.response);
        let status = this.response.status;
        console.log("status  ", status);

        this.isStatus = true;
        this.title = "Status";
        this.message = this.response.message;

        this.clear();

        this.modalFlag = true;
    }

    /**
     * Close Popup and Clear all flags
     */
    close() {
        this.modalFlag = false;
        this.isStatus = false;
        this.isFormIsValid = false;
        this.formValid = false;
    }


    /**
     * This method is use to clear the form
     */
    clear() {
        this.comboMapper1.value = "";
        this.tagMapper2.value = "";
        this.tagMapper3.value = "";
        this.tagMapper4.value = "";
        this.tagMapper5.value = "";
        this.areaMapper1.value = "";
        this.refId.value = "";
    }

    /**
     * Set Priority
     * @param event
     */
    messageTypeChange(event: any) {
        console.log("event ********", event.target.value);
        this.tagMapper2.value = this.comboMapper1.selectedItem.priority;

        console.log("MTMessage Deal retrieve Data*************", this.dealInfo);
        if (event.target.value == '199' || event.target.value == '299') {
            console.log("***********199/299*********")
            this.tagMapper3.value = this.dealInfo.correspondent;
        } else {
            console.log("***********399*********")
            this.tagMapper3.value = this.dealInfo.cpSwiftAddress;
        }

        this.tagMapper4.value = this.referenceId;
        this.tagMapper5.value = this.referenceId;

    }

    /**
     * Get Message Info
     * @param event
     * @param form
     */
    getMTMessageInfo(event: any, form) {
        console.log("getMTMessageInfo() refId **********", this.refId.value);

        this.dataService.getData(this.refId.value, this.dataServicePath + "view/").subscribe((listItems: IResponse) => {
            this.choiceList = listItems;
            console.log("MTN99 retrieve Data", this.choiceList);

            this.comboMapper1.value = this.choiceList.comboMapper1;
            this.tagMapper2.value = this.choiceList.tagMapper2;
            this.tagMapper3.value = this.choiceList.tagMapper3;
            this.tagMapper4.value = this.choiceList.tagMapper4;
            this.tagMapper5.value = this.choiceList.tagMapper5;
            this.areaMapper1.value = this.choiceList.areaMapper1;

            this.mtn99Status = this.choiceList.recStatus;
            this.getToolbarButtonStatus();
        });
    }

    /**
     * button enable/disable functionality
     */
    getToolbarButtonStatus() {
        // console.log("this.officeType  ", this.officeType);

        if (!this.mtn99Status || this.mtn99Status.length == 0) {
            this.toolbarStatus = 1;
        } else {
            if (this.inputParams.officeType == "FO") {
                //console.log("etered into officeType FO");

                if (this.mtn99Status == "NEW" || this.mtn99Status == "MODIFY") {
                    this.toolbarStatus = 3;
                } else if (this.mtn99Status == "AUTH") {
                    this.toolbarStatus = 2;
                }

            } else if (this.officeType == "BO") {

                if (this.dealStatus == "NEW" || this.dealStatus == "MODIFY") {
                    this.toolbarStatus = 5;
                } else if (this.dealStatus == "AUTH") {
                    this.toolbarStatus = 6;
                }
            }
        }
        console.log("Office Type :" + this.inputParams.officeType + " ; Status :" + this.mtn99Status + " ; Toolbar status :" + this.toolbarStatus);
    }
}