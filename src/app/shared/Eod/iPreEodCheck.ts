import { Component, Input, Output, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FieldComponent } from '../../base/iField';
import { DataService } from 'src/app/services/data.service';
import { EntitlementService } from 'src/app/services/entitlement.service';
import { GlobalService } from 'src/app/services/global.service';

// declare let __mauleName : string;

@Component({
	//  moduleId: __moduleName,
	selector: 'ipreEodCheck',
	templateUrl: 'iPreEodCheck.html',
	styleUrls: ['iPreEodCheck.css']
})

export class PreEodCheckComponent extends FieldComponent implements OnInit {

	public eodArray: any = [];
	public eodCheckArray: any = [];
	public eodMesgArray: any = [];
	public filterColVal: any = [];
	public popupMessage: any = [];
	public response: any = [];
	public message: any = "";
	public itemIndex: number = -1;

	public isMaxShow: boolean = false;
	public isMessageShow: boolean = false;
	public authFlag: boolean = false;
	public modalFlag: boolean = false;

	public moduleList: any = [];
	public officeTypeList: any = [];
	public CategoryGroupList: any = [];
	public MesssageTypeList: any = [];

	@Input('isAuthRequired') isAuthRequired: boolean = true;


	// @ViewChild('m_Module', { static: false }) m_Module : DropDownComponent;
	// @ViewChild('m_Office_Type', { static: false }) m_Office_Type : DropDownComponent;
	// @ViewChild('m_Category_Group', { static: false }) m_Category_Group : DropDownComponent;
	// @ViewChild('m_Ovr_Err', { static: false }) m_Ovr_Err : DropDownComponent;

	@ViewChild('m_Module', { static: false }) m_Module: any;
	@ViewChild('m_Office_Type', { static: false }) m_Office_Type: any;
	@ViewChild('m_Category_Group', { static: false }) m_Category_Group: any;
	@ViewChild('m_Ovr_Err', { static: false }) m_Ovr_Err: any;


