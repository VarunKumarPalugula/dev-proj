import { Component, OnInit,Input,Output,EventEmitter,ElementRef, ViewChild,Renderer2} from '@angular/core';

import {FieldComponent} from '../../base/iField';

// declare var __moduleName: string;

@Component({
// moduleId: __moduleName,
    selector: 'iAccountEntry',   
    templateUrl: 'iAccountEntry.html',
    styleUrls: ['iAccountEntry.css'],
    inputs:['AccountEntryId','accountList','moduleType']
})

export class AccountingEntriesComponent extends FieldComponent implements OnInit {
    
    public dataServicePath = "";
    public AccountEntryId :any="";
    public accountList: any;
    
	@ViewChild('viewHistory', { static: false} ) viewHistory: any;
	// @ViewChild('viewHistory', { static: false} ) viewHistory: CheckboxComponent;
	
	public formValid:boolean=false;
	public modalFlag:boolean=false;
	public isAccounting:boolean=false;

	public title:string="";
	public message:string="";
	
    constructor(renderer: Renderer2, elementRef: ElementRef){
        super(renderer, elementRef);
    }
	
	ngOnInit(){
		console.log("In Acc. Entries ngOnInit method"); 	
		this.dataServicePath =this.contextUrl+"BO/accountentries/";
		this.viewHistory.value = false;
		this.getAccountingEntries();
	}
  /**
   * To get the Accounting Entries  of the Account
   */
    getAccountingEntries() {
        console.log("********* getAccountingEntries");
		this.globalService.progressMode = "indeterminate";
       
        let accEntryViewHistory = this.viewHistory.value;

        console.log("*******this.AccountEntryId: ", this.AccountEntryId, accEntryViewHistory);
		//this.dataServicePath=this.dataServicePath + "accountentries/";
        this.dataService.getData(this.AccountEntryId + "/"+ accEntryViewHistory, this.dataServicePath).subscribe((listItems: any) => {
            this.accountList = listItems;
            this.globalService.progressMode = "";
            if (this.accountList[1] == "") {
                this.formValid = true;
                this.modalFlag = true;
                this.title = "Accounting Entries";
                this.message = "Accounting Entries  data not  found";
            } else {
                this.isAccounting = true;
                this.modalFlag = true;
		
            }
       });

    }

    //This method is use to generate Accouting Entries Slip
    generateAccountingEntriesPDF() {
        let refNo: string = this.AccountEntryId;
        console.log("Accouting Entries Reference Number***" + refNo);
        //TO DO : hardcoded userid and branch details and referenceNo changes
        let requestParams = "selectedOption=GENERATE&selectedURL=/TransactionAdivse&selectedModule=CO&selectedReportGrp=group7&outputFormat=PDF&reportOption=Online&cnumber=" + refNo + "&module=" + this.inputParams.moduleType + "&accflag=true&userId=FOMKR&branchId=1&branchDesc=UBS NewYork&userLocale=en_US";

        //console.log("*****params***" + requestParams);
        let fileName: string = "TransactJrnlAdviseReport_" + this.globalService.getUserName() + ".pdf";
        this.dataService.downloadPDF("/TreasuryRptServlet", requestParams, fileName);
    }

    generateArray(obj, index) {
        console.log("generateArray  ", obj, "index", index);
        if (index > 0) {
            // return Object.keys(obj).map((key)=>{return obj[key]});
            return obj;
        }
    }

}