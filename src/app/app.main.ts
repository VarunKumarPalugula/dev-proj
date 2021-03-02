import {Component,Inject, OnInit, Renderer2, ElementRef, AfterViewInit} from '@angular/core';
import { FieldComponent } from './base/iField';


@Component({
  selector: 'treasury',  
  templateUrl: 'app.main.html'
})

export class AppComponent extends FieldComponent implements OnInit { //, AfterViewInit{
  
  title: string = 'Treasury';
  isLogin: boolean = false;
  listItems:any = null;
  public headerList: any = [];  
  public entitlementsList: any = [];  
  public treasuryModule: string;    
  public loadMainPage: boolean = false;
  activeChildRoute: boolean;

    constructor(_renderer: Renderer2, _elementRef: ElementRef){
        super(_renderer, _elementRef);
    }
   
  ngOnInit(){
	  this.activeChildRoute = true;
      this.globalStyle.setLocale("en");
      this.treasuryModule = sessionStorage.module;
      console.log("********* App.Main initialized"); 
	  
	  this.listItems = [{"username": "super_user",
                    "datetime": "2016-11-07 12:29:40.407",
                    "moduleName": "super",
                    "superuser": "true",
                    "dispName": "Super User"}];
	  
      this.dataService.getData("", "/data/loginDetails/FIS").subscribe((listItems: any) => {
            this.headerList = listItems;
            //this.globalHelpService.setUserConsoleMessage(this.headerList.logintime);
            this.globalService.setModule(this.headerList.module);
            this.globalService.setUserName(this.headerList.username);
            this.globalService.setLoginUserBranch(this.headerList.branch);
            this.globalService.setDealer(this.headerList.dealer);
            this.globalService.setLoginTime(this.headerList.logintime);
            this.globalService.setApplnDate(this.headerList.applndate);
			  	  this.globalService.setDashboardFlag(this.headerList.showDashboard); 
			  this.loadMainPage = true;
              this.activeChildRoute = false; 
       });
  }
    
}