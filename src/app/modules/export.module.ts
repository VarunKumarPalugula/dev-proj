import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TranslateModule } from '@ngx-translate/core';

import { BasicModule } from '../modules/basic.module';

// import { PrintComponent } from '../../../../../common/print/iPrint';
// import { SpoolComponent } from '../common/spool/iSpool';
// import { SpoolPdfComponent } from '../common/spoolPdf/iSpoolPdf';
// import { FileUploadComponent } from '../common/fileUpload/file.upload';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        FileUploadModule,
        TranslateModule,
        BasicModule
    ],
    declarations: [
        // PrintComponent, SpoolComponent, SpoolPdfComponent, FileUploadComponent
    ],
    exports: [
        // PrintComponent, SpoolComponent, SpoolPdfComponent, FileUploadComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )
export class ExportModule { }