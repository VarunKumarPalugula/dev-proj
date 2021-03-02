import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';



@Injectable()
export class PreferencesService {

    baseUrl: string = '/services';

    public entitlements: any;

    constructor(@Inject(HttpClient) private _http: HttpClient,
        @Inject(GlobalService) private globalService: GlobalService,
        private router: Router) { }

    /*handleError(error: any) {
        console.log("***********handle error ******");
        this.globalService.progressMode = "";
        console.error(error);
        //return Observable.throw(error.json().error || 'Server error');
    }*/

    /**
     * This method is use to set Analytic and Favorite Preferences 
     */
    savePreferences(list: string, requestType: string) {
        console.log("Save preferences for request : " + requestType + " ; data :" + list);
        this.entitlements = this.globalService.getEntitlements();

        return this._http.get(this.baseUrl + "/Preferences" + "/" + this.entitlements[0].dispName + "/" + this.entitlements[0].moduleName + "/" + requestType + "/" + list)
            .subscribe(
                // Successful responses call the first callback.
                res => res,
                // Errors will call this callback instead:
                err => {
                    console.log('Something went wrong!');
                    console.log("***********handle error ******");
                    this.globalService.progressMode = "";
                }
            );
        //.map((res: Response) => res.json())
        //.catch(this.handleError);
    }

    /**
     * This method is use to reset Analytic and Favorite Preferences 
     */
    resetPreferences(requestType: string) {
        console.log("Reset preferences for request : " + requestType);
        this.entitlements = this.globalService.getEntitlements();

        return this._http.get(this.baseUrl + "/Preferences" + "/" + this.entitlements[0].dispName + "/" + this.entitlements[0].moduleName + "/" + requestType + "/" + "true")
            .subscribe(
                // Successful responses call the first callback.
                res => res,
                // Errors will call this callback instead:
                err => {
                    console.log('Something went wrong!');
                    console.log("***********handle error ******");
                    this.globalService.progressMode = "";
                }
            );
        //.map((res: Response) => res.json())
        //.catch(this.handleError);
    }

    //Dynamic loading added this 
    page: string = '';
    loadDashboard() {
        console.log("Inside Load Dashboard");
        this.page = this.globalService.getHomePage();
        console.log("Page Before =" + this.page);
        this.globalService.isConsole = false;

        //if(this.page == 'OneTreasury'){
        this.page = 'Treasury';
        this.router.navigate(['/OneTreasury']);
        /*} else {
            this.page = 'OneTreasury';
            this.router.navigate(['/Treasury']);
        }*/
        console.log("Page After =" + this.page);
        this.globalService.setHomePage(this.page);
        console.log("After loading dash board");
    }

}
