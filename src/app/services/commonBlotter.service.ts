import { Injectable } from '@angular/core';
// import { HttpClient } from '';
// import { carsInterface } from "./commonBlotterInterface";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {

  constructor(private _http: HttpClient) { }
  private _url = "/ucf/assets/data/tempdata.json";

getcars():Observable<any>{
  
  return this._http.get<any>(this._url);

}

}
