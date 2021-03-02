import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
// import {MdToolbar} from '@angular/material';
// import {MdCard} from '@angular/material';
import { FieldComponent } from '../../base/iField';


// declare var __moduleName: string;

@Component({
    // moduleId: __moduleName,
    selector: 'iHeader',
    templateUrl: "iHeader.html",
    inputs: ['menuStatus', 'isModuleHide'],
    styleUrls: ['iHeader.css']
})

//This component is built for Header
export class HeaderComponent extends FieldComponent implements OnInit {

    public searchResults: string;
    public prefValue: boolean = false;
    public modalFlag: boolean = false;
    public profilePrefValue: boolean = false;
    public docValue: boolean = false;
    public aboutValue: boolean = false;
    public aboutObj: any = { "mBuildDate": "14-Jan-2019", "mRevision": "19.1" };
    public userImageUrl: any;
    public bnkLogoUrl: any;
    public loadImage: any;
    public prefAvailData: any;
    public prefSelData: any;
    treeList: any = [];
    treeListRight: any = [];
    public filteredList: any = [];
    currTheme: string = 'theme1';
    settingsMenuOpen: boolean = false;
    public elementRef;
    public isModuleHide: boolean = true;
    currDate: string;
    showFilteredList: boolean;
    uploadFlag: boolean = false;
    public allowedMimeType: any = ['image/png', 'image/jpg', 'image/jpeg'];
    public maxFileSize: 102400;
    public url: string;
    public userImagePath: any;
    public bnkLogoPath: any;
    public tickerList: any = [];

    public notifArray: any;
    public notifFlag: boolean = false;
    public logoutFlag: boolean = false;
    public winNames: any = [];
    public eodCheck: boolean = false;

    @Output() menuStatusChange = new EventEmitter();
    @Output() refreshReportEvent = new EventEmitter();

    @ViewChild('search', { static: false }) search: ElementRef;
    @ViewChild('imgValue', { static: false }) imgValue: ElementRef;
    @ViewChild('saveLocOptions', { static: false }) saveLocOptions: ElementRef;
    @ViewChild('FX', { static: false }) FX: ElementRef;
    @ViewChild('MM', { static: false }) MM: ElementRef;
    @ViewChild('FI', { static: false }) FI: ElementRef;
    @ViewChild('SP', { static: false }) SP: ElementRef;

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.userImagePath = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/getImage/userImage/";
        this.bnkLogoPath = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/getImage/bankLogo/";
        this.url = this.dataService.protocolType + location.host + this.dataService.rootCtx + "services/data/upload/";
        this.userImageUrl = this.userImagePath + "1";
        this.bnkLogoUrl = this.bnkLogoPath + "1";

        //Get the Scroll Information
        this.dataService.getData("", "/data/tickerInfo").subscribe((listItems: any[]) => {
            this.tickerList = listItems;
            console.log("tickerList ********", this.tickerList);
        });

        this.prefAvailData = [
            {
                "FUNCTION_NAME": "Current Bond Prices",
                "WIDGET_NAME": "stackedBars"
            },
            {
                "FUNCTION_NAME": "Current FX Rates",
                "WIDGET_NAME": "stackedBars"
            },
            {
                "FUNCTION_NAME": "FIS Composition",
                "WIDGET_NAME": "pieChart"
            },
            {
                "FUNCTION_NAME": "FX Position",
                "WIDGET_NAME": "sunburst"
            },
            {
                "FUNCTION_NAME": "FX Rates",
                "WIDGET_NAME": "multiLine"
            },
            {
                "FUNCTION_NAME": "FX Status",
                "WIDGET_NAME": "pieChart"
            },
            {
                "FUNCTION_NAME": "Forex Reserves",
                "WIDGET_NAME": "sunburst"
            },
            {
                "FUNCTION_NAME": "Historical Bond Prices",
                "WIDGET_NAME": "multiLine"
            },
            {
                "FUNCTION_NAME": "Cashflow",
                "WIDGET_NAME": "sunburst"
            },
            {
                "FUNCTION_NAME": "Composition",
                "WIDGET_NAME": "sunburst"
            },
            {
                "FUNCTION_NAME": "FIS Issuer",
                "WIDGET_NAME": "pieChart"
            },
            {
                "FUNCTION_NAME": "Operations Throughput",
                "WIDGET_NAME": "radialProgress"
            },
            {
                "FUNCTION_NAME": "Liquidity and Risk",
                "WIDGET_NAME": "surface3D"
            }
        ];

        this.prefSelData = [
            {
                "FUNCTION_NAME": "Forex Reserves",
                "WIDGET_NAME": "stackedBars"
            },
            {
                "FUNCTION_NAME": "Liquidity and Risk",
                "WIDGET_NAME": "stackedBars"
            },
            {
                "FUNCTION_NAME": "Current FX Rates",
                "WIDGET_NAME": "stackedBars"
            },
            {
                "FUNCTION_NAME": "Operations Throughput",
                "WIDGET_NAME": "stackedBars"
            },

        ];

