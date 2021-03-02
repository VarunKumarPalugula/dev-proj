import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { GlobalService } from './global.service';


//Authentication Service
@Injectable()
export class AuthService {

    baseUrl: string = '/services';

    constructor(@Inject(HttpClient) private _http: HttpClient,
        @Inject(GlobalService) private globalService: GlobalService) { }


    /**
     * This method is used to get entitlements based on login user
     */
    authentication(userName: string, password: string) {
        console.log("Login userName : " + userName + " ; password :" + password);

        return this._http.get(this.baseUrl + "/Login" + "/" + userName + "/" + password)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }


    handleError(error: any) {
        console.log("***********handle error ******");
        this.globalService.progressMode = "";
        console.error(error);
    }
}
