import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GlobalService } from './global.service';
import * as moment from 'moment';


@Injectable()
export class NotifService {

    public notifArray: any = [];
    public alertMsg: any = [];
    public msgEndIndx: number = 0;
    public newAlertCnt: number = 0;
    public currMsgIndx: number = 0;
    public msgStartIndx: number = 0;
    public applnDate: any = null;
    public userId: any = null;
    public quotes: any = [];

    constructor( private globalService: GlobalService, private dataService: DataService, ) {
        console.log( "****** NotifService initialized    -----------------" );
        this.init();
    }

    init() {
        let _this = this;
        localStorage.setItem( this.globalService.getUserName() + "_notifyList", "" );
        setTimeout( function() {
            _this.fetchCategories();
            _this.fetchData();
        }, 5000 );
    }

    fetchCategories() {
        let _this = this;
        this.dataService.getData( "", this.dataService.rootCtx + "services/data/categories/" + this.globalService.getUserName() ).subscribe( function( listItems ) {
            if ( listItems.length > 0 ) {
                localStorage.setItem( _this.globalService.getUserName() + "_categories", listItems );
            }
            _this.sendNotifRequest( _this.msgEndIndx );
        } );
    }

    fetchData() {
        let _this = this;
        let timeoutId = setInterval( function() {
            _this.applnDate = _this.globalService.getApplnDate();
            //Change in appDate local storage should be reset
            if ( localStorage.getItem( "appDate" ) ) {
                let myDate = moment( _this.applnDate, '' || 'DD-MMM-YYYY ' ).format( 'DD-MMM-YYYY' );
                if ( JSON.parse( localStorage.getItem( "appDate" ) ) != myDate ) {
                    _this.msgEndIndx = 0;
                    localStorage.setItem( _this.globalService.getUserName() + "_notifyList", "" );
                }

            }
            _this.sendNotifRequest( _this.msgEndIndx );
        }, 120000 );
    }

    sendNotifRequest( msgEndIdx ) {
        let _this = this;
        this.alertMsg = [];
        let session = '<%=Session[this.globalService.getUserName()] != null%>';
        if ( session ) {
            let cat = localStorage.getItem( this.globalService.getUserName() + "_categories" );
            this.msgEndIndx = msgEndIdx;
            this.dataService.getData( "", this.dataService.rootCtx + "services/data/getAlertMsgs/" + cat + "/" + this.msgEndIndx ).subscribe( function( listItems ) {
                if ( listItems[0].msgList ) {
                    _this.quotes = listItems[0].msgList;
                    localStorage.setItem( "appDate", JSON.stringify( listItems[0].applnDate ) );
                    if ( _this.quotes.length > 0 ) {
                        _this.saveToLocalStorage( _this.quotes );
                        if ( _this.msgEndIndx > 0 ) {
                            _this.showAlertMsgs( _this.quotes );
                        }
                    }
                    _this.currMsgIndx = 0;
                    _this.msgEndIndx = listItems[0].lstIndx;
                }
            } );
        }
    }

    showAlertMsgs( alerts ) {
        let _this = this;
        let msgIdx = 0;
        let msgTimer = setInterval( function() {
            if ( alerts && alerts.length > msgIdx ) {
                _this.alertMsg = JSON.stringify( alerts[msgIdx] );
                _this.newAlertCnt++;
                msgIdx++;
            }
        }, 1000 );
    }
    
    saveToLocalStorage( notifications ) {
        if ( localStorage.getItem( this.globalService.getUserName() + "_notifyList" ) ) {
            let arr = JSON.parse( localStorage.getItem( this.globalService.getUserName() + "_notifyList" ) );
            this.notifArray = notifications.concat( arr );
            localStorage.setItem( this.globalService.getUserName() + "_notifyList", JSON.stringify( this.notifArray ) );
        }
        else {
            localStorage.setItem( this.globalService.getUserName() + "_notifyList", JSON.stringify( notifications ) );
        }
    }
    
    setNotification( notify ) {
        if ( localStorage.getItem( "notifyList" ) ) {
            this.notifArray = JSON.parse( localStorage.getItem( this.globalService.getUserName() + "_notifyList" ) );
            this.notifArray.unshift( notify );
            localStorage.setItem( this.globalService.getUserName() + "_notifyList", JSON.stringify( this.notifArray ) );
        }
        else {
            this.notifArray.unshift( notify );
            localStorage.setItem( this.globalService.getUserName() + "_notifyList", JSON.stringify( this.notifArray ) );
        }
    }
    
    getNotification() {
        if ( localStorage.getItem( this.globalService.getUserName() + "_notifyList" ) == "" )
            return "";
        else
            return JSON.parse( localStorage.getItem( this.globalService.getUserName() + "_notifyList" ) );
    }
    
    delNotif( index ) {
        this.notifArray.splice( index, 1 );
    }

}