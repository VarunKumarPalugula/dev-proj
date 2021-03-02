import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { BasicModule } from '../modules/basic.module';

// import { Tab } from '../common/tabmenu/tab';
// import { Tabs } from '../common/tabmenu/tabs';
// import { CarouselComponent } from "../common/carousel/iCarousel";
// import { NavButtonComponent } from "../common/carousel/iNavButton";
// import { DotIndicatorComponent } from '../common/carousel/iDotIndicator';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        BasicModule
    ],
    declarations: [
        // Tab, Tabs, CarouselComponent, NavButtonComponent, DotIndicatorComponent
    ],
    exports: [
        // Tab, Tabs, CarouselComponent, NavButtonComponent, DotIndicatorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )
export class NavigationModule { }