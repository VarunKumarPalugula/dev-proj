import { Component, ViewChild, OnInit } from '@angular/core';
// import { TextComponent } from 'app/common/textfield/iText';
// import { DropDownComponent } from 'app/common/dropdown/iDropdown';
// import { CheckboxComponent } from 'app/common/checkbox/iCheckbox';
// import { DropDown2Component } from 'app/common/dropdownsearch/iDropdown2';
import { DataService } from '../../../services/data.service';
import { GlobalService } from '../../../services/global.service';
import { IResponse } from '../../../interfaces/IResponse';
import { BaseComponent } from '../../../base/base.component';
import { ToolbarComponent } from '../../../common/toolbar/iToolbar';


@Component({
    // moduleId: __moduleName,
    selector: 'serviceConfig',
    templateUrl: 'serviceConfig.html'
})

export class ServiceConfigComponent extends BaseComponent implements OnInit {

    // public __moduleName: string;
    public restServicePath = "";
    public rootCtx: string = this.dataService.rootCtx;

    public modalFlag: boolean = false;
    public viewModalFlag: boolean = false;
    public treeList: boolean = false;

    public toolbarStatus: number = 1;
    public formList: any;
    public operationType: string = '';
    public response: IResponse;

    public isStatusError: boolean = false;
    public isFormIsValid: boolean = false;
    public formValid: boolean = false;
    public message: any = "";
    public title: any = "";

