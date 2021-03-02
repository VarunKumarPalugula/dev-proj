import { Injectable } from '@angular/core';
import { IUserConsole } from '../interfaces/IAuditInfo';

@Injectable()
export class GlobalHelpService {

    public globalMessage: string;
    public userConsoleMessageArr: any=[];
    public refNoArr: Array<string> = [];
    public notifArray: Array<string> = [];


    constructor() {
        console.log("****** Glaobal Help initialized-----------------");
    }

    setGlobalMessage(message: string) {
        this.globalMessage = 'Enter ' + message;
    }

    getGlobalMessage() {
        return this.globalMessage;
    }

    setUserConsoleMessage(message: IUserConsole) {
        let currDate = new Date();
		let consoleMsgKey = 'consoleMessage' + currDate.getDate() + currDate.getMonth() + currDate.getFullYear() + localStorage.getItem('loginUser');
		
		let hrs:string = "" + currDate.getHours();
		let mns:string = "" +currDate.getMinutes();
		let secs:string = "" +currDate.getSeconds();

		if(currDate.getHours() < 10){
		hrs="0"+currDate.getHours();
		}

		if(currDate.getMinutes() < 10){
		mns="0"+currDate.getMinutes();
		}

		if(currDate.getSeconds() < 10){
		secs="0"+currDate.getSeconds();
		}
		
        let cDate = hrs + ":" + mns + ":" + secs;
		console.log("date**********",cDate);
        if ((this.userConsoleMessageArr.length == 0) && (JSON.parse(localStorage.getItem(consoleMsgKey))) != null && (JSON.parse(localStorage.getItem(consoleMsgKey))).length > 0) {
            this.userConsoleMessageArr = JSON.parse(localStorage.getItem(consoleMsgKey));
        }
        this.userConsoleMessageArr.unshift({ "date": cDate , "message" : message });
        localStorage.setItem(consoleMsgKey, JSON.stringify(this.userConsoleMessageArr));
    }

    getUserConsoleMessage() {
		let currDate = new Date();
		let consoleMsgKey = 'consoleMessage' + currDate.getDate() + currDate.getMonth() + currDate.getFullYear() + localStorage.getItem('loginUser');
		for (var key in localStorage){
		   //To remove old storage information
		   if (key == 'consoleMessage'){
				localStorage.removeItem(key);
		   }
		   //To remove one day old information, retains information till the session is valid
		   if (key.startsWith('consoleMessage') && key != consoleMsgKey) {
				localStorage.removeItem(key);
		   }
		}
        return JSON.parse(localStorage.getItem(consoleMsgKey));
    }

    setRefNo(refNo: string) {
        if ((this.refNoArr.indexOf(refNo)) == -1) {
            this.refNoArr.unshift(refNo);
            if (this.refNoArr.length > 10) {
                this.refNoArr.pop();
            }
            localStorage.setItem("refNumber", JSON.stringify(this.refNoArr));
        }
    }

    getRefNo() {
        return JSON.parse(localStorage.getItem("refNumber"));
    }
    
    setNotification(notify: any) {
        if (this.notifArray.length > 9) {
            this.notifArray.splice(-1);
        }
        this.notifArray.unshift(notify);
    }
    
    getNotification() {
        return this.notifArray;
    }

}