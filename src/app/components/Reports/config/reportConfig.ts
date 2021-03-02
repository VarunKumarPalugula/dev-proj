import { Component, Input, OnInit, EventEmitter, Output, DoCheck, Renderer2, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
// import { jqxListBoxComponent } from "jqwidgets/angular_jqxlistbox";
// import { CheckboxComponent } from 'app/common/checkbox/iCheckbox';

import { Validators } from '../../../validators/iValidators';
import { DataService } from '../../../services/data.service';
// declare let __moduleName: string;

@Component({

    selector: 'reportConfig',
    // moduleId: __moduleName,
    templateUrl: 'reportConfig.html',
    inputs: ['blotterList'],
    styleUrls: ['reportConfig.css']
    //inputs:['module','office','blotter']

})

export class ReportConfigComponent extends BaseComponent implements OnInit {

    // @ViewChild('dataList', { static: false }) dataList: jqxListBoxComponent;
    // @ViewChild('groupListBox', { static: false }) groupListBox: jqxListBoxComponent;
    // @ViewChild('dealerListBox', { static: false }) dealerListBox: jqxListBoxComponent;
    // @ViewChild('userListBox', { static: false }) userListBox: jqxListBoxComponent;
    @ViewChild('dataList', { static: false }) dataList: any;
    @ViewChild('groupListBox', { static: false }) groupListBox: any;
    @ViewChild('dealerListBox', { static: false }) dealerListBox: any;
    @ViewChild('userListBox', { static: false }) userListBox: any;

    // @ViewChild('blotter_Type', { static: false }) blotter_Type: DropDown2Component;
    // @ViewChild('profile_type', { static: false }) profile_type: TextSearchComponent;
    @ViewChild('blotter_Type', { static: false }) blotter_Type: any;
    @ViewChild('profile_type', { static: false }) profile_type: any;

    // @ViewChild('entityAll', { static: false }) entityAll: CheckboxComponent;
    // @ViewChild('dealerGrpAll', { static: false }) dealerGrpAll: CheckboxComponent;
    // @ViewChild('dealerAll', { static: false }) dealerAll: CheckboxComponent;
    // @ViewChild('userAll', { static: false }) userAll: CheckboxComponent;
    @ViewChild('entityAll', { static: false }) entityAll: any;
    @ViewChild('dealerGrpAll', { static: false }) dealerGrpAll: any;
    @ViewChild('dealerAll', { static: false }) dealerAll: any;
    @ViewChild('userAll', { static: false }) userAll: any;

    // @ViewChild('entityAmount1', { static: false }) entityAmount1: AmountComponent;
    // @ViewChild('entityAmount2', { static: false }) entityAmount2: AmountComponent;
    // @ViewChild('entityNum1', { static: false }) entityNum1: NumberComponent;
    // @ViewChild('entityNum2', { static: false }) entityNum2: NumberComponent;
    // @ViewChild('entityDate1', { static: false }) entityDate1: CalendarComponent;
    // @ViewChild('entityDate2', { static: false }) entityDate2: CalendarComponent;
    // @ViewChild('entityDate3', { static: false }) entityDate3: CalendarComponent;
    // @ViewChild('logic_params', { static: false }) logic_params: DropDownComponent;
    // @ViewChild('entityString', { static: false }) entityString: TextComponent;
    @ViewChild('entityAmount1', { static: false }) entityAmount1: any;
    @ViewChild('entityAmount2', { static: false }) entityAmount2: any;
    @ViewChild('entityNum1', { static: false }) entityNum1: any;
    @ViewChild('entityNum2', { static: false }) entityNum2: any;
    @ViewChild('entityDate1', { static: false }) entityDate1: any;
    @ViewChild('entityDate2', { static: false }) entityDate2: any;
    @ViewChild('entityDate3', { static: false }) entityDate3: any;
    @ViewChild('logic_params', { static: false }) logic_params: any;
    @ViewChild('entityString', { static: false }) entityString: any;

    // @ViewChild('date_text1', { static: false }) date_text1: TextComponent;
    // @ViewChild('date_text2', { static: false }) date_text2: TextComponent;
    // @ViewChild('date_text3', { static: false }) date_text3: TextComponent;
    @ViewChild('date_text1', { static: false }) date_text1: any;
    @ViewChild('date_text2', { static: false }) date_text2: any;
    @ViewChild('date_text3', { static: false }) date_text3: any;

    // @ViewChild('fieldPref', { static: false }) fieldPref: TreeGridComponent;
    // @ViewChild('graphCDD', { static: false }) graphCDD: DropDownComponent;
    // @ViewChild('attrRBoolean', { static: false }) attrRBoolean: RadioComponent;
    @ViewChild('fieldPref', { static: false }) fieldPref: any;
    @ViewChild('graphCDD', { static: false }) graphCDD: any;
    @ViewChild('attrRBoolean', { static: false }) attrRBoolean: any;


    public entityColumnList: any = [];
    public choiceList: any = [];
    public entityList: any = [];
    public itemsList: any = [];
    public columnsList: any = [];

    public colorList: any = [];
    public colList: any = [];
    public itemInfoList: any = [];

    public columns: any = [];
    public source: any = [];
    public dataAvailable: boolean = false;
    public listFlag: boolean = false;

    public clickedIdx: number = -1;
    public formList: any = [];

    public ctxUrl: string = "";
    public restServicePath: string = "";
    public response: any;
    public message: string = "";
    public formValid: boolean = false;
    public modalFlag: boolean = false;
    public title: string = '';

    public inputParams: any = '';
    public isPrefDisabled: boolean = true;
    public isFormValid: boolean = false;
    public checkedItems: any = [];
    public appDate: any = "";
    public criteriaFieldType: string = "";
    public criteriaFieldName: string = "";
    public columnCheckedList: any = [];


    //For ServiceAtributes
    public privilages: any = {};
    public attributesList: any = [];
    public prefRows: number = 0;
    public prefCols: number = 7;
    public prefRowList: any = [];
    public prefColList: any = [];
    public privilagesType: any = [];

    //For Dealers   
    public grpSource: any = Array();
    public dealerSource: any = Array();
    public userSource: any = Array();
    public reportPrivrilege: any = Array();
    public getDealerInfo: any = Array();

    //For selecton Criteria
    public entityRows: number = 0;
    public entityCols: number = 4;
    public entityRowList: any = [];
    public entityColList: any = [];

    //For Graph Attributes
    public graphPrivilagesType: any = [];
    public graphAttributeList: any = [];
    public graphRows: number = 0;
    public graphCols: number = 4;
    public graphRowList: any = [];
    public graphColList: any = [];
    public graphPrivilages: any = {};

    public logicParamList: any = [{ "id": "=", "name": "equals to" }, { "id": "<", "name": "less than" }, { "id": ">", "name": " greater than" }, { "id": "<>", "name": "not equals to" },
    { "id": "<=", "name": "less than or equal to" }, { "id": ">=", "name": "greater than or equal to" }];

    public graphTypeList = [{ "id": "Bar", "name": "Bar" }, { "id": "Pie", "name": "Pie" }, { "id": "Line", "name": "Line" }];

    public graphChoiceList: any = [];
    public graphAxisList: any = [];
    public fieldPreferences: any = [];
    public selectedReportRowIdx = -1;
    entityAmount3: any;
    blotterId: string;
    dealerAdapter: any;
    userAdapter: any;

    constructor(
        renderer: Renderer2, elementRef: ElementRef,
        private dataService: DataService
        ) {
        super();
        console.log("entityList***********************", this.entityList);
        this.ctxUrl = this.dataService.rootCtx + "services/reportservice/";
        this.restServicePath = this.dataService.rootCtx + "services/report/";
    }

    /**
     * To load the Attributes, Dealer,user information
     */
    ngOnInit() {

        console.log("blotter_Type in  ReportConfigComponent  : ", this.blotter_Type.choiceList);
        setTimeout(() => {
            console.log("****************ngOnInit  ReportConfigComponent *******");
            this.appDate = this.globalService.getApplnDate();
            this.setAttributes(null, null);
        }, 500);

        this.dataService.getData("dealerinfo", this.ctxUrl).subscribe((listItems) => {
            console.log("-- listItems  ", listItems);
            this.grpSource = listItems[0].DealerGroup;
        });

    }

    /**
     *  To check All dealers intial loading
     */
    ngAfterViewInit() {
        setTimeout(() => {
            this.groupListBox.checkAll();
        }, 300);

    }

    /**
     * To load the serviceatrributes, graph attributes while intial loading and
     * while select the blotter, profile selection
     * @param serviceObject
     * @param graphObject
     */

    setAttributes(serviceObject, graphObject) {

        console.log("blotter_Type in setAttributes : ", Object.keys(this.privilages).length, "***latestObject*** ", serviceObject);
        console.log("****** this.graphPrivilages***", Object.keys(this.graphPrivilages).length, "********graphObject******:", graphObject);

        // For Service Attributes
        if (Object.keys(this.privilages).length > 0 && serviceObject != null) {

            for (let m = 0; m < this.attributesList.length; m++) {
                let attribute = this.attributesList[m];
                //  console.log( "attribute*****", attribute );
                if (this.privilagesType[attribute].columntype == 'RBOOLEAN') {
                    //  console.log("serviceObject[attribute]",serviceObject[attribute],"attribute",attribute);
                    if (serviceObject[attribute]) {
                        //  console.log("**********this.attrRBoolean.selectedEntry1**",this.attrRBoolean);
                        this.attrRBoolean.selectedEntry = this.privilagesType[attribute].columnlist[0];
                        //   console.log("**********this.attrRBoolean.selectedEntry33**",this.attrRBoolean.selectedEntry);
                    }
                } else {
                    this.privilages[attribute] = serviceObject[attribute];
                }
            }

        } else {

            this.privilages = this.blotter_Type.choiceList[0].serviceAttributes;
            this.privilagesType = this.blotter_Type.choiceList[0].serviceAttributeTypes;
            this.attributesList = Object.keys(this.privilagesType);

            if (this.attributesList && this.attributesList.length > 0) {
                this.prefRows = Math.round(this.attributesList.length / this.prefCols);
                console.log(this.prefRows);
                this.prefRowList = Array(this.prefRows).fill(1);
                console.log(this.prefRowList);
                this.prefColList = [];

                let startPoint = 0;
                let endPoint = startPoint + this.prefCols;
                console.log(endPoint);
                console.log(" this.prefRows**", this.prefRows, "*** this.prefCols**", this.prefCols);
                for (let j = 0; j < this.prefRows; j++) {
                    this.prefColList.push([]);

                    for (let k = startPoint; k < endPoint; k++) {
                        this.prefColList[j].push(k);

                        if (this.privilagesType[this.attributesList[k]]) {
                            let gridList = this.privilagesType[this.attributesList[k]];
                            gridList.disabled = false;
                            if (gridList.columntype == 'RBOOLEAN') {
                                gridList.columnlist = JSON.parse(gridList.columnlist);
                            }
                        }


                    }

                    startPoint = endPoint;
                    endPoint = Number(startPoint) + Number(this.prefCols);
                }
                console.log("this.privilages******", this.privilages);
                if (!this.privilages['data_group']) {
                    this.privilagesType['aggregates'].disabled = true;
                    this.privilages['aggregates'] = false;
                } else {
                    this.privilagesType['aggregates'].disabled = false;
                }

                console.log("this.privilagesType[this.attributesList[k]]", this.privilagesType);

            }
        }

        // for Graph Attributes
        if (Object.keys(this.graphPrivilages).length > 0 && graphObject != null) {
            for (let m = 0; m < this.graphAttributeList.length; m++) {
                let attribute = this.graphAttributeList[m];
                console.log("graphAttributeList*****", attribute);
                if (graphObject[attribute]! = null) {
                    this.graphPrivilages[attribute] = graphObject[attribute];
                    // console.log("graphAttributeList*****565", this.graphPrivilagesType[attribute]);
                    if (this.graphPrivilagesType[attribute].columntype == 'CLIST') {
                        //  console.log("graphAttributeList*****99", graphObject[attribute]);
                        this.graphCDD.setNames(graphObject[attribute]);
                    }
                }

            }
        } else {
            this.graphPrivilagesType = this.blotter_Type.choiceList[0].graphAttributes;
            this.graphAttributeList = Object.keys(this.graphPrivilagesType);
            console.log("graphAttributeList**********", this.graphAttributeList);

            if (this.graphAttributeList && this.graphAttributeList.length > 0) {
                this.graphRows = Math.round(this.graphAttributeList.length / this.graphCols);
                console.log(this.graphRows);
                this.graphRowList = Array(this.graphRows).fill(1);
                console.log(this.graphRowList);
                this.graphColList = [];

                let startPoint = 0;
                let endPoint = startPoint + this.graphCols;
                console.log(endPoint);
                console.log(" this.graphRows**", this.graphRows, "*** this.graphCols**", this.graphCols);
                for (let j = 0; j < this.graphRows; j++) {
                    this.graphColList.push([]);

                    for (let k = startPoint; k < endPoint; k++) {
                        this.graphColList[j].push(k);
                        this.graphChoiceList[k] = [];
                        let graphAttributeType = this.graphPrivilagesType[this.graphAttributeList[k]];
                        if (graphAttributeType) {
                            if (graphAttributeType.columntype == 'BOOLEAN') {
                                this.graphPrivilages[this.graphAttributeList[k]] = false;
                            } else if (graphAttributeType.columntype == 'STRING') {
                                this.graphPrivilages[this.graphAttributeList[k]] = "";
                            } else if (graphAttributeType.columntype == 'CLIST' || graphAttributeType.columntype == 'LIST') {
                                if (graphAttributeType.service == 'GRAPHTYPE') {
                                    this.graphChoiceList[k] = this.graphTypeList;
                                } else {
                                    this.graphChoiceList[k] = this.graphAxisList;
                                }
                            }
                        }
                    }

                    startPoint = endPoint;
                    endPoint = Number(startPoint) + Number(this.graphCols);
                }

            }

        }

    }

    /**
     * TO load the entitys on select Report type 
     */

    loadCriteria() {
        this.itemsList = [];
        this.columnsList = [];
        this.globalService.progressMode = "indeterminate";

        this.dataService.getData(this.blotterId + "/ENTITY", this.restServicePath).subscribe((listItems: any[]) => {
            this.entityColumnList = listItems;
            this.columnsList = this.entityColumnList[0];
            this.itemsList = this.entityColumnList[1];
            this.columns = [];
            console.log(" this.itemsList: ", this.itemsList);

            if (this.itemsList && this.itemsList.length > 0) {
                for (let k = 0; k < this.itemsList.length; k++) {
                    this.itemsList[k].list = [];
                    this.itemInfoList[k] = [];
                    if (this.itemsList[k].list.length == 0 && this.itemsList[k].criteriaType == 'SL') {
                        this.getEntityDetails(k);
                    }
                }
                this.globalService.progressMode = "";

            }

            console.log("****************this.columnsList****  : ", this.columnsList);

            if (this.columnsList && this.columnsList.length > 0) {
                this.itemsList.push({
                    "criteriaName": "Columns",
                    "criteriaId": "COL",
                    "criteriaViewName": "COLUMNS",
                    "serviceId": "",
                    "criteriaType": "SL",
                    "criteriaOrder": 0,
                    "criteriaServiceType": "",
                    "criteriaItems": []
                });
                for (let m = 0; m < this.columnsList.length; m++) {
                    this.columns.push(
                        {
                            'label': this.columnsList[m].columnName
                                + ' (' + this.columnsList[m].criteriaOrder + ')',
                            'value': this.columnsList[m].columnName
                        });
                    this.graphAxisList.push({ 'id': this.columnsList[m].columnId, 'name': this.columnsList[m].columnName });
                }
            }


            if (this.itemsList && this.itemsList.length > 0) {

                for (let k = 0; k < this.itemsList.length; k++) {
                    this.checkedItems[k] = [];
                    this.colorList.push(0);
                }

                this.entityRows = Math.round(this.itemsList.length / this.entityCols);
                console.log(this.entityRows);
                this.entityRowList = Array(this.entityRows).fill(1);
                console.log(this.entityRowList);
                this.entityColList = [];

                let startPoint = 0;
                let endPoint = startPoint + this.entityCols;
                console.log(endPoint);
                console.log(" this.entityRows**", this.entityRows, "*** this.entityCols**", this.entityCols);
                for (let j = 0; j < this.entityRows; j++) {
                    this.entityColList.push([]);

                    for (let m = startPoint; m < endPoint; m++) {
                        this.entityColList[j].push(m);
                    }

                    startPoint = endPoint;
                    endPoint = Number(startPoint) + Number(this.entityCols);
                }
                console.log(" this.entityRows**", this.entityRowList, "*** this.entityCols**", this.entityColList);
            }
        });

        this.dataService.getData("viewField/entity/" + this.blotterId, this.restServicePath).subscribe((listItems: any[]) => {
            //this.fieldPreferences = listItems;

            console.log(" this.fieldPreferences ***", listItems);
            for (let k = 0; k < listItems[0].length; k++) {
                console.log(" this.fieldPreferences 333***", listItems[0]);
                if (listItems[0][k].display_name == "VIEW_FIELD_NAME") {
                    listItems[0][k].pinned = true;
                    listItems[0][k].editable = false;

                } else if (listItems[0][k].display_name == "FIELD_ID") {
                    listItems[0][k].hidden = true;
                }

            }
            this.fieldPreferences = listItems;
            console.log(" this.fieldPreferences ***123*********", this.fieldPreferences);

            this.globalService.progressMode = "";
        });

        setTimeout(() => {
            this.globalService.progressMode = "";
        }, 2500);

    }

    /**
     * To load the entity stringList value 'SL'
     */
    getEntityDetails(entityIndx) {

        let entityPath = this.dataService.rootCtx + "services/data" + this.itemsList[entityIndx].criteriaService;
        setTimeout(() => {
            this.dataService.getData("", entityPath).subscribe((listItems) => {
                console.log("Entity Details: ", listItems);
                this.entityList = listItems;
                console.log(" this.itemsList: ", entityIndx, this.itemsList);
                this.itemsList[entityIndx]['list'] = this.entityList;
                console.log(" this.itemsList[ this.tempIndx].list: ", this.itemsList[entityIndx]);
                for (let j = 0; j < this.entityList.length; j++) {
                    this.itemInfoList[entityIndx].push(this.entityList[j].name);
                }
            });
        }, 200);
    }

    /**
    * Check Field Errors, if any error then return
    */
    checkErrorValidation(form) {
        console.log("Inside Error Validation check");
        let errorStatus = false;
        for (let fieldValue in form.getRawValue()) {
            if (this[fieldValue] != undefined) {

                if (this[fieldValue].required == "true") {
                    console.log("Mandatory field check for -1 value: " + fieldValue);
                    this[fieldValue].errorValidation();
                    if (this[fieldValue].isValidationError == true) {
                        //errField = fieldValue;
                        console.log("Field : " + fieldValue + " ; is Error : " + this[fieldValue].isValidationError);
                        this.formValid = true;
                        this.modalFlag = true;
                        this.title = "Error Status";
                        this.message = "Please provide required information: " + fieldValue;
                        errorStatus = true;
                        break;
                    }
                }
            }
        }
        console.log("errorStatus = " + errorStatus);
        return errorStatus;
    }


    onSubmit(form, value) {

        let path = "";
        this.isFormValid = this.checkErrorValidation(form);

        if (!this.privilages['graph']) {
            this.graphPrivilages = {};
        }

        this.fieldPreferences[1] = this.fieldPref.dataList;
        console.log("this.fieldPreferences**111", this.fieldPreferences);

        if (!this.isFormValid) {

            if (this.checkedItems[this.itemsList.length] == '(ALL)') {
                this.colList = [];
            }
            else { //this.columnCheckedList.length > 0

                for (let m = 0; m < this.columns.length; m++) {
                    for (let i = 0; i < this.columnsList.length; i++) {

                        if (this.columns[m].value == this.columnsList[i].columnName) {
                            this.colList.push(this.columnsList[i]);
                            break;
                        }
                    }
                }
            }

            for (let i = 0; i < this.itemsList.length - 1; i++) {
                if (this.itemsList[i].criteriaType == 'SL') {
                    this.itemsList[i].criteriaItems = [];
                    if (this.checkedItems[i] == '(ALL)') {
                        this.itemsList[i].criteriaItems = [];
                    } else {
                        for (let j = 0; j < this.itemsList[i].list.length; j++) {

                            if (this.itemsList[i].list[j].selected == true) {
                                this.itemsList[i].criteriaItems.push(this.itemsList[i].list[j].name);
                            }
                        }
                    }
                }
            }
            this.itemsList.splice(this.itemsList.length - 1, 1);

            path = this.restServicePath + value;

            console.log("this.selectedReportRowIdx", this.selectedReportRowIdx);

            if (this.selectedReportRowIdx > -1) {
                path = this.restServicePath + "modify/" + this.profile_type.choiceList[this.selectedReportRowIdx].id;
            }


            this.formList = {
                blotterType: this.blotterId,
                profileName: this.profile_type.value,
                entityList: this.itemsList,
                colList: this.colList,
                attrList: this.privilages,
                graphAttr: this.graphPrivilages,
                reportPrivileges: this.reportPrivrilege,
                fieldPreferences: this.fieldPreferences[1]
            };

            console.log("this.formList: ", this.formList);
            this.dataService.submitForm(this.formList, path).subscribe((listItems) => {
                this.globalService.progressMode = "";
                this.response = listItems;
                this.getResponse(null);
            });
            setTimeout(() => {
                this.globalService.progressMode = "";
            }, 2500);
        }

    }

    /* To ahow the responce in popup*/

    getResponse(form) {
        console.log("Response**********", this.response);
        let status = this.response.status;
        this.formValid = true;
        if (!status) {
            this.title = "Error Status";
            if (this.response.errorMessage) {
                this.message = this.response.errorMessage;
            }
            else {
                this.message = "Problem exist on serverside";
            }
        }
        else {
            this.title = "Deal Status";
            if (this.response.message) {
                this.message = this.response.message;
                this.clear(form);
            }
        }
        this.modalFlag = true;
    }

    deleteReport() {

        this.dataService.getData(this.profile_type.choiceList[this.selectedReportRowIdx].id, this.restServicePath + "delete/").subscribe((listItems) => {
            //  this.globalService.progressMode = "";
            this.response = listItems;
            this.getResponse(null);
        });

    }

    /**
     * To get the entitys , service and graph attributes on report chage.
     * @param event
     */
    blotterChange(event: any) {
        console.log("************* blotterChange ************ ", event);
        this.clearArray();
        this.blotterId = event.value;
        this.profile_type.value = '';
        if (this.blotterId != "" && this.blotterId != "-1") {

            this.loadCriteria();
            this.listFlag = true;
            this.isPrefDisabled = false;

            this.setAttributes(this.blotter_Type.selectedItem.serviceAttributes, null); //this.blotter_Type.selectedItem.graphAttributes );


        }
        else {
            this.isPrefDisabled = true;
        }
    }

    /**
     * To view the related report and profile details.
     * @param event
     */
    getEventDetails(event) {

        this.choiceList = [];
        this.clearCriteriaTypes();
        console.log("************* getEventDetails ************ ", event);
        this.setAttributes(event.selectedObj[4], event.selectedObj[5]);
        this.selectedReportRowIdx = event.rowIndex;
        this.profile_type.value = event.selectedObj[1];

        this.dataService.getData(this.blotterId + "/" + event.selectedObj[0], this.restServicePath + "view/").subscribe((listItems) => {

            this.choiceList = listItems;
            this.groupListBox.uncheckAll();

            if (this.choiceList && this.choiceList[3].length > 0) {
                this.getDealerInfo = this.choiceList[3];
                this.getReportPrivrilege('groupListBox', 'dlrGrpId');
            }

            if (this.choiceList[0].length > 0) {
                let found = false;
                for (let k = 0; k < this.columnsList.length; k++) {
                    found = false;
                    for (let l = 0; l < this.choiceList[0].length; l++) {
                        if (this.columnsList[k].columnName == this.choiceList[0][l].columnName) {
                            if (this.choiceList[0][l].selected == true) {
                                this.columnCheckedList.push(this.choiceList[0][l].columnName);
                            }

                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        this.choiceList[0].push(this.columnsList[k]);
                    }
                }
                this.columnsList = this.choiceList[0];
                this.columns = [];
                for (let m = 0; m < this.columnsList.length; m++) {

                    this.columns.push({ 'label': this.columnsList[m].columnName + ' (' + this.columnsList[m].criteriaOrder + ')', 'value': this.columnsList[m].columnName });

                }
                console.log("this. this.columns **********", this.columns);
            }

            if (this.choiceList[1].length > 0) {
                for (let i = 0; i < this.choiceList[1].length; i++) {
                    for (let j = 0; j < this.itemsList.length - 1; j++) {
                        console.log("this.choiceL this.itemsList[j]ist 23**********", this.itemsList);
                        if (this.choiceList[1][i].criteriaName == this.itemsList[j].criteriaViewName) {
                            console.log("this.choiceL this.itemsList[j]ist56 **********", this.itemsList);
                            let name = this.choiceList[1][i].criteriaName;
                            this.itemsList[j].criteriaItems = [];
                            this.itemsList[j].criteriaOrder = this.choiceList[1][i].criteriaOrder;

                            this.itemsList[j].criteriaItems = this.choiceList[2][name];
                            if (this.itemsList[j].criteriaType == 'SL') {
                                for (let m = 0; m < this.itemsList[j].list.length; m++) {
                                    this.itemsList[j].list[m].selected = false;
                                    for (let n = 0; n < this.itemsList[j].criteriaItems.length; n++) {
                                        if ((this.itemsList[j].criteriaItems[n]) == (this.itemsList[j].list[m].name)) {
                                            this.itemsList[j].list[m].selected = true;
                                        }
                                    }
                                }
                            }
                            break;
                        }

                    }

                }
                console.log("this.choiceL this.itemsList[j]ist **********", this.itemsList);
            }

            this.entityClick(this.itemsList[this.clickedIdx], this.clickedIdx);
            this.globalService.progressMode = "";
        });

        this.dataService.getData("viewField/report/" + event.value, this.restServicePath).subscribe((listItems: any[]) => {

            for (let k = 0; k < listItems[0].length; k++) {
                console.log(" this.fieldPreferences 555***", listItems[0]);
                if (listItems[0][k].display_name == "VIEW_FIELD_NAME") {
                    listItems[0][k].pinned = true;
                    listItems[0][k].editable = false;
                } else if (listItems[0][k].display_name == "FIELD_ID") {
                    listItems[0][k].hidden = false;
                }
            }
            this.globalService.progressMode = "";
            this.fieldPreferences = listItems;

            this.fieldPref.gridDataList = this.fieldPreferences;
            console.log("listItems getEventDetails:", this.fieldPreferences);

        });

        setTimeout(() => {
            this.globalService.progressMode = "";
        }, 2500);
    }

    /**
     * To list out the check/uncheck values related to the type 'SL'.
     * @param event
     */
    checkChange(event: any) {
        console.log("event***********", event);
        let listLength = 0;

        if (this.itemsList[this.clickedIdx].criteriaViewName == 'COLUMNS') {
            console.log("Columns............");
            listLength = this.columnsList.length;
            for (let i = 0; i < this.columnsList.length; i++) {
                if (event.args.value == this.columnsList[i].columnName) {
                    if (event.args.checked) {
                        this.columnsList[i].selected = true;
                    }
                    else {
                        this.columnsList[i].selected = false;
                    }

                }
            }
            this.columnCheckedList = this.dataList.getCheckedItems();
            console.log("this.columnCheckedList***********", this.columnCheckedList);
        } else {
            console.log("Entities............");
            listLength = this.itemsList[this.clickedIdx].list.length;
            for (let i = 0; i < this.itemsList[this.clickedIdx].list.length; i++) {
                if (event.args.value == this.itemsList[this.clickedIdx].list[i].name) {

                    let selectItems = this.itemsList[this.clickedIdx].criteriaItems;
                    let ax = -1;

                    if (event.args.checked) {
                        this.itemsList[this.clickedIdx].list[i].selected = true;
                        selectItems.push(this.itemsList[this.clickedIdx].list[i].name);

                        // console.log( "event", this.itemsList[this.clickedIdx].list[i].selected );
                    }
                    else {
                        //console.log( "event", this.itemsList[this.clickedIdx].list[i].selected );
                        this.itemsList[this.clickedIdx].list[i].selected = false;

                        while ((ax = selectItems.indexOf(this.itemsList[this.clickedIdx].list[i].name)) !== -1) {
                            selectItems.splice(ax, 1);
                        }

                    }

                }
            }

        }
        setTimeout(() => {
            this.getSelectedList(listLength);
        }, 100);

    }

    /**
     * The selected entity values to  get reflected on click button. On click to show entity related values.
     * @param entity
     * @param idx
     */
    entityClick(entity, idx) {
        console.log("entity click1234: ", entity);
        if (entity) {

            this.clickedIdx = idx;
            let listLength = 0;
            this.clearCriteriaTypes();
            this.criteriaFieldType = entity.criteriaType;
            this.criteriaFieldName = entity.criteriaName;
            let listItems = this.itemsList[idx];
            this.colorList[idx] = 1;

            if (entity.criteriaType == 'SL') {
                //console.log("**************entityAll***",this.entityAll);
                //  this.entityAll['checkValue'] = false;
                if (entity.criteriaViewName == 'COLUMNS') {

                    listLength = this.columnsList.length;
                    this.source = this.columns;

                    setTimeout(() => {

                        if (this.dataList)
                            this.dataList.refresh();

                        this.entityAll['checkValue'] = false;
                        console.log("this.columnCheckedList***", this.columnCheckedList);
                        if (this.columnCheckedList.length == 0) {
                            console.log("**************entityAll***", this.entityAll['checkValue']);
                            this.entityAll['checkValue'] = true;
                            console.log("**************entityAll***2222", this.entityAll['checkValue']);
                            this.dataList.checkAll();
                        } else {
                            this.columnClick();
                        }

                        this.getSelectedList(listLength);
                    }, 150);
                    //  return;

                } else {

                    console.log("entity click: ", this.itemInfoList[idx]);
                    listLength = this.itemsList[idx].list.length;
                    this.source = this.itemInfoList[idx];

                    setTimeout(() => {
                        //  console.log( "this.itemsList[idx] entityClick", this.itemsList[idx] );
                        this.entityAll['checkValue'] = false;


                        if (this.dataList)
                            this.dataList.refresh();
                        console.log("this.itemsList[idx]", this.itemsList[idx]);
                        if (this.itemsList[idx].criteriaItems.length == 0) {
                            this.entityAll['checkValue'] = true;
                            this.dataList.checkAll();

                        } else {
                            for (let i = 0; i < this.itemsList[idx].list.length; i++) {
                                if (this.itemsList[idx].list[i].selected == true && this.dataList) {
                                    //console.log("this.dataList", this.dataList);
                                    this.dataList.checkIndex(i);

                                }
                            }
                        }

                        this.getSelectedList(listLength);
                    }, 100);


                }
            } else if (this.criteriaFieldType == 'S') {


                setTimeout(() => {
                    if (listItems.criteriaItems.length > 0)
                        this.entityString.value = listItems.criteriaItems[0];
                    this.getSelectedList(listLength);
                }, 100);

            } else if (this.criteriaFieldType == 'A') {


                setTimeout(() => {
                    if (listItems.criteriaItems.length > 0) {
                        console.log("listItems.criteriaItems**", listItems.criteriaItems);
                        let items = listItems.criteriaItems[0].split(" ");
                        console.log("items**", items);
                        this.entityAmount1.value = Validators.amountValidation(items[1]);
                        this.logic_params.value = items[0];
                    }
                    this.getSelectedList(listLength);
                }, 100);

            } else if (this.criteriaFieldType == 'AR') {


                setTimeout(() => {
                    if (listItems.criteriaItems.length > 0) {

                        let item1 = listItems.criteriaItems[0].split(" ");
                        this.entityAmount1.value = Validators.amountValidation(item1[1]);

                        let item2 = listItems.criteriaItems[1].split(" ");
                        this.entityAmount2.value = Validators.amountValidation(item2[1]);
                    }
                    this.getSelectedList(listLength);
                }, 100);

            } else if (this.criteriaFieldType == 'N') {


                setTimeout(() => {
                    if (listItems.criteriaItems.length > 0) {
                        console.log("listItems.criteriaItems**", listItems.criteriaItems);
                        let items = listItems.criteriaItems[0].split(" ");
                        console.log("items**", items);
                        this.entityNum1.value = items[1];
                        this.logic_params.value = items[0];
                    }
                    this.getSelectedList(listLength);
                }, 100);
            } else if (this.criteriaFieldType == 'NR') {


                setTimeout(() => {
                    if (listItems.criteriaItems.length > 0) {
                        let item1 = listItems.criteriaItems[0].split(" ");
                        this.entityNum1.value = item1[1];

                        let item2 = listItems.criteriaItems[1].split(" ");
                        this.entityNum2.value = item2[1];

                    }
                    this.getSelectedList(listLength);
                }, 100);
            } else if (this.criteriaFieldType == 'D') {


                setTimeout(() => {
                    if (listItems.criteriaItems.length > 0) {
                        console.log("listItems.criteriaItems**", listItems.criteriaItems);
                        let list = listItems.criteriaItems[0];
                        if (list.includes('|')) {
                            let str = list.split("|");
                            this.logic_params.value = str[0];
                            this.date_text1.value = str[1] + str[2];
                            this.entityDate1.dateValidation(str[1] + str[2]);
                        } else {
                            let items = list.split("'");
                            console.log("items**", items);
                            this.logic_params.value = items[0];
                            this.date_text1.value = items[1];
                            this.entityDate1.dateValidation(items[1]);

                        }

                    }
                    this.getSelectedList(listLength);
                }, 100);

            } else if (this.criteriaFieldType == 'DR') {


                console.log("entity.criteriaType ************:", this.criteriaFieldType);
                console.log("entity.criteriaType ************:", listItems.criteriaItems);


                setTimeout(() => {
                    if (listItems.criteriaItems.length > 0) {
                        let list1 = listItems.criteriaItems[0];
                        let list2 = listItems.criteriaItems[1];


                        if (list2.includes('|')) {
                            let str = list2.split("|");
                            // this.logic_params.value = str[0];
                            this.date_text3.value = str[1] + str[2];
                            this.entityDate3.dateValidation(str[1] + str[2]);
                        } else {
                            let items = list2.split("'");
                            console.log("items**", items);
                            this.date_text3.value = items[1];
                            this.entityDate3.dateValidation(items[1]);
                            // this.logic_params.value = items[0];

                        }

                        if (list1.includes('|')) {
                            let str = list1.split("|");
                            //this.logic_params.value = str[0];
                            this.date_text2.value = str[1] + str[2];
                            this.entityDate2.dateValidation(str[1] + str[2]);
                        } else {
                            let items = list1.split("'");
                            console.log("items**", items);
                            this.date_text2.value = items[1];
                            this.entityDate2.dateValidation(items[1]);
                            // this.logic_params.value = items[0];

                        }


                    }
                    this.getSelectedList(listLength);
                }, 100);
            }
        }
    }

    /**
     * To get the entity column values
     */
    columnClick() {

        console.log("*************** column Click*******");
        //  let timeoutId = setTimeout(() => {
        console.log("  ************this.columnsList columnClick: ", this.columnsList);

        console.log("this.dataList.getCheckedItems()", this.dataList);
        if (this.dataList)
            this.dataList.refresh();
        for (let i = 0; i < this.columnsList.length; i++) {
            if (this.columnsList[i].selected == true && this.dataList) {

                this.dataList.checkIndex(i);

            }
        }
        this.columnCheckedList = this.dataList.getCheckedItems();

        //   }, 100 );
    }

    /**
     * To get the entity values of date from the textfield for 'D','DR'.
     * @param event
     * @param entityName
     */
    getEntityDate(event, entityName) {
        console.log("getEntityDate*********", event);
        if (entityName == 'date_text1') {
            this.entityDate1.value = event.value;
        } else if (entityName == 'date_text2') {
            this.entityDate2.value = event.value;
        } else {
            this.entityDate3.value = event.value;
        }
    }

    /**
     * To assign the entered selected entity values to the list  for 'DR','D','A','AR','N','NR','S'
     * @param event
     * @param entityName
     */
    getTypeEntityValues(event, entityName) {
        console.log("getTypeEntityValues*********", event);
        let listItems = this.itemsList[this.clickedIdx];

        if (this.criteriaFieldType == 'DR') {
            let atualValue = event.atualValue;
            let len = atualValue.length;
            if (entityName == 'entityDate3') {
                console.log("date_text3:", this.date_text3.value, "atualValue:", atualValue, "*********");

                if (atualValue != "") {

                    listItems.criteriaItems[1] = "<|" + atualValue.substring(0, len - 1) + "|" + atualValue.charAt(len - 1);
                } else {
                    this.date_text3.value = event.value;
                    this.entityDate3.atualValue = "";
                    listItems.criteriaItems[1] = "<'" + event.value + "'";
                }
            } else {
                console.log("date_text2:", this.date_text2.value, "atualValue:", atualValue, "***********");
                if (atualValue != "") {
                    listItems.criteriaItems[0] = ">|" + atualValue.substring(0, len - 1) + "|" + atualValue.charAt(len - 1);
                } else {
                    this.date_text2.value = event.value;
                    this.entityDate2.atualValue = "";
                    listItems.criteriaItems[0] = ">'" + event.value + "'";
                }
            }

        } else if (this.criteriaFieldType == 'NR') {

            if (entityName == 'entityNum1') {
                listItems.criteriaItems[0] = ">" + event.value;
            } else {
                listItems.criteriaItems[1] = "<" + event.value;
            }

        } else if (this.criteriaFieldType == 'AR') {

            if (entityName == 'entityAmount1') {
                listItems.criteriaItems[0] = "> " + Validators.indexCommaRemove(event.value);
            } else {
                listItems.criteriaItems[1] = "< " + Validators.indexCommaRemove(event.value);
            }

        } else if (this.criteriaFieldType == 'D') {
            listItems.criteriaItems = [];
            listItems.param = "";
            console.log("date_text1:", this.date_text1.value, "atualValue:", event.atualValue, "**********");
            if (this.logic_params.value) {
                listItems.param = this.logic_params.value;

            }
            if (event.atualValue != "") {
                let atualValue = event.atualValue;
                let len = atualValue.length;

                listItems.criteriaItems[0] = listItems.param + "|" + atualValue.substring(0, len - 1) + "|" + atualValue.charAt(len - 1);
            } else {
                this.date_text1.value = event.value;
                this.entityDate1.atualValue = "";
                listItems.criteriaItems[0] = listItems.param + "'" + event.value + "'";
            }


        } else if (this.criteriaFieldType == 'N' || this.criteriaFieldType == 'A') {
            listItems.criteriaItems = [];
            listItems.param = "";

            if (this.logic_params.value) {
                listItems.param = this.logic_params.value;
            }
            if (this.criteriaFieldType == 'A')
                listItems.criteriaItems.push(listItems.param + " " + Validators.indexCommaRemove(event.value));
            else
                listItems.criteriaItems.push(listItems.param + " " + event.value);


        } else {
            listItems.criteriaItems = [];
            listItems.criteriaItems.push(event.value);

        }
        this.getSelectedList(0);
        console.log("getTypeEntityValues****this.itemsList[this.clickedIdx]*****", this.itemsList[this.clickedIdx]);

    }

    /**
     * While drag& drop the values to store the order of the list.
     * @param event
     */
    getDataOnDragEnd(event) {

        console.log("************ this.items******", this.dataList.getItems());
        let reOrderedList = this.dataList.getItems();
        this.columns = [];
        for (let m = 0; m < reOrderedList.length; m++) {
            this.columns.push({ 'label': reOrderedList[m].label, 'value': reOrderedList[m].value });

        }
        console.log("************ this.items*2222*****", this.columns);


    }

    /**
     * To show the seleed/entered/ checked entity  related values in selection criteria using checkedItems
     * @param listLength
     */
    getSelectedList(listLength) {
        //    console.log( "getSelectedList  this.dataList ****", this.dataList );
        //  if ( this.itemsList[this.clickedIdx].criteriaViewName != 'COLUMN' ) {
        this.checkedItems[this.clickedIdx] = "";
        if (this.criteriaFieldType == 'SL') {
            let items = this.dataList.getCheckedItems();

            if (items.length > 0) {
                let chkLength = items.length;
                console.log("this.dataList.listLength44()****", chkLength);

                // checked and unchecked the all checkbox
                if (listLength == chkLength) {
                    this.entityAll['checkValue'] = true;

                    this.checkedItems[this.clickedIdx] += '  (ALL)';

                } else {
                    this.entityAll['checkValue'] = false;
                    if (this.itemsList[this.clickedIdx].criteriaViewName != 'COLUMN') {
                        this.checkedItems[this.clickedIdx] += "  [";
                        for (let i = 0; i < items.length; i++) {
                            if (i < items.length - 1) {
                                //  console.log("items[i].label.getCheckedItems()****", items[i].label);
                                this.checkedItems[this.clickedIdx] += "'" + items[i].label + "', ";
                            }
                            else
                                this.checkedItems[this.clickedIdx] += "'" + items[i].label + "']";
                        }
                    }

                }
            }
        } else {
            console.log("this.checkedItems[this.clickedIdx]**", this.itemsList[this.clickedIdx].criteriaItems);
            this.checkedItems[this.clickedIdx] += this.itemsList[this.clickedIdx].criteriaItems;
        }

        // console.log( "this.dataList.checkedItems()****", this.checkedItems );
        //    }


    }

    /**
     * While check All to check all the  values for the entity's
     * @param chkValue
     */
    checkAll(chkValue) {
        console.log("checkAll*************", chkValue);
        this.checkedItems[this.clickedIdx] = "";
        if (chkValue) {
            this.dataList.checkAll();

        } else {
            this.dataList.uncheckAll();

        }
    }

    /**
     * To assign the changed values of the gridAttributes  to the service privilages list.
     * @param event
     * @param serviceObject
     * @param attrName
     */
    getGridPriferences(event, serviceObject, attrName) {
        console.log(" attributes***********", serviceObject, "**event**  ", event, "******attrName**", attrName);

        if (serviceObject.columntype == 'STRING') {
            this.privilages[attrName] = event.value;

        } else if (serviceObject.columntype == 'BOOLEAN') {
            this.privilages[attrName] = event;
        } else if (serviceObject.columntype == 'RBOOLEAN') {
            this.privilages[attrName] = true;
        }

        console.log(" privilages****656*******", this.privilages);
    }

    /**
     * To assign the changed values of the graphAttributes  to the service graphPrivilages list.
     * @param event
     * @param graphObject
     * @param graphName
     */
    getGraphPriferences(event, graphObject, graphName) {
        console.log(" graphObject***********", graphObject, "**event**  ", event, "**graphName**", graphName);
        if (graphObject.columntype == 'BOOLEAN') {
            this.graphPrivilages[graphName] = event;
        } else {
            this.graphPrivilages[graphName] = event.value;

        }
        console.log(" graphPrivilages****656*******", this.graphPrivilages);

    }

    /**
     * On check/uncheck the dealer group to show the dealers
     * @param event
     */
    OnGroupChange(event) {

        let selectedGrp = this.groupListBox.getCheckedItems();
        let chkValue = event.args.value;
        let chkFlag = event.args.checked;
        this.dealerSource.splice(0);
        let chkGroup = selectedGrp.filter((x) => {
            if ((x.value == chkValue && chkFlag) || !chkFlag) {
                return true;
            }
            return false;
        });
        if (chkFlag && chkGroup.length == 0) {
            selectedGrp.push(event.args.item);
        }
        if (this.grpSource.length == selectedGrp.length) {
            this.dealerGrpAll.checkValue = true;
        }
        else {
            this.dealerGrpAll.checkValue = false;
            this.dealerAll.checkValue = false;
            this.userAll.checkValue = false;
        }
        this.userListBox.clear();
        for (let j = 0; j < selectedGrp.length; j++) {
            for (let i = 0; i < this.grpSource.length; i++) {
                if (this.grpSource[i].id == selectedGrp[j].value) {
                    if (this.grpSource[i]['dealerInfo']) {
                        this.dealerSource = this.dealerSource.concat(this.grpSource[i]['dealerInfo']);
                    }
                    break;
                }
            }
        }
        let source = {
            datatype: "json",
            datafields: [
                { name: 'id' },
                { name: 'name' }
            ],
            localdata: this.dealerSource
        };
        // this.dealerAdapter = new jqx.dataAdapter(source); // create data adapter.
        source.localdata = this.dealerSource; //update the localdata
        this.dealerAdapter.dataBind(); // perform Data Binding
        let timeoutId = setTimeout(() => {
            if (this.getDealerInfo && this.getDealerInfo.length == 0)
                this.dealerListBox.checkAll();
            else
                this.getReportPrivrilege('dealerListBox', 'dealerId');
        }, 100);
    }

    /**
     *  On check/uncheck the dealers to show the users respectively
     * @param event
     */
    OnDealerChange(event) {

        let selectedDealer = this.dealerListBox.getCheckedItems();
        let chkValue = event.args.value;
        let chkFlag = event.args.checked;
        this.userSource.splice(0);
        // check 
        let chkDealer = selectedDealer.filter((x) => {
            if ((x.value == chkValue && chkFlag) || !chkFlag) {
                return true;
            }
            return false;
        });
        if (chkDealer.length == 0 && chkFlag) {
            selectedDealer.push(event.args.item);
        }
        if (this.dealerSource.length == selectedDealer.length) {
            this.dealerAll.checkValue = true;
        }
        else {
            this.dealerAll.checkValue = false;
            this.userAll.checkValue = false;
        }
        for (let j = 0; j < selectedDealer.length; j++) {
            for (let i = 0; i < this.dealerSource.length; i++) {
                if (this.dealerSource[i]['id'] == selectedDealer[j].value) {
                    if (this.dealerSource[i]['userInfo']) {
                        this.userSource = this.userSource.concat(this.dealerSource[i]['userInfo']);
                    }
                    break;
                }
            }
        }
        let source = {
            datatype: "json",
            datafields: [
                { name: 'id' },
                { name: 'name' }
            ],
            localdata: this.userSource
        };
        // this.userAdapter = new jqx.dataAdapter(source);
        source.localdata = this.userSource;
        this.userAdapter.dataBind();
        setTimeout(() => {
            if (this.getDealerInfo && this.getDealerInfo.length == 0)
                this.userListBox.checkAll();
            else
                this.getReportPrivrilege('userListBox', 'userId');
        }, 100);
    }

    /**
     * On userchange set the object like dealerGroup,dealer,user hirarchy with selected values.
     * @param event
     */
    OnUserChange(event) {
        let selectedUser = this.userListBox.getCheckedItems();
        let chkValue = event.args.value;
        let chkFlag = event.args.checked;
        this.reportPrivrilege.splice(0);
        let chkUser = selectedUser.filter((x) => {
            if ((x.value == chkValue && chkFlag) || !chkFlag) {
                return true;
            }
            return false;
        });
        if (chkFlag && chkUser.length == 0) {
            selectedUser.push(event.args.item);
        }
        if (this.userSource.length == selectedUser.length) {
            this.userAll.checkValue = true;
        }
        else {
            this.userAll.checkValue = false;
        }
        let indx = 0;
        let flag = true;
        for (let i = 0; i < selectedUser.length; i++) {
            flag = true;
            for (let j = 0; j < this.grpSource.length && flag; j++) {
                for (let k = 0; k < this.grpSource[j]['dealerInfo'].length && flag; k++) {
                    for (let l = 0; l < this.grpSource[j]['dealerInfo'][k]['userInfo'].length; l++) {
                        if (this.grpSource[j]['dealerInfo'][k]['userInfo'][l].id == selectedUser[i].value) {
                            this.reportPrivrilege[indx] = {
                                dlrGrpId: this.grpSource[j].id,
                                dealerId: this.grpSource[j]['dealerInfo'][k].id,
                                userId: this.grpSource[j]['dealerInfo'][k]['userInfo'][l].id
                            };
                            indx++;
                            flag = false;
                            break;
                        }
                    }
                }
            }
        }
    }

    onDealerGrpClick(event) {
        this.getDealerInfo = [];
        if (event) {
            this.groupListBox.checkAll();
        }
        else {
            this.groupListBox.uncheckAll();
            this.dealerAll.checkValue = false;
            this.userAll.checkValue = false;
        }
    }

    onDealerClick(event) {
        this.getDealerInfo = [];
        if (event) {
            this.dealerListBox.checkAll();
        }
        else {
            this.dealerListBox.uncheckAll();
            this.userAll.checkValue = false;
        }
    }

    onUserClick(event) {
        this.getDealerInfo = [];
        if (event) {
            this.userListBox.checkAll();
        }
        else {
            this.userListBox.uncheckAll();
        }
    }

    getReportPrivrilege(listbox, id) {
        for (let i = 0; i < this.getDealerInfo.length; i++) {
            this[listbox].checkItem(this.getDealerInfo[i][id]);
        }
    }

    /**
     * This method is use to close the pop up window
     */
    close() {
        this.modalFlag = false;
        this.formValid = false;
    }

    clear(form) {
        console.log("clear************************* :", form);
        this.profile_type.value = '';
        this.blotter_Type.value = -1;
        this.blotterId = '';
        this.groupListBox.uncheckAll();
        this.clearArray();
        this.listFlag = false;
        this.isPrefDisabled = true;
        this.selectedReportRowIdx = -1;

        if (typeof (form) != "undefined") {
            for (let fieldValue in form.getRawValue()) {
                if (this[fieldValue] != undefined) {
                    if (this[fieldValue].errorMessage != "") {
                        this[fieldValue].isValidationError = false;
                        this[fieldValue].errorMessage = "";
                        //console.log("clear^^^^^^^^^^ fieldValue", this[fieldValue]);
                    }
                }
            }
        }
    }


    clearArray() {

        console.log("*****************clearArray*****");

        this.source = [];
        this.choiceList = [];
        this.entityList = [];

        this.itemInfoList = [];
        this.columnsList = [];
        this.colList = [];
        this.clickedIdx = -1;
        this.columns = [];
        this.formList = [];
        this.criteriaFieldType = "";
        this.criteriaFieldName = "";
        this.checkedItems = [];
        this.itemsList = [];
        this.colorList = [];
        this.graphAxisList = [];
        this.fieldPreferences = [];
        this.columnCheckedList = [];


        for (let m = 0; m < this.attributesList.length; m++) {
            let attribute = this.attributesList[m];
            console.log("attribute*****", attribute);
            if (this.privilagesType[attribute].columntype == 'BOOLEAN') {
                this.privilages[attribute] = false;
            } else if (this.privilagesType[attribute].columntype == 'STRING') {
                this.privilages[attribute] = "";
            } else if (this.privilagesType[attribute].columntype == 'RBOOLEAN') {
                this.attrRBoolean.selectedEntry = {};
            }

        }

        for (let l = 0; l < this.graphAttributeList.length; l++) {
            let graphAttribute = this.graphAttributeList[l];
            console.log("graphAttribute*****", graphAttribute);

            if (this.graphPrivilagesType[graphAttribute].columntype == 'BOOLEAN') {
                this.graphPrivilages[graphAttribute] = false;
            } else if (this.graphPrivilagesType[graphAttribute].columntype == 'STRING') {
                this.graphPrivilages[graphAttribute] = "";
            } else if (this.graphPrivilagesType[graphAttribute].columntype == 'CLIST' || this.graphPrivilagesType[graphAttribute].columntype == 'LIST') {
                this.graphPrivilages[graphAttribute] = -1;
                this.graphCDD.selectedOptions = "";

            }
        }

    }
    /**
     * To clear the  entered entity values for the types 'DR'.'D','AR','A','N','NR','S'
     */
    clearCriteriaTypes() {
        console.log(" clearCriteriaTypes***********");
        if (this.entityAmount1) {
            this.entityAmount1.value = "";
        }
        if (this.entityDate1) {
            this.entityDate1.value = "";
            this.entityDate1.atualValue = "";
        }
        if (this.entityDate2) {
            this.entityDate2.value = "";
            this.entityDate2.atualValue = "";
        }
        if (this.entityNum1) {
            this.entityNum1.value = "";
        }
        if (this.entityNum2) {
            this.entityNum2.value = "";
        }
        if (this.entityAmount2) {
            this.entityAmount2.value = "";
        }
        if (this.entityAmount3) {
            this.entityAmount3.value = "";
        }
        if (this.logic_params) {
            this.logic_params.value = "";
        }
        if (this.entityString) {
            this.entityString.value = "";
        }
        if (this.date_text1) {
            this.date_text1.value = "";
        }
        if (this.date_text2) {
            this.date_text2.value = "";
        }
        if (this.date_text3) {
            this.date_text3.value = "";
        }

    }

}


