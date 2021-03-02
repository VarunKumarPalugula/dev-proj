import{ Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';


// declare  let __moduleName: string;

@Component({
//    moduleId: __moduleName,
   selector:'reportTemplate',
   templateUrl:'reportTemplate.html',
   styleUrls: ['reportTemplate.css']
       
})
export class ReportTemplateComponent extends BaseComponent {
    
    public blotterList:any = [];
    public profileList: any = [];
    public gridChoiceList:any = [];
    public modalFlag :boolean= false;
    public blotterFlag :boolean= true;
    public profileFlag :boolean= true;
    public blotterId :string= "";
    public blotterPref:boolean = false;
    public groupData :boolean= false;
    public rowdetails :boolean= false;
    public treeData :boolean= false;
    public title :string= "";
    public inParams:any = "";
    
    public reportServiceId :string= "";
    public reportId:string = "";
    public userImagePath :string = "";
    public bnkLogoPath :string= "";
    public userImageUrl :string= "";
    public bnkLogoUrl :string= "";
    m_Profile: any;
    reqType: string;
    m_blotterType: any;
    
    constructor(){
        
        super();
        
        this.userImagePath = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/getImage/userImage/";
        this.bnkLogoPath = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/getImage/bankLogo/";
        this.userImageUrl = this.userImagePath + "1";
        this.bnkLogoUrl = this.bnkLogoPath + "1";
        if(this.qryParams['report']){
            this.inParams = JSON.parse(this.globalService.getReportParams(this.qryParams['report']));
        }
        console.log("****** inParams123 : ", this.inParams); 
        
        if (this.inParams['report_service_id']) {
            this.reportServiceId = this.inParams['report_service_id'];
            this.reportId = this.inParams['name'];
            this.title = this.inParams['title'];
            this.fetchGridData();
        }
        
    }   
    
   blotterChange(event) {
       
        this.blotterFlag = false;
         this.profileList=[];
         this.m_Profile.value = -1;
        this.blotterId = event.value;
        console.log("############# event: ", event);
        this.refreshProfileList();
    };
    
    refreshProfileList() {
        
        if (this.blotterId && this.blotterId.length > 0) {
            console.log("this.blotterId path**********  :", "/services/reportservice/reports/" + this.blotterId);
            this.globalService.progressMode = "indeterminate";
            this.dataService.getData(this.dataService.rootCtx + "services/reportservice/reports/" + this.blotterId, '').subscribe( (listItems) =>{
                console.log("listItems*** ", listItems);
                this.profileList = listItems;
                this.globalService.progressMode = "";
            });
            setTimeout( () =>{
                this.globalService.progressMode = "";
            }, 5000);
        }
    };
    
    profileChange(event) {
        if (event && event.value) {
            this.profileFlag = false;
        }
    }
    
    fetchGridData() {
        console.log("############## FetchGridData called: ", this.reportServiceId, " : ", this.reportId);
        this.reqType = "/reportservice/" + this.reportServiceId + "/" + this.reportId;
        this.gridChoiceList = [];
        //this.groupData = this.m_blotterType.selectedItem.data_group;
        //this.rowdetails = this.m_blotterType.selectedItem.row_info;
        //this.treeData = this.m_blotterType.selectedItem.tree_data;
        this.groupData = false;
        this.rowdetails = false;
        this.treeData = false;
    }
    
    onGoClick(blotterValue, profileValue) {
        console.log(blotterValue, profileValue, "- sdsd  ", this.gridChoiceList);
        this.reqType = "/reportservice/" + blotterValue.selectedItem.id + "/" + profileValue.selectedItem.id;
        this.gridChoiceList = [];
        this.groupData = this.m_blotterType.selectedItem.data_group;
        this.rowdetails = this.m_blotterType.selectedItem.row_info;
        this.treeData = this.m_blotterType.selectedItem.tree_data;
    }
    toggleUserProfile() {
        this.blotterPref = !this.blotterPref;
        this.modalFlag = !this.modalFlag;
        if(!this.modalFlag && !this.blotterPref){
            this.refreshProfileList();
        }
    }
}