import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { AdvanceModule } from 'src/app/modules/advance.module';
import { BasicModule } from 'src/app/modules/basic.module';
import { JQXModule } from 'src/app/modules/jqx.module';
import { MainModule } from 'src/app/modules/main.module';
import { NavigationModule } from 'src/app/modules/navigation.module';
import { ReportConfigComponent } from './config/reportConfig';
import { ServiceConfigComponent } from './config/serviceConfig';
import { ReportRoutingModule } from './report.routes';
import { ReportTemplateComponent } from './template/reportTemplate';


@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        TranslateModule.forChild(),
        BasicModule,
        MainModule,
        AdvanceModule,
        NavigationModule,
        JQXModule,
        ReportRoutingModule
    ],
    declarations: [
        ReportTemplateComponent, ReportConfigComponent, ServiceConfigComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )

export class ReportModule {
}

