import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { jqxGridComponent } from 'jqwidgets/angular_jqxgrid';
// import { jqxTabsComponent } from "jqwidgets/angular_jqxtabs";
// import { jqxDragDropComponent } from "jqwidgets/angular_jqxdragdrop";
// import { jqxTreeGridComponent } from "jqwidgets/angular_jqxtreegrid";
// import { jqxMenuComponent } from 'jqwidgets/angular_jqxmenu';
// import { jqxListBoxComponent } from 'jqwidgets/angular_jqxlistbox';
// import { jqxNotificationComponent } from "jqwidgets/angular_jqxnotification";
// import { jqxDropDownListComponent } from "jqwidgets/angular_jqxdropdownlist";
// import { jqxChartComponent } from 'jqwidgets/angular_jqxchart';
// import { jqxSwitchButtonComponent } from 'jqwidgets/angular_jqxswitchbutton';

@NgModule( {
    imports: [
        CommonModule
    ],
    declarations: [
        // jqxGridComponent, jqxTabsComponent, jqxDragDropComponent, jqxTreeGridComponent, jqxMenuComponent, jqxListBoxComponent,
        // jqxNotificationComponent, jqxDropDownListComponent, jqxChartComponent, jqxSwitchButtonComponent
    ],
    exports: [
        // jqxGridComponent, jqxTabsComponent, jqxDragDropComponent, jqxTreeGridComponent, jqxMenuComponent, jqxListBoxComponent,
        // jqxNotificationComponent, jqxDropDownListComponent, jqxChartComponent, jqxSwitchButtonComponent
    ]
} )
export class JQXModule { }