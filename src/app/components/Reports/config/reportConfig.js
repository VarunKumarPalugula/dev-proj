System.register(["@angular/core", "app/base/base.component", "rxjs/Rx", "jqwidgets/angular_jqxlistbox", "app/common/checkbox/iCheckbox", "app/validators/iValidators"], function (exports_1, context_1) {
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
    var core_1, base_component_1, angular_jqxlistbox_1, iCheckbox_1, iValidators_1, ReportConfigComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (base_component_1_1) {
                base_component_1 = base_component_1_1;
            },
            function (_1) {
            },
            function (angular_jqxlistbox_1_1) {
                angular_jqxlistbox_1 = angular_jqxlistbox_1_1;
            },
            function (iCheckbox_1_1) {
                iCheckbox_1 = iCheckbox_1_1;
            },
            function (iValidators_1_1) {
                iValidators_1 = iValidators_1_1;
            }
        ],
        execute: function () {
            ReportConfigComponent = (function (_super) {
                __extends(ReportConfigComponent, _super);
                function ReportConfigComponent(renderer, elementRef) {
                    var _this = _super.call(this, renderer, elementRef) || this;
                    _this.entityColumnList = [];
                    _this.choiceList = [];
                    _this.entityList = [];
                    _this.itemsList = [];
                    _this.columnsList = [];
                    _this.colorList = [];
                    _this.colList = [];
                    _this.itemInfoList = [];
                    _this.columns = [];
                    _this.source = [];
                    _this.dataAvailable = false;
                    _this.listFlag = false;
                    _this.clickedIdx = -1;
                    _this.formList = [];
                    _this.ctxUrl = "";
                    _this.restServicePath = "";
                    _this.response = "";
                    _this.message = "";
                    _this.formValid = false;
                    _this.modalFlag = false;
                    _this.title = '';
                    _this.inputParams = '';
                    _this.isPrefDisabled = true;
                    _this.isFormValid = false;
                    _this.checkedItems = [];
                    _this.appDate = "";
                    _this.criteriaFieldType = "";
                    _this.criteriaFieldName = "";
                    _this.columnCheckedList = [];
                    //For ServiceAtributes
                    _this.privilages = {};
                    _this.attributesList = [];
                    _this.prefRows = 0;
                    _this.prefCols = 7;
                    _this.prefRowList = [];
                    _this.prefColList = [];
                    _this.privilagesType = [];
                    //For Dealers   
                    _this.grpSource = Array();
                    _this.dealerSource = Array();
                    _this.userSource = Array();
                    _this.reportPrivrilege = Array();
                    _this.getDealerInfo = Array();
                    //For selecton Criteria
                    _this.entityRows = 0;
                    _this.entityCols = 4;
                    _this.entityRowList = [];
                    _this.entityColList = [];
                    //For Graph Attributes
                    _this.graphPrivilagesType = [];
                    _this.graphAttributeList = [];
                    _this.graphRows = 0;
                    _this.graphCols = 4;
                    _this.graphRowList = [];
                    _this.graphColList = [];
                    _this.graphPrivilages = {};
                    _this.logicParamList = [{ "id": "=", "name": "equals to" }, { "id": "<", "name": "less than" }, { "id": ">", "name": " greater than" }, { "id": "<>", "name": "not equals to" },
                        { "id": "<=", "name": "less than or equal to" }, { "id": ">=", "name": "greater than or equal to" }];
                    _this.graphTypeList = [{ "id": "Bar", "name": "Bar" }, { "id": "Pie", "name": "Pie" }, { "id": "Line", "name": "Line" }];
                    _this.graphChoiceList = [];
                    _this.graphAxisList = [];
                    _this.fieldPreferences = [];
                    _this.selectedReportRowIdx = -1;
                    console.log("entityList***********************", _this.entityList);
                    _this.ctxUrl = _this.dataService.rootCtx + "services/reportservice/";
                    _this.restServicePath = _this.dataService.rootCtx + "services/report/";
                    return _this;
                }
                /**
                 * To load the Attributes, Dealer,user information
                 */
                ReportConfigComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log("blotter_Type in ReportConfigComponent : ", this.blotter_Type.choiceList);
                    setTimeout(function () {
                        console.log("****************ngOnInit ReportConfigComponent*******");
                        _this.appDate = _this.globalService.getApplnDate();
                        _this.setAttributes(null, null);
                    }, 500);
                    this.dataService.getData("dealerinfo", this.ctxUrl).subscribe(function (listItems) {
                        console.log("-- listItems  ", listItems);
                        _this.grpSource = listItems[0].DealerGroup;
                    });
                };
                /**
                 *  To check All dealers intial loading
                 */
                ReportConfigComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.groupListBox.checkAll();
                    }, 300);
                };
                /**
                 * To load the serviceatrributes, graph attributes while intial loading and
                 * while select the blotter, profile selection
                 * @param serviceObject
                 * @param graphObject
                 */
                ReportConfigComponent.prototype.setAttributes = function (serviceObject, graphObject) {
                    console.log("blotter_Type in setAttributes : ", Object.keys(this.privilages).length, "***latestObject*** ", serviceObject);
                    console.log("****** this.graphPrivilages***", Object.keys(this.graphPrivilages).length, "********graphObject******:", graphObject);
                    // For Service Attributes
                    if (Object.keys(this.privilages).length > 0 && serviceObject != null) {
                        for (var m = 0; m < this.attributesList.length; m++) {
                            var attribute = this.attributesList[m];
                            //  console.log( "attribute*****", attribute );
                            if (this.privilagesType[attribute].columntype == 'RBOOLEAN') {
                                //  console.log("serviceObject[attribute]",serviceObject[attribute],"attribute",attribute);
                                if (serviceObject[attribute]) {
                                    //  console.log("**********this.attrRBoolean.selectedEntry1**",this.attrRBoolean);
                                    this.attrRBoolean.selectedEntry = this.privilagesType[attribute].columnlist[0];
                                    //   console.log("**********this.attrRBoolean.selectedEntry33**",this.attrRBoolean.selectedEntry);
                                }
                            }
                            else {
                                this.privilages[attribute] = serviceObject[attribute];
                            }
                        }
                    }
                    else {
					console.log("this.blotter_Type.choiceList: ",this.blotter_Type.choiceList);
                        this.privilages = this.blotter_Type.choiceList[0].serviceAttributes;
                        this.privilagesType = this.blotter_Type.choiceList[0].serviceAttributeTypes;
                        this.attributesList = Object.keys(this.privilagesType);
                        if (this.attributesList && this.attributesList.length > 0) {
                            this.prefRows = Math.round(this.attributesList.length / this.prefCols);
                            console.log(this.prefRows);
                            this.prefRowList = Array(this.prefRows).fill(1);
                            console.log(this.prefRowList);
                            this.prefColList = [];
                            var startPoint = 0;
                            var endPoint = startPoint + this.prefCols;
                            console.log(endPoint);
                            console.log(" this.prefRows**", this.prefRows, "*** this.prefCols**", this.prefCols);
                            for (var j = 0; j < this.prefRows; j++) {
                                this.prefColList.push([]);
                                for (var k = startPoint; k < endPoint; k++) {
                                    this.prefColList[j].push(k);
									
                                     if( this.privilagesType[this.attributesList[k]] ){
                                    	 var  gridList = this.privilagesType[this.attributesList[k]];
                                    	 gridList.disabled = false;
                                         if ( gridList.columntype == 'RBOOLEAN' ) {
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
                            }
                            else {
                                this.privilagesType['aggregates'].disabled = false;
                            }
                            console.log("this.privilagesType[this.attributesList[k]]", this.privilagesType);
                        }
                    }
                    // for Graph Attributes
                    if (Object.keys(this.graphPrivilages).length > 0 && graphObject != null) {
                        for (var m = 0; m < this.graphAttributeList.length; m++) {
                            var attribute = this.graphAttributeList[m];
                            console.log("graphAttributeList*****", attribute);
                            if (graphObject[attribute] = null) {
                                this.graphPrivilages[attribute] = graphObject[attribute];
                                // console.log("graphAttributeList*****565", this.graphPrivilagesType[attribute]);
                                if (this.graphPrivilagesType[attribute].columntype == 'CLIST') {
                                    //  console.log("graphAttributeList*****99", graphObject[attribute]);
                                    this.graphCDD.setNames(graphObject[attribute]);
                                }
                            }
                        }
                    }
                    else {
                        this.graphPrivilagesType = this.blotter_Type.choiceList[0].graphAttributes;
                        this.graphAttributeList = Object.keys(this.graphPrivilagesType);
                        console.log("graphAttributeList**********", this.graphAttributeList);
                        if (this.graphAttributeList && this.graphAttributeList.length > 0) {
                            this.graphRows = Math.round(this.graphAttributeList.length / this.graphCols);
                            console.log(this.graphRows);
                            this.graphRowList = Array(this.graphRows).fill(1);
                            console.log(this.graphRowList);
                            this.graphColList = [];
                            var startPoint = 0;
                            var endPoint = startPoint + this.graphCols;
                            console.log(endPoint);
                            console.log(" this.graphRows**", this.graphRows, "*** this.graphCols**", this.graphCols);
                            for (var j = 0; j < this.graphRows; j++) {
                                this.graphColList.push([]);
                                for (var k = startPoint; k < endPoint; k++) {
                                    this.graphColList[j].push(k);
                                    this.graphChoiceList[k] = [];
                                    var graphAttributeType = this.graphPrivilagesType[this.graphAttributeList[k]];
                                    if (graphAttributeType) {
                                        if (graphAttributeType.columntype == 'BOOLEAN') {
                                            this.graphPrivilages[this.graphAttributeList[k]] = false;
                                        }
                                        else if (graphAttributeType.columntype == 'STRING') {
                                            this.graphPrivilages[this.graphAttributeList[k]] = "";
                                        }
                                        else if (graphAttributeType.columntype == 'CLIST' || graphAttributeType.columntype == 'LIST') {
                                            if (graphAttributeType.service == 'GRAPHTYPE') {
                                                this.graphChoiceList[k] = this.graphTypeList;
                                            }
                                            else {
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
                };
                /**
                 * TO load the entitys on select Report type
                 */
                ReportConfigComponent.prototype.loadCriteria = function () {
                    var _this = this;
                    this.itemsList = [];
                    this.columnsList = [];
                    this.globalService.progressMode = "indeterminate";
                    this.dataService.getData(this.blotterId + "/ENTITY", this.restServicePath).subscribe(function (listItems) {
                        _this.entityColumnList = listItems;
                        _this.columnsList = _this.entityColumnList[0];
                        _this.itemsList = _this.entityColumnList[1];
                        _this.columns = [];
                        console.log(" this.itemsList: ", _this.itemsList);
                        if (_this.itemsList && _this.itemsList.length > 0) {
                            for (var k = 0; k < _this.itemsList.length; k++) {
                                _this.itemsList[k].list = [];
                                _this.itemInfoList[k] = [];
                                if (_this.itemsList[k].list.length == 0 && _this.itemsList[k].criteriaType == 'SL') {
                                    _this.getEntityDetails(k);
                                }
                            }
                            _this.globalService.progressMode = "";
                        }
                        console.log("****************this.columnsList****  : ", _this.columnsList);
                        if(_this.columnsList && _this.columnsList.length > 0 ){
							_this.itemsList.push({
								"criteriaName": "Columns",
								"criteriaId": "COL",
								"criteriaViewName": "COLUMNS",
								"serviceId": "",
								"criteriaType": "SL",
								"criteriaOrder": 0,
								"criteriaServiceType": "",
								"criteriaItems": []
							});
							for (var m = 0; m < _this.columnsList.length; m++) {
								_this.columns.push(
								{ 'label': _this.columnsList[m].columnName 
								+ ' (' + _this.columnsList[m].criteriaOrder + ')', 
								'value': _this.columnsList[m].columnName }); 
								_this.graphAxisList.push({ 'id': _this.columnsList[m].columnId, 'name': _this.columnsList[m].columnName });
							}
						}
                        if (_this.itemsList && _this.itemsList.length > 0) {
							for (var k = 0; k < _this.itemsList.length; k++) {
								_this.checkedItems[k] = [];
								_this.colorList.push(0);
							}
                            _this.entityRows = Math.round(_this.itemsList.length / _this.entityCols);
                            console.log(_this.entityRows);
                            _this.entityRowList = Array(_this.entityRows).fill(1);
                            console.log(_this.entityRowList);
                            _this.entityColList = [];
                            var startPoint = 0;
                            var endPoint = startPoint + _this.entityCols;
                            console.log(endPoint);
                            console.log(" this.entityRows**", _this.entityRows, "*** this.entityCols**", _this.entityCols);
                            for (var j = 0; j < _this.entityRows; j++) {
                                _this.entityColList.push([]);
                                for (var m = startPoint; m < endPoint; m++) {
                                    _this.entityColList[j].push(m);
                                }
                                startPoint = endPoint;
                                endPoint = Number(startPoint) + Number(_this.entityCols);
                            }
                            console.log(" this.entityRows**", _this.entityRowList, "*** this.entityCols**", _this.entityColList);
                        }
                    });
                    this.dataService.getData("viewField/entity/" + this.blotterId, this.restServicePath).subscribe(function (listItems) {
                        //_this.fieldPreferences = listItems;
						
                        console.log(" this.fieldPreferences ***", listItems);
                        for (var k = 0; k < listItems[0].length; k++) {
                            console.log(" this.fieldPreferences 333***", listItems[0]);
                            if (listItems[0][k].display_name == "VIEW_FIELD_NAME") {
                                listItems[0][k].pinned = true;
                                listItems[0][k].editable = false;
                            }
                            else if (listItems[0][k].display_name == "FIELD_ID") {
                                listItems[0][k].hidden = true;
                            }
                        }
						_this.fieldPreferences = listItems;
						 console.log(" this.fieldPreferences ***123*********", _this.fieldPreferences);
                        _this.globalService.progressMode = "";
                    });
                    setTimeout(function () {
                        _this.globalService.progressMode = "";
                    }, 2500);
                };
                /**
                 * To load the entity stringList value 'SL'
                 */
                ReportConfigComponent.prototype.getEntityDetails = function (entityIndx) {
                    var _this = this;
                    var entityPath = _this.dataService.rootCtx + "services/data" + this.itemsList[entityIndx].criteriaService;
                    setTimeout(function () {
                        _this.dataService.getData("", entityPath).subscribe(function (listItems) {
                            console.log("Entity Details: ", listItems);
                            _this.entityList = listItems;
                            console.log(" this.itemsList: ", entityIndx, _this.itemsList);
                            _this.itemsList[entityIndx]['list'] = _this.entityList;
                            console.log(" this.itemsList[ this.tempIndx].list: ", _this.itemsList[entityIndx]);
                            for (var j = 0; j < _this.entityList.length; j++) {
                                _this.itemInfoList[entityIndx].push(_this.entityList[j].name);
                            }
                        });
                    }, 200);
                };
                /**
                * Check Field Errors, if any error then return
                */
                ReportConfigComponent.prototype.checkErrorValidation = function (form) {
                    console.log("Inside Error Validation check");
                    var errorStatus = false;
                    for (var fieldValue in form.getRawValue()) {
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
                };
                ReportConfigComponent.prototype.onSubmit = function (form, value) {
                    var _this = this;
                    var path = "";
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
                            for (var m = 0; m < this.columns.length; m++) {
                                for (var i = 0; i < this.columnsList.length; i++) {
                                    if (this.columns[m].value == this.columnsList[i].columnName) {
                                        this.colList.push(this.columnsList[i]);
                                        break;
                                    }
                                }
                            }
                        }
                        
                        for (var i = 0; i < this.itemsList.length - 1; i++) {
                            if (this.itemsList[i].criteriaType == 'SL') {
                                this.itemsList[i].criteriaItems = [];
                                if (this.checkedItems[i] == '(ALL)') {
                                    this.itemsList[i].criteriaItems = [];
                                }
                                else {
                                    for (var j = 0; j < this.itemsList[i].list.length; j++) {
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
                        this.dataService.submitForm(this.formList, path).subscribe(function (listItems) {
                            _this.globalService.progressMode = "";
                            _this.response = listItems;
                            _this.getResponse();
                        });
                        setTimeout(function () {
                            _this.globalService.progressMode = "";
                        }, 2500);
                    }
                };
                /* To ahow the responce in popup*/
                ReportConfigComponent.prototype.getResponse = function (form) {
                    console.log("Response**********", this.response);
                    var status = this.response.status;
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
                };
                ReportConfigComponent.prototype.deleteReport = function () {
                    var _this = this;
                    this.dataService.getData(this.profile_type.choiceList[this.selectedReportRowIdx].id, this.restServicePath + "delete/").subscribe(function (listItems) {
                        //  this.globalService.progressMode = "";
                        _this.response = listItems;
                        _this.getResponse();
                    });
                };
                /**
                 * To get the entitys , service and graph attributes on report chage.
                 * @param event
                 */
                ReportConfigComponent.prototype.blotterChange = function (event) {
                    console.log("************* blotterChange ************ ", event);
                    this.clearArray();
                    this.blotterId = event.value;
                    this.profile_type.value = '';
                    if (this.blotterId != "" && this.blotterId != "-1") {
                        this.loadCriteria();
                        this.listFlag = true;
                        this.isPrefDisabled = false;
                        this.setAttributes(this.blotter_Type.selectedItem.serviceAttributes, null); //this.blotter_Type.selectedItem.graphAttributes
                    }
					else{
						this.isPrefDisabled = true;
					}
                };
                /**
                 * To view the related report and profile details.
                 * @param event
                 */
                ReportConfigComponent.prototype.getEventDetails = function (event) {
                    var _this = this;
                    this.choiceList = [];
                    this.clearCriteriaTypes();
                    console.log("************* getEventDetails ************ ", event);
                    this.setAttributes(event.selectedObj[4], event.selectedObj[5]);
                    this.selectedReportRowIdx = event.rowIndex;
                    this.profile_type.value = event.selectedObj[1];
                    this.dataService.getData(this.blotterId + "/" + event.selectedObj[0], this.restServicePath + "view/").subscribe(function (listItems) {
                      
                        _this.choiceList = listItems;
                        _this.groupListBox.uncheckAll();
                        if (_this.choiceList && _this.choiceList[3].length > 0) {
                            _this.getDealerInfo = _this.choiceList[3];
                            _this.getReportPrivrilege('groupListBox', 'dlrGrpId');
                        }
                        if (_this.choiceList[0].length > 0) {
                            var found = false;
                            for (var k = 0; k < _this.columnsList.length; k++) {
                                found = false;
                                for (var l = 0; l < _this.choiceList[0].length; l++) {
                                    if (_this.columnsList[k].columnName == _this.choiceList[0][l].columnName) {
                                        if (_this.choiceList[0][l].selected == true) {
                                            _this.columnCheckedList.push(_this.choiceList[0][l].columnName);
                                        }
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found) {
                                    _this.choiceList[0].push(_this.columnsList[k]);
                                }
                            }
                            _this.columnsList = _this.choiceList[0];
                            _this.columns = [];
                            for (var m = 0; m < _this.columnsList.length; m++) {
                                _this.columns.push({ 'label': _this.columnsList[m].columnName + ' (' + _this.columnsList[m].criteriaOrder + ')', 'value': _this.columnsList[m].columnName });
                            }
                            console.log("this. this.columns **********", _this.columns);
                        }
                        if (_this.choiceList[1].length > 0) {
                            for (var i = 0; i < _this.choiceList[1].length; i++) {
                                for (var j = 0; j < _this.itemsList.length - 1; j++) {
                                    console.log("this.choiceL this.itemsList[j]ist 23**********", _this.itemsList);
                                    if (_this.choiceList[1][i].criteriaName == _this.itemsList[j].criteriaViewName) {
                                        console.log("this.choiceL this.itemsList[j]ist56 **********", _this.itemsList);
                                        var name_1 = _this.choiceList[1][i].criteriaName;
                                        _this.itemsList[j].criteriaItems = [];
                                        _this.itemsList[j].criteriaOrder = _this.choiceList[1][i].criteriaOrder;
                                        _this.itemsList[j].criteriaItems = _this.choiceList[2][name_1];
                                        if (_this.itemsList[j].criteriaType == 'SL') {
                                            for (var m = 0; m < _this.itemsList[j].list.length; m++) {
                                                _this.itemsList[j].list[m].selected = false;
                                                for (var n = 0; n < _this.itemsList[j].criteriaItems.length; n++) {
                                                    if ((_this.itemsList[j].criteriaItems[n]) == (_this.itemsList[j].list[m].name)) {
                                                        _this.itemsList[j].list[m].selected = true;
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                            console.log("this.choiceL this.itemsList[j]ist **********", _this.itemsList);
                        }
                        _this.entityClick(_this.itemsList[_this.clickedIdx], _this.clickedIdx);
                        _this.globalService.progressMode = "";
                    });
                    this.dataService.getData("viewField/report/" + event.value, this.restServicePath).subscribe(function (listItems) {
					   for( var k = 0; k < listItems[0].length; k++){
                        	console.log(" this.fieldPreferences 555***", listItems[0]);
							if(listItems[0][k].display_name == "VIEW_FIELD_NAME"){
								listItems[0][k].pinned = true;
								listItems[0][k].editable = false;
							}else if(listItems[0][k].display_name == "FIELD_ID"){
								listItems[0][k].hidden = false;
							}
                        }
						 _this.globalService.progressMode = "";
						_this.fieldPreferences = listItems;
                        _this.fieldPref.gridDataList = _this.fieldPreferences ;
                        console.log("listItems getEventDetails:", _this.fieldPreferences );
                    });
                    setTimeout(function () {
                        _this.globalService.progressMode = "";
                    }, 2500);
                };
                /**
                 * To list out the check/uncheck values related to the type 'SL'.
                 * @param event
                 */
                ReportConfigComponent.prototype.checkChange = function (event) {
                    var _this = this;
                 //   console.log("event***********", event);
                    var listLength = 0;
                    if (this.itemsList[this.clickedIdx].criteriaViewName == 'COLUMNS') {
                      //  console.log("Columns............");
                        listLength = this.columnsList.length;
                        for (var i = 0; i < this.columnsList.length; i++) {
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
                      //  console.log("this.columnCheckedList***********", this.columnCheckedList);
                    }
                    else {
                      //  console.log("Entities............");
                        listLength = this.itemsList[this.clickedIdx].list.length;
                        for (var i = 0; i < this.itemsList[this.clickedIdx].list.length; i++) {
                            if (event.args.value == this.itemsList[this.clickedIdx].list[i].name) {
								var selectItems = this.itemsList[this.clickedIdx].criteriaItems;
								var ax = -1;
                                if (event.args.checked) {
                                    this.itemsList[this.clickedIdx].list[i].selected = true;
									selectItems.push(this.itemsList[this.clickedIdx].list[i].name);
                                //    console.log("event", this.itemsList[this.clickedIdx].list[i].selected);
                                }
                                else {
                                //    console.log("event", this.itemsList[this.clickedIdx].list[i].selected);
                                    this.itemsList[this.clickedIdx].list[i].selected = false;
									//this.itemsList[this.clickedIdx].criteriaItems.remove(this.itemsList[this.clickedIdx].list[i].name);
									 while ((  ax = selectItems.indexOf(this.itemsList[this.clickedIdx].list[i].name)) !== -1) {
											selectItems.splice(ax, 1);
									}
                                }
                            }
                        }
                       
                    }
					 setTimeout(function () {
                            _this.getSelectedList(listLength);
                        }, 100);
                };
                /**
                 * The selected entity values to  get reflected on click button. On click to show entity related values.
                 * @param entity
                 * @param idx
                 */
                ReportConfigComponent.prototype.entityClick = function (entity, idx) {
                    var _this = this;
                    console.log("entity click1234: ", entity);
                    if (entity) {
                        this.clickedIdx = idx;
                        var listLength_1 = 0;
                        this.clearCriteriaTypes();
                        this.criteriaFieldType = entity.criteriaType;
                        this.criteriaFieldName = entity.criteriaName;
                        var listItems_1 = this.itemsList[idx];
						this.colorList[idx] = 1;
                        if (entity.criteriaType == 'SL') {
                                                        
                            if (entity.criteriaViewName == 'COLUMNS') {
								listLength_1 = _this.columnsList.length;
									_this.source = _this.columns;
								 setTimeout(function () {
									
									 if (_this.dataList)
										_this.dataList.refresh();
								
									_this.entityAll['checkValue'] = false;
									
									console.log("_this.columnCheckedList***",_this.columnCheckedList);
									if(_this.columnCheckedList.length  == 0){
										console.log("**************entityAll***",_this.entityAll['checkValue']);
										_this.entityAll['checkValue'] = true;
										console.log("**************entityAll***2222",_this.entityAll['checkValue']);
										_this.dataList.checkAll();
									}else{
										_this.columnClick();
									}
								  
									_this.getSelectedList(listLength_1);
								 },150);
                              //  return;
                            }
                            else {
                                console.log("entity click: ", this.itemInfoList[idx]);
                                listLength_1 = this.itemsList[idx].list.length;
                                this.source = this.itemInfoList[idx];
                                setTimeout(function () {
									_this.entityAll['checkValue'] = false;
                                    console.log("this.itemsList[idx] entityClick", _this.itemsList[idx]);
                                    if (_this.dataList)
                                        _this.dataList.refresh();
										console.log("_this.itemsList[idx].criteriaItems***:",_this.itemsList[idx].criteriaItems);
									if( _this.itemsList[idx].criteriaItems.length == 0 ){
										_this.entityAll['checkValue'] = true;
										_this.dataList.checkAll();
										
									}else{
										for (var i = 0; i < _this.itemsList[idx].list.length; i++) {
											if (_this.itemsList[idx].list[i].selected == true && _this.dataList) {
												//console.log("this.dataList", _this.dataList);
												_this.dataList.checkIndex(i);
												
											}
										}
									}
									_this.getSelectedList(listLength_1);
                                }, 100);
                            }
                        }
                        else if (this.criteriaFieldType == 'S') {
                            setTimeout(function () {
                                if (listItems_1.criteriaItems.length > 0)
                                    _this.entityString.value = listItems_1.criteriaItems[0];
                                _this.getSelectedList(listLength_1);
                            }, 100);
                        }
                        else if (this.criteriaFieldType == 'A') {
                            setTimeout(function () {
                                if (listItems_1.criteriaItems.length > 0) {
                                    console.log("listItems.criteriaItems**", listItems_1.criteriaItems);
                                    var items = listItems_1.criteriaItems[0].split(" ");
                                    console.log("items**", items);
                                    _this.entityAmount1.value = iValidators_1.Validators.amountValidation(items[1]);
                                    _this.logic_params.value = items[0];
                                }
                                _this.getSelectedList(listLength_1);
                            }, 100);
                        }
                        else if (this.criteriaFieldType == 'AR') {
                            setTimeout(function () {
                                if (listItems_1.criteriaItems.length > 0) {
                                    var item1 = listItems_1.criteriaItems[0].split(" ");
                                    _this.entityAmount1.value = iValidators_1.Validators.amountValidation(item1[1]);
                                    var item2 = listItems_1.criteriaItems[1].split(" ");
                                    _this.entityAmount2.value = iValidators_1.Validators.amountValidation(item2[1]);
                                }
                                _this.getSelectedList(listLength_1);
                            }, 100);
                        }
                        else if (this.criteriaFieldType == 'N') {
                            setTimeout(function () {
                                if (listItems_1.criteriaItems.length > 0) {
                                    console.log("listItems.criteriaItems**", listItems_1.criteriaItems);
                                    var items = listItems_1.criteriaItems[0].split(" ");
                                    console.log("items**", items);
                                    _this.entityNum1.value = items[1];
                                    _this.logic_params.value = items[0];
                                }
                                _this.getSelectedList(listLength_1);
                            }, 100);
                        }
                        else if (this.criteriaFieldType == 'NR') {
                            setTimeout(function () {
                                if (listItems_1.criteriaItems.length > 0) {
                                    var item1 = listItems_1.criteriaItems[0].split(" ");
                                    _this.entityNum1.value = item1[1];
                                    var item2 = listItems_1.criteriaItems[1].split(" ");
                                    _this.entityNum2.value = item2[1];
                                }
                                _this.getSelectedList(listLength_1);
                            }, 100);
                        }
                        else if (this.criteriaFieldType == 'D') {
                            setTimeout(function () {
                                if (listItems_1.criteriaItems.length > 0) {
                                    console.log("listItems.criteriaItems**", listItems_1.criteriaItems);
                                    var list = listItems_1.criteriaItems[0];
                                    if (list.includes('|')) {
                                        var str = list.split("|");
                                        _this.logic_params.value = str[0];
                                        _this.date_text1.value = str[1] + str[2];
                                        _this.entityDate1.dateValidation(str[1] + str[2]);
                                    }
                                    else {
                                        var items = list.split("'");
                                        console.log("items**", items);
                                        _this.logic_params.value = items[0];
                                        _this.date_text1.value = items[1];
                                        _this.entityDate1.dateValidation(items[1]);
                                    }
                                }
                                _this.getSelectedList(listLength_1);
                            }, 100);
                        }
                        else if (this.criteriaFieldType == 'DR') {
                            console.log("entity.criteriaType ************:", this.criteriaFieldType);
                            console.log("entity.criteriaType ************:", listItems_1.criteriaItems);
                            setTimeout(function () {
                                if (listItems_1.criteriaItems.length > 0) {
                                    var list1 = listItems_1.criteriaItems[0];
                                    var list2 = listItems_1.criteriaItems[1];
                                    if (list2.includes('|')) {
                                        var str = list2.split("|");
                                        // this.logic_params.value = str[0];
                                        _this.date_text3.value = str[1] + str[2];
                                        _this.entityDate3.dateValidation(str[1] + str[2]);
                                    }
                                    else {
                                        var items = list2.split("'");
                                        console.log("items**", items);
                                        _this.date_text3.value = items[1];
                                        _this.entityDate3.dateValidation(items[1]);
                                        // this.logic_params.value = items[0];
                                    }
                                    if (list1.includes('|')) {
                                        var str = list1.split("|");
                                        //this.logic_params.value = str[0];
                                        _this.date_text2.value = str[1] + str[2];
                                        _this.entityDate2.dateValidation(str[1] + str[2]);
                                    }
                                    else {
                                        var items = list1.split("'");
                                        console.log("items**", items);
                                        _this.date_text2.value = items[1];
                                        _this.entityDate2.dateValidation(items[1]);
                                        // this.logic_params.value = items[0];
                                    }
                                }
                                _this.getSelectedList(listLength_1);
                            }, 100);
                        }
                        
                    }
                };
                /**
                 * To get the entity column values
                 */
                ReportConfigComponent.prototype.columnClick = function () {
                    var _this = this;
                    console.log("*************** column Click*******");
                 //   var timeoutId = setTimeout(function () {
                      //  console.log("  ************this.columnsList columnClick: ", _this.columnsList);
                        console.log("this.dataList.getCheckedItems()", _this.dataList);
                        if (_this.dataList)
                            _this.dataList.refresh();
                        for (var i = 0; i < _this.columnsList.length; i++) {
                            if (_this.columnsList[i].selected == true && _this.dataList) {
                                _this.dataList.checkIndex(i);
                            }
                        }
                        _this.columnCheckedList = _this.dataList.getCheckedItems();
                 //   }, 100);
                };
                /**
                 * To get the entity values of date from the textfield for 'D','DR'.
                 * @param event
                 * @param entityName
                 */
                ReportConfigComponent.prototype.getEntityDate = function (event, entityName) {
                    console.log("getEntityDate*********", event);
                    if (entityName == 'date_text1') {
                        this.entityDate1.value = event.value;
                    }
                    else if (entityName == 'date_text2') {
                        this.entityDate2.value = event.value;
                    }
                    else {
                        this.entityDate3.value = event.value;
                    }
                };
                /**
                 * To assign the entered selected entity values to the list  for 'DR','D','A','AR','N','NR','S'
                 * @param event
                 * @param entityName
                 */
                ReportConfigComponent.prototype.getTypeEntityValues = function (event, entityName) {
                    console.log("getTypeEntityValues*********", event);
                    var listItems = this.itemsList[this.clickedIdx];
                    if (this.criteriaFieldType == 'DR') {
                        var atualValue = event.atualValue;
                        var len = atualValue.length;
                        if (entityName == 'entityDate3') {
                            console.log("date_text3:", this.date_text3.value, "atualValue:", atualValue, "*********");
                            if (atualValue != "") {
                                listItems.criteriaItems[1] = "<|" + atualValue.substring(0, len - 1) + "|" + atualValue.charAt(len - 1);
                            }
                            else {
                                this.date_text3.value = event.value;
                                this.entityDate3.atualValue = "";
                                listItems.criteriaItems[1] = "<'" + event.value + "'";
                            }
                        }
                        else {
                            console.log("date_text2:", this.date_text2.value, "atualValue:", atualValue, "***********");
                            if (atualValue != "") {
                                listItems.criteriaItems[0] = ">|" + atualValue.substring(0, len - 1) + "|" + atualValue.charAt(len - 1);
                            }
                            else {
                                this.date_text2.value = event.value;
                                this.entityDate2.atualValue = "";
                                listItems.criteriaItems[0] = ">'" + event.value + "'";
                            }
                        }
                    }
                    else if (this.criteriaFieldType == 'NR') {
                        if (entityName == 'entityNum1') {
                            listItems.criteriaItems[0] = ">" + event.value;
                        }
                        else {
                            listItems.criteriaItems[1] = "<" + event.value;
                        }
                    }
                    else if (this.criteriaFieldType == 'AR') {
                        if (entityName == 'entityAmount1') {
                            listItems.criteriaItems[0] = "> " + iValidators_1.Validators.indexCommaRemove(event.value);
                        }
                        else {
                            listItems.criteriaItems[1] = "< " + iValidators_1.Validators.indexCommaRemove(event.value);
                        }
                    }
                    else if (this.criteriaFieldType == 'D') {
                        listItems.criteriaItems = [];
                        listItems.param = "";
                        console.log("date_text1:", this.date_text1.value, "atualValue:", event.atualValue, "**********");
                        if (this.logic_params.value) {
                            listItems.param = this.logic_params.value;
                        }
                        if (event.atualValue != "") {
                            var atualValue = event.atualValue;
                            var len = atualValue.length;
                            listItems.criteriaItems[0] = listItems.param + "|" + atualValue.substring(0, len - 1) + "|" + atualValue.charAt(len - 1);
                        }
                        else {
                            this.date_text1.value = event.value;
                            this.entityDate1.atualValue = "";
                            listItems.criteriaItems[0] = listItems.param + "'" + event.value + "'";
                        }
                    }
                    else if (this.criteriaFieldType == 'N' || this.criteriaFieldType == 'A') {
                        listItems.criteriaItems = [];
                        listItems.param = "";
                        if (this.logic_params.value) {
                            listItems.param = this.logic_params.value;
                        }
                        if (this.criteriaFieldType == 'A')
                            listItems.criteriaItems.push(listItems.param + " " + iValidators_1.Validators.indexCommaRemove(event.value));
                        else
                            listItems.criteriaItems.push(listItems.param + " " + event.value);
                    }
                    else {
                        listItems.criteriaItems = [];
                        listItems.criteriaItems.push(event.value);
                    }
                    this.getSelectedList(0);
                    console.log("getTypeEntityValues****this.itemsList[this.clickedIdx]*****", this.itemsList[this.clickedIdx]);
                };
                /**
                 * While drag& drop the values to store the order of the list.
                 * @param event
                 */
                ReportConfigComponent.prototype.getDataOnDragEnd = function (event) {
                    console.log("************ this.items******", this.dataList.getItems());
                    var reOrderedList = this.dataList.getItems();
                    this.columns = [];
                    for (var m = 0; m < reOrderedList.length; m++) {
                        this.columns.push({ 'label': reOrderedList[m].label, 'value': reOrderedList[m].value });
                    }
                    console.log("************ this.items*2222*****", this.columns);
                };
                /**
                 * To show the seleed/entered/ checked entity  related values in selection criteria using checkedItems
                 * @param listLength
                 */
                ReportConfigComponent.prototype.getSelectedList = function (listLength) {
                 //   console.log("getSelectedList  this.dataList ****", this.dataList);
                  //  if (this.itemsList[this.clickedIdx].criteriaViewName != 'COLUMN') {
                        this.checkedItems[this.clickedIdx] = "";
                        if (this.criteriaFieldType == 'SL') {
                            var items = this.dataList.getCheckedItems();
                           
                            if (items.length > 0) {
                                var chkLength = items.length;
                             //   console.log("this.dataList.listLength44()****", chkLength);
                                // checked and unchecked the all checkbox
                                if (listLength == chkLength) {
                                    this.entityAll['checkValue'] = true;
                                    this.checkedItems[this.clickedIdx] += '  (ALL)';
                                }
                                else {
                                    this.entityAll['checkValue'] = false;
									if(this.itemsList[this.clickedIdx].criteriaViewName != 'COLUMN'){
										this.checkedItems[this.clickedIdx] += "  [";
										for (var i = 0; i < items.length; i++) {
											if (i < items.length - 1) {
											//	console.log("items[i].label.getCheckedItems()****", items[i].label);
												this.checkedItems[this.clickedIdx] += "'" + items[i].label + "', ";
											}
											else
												this.checkedItems[this.clickedIdx] += "'" + items[i].label + "']";
										}
									}
                                }
                            }
                        }
                        else {
                            console.log("this.checkedItems[this.clickedIdx]**", this.itemsList[this.clickedIdx].criteriaItems);
                            this.checkedItems[this.clickedIdx] += this.itemsList[this.clickedIdx].criteriaItems;
                        }
                     //   console.log("this.dataList.checkedItems()****", this.checkedItems);
                   // }
                };
                /**
                 * While check All to check all the  values for the entity's
                 * @param chkValue
                 */
                ReportConfigComponent.prototype.checkAll = function (chkValue) {
                    console.log("checkAll*************", chkValue);
                    this.checkedItems[this.clickedIdx] = "";
                    if (chkValue) {
					console.log(this.dataList,"this.checkedItems[this.clickedIdx] chkValue",chkValue);
					
                        this.dataList.checkAll();
                    }
                    else {
					console.log("this.checkedItems[this.clickedIdx] chkValue else",chkValue);
                        this.dataList.uncheckAll();
                    }
                };
                /**
                 * To assign the changed values of the gridAttributes  to the service privilages list.
                 * @param event
                 * @param serviceObject
                 * @param attrName
                 */
                ReportConfigComponent.prototype.getGridPriferences = function (event, serviceObject, attrName) {
                    console.log(" attributes***********", serviceObject, "**event**  ", event, "******attrName**", attrName);
                    if (serviceObject.columntype == 'STRING') {
                        this.privilages[attrName] = event.value;
                    }
                    else if (serviceObject.columntype == 'BOOLEAN') {
                        this.privilages[attrName] = event;
                    }else if (serviceObject.columntype == 'RBOOLEAN') {
                        this.privilages[attrName] = true;
                    }
                    console.log(" privilages****656*******", this.privilages);
                };
                /**
                 * To assign the changed values of the graphAttributes  to the service graphPrivilages list.
                 * @param event
                 * @param graphObject
                 * @param graphName
                 */
                ReportConfigComponent.prototype.getGraphPriferences = function (event, graphObject, graphName) {
                    console.log(" graphObject***********", graphObject, "**event**  ", event, "**graphName**", graphName);
                    if (graphObject.columntype == 'BOOLEAN') {
                        this.graphPrivilages[graphName] = event;
                    }
                    else {
                        this.graphPrivilages[graphName] = event.value;
                    }
                    console.log(" graphPrivilages****656*******", this.graphPrivilages);
                };
                /**
                 * On check/uncheck the dealer group to show the dealers
                 * @param event
                 */
                ReportConfigComponent.prototype.OnGroupChange = function (event) {
                    var _this = this;
                    var selectedGrp = this.groupListBox.getCheckedItems();
                    var chkValue = event.args.value;
                    var chkFlag = event.args.checked;
                    this.dealerSource.splice(0);
                    var chkGroup = selectedGrp.filter(function (x) {
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
                    for (var j = 0; j < selectedGrp.length; j++) {
                        for (var i = 0; i < this.grpSource.length; i++) {
                            if (this.grpSource[i].id == selectedGrp[j].value) {
                                if (this.grpSource[i]['dealerInfo']) {
                                    this.dealerSource = this.dealerSource.concat(this.grpSource[i]['dealerInfo']);
                                }
                                break;
                            }
                        }
                    }
                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'id' },
                            { name: 'name' }
                        ],
                        localdata: this.dealerSource
                    };
                    this.dealerAdapter = new jqx.dataAdapter(source); // create data adapter.
                    source.localdata = this.dealerSource; //update the localdata
                    this.dealerAdapter.dataBind(); // perform Data Binding
                    var timeoutId = setTimeout(function () {
                        if (_this.getDealerInfo && _this.getDealerInfo.length == 0)
                            _this.dealerListBox.checkAll();
                        else
                            _this.getReportPrivrilege('dealerListBox', 'dealerId');
                    }, 100);
                };
                /**
                 *  On check/uncheck the dealers to show the users respectively
                 * @param event
                 */
                ReportConfigComponent.prototype.OnDealerChange = function (event) {
                    var _this = this;
                    var selectedDealer = this.dealerListBox.getCheckedItems();
                    var chkValue = event.args.value;
                    var chkFlag = event.args.checked;
                    this.userSource.splice(0);
                    // check 
                    var chkDealer = selectedDealer.filter(function (x) {
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
                    for (var j = 0; j < selectedDealer.length; j++) {
                        for (var i = 0; i < this.dealerSource.length; i++) {
                            if (this.dealerSource[i]['id'] == selectedDealer[j].value) {
                                if (this.dealerSource[i]['userInfo']) {
                                    this.userSource = this.userSource.concat(this.dealerSource[i]['userInfo']);
                                }
                                break;
                            }
                        }
                    }
                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'id' },
                            { name: 'name' }
                        ],
                        localdata: this.userSource
                    };
                    this.userAdapter = new jqx.dataAdapter(source);
                    source.localdata = this.userSource;
                    this.userAdapter.dataBind();
                    setTimeout(function () {
                        if (_this.getDealerInfo && _this.getDealerInfo.length == 0)
                            _this.userListBox.checkAll();
                        else
                            _this.getReportPrivrilege('userListBox', 'userId');
                    }, 100);
                };
                /**
                 * On userchange set the object like dealerGroup,dealer,user hirarchy with selected values.
                 * @param event
                 */
                ReportConfigComponent.prototype.OnUserChange = function (event) {
                    var selectedUser = this.userListBox.getCheckedItems();
                    var chkValue = event.args.value;
                    var chkFlag = event.args.checked;
                    this.reportPrivrilege.splice(0);
                    var chkUser = selectedUser.filter(function (x) {
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
                    var indx = 0;
                    var flag = true;
                    for (var i = 0; i < selectedUser.length; i++) {
                        flag = true;
                        for (var j = 0; j < this.grpSource.length && flag; j++) {
                            for (var k = 0; k < this.grpSource[j]['dealerInfo'].length && flag; k++) {
                                for (var l = 0; l < this.grpSource[j]['dealerInfo'][k]['userInfo'].length; l++) {
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
                };
                ReportConfigComponent.prototype.onDealerGrpClick = function (event) {
                    this.getDealerInfo = [];
                    if (event) {
                        this.groupListBox.checkAll();
                    }
                    else {
                        this.groupListBox.uncheckAll();
                        this.dealerAll.checkValue = false;
                        this.userAll.checkValue = false;
                    }
                };
                ReportConfigComponent.prototype.onDealerClick = function (event) {
                    this.getDealerInfo = [];
                    if (event) {
                        this.dealerListBox.checkAll();
                    }
                    else {
                        this.dealerListBox.uncheckAll();
                        this.userAll.checkValue = false;
                    }
                };
                ReportConfigComponent.prototype.onUserClick = function (event) {
                    this.getDealerInfo = [];
                    if (event) {
                        this.userListBox.checkAll();
                    }
                    else {
                        this.userListBox.uncheckAll();
                    }
                };
                ReportConfigComponent.prototype.getReportPrivrilege = function (listbox, id) {
                    for (var i = 0; i < this.getDealerInfo.length; i++) {
                        this[listbox].checkItem(this.getDealerInfo[i][id]);
                    }
                };
                /**
                 * This method is use to close the pop up window
                 */
                ReportConfigComponent.prototype.close = function () {
                    this.modalFlag = false;
                    this.formValid = false;
                };
                ReportConfigComponent.prototype.clear = function (form) {
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
                        for (var fieldValue in form.getRawValue()) {
                            if (this[fieldValue] != undefined) {
                                if (this[fieldValue].errorMessage != "") {
                                    this[fieldValue].isValidationError = false;
                                    this[fieldValue].errorMessage = "";
                                    //console.log("clear^^^^^^^^^^ fieldValue", this[fieldValue]);
                                }
                            }
                        }
                    }
                };
                ReportConfigComponent.prototype.clearArray = function () {
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
                    for (var m = 0; m < this.attributesList.length; m++) {
                        var attribute = this.attributesList[m];
                        console.log("attribute*****", attribute);
                        if (this.privilagesType[attribute].columntype == 'BOOLEAN') {
                            this.privilages[attribute] = false;
                        }
                        else if (this.privilagesType[attribute].columntype == 'STRING') {
                            this.privilages[attribute] = "";
                        }else if (this.privilagesType[attribute].columntype == 'RBOOLEAN') {
                             this.attrRBoolean.selectedEntry = {};
                        }
                    }
                    for (var l = 0; l < this.graphAttributeList.length; l++) {
                        var graphAttribute = this.graphAttributeList[l];
                        console.log("graphAttribute*****", graphAttribute);
                        if (this.graphPrivilagesType[graphAttribute].columntype == 'BOOLEAN') {
                            this.graphPrivilages[graphAttribute] = false;
                        }
                        else if (this.graphPrivilagesType[graphAttribute].columntype == 'STRING') {
                            this.graphPrivilages[graphAttribute] = "";
                        }
                        else if (this.graphPrivilagesType[graphAttribute].columntype == 'CLIST' || this.graphPrivilagesType[graphAttribute].columntype == 'LIST') {
                            this.graphPrivilages[graphAttribute] = -1;
			    this.graphCDD.selectedOptions = "";
                        }
                    }
                };
                /**
                 * To clear the  entered entity values for the types 'DR'.'D','AR','A','N','NR','S'
                 */
                ReportConfigComponent.prototype.clearCriteriaTypes = function () {
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
                };
                __decorate([
                    core_1.ViewChild('dataList'),
                    __metadata("design:type", typeof (_a = typeof angular_jqxlistbox_1.jqxListBoxComponent !== "undefined" && angular_jqxlistbox_1.jqxListBoxComponent) === "function" && _a || Object)
                ], ReportConfigComponent.prototype, "dataList", void 0);
                __decorate([
                    core_1.ViewChild('groupListBox'),
                    __metadata("design:type", typeof (_b = typeof angular_jqxlistbox_1.jqxListBoxComponent !== "undefined" && angular_jqxlistbox_1.jqxListBoxComponent) === "function" && _b || Object)
                ], ReportConfigComponent.prototype, "groupListBox", void 0);
                __decorate([
                    core_1.ViewChild('dealerListBox'),
                    __metadata("design:type", typeof (_c = typeof angular_jqxlistbox_1.jqxListBoxComponent !== "undefined" && angular_jqxlistbox_1.jqxListBoxComponent) === "function" && _c || Object)
                ], ReportConfigComponent.prototype, "dealerListBox", void 0);
                __decorate([
                    core_1.ViewChild('userListBox'),
                    __metadata("design:type", typeof (_d = typeof angular_jqxlistbox_1.jqxListBoxComponent !== "undefined" && angular_jqxlistbox_1.jqxListBoxComponent) === "function" && _d || Object)
                ], ReportConfigComponent.prototype, "userListBox", void 0);
                __decorate([
                    core_1.ViewChild('blotter_Type'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "blotter_Type", void 0);
                __decorate([
                    core_1.ViewChild('profile_type'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "profile_type", void 0);
                __decorate([
                    core_1.ViewChild('entityAll'),
                    __metadata("design:type", typeof (_e = typeof iCheckbox_1.CheckboxComponent !== "undefined" && iCheckbox_1.CheckboxComponent) === "function" && _e || Object)
                ], ReportConfigComponent.prototype, "entityAll", void 0);
                __decorate([
                    core_1.ViewChild('dealerGrpAll'),
                    __metadata("design:type", typeof (_f = typeof iCheckbox_1.CheckboxComponent !== "undefined" && iCheckbox_1.CheckboxComponent) === "function" && _f || Object)
                ], ReportConfigComponent.prototype, "dealerGrpAll", void 0);
                __decorate([
                    core_1.ViewChild('dealerAll'),
                    __metadata("design:type", typeof (_g = typeof iCheckbox_1.CheckboxComponent !== "undefined" && iCheckbox_1.CheckboxComponent) === "function" && _g || Object)
                ], ReportConfigComponent.prototype, "dealerAll", void 0);
                __decorate([
                    core_1.ViewChild('userAll'),
                    __metadata("design:type", typeof (_h = typeof iCheckbox_1.CheckboxComponent !== "undefined" && iCheckbox_1.CheckboxComponent) === "function" && _h || Object)
                ], ReportConfigComponent.prototype, "userAll", void 0);
                __decorate([
                    core_1.ViewChild('entityAmount1'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityAmount1", void 0);
                __decorate([
                    core_1.ViewChild('entityAmount2'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityAmount2", void 0);
                __decorate([
                    core_1.ViewChild('entityNum1'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityNum1", void 0);
                __decorate([
                    core_1.ViewChild('entityNum2'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityNum2", void 0);
                __decorate([
                    core_1.ViewChild('entityDate1'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityDate1", void 0);
                __decorate([
                    core_1.ViewChild('entityDate2'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityDate2", void 0);
                __decorate([
                    core_1.ViewChild('entityDate3'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityDate3", void 0);
                __decorate([
                    core_1.ViewChild('logic_params'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "logic_params", void 0);
                __decorate([
                    core_1.ViewChild('entityString'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "entityString", void 0);
                __decorate([
                    core_1.ViewChild('date_text1'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "date_text1", void 0);
                __decorate([
                    core_1.ViewChild('date_text2'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "date_text2", void 0);
                __decorate([
                    core_1.ViewChild('date_text3'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "date_text3", void 0);
               __decorate([
                    core_1.ViewChild('fieldPref'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "fieldPref", void 0);
		__decorate([
                    core_1.ViewChild('graphCDD'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "graphCDD", void 0);
                __decorate([
                    core_1.ViewChild('attrRBoolean'),
                    __metadata("design:type", Object)
                ], ReportConfigComponent.prototype, "attrRBoolean", void 0);
                ReportConfigComponent = __decorate([
                    core_1.Component({
                        selector: 'reportConfig',
                        moduleId: __moduleName,
                        templateUrl: 'reportConfig.html',
                        inputs: ['blotterList'],
                        styleUrls: ['reportConfig.css']
                        //inputs:['module','office','blotter']
                    }),
                    __metadata("design:paramtypes", [core_1.Renderer2, core_1.ElementRef])
                ], ReportConfigComponent);
                return ReportConfigComponent;
                var _a, _b, _c, _d, _e, _f, _g, _h;
            }(base_component_1.BaseComponent));
            exports_1("ReportConfigComponent", ReportConfigComponent);
        }
    };
});
//# sourceMappingURL=reportConfig.js.map