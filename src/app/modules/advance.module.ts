import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { BasicModule } from '../modules/basic.module';
import { MainModule } from '../modules/main.module';
import { ExportModule } from '../modules/export.module';
import { JQXModule } from '../modules/jqx.module';


@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        BasicModule,
        MainModule,
        ExportModule,
        JQXModule
    ],
    declarations: [
        // TextSearchComponent, DropDown2Component, GridComponent, DataSearchComponent, TreeGridComponent
    ],
    exports: [
        // TextSearchComponent, DropDown2Component, GridComponent, DataSearchComponent, TreeGridComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )
export class AdvanceModule { }