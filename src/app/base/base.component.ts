import {Component, Inject, Input, ElementRef, ViewChild, OnInit} from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {DataService} from '../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {GlobalStyleComponent} from '../services/global.style';
import {GlobalHelpService} from '../services/global.help';
import {GlobalService} from '../services/global.service';
import {ServiceLocator} from '../services/locator.service';
import {PreferencesService} from '../services/preferences.service';
import {EntitlementService} from '../services/entitlement.service';
// declare var __moduleName: string;

@Component({
// moduleId: __moduleName,
    selector: 'BaseComponent',
    template: '<p></p>',
    
})
    
export  class BaseComponent {
    
    public modalFlag: boolean = false;
    public response:any;
    public message: any;
    public isAcceptOverride: boolean = false;
    public isAcceptError: boolean = false;
    public operationType: string = '';
    public choiceList: any = [];
    
    //public officeType: string = sessionStorage.officeType;
    
    public dataService: DataService;
    public preferencesService: PreferencesService;
    public globalHelpService: GlobalHelpService;
    public translate: TranslateService;
    public globalService: GlobalService;
    public globalStyle: GlobalStyleComponent;
    public router: Router;
	public activatedRoute: ActivatedRoute;
	public moduleType: string;
	public officeType: string;
	public subModuleType: string;
	public dataServicePath: string;
	public entitlementService: EntitlementService;
	public branch: string;
	public count: number = 1;
    
    public isSearchdisable: boolean = true;
    public activeSubscription: any;
	public contextBasedUrl = "";
	public qryParams: any;
    
    constructor(){
        this.dataService = ServiceLocator.injector.get(DataService);
        this.preferencesService = ServiceLocator.injector.get(PreferencesService);
        this.globalHelpService = ServiceLocator.injector.get(GlobalHelpService);
        this.translate = ServiceLocator.injector.get(TranslateService);
        this.globalService = ServiceLocator.injector.get(GlobalService);
        this.globalStyle = ServiceLocator.injector.get(GlobalStyleComponent);
        this.router = ServiceLocator.injector.get(Router);
		this.activatedRoute = ServiceLocator.injector.get(ActivatedRoute);
		this.entitlementService = ServiceLocator.injector.get(EntitlementService);
		
		this.activeSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.moduleType = params['moduleType'];
			this.officeType = params['officeType'];
			this.subModuleType = params['subModule'];
			this.qryParams = params;
			
			//this.contextBasedUrl = "" + this.module +
		});	
    }

    ngOnDestroy() {
		if(this.activeSubscription){
			this.activeSubscription.unsubscribe();
		}
	}
	
}