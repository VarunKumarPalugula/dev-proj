import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { BasicModule } from '../modules/basic.module';
import { MainModule } from '../modules/main.module';
import { AdvanceModule } from '../modules/advance.module';
import { NavigationModule } from '../modules/navigation.module';

//import { SharedRoutingModule } from 'app/shared/shared.routes';

import { WhatIFComponent } from '../shared/whatIf/iwhatIf';
import { AccountingEntriesComponent } from '../shared/AccountingEntries/iAccountEntry';
import { DealSettlementComponent } from '../shared/Settlement/iDealSettlement';
import { MTMessageComponent } from '../shared/MTMessage/iMTMessage';
import { MTn99SearchComponent } from '../shared/MTMessage/iMTn99Search';
import { CompareComponent } from '../shared/Compare/iCompare';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        BasicModule,
        MainModule,
        AdvanceModule,
        NavigationModule
        //SharedRoutingModule
    ],
    declarations: [
        WhatIFComponent, AccountingEntriesComponent, DealSettlementComponent, MTMessageComponent, MTn99SearchComponent,
        CompareComponent
    ],
    exports: [
        WhatIFComponent, AccountingEntriesComponent, DealSettlementComponent, MTMessageComponent, MTn99SearchComponent,
        CompareComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )
export class SharedModule { }