import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// import { MaterialModule } from '@angular/material';
// import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';

import { JQXModule } from '../modules/jqx.module';
import { BasicModule } from '../modules/basic.module';
import { MainModule } from '../modules/main.module';
import { ExportModule } from '../modules/export.module';

import { HeaderComponent } from '../common/header/iHeader';
// import { LeftSideNavComponent } from '../common/leftsidenav/iLeftSideNav';
// import { HelpContentComponent } from '../common/helpContent/iHelpContent';
// import { AuditInfoComponent } from '../common/auditInfo/iAuditInfo';
// import { NotificationComponent } from '../common/notification/iNotification';
import { PreEodCheckComponent } from '../shared/Eod/iPreEodCheck';
import { PreEodAuthComponent } from '../shared/Eod/iPreEodAuth';


// const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//     suppressScrollX: true
// };

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule,
        // MaterialModule,
        // PerfectScrollbarModule.forRoot( PERFECT_SCROLLBAR_CONFIG ),
        JQXModule,
        BasicModule,
        MainModule,
        ExportModule
    ],
    exports: [
        HeaderComponent, 
        // LeftSideNavComponent, 
        // ConsoleBarComponent, 
        // HelpContentComponent, 
        // AuditInfoComponent, 
        // NotificationComponent,
        PreEodCheckComponent,PreEodAuthComponent
    ],
    declarations: [
        HeaderComponent, 
        // LeftSideNavComponent, 
        // ConsoleBarComponent, 
        // HelpContentComponent,
        //  AuditInfoComponent, 
        //  NotificationComponent,
         PreEodCheckComponent,PreEodAuthComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )

export class ContainerModule {}