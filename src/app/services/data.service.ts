import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { saveAs } from 'file-saver';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()

export class DataService {

    baseUrl: string = '';
    rootCtx: string = "/ucf/";


    public entitlements: any;
    public protocolType: string = window.location.protocol + "//";

    constructor(@Inject(HttpClient) private _http: HttpClient,
        @Inject(GlobalService) private globalService: GlobalService,
        private router: Router) { }

    /**
     * This method is use to get List of items based on requestType and Branch
     */
    getListItems1(listName: string) {
        this.entitlements = this.globalService.getEntitlements();
        if (this.entitlements != undefined) {
            listName = listName + "," +
                this.entitlements[0].superuser + "," +
                this.entitlements[0].moduleName + "," +
                this.entitlements[0].dispName;
        }

        console.log("DataService.getListItems: " + listName);

        return this._http.get(this.baseUrl + this.rootCtx + "services/mmdeal/" + listName + "/" + this.globalService.getBranch())
            .pipe((tap<any>((res: Response) => res.json())));
    }

    /**
 * This method is use to get List of items based on requestType and Branch (POST method)
 */
    getListItemsByPost(listName: string, data: any) {
        console.log("DataService.getListItemsByPost: " + listName);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });
        console.log("submitDealDetails: *** data: " + data + "; Url: " + this.baseUrl + "/" + listName);

        return this._http.post(this.baseUrl + this.rootCtx + "services/" + listName, data, options)
            .pipe((tap<any>((res: Response) => res.json())));
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
            .pipe(tap<any>((res: Response) => {
                this.globalService.progressMode = "";
                return res.json();
            }));
    }
    /**
     * This method is use to perform http.get operation based on path and search string
     * Get deal (searchStr is dealRefNum) and for user list (searchStr is branchNumber) 
     * Header Information searchStr is empty
     */
    loadPage(path: string) {

        console.log("Load Page " + path);
        return this._http.get(path)
            .pipe((tap<any>((res: Response) => res.json())));
    }

    //This method is use to submit data to service and gets response
    submit(data: any, path: any): any {
        console.log("data*********", data);
        console.log("path*********", path);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this._http.post(this.baseUrl + path, data, options)
            .pipe((tap<any>((res: Response) => res.json())
            .catch((res) => {
                this.globalService.progressMode = "";
                return Observable.throw('Server error');
            })));

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

    handleError() {
        console.log("***********handle error ******");
        this.globalService.progressMode = "";
        //console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
        return Observable.throw('Server error');
    }

    uploadIndices(fileList, path) {
        console.log("********* uploadIndices called");
        if (fileList.lenght == 0) {
            setTimeout(() => {
                console.log("********* stop called");
            }, 8000);

        } else {
            let file = fileList[0];
            let formData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
            headers.append('Accept', 'application/json');
            //let data = JSON.stringify(form);
            let options = new RequestOptions({ headers: headers, method: "post" });

            console.log("uploadIndex: *** formData: " + formData + "; baseUrl: " + this.baseUrl + path);
            return this._http.post(this.baseUrl + path, file, options)
                .map((res) => { return res.json(); });
        }
    }

    /**
     * Ajax call to download PDF from server side examples DealSlip, Swift Message
     */
    downloadPDF(path: string, requestParams: any, fileName: string) {
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", path, true);

        xmlhttp.responseType = 'blob';
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xmlhttp.onreadystatechange = () => {//Call a function when the state changes.
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let blob = new Blob([xmlhttp.response], { type: 'application/pdf' });
                //Save File
                saveAs(blob, fileName);
                //Open File
                let url = window.URL.createObjectURL(blob);
                window.open(url);
            }
        };

        //branchId and branchName hard coded
        xmlhttp.send(requestParams);
    }

    /**
     * Ajax call to download html file from server side
     */
    downloadFile(form, path) {
        console.log("inside download ");

        this.globalService.progressMode = "indeterminate";

        console.log("path*********", path);
        let data = JSON.stringify(form);
        console.log("data*********", data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("this.baseUrl + path, data, options ", this.baseUrl + path, data, options);
        return this._http.post(this.baseUrl + path, data, options)
            .map((res) => {
                console.log("rescsf ", res);
                this.globalService.progressMode = "";
                let blob = new Blob([res._body], { type: 'application/html' });
                console.log("blob ", blob);
                //Save File
                saveAs(blob, form.fileName);
                return res;
                console.log("  rezs   ", res);
            })
            .catch(() => {
                this.globalService.progressMode = "";
            });
    }



}
