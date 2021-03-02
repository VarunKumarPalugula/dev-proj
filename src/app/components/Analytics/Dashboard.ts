import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IconComponent } from '../../common/icon/iIcon';
import { MaximizeComponent } from '../../common/maximizeWidget/iMaximize';
import { WidgetContainerComponent } from '../../common/widgetcontainer/iWidgetContainer';
import { MultiLineZoomComponent } from '../../widgets/MultiLineZoom/MultiLineZoom';
import { PiechartComponent } from '../../widgets/piechart/piechart.component';
import { StackedBarsComponent } from '../../widgets/stackedBars/stackedBars.component';
import { SunburstComponent } from '../../widgets/sunburst/sunburst.component';
import { FieldComponent } from '../../base/iField';


// declare var __moduleName: string;

@Component({
    selector: 'idashboard',
    // moduleId: __moduleName,
    templateUrl: 'Dashboard.html',
    styleUrls: ['Dashboard.css']
})

export class DashboardComponent extends FieldComponent implements OnInit, OnDestroy {

    // public __moduleName: string;
    public helpShow: boolean = false;
    public actionValue: any;
    public isSunburst  = false; 
    isAssetPosition  = false;
    isMMds  = false;
    isMMcc = false;
    public modalFlag: any = false;
    public isPFCurrPosition: boolean = false;
    docValue: boolean;
    profilePrefValue: boolean;
    isBrCurPosition: boolean;

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.globalService.isConsole = false;
        console.log("--- calling globalService.setMainEntitlements()");
        this.globalService.setMainEntitlements();
        console.log("--- calling userEntitledDashboard()");
        this.userEntitledDashboardTabs();
    }

    userEntitledDashboardTabs() {
        console.log("--- in userEntitledDashboard:");
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
        this.dataService.submit(inputJSON, "/ucf/services/settings/dealerModules").subscribe(function (jsonRes) {
            console.log("dealerModules ********", jsonRes);
            //let this = this;
            //{"mUsername":"INTELLECTFO","mDealer":"ANGL","mBranch":"1"}
            //AC,AD,ALL,BN,CU,FI,FR,FT,FU,FX,IM,MM,MT,OP
            if (jsonRes != null && jsonRes.length > 0) {
                console.log("dealerModules jsonRes.length:", jsonRes.length);
                //Array operations...
                if (jsonRes.includes("ALL")) {//show all links
                    return;
                } else { //enforce module-wise entitlements
                    /* console.log("this.dashTab ********", this.dashTab);
                     if (!jsonRes.includes("DB")) {
                         this.dashTab.nativeElement.style.display = "none";
                     }								
                     if (!jsonRes.includes("FX")) {
                         this.fxTab.nativeElement.style.display = "none";
                     }
                     if (!jsonRes.includes("FI")) {
                         this.fisTab.nativeElement.style.display = "none";
                     }								
                     if (!jsonRes.includes("MM")) {
                         this.mmTab.nativeElement.style.display = "none";
                     }
                     if (!jsonRes.includes("CP")) {
                         this.compTab.nativeElement.style.display = "none";
                     }
                     if (!jsonRes.includes("LR")) {
                         this.riskTab.nativeElement.style.display = "none";
                     }									
                     if (!jsonRes.includes("OP")) {
                         this.opTab.nativeElement.style.display = "none";
                     }	*/
                }
            }
        });

    }

    maximize(iaction: any) {
        //console.log("********id:",iaction);
        this.modalFlag = true;
        if (iaction == "sunburst") {
            this.isSunburst = true;
        }
        if (iaction == "MMds") {
            this.isMMds = true;
        }
        if (iaction == "MMcc") {
            this.isMMcc = true;
        }
        if (iaction == "pieChart") {
            this.isAssetPosition = true;
        }
        if (iaction == "HorzStackedBar") {
            this.isPFCurrPosition = true;
        }
        if (iaction == "Currency_Position") {
            this.isBrCurPosition = true;
        }

    }

    minimize(ev: any) {
        this.close();
    }
    close() {
        this.modalFlag = false;
        this.isSunburst = false;
        this.isAssetPosition = false;
        this.isMMds = false;
        this.isMMcc = false;
        this.isPFCurrPosition = false;
        this.isBrCurPosition = false;
    }

    helpPage(iaction: any) {
        //console.log("helpPage method called in home iaction:", iaction);
        this.actionValue = iaction;

        if (this.actionValue == "sunburst" || this.actionValue == "surface3D" || this.actionValue == "stackedBar"
            || this.actionValue == "radial" || this.actionValue == "MultiLine"
            || this.actionValue == "compliance" || this.actionValue == "pieChart" || this.actionValue == "HorzStackedBar") {
            this.helpShow = true;
            //console.log("helpPage this.helpShow:", this.helpShow);   
        }
        else {
            this.helpShow = false;
        }
    }

    helpClose() {
        this.helpShow = false;
    }

    /**
        help related methods:drag & drop
       */
    addListeners(evId: any) {
        //console.log("****addListeners:");

        document.getElementById('info').addEventListener('mousedown', this.mouseDown, false);
        window.addEventListener('mouseup', this.mouseUp, false);
    }

    mouseUp() {
        //console.log("****mouseUp:");
        window.removeEventListener('mousemove', divMove, true);

    }

    mouseDown(e: any) {
        //console.log("****mouseDown e:", e);
        // to disable text on selection
        document.onselectstart = function () { return false; }
        window.addEventListener('mousemove', divMove, true);

    }

    ngOnDestroy() {
        this.globalService.isConsole = true;
    }

}
function divMove(e: any) {
    return;
    let div = document.getElementById('info');
    div.style.position = 'absolute';

    div.style.top = (e.clientY - 450) + 'px';
    div.style.left = (e.clientX - 680) + 'px';
}
