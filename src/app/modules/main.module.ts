import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// import { MaterialModule } from '@angular/material';

import { BasicModule } from '../modules/basic.module';

// import { PanelComponent } from 'app/common/panel/iPanel';
// import { AmountComponent } from 'app/common/amount/iAmount';
// import { TextComponent } from 'app/common/textfield/iText';
// import { TextareaComponent } from "app/common/textarea/iTextarea";
// import { NumberComponent } from 'app/common/number/iNumber';
// import { RateComponent } from 'app/common/rate/iRate';
// import { CalendarComponent } from 'app/common/calendar/iCalendar';
// import { DropDownComponent } from 'app/common/dropdown/iDropdown';
// import { CheckboxComponent } from 'app/common/checkbox/iCheckbox';
// import { RadioComponent } from 'app/common/radio/iRadio';
// import { ToggleButtonComponent } from 'app/common/toggleBtn/iToggleBtn';
import { ToolbarComponent } from '../common/toolbar/iToolbar';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        // MaterialModule,
        BasicModule
    ],
    declarations: [
        // PanelComponent,
        ToolbarComponent,  
        // AmountComponent, TextComponent, TextareaComponent, NumberComponent, RateComponent, CalendarComponent, DropDownComponent,
        // CheckboxComponent, RadioComponent, ToggleButtonComponent
    ],
    exports: [
        // PanelComponent,
         ToolbarComponent,
        //   AmountComponent, TextComponent, TextareaComponent, NumberComponent, RateComponent, CalendarComponent, DropDownComponent,
        // CheckboxComponent, RadioComponent, ToggleButtonComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )
export class MainModule { }