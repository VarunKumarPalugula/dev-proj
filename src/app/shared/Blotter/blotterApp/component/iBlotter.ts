import { Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';


@Component({
    selector: 'iBlotter',
    templateUrl: 'iBlotter.html',
    styleUrls: ['iBlotter.css']
})

export class BlotterComponent extends BaseComponent  {

    baseUrl: string = "/ucf/services/blotterhandler/";
    blotterId: string = "";
    blotterOptions: any = {
        aggregates: true, csv_export: false, data_group: true, print: false, refresh: true,
        excel_export: true, filterable: true, pdf_export: false, columnList: true,
        row_info: false, sortable: true, tree_data: false, graph: false, retainPref:true
    };
    secondOptions: any = {
        aggregates: true, csv_export: false, data_group: true, print: false, refresh: false,
        excel_export: true, filterable: false, pdf_export: false, columnList: false,
        row_info: false, sortable: true, tree_data: false, graph: false
    };

    posBlotterList: any = [[]];
    tabList: any = [];
    chartSource: any = [];
    chartDataAdapter: any;
    chartPadding: any = { left: 5, top: 20, right: 5, bottom: 5 };
    chartTitlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
    chartXAxis: any = {};
    chartSeriesGroups: any = [];
    chartValueAxis: any;
    LienDataArr: any = [];
    FwdDataArr: any = [];

    constructor(_renderer: Renderer2, _elementRef: ElementRef) {
        super();
        if (this.router && this.router.url) {
            let lastIndex = this.router.url.lastIndexOf("/");
            this.blotterId = this.router.url.slice(lastIndex + 1);   //FI_POS_BLTR
            let choiceList = [];           
            this.tabList = [{
                "name": "Position Blotter", "active": true, "displayName": "Position Blotter", "isContextMenu": false,
                "isGroupable": true, "gridWidth": "100%", "firstGridTitle": "Position Blotter", "option": this.blotterOptions,
                "closeIcon": false, "gridHeight": "100%"
            }];            
        }
    }

    onContextMenuClick(event: any) {
        let checkTabList;
        if (this.tabList.length > 0) {
            checkTabList = this.tabList.filter(obj => {
                if (obj.name != event.selectVal || obj.index != event.rowIndex)
                    return true;
                return false;
            });
            let bps = event.rowData.BPS;
            let bpsArr = bps.split("-");
            let jsonObj = { "branch": bpsArr[0], "portfolioCode": bpsArr[1], "strategyCode": bpsArr[2], "securityCode": event.rowData.SECURITY_CODE };
            if (this.tabList.length == checkTabList.length) { 
                this.tabList = checkTabList;
                this.globalService.progressMode = "indeterminate";
                this.dataService.submitForm(jsonObj, this.baseUrl + event.id).subscribe((listItems: any[]) => {
                    this.globalService.progressMode = "";
                    this.tabList.push({
                        "name": event.selectVal, "active": false, "index": event.rowIndex, "firstGridTitle": event.rowData.SECURITY_CODE + " - " + event.rowData.BPS + " - " + event.selectVal,
                        "displayName": event.rowData.SECURITY_CODE + " - " + event.selectVal, "firstGridData": listItems, "isContextMenu": false,
                        "isGroupable": false, "gridWidth": "40%", "option": this.secondOptions,"closeIcon":true,"gridHeight": "50%"
                    });
                });
            }
        }
    }

    onDoubleClick(event) {
        if(!event.value.group && event.value.BPS){
        this.globalService.progressMode = "indeterminate";
        let lienData = [];
        let bps = event.value.BPS;
        let bpsArr = bps.split("-");
        let jsonObj = { "branch": bpsArr[0], "portfolioCode": bpsArr[1], "strategyCode": bpsArr[2], "securityCode": event.value.SECURITY_CODE, "todayDate": event.value.TODAY_DATE, "branchCode": event.value.BRN_NUM };
        let index = this.tabList.map(x => { return x.index; }).indexOf(event.value.visibleindex);
        this.dataService.submitForm(jsonObj, this.baseUrl + "lienfwd").subscribe((listItems: any[]) => {
            this.LienDataArr = listItems[0].lien;
            this.FwdDataArr = listItems[0].fwd;                            
            if (index != -1) {
                this.tabList[index] = {
                    "name": "both", "active": false, "index": event.value.visibleindex, "firstGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Lien",
                    "secondGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Forward Position",
                    "displayName": event.value.SECURITY_CODE + " - " + bps, "firstGridData": this.LienDataArr, "secondGridData": this.FwdDataArr, "isContextMenu": false,
                    "isGroupable": false, "gridWidth": "49.5%", both: true, "option": this.secondOptions, "closeIcon": true, "gridHeight": "50%"
                };
            } else {
                this.tabList.push({
                    "name": "both", "active": false, "index": event.value.visibleindex, "firstGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Lien",
                    "secondGridTitle": event.value.SECURITY_CODE + " - " + bps + " - Forward Position",
                    "displayName": event.value.SECURITY_CODE + " - " + bps, "firstGridData": this.LienDataArr, "secondGridData": this.FwdDataArr, "isContextMenu": false,
                    "isGroupable": false, "gridWidth": "49.5%", both: true, "option": this.secondOptions, "closeIcon": true, "gridHeight": "50%"
                });
            }          
            this.drawChart();
        });
		}

    }

    onTabClose(event, tab) {
        tab.tabs.first.active = true;
        if (event.value != this.tabList[0].displayName) {
            let index = this.tabList.map(x => {
                return x.displayName;
            }).indexOf(event.value);
            this.tabList.splice(index, 1);
        }

    }


    toolTipCustomFormatFn = (value: any, itemIndex: any, serie: any, group: any, categoryValue: any, categoryAxis: any): any => {
        return '<DIV style="background: #2e3338;color: white;">Value Date: ' +
            categoryValue + '<br />Quantity: ' +
            value + '</DIV>';
    };

    drawChart() {
        this.chartXAxis = {
            dataField: 'VALUE_DATE',
            displayText: 'VALUE DATE',
            showGridLines: true,
            showTickMarks: true,
            title: { text: 'Value Date' }
        };
        this.chartSeriesGroups = [
            {
                type: 'column',
                columnsGapPercent: 25,
                seriesGapPercent: 10,
                columnsMaxWidth: 40,
                columnsMinWidth: 1,
                toolTipBackground: '#2e3338',
                toolTipFormatFunction: this.toolTipCustomFormatFn,
                valueAxis: {
                    logarithmicScale: true,
                    logarithmicScaleBase: 2,
                    unitInterval: 1,
                    tickMarksInterval: 1,
                    gridLinesInterval: 1,
                    displayValueAxis: true
                },
                horizontalTextAlignment: 'right',
                series: [{ "dataField": "QTY", "displayText": "Quantity" }]
            }
        ];
        this.globalService.progressMode = "";
    }

}