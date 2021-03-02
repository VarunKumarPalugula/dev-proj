import { Injectable } from '@angular/core';


@Injectable()
export class GlobalService {

    private entitlements: any;
    private tempEntitlements: any;
    public parentEntitlements: any;

    private isAuthUser: Boolean = false;
    public leftMenuList: any;
    public rightMenuList: any;
    public modulesList: any;
    public favorites: any;

    public homePage: string = 'OneTreasury';
    public count: number = 0;
    public progressMode: string = "";  //to set the progress mode
    public  moduleDispName: string = 'Modules';
    public auditInfo: string[] = [];
	public applicationDate: any = "";
	public applnDate: Date = new Date("01-01-1970");
    public applnTime: string = "00:00:00";
    public showDashboard:boolean = true;

    public isConsole: boolean = false;
    
    whatIfResponce: any;
    constructor() {
        console.log("****** GlobalService initialized",this.moduleDispName);
    }

   setReportParams (inParams) {
        localStorage.setItem(inParams.name, JSON.stringify(inParams) );
    } 
   
    getReportParams(reportName) {
        let reportParams = localStorage.getItem(reportName);
        localStorage.removeItem(reportName);
        return reportParams;
    }              

    getHomePage() {
        return this.homePage;
    }

    setHomePage(page: string) {
        this.homePage = page;
    }

	// To get the entitlements
    setEntitlements(data) {
         console.log("****** GlobalService initialized------",this.moduleDispName);
        this.entitlements = data;
          localStorage.setItem("entitlements", this.entitlements);
       	  console.log("setEntitlements",this.entitlements);
		  this.setModulesList(this.entitlements);
    }
	 getEntitlements() {
		 console.log("getEntitlements");
		 //  return localStorage.getItem("entitlements");
			return  this.entitlements;
     }
	 
	 //To set the ModulesList
	 setModulesList(modules){
		console.log("setModulesList  ",modules);
	/* for(let module of modules){
	  this.modulesList[module]= modules.displayName;
	  console.log(" this.modulesList******", this.modulesList);
	 }*/
	 
	 }
	                getModulesList  () {
                }
				//Dashboard flag either to show or hide
				setDashboardFlag(flag) {
                    this.showDashboard = flag;
                    localStorage.setItem("showDashboard", flag);
                }
                
               getDashboardFlag() {
                    return localStorage.getItem("showDashboard");
                }

    //Setting login user --> required for AuditUser
    setUserName(username: string) {
         localStorage.setItem("loginUser",username);
    }

    getUserName() {
        return localStorage.getItem("loginUser");
    }
    
    //Set Login user branch and branch change default branch
    setLoginUserBranch(branchCode : string){
        localStorage.setItem("loginUserbranch",branchCode);
        localStorage.setItem("branch",branchCode);
    }
    
    getLoginUserBranch(){
        return localStorage.getItem("loginUserbranch");
    }
    
    //Set Branch change branch
    setBranch(branchCode: string) {
        localStorage.setItem("branch",branchCode);
    }

    getBranch() {
        return localStorage.getItem("branch");
    }

    //Set Login Module
    setModule(moduleName: string) {
        localStorage.setItem("moduleName",moduleName);
    }
    
    setDealer(dealerId: string){
       localStorage.setItem("dealerId",dealerId);
    }
    
    getDealer(){
        return localStorage.getItem("dealerId");
    }
    //Get Login module
    getModule(){
        return localStorage.getItem("moduleName");
    }
    
    setLoginTime(loginTime: string) {
        localStorage.setItem("loginTime",loginTime);
    }

    getLoginTime() {
        return localStorage.getItem("loginTime");
    }

