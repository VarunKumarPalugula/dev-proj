import { Component, ViewChild, Input, Output, ElementRef, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as d3 from 'd3v4';

// declare var __moduleName: string;


@Component({

    selector: 'iSunburst',
    // moduleId: __moduleName,
    templateUrl: 'sunburst.component.html',
    providers: [DataService],
    styleUrls: ['sunburst.component.css'],
    //encapsulation: ViewEncapsulation.None
})
export class SunburstComponent implements OnInit {

    // public __moduleName: string;
    @ViewChild('chart', { static: false }) private chartContainer: ElementRef;
    @ViewChild('info', { static: false }) private info: ElementRef;
    @ViewChild('sunburst', { static: false }) private sunburst: ElementRef;

    public data: any;
    public element: any;
    public SunburstTooltip: any
    @Input() requestType: any;
    @Input() maxScreen: boolean = false;
    @Input() width: any;
    @Input() height: any;
    @Input() paramList1: any;
    @Input() groupingList: any;
    @Input() changeTrigger: any;
    // @Input() helpScreen: any = 0;
    @Input() reload: any = 0;

    private margin: any = { top: 5, bottom: 5, left: 10, right: 10 };
    private chart: any;

    helpclose = new EventEmitter();
    addListenerEvent = new EventEmitter();

    constructor(private dataService: DataService) {
        //console.log("********sunburst called:****************");
    }

    ngOnInit() {
        let dataREST: any;

        console.log("--- In Sunburst", this.requestType);
        if (typeof this.element != "object") {
            this.element = this.chartContainer.nativeElement;
            this.SunburstTooltip = this.sunburst.nativeElement;
        }
        else {
            this.element.removeChild(this.element.lastChild);
            this.SunburstTooltip.removeChild(this.SunburstTooltip.lastChild);
        }
        //ToDo... use getListItemsByPost... pass columns as payload...

        this.dataService.getListItemsByPost('sunburst/getData', this.requestType).subscribe((listItems: any[]) => {
            console.log("--- Sunburst data:");
            let dataREST = listItems;
            // assign REST call output JSON data to below variable
            /* 
                        let dataREST = [
              {
                "branchName": "NewYork",
                "portfolioCode": "FCBT",
                "ccyCode": "Pound Sterling",
                "dealerGroup": "FMDG",
                "openCfUSDEC": 28325
              },
              {
                "branchName": "NewYork",
                "portfolioCode": "FCBT",
                "ccyCode": "EURO",
                "dealerGroup": "FMDG",
                "openCfUSDEC": 218923
              },
              {
                "branchName": "NewYork",
                "portfolioCode": "FCBT",
                "ccyCode": "US DOLLAR",
                "dealerGroup": "FMDG",
                "openCfUSDEC": 1000677
              },
              {
                "branchName": "NewYork",
                "portfolioCode": "FCBT",
                "ccyCode": "INR",
                "dealerGroup": "FMDG",
                "openCfUSDEC": 8164872
              },
              {
                "branchName": "NewYork",
                "portfolioCode": "FCBU",
                "ccyCode": "Pound Sterling",
                "dealerGroup": "FMDG",
                "openCfUSDEC": 2265920
              },
              {
                "branchName": "NewYork",
                "portfolioCode": "FCBU",
                "ccyCode": "EURO",
                "dealerGroup": "FMDG",
                "openCfUSDEC": 1260018
              },
              {
                "branchName": "NewYork",
                "portfolioCode": "FCBU",
                "ccyCode": "US DOLLAR",
                "dealerGroup": "FMDG",
                "openCfUSDEC": 891880
              },
              {
                "branchName": "NewYork",
                "portfolioCode": "MIRR",
                "ccyCode": "INR",
                "dealerGroup": "TACR",
                "openCfUSDEC": 8500020
              }
            ];
                       
            */

            /* 
             let dataREST = [
             {
               "branchName": "NewYork",
               "portfolioCode": "FCBT",
               "ccyCode": "Pound Sterling",    
               "openCfUSDEC": 28325
             },
             {
               "branchName": "NewYork",
               "portfolioCode": "FCBT",
               "ccyCode": "EURO",    
               "openCfUSDEC": 218923
             },
             {
               "branchName": "NewYork",
               "portfolioCode": "FCBT",
               "ccyCode": "US DOLLAR",    
               "openCfUSDEC": 1000677
             },
             {
               "branchName": "NewYork",
               "portfolioCode": "FCBT",
               "ccyCode": "INR",    
               "openCfUSDEC": 8164872
             },
             {
               "branchName": "NewYork",
               "portfolioCode": "FCBU",
               "ccyCode": "Pound Sterling",    
               "openCfUSDEC": 2265920
             },
             {
               "branchName": "NewYork",
               "portfolioCode": "FCBU",
               "ccyCode": "EURO",    
               "openCfUSDEC": 1260018
             },
             {
               "branchName": "NewYork",
               "portfolioCode": "FCBU",
               "ccyCode": "US DOLLAR",    
               "openCfUSDEC": 891880
             },
             {
               "branchName": "NewYork",
               "portfolioCode": "MIRR",
               "ccyCode": "INR",   
               "openCfUSDEC": 8500020
             }
           ];           
            */
            /*           
             let dataREST = [
             {
               "branchName": "NewYork",
               "assetClass": "FX",
               "productType": "Swap",
               "portfolioCode": "CORE",
               "dealerGroup": "FMDG",
               "ccyCode": "Pound Sterling",    
               "openCfUSDEC": 2834325
             },
             {
               "branchName": "NewYork",
               "assetClass": "FX",
               "productType": "Outright",      
               "portfolioCode": "CORE",
               "dealerGroup": "FMDG",
               "ccyCode": "EURO",    
               "openCfUSDEC": 218923
             },
             {
               "branchName": "NewYork",
               "assetClass": "MM",
               "productType": "Deposits",       
               "portfolioCode": "CORE",
               "dealerGroup": "FMDG",
               "ccyCode": "US DOLLAR",    
               "openCfUSDEC": 1000677
             },
             {
               "branchName": "NewYork",
               "assetClass": "MM",
               "productType": "Swaps",      
               "portfolioCode": "CORE",
               "dealerGroup": "FMDG",
               "ccyCode": "INR",    
               "openCfUSDEC": 8164872
             },
             {
               "branchName": "NewYork",
               "assetClass": "FIS",
               "productType": "Outright",      
               "portfolioCode": "INVESTMENT",
               "dealerGroup": "FMDG",
               "ccyCode": "Pound Sterling",    
               "openCfUSDEC": 2265920
             },
             {
               "branchName": "NewYork",
               "assetClass": "FIS",
               "productType": "Repo",      
               "portfolioCode": "INVESTMENT",
               "dealerGroup": "FMDG",
               "ccyCode": "EURO",    
               "openCfUSDEC": 1260018
             },
             {
               "branchName": "NewYork",
               "assetClass": "Structured Products",
               "productType": "CLN",      
               "portfolioCode": "INVESTMENT",
               "dealerGroup": "FMDG",
               "ccyCode": "US DOLLAR",    
               "openCfUSDEC": 891880
             },
             {
               "branchName": "NewYork",
               "assetClass": "Fund Transfer",
               "productType": "Inflows",      
               "portfolioCode": "LIQUIDITY",
               "dealerGroup": "Dealer_XYZ",
               "ccyCode": "INR",    
               "openCfUSDEC": 7505020
             }
           ]; */
            /*       
                   let dataREST =
                   
            [
           {"BRANCH":"1","PORTFOLIO":"?DBU","CURRENCY":"300","DEALER_GROUP":"MGMT","OPEN_CF_USD_EQ":"-100.345"},
           {"BRANCH":"1","PORTFOLIO":"CORE","CURRENCY":"0","DEALER_GROUP":"MGMT","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"FCBT","CURRENCY":"0","DEALER_GROUP":"FMDG","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"FCBT","CURRENCY":"105","DEALER_GROUP":"FMDG","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"FCBT","CURRENCY":"171","DEALER_GROUP":"FMDG","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"FCBT","CURRENCY":"300","DEALER_GROUP":"FMDG","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"FCBU","CURRENCY":"0","DEALER_GROUP":"FMDG","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"FCBU","CURRENCY":"105","DEALER_GROUP":"FMDG","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"FCBU","CURRENCY":"171","DEALER_GROUP":"FMDG","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"LQDT","CURRENCY":"0","DEALER_GROUP":"MGMT","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"LQDT","CURRENCY":"105","DEALER_GROUP":"MGMT","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"LQDT","CURRENCY":"171","DEALER_GROUP":"MGMT","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"MIRR","CURRENCY":"300","DEALER_GROUP":"TACR","OPEN_CF_USD_EQ":"100"},
           {"BRANCH":"1","PORTFOLIO":"SYNP","CURRENCY":"0","DEALER_GROUP":"MGMT","OPEN_CF_USD_EQ":"100"}
           ];*/

            /*       let dataREST = 
           [
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "CORE",
              "CURRENCY": "AUD",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "2207132.97959"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "CORE",
              "CURRENCY": "GBP",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "2058110.0926"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "CORE",
              "CURRENCY": "USD",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "677744.98"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "INVT",
              "CURRENCY": "EUR",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "218923.71648"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "INVT",
              "CURRENCY": "USD",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "677744.98"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "INVT",
              "CURRENCY": "CAD",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "8164872.781"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "LQDT",
              "CURRENCY": "USD",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "1999944.44"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "LQDT",
              "CURRENCY": "EUR",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "44800800"
            },
            {
              "BANK": "UBS",
              "BRANCH": " NewYork",
              "PORTFOLIO": "LQDT",
              "CURRENCY": "GBP",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "452789"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "CORE",
              "CURRENCY": "GBP",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "2058110.0926"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "CORE",
              "CURRENCY": "USD",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "677744.98"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "INVT",
              "CURRENCY": "EUR",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "418923.71648"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "INVT",
              "CURRENCY": "USD",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "677744.98"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "INVT",
              "CURRENCY": "CAD",
              "DEALER_GROUP": "FMDG",
              "OPEN_CF_USD_EQ": "8164872.781"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "LQDT",
              "CURRENCY": "USD",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "1999944.44"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "LQDT",
              "CURRENCY": "EUR",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "44800800"
            },
            {
              "BANK": "UBS",
              "BRANCH": " Zurich",
              "PORTFOLIO": "LQDT",
              "CURRENCY": "GBP",
              "DEALER_GROUP": "MGMT",
              "OPEN_CF_USD_EQ": "4527890"
            }
           ];  */
            /* //Demo data    
                  dataREST =
                      [
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "GBP",
                              "POSITION": "3685350.31"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "GBP",
                              "POSITION": "700000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "GBP",
                              "POSITION": "1280000.64"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "GBP",
                              "POSITION": "580645.15"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "GBP",
                              "POSITION": "650000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "GBP",
                              "POSITION": "200000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "GBP",
                              "POSITION": "2838709.7"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "GBP",
                              "POSITION": "750000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "GBP",
                              "POSITION": "2161290.3"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "EUR",
                              "POSITION": "850340.136"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "EUR",
                              "POSITION": "80000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "EUR",
                              "POSITION": "4000000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "EUR",
                              "POSITION": "350000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "EUR",
                              "POSITION": "4000000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "EUR",
                              "POSITION": "70000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "EUR",
                              "POSITION": "500000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "EUR",
                              "POSITION": "1000000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "EUR",
                              "POSITION": "20000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "USD",
                              "POSITION": "984914"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "3185065"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Copenhagen",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "600000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "USD",
                              "POSITION": "3189999.99"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "USD",
                              "POSITION": "28037"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "New York",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "28007600"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "1083529"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "120000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Treasury",
                              "POS_CODE": "Zurich",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "8989148.14"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Trade Finance",
                              "POS_CODE": "B2B",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "GBP",
                              "POSITION": "400000.7"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Trade Finance",
                              "POS_CODE": "B2B",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "EUR",
                              "POSITION": "1000000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Trade Finance",
                              "POS_CODE": "B2B",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "USD",
                              "POSITION": "0"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Diamond Exports",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "GBP",
                              "POSITION": "200000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Metal Exports",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "GBP",
                              "POSITION": "100000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Shipping",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "GBP",
                              "POSITION": "250000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Diamond Exports",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "EUR",
                              "POSITION": "1000000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Metal Exports",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "EUR",
                              "POSITION": "3000000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Shipping",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "EUR",
                              "POSITION": "2000000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Diamond Exports",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "1064000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Metal Exports",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "USD",
                              "POSITION": "3064000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "Merchant",
                              "POS_CODE": "Shipping",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "USD",
                              "POSITION": "8036400"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "E-Treasury",
                              "POS_CODE": "FCY Posn",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "GBP",
                              "POSITION": "600000.3"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "E-Treasury",
                              "POS_CODE": "FCY Posn",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "EUR",
                              "POSITION": "700000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "E-Treasury",
                              "POS_CODE": "FCY  Posn",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "USD",
                              "POSITION": "2500000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "CORE",
                              "POS_CODE": "FCY Posn",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "GBP",
                              "POSITION": "200000.3"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "CORE",
                              "POS_CODE": "Nostro Posn",
                              "PORTFOLIO_CODE": "MGMT",
                              "CURRENCY": "GBP",
                              "POSITION": "300000.7"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "CORE",
                              "POS_CODE": "FCY Posn",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "EUR",
                              "POSITION": "670000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "CORE",
                              "POS_CODE": "Nostro Posn",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "EUR",
                              "POSITION": "450000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "CORE",
                              "POS_CODE": "FCY Posn",
                              "PORTFOLIO_CODE": "LQDT",
                              "CURRENCY": "USD",
                              "POSITION": "3500000"
                          },
                          {
                              "GLOBAL": "GLOBAL",
                              "ADJ_SOURCE": "CORE",
                              "POS_CODE": "Nostro Posn",
                              "PORTFOLIO_CODE": "INVT",
                              "CURRENCY": "USD",
                              "POSITION": "3500000"
                          }
                      ];
                  */
            //dataREST = []; 
            //Check data size...
            if (dataREST.length == 0) {
                //alert("No Data"); 
                let element = this.chartContainer.nativeElement;
                let gdiv = d3.select(element)
                    .append("div")
                    .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                    .append("table")
                    .attr("width", this.width)
                    .attr("height", this.height).append("tr").append("td").append("p")
                    .text("No data available to load the graph")
                    .style("color", "#fff")
                    .style("font-size", 13)
                    .style("text-transform", "uppercase")
                    .style("text-align", "center")
                    .attr("x", this.width / 2)
                    .attr("y", this.height / 2);
                return;
            }
            else if (dataREST.length == 1 && dataREST[0].status == "Fail") {
                let element = this.chartContainer.nativeElement;
                let gdiv = d3.select(element)
                    .append("div")
                    .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                    .append("table")
                    .attr("width", this.width)
                    .attr("height", this.height).append("tr").append("td").append("p")
                    .text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
                    .style("color", "red")
                    .style("font-size", 13)
                    .style("text-transform", "uppercase")
                    .style("text-align", "center")
                    .attr("x", this.width / 2)
                    .attr("y", this.height / 2);
                return;
            }

            let dataColumns = Object.keys(dataREST[0]);
            console.log("--- dataColumns:", dataColumns);

            // first column/field setting from any record of 'data' ... or simply Total/Root
            //let hierarchyData = { name: eval("dataREST[0]." + dataColumns[0]), children: [] };
            let hierarchyData = { name: "Total", children: [] };

            // Level/Middle columns... subset of 'paramList1' excluding the first column (root) and the last 2 columns (name, value... i.e. leaf)           
            let levels = dataColumns.slice(1, dataColumns.length - 2);
            console.log("--- levels: ", levels);

            // Transform the data: Flat JSON (Adjacency list) to Hierarchical tree
            // For each data row, loop through the expected levels traversing the output tree
            dataREST.forEach(function (d) {
                //console.log("*********dataTest record:",d);
                // Keep this as a reference to the current level
                let depthCursor = hierarchyData.children;
                //console.log("*********** depth cursor:",depthCursor);
                // Go down one level at a time
                levels.forEach(function (property, depth) {

                    // Look to see if a branch has already been created
                    let index;
                    depthCursor.forEach(function (child, i) {
                        if (d[property] == child.name) index = i;
                    });
                    // Add a branch if it isn't there
                    if (isNaN(index)) {
                        depthCursor.push({ name: d[property], children: [] });
                        index = depthCursor.length - 1;
                    }
                    // Now reference the new child array as we go deeper into the tree
                    depthCursor = depthCursor[index].children;
                    // This is a leaf, so add the last element to the specified branch
                    //if ( depth === levels.length - 1 ) depthCursor.push({ name : d.model, size : d.size });

                    //last two columns setting... use eval expression
                    if (depth === levels.length - 1) {
                        //console.log("--- actual value:", eval("d."+dataColumns[dataColumns.length - 1]));
                        let valueStr = eval("d." + dataColumns[dataColumns.length - 1]);
                        if (valueStr.indexOf(".") != -1) valueStr = valueStr.substring(0, valueStr.indexOf(".")); //remove decimals
                        if (valueStr.indexOf(",") != -1) valueStr = valueStr.substring(0, valueStr.indexOf(",")); //remove commas (decimal notation in few countries)
                        if (valueStr.indexOf("-") != -1) valueStr = "0";                                          //substitute negative values with zero

                        depthCursor.push({ name: eval("d." + dataColumns[dataColumns.length - 2]), size: valueStr });
                        //console.log("--- processed value:", valueStr);
                    }
                });
            });

            //console.log("**********composition data:", this.data[0]);
            //console.log("--- composition data:", JSON.stringify(hierarchyData));
            console.log("--- criteria list:", this.groupingList);
            this.data = hierarchyData;
            this.createChart();
        }); //end ngInit


    }

    /* ngOnChanges()  {
         console.log("****** change fired:");
         console.log("****** ParamList2:: Grouping list:",this.groupingList);
         console.log("**** ParamList1:: Portfolio checked list in onChanges:",this.paramList1)
  
          //if (this.chart) {
          //this.updateChart();
          //  }
      }*/

    createChart() {

        let width = this.width;//width = 960,
        let height = this.height;//700,
        let radius = (Math.min(width, height) / 2) - 15;
        //console.log("radius: ", radius);
        let formatNumber = d3.format(",d");

        let x = d3.scale.linear()
            .range([0, 2 * Math.PI]);

        let y = d3.scale.sqrt()
            .range([0, radius]);

        let color = d3.scale.category20c();

        let partition = d3.layout.partition()
            .value(function (d) { return d.size; });

        let arc = d3.svg.arc()
            .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
            .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
            .innerRadius(function (d) { return Math.max(0, y(d.y)); })
            .outerRadius(function (d) { return Math.max(0, y(d.y + d.dy)); });


        // Use: d3.select("div#simulation-1")
        let gdiv = d3.select(this.element).append("center");//.style({"align": "none"});

        let div = d3.select(this.SunburstTooltip).append("div")
            .style("position", "fixed")
            .style("z-index", "10")
            .style("opacity", 0);


        let svg = gdiv.append("svg")
            .attr("width", width)
            .attr("height", height)
            //.attr("preserveAspectRatio", "xMinYMin meet")
            .attr("preserveAspectRatio", "none")
            //.attr("viewBox", "0 0 " + width +" "+ height * .25)
            .attr("class", "svg-content")
            .classed("svg-content", true)
            .attr("style", "margin-top: 1px;")
            .append("g")
            .attr("transform", "translate(" + width / 2.6 + "," + (height / 2.1) + ")");

        let root = this.data;

        svg.selectAll("path")
            .data(partition.nodes(root))
            .enter().append("path")
            .attr("d", arc)
            .style("fill", function (d) { return color(d.name); })//color((d.children ? d : d.parent).name); })
            .on("click", function (d) {
                svg.transition()
                    .duration(750)
                    .tween("scale", function () {
                        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                            yd = d3.interpolate(y.domain(), [d.y, 1]),
                            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                        return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
                    })
                    .selectAll("path")
                    .attrTween("d", function (d) { return function () { return arc(d); }; });
            })
            .on('mouseover', function (d) {
                console.log("In Mouseover:d", d);
                let mouseCoords = d3.mouse(this);
                console.log("mouseCoords:", mouseCoords);
                let xCo = mouseCoords[0];
                let yCo = mouseCoords[1];
                div.transition()
                    .duration(50)
                    .style("opacity", .9);

                if (d.name != "USD") {
                    div.html(
                        "<span style='color:white;background: black; padding: 2px; text-align: center;width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                        + d.name + " - USD " + formatNumber(d.value) + "</span>"
                    )
                }
                else {
                    div.html(
                        "<span style='color:white;background: black;padding: 2px;text-align: center; width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                        + d.name + " - " + formatNumber(d.value) + "</span>"
                    )
                }
            })
            .on('mousemove', function (event) {

                div.style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on('mouseout', function (d) {
                console.log("In Mouseout:");
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
        /*  .append("title")
          .text(function(d) { if (d.name != "USD") { return d.name + " - USD " + formatNumber(d.value);} 
          else {return d.name + " - " + formatNumber(d.value);} });*/

        // console.log("-------------- partition.nodes(root):",partition.nodes(root));

        let flags = []; let output = []; let l = partition.nodes(root).length; let i;
        for (i = 0; i < l; i++) {
            if (flags[partition.nodes(root)[i].name]) continue;
            flags[partition.nodes(root)[i].name] = true;
            output.push(partition.nodes(root)[i]);
        }
        //console.log("-------------- before sorting output:",output); 

        //Sort by depth
        output.sort(function (a, b) {
            return a.depth - b.depth;
        });
        //console.log("-------------- after sorting output:",output);         
        let legend = svg.selectAll(".legend")
            //.data(partition.nodes(root))
            .data(output)
            .enter().append("g")
            .style("padding-bottom", "1px")
            .attr("class", "legend");

        let legendElementheight = 11;
        let scrFont = "11px";
        let boxWidth = 12;
        let boxHeight = 9;
        let textTopMargin = 8;
        if (this.maxScreen) {
            scrFont = "14px";
            boxWidth = 13;
            boxHeight = 13;
            legendElementheight = 15;
            textTopMargin = 11;
        }
        legend.append("rect")
            .attr("x", function (d, i) { return (d.depth) * 11 + radius - 5; })
            .attr("y", function (d, i) { return (legendElementheight * i) - radius; })
            .attr("width", boxWidth)
            .attr("height", boxHeight)
            .style("fill", function (d, i) { return color(d.name); });//color((d.children ? d : d.parent).name); });

        legend.append("text")
            .attr("class", "mono")
            .text(function (d) { return d.name; })
            .attr("fill", "#000") //"#fff") function(d) { return color(d.name)}
            .style("font-size", scrFont)
            .style("font-family", "Tahoma, Helvetica, sans-serif")
            .style("text-transform", "uppercase")
            .style("font-variant", "small-caps")
            .attr("x", function (d, i) { return (d.depth) * 11 + radius + 11; })
            .attr("y", function (d, i) { return (legendElementheight * i) - radius + textTopMargin; });
        /*
        svg.append("text")
            .attr("class", "mono")
            .text(this.heading)
            .style("fill", "#fff")
            .style("font-size", scrFont)
            .style("font-variant", "small-caps")    
            .style("font-family", "Tahoma, Helvetica, sans-serif")
            .style("text-transform", "uppercase")                 
            .attr("x", -radius-this.margin.left)
            .attr("y", -radius + 3);*/
        //let headingdiv = document.getElementById('d_heading');
        //headingdiv.innerHTML = '<b>'+ this.heading + '</b>';  
        this.chart = svg;

        //d3.select(window).on('resize', resize);
    }

    fullScreen() {
        console.log("************* In full screen");
        //this.chart.attr("width", 800).attr("height", 500);
        document.getElementById('chart').setAttribute("class", "Fullscreen");  //till here from chrome      

        console.log("************* parentElement", document.getElementById('chart').parentElement.parentElement.parentElement);
        // console.log("************* parentNode.nodeType", document.getElementById('chart').parentNode.nodeName.id);

        let viewportOffset = document.getElementById('chart').getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        let top = viewportOffset.top;
        let left = viewportOffset.left;

        let target = document.getElementById('analyticsDiv');
        let targetOffset = document.getElementById('analyticsDiv').getBoundingClientRect();
        let widthD = targetOffset.width;
        let heightD = targetOffset.height;

        let centerX = targetOffset.left + widthD / 2;
        let centerY = targetOffset.top + heightD / 2;

        let gDivLeft = left - 80;// - targetOffset.left;
        let gDivTop = top + 20; //+ targetOffset.top;

        //this.chart.attr("viewBox", " 500 500 " + this.width +" "+ this.height) 
        this.chart.attr("viewBox", " " + centerX + " " + centerY + " " + widthD + " " + heightD)
            .attr("transform", "scale(2 2) translate(" + gDivLeft + "," + gDivTop + ")");
        //.attr("transform", "translate(" + this.width + "," + (this.height) + ")");
        console.log("************* done full screen");
    }

    exitFullScreen() {
        console.log("************* In exit full screen");
        document.getElementById('chart').setAttribute("class", "svg-container");
        let viewportOffset = document.getElementById('chart').getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        let top = viewportOffset.top;
        let left = viewportOffset.left;

        let target = document.getElementById('chart');
        let targetOffset = document.getElementById('chart').getBoundingClientRect();
        let widthD = targetOffset.width;
        let heightD = targetOffset.height;

        let centerX = targetOffset.left + widthD / 2;
        let centerY = targetOffset.top + heightD / 2;

        let gDivLeft = left + 40;// - targetOffset.left;
        let gDivTop = left - 5; //+ targetOffset.top;

        //this.chart.attr("viewBox", " 500 500 " + this.width +" "+ this.height) 
        this.chart.attr("viewBox", " " + centerX + " " + centerY + " " + widthD + " " + heightD)
            .attr("transform", "scale(1 1) translate(" + gDivLeft + "," + gDivTop + ")");

        //this.chart.attr("width", 800).attr("height", 500);
        /*document.getElementById('chart').setAttribute("class", "svg-container");
        console.log("************* In zoomChart", document.getElementById('chart').getAttribute("class"));
       
       this.chart.attr("viewBox", " "+ this.width / 2.6 + " " + this.height / 2.1 +" " + this.width * 2.6 +" "+ this.height * 2.1)
       .attr("transform", "scale(1 .75)");*///  translate(10, 10)");
        //.attr("transform", "translate(" + this.width + "," + (this.height) + ")");
        console.log("************* exited full screen");

    }

}


