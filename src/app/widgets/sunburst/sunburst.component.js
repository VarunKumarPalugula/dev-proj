System.register(["@angular/core", "app/services/data.service", "d3v3"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, data_service_1, d3, SunburstComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }
        ],
        execute: function () {
            SunburstComponent = (function () {
                function SunburstComponent(dataService) {
                    this.dataService = dataService;
                    this.maxScreen = false;
                    // @Input() helpScreen: any = 0;
                    this.reload = 0;
                    this.margin = { top: 5, bottom: 5, left: 10, right: 10 };
                    this.helpclose = new core_1.EventEmitter;
                    this.addListenerEvent = new core_1.EventEmitter;
                    //console.log("********sunburst called:****************");
                }
                SunburstComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var dataREST;
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
                    this.dataService.getListItemsByPost('sunburst/getData', this.requestType).subscribe(function (listItems) {
                        console.log("--- Sunburst data:");
                        var dataREST = listItems;
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
                            var element = _this.chartContainer.nativeElement;
                            var gdiv = d3.select(element)
                                .append("div")
                                .attr("style", "width: " + _this.width + "px; height: " + _this.height + "px;")
                                .append("table")
                                .attr("width", _this.width)
                                .attr("height", _this.height).append("tr").append("td").append("p")
                                .text("No data available to load the graph")
                                .style("color", "#fff")
                                .style("font-size", 13)
                                .style("text-transform", "uppercase")
                                .style("text-align", "center")
                                .attr("x", _this.width / 2)
                                .attr("y", _this.height / 2);
                            return;
                        }
                        else if (dataREST.length == 1 && dataREST[0].status == "Fail") {
                            var element = _this.chartContainer.nativeElement;
                            var gdiv = d3.select(element)
                                .append("div")
                                .attr("style", "width: " + _this.width + "px; height: " + _this.height + "px;")
                                .append("table")
                                .attr("width", _this.width)
                                .attr("height", _this.height).append("tr").append("td").append("p")
                                .text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
                                .style("color", "red")
                                .style("font-size", 13)
                                .style("text-transform", "uppercase")
                                .style("text-align", "center")
                                .attr("x", _this.width / 2)
                                .attr("y", _this.height / 2);
                            return;
                        }
                        var dataColumns = Object.keys(dataREST[0]);
                        console.log("--- dataColumns:", dataColumns);
                        // first column/field setting from any record of 'data' ... or simply Total/Root
                        //let hierarchyData = { name: eval("dataREST[0]." + dataColumns[0]), children: [] };
                        var hierarchyData = { name: "Total", children: [] };
                        // Level/Middle columns... subset of 'paramList1' excluding the first column (root) and the last 2 columns (name, value... i.e. leaf)           
                        var levels = dataColumns.slice(1, dataColumns.length - 2);
                        console.log("--- levels: ", levels);
                        // Transform the data: Flat JSON (Adjacency list) to Hierarchical tree
                        // For each data row, loop through the expected levels traversing the output tree
                        dataREST.forEach(function (d) {
                            //console.log("*********dataTest record:",d);
                            // Keep this as a reference to the current level
                            var depthCursor = hierarchyData.children;
                            //console.log("*********** depth cursor:",depthCursor);
                            // Go down one level at a time
                            levels.forEach(function (property, depth) {
                                // Look to see if a branch has already been created
                                var index;
                                depthCursor.forEach(function (child, i) {
                                    if (d[property] == child.name)
                                        index = i;
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
                                    var valueStr = eval("d." + dataColumns[dataColumns.length - 1]);
                                    if (valueStr.indexOf(".") != -1)
                                        valueStr = valueStr.substring(0, valueStr.indexOf(".")); //remove decimals
                                    if (valueStr.indexOf(",") != -1)
                                        valueStr = valueStr.substring(0, valueStr.indexOf(",")); //remove commas (decimal notation in few countries)
                                    if (valueStr.indexOf("-") != -1)
                                        valueStr = "0"; //substitute negative values with zero
                                    depthCursor.push({ name: eval("d." + dataColumns[dataColumns.length - 2]), size: valueStr });
                                    //console.log("--- processed value:", valueStr);
                                }
                            });
                        });
                        //console.log("**********composition data:", this.data[0]);
                        //console.log("--- composition data:", JSON.stringify(hierarchyData));
                        console.log("--- criteria list:", _this.groupingList);
                        _this.data = hierarchyData;
                        _this.createChart();
                    }); //end ngInit
                };
                /* ngOnChanges()  {
                     console.log("****** change fired:");
                     console.log("****** ParamList2:: Grouping list:",this.groupingList);
                     console.log("**** ParamList1:: Portfolio checked list in onChanges:",this.paramList1)
              
                      //if (this.chart) {
                      //this.updateChart();
                      //  }
                  }*/
                SunburstComponent.prototype.createChart = function () {
                    var width = this.width; //width = 960,
                    var height = this.height; //700,
                    var radius = (Math.min(width, height) / 2) - 15;
                    //console.log("radius: ", radius);
                    var formatNumber = d3.format(",d");
                    var x = d3.scale.linear()
                        .range([0, 2 * Math.PI]);
                    var y = d3.scale.sqrt()
                        .range([0, radius]);
                    var color = d3.scale.category20c();
                    var partition = d3.layout.partition()
                        .value(function (d) { return d.size; });
                    var arc = d3.svg.arc()
                        .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
                        .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
                        .innerRadius(function (d) { return Math.max(0, y(d.y)); })
                        .outerRadius(function (d) { return Math.max(0, y(d.y + d.dy)); });
                    // Use: d3.select("div#simulation-1")
                    var gdiv = d3.select(this.element).append("center"); //.style({"align": "none"});
                    var div = d3.select(this.SunburstTooltip).append("div")
                        .style("position", "fixed")
                        .style("z-index", "10")
                        .style("opacity", 0);
                    var svg = gdiv.append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .attr("preserveAspectRatio", "none")
                        .attr("class", "svg-content")
                        .classed("svg-content", true)
                        .attr("style", "margin-top: 1px;")
                        .append("g")
                        .attr("transform", "translate(" + width / 2.6 + "," + (height / 2.1) + ")");
                    var root = this.data;
                    svg.selectAll("path")
                        .data(partition.nodes(root))
                        .enter().append("path")
                        .attr("d", arc)
                        .style("fill", function (d) { return color(d.name); }) //color((d.children ? d : d.parent).name); })
                        .on("click", function (d) {
                        svg.transition()
                            .duration(750)
                            .tween("scale", function () {
                            var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]), yd = d3.interpolate(y.domain(), [d.y, 1]), yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                            return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
                        })
                            .selectAll("path")
                            .attrTween("d", function (d) { return function () { return arc(d); }; });
                    })
                        .on('mouseover', function (d) {
                        console.log("In Mouseover:d", d);
                        var mouseCoords = d3.mouse(this);
                        console.log("mouseCoords:", mouseCoords);
                        var xCo = mouseCoords[0];
                        var yCo = mouseCoords[1];
                        div.transition()
                            .duration(50)
                            .style("opacity", .9);
                        if (d.name != "USD") {
                            div.html("<span style='color:white;background: black; padding: 2px; text-align: center;width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                                + d.name + " - USD " + formatNumber(d.value) + "</span>");
                        }
                        else {
                            div.html("<span style='color:white;background: black;padding: 2px;text-align: center; width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                                + d.name + " - " + formatNumber(d.value) + "</span>");
                        }
                    })
                        .on('mousemove', function (d) {
                        div.style("top", (event.pageY - 10) + "px")
                            .style("left", (event.pageX + 10) + "px");
                    })
                        .on('mouseout', function (d) {
                        console.log("In Mouseout:");
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
                    /*  .append("title")
                      .text(function(d) { if (d.name != "USD") { return d.name + " - USD " + formatNumber(d.value);}
                      else {return d.name + " - " + formatNumber(d.value);} });*/
                    // console.log("-------------- partition.nodes(root):",partition.nodes(root));
                    var flags = [];
                    var output = [];
                    var l = partition.nodes(root).length;
                    var i;
                    for (i = 0; i < l; i++) {
                        if (flags[partition.nodes(root)[i].name])
                            continue;
                        flags[partition.nodes(root)[i].name] = true;
                        output.push(partition.nodes(root)[i]);
                    }
                    //console.log("-------------- before sorting output:",output); 
                    //Sort by depth
                    output.sort(function (a, b) {
                        return a.depth - b.depth;
                    });
                    //console.log("-------------- after sorting output:",output);         
                    var legend = svg.selectAll(".legend")
                        .data(output)
                        .enter().append("g")
						.attr("transform","translate(50,30)")
						.attr("data-style-padding",10)
                        .style("padding-bottom", "5px")
                        .attr("class", "legend");
                    var legendElementheight = 13;
                    var scrFont = "11px";
                    var boxWidth = 12;
                    var boxHeight = 9;
                    var textTopMargin = 2;
					var countTxt = 0;
					var _this = this;
                    if (this.maxScreen) {
                        scrFont = "14px";
                        boxWidth = 13;
                        boxHeight = 13;
                        legendElementheight = 13;
                        textTopMargin = 5;
                    }
                     var legCrc = legend.append("circle")
                        .attr("cx", function (d, i) { 
									countTxt++;
										if(!_this.maxScreen && i>15) 
											return -1;
										return (d.depth) * 11 + radius + 20; 
							})
                        .attr("cy", function (d, i) { 
											if(!_this.maxScreen && i>15) 
												return -1;
											return (legendElementheight * i) - (radius+22);
							})												
                        .style("fill", function (d, i) { 
										if(!_this.maxScreen && i>15) 
											return "0";
										return color(d.name); 
							}); //color((d.children ? d : d.parent).name); });
						
							legCrc.attr("r",function(d,i) { 
											if(!_this.maxScreen && i>15) 
												return "0";
											return "0.4em"; 
										});
						

                    legend.append("text")
                        .attr("class", "mono")
                        .text(function (d,i) { 
							if(!_this.maxScreen && i>15) 
								return "";
							return d.name; 
						})
                        .attr("fill", "#000")
                        .style("font-size", "11px")
						.style("font-family", "Tahoma, Helvetica, sans-serif")
                        .style("text-transform", "uppercase")
						.style("white-space","nowrap")
						.style("width","50px")
						.style("overflow","hidden")
						.style("text-overflow","ellipsis")
                        .attr("x", function (d, i) { 
										if(!_this.maxScreen && i>15) 
											return -1;
										return (d.depth) * 11 + radius + 36; 
								})
                        .attr("y", function (d, i) { 
									if(!_this.maxScreen && i>15) 
										return -1;
									return (legendElementheight * i) - (radius+22) + textTopMargin; 
							});
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
                };
                SunburstComponent.prototype.fullScreen = function () {
                    console.log("************* In full screen");
                    //this.chart.attr("width", 800).attr("height", 500);
                    document.getElementById('chart').setAttribute("class", "Fullscreen"); //till here from chrome      
                    console.log("************* parentElement", document.getElementById('chart').parentElement.parentElement.parentElement);
                    console.log("************* parentNode.nodeType", document.getElementById('chart').parentNode.nodeName.id);
                    var viewportOffset = document.getElementById('chart').getBoundingClientRect();
                    // these are relative to the viewport, i.e. the window
                    var top = viewportOffset.top;
                    var left = viewportOffset.left;
                    var target = document.getElementById('analyticsDiv');
                    var targetOffset = document.getElementById('analyticsDiv').getBoundingClientRect();
                    var widthD = targetOffset.width;
                    var heightD = targetOffset.height;
                    var centerX = targetOffset.left + widthD / 2;
                    var centerY = targetOffset.top + heightD / 2;
                    var gDivLeft = left - 80; // - targetOffset.left;
                    var gDivTop = top + 20; //+ targetOffset.top;
                    //this.chart.attr("viewBox", " 500 500 " + this.width +" "+ this.height) 
                    this.chart.attr("viewBox", " " + centerX + " " + centerY + " " + widthD + " " + heightD)
                        .attr("transform", "scale(2 2) translate(" + gDivLeft + "," + gDivTop + ")");
                    //.attr("transform", "translate(" + this.width + "," + (this.height) + ")");
                    console.log("************* done full screen");
                };
                SunburstComponent.prototype.exitFullScreen = function () {
                    console.log("************* In exit full screen");
                    document.getElementById('chart').setAttribute("class", "svg-container");
                    var viewportOffset = document.getElementById('chart').getBoundingClientRect();
                    // these are relative to the viewport, i.e. the window
                    var top = viewportOffset.top;
                    var left = viewportOffset.left;
                    var target = document.getElementById('chart');
                    var targetOffset = document.getElementById('chart').getBoundingClientRect();
                    var widthD = targetOffset.width;
                    var heightD = targetOffset.height;
                    var centerX = targetOffset.left + widthD / 2;
                    var centerY = targetOffset.top + heightD / 2;
                    var gDivLeft = left + 40; // - targetOffset.left;
                    var gDivTop = left - 5; //+ targetOffset.top;
                    //this.chart.attr("viewBox", " 500 500 " + this.width +" "+ this.height) 
                    this.chart.attr("viewBox", " " + centerX + " " + centerY + " " + widthD + " " + heightD)
                        .attr("transform", "scale(1 1) translate(" + gDivLeft + "," + gDivTop + ")");
                    //this.chart.attr("width", 800).attr("height", 500);
                    /*document.getElementById('chart').setAttribute("class", "svg-container");
                    console.log("************* In zoomChart", document.getElementById('chart').getAttribute("class"));
                   
                   this.chart.attr("viewBox", " "+ this.width / 2.6 + " " + this.height / 2.1 +" " + this.width * 2.6 +" "+ this.height * 2.1)
                   .attr("transform", "scale(1 .75)");*/ //  translate(10, 10)");
                    //.attr("transform", "translate(" + this.width + "," + (this.height) + ")");
                    console.log("************* exited full screen");
                };
                __decorate([
                    core_1.ViewChild('chart'),
                    __metadata("design:type", core_1.ElementRef)
                ], SunburstComponent.prototype, "chartContainer", void 0);
                __decorate([
                    core_1.ViewChild('info'),
                    __metadata("design:type", core_1.ElementRef)
                ], SunburstComponent.prototype, "info", void 0);
                __decorate([
                    core_1.ViewChild('sunburst'),
                    __metadata("design:type", core_1.ElementRef)
                ], SunburstComponent.prototype, "sunburst", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], SunburstComponent.prototype, "requestType", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Boolean)
                ], SunburstComponent.prototype, "maxScreen", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], SunburstComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], SunburstComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], SunburstComponent.prototype, "paramList1", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], SunburstComponent.prototype, "groupingList", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], SunburstComponent.prototype, "changeTrigger", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], SunburstComponent.prototype, "reload", void 0);
                SunburstComponent = __decorate([
                    core_1.Component({
                        selector: 'iSunburst',
                        moduleId: __moduleName,
                        templateUrl: 'sunburst.component.html',
                        providers: [data_service_1.DataService],
                        styleUrls: ['sunburst.component.css'],
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _a || Object])
                ], SunburstComponent);
                return SunburstComponent;
                var _a;
            }());
            exports_1("SunburstComponent", SunburstComponent);
        }
    };
});
//# sourceMappingURL=sunburst.component.js.map