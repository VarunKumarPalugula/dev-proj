import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportTemplateComponent } from './template/reportTemplate';
import { ReportConfigComponent } from './config/reportConfig';
import { ServiceConfigComponent } from './config/serviceConfig';

export const ReportRoutes: Routes = [
    { path: 'report', component: ReportTemplateComponent },
    { path: 'reportconfig', component: ReportConfigComponent },
    { path: 'serviceconfig', component: ServiceConfigComponent }

];

@NgModule( {
    imports: [RouterModule.forChild( ReportRoutes )],
    exports: [RouterModule]
} )
export class ReportRoutingModule { }

