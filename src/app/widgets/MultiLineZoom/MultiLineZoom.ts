import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as d3 from 'd3v4';

@Component({

    selector: 'iMultiLineZoom',
    // moduleId: __moduleName,
    templateUrl: 'MultiLineZoom.html',
    styleUrls: ['MultiLineZoom.css'],
    providers: [DataService]
})

export class MultiLineZoomComponent implements OnInit {

    // public __moduleName: string;
    public divElement: any;
    @ViewChild('chart', { static: false }) private chartContainer: ElementRef;
    @Input() requestType: any;
    /*@Input() heading: any;*/
    @Input() width: any;
    @Input() height: any;
    //@Input() helpScreen: any=0;
    @Input() xAxisUnit: any;
    @Input() yAxisUnit: any;
    public dataREST: any;
    private chartType: string = "keyRates";
    public maxScreen: any = false;
    public prgStatus: any = false;
    public progressMode = "";
    @ViewChild('keyRates', { static: false }) keyRates: ElementRef;
    @ViewChild('keySpreads', { static: false }) keySpreads: ElementRef;
    @ViewChild('futuresRisk', { static: false }) futuresRisk: ElementRef;

    constructor(private dataService: DataService) {
        console.log("********Zoomable Multi-Line Graph");
    }

    ngOnInit() {
        console.log("--- In Zoomable Multi-Line Graph", this.requestType);
        this.prgStatus = true;
        this.progressMode = "indeterminate";
        this.dataService.getListItemsByPost('multiLine/getData', this.requestType).subscribe((listItems: any[]) => {
            console.log("--- Multi-Line Graph data:", listItems);
            this.dataREST = listItems;

            this.divElement = this.chartContainer.nativeElement;

            if (typeof this.divElement != "object") {
                this.divElement = this.chartContainer.nativeElement;
            }
            else {
                console.log("**else:");
                this.divElement.removeChild(this.divElement.lastChild);
            }
            this.createChart();
        }); //end ngInit
        setTimeout(function () {
            this.prgStatus = false;
            this.progressMode = "";
        }, 5000);
    }

    loadData(chartToLoad: any) {
        console.log("--- In changeData() chartToLoad:", chartToLoad);
        this.chartType = chartToLoad;
        this.ngOnInit();
    }