    public moduleList: any = [{ id: "MM", name: "Money Market" }, { id: "FX", name: "Foreign Exchange" }, { id: "FI", name: "Fixed Income" }, { id: "OP", name: "Operation" }, { id: "let", name: "let" }];
    public OffcTypeList: any = [{ id: "FO", name: "Front Office" }, { id: "MO", name: "Middle Office" }, { id: "BO", name: "Back Office" }];
    public gridList: any = [];
    public toolbarList: any = [
        { status: 1, list: [{ name: 'Save', disabled: false }, { name: 'Clear', disabled: false }] },
    ];
    public headerList: any = [
        [
            { "display_name": "Field ID", "name": "field_id", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "100", "hidden": true, "view": true, "pinned": false, "editable": false },
            { "display_name": "Display Name", "name": "display_name", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "editable": true },
            { "display_name": "View Field Name", "name": "view_field_name", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": true, "editable": false },
            { "display_name": "Field Type", "name": "type", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "dropdownlist", "columnlist": '[{"id":"string","name":"string"},{"id":"number","name":"number"},  {"id":"date","name":"date"},{"id":"float","name":"float"},{"id":"int","name":"int"} ,{"id":"bool","name":"bool"}]', "editable": true },
            { "display_name": "Width", "name": "width", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "editable": true },
            { "display_name": "Filter Type", "name": "filtertype", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "dropdownlist", "columnlist": '[ {"id":"checkedlist","name":"checkedList"},{"id":"date","name":"date"}, {"id":"input","name":"input"} ,{"id":"list","name":"list"},{"id":"range","name":"range"},{"id":"textbox","name":"textbox"},{"id":"checkbox","name":"checkbox"}]', "editable": true },
            { "display_name": "Cells Format", "name": "cellsformat", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "dropdownlist", "columnlist": '[{"id":"dd-MMM-yyyy","name":"dd-MMM-yyyy"}, {"id":"d2" , "name":"d2"} ]', "editable": true },
            { "display_name": "Header Renderer", "name": "renderer", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false },
            { "display_name": "Data Renderer", "name": "cellsrenderer", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "editable": true },
            { "display_name": "Header Alignment", "name": "align", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "dropdownlist", "columnlist": '[{"id":"center","name":"center"},{"id": "left","name":"left"},  {"id":"right","name":"right"}]', "editable": true },
            { "display_name": "Data Alignment", "name": "cellsalign", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "dropdownlist", "columnlist": '[{"id":"center","name":"center"},{"id": "left","name":"left"},  {"id":"right","name":"right"}]', "editable": true },
            { "display_name": "Active", "name": "is_active", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "checkbox", "editable": true },
            { "display_name": "Pinned", "name": "pinned", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "checkbox", "editable": true },
            { "display_name": "Display Order", "name": "display_order", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "editable": true },
            { "display_name": "Report Service ID", "name": "report_service_id", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "editable": true },
            { "display_name": "Row Data", "name": "is_row", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "checkbox", "editable": true },
            { "display_name": "Groupable", "name": "groupable", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "checkbox", "editable": true },
            { "display_name": "Aggregates", "name": "aggregates", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "checkbox", "editable": true },
            { "display_name": "Criteria Field", "name": "criteria_field", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "checkbox", "editable": true },
            { "display_name": "Criteria Service", "name": "criteria_service", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "editable": true },
            { "display_name": "Criteria Service Type", "name": "criteria_service_type", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "dropdownlist", "columnlist": '[{"id":"SERVICE","name":"SERVICE"},{"id":"QUERY","name":"QUERY"} ,{"id":"EXTURL","name":"EXTURL"}]', "editable": true },
            { "display_name": "Criteria Field Type", "name": "criteria_field_type", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "columntype": "dropdownlist", "columnlist": '[{ "id": "SL", "name": "STRING LIST" }, { "id": "NL", "name": "NUM LIST" }, { "id": "S", "name": "STRING" }, { "id": "B", "name": "BOOLEAN" }, { "id": "D", "name": "DATE" }, { "id": "NR", "name": "NUMBER RANGE" }, { "id": "DR", "name": "DATE RANGE" }]', "editable": true },
            { "display_name": "Criteria Order", "name": "criteria_order", "type": "string", "align": "center", "cellsalign": "left", "filtertype": "list", "width": "150", "hidden": false, "view": true, "pinned": false, "editable": true }
        ]
    ];


    @ViewChild('toolBar', { static: false }) toolBar: ToolbarComponent;

    // @ViewChild('reportServiceId', { static: false }) reportServiceId: DropDown2Component;
    // @ViewChild('module', { static: false }) module: DropDownComponent;
    // @ViewChild('officeType', { static: false }) officeType: DropDownComponent;
    // @ViewChild('serviceName', { static: false }) serviceName: TextComponent;
    // @ViewChild('viewName', { static: false }) viewName: TextComponent;
    @ViewChild('reportServiceId', { static: false }) reportServiceId: any;
    @ViewChild('module', { static: false }) module: any;
    @ViewChild('officeType', { static: false }) officeType: any;
    @ViewChild('serviceName', { static: false }) serviceName: any;
    @ViewChild('viewName', { static: false }) viewName: any;

    /*@ViewChild( 'reportId' ) reportId: TextComponent;*/

    // @ViewChild('rowInfo', { static: false }) rowInfo: CheckboxComponent;
    // @ViewChild('datagrp', { static: false }) datagrp: CheckboxComponent;
    // @ViewChild('sortble', { static: false }) sortble: CheckboxComponent;
    // @ViewChild('filterable', { static: false }) filterable: CheckboxComponent;
    // @ViewChild('aggregates', { static: false }) aggregates: CheckboxComponent;
    // @ViewChild('pdfExport', { static: false }) pdfExport: CheckboxComponent;
    // @ViewChild('excelExport', { static: false }) excelExport: CheckboxComponent;
    // @ViewChild('csvExport', { static: false }) csvExport: CheckboxComponent;
    // @ViewChild('nestedTable', { static: false }) nestedTable: CheckboxComponent;
    // @ViewChild('nestedrepserId', { static: false }) nestedrepserId: CheckboxComponent;
    // @ViewChild('treeData', { static: false }) treeData: CheckboxComponent;
    // @ViewChild('print', { static: false }) print: CheckboxComponent;
    // @ViewChild('refresh', { static: false }) refresh: CheckboxComponent;
    // @ViewChild('graph', { static: false }) graph: CheckboxComponent;
    @ViewChild('rowInfo', { static: false }) rowInfo: any;
    @ViewChild('datagrp', { static: false }) datagrp: any;
    @ViewChild('sortble', { static: false }) sortble: any;
    @ViewChild('filterable', { static: false }) filterable: any;
    @ViewChild('aggregates', { static: false }) aggregates: any;
    @ViewChild('pdfExport', { static: false }) pdfExport: any;
    @ViewChild('excelExport', { static: false }) excelExport: any;
    @ViewChild('csvExport', { static: false }) csvExport: any;
    @ViewChild('nestedTable', { static: false }) nestedTable: any;
    @ViewChild('nestedrepserId', { static: false }) nestedrepserId: any;
    @ViewChild('treeData', { static: false }) treeData: any;
    @ViewChild('print', { static: false }) print: any;
    @ViewChild('refresh', { static: false }) refresh: any;
    @ViewChild('graph', { static: false }) graph: any;

    constructor(
        private dataService: DataService,
        private globalService: GlobalService
    ) {
        super();

        this.restServicePath = this.dataService.rootCtx + "services/reportServiceConfig/";

    }

    ngOnInit() {
        console.log("ngOnInit**********");
        this.gridList = this.headerList;

    }

    onToolbarClick(form) {
        //    console.log( "onToolbarClick**********" );
        if (this.toolBar.toolbarPath != 'clear') {
            this.formValidation(form);
            if ((this.isFormIsValid && !this.isStatusError)) {
                this.toolBar.formvalid = true;
            }
            else {
                this.toolBar.formvalid = false;
                this.toolBar.flag = false;
            }
        }
        this.toolBar.formvalid = true;
    }

    onSubmit(form, value) {

        console.log(form.getRawValue(), "value**********" + value);

        let actionType = value;
        let formList = [];

        if (value == 'clear') {
            this.clear(form);
            return;
        }
        else {
            formList = form.getRawValue();
            this.modalFlag = false;

            console.log("Form Data **********", this.formList);
            let data = JSON.stringify(formList);
            data = JSON.parse(data);
            data['fieldAttributes'] = this.gridList[1];

            let path = this.restServicePath + actionType;

            this.dataService.submitForm(data, path).subscribe(
                (resp: IResponse) => {
                    console.log("response ---> ", resp);
                    this.globalService.progressMode = "";
                    this.response = resp;
                    this.viewModalFlag = true;
                    this.message = resp.response;
                    this.clear(form);

                });
        }
    }

    clear(form) {
        console.log("************clear*******");
        this.treeList = false;
        this.gridList = [];
        if (typeof (form) != "undefined") {
            for (let fieldValue in form.getRawValue()) {
                if (this[fieldValue]) {
                    this[fieldValue].value = "";
                    this[fieldValue].checkValue = false;
                }
            }
        }

        /** 
         * To clear the error Icon after clear the data 
         */
        if (typeof (form) != "undefined") {
            for (let fieldValue in form.getRawValue()) {
                if (this[fieldValue] != undefined) {
                    if (this[fieldValue].errorMessage && this[fieldValue].errorMessage != "") {
                        if (this[fieldValue].isValidationError) {
                            this[fieldValue].isValidationError = false;
                        }
                        this[fieldValue].errorMessage = "";
                    }
                }
            }
        }
    }

    /**
     * Check Field Errors, if any error then return
     */
    checkErrorValidation(form) {
        //   console.log( "Inside Error Validation check" );
        let errorStatus: boolean = false;
        for (let fieldValue in form.getRawValue()) {
            if (this[fieldValue] != undefined) {
                if (this[fieldValue].isValidationError == true && this[fieldValue].errorMessage != "") {
                    //console.log("Field : " + fieldValue + " ; is Error : " , this.translateService.get(fieldValue));
                    this.formValid = true;
                    this.viewModalFlag = true;

                    this.title = "Error Status";
                    this.message = "Please provide required information";
                    errorStatus = true;
                    break;
                }
            }
        }
        console.log("errorStatus = " + errorStatus);
        return errorStatus;
    }

    /**
     * To Check form  is valid
     */
    formValidation(form) {
        console.log("form ", form);
        this.formValid = false;
        this.isFormIsValid = false;

        // To fill Non-required  and undefined values with  empty to make form valid 
        //Temporary fix - to be removed - Start
        let errField = null;
        for (let fieldValue in form.getRawValue()) {
            if (this[fieldValue] != undefined) {
                if (this[fieldValue] && this[fieldValue].required == "false") {

                    if (this[fieldValue].value == null || this[fieldValue].value.length == 0) {

                        this[fieldValue].value = " ";
                    }
                } else if (this[fieldValue] && this[fieldValue].required == "true") {

                    this[fieldValue].errorValidation();
                    if (this[fieldValue].isValidationError == true) {
                        errField = fieldValue;
                        break;
                    }
                }
            }
        }

        //Temporary fix - to be removed - End

        console.log("form validation  ", form.valid, "form required   ", form);
        this.isFormIsValid = form.valid;
        if (!form.valid && this.toolBar.flag) {

            this.formValid = true;
            this.viewModalFlag = true;

            this.title = "Error Status";
            if (errField != null) {
                this.message = "Please provide the required information";
            } else {
                this.message = "Please provide the required information ";
            }
            // return;
        } else {

            this.isStatusError = this.checkErrorValidation(form);

        }
    }

    viewChange(e) {

        let event = "viewName/" + e;
        let viewList = [];
        console.log("************ inside viewChange ***********");
        if (!this.reportServiceId.value) {
            this.gridList = [];
            this.globalService.progressMode = "indeterminate";
            this.dataService.getData(event, this.restServicePath).subscribe((listItems) => {
                viewList = listItems;
                this.globalService.progressMode = "";
                this.gridList = this.headerList;

                let dataArr = [];
                let dataObj;
                let id
                if (this.serviceName.value)
                    id = this.generateFieldId(this.serviceName.value);
                for (let i = 0; i < viewList.length; i++) {
                    dataObj = {
                        "field_id": "", "type": "string", "width": "150", "filtertype": null, "cellsformat": null,
                        "renderer": null, "cellsrenderer": null, "align": "center", "cellsalign": "left", "is_active": "1",
                        "pinned": "0", "report_service_id": "", "is_row": "1", "groupable": "0", "aggregates": "0", "criteria_field": "0",
                        "criteria_service": null, "criteria_service_type": "SERVICE", "criteria_field_type": "SL", "criteria_order": "0"
                    };
                    if (this.serviceName.value)
                        dataObj["field_id"] = id + "_" + i;
                    dataObj["display_name"] = viewList[i].column_name;
                    dataObj["view_field_name"] = viewList[i].column_name;
                    dataObj["display_order"] = i;
                    dataObj["name"] = viewList[i].column_name;
                    dataArr.push(dataObj);
                }
                this.gridList[1] = dataArr;
                this.treeList = true;
            });
        }

    }

    serviceChange(e) {
        console.log("Inside serviceChange*****", e); console.log("Inside serviceChange*****");
        let event = "serviceName/" + e;
        let serviceList = [];
        this.globalService.progressMode = "indeterminate";
        this.dataService.getData(event, this.restServicePath).subscribe((listItems) => {
            serviceList = listItems;
            this.gridList = [];
            if (serviceList.length != 0) {
                this.module.value = serviceList[0].module;
                this.officeType.value = serviceList[0].office_type;
                this.serviceName.value = serviceList[0].service_name;
                this.viewName.value = serviceList[0].db_view_name;
                this.treeData.value = this.treeData.checkValue = (serviceList[0].tree_data == 1) ? true : false;
                this.rowInfo.value = this.rowInfo.checkValue = (serviceList[0].row_info == 1) ? true : false;
                this.datagrp.value = this.datagrp.checkValue = (serviceList[0].data_group == 1) ? true : false;
                this.sortble.value = this.sortble.checkValue = (serviceList[0].sortable == 1) ? true : false;
                this.filterable.value = this.filterable.checkValue = (serviceList[0].filterable == 1) ? true : false;
                this.aggregates.value = this.aggregates.checkValue = (serviceList[0].aggregates == 1) ? true : false;
                this.pdfExport.value = this.pdfExport.checkValue = (serviceList[0].pdf_export == 1) ? true : false;
                this.excelExport.value = this.excelExport.checkValue = (serviceList[0].excel_export == 1) ? true : false;
                this.csvExport.value = this.csvExport.checkValue = (serviceList[0].csv_export == 1) ? true : false;
                //this.nestedTable.value =false;
                //this.nestedrepserId.value = false;
                this.print.value = this.print.checkValue = (serviceList[0].print == 1) ? true : false;
                this.refresh.value = this.refresh.checkValue = (serviceList[0].refresh == 1) ? true : false;
                this.graph.value = this.graph.checkValue = (serviceList[0].graph == 1) ? true : false;
                this.getFieldData(serviceList[0].report_service_id);
                this.globalService.progressMode = "";
            }
        });

    }
    getFieldData(serviceName: String) {
        console.log("Inside getFields*****", serviceName);

        let event = "fields/" + serviceName;
        if (this.gridList.length == 2 && this.gridList[1].length > 0)
            return;
        this.dataService.getData(event, this.restServicePath).subscribe((listItems) => {
            this.gridList = this.headerList;
            if (this.gridList.length < 2) {
                this.gridList.push(listItems);
            } else if (this.gridList.length == 2) {
                this.gridList[1] = listItems;
            }
            this.treeList = true;
        });

    }

    close() {
        this.modalFlag = false;
        this.viewModalFlag = false;
    }

    viewSubmit(formValue) {

        let data = { "viewName": formValue.viewName, "query": btoa(formValue.query) };
        this.dataService.submitForm(data, this.dataService.rootCtx + "services/reportservice/createview").subscribe((resp) => {
            this.globalService.progressMode = "";
            this.viewModalFlag = true;
            this.message = resp.message;
        });
    }

    generateFieldId(serviceId) {
        let idArr = [];
        if (serviceId) {
            idArr = serviceId.split(" ");
        }
        if (idArr.length == 1)
            return idArr[0].substr(0, 3);
        let id = "";
        for (let i = 0; i < idArr.length; i++) {
            id = id.concat(idArr[i].substr(0, 1));
        }
        return id;
    }


}