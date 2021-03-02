import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

//File Server to download PDF file
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { ILineItem } from '../interfaces/ILineItem';
import { GlobalService } from './global.service';

@Injectable()
export class DataService {

    baseUrl: string = '';

    public entitlements: any[];
    public protocolType: string = window.location.protocol + "//";

    constructor(@Inject(HttpClient) private _http: HttpClient,
        @Inject(GlobalService) private globalService: GlobalService,
        private router: Router) { }

    /**
     * This method is use to get List of items based on requestType and Branch
     */
    getListItems(listName: string) {
        this.entitlements = this.globalService.getEntitlements();
        if (this.entitlements != undefined) {
            listName = listName + "," +
                this.entitlements[0].superuser + "," +
                this.entitlements[0].moduleName + "," +
                this.entitlements[0].dispName;
        }

        console.log("DataService.getListItems: " + listName);
        return this._http.get(this.baseUrl + "/ucf/services/mmdeal/" + listName + "/" + this.globalService.getBranch())
            .map((res: Response) => res.json());
    }

    /**
     * This method is use to perform http.get operation based on path and search string
     * Get deal (searchStr is dealRefNum) and for user list (searchStr is branchNumber) 
     * Header Information searchStr is empty
     */
    getData(requestKey: string, path: string) {

        console.log("DataService.getData Path : " + path + " and key : " + requestKey);
        let restPath = '';

        if (path && path.startsWith("/data")) {
            console.log("***** option1");
            restPath = "services" + path + requestKey;
        } else {
            console.log("***** option2");
            restPath = this.protocolType + location.host + path + requestKey;
        }
        console.log("RestPath :" + restPath);

        let reqHeaders = new Headers({
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        return this._http.get(restPath, { headers: reqHeaders })
            .map((res: Response) => res.json());
    }

    /**
     * This method is use to perform http.get operation based on path and search string
     * Get deal (searchStr is dealRefNum) and for user list (searchStr is branchNumber) 
     * Header Information searchStr is empty
     */
    loadPage(path: string) {

        console.log("Load Page " + path);
        return this._http.get(path)
            .map((res: Response) => res.json());
    }

    //This method is use to submit data to service and gets response
    submit(data: any, path: any) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.baseUrl + path, data, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);

        /*this._http.post(this.baseUrl+path,data, options) 
            .subscribe(
            data => {
                    //alert('Your form has been submitted!');
                this.globalService.progressMode = "";
                console.log("********* stop called",data);
            },
            error => {
                this.globalService.progressMode = "";
                console.log("********* stop called");
                //alert(error.json().message)
                }
          );
        */
    }

    /**
     * This method is use to form data to json and submits the request
     */
    submitForm(form: any, path: any) {
        this.globalService.progressMode = "indeterminate";
        //this if condition is to test the progress bar logic
        if (form == "") {
            setTimeout(() => {
                this.globalService.progressMode = "";
                console.log("********* stop called");
            }, 8000);

        } else {
            let data = JSON.stringify(form);
            console.log("*********** data: " + data);
            return this.submit(data, path);
        }
    }

    handleError(error: any) {
        console.log("***********handle error ******");
        this.globalService.progressMode = "";
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    }

    /**
     * Ajax call to download PDF from server side examples DealSlip, Swift Message
     */
    downloadPDF(path: string, requestParams: any, fileName: string) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest(); //for IE7+, Firefox, Chrome, Opera, Safari
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //for IE6, IE5
        }

        xmlhttp.open("POST", path, true);

        xmlhttp.responseType = 'blob';
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xmlhttp.onreadystatechange = function () {//Call a function when the state changes.
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var blob = new Blob([this.response], { type: 'application/pdf' });
                //Save File
                FileSaver.saveAs(blob, fileName);
                //Open File
                var url = window.URL.createObjectURL(blob);
                window.open(url);
            }
        }

        //branchId and branchName hard coded
        xmlhttp.send(requestParams);
    }

}