    createChart() {
        console.log("***Zoomable multi-line graph called");
        let bandPos, pos, xdomain, ydomain, ydomainNegative, colors, margin, width, height;
        let zoomArea, drag, /*d1, d2,*/ svg, x, y, xAxis, yAxis, line, band, zoomOverlay, zoomout;
        let svgWidth = this.width;
        let svgHeight = this.height;

        //console.log("--- Multi-Line Graph requestType:", this.requestType);     
        if (this.requestType == "Credit_Exposures") {
            console.log("--- Multi-Line Graph requestType:", this.requestType);
            //this.xAxisUnit = "Months";
            //this.yAxisUnit = "Million USD";
            this.dataREST = [
                {
                    "CP": "Credit Suisse",
                    "TENOR": "1M",
                    "LIMIT": "400"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "2M",
                    "LIMIT": "400"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "3M",
                    "LIMIT": "400"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "4M",
                    "LIMIT": "410"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "5M",
                    "LIMIT": "410"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "6M",
                    "LIMIT": "420"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "7M",
                    "LIMIT": "420"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "8M",
                    "LIMIT": "430"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "9M",
                    "LIMIT": "430"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "10M",
                    "LIMIT": "440"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "11M",
                    "LIMIT": "440"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "12M",
                    "LIMIT": "450"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "13M",
                    "LIMIT": "450"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "14M",
                    "LIMIT": "460"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "15M",
                    "LIMIT": "460"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "16M",
                    "LIMIT": "480"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "17M",
                    "LIMIT": "490"
                },
                {
                    "CP": "Credit Suisse",
                    "TENOR": "18M",
                    "LIMIT": "500"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "1M",
                    "LIMIT": "600"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "2M",
                    "LIMIT": "600"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "3M",
                    "LIMIT": "600"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "4M",
                    "LIMIT": "610"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "5M",
                    "LIMIT": "610"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "6M",
                    "LIMIT": "620"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "7M",
                    "LIMIT": "620"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "8M",
                    "LIMIT": "630"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "9M",
                    "LIMIT": "630"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "10M",
                    "LIMIT": "640"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "11M",
                    "LIMIT": "640"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "12M",
                    "LIMIT": "650"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "13M",
                    "LIMIT": "650"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "14M",
                    "LIMIT": "660"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "15M",
                    "LIMIT": "660"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "16M",
                    "LIMIT": "680"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "17M",
                    "LIMIT": "690"
                },
                {
                    "CP": "Bank of Montreal",
                    "TENOR": "18M",
                    "LIMIT": "700"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "1M",
                    "LIMIT": "700"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "2M",
                    "LIMIT": "700"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "3M",
                    "LIMIT": "700"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "4M",
                    "LIMIT": "710"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "5M",
                    "LIMIT": "720"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "6M",
                    "LIMIT": "730"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "7M",
                    "LIMIT": "740"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "8M",
                    "LIMIT": "750"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "9M",
                    "LIMIT": "760"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "10M",
                    "LIMIT": "770"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "11M",
                    "LIMIT": "780"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "12M",
                    "LIMIT": "790"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "13M",
                    "LIMIT": "790"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "14M",
                    "LIMIT": "795"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "15M",
                    "LIMIT": "797"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "16M",
                    "LIMIT": "800"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "17M",
                    "LIMIT": "800"
                },
                {
                    "CP": "Barclays Bank PLC",
                    "TENOR": "18M",
                    "LIMIT": "800"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "1M",
                    "LIMIT": "700"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "2M",
                    "LIMIT": "800"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "3M",
                    "LIMIT": "805"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "4M",
                    "LIMIT": "810"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "5M",
                    "LIMIT": "815"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "6M",
                    "LIMIT": "820"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "7M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "8M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "9M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "10M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "11M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "12M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "13M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "14M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "15M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "16M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "17M",
                    "LIMIT": "825"
                },
                {
                    "CP": "Goldman Sachs",
                    "TENOR": "18M",
                    "LIMIT": "825"
                }
            ];

        }

        else if (this.requestType == "Risk_Reporting") {
            console.log("--- Multi-Line Graph requestType:", this.requestType);
            if (this.chartType == "keyRates") {
                this.keyRates.nativeElement.style.background = "#709fdc";
                this.keySpreads.nativeElement.style.background = "#205570";
                this.futuresRisk.nativeElement.style.background = "#205570";
                this.dataREST = [
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "3 MONTH",
                        "RATE": "0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "6 MONTH",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "1 Year",
                        "RATE": "1.4"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "2 Year",
                        "RATE": "31.1"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "3 Year",
                        "RATE": "2.5"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "4 Year",
                        "RATE": "53.7"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "5 Year",
                        "RATE": "2.0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "6 Year",
                        "RATE": "2.4"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "7 Year",
                        "RATE": "2.8"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "8 Year",
                        "RATE": "3.3"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "9 Year",
                        "RATE": "73.5"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "10 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "15 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "20 Year",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "25 Year",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "30 Year",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "3 MONTH",
                        "RATE": "0.3"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "6 MONTH",
                        "RATE": "0.2"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "1 Year",
                        "RATE": "1.3"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "2 Year",
                        "RATE": "21.3"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "3 Year",
                        "RATE": "2.2"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "4 Year",
                        "RATE": "2.9"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "5 Year",
                        "RATE": "3.5"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "6 Year",
                        "RATE": "4.1"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "7 Year",
                        "RATE": "4.7"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "8 Year",
                        "RATE": "5.2"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "9 Year",
                        "RATE": "5.6"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "10 Year",
                        "RATE": "68.1"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "15 Year",
                        "RATE": "39.7"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "20 Year",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "25 Year",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "30 Year",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "3 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "6 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "1 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "2 Year",
                        "RATE": "10"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "3 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "4 Year",
                        "RATE": "51"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "5 Year",
                        "RATE": "-1"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "6 Year",
                        "RATE": "-2"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "7 Year",
                        "RATE": "-2"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "8 Year",
                        "RATE": "-2"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "9 Year",
                        "RATE": "68"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "10 Year",
                        "RATE": "-68"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "15 Year",
                        "RATE": "-40"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "20 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "25 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PV 01",
                        "HDATE": "30 Year",
                        "RATE": "0"
                    }
                ];

            }
            else if (this.chartType == "keySpreads") {
                this.keyRates.nativeElement.style.background = "#205570";
                this.keySpreads.nativeElement.style.background = "#709fdc";
                this.futuresRisk.nativeElement.style.background = "#205570";
                this.dataREST = [
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "3 MONTH",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "6 MONTH",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "1 Year",
                        "RATE": ".2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "2 Year",
                        "RATE": ".4"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "3 Year",
                        "RATE": ".7"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "4 Year",
                        "RATE": "26"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "5 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "6 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "7 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "8 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "9 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "10 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "15 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "20 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "25 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "30 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "3 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "6 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "1 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "2 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "3 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "4 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "5 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "6 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "7 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "8 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "9 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "10 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "15 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "20 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "25 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "30 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "3 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "6 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "1 Year",
                        "RATE": "0.2"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "2 Year",
                        "RATE": "0.4"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "3 Year",
                        "RATE": "0.7"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "4 Year",
                        "RATE": "26"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "5 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "6 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "7 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "8 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "9 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "10 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "15 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "20 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "25 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "30 Year",
                        "RATE": "0"
                    }
                ];
            }
            else if (this.chartType == "futuresRisk") {
                this.keyRates.nativeElement.style.background = "#205570";
                this.keySpreads.nativeElement.style.background = "#205570";
                this.futuresRisk.nativeElement.style.background = "#709fdc";
                this.dataREST = [
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "3 MONTH",
                        "RATE": "0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "6 MONTH",
                        "RATE": "0.0"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "1 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "2 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "3 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "4 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "5 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "6 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "7 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "8 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "9 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "10 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "15 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "20 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "25 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "PORTFOLIO",
                        "HDATE": "30 Year",
                        "RATE": "-0.2"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "3 MONTH",
                        "RATE": "0.3"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "6 MONTH",
                        "RATE": "0.2"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "1 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "2 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "3 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "4 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "5 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "6 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "7 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "8 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "9 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "10 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "15 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "20 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "25 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "BENCHMARK",
                        "HDATE": "30 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "3 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "6 MONTH",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "1 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "2 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "3 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "4 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "5 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "6 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "7 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "8 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "9 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "10 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "15 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "20 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "25 Year",
                        "RATE": "0"
                    },
                    {
                        "CCY": "CR 01",
                        "HDATE": "30 Year",
                        "RATE": "0"
                    }
                ];
            }
        } //end if requestType == Risk_Reporting


        //this.dataREST = []; 

        //Check data size...
        if (this.dataREST.length == 0) {
            this.prgStatus = false;
            this.progressMode = "";
            let element = this.chartContainer.nativeElement;
            let gdiv = d3.select(element)
                .append("div")
                .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                .append("table")
                .attr("width", this.width)
                .attr("height", this.height).append("tr").append("td").append("p")
                .text("NO DATA AVAILABLE")
                .style("color", "#fff")
                .style("font-size", 13)
                .style("text-transform", "uppercase")
                .style("text-align", "center")
                .attr("x", this.width / 2)
                .attr("y", this.height / 2);
            return;
        }
        else if (this.dataREST.length == 1 && this.dataREST[0].status == "Fail") {
            this.prgStatus = false;
            this.progressMode = "";
            let element = this.chartContainer.nativeElement;
            let gdiv = d3.select(element)
                .append("div")
                .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                .append("table")
                .attr("width", this.width)
                .attr("height", this.height).append("tr").append("td").append("p")
                .text("NO DATA AVAILABLE")
                .style("color", "red")
                .style("font-size", 13)
                .style("text-transform", "uppercase")
                .style("text-align", "center")
                .attr("x", this.width / 2)
                .attr("y", this.height / 2);
            return;
        }

        if (!this.maxScreen && this.dataREST.length > 10) {
            this.dataREST = this.dataREST.slice(0, 11);
        }

        let dataColumns = Object.keys(this.dataREST[0]);
        console.log("--- dataColumns:", dataColumns);

        xdomain = 0;
        ydomain = 0;
        ydomainNegative = 0;

        let dataInArrayFormat = [];
        let dataArrayEachLine = [];
        let lines = [];
        let lineStr = "";
        let pointCount = 0;

        this.dataREST.forEach(function (d, i) {
            //console.log("--- line of:", eval("d." + dataColumns[0]));
            //console.log("--- y-axis val:", eval("d." + dataColumns[1]));
            //console.log("--- x-axis val:", eval("d." + dataColumns[2]));
            //console.log("--- i:", i);
            if (lineStr != eval("d." + dataColumns[0])) {
                if (lineStr != "") {
                    dataInArrayFormat.push(dataArrayEachLine);
                    dataArrayEachLine = [];
                    pointCount = 0;
                }
                lineStr = eval("d." + dataColumns[0]);
                lines.push(lineStr);
            }
            let xval = eval("d." + dataColumns[1]);
            if (xval.indexOf(" ") != -1) {
                xval = xval.substring(0, xval.indexOf(" "));
            }
            let yval = eval("d." + dataColumns[2]);
            yval = parseFloat(yval);
            if (yval > ydomain) {
                ydomain = yval;
            }
            if (yval < ydomainNegative) {
                ydomainNegative = yval;
            }
            xdomain = i;
            //dataArrayEachLine.push([xval, yval]);  
            dataArrayEachLine.push([pointCount, yval]);
            pointCount++;
        });
        if (dataArrayEachLine.length > 0) {
            dataInArrayFormat.push(dataArrayEachLine);
        }
        xdomain++;
        xdomain = xdomain / lines.length;

        //Add extra offset     
        xdomain = xdomain + xdomain / 10;
        ydomain = ydomain + ydomain / 5;
        console.log("--- xdomain:", xdomain);
        console.log("--- ydomain:", ydomain);

        bandPos = [-1, -1];

        colors = ['#FF6633', '#99FF99', '#FF33FF', '#FFFF99', '#00B3E6',
            '#E6B333', '#3366E6', '#999966', '#FFB399', '#B34D4D',
            '#80B300', '#E6B3B3', '#6680B3',
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
        //["orange", "red", "pink", "purple", "yellow", "cyan", "steelblue", "brown"];//"steelblue", "green","red", "orange"
        margin = {
            top: 45,
            right: 140,
            bottom: 55,
            left: 60
        };

        width = svgWidth - margin.left - margin.right;
        height = svgHeight - margin.top - margin.bottom;
        if (this.maxScreen) {
            width = 400;
            height = 300;
        }
        zoomArea = {
            x1: 0,
            y1: ydomainNegative,
            x2: xdomain,
            y2: ydomain
        };
        drag = d3.behavior.drag();

        svg = d3.select(this.divElement).append("svg").attr('class', 'animated zoomIn')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x = d3.scale.linear()
            .range([0, width]).domain([0, xdomain]);

        y = d3.scale.linear()
            .range([height, 0]).domain([ydomainNegative, ydomain]);

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        line = d3.svg.line()
            .interpolate("basis")
            .x(function (d) {
                return x(d[0]);
            })
            .y(function (d) {
                return y(d[1]);
            });

        band = svg.append("rect")
            .attr("width", 0)
            .attr("height", 0)
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "band")
            .attr("fill", "none").attr("stroke-width", "1.5px").attr("stroke", "red");

        svg.append("g")
            .attr("class", "x axis")
            .attr("fill", "none").attr("stroke", "#000").attr("stroke-width", "0.5").attr("shape-rendering", "geometricPrecision")
            .call(xAxis).attr("transform", "translate(0," + height + ")")
            .append("text")
            //.attr("class", "mono")
            .attr("fill", "#000")
            .style("font-size", "11px")
            .style("text-transform", "uppercase")
            .style("font-weight", "100")
            .style("font-family", "Tahoma, Helvetica, sans-serif")
            //.attr("transform", "rotate(-90)")
            .attr("x", width + (margin.left / 2))
            .attr("y", 7)//-(margin.top / 2))
            .attr("dx", "0.7em")
            .attr("text-anchor", "end")
            .text(this.xAxisUnit);

        svg.append("g")
            .attr("class", "y axis")
            .attr("fill", "none").attr("stroke", "#000").attr("stroke-width", "0.5").attr("shape-rendering", "geometricPrecision")
            .call(yAxis)
            .append("text")
            //.attr("class", "mono")
            .attr("fill", "#000")
            .style("font-size", "11px")
            .style("text-transform", "uppercase")
            .style("font-weight", "100")
            .style("font-family", "Tahoma, Helvetica, sans-serif")
            //.attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", -18)//-(margin.top / 2))
            .attr("dy", "0.7em")
            .attr("text-anchor", "end")
            .text(this.yAxisUnit);

        svg.append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);


        for (let idx in dataInArrayFormat) {// draw lines
            //console.log("**dataInArrayFormat:", dataInArrayFormat);
            //console.log("**idx:", idx);
            svg.append("path")
                .datum(dataInArrayFormat[idx])
                .attr("class", "line line" + idx)
                .attr("fill", "none")
                .attr("stroke-width", "3px")
                .attr("clip-path", "url(#clip)")
                .style("stroke", colors[idx])
                .attr("d", line);
        }

        zoomOverlay = svg.append("rect")//complete graph area
            .attr("width", width - 10)
            .attr("height", height)
            .attr("class", "zoomOverlay")
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .call(drag);

        zoomout = svg.append("g");

        zoomout.append("rect")
            .attr("class", "zoomOut")
            .attr("cursor", "pointer")
            .attr("fill", "#66a")
            .attr("width", 70)
            .attr("height", 22)
            .attr("x", 0)
            .attr("y", height + (margin.bottom - 20))
            .on("click", function () { //zoomOut click action
                console.log("****zoom out called");
                x.domain([0, xdomain]);
                y.domain([ydomainNegative, ydomain]);

                let t = svg.transition().duration(750);
                t.select(".x.axis").call(xAxis);
                t.select(".y.axis").call(yAxis);

                t.selectAll(".line").attr("d", line);
            });

        zoomout.append("text")
            .attr("class", "zoomOutText")
            .attr("fill", "#f1f1f1")
            .attr("pointer-events", "none")
            .attr("width", 64)
            .attr("height", 22)
            .attr("color", "#f1f1f1")
            .attr("x", 8)
            .attr("y", height + (margin.bottom - 5))
            .text("Zoom Out");

        let legend = svg.selectAll(".legend")
            //.data(partition.nodes(root))
            .data(lines)
            .enter().append("g")
            .attr("class", "legend");

        let legendElementheight = 2;
        let radius = 20;
        let counter = 0;
        for (let clr in colors) {// legend boxes
            console.log("****line color: ", colors[clr]);
            legend.append("rect")
                .attr("x", width + margin.left)//315)
                .attr("y", legendElementheight)
                .attr("width", 12)
                .attr("height", 11)
                .style("fill", colors[clr]);
            legendElementheight = legendElementheight + 14;
            counter++;
            if (counter >= lines.length) break;
        }

        legendElementheight = 1;
        for (let ln in lines) {// legend text
            console.log("****line graph: ", lines[ln]);
            legend.append("text")
                //.attr("class", "zoomOutText")
                .text(lines[ln])
                .attr("fill", "#000")
                .style("font-size", "11px")
                .style("font-weight", 100)
                .style("font-family", "Tahoma, Helvetica, sans-serif")
                .style("text-transform", "uppercase")
                .attr("x", width + margin.left + 15)//330)
                .attr("y", legendElementheight + 10);
            legendElementheight = legendElementheight + 14;
        }


        // zoom     
        if (zoomArea.x1 > zoomArea.x2) {
            x.domain([zoomArea.x2, zoomArea.x1]);
        } else {
            x.domain([zoomArea.x1, zoomArea.x2]);
        }

        if (zoomArea.y1 > zoomArea.y2) {
            y.domain([zoomArea.y2, zoomArea.y1]);
        } else {
            y.domain([zoomArea.y1, zoomArea.y2]);
        }

        //update axis and redraw lines
        let t = svg.transition().duration(750);
        t.select(".x.axis").call(xAxis);
        t.select(".y.axis").call(yAxis);

        t.selectAll(".line").attr("d", line);

        //zoom end

        drag.on("dragend", function () {
            let pos = d3.mouse(this);
            let x1 = x.invert(bandPos[0]);
            let x2 = x.invert(pos[0]);

            if (x1 < x2) {
                zoomArea.x1 = x1;
                zoomArea.x2 = x2;
            } else {
                zoomArea.x1 = x2;
                zoomArea.x2 = x1;
            }

            let y1 = y.invert(pos[1]);
            let y2 = y.invert(bandPos[1]);

            if (x1 < x2) {
                zoomArea.y1 = y1;
                zoomArea.y2 = y2;
            } else {
                zoomArea.y1 = y2;
                zoomArea.y2 = y1;
            }

            bandPos = [-1, -1];

            band.transition()
                .attr("width", 0)
                .attr("height", 0)
                .attr("x", bandPos[0])
                .attr("y", bandPos[1]);

            // zoom     
            if (zoomArea.x1 > zoomArea.x2) {
                x.domain([zoomArea.x2, zoomArea.x1]);
            } else {
                x.domain([zoomArea.x1, zoomArea.x2]);
            }

            if (zoomArea.y1 > zoomArea.y2) {
                y.domain([zoomArea.y2, zoomArea.y1]);
            } else {
                y.domain([zoomArea.y1, zoomArea.y2]);
            }

            //update axis and redraw lines
            let t = svg.transition().duration(750);
            t.select(".x.axis").call(xAxis);
            t.select(".y.axis").call(yAxis);

            t.selectAll(".line").attr("d", line);
            //zoom end   
        });

        drag.on("drag", function () {
            let pos = d3.mouse(this);

            if (pos[0] < bandPos[0]) {
                band.attr("transform", "translate(" + (pos[0]) + "," + bandPos[1] + ")");
            }
            if (pos[1] < bandPos[1]) {
                band.attr("transform", "translate(" + (pos[0]) + "," + pos[1] + ")");
            }
            if (pos[1] < bandPos[1] && pos[0] > bandPos[0]) {
                band.attr("transform", "translate(" + (bandPos[0]) + "," + pos[1] + ")");
            }

            //set new position of band when user initializes drag
            if (bandPos[0] == -1) {
                bandPos = pos;
                band.attr("transform", "translate(" + bandPos[0] + "," + bandPos[1] + ")");
            }

            band.transition().duration(1)
                .attr("width", Math.abs(bandPos[0] - pos[0]))
                .attr("height", Math.abs(bandPos[1] - pos[1]));
        });

        this.prgStatus = false;
        this.progressMode = "";
    }
}