        this.prefAvailData.sort();
        for (let i = 0; i < this.prefAvailData.length; i++) {
            for (let j = 0; j < this.prefSelData.length; j++) {
                if (this.prefSelData[j].FUNCTION_NAME == this.prefAvailData[i].FUNCTION_NAME) {
                    this.prefAvailData.splice(this.prefAvailData.indexOf(this.prefAvailData[i]), 1);
                }
            }
        }

        //Get the About Information
        this.dataService.getData("", this.dataService.rootCtx + "services/settings/about").subscribe((jsonRes) => {
            console.log("About response********", JSON.stringify(jsonRes));
            if (jsonRes != null && jsonRes.mBuildDate != null) {
                let strMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                let s1dat = jsonRes.mBuildDate.split("-");
                let bDate = new Date(s1dat[0], s1dat[1], s1dat[2]);
                console.log("bDate ********", bDate);
                let formatDate = bDate.getDate() + "-" + strMonth[bDate.getMonth() - 1] + "-" + bDate.getFullYear();
                console.log("Formatted Build Date ********", formatDate);
                this.aboutObj.mBuildDate = formatDate;
                this.aboutObj.mRevision = jsonRes.mRevision;
            }
        });

        this.notifArray = this.globalHelpService.getNotification()
    }

    public saveWinLocation(winIndx) {

        this.settingsMenuOpen = false;
        //window.resizeTo(0,0);
        //window.blur();
        //setTimeout(()=>{ 
        this.entitlementService.saveWindowLocation(winIndx);
        //}, 200);                  
    }

    public logout(value) {
        console.log("******logout****", value);
        if (value) {
            this.globalService.logoutUser();
            this.dataService.loadPage('MLLogout.jsp');
            window.close();
        }
        this.logoutFlag = value;
        //this.router.navigate(['']);
    }

    public menuChange() {
        this.menuStatusChange.emit();
    }

    //This methode open and close the setting div
    public toggleSettingsMenu() {
        if (this.settingsMenuOpen) {
            this.settingsMenuOpen = false;
        }
        else {
            // this.winNames = openedAppNames;
            this.settingsMenuOpen = true;
            console.log("##### this.saveLocOptions", this.saveLocOptions);
            this.saveLocOptions.nativeElement.value = 'None';

        }
    }

    public navigate() {
        this.globalService.setMainEntitlements();
        this.preferencesService.loadDashboard();
    }

    public openWindow(entry) {
        console.log("Window ************", entry);
        this.entitlementService.openSelectedWindow(null, entry, 1);
    }


    //ChildMenu Search
    public childMenusSearch(entry) {
        //console.log("-- childMenusSearch  ",entry);
        let value = this.value.trim()
        if (entry.subMenus != null) {

            for (var i = 0; i < entry.subMenus.length; i++) {//traverse the SubMenus

                if (entry.subMenus[i].title.toUpperCase().indexOf(value.toUpperCase()) !== -1) {
                    if (entry.subMenus[i].subMenus.length == 0) {//entry.subMenus[i].subMenus == null) {
                        console.log(" --  entery  ", entry.subMenus[i].subMenus);
                        if (entry.moduleType != null) {

                            entry.subMenus[i].dispName = entry.moduleType + " " + entry.officeType + " " + entry.subMenus[i].title;
                            entry.subMenus[i].moduleType = entry.moduleType;
                            entry.subMenus[i].officeType = entry.officeType;
                            entry.subMenus[i].subModuleType = entry.subModuleType;
                        }
                        else {
                            if (entry.subMenus[i].isPopup == false) {
                                entry.subMenus[i].dispName = entry.subMenus[i].moduleType + " " + entry.subMenus[i].officeType + " " + entry.subMenus[i].title;
                            } else {
                                entry.subMenus[i].dispName = entry.title + " " + entry.subMenus[i].title;
                            }
                        }

                        this.filteredList = this.filteredList.concat(entry.subMenus[i]);
                    }
                }
                this.childMenusSearch(entry.subMenus[i]); //Recursive
            }
        }
    }


    //This methode is for header search
    public filter() {
        this.filteredList = []; //empty the filteredList 
        this.treeList = this.globalService.getLeftMenu();
        this.treeListRight = this.globalService.getRightMenu();
        let value = "";

        if (this.value && this.value.match(/[a-z]/i)) {
            value = this.value.trim()
            this.showFilteredList = !this.showFilteredList;
            for (let _i = 0, _a = this.treeList; _i < _a.length; _i++) {
                let entry = _a[_i];

                if (entry.title != null) {
                    if (entry.title.toUpperCase().indexOf(value.toUpperCase()) !== -1) //match the entitlement title to the given value
                    {
                        if (entry.subMenus == null) {
                            entry.dispName = entry.title;
                            this.filteredList = this.filteredList.concat(entry);
                        }
                    }
                    this.childMenusSearch(entry);
                }
            }

            /*for (let entry of this.treeListRight)  //traverse the treeListRight
            {
                if (entry.dispName.toUpperCase().indexOf(this.value.toUpperCase()) !== -1)//match the  name to the given value 
                {
                    this.filteredList = this.filteredList.concat([entry]);
                }

                if (typeof entry.subnodes == "object")//check for the subnodes
                {
                    for (var i = 0; i < entry.subnodes.length; i++) //traverse the subnodes
                    {
                        if (entry.subnodes[i].dispName.toUpperCase().indexOf(this.value.toUpperCase()) !== -1) //match the subnodes name to the given value
                        {
                            this.filteredList = this.filteredList.concat(entry.subnodes[i]);
                        }
                    }

                }//end of subnodes

            }*/
            length = this.filteredList.length;
        }
    }

    public hideSearchResult() {
        this.search.nativeElement.value = "";
        this.filteredList = [];
    }

    public changeSettingsFlag() {
        this.settingsMenuOpen = false;
    }
    //This methode is for theme
    public changeStyle(selIndex: any) {
        this.settingsMenuOpen = false;
        this.globalStyle.setStyleCode(selIndex);
    }

    public dashbrdPref(val: any) {
        console.log("**in pref:");
        this.prefValue = true;
        this.modalFlag = true;
        this.profilePrefValue = false;
    }

    public profilePref(val: any) {
        console.log("**in profile pref:");
        this.profilePrefValue = true;
        this.modalFlag = true;
    }

    public refreshAdhocReports() {
        console.log("**refreshAdhocReports:");
        this.refreshReportEvent.emit();
    }

    public docPref() {
        console.log("**in Documentation:");
        this.docValue = true;
        this.modalFlag = true;
        this.profilePrefValue = false;
        console.log("---User ********", this.globalService.getUserName());
        console.log("---Dealer ********", this.globalService.getDealer());
        console.log("---Module ********", this.globalService.getModule());
        console.log("---Branch ********", this.globalService.getBranch());
        let dealerObj = { "mUsername": this.globalService.getUserName(), "mDealer": this.globalService.getDealer(), "mBranch": this.globalService.getBranch() };
        let inputJSON = JSON.stringify(dealerObj);
        console.log("---inputJSON ********", inputJSON);
        //Get the Dealer Assigned Modules Information
        this.dataService.submit(inputJSON, this.dataService.rootCtx + "services/settings/dealerModules").subscribe((jsonRes) => {
            console.log("dealerModules ********", jsonRes);
            //{"mUsername":"INTELLECTFO","mDealer":"ANGL","mBranch":"1"}
            //AC,AD,ALL,BN,CU,FI,FR,FT,FU,FX,IM,MM,MT,OP
            if (jsonRes != null && jsonRes.length > 0) {
                console.log("dealerModules jsonRes.length:", jsonRes.length);
                //Array operations...
                if (jsonRes.includes("ALL")) {//show all links
                    return;
                } else { //enforce module-wise entitlements
                    console.log("this.FX ********", this.FX);
                    if (!jsonRes.includes("FX")) {
                        this.FX.nativeElement.style.display = "none";
                    }
                    if (!jsonRes.includes("MM")) {
                        this.MM.nativeElement.style.display = "none";
                    }
                    if (!jsonRes.includes("FI")) {
                        this.FI.nativeElement.style.display = "none";
                    }
                    if (!jsonRes.includes("SP")) {
                        this.SP.nativeElement.style.display = "none";
                    }
                }
            }
        });

    }

    public aboutPref(val: any) {
        console.log("**in About:");
        this.aboutValue = true;
        this.modalFlag = true;
        this.profilePrefValue = false;
    }

    public close() {
        //this.settingsMenuOpen = false;
        this.prefValue = false;
        this.profilePrefValue = false;
        this.docValue = false;
        this.aboutValue = false;

        this.modalFlag = false;
        this.settingsMenuOpen = false;
        this.eodCheck = false;
        this.logoutFlag = false;
    }

    public getImage($event) {

        this.userImageUrl = this.userImagePath + $event.src;
    }

    public getLogo($event) {
        this.bnkLogoUrl = this.bnkLogoPath + $event.src;
    }

    public profileSettings() {
        this.prefValue = false;
        this.modalFlag = false;

    }

    /**
     * For toggle Alert
     * 
     */
    public toggleNotif() {
        this.notifFlag = !this.notifFlag;
    }

    /**
     * for delete the alert message
     */
    public onNotifClose(index: any) {
        this.notifArray.splice(index, 1);
    }

    public openAngularWindow(queryParams) {
        this.entitlementService.openAngularPopupWindow(queryParams);

    }
    preEodDetails() {
        console.log("preEodDetails******************", this.eodCheck);
        this.eodCheck = true;
        this.modalFlag = true;
    }
    public onClickLogout() {
        this.logoutFlag = true;
    }


}