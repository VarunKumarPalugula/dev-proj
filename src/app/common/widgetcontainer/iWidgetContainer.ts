import { Component, Output, EventEmitter, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStyleComponent } from '../../services/global.style';
import { PreferencesService } from '../../services/preferences.service';
import { GlobalService } from '../../services/global.service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data.service';
import { saveAs } from 'file-saver';

declare var openedWinNames: any;
declare var openedWindows: any;

@Component({
    selector: 'iWidgetContainer',
    // moduleId: __moduleName,
    styleUrls: ['iWidgetContainer.css'],
    templateUrl: 'iWidgetContainer.html',
    inputs: ['ititle', 'zoomOut', 'MaxMinFlag', 'widgetReqType', 'isStackedBar', 'brdcrmb'],
    outputs: ['maxWidgetEvent', 'helpWidgetEvent', 'minWidgetEvent', 'reloadWidgetEvent', 'downloadImageEvent', 'backWidgetEvent'],
    providers: [DataService, PreferencesService]
})

//This component is built for Panel
export class WidgetContainerComponent implements OnInit {

    // public __moduleName: string;
    opened: boolean = true;
    requestType: string = "favorites";
    ititle: string;
    MaxMinFlag: any = "false";
    zoomOut: boolean = false;
    helpFlag: boolean = false;
    isStackedBar: boolean = false;
    launchTime: any;
    launchDate: any;
    maxWidgetEvent = new EventEmitter();
    minWidgetEvent = new EventEmitter();
    backWidgetEvent = new EventEmitter();
    helpWidgetEvent = new EventEmitter();
    reloadWidgetEvent = new EventEmitter();
    downloadImageEvent = new EventEmitter();
    menuFlag: boolean = false;
    menuList: any = [];
    widgetInfo: any = [];
    brdcrmb: any = [];




    @ViewChild('widgetContainer', { static: false }) private widgetContainer: ElementRef;
    widgetReqType: any;

    constructor(@Inject(DataService) private dataService: DataService, @Inject(Router) router: Router, @Inject(GlobalStyleComponent) private globalStyle: GlobalStyleComponent,
        @Inject(PreferencesService) private preferencesService: PreferencesService,
        @Inject(GlobalService) private globalService: GlobalService,
        @Inject(TranslateService) translate: TranslateService) {

        //this.launchTime = new Date();
    }


