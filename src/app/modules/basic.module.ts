import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { MdIconRegistry, MaterialModule } from '@angular/material';

// import { ErrorIconComponent } from '../common/errorIcon/iErrorIcon';
import { IconComponent } from '../common/icon/iIcon';
// import { BreadcrumbComponent } from '../common/breadcrumb/iBreadcrumb';
// import { LabelComponent } from '../common/label/ilabel';
// import { ButtonComponent } from '../common/button/iButton';
// import { PopupComponent } from '../common/popup/iPopup';
// import { PopupFooterComponent } from '../common/popup/iPopup-Footer';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        // MaterialModule
    ],
    declarations: [
        // ErrorIconComponent, 
        IconComponent, 
        // BreadcrumbComponent, LabelComponent, ButtonComponent, PopupComponent, PopupFooterComponent
    ],
    exports: [
        // ErrorIconComponent, 
        IconComponent, 
        // BreadcrumbComponent, LabelComponent, ButtonComponent, PopupComponent, PopupFooterComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    // providers: [MdIconRegistry]
} )
export class BasicModule {
    constructor( 
        // mdIconRegistry: MdIconRegistry, 
        public sanitizer: DomSanitizer ) {
        // mdIconRegistry.addSvgIconSet( sanitizer.bypassSecurityTrustResourceUrl( '/ucf/assets/svgicons/mdi.svg' ) ); //SVG ICON Replacement
    } 
}