    setApplnDate(applnDate1: string) {
        localStorage.setItem("applnDate",applnDate1);
		this.applnDate = new Date(applnDate1);
		let sec = this.applnDate.getSeconds();
		let min = this.applnDate.getMinutes()
		let hour = this.applnDate.getHours();
		this.applnTime = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);		
    }

    getHeaderApplnDate() {
        return localStorage.getItem("applnDate"); //this.applicationDate;
    }
	
	
	getApplnDate(): any {
	   		//console.log("getApplnDate start ",localStorage.getItem("applnDate"));
		let applDate = localStorage.getItem("applnDate");
		var sptdate = String(applDate).split("-");
		let months:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let myMonth:any = sptdate[0];
		let myDay:any = sptdate[1];
		let myYear:any = sptdate[2];
		//let combineDatestr:string = myDay.concat(" ", months[myMonth - 1], " ", myYear);
        return myDay.concat(" ", months[myMonth-1], " ", myYear);
    }
	
    isValidUser() {
        if (localStorage.getItem("authuser")){
            this.isAuthUser = (localStorage.getItem("authuser") == "true");
        }
        return this.isAuthUser;
    }

    logoutUser() {
        console.log("Global Service logout called");
        localStorage.removeItem("authuser");
        localStorage.removeItem("superuser");
        //localStorage.removeItem("moduleName");
        localStorage.removeItem("username");
        localStorage.removeItem("dispName");
        localStorage.removeItem("datetime");
        					localStorage.removeItem("showDashboard");

        //localStorage.removeItem("branch");
        //localStorage.removeItem("dealer");
        this.moduleDispName = 'Modules';
        this.isAuthUser = false;
        this.entitlements = null;
    }


    setDashBardEntitlements(moduleName: string, dispName: string) {
        this.moduleDispName = dispName;
        this.count = this.count + 1;
        if (this.count == 1) {
            this.parentEntitlements = this.entitlements;
        }

        this.tempEntitlements = this.entitlements;

        this.entitlements = [{
            superuser: localStorage.getItem("superuser"), moduleName: moduleName,
            username: localStorage.getItem("username"),
            dispName: localStorage.getItem("dispName")
        }];
    }

    setMainEntitlements() {
        this.entitlements = this.parentEntitlements;
    }

    /**
     * This method is used to set Left Menu List
     */
    setLeftMenu(leftMenu) {
        this.leftMenuList = leftMenu;
    }

    /**
     * This method returns Left Menu List
     */
    getLeftMenu() {
        return this.leftMenuList;
    }

    /**
     * This method is used to set Right Menu List
     */
    setRightMenu(rightMenu) {
        this.rightMenuList = rightMenu;
    }

    /**
     * This method is used to get Right Menu List
     */
    getRightMenu() {
        return this.rightMenuList;
    }

    /**
     * This method is used to set Favorites
     */
    setFavorites(favoriteList) {


        if (favoriteList) {
            console.log("Favorites =" + JSON.stringify(favoriteList));

            this.favorites = favoriteList;

            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        }
    }

    /**
     * This method is used to get Favorites
     */

    getFavoriteStatus(name: string) {

        if (!this.favorites) {

            if (localStorage.getItem("favorites")) {
                this.favorites = JSON.parse(localStorage.getItem("favorites"));
                console.log("favorites " + JSON.stringify(this.favorites));
            }
        }

        if (this.favorites) {
            for (let i = 0; i < this.favorites.length; i++) {
                if (this.favorites[i].name == name) {
                    return true;
                }
            }

        }
        return false;
    }

    setAuditInfo(auditInfo: string[]) {
        this.auditInfo = auditInfo;
    }

    getAuditInfo() {
        return this.auditInfo;
    }
  				getActionList (){
                	var actionList = [
						{name: "save",title:"Save",path:"save",color:"#a4f50c",shortName:"Save",imagePath:"/config_files/images/Save24.png"},
						{name:"new_releases",title:"Authorize",path:"authorize",color:"#26a69a",shortName:"Authorize",imagePath:"/config_files/images/Authorize24.png"},
						{name: "check_circle",title:"Save and Authorize",path:"saveAuthorize",color:"#ff7166",shortName:"Save&Auth",imagePath:"/config_files/images/SaveAuth24.png"},
						{name: "picture_as_pdf",title:"Deal Slip",path:"dealSlip",color:"#ffff00",shortName:"Deal Slip",imagePath:"/config_files/images/filedownload.png"},
						{name:"reply",title:"Send Back",path:"sendback",color:"#ffff00",shortName:"Sendback",imagePath:"/config_files/images/reply.png"},
						{name: "layers",title:"Accounting Entries",path:"accEntry",color:"#ffff00",shortName:"Acc. Entries",imagePath:"/config_files/images/filter.png"},
						{name: "message",title:"Swift Message",path:"swiftMessage",color:"#0000ff",shortName:"Swift",imagePath:"/config_files/images/Feedback.png"},
						{name: "delete",title:"Delete",path:"delete",color:"#000000",shortName:"Delete",imagePath:"/config_files/images/Delete.png"},
						{name:"file_download",title:"Download",path:"fileDwnld","color":"#000000",shortName:"Download",imagePath:"/config_files/images/filedownload.png"},
						{name: "cancel",title:"Cancel",path:"cancel",color:"#d61111",shortName:"Cancel",imagePath:"/config_files/images/reject.png"},
						{name:"refresh",title:"Clear",path:"clear",color:"#a4f50c",shortName:"Clear",imagePath:"/config_files/images/refresh.png"},
						{name: "content_copy",title:"Copy",path:"copy",color:"#000000",shortName:"Copy",imagePath:"/config_files/images/Copy24.png"},
						{name: "settings_backup_restore",title:"Reverse",path:"reverse",color:"#0000ff",shortName:"Reverse",imagePath:"/config_files/images/reply.png"},
						{name: "update",title:"Update",path:"update",color:"#a4f50c",shortName:"Update",imagePath:"/config_files/images/Amend24.png"},
						{name: "autorenew",title:"Recall",path:"recall",color:"#d61111",shortName:"Recall",imagePath:"/config_files/images/autorenew.png"},
						{name: "help",title:"What If",path:"whatif",color:"#a4f50c",shortName:"What If",imagePath:"/config_files/images/whatif.png"},
						{name:"compare",title:"Compare",path:"compare",color:"#a4f50c",shortName:"Compare",imagePath:"/config_files/images/Copy24.png"},
						{name:"message",title:"Generate MTn99 Message",path:"MTn99",color:"#a4f50c",shortName:"MTn99",imagePath:"/config_files/images/Feedback.png"},
						{name:"search",title:"MTn99 Search",path:"MTn99 Search",color:"#a4f50c",shortName:"MTn99 Search",imagePath:"/config_files/images/Find24.png"},
						{name:"find_in_page",title:"Risk",path:"risk",color:"#d61111",shortName:"Risk",imagePath:"/config_files/images/find_in_page.png"}
						];
					 return actionList;
                }

    /**       * To set the whatif resonce o bject 
     */
   setWhatIfResponce(response : any){
        console.log(" setWhatIfResponce :  ", response);
         this.whatIfResponce =response;
   }
   /**
       To get the Whatif responc e         the grid
    */
    gerWhatIfResponce(){
        console.log(" getWhatIfResponce :  ", this.whatIfResponce);
        return this.whatIfResponce ;
    }
}