    ngOnInit() {
        this.launchDate = new Date();

        let sec = this.launchDate.getSeconds();
        let min = this.launchDate.getMinutes()
        let hour = this.launchDate.getHours();
        //console.log("header ", this.launchDate);
        this.launchTime = hour + ":" + min + ":" + sec;
        this.launchTime = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);

    }

    showMenu() {
        console.log("Deal Operations - showMenu for requestType:", this.ititle);
        console.log("widgetReqType::", this.widgetReqType);
        //show operations menu list
        this.menuFlag = !this.menuFlag;
        let requestType = this.widgetReqType; //this.ititle.replace(/ /g, '_');
        //get the menu
        this.dataService.getListItemsByPost('analytics/widgetInfo', requestType).subscribe((listItems) => {
            console.log("--- widgetInfo:", listItems);
            //{"module":"FX", "officeType":"FO","page":"Deal_Settlement","displayName":"Front Office - Deal Settlement"}		
            this.widgetInfo = listItems;
            if (listItems.length > 0) {
                let operationsStr = listItems[0].DEAL_OPERATIONS;
                console.log("--- widgetInfo: operationsStr", operationsStr);
                this.menuList = JSON.parse("[" + operationsStr + "]");
                console.log("--- widgetInfo: menuList", this.menuList);

            } else {
                //Deal Operations menu items not configured
                console.log("--- widgetInfo: menuList, not configured");
                //Do not show menu
                this.menuFlag = !this.menuFlag;
            }
        });
    }

    zoomOutPage(event: any) {
        this.menuFlag = false;
        //console.log("zoomOutPage ", event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
        //console.log("zoom-out:",this.zoomOut);
        this.zoomOut = !this.zoomOut;
        this.maxWidgetEvent.emit({ value: this.zoomOut });

    }

    exitFullScreen() {
        this.menuFlag = false;
        //console.log("**exit full screen:");
        this.zoomOut = !this.zoomOut;
        this.minWidgetEvent.emit({ value: this.zoomOut });
    }

    help(event: any) {
        this.menuFlag = false;
        //console.log("**help:");
        this.helpFlag = !this.helpFlag;
        this.helpWidgetEvent.emit({ value: this.helpFlag });
    }

    breadcrumbEvent(event) {

        console.log("************ breadcrumbEvent:", event);
        let widReqType = event;
        this.backWidgetEvent.emit({ value: widReqType });
    };

    reload() {

        this.zoomOut = !this.zoomOut;
        this.reloadWidgetEvent.emit({ value: this.zoomOut });
        this.launchDate = new Date();
        let sec = this.launchDate.getSeconds();
        let min = this.launchDate.getMinutes();
        let hour = this.launchDate.getHours();
        //console.log("header ", this.launchDate);
        this.launchTime = hour + ":" + min + ":" + sec;
        this.launchTime = (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        this.menuFlag = false;

    }

    downloadAsImage(event: any) {
        this.menuFlag = false;
        console.log("downloadAsImage title:", this.ititle);
        if (this.isStackedBar) {
            this.downloadImageEvent.emit({ value: true, title: this.ititle });
        } else {
            let containerNode = this.widgetContainer.nativeElement;
            let svgNode = containerNode.getElementsByTagName("svg")[0];
            let fileType = "image/png";

            let dataURL = svgNode.toDataURL(fileType, {
                renderer: "canvg",
                callback: function (data) {
                    //console.log("***  data", data);
                    let image = new Image();
                    image.src = data;
                }
            });

            //console.log("*** after canvas.toDataURL", dataURL);
            let binStr = atob(dataURL.split(',')[1]);
            let len = binStr.length;
            let arr = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            let blob = new Blob([arr], { type: fileType });

            let fileName = this.ititle;
            //fileName.replace(/ /g, '_');
            if (fileName == "") { fileName = "Widget"; }
            saveAs(blob, fileName + '.png');
        }
    }

    getPage(menuIndex) {
        console.log("--- selectedMenuItem: ", menuIndex);
        //{"module":"MM","office":"FO","action":"MMFODeal_Settlement","displayName":"MM - Deal Settlement","JSP":"MMFrontOfficeLoader.jsp","URL":""},{"module":"MM","office":"FO","action":"MMFORisk_Sheet","displayName":"MM - Risk Sheet","JSP":"MMFrontOfficeLoader.jsp","URL":""}

        //hide operations menu list
        this.menuFlag = false;

        console.log("widgetReqType::", this.widgetReqType);
        let jspName = '';
        let urlPath = '';
        let action = '';
        let winPath = "";
        let winName = "";

        if (this.menuList[menuIndex].JSP != null) {
            console.log("---Menu Item - JSP: ", this.menuList[menuIndex].JSP);
            jspName = this.menuList[menuIndex].JSP;
        }
        if (this.menuList[menuIndex].URL != null) {
            console.log("---Menu Item - URL: ", this.menuList[menuIndex].URL);
            urlPath = this.menuList[menuIndex].URL;
        }
        if (this.menuList[menuIndex].action != null) {
            console.log("---Menu Item - action: ", this.menuList[menuIndex].action);
            action = this.menuList[menuIndex].action;
        }

        //let tmpPath = "FISFrontOfficeLoader.jsp";
        //let tmpModule = "FI";
        //let tmpOffType = "FO";
        //let tmpFileType = "applet";
        //let tmpActionType = "FISDeal_Capture";                    

        this.globalService.progressMode = "indeterminate";
        let tmpPath = jspName;
        let tmpModule = this.widgetInfo[0].MODULE;
        let tmpOffType = this.widgetInfo[0].OFFICETYPE;
        let tmpFileType = "applet";
        let tmpActionType = this.menuList[menuIndex].action;

        if (this.menuList[menuIndex].module != null) {
            if (this.menuList[menuIndex].module != "") {
                tmpModule = this.menuList[menuIndex].module;
                console.log("-- Menu Item Module: " + tmpModule);
            }
        }
        if (this.menuList[menuIndex].office != null) {
            if (this.menuList[menuIndex].office != "") {
                tmpOffType = this.menuList[menuIndex].office;
                console.log("-- Menu Item Office: " + tmpOffType);
            }
        }

        let indx1 = openedWinNames.indexOf("launcher");
        let appLauncher;
        if (indx1 > -1) {
            appLauncher = openedWindows[indx1];
        }

        let windowPath = tmpPath;
        let winname = tmpModule + tmpOffType;

        let indx = openedWinNames.indexOf(winname);
        console.log("Window Indx: " + indx);

        if (tmpFileType == 'applet' && indx > -1) {
            console.log("####### this.appLauncher: ", appLauncher);
            console.log("####### this.appLauncher.closed: ", appLauncher.closed);
            if (appLauncher && !appLauncher.closed) {
                this.globalService.progressMode = "";
                if (tmpOffType == 'FO')
                    appLauncher.frames[winname].document.FrontOffice.performAction(tmpActionType);
                else
                    appLauncher.frames[winname].document.BackOffice.performAction(tmpActionType);
                return;
            }
            else {
                appLauncher = undefined;
                openedWinNames = [];
                openedWindows = [];
                //openedAppNames = [];
            }
        }
        windowPath = document.location.protocol + '//' + document.location.host + "/" + encodeURI(windowPath + "?showMenu=false&actionType=" + tmpActionType);
        console.log("--- windowPath: " + windowPath);

        let popupWin = void 0;
        if (tmpFileType == 'applet') {
            console.log("####### this.appLauncher111: ", appLauncher);
            if (!appLauncher) {
                console.log("####### this.appLauncher123: ", appLauncher);
                popupWin = parent.window.open("applauncher.html", "_blank", "directories=no, status=no, menubar=no, scrollbars=no, resizable=no,top=100,left=200");
                //popupWin.blur();
                //parent.window.focus();
                appLauncher = popupWin;
                appLauncher.focus();
                openedWindows.push(popupWin);
                openedWinNames.push("launcher");
            }
            setTimeout(() => {
                let indx1 = openedWinNames.indexOf("launcher");
                let launcherPage = openedWindows[indx1];
                //console.log("####### window path: " , launcherPage);
                //console.log("####### winname: " , winname);
                //console.log("launcherPage[winname]: " , launcherPage[winname]);
                launcherPage[winname].location = windowPath;
                openedWindows.push(launcherPage.frames[winname]);
                openedWinNames.push(winname);
                //openedAppNames.push(winname);
            }, 2000);
        }

        setTimeout(() => {
            this.globalService.progressMode = "";
        }, 15000);
    }

    toggle() {
        this.opened = !this.opened;
    }
}
