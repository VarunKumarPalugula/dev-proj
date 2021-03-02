import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, ApplicationRef, Injector, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
// import { MdIconRegistry, MaterialModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';


import { PageLoaderComponent } from '../../../page.loader';

import { ProgressBarComponent } from '../../../common/progress/iProgress';




import { EntitlementService } from '../../../services/entitlement.service';
import { GlobalService } from '../../../services/global.service';
import { GlobalHelpService } from '../../../services/global.help';
import { GlobalStyleComponent } from '../../../services/global.style';
import { ServiceLocator } from '../../../services/locator.service';
import { DataService } from '../../../services/data.service';
import { PreferencesService } from '../../../services/preferences.service';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { BlotterMainComponent } from './blotter.main';
import { BlotterComponent } from './component/iBlotter';
import { IconComponent } from '../../../common/icon/iIcon';
import { appRoutingProviders, routing } from '../../../app.routing';
import { BlotterHomeComponent } from './blotter.home';
import { MaterialModule } from '../../../../app/material.module';

declare var System: any;

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule, CommonModule, FormsModule,
        //  HttpModule, 
         routing,
         MaterialModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), TranslateModule.forRoot()
    ],
    exports: [
        CommonModule, FormsModule, PageLoaderComponent, ProgressBarComponent, BlotterMainComponent, 
        // TreeGridComponent, SpoolPdfComponent,
        // SpoolComponent, ButtonComponent, 
        IconComponent, 
        // Tab, Tabs, 
        // jqxGridComponent, jqxTreeGridComponent, jqxMenuComponent,
        // jqxChartComponent, jqxDropDownListComponent,
         BlotterComponent
    ],
    declarations: [
        BlotterHomeComponent, PageLoaderComponent, ProgressBarComponent, BlotterMainComponent, 
        // TreeGridComponent, SpoolPdfComponent,
        // SpoolComponent, ButtonComponent,
         IconComponent, 
        //  Tab, Tabs,
        // jqxGridComponent, jqxTreeGridComponent, jqxMenuComponent, jqxChartComponent,
        //  jqxDropDownListComponent, 
         BlotterComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        // MdIconRegistry,
         appRoutingProviders, DataService, GlobalService, GlobalHelpService, GlobalStyleComponent, PreferencesService,
        EntitlementService, ProgressBarComponent, { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    entryComponents: [BlotterHomeComponent],
    bootstrap: [BlotterHomeComponent]
})

export class BlotterModule {

    //Required to instantiate all common services in Base class iField
    constructor(private injector: Injector,
        //  mdIconRegistry: MdIconRegistry, 
         public sanitizer: DomSanitizer,
        private router: Router, 
        // private _http: Http
        ) {
        //SVG ICON Replacement
        // mdIconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('/ucf/assets/svgicons/mdi.svg'));

        ServiceLocator.injector = this.injector;
    }
}