import { Injectable, Inject } from '@angular/core';
import { GlobalService } from './global.service';
//import {FieldComponent} from 'app/base/iField';

declare var openedAppNames: any;
declare var openedWindows: any;
declare var openedWinNames: any;
declare var openedRepWinNames: any;
declare var openedRepWindows: any;

@Injectable()
export class EntitlementService {
    public appLauncher: any;

    constructor(@Inject(GlobalService) private globalService: GlobalService) {
        console.log("****** EntitlmentService initialized");
    }

    public openAngularPopupWindow(queryParams) {
        console.log("########### Received query params: ", queryParams);
        this.globalService.setReportParams(queryParams);
        //var query="?";

        let winname = queryParams['report_service_id'] + queryParams['name'];
        let indx = openedRepWinNames.indexOf(winname);
        console.log("Report Window Indx: " + indx);
        if (indx > -1) {
            console.log("******Is window Closed", openedRepWindows[indx].closed);
            if (!openedRepWindows[indx].closed) {
                openedRepWindows[indx].focus();
                return;
            }
            else {
                openedRepWinNames.splice(indx, 1);
                openedRepWindows.splice(indx, 1);
            }
        }
        /*var queryKeys = Object.keys(queryParams);
        
        for(var i = 0; i < queryKeys.length; i++){
            query = query + queryKeys[i] + "=" + queryParams[queryKeys[i]] + "&";
        }*/
        let popupWin = parent.window.open(queryParams.path + "?report=" + queryParams['name'], winname, "directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,top=50,left=100");

        openedRepWindows.push(popupWin);
        openedRepWinNames.push(winname);
    }

    public saveWindowLocation(winname) {
        if (winname != 'None') {
            let indx1 = openedWinNames.indexOf("launcher");
            let launcherPage = openedWindows[indx1];
            let appWin = openedWindows[openedWinNames.indexOf(winname)];
            console.log("########### winname: ", winname, launcherPage);
            if (appWin && !appWin.closed) {
                if (launcherPage && !launcherPage.closed) {
                    if (winname.endsWith('FO')) {
                        console.log("###########Front office window location being saved ");
                        launcherPage.frames[winname].document.FrontOffice.performAction("SAVEWINLOC");
                    } else {
                        console.log("###########Back office window location being saved ");
                        launcherPage.frames[winname].document.BackOffice.performAction("SAVEWINLOC");
                    }
                }
            }
        }
        //setTimeout(function(){ 
        //  window.resizeTo(screen.availWidth, screen.availHeight);
        //  window.focus();
        //}, 1000);
    }

    public openWindow(selectedMenuItem) {

        console.log("########## selectedMenuItem: ", selectedMenuItem);
        this.globalService.progressMode = "indeterminate";
        var tmpPath = "";
        var tmpModule = "";
        var tmpOffType = "";
        var tmpFileType = "";

        tmpPath = selectedMenuItem.path;
        tmpModule = selectedMenuItem.moduleType;
        tmpOffType = selectedMenuItem.officeType;
        tmpFileType = selectedMenuItem.fileType;

        if (tmpPath == null) {
            tmpPath = selectedMenuItem.path;
            tmpFileType = selectedMenuItem.fileType;
        }

        // console.log("path**********" + selectedMenuItem.path, "module***********", selectedMenuItem.moduleType, "offType***********", selectedMenuItem.officeType, "actionType***********", selectedMenuItem.actionType, "title***********", selectedMenuItem.title);

        let windowPath = tmpPath;

        let winname = '';
        if (tmpModule == null || tmpOffType == null) {
            winname = selectedMenuItem.name;
        }
        else {
            winname = tmpModule + tmpOffType;
        }

        console.log("*********winname***", winname);

        let indx = openedWinNames.indexOf(winname);
        console.log("Window Indx: " + indx);

        if (tmpFileType == 'other' && indx > -1) {
            console.log("******", openedWindows[indx].closed);
            if (!openedWindows[indx].closed) {
                this.globalService.progressMode = "";
                return;
            } else {
                openedWinNames.splice(indx, 1);
                openedWindows.splice(indx, 1);
                openedAppNames.splice(openedAppNames.indexOf(winname), 1);

            }
        } else if (tmpFileType == 'applet' && indx > -1) {
            console.log("####### this.appLauncher.closed: ", this.appLauncher.closed);
            if (this.appLauncher && !this.appLauncher.closed) {

                this.globalService.progressMode = "";
                if (tmpOffType == 'FO')
                    this.appLauncher.frames[winname].document.FrontOffice.performAction(selectedMenuItem.actionType);
                else
                    this.appLauncher.frames[winname].document.BackOffice.performAction(selectedMenuItem.actionType);

                return;
            } else {
                this.appLauncher = undefined;
                openedWinNames = [];
                openedWindows = [];
                openedAppNames = [];

            }
        }

        windowPath = document.location.protocol + '//' + document.location.host + "/" + encodeURI(windowPath + "?showMenu=false&actionType=" + selectedMenuItem.actionType);
        console.log("windowPath: " + windowPath);
        if (selectedMenuItem.isPopup) {
            let popupWin: any;
            if (tmpFileType == 'other') {
                if (!tmpPath.startsWith('http'))
                    tmpPath = document.location.protocol + '//' + document.location.host + "/" + tmpPath;
                popupWin = parent.window.open(tmpPath, "_blank", "directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,top=100,left=200");
                openedWindows.push(popupWin);
                openedWinNames.push(winname);
                setTimeout(() => {
                    this.globalService.progressMode = "";
                }, 1000);
                return;
            } else if (tmpFileType == 'applet') {
                console.log("####### this.appLauncher111: ", this.appLauncher);
                if (!this.appLauncher || (this.appLauncher && this.appLauncher.closed)) {
                    console.log("####### this.appLauncher123: ", this.appLauncher);
                    popupWin = parent.window.open("applauncher.html", "_blank", "directories=no, status=no, menubar=no, scrollbars=no, resizable=no,top=100,left=200");
                    //popupWin.blur();
                    //parent.window.focus();
                    this.appLauncher = popupWin;
                    this.appLauncher.focus();

                    openedWindows.push(popupWin);
                    openedWinNames.push("launcher");
                }
                setTimeout(() => {
                    let indx1 = openedWinNames.indexOf("launcher");
                    let launcherPage = openedWindows[indx1];
                    console.log("####### window path: ", windowPath);
                    //console.log("####### winname: " , winname);
                    //console.log("launcherPage[winname]: " , launcherPage[winname]);
                    launcherPage[winname].location = windowPath;
                    openedWindows.push(launcherPage.frames[winname]);
                    openedWinNames.push(winname);
                    openedAppNames.push(winname);

                }, 2000);
            };
            setTimeout(() => {
                this.globalService.progressMode = "";
            }, 15000);
        }
    }
    
    openSelectedWindow(parentMenu, selectedMenuItem, menuIndx) {
        this.openWindow(selectedMenuItem);
    }
}