	constructor(renderer: Renderer2, elementRef: ElementRef,
		private dataService: DataService,
		private entitlementService: EntitlementService, private globalService: GlobalService) {
		super(renderer, elementRef);

		this.moduleList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"MM\",\"name\": \"MM\"},{\"id\": \"FX\",\"name\": \"FX\"},{\"id\": \"FT\",\"name\": \"FT\"},{\"id\": \"CO\",\"name\": \"CO\"},{\"id\": \"AD\",\"name\": \"AD\"},{\"id\": \"IMF\",\"name\": \"IMF\"},{\"id\": \"FIS\",\"name\": \"FIS\"},{\"id\": \"AD\",\"name\": \"AD\"},{\"id\": \"AD\",\"name\": \"AD\"}]");
		this.officeTypeList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"FO\",\"name\": \"FO\"},{\"id\": \"BO\",\"name\": \"BO\"},{\"id\": \"MO\",\"name\": \"MO\"}]");

		this.CategoryGroupList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"SWIFT MESSAGES\",\"name\": \"SWIFT MESSAGES\"},{\"id\": \"Maintanance\",\"name\": \"Maintanance\"},{\"id\": \"FIS ODA\",\"name\": \"FIS ODA\"},{\"id\": \"CMS\",\"name\": \"CMS\"},{\"id\": \"Back Office\",\"name\": \"Back Office\"},{\"id\": \"Front Office\",\"name\": \"Front Office\"},{\"id\": \"CASH MANAGEMENT\",\"name\": \"CASH MANAGEMENT\"},{\"id\": \"RULEBREACHED\",\"name\": \"RULEBREACHED\"},{\"id\": \"ACCENTRIES\",\"name\": \"ACCENTRIES\"},{\"id\": \"Maintanance\",\"name\": \"Maintanance\"}]");
		this.MesssageTypeList = JSON.parse("[{\"id\": \"ALL\",\"name\": \"ALL\"},{\"id\": \"E\",\"name\": \"ERROR\"},{\"id\": \"O\",\"name\": \"OVERRIDE\"}]");

	}


	ngOnInit() {
		this.eodArray = [];
		this.eodCheckArray = [];
		this.eodMesgArray = [];
		this.filterColVal = [];
		console.log("moduleList", this.moduleList);
		this.refreshEodRecord();
	}

	ngOnChanges(changes) {
		console.log("PreEodCheckComponent isAuthRequired... ...  ", this.isAuthRequired);
	}

	authorizeEodRecords() {

		console.log("refreshEodRecord");

		this.globalService.progressMode = "indeterminate";
		console.log("this.dataService.rootCtx + 'services/preEod/authorize/1", this.dataService.rootCtx + "services/preEod/authorize/1/" + this.globalService.getUserName());

		this.dataService.submitForm(this.eodCheckArray, this.dataService.rootCtx + "services/preEod/authorize/1/" + this.globalService.getUserName()).subscribe((listItems) => {
			this.globalService.progressMode = "";
			this.response = listItems;
			console.log("Response**********", this.response);
			let status = this.response.status;
			this.isMessageShow = true;
			if (!status) {

				if (this.response.message) {
					this.message = this.response.message;
				}
				else {
					this.message = "Problem exist on serverside";
				}
			}
			else {

				if (this.response.message) {
					this.message = this.response.message;

				}
			}
			this.modalFlag = true;
		});

		setTimeout(() => {
			this.globalService.progressMode = "";
		}, 5000);

	}

	refreshEodRecord() {

		console.log("refreshEodRecord");

		this.globalService.progressMode = "indeterminate";
		console.log("this.dataService.rootCtx + 'services/preEod/checkEod/1'", this.dataService.rootCtx + "services/preEod/checkEod/1/" + this.globalService.getUserName());

		this.dataService.getData(this.dataService.rootCtx + "services/preEod/checkEod/1/" + this.globalService.getUserName(), '').subscribe((listItems) => {

			console.log("listItems***refreshEodRecord : ", listItems);
			//  if(listItems.length > 0){
			this.eodArray = listItems;
			console.log("this.eodArray***refreshEodRecord : ", this.eodArray);
			if (this.eodArray["status"]) {
				this.eodMesgArray = this.eodArray["Eod_messages"];
				this.eodCheckArray = this.eodMesgArray;
				console.log("this.eodCheckArray***refreshEodRecord : ", this.eodCheckArray);
				this.authFlag = this.eodArray["PREEOD_FLAG"];
				this.moduleList = this.eodArray["modules"];
				this.officeTypeList = this.eodArray["officeTypes"];
				this.CategoryGroupList = this.eodArray["categoryGroup"];
				//this.MesssageTypeList = this.eodArray["messages"];
				/*if (this.authFlag == 'false') {
					this.authFlag = false;
				}
				else if (this.authFlag == 'true') {
					this.authFlag = true;
				}*/

			} else {
				this.message = this.eodArray["Error_Message"];

			}
			console.log("this.eodCheckArray***refreshEodRecord : ", this.eodCheckArray);
			//  this.authFlag =  false;
			/*if( (this.eodArray.Eod_messages.length > 0)){
					 this.eodCheckArray = this.eodArray.Eod_messages;
`							 console.log("this.eodArray*11111**:",this.eodCheckArray);
			
			}else{
				
			}*/
			//}
			this.globalService.progressMode = "";
		});

		setTimeout(() => {
			this.globalService.progressMode = "";
			if (this.eodArray.length == 0) {
				this.message = "Internal Server Error";
			}
			this.eodFilterClear(this.m_Module, this.m_Office_Type, this.m_Category_Group, this.m_Ovr_Err);
			this.popupMessage = [];
			this.itemIndex = -1;
		}, 7000);


	}

	close() {
		this.modalFlag = false;
		this.isMessageShow = false;
		this.message = "";
	}

	openMaxPopup(indx) {
		console.log("openMaxPopup*******:", this.eodCheckArray[indx]);
		this.popupMessage = this.eodCheckArray[indx].m_Action_Message;
		this.itemIndex = indx;
		this.isMaxShow = true;

	}

	checkFlag() {

		this.isMaxShow = false;

	}

	openReportWindow(indx) {

		if ((this.eodCheckArray[indx].m_Report_Service != null) && (this.eodCheckArray[indx].m_Report_Id != null)) {
			let queryParams = JSON.parse("{"
				+ "\"name\": \"" + this.eodCheckArray[indx].m_Report_Id + "\","
				+ "\"title\":\"" + this.eodCheckArray[indx].m_CategoryCode + "\","
				+ "\"path\":\"/ucf/#/adhocReport/report\","
				+ "\"attributes\":"
				+ "{\"tree_data\":true,\"row_info\":false,\"data_group\":false,\"sortable\":false,\"filterable\":false,\"aggregates\":true,"
				+ "\"pdf_export\":false,\"excel_export\":false,\"csv_export\":false,\"nested_table\":false,\"nested_rep_serv_id\":\"0\","
				+ "\"print\":true,\"refresh\":false,\"graph\":false},"
				+ "\"graphAttributes\":"
				+ "{\"graph_type\":null,\"title\":null,\"graph_description\":null,\"x_axis\":null,\"x_axis_unit\":null,\"y_axis_unit\":null,\"series\":null},"
				+ "\"report_service_id\":\"" + this.eodCheckArray[indx].m_Report_Service + "\","
				+ "\"queryParams\":{\"report_service_id\":\"" + this.eodCheckArray[indx].m_Report_Service + "\","
				+ "\"report_id\":\"" + this.eodCheckArray[indx].m_Report_Id + "\",\"title\":\"" + this.eodCheckArray[indx].m_CategoryCode + "\"}"
				+ "}");
			console.log("openReportWindow*******queryParams**:", queryParams);
			this.entitlementService.openAngularPopupWindow(queryParams);
		} else {
			console.log("this.eodCheckArray[indx].m_Report_Service ******", this.eodCheckArray[indx].m_Report_Service);
			this.message = 'NO Data Configured';
			this.isMessageShow = true;
			this.modalFlag = true;
		}



	}

	eodFilterDetails(colName, event) {
		let searchValue = event;
		//if(event.value != 'ALL'){
		if (event.value)
			searchValue = event.value;
		this.filterColVal = this.filterColVal.filter(function (obj) { return obj.colName != colName; });
		this.filterColVal.push({ colName: colName, colValue: searchValue });
		console.log("filterColVal", this.filterColVal);
		this.filterDetails();
		//}else{
		//this.eodCheckArray
		//}              
	}

	filterDetails() {

		this.eodCheckArray = this.eodMesgArray.filter((obj) => {

			let filterArr = this.filterColVal.map(
				(colObj) => {
					if (colObj.colValue == 'ALL') {
						return true;
					}
					return (obj[colObj.colName].toLowerCase().indexOf(colObj.colValue.toLowerCase()) == "-1" ? false : true);
				});
			let filterFlag = true;
			filterArr.forEach(
				(obj) => {
					console.log("obj********: ", obj);
					return filterFlag = filterFlag && obj;
				});
			return filterFlag;
		});
	}

	eodRefresh() {
		console.log("Inside eodRefresh");


		this.refreshEodRecord();
		this.eodFilterClear(this.m_Module, this.m_Office_Type, this.m_Category_Group, this.m_Ovr_Err);

	}

	eodFilterClear(m_Module, m_Office_Type, m_Category_Group, m_Ovr_Err) {

		console.log("eodFilterClear***********", m_Module, "**", m_Office_Type, "*****", m_Category_Group, "*****", m_Ovr_Err);
		if (m_Module)
			m_Module.value = "ALL";
		if (m_Office_Type)
			m_Office_Type.value = "ALL";
		if (m_Category_Group)
			m_Category_Group.value = "ALL";

		if (m_Ovr_Err)
			m_Ovr_Err.value = "ALL";

		this.eodCheckArray = this.eodMesgArray;
		this.filterColVal = [];
	}

}