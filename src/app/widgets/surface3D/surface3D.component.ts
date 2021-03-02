import { Component, ViewChild, Input, ElementRef, ViewEncapsulation, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
//import * as mn from 'main';
import * as d3 from 'd3';

@Component({
  selector: 'iSurface3D',
  // moduleId: __moduleName,
  templateUrl: 'surface3D.component.html',
  styleUrls: ['surface3D.component.css'],
  providers: [DataService],
  encapsulation: ViewEncapsulation.None
})
export class Surface3DComponent {
  // public __moduleName: string;
  public element1: any;
  public element2: any;
  public element3: any;
  public element4: any;
  public element5: any;
  public element6: any;
  @Input() width: any;
  @Input() height: any;
  @Input() requestType: any;
  @Input() maxScreen: boolean = false;
  @Input() helpScreen: any = 0;
  @ViewChild('ui', { static: false }) private ui: ElementRef;
  @ViewChild('vis', { static: false }) private vis: ElementRef;
  @ViewChild('templateCell', { static: false }) private templateCell: ElementRef;
  @ViewChild('templateTreeNode', { static: false }) private templateTreeNode: ElementRef;
  @ViewChild('controls', { static: false }) private controls: ElementRef;
  @ViewChild('zoomEvent', { static: false }) private zoomEvent: ElementRef;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    let data: any;

    if (typeof this.element1 != "object") {
      this.element1 = this.ui.nativeElement;
      this.element2 = this.vis.nativeElement;
      this.element3 = this.templateCell.nativeElement;
      this.element4 = this.templateTreeNode.nativeElement;
      this.element5 = this.controls.nativeElement;
      this.element6 = this.zoomEvent.nativeElement;
    }
    else {
      console.log("***else:");
      let child1 = this.element1.childNodes;
      this.element1.removeChild(child1[1]);
      this.element1.removeChild(this.element1.lastChild);
      this.element2.removeChild(this.element2.lastChild);
    }

    this.dataService.getListItemsByPost('surface3D/getData', this.requestType).subscribe((listItems: any[]) => {
      data = listItems;
      console.log("--- Surface3D data:", data);



      /*        
        let data = [
        {
          "branchName": "UBS NewYork",
          "portfolioCode": "?DBU",
          "tenor": "0D",
          "netFlow": -45883.636,
          "inFlow": 45883.645,
          "outFlow": 91767.281,
          "netFlowPVEod": -45883.636,
          "netFlowLive": -45883.636
        },
        {
          "branchName": "UBS Edinburgh",
          "portfolioCode": "CAMB",
          "tenor": "4D",
          "netFlow": -998529.41,
          "inFlow": 1470.59,
          "outFlow": 1000000,
          "netFlowPVEod": -997657.63,
          "netFlowLive": -997657.63
        },
        {
          "branchName": "UBS NewYork",
          "portfolioCode": "CORE",
          "tenor": "0D",
          "netFlow": 974021.615,
          "inFlow": 974021.615,
          "outFlow": 0,
          "netFlowPVEod": 974021.615,
          "netFlowLive": 974021.615
        },
        {
          "branchName": "UBS NewYork",
          "portfolioCode": "LQDT",
          "tenor": "0D",
          "netFlow": 2000000,
          "inFlow": 3000000,
          "outFlow": 1000000,
          "netFlowPVEod": 12040000,
          "netFlowLive": 12040000
        },
        {
          "branchName": "UBS NewYork",
          "portfolioCode": "SYNP",
          "tenor": "0D",
          "netFlow": 908256.881,
          "inFlow": 908256.881,
          "outFlow": 0,
          "netFlowPVEod": 908256.881,
          "netFlowLive": 908256.881
        },
        {
          "branchName": "UBS Edinburgh",
          "portfolioCode": "VALO",
          "tenor": "4D",
          "netFlow": -686999229.44,
          "inFlow": 1000000,
          "outFlow": 687999229.44,
          "netFlowPVEod": -686391115.323,
          "netFlowLive": -686391115.323
        }
      ]  */

      /*      
    let data = 
    [
      {
        "name": "I. ?DBU",
        "year": "",
        "IN_FLOW": "",
        "OUT_FLOW": ""
      },
      {
        "name": "",
        "year": "0D",
        "IN_FLOW": "45883,645",
        "OUT_FLOW": "91767,281"
      },
      {
        "name": "",
        "year": "10D",
        "IN_FLOW": "92229,126",
        "OUT_FLOW": "46114,558"
      },
      {
        "name": "II. CAMB",
        "year": "",
        "IN_FLOW": "",
        "OUT_FLOW": ""
      },
      {
        "name": "",
        "year": "4D",
        "IN_FLOW": "1470,59",
        "OUT_FLOW": "1000000"
      },
      {
        "name": "III. CORE",
        "year": "",
        "IN_FLOW": "",
        "OUT_FLOW": ""
      },
      {
        "name": "",
        "year": "0D",
        "IN_FLOW": "974021,615",
        "OUT_FLOW": "0"
      },
      {
        "name": "",
        "year": "10D",
        "IN_FLOW": "0",
        "OUT_FLOW": "920525,329"
      },
      {
        "name": "IV. LQDT",
        "year": "",
        "IN_FLOW": "",
        "OUT_FLOW": ""
      },
      {
        "name": "",
        "year": "0D",
        "IN_FLOW": "9047581,66",
        "OUT_FLOW": "140140000"
      },
      {
        "name": "",
        "year": "7D",
        "IN_FLOW": "0",
        "OUT_FLOW": "2001166,67"
      },
      {
        "name": "",
        "year": "9D",
        "IN_FLOW": "690,14",
        "OUT_FLOW": "0"
      },
      {
        "name": "",
        "year": "10D",
        "IN_FLOW": "4000287,64",
        "OUT_FLOW": "5000000"
      },
      {
        "name": "",
        "year": "13D",
        "IN_FLOW": "94,87",
        "OUT_FLOW": "1000000"
      },
      {
        "name": "",
        "year": "2M",
        "IN_FLOW": "1000000",
        "OUT_FLOW": "0"
      },
      {
        "name": "",
        "year": "3M",
        "IN_FLOW": "1616,8",
        "OUT_FLOW": "0"
      },
      {
        "name": "",
        "year": "4M",
        "IN_FLOW": "8712,52",
        "OUT_FLOW": "0"
      },
      {
        "name": "",
        "year": "6M",
        "IN_FLOW": "21659,73",
        "OUT_FLOW": "1020000"
      },
      {
        "name": "",
        "year": "12M",
        "IN_FLOW": "1033015,94",
        "OUT_FLOW": "4000000"
      },
      {
        "name": "",
        "year": "13M",
        "IN_FLOW": "2817,76",
        "OUT_FLOW": "0"
      },
      {
        "name": "",
        "year": "25M",
        "IN_FLOW": "37834,2",
        "OUT_FLOW": "3000000"
      },
      {
        "name": "V. SYNP",
        "year": "",
        "IN_FLOW": "",
        "OUT_FLOW": ""
      },
      {
        "name": "",
        "year": "0D",
        "IN_FLOW": "908256,881",
        "OUT_FLOW": "0"
      },
      {
        "name": "",
        "year": "10D",
        "IN_FLOW": "0",
        "OUT_FLOW": "909501,065"
      },
      {
        "name": "VI. VALO",
        "year": "",
        "IN_FLOW": "",
        "OUT_FLOW": ""
      },
      {
        "name": "",
        "year": "4D",
        "IN_FLOW": "1000000",
        "OUT_FLOW": "687999229,44"
      }
    ];*/


      if (this.requestType == "bondReturns") {

        data =
          [
            {
              "name": "I. OMR5YGOVT",
              "year": "",
              "Return": ""
            },
            {
              "name": "",
              "year": "0D",
              "Return": "-0,004435683"
            },
            {
              "name": "",
              "year": "1D",
              "Return": "0,001485149"
            },
            {
              "name": "",
              "year": "2D",
              "Return": "0,000988631"
            },
            {
              "name": "",
              "year": "3D",
              "Return": "0,002469136"
            },
            {
              "name": "",
              "year": "4D",
              "Return": "-0,003940887"
            },
            {
              "name": "",
              "year": "5D",
              "Return": ",0,001978239"
            },
            {
              "name": "",
              "year": "6D",
              "Return": "-0,000493583"
            },
            {
              "name": "",
              "year": "7D",
              "Return": "0"
            },
            {
              "name": "",
              "year": "8D",
              "Return": "0"
            },
            {
              "name": "",
              "year": "9D",
              "Return": "0,008888889"
            },
            {
              "name": "",
              "year": "10D",
              "Return": "0,001468429"
            },
            {
              "name": "",
              "year": "11D",
              "Return": "0,005865103"
            },
            {
              "name": "",
              "year": "12D",
              "Return": "-0,002915452"
            },
            {
              "name": "",
              "year": "13D",
              "Return": "-0,000487329"
            },
            {
              "name": "",
              "year": "14D",
              "Return": "0,000975134"
            },
            {
              "name": "",
              "year": "15D",
              "Return": "0,001948368"
            },
            {
              "name": "II. OMR3YSUKUK",
              "year": "",
              "Return": ""
            },
            {
              "name": "",
              "year": "0D",
              "Return": "-0,004435683"
            },
            {
              "name": "",
              "year": "1D",
              "Return": "0,001485149"
            },
            {
              "name": "",
              "year": "2D",
              "Return": "0,000988631"
            },
            {
              "name": "",
              "year": "3D",
              "Return": "0,002469136"
            },
            {
              "name": "",
              "year": "4D",
              "Return": "-0,003940887"
            },
            {
              "name": "",
              "year": "5D",
              "Return": ",0,001978239"
            },
            {
              "name": "",
              "year": "6D",
              "Return": "-0,000493583"
            },
            {
              "name": "",
              "year": "7D",
              "Return": "0"
            },
            {
              "name": "",
              "year": "8D",
              "Return": "0"
            },
            {
              "name": "",
              "year": "9D",
              "Return": "0,008888889"
            },
            {
              "name": "",
              "year": "10D",
              "Return": "0,001468429"
            },
            {
              "name": "",
              "year": "11D",
              "Return": "0,005865103"
            },
            {
              "name": "",
              "year": "12D",
              "Return": "-0,002915452"
            },
            {
              "name": "",
              "year": "13D",
              "Return": "-0,000487329"
            },
            {
              "name": "",
              "year": "14D",
              "Return": "0,000975134"
            },
            {
              "name": "",
              "year": "15D",
              "Return": "0,001948368"
            },
            {
              "name": "III. OMR5YCORP",
              "year": "",
              "Return": ""
            },
            {
              "name": "",
              "year": "0D",
              "Return": "-0,004435683"
            },
            {
              "name": "",
              "year": "1D",
              "Return": "0,001485149"
            },
            {
              "name": "",
              "year": "2D",
              "Return": "0,000988631"
            },
            {
              "name": "",
              "year": "3D",
              "Return": "0,002469136"
            },
            {
              "name": "",
              "year": "4D",
              "Return": "-0,003940887"
            },
            {
              "name": "",
              "year": "5D",
              "Return": ",0,001978239"
            },
            {
              "name": "",
              "year": "6D",
              "Return": "-0,000493583"
            },
            {
              "name": "",
              "year": "7D",
              "Return": "0"
            },
            {
              "name": "",
              "year": "8D",
              "Return": "0"
            },
            {
              "name": "",
              "year": "9D",
              "Return": "0,008888889"
            },
            {
              "name": "",
              "year": "10D",
              "Return": "0,001468429"
            },
            {
              "name": "",
              "year": "11D",
              "Return": "0,005865103"
            },
            {
              "name": "",
              "year": "12D",
              "Return": "-0,002915452"
            },
            {
              "name": "",
              "year": "13D",
              "Return": "-0,000487329"
            },
            {
              "name": "",
              "year": "14D",
              "Return": "0,000975134"
            },
            {
              "name": "",
              "year": "15D",
              "Return": "0,001948368"
            }
          ];
      }
      else if (this.requestType == "cashflow") {

        data =
          [
            {
              "name": "I. GBC",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "110000",
              "inFlow": "110000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "99335,53"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "-110000",
              "inFlow": "0",
              "outFlow": "110000",
              "netFlowPVEod": "0",
              "netFlowLive": "-98690,66"
            },

            {
              "name": "II. ARBI",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "4043866,658",
              "inFlow": "4030000",
              "outFlow": "-13866,658",
              "netFlowPVEod": "0",
              "netFlowLive": "3705581,508"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "-2600000",
              "inFlow": "1300000",
              "outFlow": "3900000",
              "netFlowPVEod": "0",
              "netFlowLive": "-2367459,504"
            },
            {
              "name": "",
              "year": 3,
              "netFlow": "-10,335",
              "inFlow": "130000",
              "outFlow": "130010,335",
              "netFlowPVEod": "0",
              "netFlowLive": "-35,208"
            },
            {
              "name": "",
              "year": 6,
              "netFlow": "-135595,057",
              "inFlow": "0",
              "outFlow": "135595,057",
              "netFlowPVEod": "0",
              "netFlowLive": "-120841,5"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-173879552,886",
              "inFlow": "0",
              "outFlow": "173879552,886",
              "netFlowPVEod": "0",
              "netFlowLive": "-153936841,704"
            },

            {
              "name": "III. ATH2",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "10231000",
              "inFlow": "10231000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "9371113,56"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "85769828,443",
              "inFlow": "85345000",
              "outFlow": "-424828,443",
              "netFlowPVEod": "0",
              "netFlowLive": "78063212,196"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-113358518,572",
              "inFlow": "0",
              "outFlow": "113358518,572",
              "netFlowPVEod": "0",
              "netFlowLive": "-100376853,312"
            },

            {
              "name": "IV. CORE",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "1469000",
              "inFlow": "1469000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "1345534,728"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "327320000",
              "inFlow": "327320000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "295929680,092"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-344683447,299",
              "inFlow": "0",
              "outFlow": "344683447,299",
              "netFlowPVEod": "0",
              "netFlowLive": "-303062845,656"
            },

            {
              "name": "V. DBU",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "9958000",
              "inFlow": "9958000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "9123070,14"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "2289747,2",
              "inFlow": "2288000",
              "outFlow": "-1747,2",
              "netFlowPVEod": "0",
              "netFlowLive": "2093306,412"
            },
            {
              "name": "",
              "year": 3,
              "netFlow": "-1007397,26",
              "inFlow": "0",
              "outFlow": "1007397,26",
              "netFlowPVEod": "-990896,836",
              "netFlowLive": "-990896,836"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-9503248289,6",
              "inFlow": "0",
              "outFlow": "115337231,828",
              "netFlowPVEod": "0",
              "netFlowLive": "-8413297906,98"
            },

            {
              "name": "VI. DBUS",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "60500",
              "inFlow": "60500",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "54240,63"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-85751108,402",
              "inFlow": "0",
              "outFlow": "85751108,402",
              "netFlowPVEod": "0",
              "netFlowLive": "-75915235,566"
            },

            {
              "name": "VII. DBUT",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "47073000",
              "inFlow": "58500000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "43131311,148"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "130000",
              "inFlow": "130000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "119016,012"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-511865570,645",
              "inFlow": "0",
              "outFlow": "249453452,43",
              "netFlowPVEod": "0",
              "netFlowLive": "-453218698,236"
            },

            {
              "name": "VIII. DCHI",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-18889928107,531",
              "inFlow": "0",
              "outFlow": "18889928107,531",
              "netFlowPVEod": "0",
              "netFlowLive": "-16723413108,348"
            },

            {
              "name": "IX. DSHA",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "74306090,257",
              "inFlow": "193685508,337",
              "outFlow": "79495418,08",
              "netFlowPVEod": "-4768185,888",
              "netFlowLive": "67349093,128"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "70749720,873",
              "inFlow": "76829570,133",
              "outFlow": "6079849,26",
              "netFlowPVEod": "48172050,852",
              "netFlowLive": "68260772,976"
            },
            {
              "name": "",
              "year": 3,
              "netFlow": "-113906000",
              "inFlow": "8788000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "-103044311,412"
            },
            {
              "name": "",
              "year": 4,
              "netFlow": "-3067098,834",
              "inFlow": "62329617,796",
              "outFlow": "65396716,63",
              "netFlowPVEod": "-2906834,645",
              "netFlowLive": "-2906834,645"
            },
            {
              "name": "",
              "year": 5,
              "netFlow": "4505428,083",
              "inFlow": "7511938,311",
              "outFlow": "3006510,228",
              "netFlowPVEod": "-2385139,205",
              "netFlowLive": "3825815,743"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-483401096,037",
              "inFlow": "99342,356",
              "outFlow": "175534358,049",
              "netFlowPVEod": "94969,354",
              "netFlowLive": "-427595543,299"
            },
            {
              "name": "",
              "year": 8,
              "netFlow": "973,511",
              "inFlow": "973,511",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "0"
            },
            {
              "name": "",
              "year": 10,
              "netFlow": "99342,356",
              "inFlow": "99342,356",
              "outFlow": "0",
              "netFlowPVEod": "93187,636",
              "netFlowLive": "93187,636"
            },
            {
              "name": "",
              "year": 11,
              "netFlow": "962,93",
              "inFlow": "962,93",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "0"
            },
            {
              "name": "",
              "year": 13,
              "netFlow": "200241,796",
              "inFlow": "200241,796",
              "outFlow": "0",
              "netFlowPVEod": "91391,672",
              "netFlowLive": "91391,672"
            },
            {
              "name": "",
              "year": 14,
              "netFlow": "0",
              "inFlow": "0",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "0"
            },
            {
              "name": "",
              "year": 16,
              "netFlow": "96102,931",
              "inFlow": "96102,931",
              "outFlow": "0",
              "netFlowPVEod": "86760,392",
              "netFlowLive": "86760,392"
            },
            {
              "name": "",
              "year": 19,
              "netFlow": "99342,356",
              "inFlow": "99342,356",
              "outFlow": "0",
              "netFlowPVEod": "87939,134",
              "netFlowLive": "87939,134"
            },
            {
              "name": "",
              "year": 22,
              "netFlow": "99342,356",
              "inFlow": "99342,356",
              "outFlow": "0",
              "netFlowPVEod": "86259,874",
              "netFlowLive": "86259,874"
            },
            {
              "name": "",
              "year": 25,
              "netFlow": "10095023,123",
              "inFlow": "10095023,123",
              "outFlow": "0",
              "netFlowPVEod": "8611346,635",
              "netFlowLive": "8611346,635"
            },

            {
              "name": "X. EA",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "73528000",
              "inFlow": "73528000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "66934911,24"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-81386468,8",
              "inFlow": "0",
              "outFlow": "81386468,8",
              "netFlowPVEod": "0",
              "netFlowLive": "-72052036,92"
            },

            {
              "name": "XI. FCBS",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "117000",
              "inFlow": "117000",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "106508,88"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-122366,4",
              "inFlow": "0",
              "outFlow": "122366,4",
              "netFlowPVEod": "0",
              "netFlowLive": "-108331,86"
            },

            {
              "name": "XII. FCBT",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "734500",
              "inFlow": "734500",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "673205,244"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "25785059,729",
              "inFlow": "25701000",
              "outFlow": "-84059,729",
              "netFlowPVEod": "0",
              "netFlowLive": "23469839,64"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-48834976,073",
              "inFlow": "0",
              "outFlow": "48834976,073",
              "netFlowPVEod": "0",
              "netFlowLive": "-43238044,596"
            },
            {
              "name": "",
              "year": 17,
              "netFlow": "72144,23",
              "inFlow": "100000",
              "outFlow": "27855,77",
              "netFlowPVEod": "64906,861",
              "netFlowLive": "64906,861"
            },

            {
              "name": "XIII. FCBU",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "-7345000",
              "inFlow": "0",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "-6727673,652"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "80791677,733",
              "inFlow": "80536300",
              "outFlow": "-255377,733",
              "netFlowPVEod": "0",
              "netFlowLive": "73619740,392"
            },
            {
              "name": "",
              "year": 5,
              "netFlow": "80354000",
              "inFlow": "1361100000",
              "outFlow": "6746000",
              "netFlowPVEod": "-6554110,949",
              "netFlowLive": "71346657,511"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-2769238744,948",
              "inFlow": "0",
              "outFlow": "1465287819,606",
              "netFlowPVEod": "0",
              "netFlowLive": "-2452265629,536"
            },
            {
              "name": "",
              "year": 17,
              "netFlow": "-192611,111",
              "inFlow": "2141388,889",
              "outFlow": "2334000",
              "netFlowPVEod": "-175908,147",
              "netFlowLive": "-175908,147"
            },
            {
              "name": "",
              "year": 29,
              "netFlow": "-19044,87",
              "inFlow": "1101177,35",
              "outFlow": "1120222,22",
              "netFlowPVEod": "-17213,465",
              "netFlowLive": "-17213,465"
            },
            {
              "name": "",
              "year": 53,
              "netFlow": "-12500",
              "inFlow": "0",
              "outFlow": "12500",
              "netFlowPVEod": "-8935,893",
              "netFlowLive": "-8935,893"
            },

            {
              "name": "XIV. IMF",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 3,
              "netFlow": "-13075,868",
              "inFlow": "0",
              "outFlow": "13075,868",
              "netFlowPVEod": "0",
              "netFlowLive": "-11885,208"
            },

            {
              "name": "XV. MIRR",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "972592,85",
              "inFlow": "1003277,78",
              "outFlow": "30684,93",
              "netFlowPVEod": "962965,48",
              "netFlowLive": "962965,48"
            },
            {
              "name": "",
              "year": 3,
              "netFlow": "-4032903,34",
              "inFlow": "2022500",
              "outFlow": "6055403,34",
              "netFlowPVEod": "-3961078,964",
              "netFlowLive": "-3961078,964"
            },
            {
              "name": "",
              "year": 4,
              "netFlow": "323590486,11",
              "inFlow": "323590486,11",
              "outFlow": "0",
              "netFlowPVEod": "316694379,665",
              "netFlowLive": "316694379,665"
            },
            {
              "name": "",
              "year": 5,
              "netFlow": "-103000",
              "inFlow": "0",
              "outFlow": "103000",
              "netFlowPVEod": "-100070,179",
              "netFlowLive": "-100070,179"
            },
            {
              "name": "",
              "year": 6,
              "netFlow": "-48000",
              "inFlow": "0",
              "outFlow": "48000",
              "netFlowPVEod": "-46242,954",
              "netFlowLive": "-46242,954"
            },
            {
              "name": "",
              "year": 29,
              "netFlow": "-1190934,44",
              "inFlow": "0",
              "outFlow": "1190934,44",
              "netFlowPVEod": "-992610,112",
              "netFlowLive": "-992610,112"
            },

            {
              "name": "XVI. cfar",
              "year": null,
              "netFlow": "",
              "inFlow": "",
              "outFlow": "",
              "netFlowPVEod": "",
              "netFlowLive": ""
            },
            {
              "name": "",
              "year": 1,
              "netFlow": "22241700",
              "inFlow": "22241700",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "20381386,332"
            },
            {
              "name": "",
              "year": 2,
              "netFlow": "7502689,428",
              "inFlow": "16133000",
              "outFlow": "-14689,428",
              "netFlowPVEod": "0",
              "netFlowLive": "6837667,908"
            },
            {
              "name": "",
              "year": 7,
              "netFlow": "-1821217297,721",
              "inFlow": "0",
              "outFlow": "1820820780,392",
              "netFlowPVEod": "0",
              "netFlowLive": "-1607083230,469"
            },
            {
              "name": "",
              "year": 12,
              "netFlow": "-8645000",
              "inFlow": "0",
              "outFlow": "0",
              "netFlowPVEod": "0",
              "netFlowLive": "-7417897,692"
            }
          ];

      }
      else if (this.requestType == "mm_cashflow_bk") {

        data =
          [
            {
              "name": "I. CORE",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "37026",
              "Placements": "2307,9",
              "ADB_Loans": "4079,2",
              "Call_And_Notice": "43413,1"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "44629,3",
              "Placements": "2423,1",
              "ADB_Loans": "4671,2",
              "Call_And_Notice": "51723,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "51513,4",
              "Placements": "3842,2",
              "ADB_Loans": "5060,9",
              "Call_And_Notice": "60416,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "49871,2",
              "Placements": "3428,8",
              "ADB_Loans": "4963,6",
              "Call_And_Notice": "58263,6"
            },
            {
              "name": "1. Branch A",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "15444",
              "Placements": "619,9",
              "ADB_Loans": "679",
              "Call_And_Notice": "16742,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "22231,2",
              "Placements": "766,1",
              "ADB_Loans": "619,2",
              "Call_And_Notice": "23616,5"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "28927,5",
              "Placements": "1436,2",
              "ADB_Loans": "748,1",
              "Call_And_Notice": "31111,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "26456,9",
              "Placements": "1179,1",
              "ADB_Loans": "940,1",
              "Call_And_Notice": "28576,1"
            },
            {
              "name": "Dealer 1",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "12691,3",
              "Placements": "13,3",
              "ADB_Loans": "20,3",
              "Call_And_Notice": "12724,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "19535,6",
              "Placements": "101,6",
              "ADB_Loans": "20,3",
              "Call_And_Notice": "19641,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "25761,5",
              "Placements": "503,9",
              "ADB_Loans": "214,6",
              "Call_And_Notice": "26480"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "24737,7",
              "Placements": "554,4",
              "ADB_Loans": "276,6",
              "Call_And_Notice": "25568,7"
            },
            {
              "name": "Dealer 2",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1732,6",
              "Placements": "163,9",
              "ADB_Loans": "93,5",
              "Call_And_Notice": "1990"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1345,7",
              "Placements": "107,9",
              "ADB_Loans": "51,2",
              "Call_And_Notice": "1504,8"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1136,6",
              "Placements": "135",
              "ADB_Loans": "75,4",
              "Call_And_Notice": "1342"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "570,1",
              "Placements": "116,3",
              "ADB_Loans": "66,7",
              "Call_And_Notice": "753,1"
            },
            {
              "name": "Dealer 3",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "934,5",
              "Placements": "135,2",
              "ADB_Loans": "71,6",
              "Call_And_Notice": "1141,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1281,4",
              "Placements": "209,3",
              "ADB_Loans": "76,5",
              "Call_And_Notice": "1567,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1962,4",
              "Placements": "395,3",
              "ADB_Loans": "106,6",
              "Call_And_Notice": "2464,3"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "1116",
              "Placements": "281,9",
              "ADB_Loans": "61,1",
              "Call_And_Notice": "1459"
            },
            {
              "name": "Dealer 4",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "-",
              "Placements": "321,2",
              "ADB_Loans": "487,4",
              "Call_And_Notice": "808,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "-",
              "Placements": "394,1",
              "ADB_Loans": "348,7",
              "Call_And_Notice": "742,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "-",
              "Placements": "210,3",
              "ADB_Loans": "519,3",
              "Call_And_Notice": "729,6"
            },
            {
              "name": "Dealer 5",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "85,6",
              "Placements": "34,4",
              "ADB_Loans": "-",
              "Call_And_Notice": "120"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "68,5",
              "Placements": "26,1",
              "ADB_Loans": "-",
              "Call_And_Notice": "94,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "72",
              "Placements": "7,9",
              "ADB_Loans": "2,8",
              "Call_And_Notice": "82,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "33,1",
              "Placements": "16,2",
              "ADB_Loans": "16,4",
              "Call_And_Notice": "65,7"
            },
            {
              "name": "2. Branch B",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "7818,2",
              "Placements": "1465,8",
              "ADB_Loans": "524,9",
              "Call_And_Notice": "9808,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "9614,2",
              "Placements": "1369,5",
              "ADB_Loans": "690,5",
              "Call_And_Notice": "11674,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "10737,3",
              "Placements": "1914,3",
              "ADB_Loans": "980,9",
              "Call_And_Notice": "13632,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "10141,1",
              "Placements": "1571,8",
              "ADB_Loans": "911,9",
              "Call_And_Notice": "12624,8"
            },
            {
              "name": "Dealer 1",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1110,8",
              "Placements": "1025,7",
              "ADB_Loans": "-",
              "Call_And_Notice": "2136,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "778,7",
              "Placements": "977,4",
              "ADB_Loans": "-",
              "Call_And_Notice": "1756,1"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "897,8",
              "Placements": "1422,9",
              "ADB_Loans": "-",
              "Call_And_Notice": "2320,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "916",
              "Placements": "1070,6",
              "ADB_Loans": "6,1",
              "Call_And_Notice": "1992,7"
            },
            {
              "name": "Dealer 2",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "6399,6",
              "Placements": "440,1",
              "ADB_Loans": "504,5",
              "Call_And_Notice": "7344,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "8570,2",
              "Placements": "392,1",
              "ADB_Loans": "609,5",
              "Call_And_Notice": "9571,8"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "9541,1",
              "Placements": "491,4",
              "ADB_Loans": "860,1",
              "Call_And_Notice": "10892,6"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "8803,7",
              "Placements": "315",
              "ADB_Loans": "815,1",
              "Call_And_Notice": "9933,8"
            },
            {
              "name": "Dealer 3",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "5280,3",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "5280,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "7493,7",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "7493,7"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "7941,5",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "7941,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "7638,4",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "7638,4"
            },
            {
              "name": "Dealer 4",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "302,9",
              "Placements": "-",
              "ADB_Loans": "16,6",
              "Call_And_Notice": "319,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "265,3",
              "Placements": "-",
              "ADB_Loans": "77,7",
              "Call_And_Notice": "343"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "259,6",
              "Placements": "-",
              "ADB_Loans": "120,8",
              "Call_And_Notice": "380,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "220,8",
              "Placements": "-",
              "ADB_Loans": "90,7",
              "Call_And_Notice": "311,5"
            },
            {
              "name": "Dealer 5",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "3,8",
              "Call_And_Notice": "3,8"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "3,3",
              "Call_And_Notice": "3,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "-",
              "Placements": "186,2",
              "ADB_Loans": "-",
              "Call_And_Notice": "186,2"
            },
            {
              "name": "Dealer 6",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "4,9",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "4,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "38,8",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "38,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "200,6",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "200,6"
            },
            {
              "name": "II. INVT",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "10621,5",
              "Placements": "4101,1",
              "ADB_Loans": "16174,1",
              "Call_And_Notice": "30896,7"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "12204,4",
              "Placements": "4029,8",
              "ADB_Loans": "19021,8",
              "Call_And_Notice": "35256"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "11544,8",
              "Placements": "6318,5",
              "ADB_Loans": "19565,5",
              "Call_And_Notice": "37428,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "12899,4",
              "Placements": "6853,5",
              "ADB_Loans": "21150,1",
              "Call_And_Notice": "40903"
            },
            {
              "name": "1. Branch C",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "3510,3",
              "Placements": "2771,6",
              "ADB_Loans": "10172,8",
              "Call_And_Notice": "16454,7"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "4260,7",
              "Placements": "3102,4",
              "ADB_Loans": "11375,3",
              "Call_And_Notice": "18738,4"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "4368,4",
              "Placements": "3339,3",
              "ADB_Loans": "12606,3",
              "Call_And_Notice": "20314"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "5560,5",
              "Placements": "3445,6",
              "ADB_Loans": "13482,8",
              "Call_And_Notice": "22488,9"
            },
            {
              "name": "Ð°) Ð½Ð°ÑƒÑ‡Ð½Ñ‹Ðµ Ð¸ Ð½Ð°ÑƒÑ‡Ð½Ð¾-Ð¸Ñ�Ñ�Ð»ÐµÐ´Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÑ�ÐºÐ¸Ðµ ÑƒÑ‡Ñ€ÐµÐ¶Ð´ÐµÐ½Ð¸Ñ�",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "435",
              "Placements": "316,1",
              "ADB_Loans": "101,4",
              "Call_And_Notice": "852,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "549,1",
              "Placements": "288,3",
              "ADB_Loans": "128,9",
              "Call_And_Notice": "966,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "497,1",
              "Placements": "322,5",
              "ADB_Loans": "194,2",
              "Call_And_Notice": "1013,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "519,1",
              "Placements": "376,8",
              "ADB_Loans": "239",
              "Call_And_Notice": "1134,9"
            },
            {
              "name": "Ð±)Ð¿Ð¾Ð´Ð³Ð¾Ñ‚Ð¾Ð²ÐºÐ° ÐºÐ°Ð´Ñ€Ð¾Ð²",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "2421,5",
              "Placements": "2002,2",
              "ADB_Loans": "1148,6",
              "Call_And_Notice": "5572,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "2745,7",
              "Placements": "2165,8",
              "ADB_Loans": "1371,5",
              "Call_And_Notice": "6283"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "2877,3",
              "Placements": "2422,9",
              "ADB_Loans": "1509,5",
              "Call_And_Notice": "6809,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "3932,2",
              "Placements": "2442,2",
              "ADB_Loans": "1335,5",
              "Call_And_Notice": "7709,9"
            },
            {
              "name": "Paris",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1028,8",
              "Placements": "1318,4",
              "ADB_Loans": "18,1",
              "Call_And_Notice": "2365,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1399,4",
              "Placements": "1503,1",
              "ADB_Loans": "27,6",
              "Call_And_Notice": "2930,1"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1151,8",
              "Placements": "1523,7",
              "ADB_Loans": "42,4",
              "Call_And_Notice": "2717,9"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "1299,6",
              "Placements": "1542,5",
              "ADB_Loans": "34,7",
              "Call_And_Notice": "2876,8"
            },
            {
              "name": "Dubai",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "735,9",
              "Placements": "597,6",
              "ADB_Loans": "958,8",
              "Call_And_Notice": "2292,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "616,8",
              "Placements": "580,2",
              "ADB_Loans": "1145",
              "Call_And_Notice": "2342"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "493,4",
              "Placements": "422,5",
              "ADB_Loans": "931,5",
              "Call_And_Notice": "1847,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "484,6",
              "Placements": "508,5",
              "ADB_Loans": "848",
              "Call_And_Notice": "1841,1"
            },
            {
              "name": "Singapore",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "656,8",
              "Placements": "86,2",
              "ADB_Loans": "171,7",
              "Call_And_Notice": "914,7"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "729,5",
              "Placements": "82,5",
              "ADB_Loans": "198,9",
              "Call_And_Notice": "1010,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1232,1",
              "Placements": "476,7",
              "ADB_Loans": "535,6",
              "Call_And_Notice": "2244,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "2148",
              "Placements": "391,2",
              "ADB_Loans": "452,8",
              "Call_And_Notice": "2992"
            },
            {
              "name": "Dubai",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "336,8",
              "Placements": "70,8",
              "ADB_Loans": "6074,3",
              "Call_And_Notice": "6481,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "387,1",
              "Placements": "18,5",
              "ADB_Loans": "7123",
              "Call_And_Notice": "7528,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "337,8",
              "Placements": "18",
              "ADB_Loans": "7719",
              "Call_And_Notice": "8074,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "352",
              "Placements": "25,2",
              "ADB_Loans": "8486",
              "Call_And_Notice": "8863,2"
            },
            {
              "name": "Kuwait",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "67,5",
              "ADB_Loans": "1105,7",
              "Call_And_Notice": "1173,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "322,7",
              "Placements": "122,2",
              "ADB_Loans": "1180,4",
              "Call_And_Notice": "1625,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "384,1",
              "Placements": "119,1",
              "ADB_Loans": "1345",
              "Call_And_Notice": "1848,2"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "481,1",
              "Placements": "155,7",
              "ADB_Loans": "1476,8",
              "Call_And_Notice": "2113,6"
            },
            {
              "name": "Oman",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "317",
              "Placements": "315",
              "ADB_Loans": "1742,8",
              "Call_And_Notice": "2374,8"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "256,1",
              "Placements": "507,6",
              "ADB_Loans": "1571,5",
              "Call_And_Notice": "2335,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "272,1",
              "Placements": "456,8",
              "ADB_Loans": "1838,6",
              "Call_And_Notice": "2567,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "276,1",
              "Placements": "445,7",
              "ADB_Loans": "1950,5",
              "Call_And_Notice": "2667,3"
            },
            {
              "name": "2. Branch D",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "928,7",
              "Placements": "1117,6",
              "ADB_Loans": "4880,8",
              "Call_And_Notice": "6927,1"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1047,6",
              "Placements": "687,5",
              "ADB_Loans": "5854,5",
              "Call_And_Notice": "7589,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "948,4",
              "Placements": "780,7",
              "ADB_Loans": "6520,1",
              "Call_And_Notice": "8249,2"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "978,9",
              "Placements": "777,4",
              "ADB_Loans": "7193,7",
              "Call_And_Notice": "8950"
            },
            {
              "name": "Dealer 1",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "800,6",
              "Placements": "629,7",
              "ADB_Loans": "3370,3",
              "Call_And_Notice": "4800,6"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "956,1",
              "Placements": "439,1",
              "ADB_Loans": "3873,9",
              "Call_And_Notice": "5269,1"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "547,1",
              "Placements": "581,3",
              "ADB_Loans": "4484,4",
              "Call_And_Notice": "5612,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "591,2",
              "Placements": "701,4",
              "ADB_Loans": "5074,4",
              "Call_And_Notice": "6367"
            },
            {
              "name": "Dealer 2",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "401,3",
              "ADB_Loans": "1342,9",
              "Call_And_Notice": "1744,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "23,3",
              "Placements": "162,4",
              "ADB_Loans": "1267,6",
              "Call_And_Notice": "1453,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "121,1",
              "Placements": "76,6",
              "ADB_Loans": "1838",
              "Call_And_Notice": "2035,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "133,4",
              "Placements": "42,4",
              "ADB_Loans": "2043,2",
              "Call_And_Notice": "2219"
            },
            {
              "name": "Dealer 3",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "128,1",
              "Placements": "86,6",
              "ADB_Loans": "167,6",
              "Call_And_Notice": "382,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "68,2",
              "Placements": "86",
              "ADB_Loans": "713",
              "Call_And_Notice": "867,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "280,2",
              "Placements": "122,8",
              "ADB_Loans": "197,7",
              "Call_And_Notice": "600,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "254,3",
              "Placements": "33,6",
              "ADB_Loans": "76,1",
              "Call_And_Notice": "364"
            },
            {
              "name": "3. Branch E",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "17",
              "Placements": "21,1",
              "ADB_Loans": "61,3",
              "Call_And_Notice": "99,4"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "16,2",
              "Placements": "23,8",
              "ADB_Loans": "38,9",
              "Call_And_Notice": "78,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "12,1",
              "Placements": "21,7",
              "ADB_Loans": "45",
              "Call_And_Notice": "78,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "14,7",
              "Placements": "21,5",
              "ADB_Loans": "49,2",
              "Call_And_Notice": "85,4"
            },
            {
              "name": "4. Branch F",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "958",
              "Placements": "190,8",
              "ADB_Loans": "1059,2",
              "Call_And_Notice": "2208"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "922,2",
              "Placements": "216,1",
              "ADB_Loans": "1753,1",
              "Call_And_Notice": "2891,4"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1106,1",
              "Placements": "416,2",
              "ADB_Loans": "394,1",
              "Call_And_Notice": "1916,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "1332,4",
              "Placements": "626,1",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "5. Branch G",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "5207,5",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "5207,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "5957,7",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "5957,7"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "5109,8",
              "Placements": "1760,6",
              "ADB_Loans": "-",
              "Call_And_Notice": "6870,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "5012,9",
              "Placements": "1982,9",
              "ADB_Loans": "-",
              "Call_And_Notice": "6995,8"
            },
            {
              "name": "III. LQDT",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "5512,6",
              "Placements": "217,6",
              "ADB_Loans": "788,8",
              "Call_And_Notice": "6519"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "6025,2",
              "Placements": "46,7",
              "ADB_Loans": "484",
              "Call_And_Notice": "6555,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "7134,6",
              "Placements": "49,7",
              "ADB_Loans": "505,8",
              "Call_And_Notice": "7690,1"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "7786,5",
              "Placements": "211,5",
              "ADB_Loans": "790,5",
              "Call_And_Notice": "8788,5"
            },
            {
              "name": "1. Branch A",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "75231",
              "Placements": "7513,6",
              "ADB_Loans": "23493,7",
              "Call_And_Notice": "106238,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "89574,7",
              "Placements": "7804,4",
              "ADB_Loans": "26659,8",
              "Call_And_Notice": "124038,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "113685,4",
              "Placements": "11632,6",
              "ADB_Loans": "27981",
              "Call_And_Notice": "153299"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "132228,2",
              "Placements": "12066,8",
              "ADB_Loans": "30055,2",
              "Call_And_Notice": "174350,2"
            },
            {
              "name": "IV. GOLD",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "17481",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "17481"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "23150,9",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "23150,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "39181,4",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "39181,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "56752",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "56752"
            },
            {
              "name": "V. MIRR",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "3458,3",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "3458,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1955,3",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "1955,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "2062,4",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "2062,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "2201,9",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "2801,9"
            }
          ];

      }
      else if (this.requestType == "mm_cashflow") {
        data =
          [
            {
              "name": "I. CORE",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "37026",
              "Placements": "2307,9",
              "ADB_Loans": "4079,2",
              "Call_And_Notice": "43413,1"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "44629,3",
              "Placements": "2423,1",
              "ADB_Loans": "4671,2",
              "Call_And_Notice": "51723,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "51513,4",
              "Placements": "3842,2",
              "ADB_Loans": "5060,9",
              "Call_And_Notice": "60416,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "49871,2",
              "Placements": "3428,8",
              "ADB_Loans": "4963,6",
              "Call_And_Notice": "58263,6"
            },
            {
              "name": "1. Oman",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "15444",
              "Placements": "619,9",
              "ADB_Loans": "679",
              "Call_And_Notice": "16742,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "22231,2",
              "Placements": "766,1",
              "ADB_Loans": "619,2",
              "Call_And_Notice": "23616,5"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "28927,5",
              "Placements": "1436,2",
              "ADB_Loans": "748,1",
              "Call_And_Notice": "31111,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "26456,9",
              "Placements": "1179,1",
              "ADB_Loans": "940,1",
              "Call_And_Notice": "28576,1"
            },
            {
              "name": "AMGMT",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "12691,3",
              "Placements": "13,3",
              "ADB_Loans": "20,3",
              "Call_And_Notice": "12724,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "19535,6",
              "Placements": "101,6",
              "ADB_Loans": "20,3",
              "Call_And_Notice": "19641,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "25761,5",
              "Placements": "503,9",
              "ADB_Loans": "214,6",
              "Call_And_Notice": "26480"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "24737,7",
              "Placements": "554,4",
              "ADB_Loans": "276,6",
              "Call_And_Notice": "25568,7"
            },
            {
              "name": "ACORP",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1732,6",
              "Placements": "163,9",
              "ADB_Loans": "93,5",
              "Call_And_Notice": "1990"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1345,7",
              "Placements": "107,9",
              "ADB_Loans": "51,2",
              "Call_And_Notice": "1504,8"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1136,6",
              "Placements": "135",
              "ADB_Loans": "75,4",
              "Call_And_Notice": "1342"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "570,1",
              "Placements": "116,3",
              "ADB_Loans": "66,7",
              "Call_And_Notice": "753,1"
            },
            {
              "name": "AFODLR",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "934,5",
              "Placements": "135,2",
              "ADB_Loans": "71,6",
              "Call_And_Notice": "1141,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1281,4",
              "Placements": "209,3",
              "ADB_Loans": "76,5",
              "Call_And_Notice": "1567,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1962,4",
              "Placements": "395,3",
              "ADB_Loans": "106,6",
              "Call_And_Notice": "2464,3"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "1116",
              "Placements": "281,9",
              "ADB_Loans": "61,1",
              "Call_And_Notice": "1459"
            },
            {
              "name": "AADMN",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "-",
              "Placements": "321,2",
              "ADB_Loans": "487,4",
              "Call_And_Notice": "808,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "-",
              "Placements": "394,1",
              "ADB_Loans": "348,7",
              "Call_And_Notice": "742,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "-",
              "Placements": "210,3",
              "ADB_Loans": "519,3",
              "Call_And_Notice": "729,6"
            },
            {
              "name": "AINBK",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "85,6",
              "Placements": "34,4",
              "ADB_Loans": "-",
              "Call_And_Notice": "120"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "68,5",
              "Placements": "26,1",
              "ADB_Loans": "-",
              "Call_And_Notice": "94,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "72",
              "Placements": "7,9",
              "ADB_Loans": "2,8",
              "Call_And_Notice": "82,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "33,1",
              "Placements": "16,2",
              "ADB_Loans": "16,4",
              "Call_And_Notice": "65,7"
            },
            {
              "name": "2. Kuwait",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "7818,2",
              "Placements": "1465,8",
              "ADB_Loans": "524,9",
              "Call_And_Notice": "9808,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "9614,2",
              "Placements": "1369,5",
              "ADB_Loans": "690,5",
              "Call_And_Notice": "11674,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "10737,3",
              "Placements": "1914,3",
              "ADB_Loans": "980,9",
              "Call_And_Notice": "13632,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "10141,1",
              "Placements": "1571,8",
              "ADB_Loans": "911,9",
              "Call_And_Notice": "12624,8"
            },
            {
              "name": "AMGMT",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1110,8",
              "Placements": "1025,7",
              "ADB_Loans": "-",
              "Call_And_Notice": "2136,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "778,7",
              "Placements": "977,4",
              "ADB_Loans": "-",
              "Call_And_Notice": "1756,1"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "897,8",
              "Placements": "1422,9",
              "ADB_Loans": "-",
              "Call_And_Notice": "2320,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "916",
              "Placements": "1070,6",
              "ADB_Loans": "6,1",
              "Call_And_Notice": "1992,7"
            },
            {
              "name": "ACORP",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "6399,6",
              "Placements": "440,1",
              "ADB_Loans": "504,5",
              "Call_And_Notice": "7344,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "8570,2",
              "Placements": "392,1",
              "ADB_Loans": "609,5",
              "Call_And_Notice": "9571,8"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "9541,1",
              "Placements": "491,4",
              "ADB_Loans": "860,1",
              "Call_And_Notice": "10892,6"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "8803,7",
              "Placements": "315",
              "ADB_Loans": "815,1",
              "Call_And_Notice": "9933,8"
            },
            {
              "name": "AFODLR",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "5280,3",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "5280,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "7493,7",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "7493,7"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "7941,5",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "7941,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "7638,4",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "7638,4"
            },
            {
              "name": "AADMN",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "302,9",
              "Placements": "-",
              "ADB_Loans": "16,6",
              "Call_And_Notice": "319,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "265,3",
              "Placements": "-",
              "ADB_Loans": "77,7",
              "Call_And_Notice": "343"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "259,6",
              "Placements": "-",
              "ADB_Loans": "120,8",
              "Call_And_Notice": "380,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "220,8",
              "Placements": "-",
              "ADB_Loans": "90,7",
              "Call_And_Notice": "311,5"
            },
            {
              "name": "AINBK",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "3,8",
              "Call_And_Notice": "3,8"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "3,3",
              "Call_And_Notice": "3,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "-",
              "Placements": "186,2",
              "ADB_Loans": "-",
              "Call_And_Notice": "186,2"
            },
            {
              "name": "AOPUSR",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "4,9",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "4,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "-",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "38,8",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "38,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "200,6",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "200,6"
            },
            {
              "name": "II. INVT",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "10621,5",
              "Placements": "4101,1",
              "ADB_Loans": "16174,1",
              "Call_And_Notice": "30896,7"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "12204,4",
              "Placements": "4029,8",
              "ADB_Loans": "19021,8",
              "Call_And_Notice": "35256"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "11544,8",
              "Placements": "6318,5",
              "ADB_Loans": "19565,5",
              "Call_And_Notice": "37428,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "12899,4",
              "Placements": "6853,5",
              "ADB_Loans": "21150,1",
              "Call_And_Notice": "40903"
            },
            {
              "name": "1. Branch C",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "3510,3",
              "Placements": "2771,6",
              "ADB_Loans": "10172,8",
              "Call_And_Notice": "16454,7"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "4260,7",
              "Placements": "3102,4",
              "ADB_Loans": "11375,3",
              "Call_And_Notice": "18738,4"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "4368,4",
              "Placements": "3339,3",
              "ADB_Loans": "12606,3",
              "Call_And_Notice": "20314"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "5560,5",
              "Placements": "3445,6",
              "ADB_Loans": "13482,8",
              "Call_And_Notice": "22488,9"
            },
            {
              "name": "Kuwait",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "435",
              "Placements": "316,1",
              "ADB_Loans": "101,4",
              "Call_And_Notice": "852,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "549,1",
              "Placements": "288,3",
              "ADB_Loans": "128,9",
              "Call_And_Notice": "966,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "497,1",
              "Placements": "322,5",
              "ADB_Loans": "194,2",
              "Call_And_Notice": "1013,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "519,1",
              "Placements": "376,8",
              "ADB_Loans": "239",
              "Call_And_Notice": "1134,9"
            },
            {
              "name": "Dubai",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "2421,5",
              "Placements": "2002,2",
              "ADB_Loans": "1148,6",
              "Call_And_Notice": "5572,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "2745,7",
              "Placements": "2165,8",
              "ADB_Loans": "1371,5",
              "Call_And_Notice": "6283"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "2877,3",
              "Placements": "2422,9",
              "ADB_Loans": "1509,5",
              "Call_And_Notice": "6809,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "3932,2",
              "Placements": "2442,2",
              "ADB_Loans": "1335,5",
              "Call_And_Notice": "7709,9"
            },
            {
              "name": "Oman",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1028,8",
              "Placements": "1318,4",
              "ADB_Loans": "18,1",
              "Call_And_Notice": "2365,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1399,4",
              "Placements": "1503,1",
              "ADB_Loans": "27,6",
              "Call_And_Notice": "2930,1"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1151,8",
              "Placements": "1523,7",
              "ADB_Loans": "42,4",
              "Call_And_Notice": "2717,9"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "1299,6",
              "Placements": "1542,5",
              "ADB_Loans": "34,7",
              "Call_And_Notice": "2876,8"
            },
            {
              "name": "Singapore",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "735,9",
              "Placements": "597,6",
              "ADB_Loans": "958,8",
              "Call_And_Notice": "2292,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "616,8",
              "Placements": "580,2",
              "ADB_Loans": "1145",
              "Call_And_Notice": "2342"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "493,4",
              "Placements": "422,5",
              "ADB_Loans": "931,5",
              "Call_And_Notice": "1847,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "484,6",
              "Placements": "508,5",
              "ADB_Loans": "848",
              "Call_And_Notice": "1841,1"
            },
            {
              "name": "Paris",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "656,8",
              "Placements": "86,2",
              "ADB_Loans": "171,7",
              "Call_And_Notice": "914,7"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "729,5",
              "Placements": "82,5",
              "ADB_Loans": "198,9",
              "Call_And_Notice": "1010,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1232,1",
              "Placements": "476,7",
              "ADB_Loans": "535,6",
              "Call_And_Notice": "2244,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "2148",
              "Placements": "391,2",
              "ADB_Loans": "452,8",
              "Call_And_Notice": "2992"
            },
            {
              "name": "Dubai",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "336,8",
              "Placements": "70,8",
              "ADB_Loans": "6074,3",
              "Call_And_Notice": "6481,9"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "387,1",
              "Placements": "18,5",
              "ADB_Loans": "7123",
              "Call_And_Notice": "7528,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "337,8",
              "Placements": "18",
              "ADB_Loans": "7719",
              "Call_And_Notice": "8074,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "352",
              "Placements": "25,2",
              "ADB_Loans": "8486",
              "Call_And_Notice": "8863,2"
            },
            {
              "name": "Texas",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "67,5",
              "ADB_Loans": "1105,7",
              "Call_And_Notice": "1173,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "322,7",
              "Placements": "122,2",
              "ADB_Loans": "1180,4",
              "Call_And_Notice": "1625,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "384,1",
              "Placements": "119,1",
              "ADB_Loans": "1345",
              "Call_And_Notice": "1848,2"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "481,1",
              "Placements": "155,7",
              "ADB_Loans": "1476,8",
              "Call_And_Notice": "2113,6"
            },
            {
              "name": "London",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "317",
              "Placements": "315",
              "ADB_Loans": "1742,8",
              "Call_And_Notice": "2374,8"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "256,1",
              "Placements": "507,6",
              "ADB_Loans": "1571,5",
              "Call_And_Notice": "2335,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "272,1",
              "Placements": "456,8",
              "ADB_Loans": "1838,6",
              "Call_And_Notice": "2567,5"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "276,1",
              "Placements": "445,7",
              "ADB_Loans": "1950,5",
              "Call_And_Notice": "2667,3"
            },
            {
              "name": "2. Branch D",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "928,7",
              "Placements": "1117,6",
              "ADB_Loans": "4880,8",
              "Call_And_Notice": "6927,1"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1047,6",
              "Placements": "687,5",
              "ADB_Loans": "5854,5",
              "Call_And_Notice": "7589,6"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "948,4",
              "Placements": "780,7",
              "ADB_Loans": "6520,1",
              "Call_And_Notice": "8249,2"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "978,9",
              "Placements": "777,4",
              "ADB_Loans": "7193,7",
              "Call_And_Notice": "8950"
            },
            {
              "name": "Dealer 1",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "800,6",
              "Placements": "629,7",
              "ADB_Loans": "3370,3",
              "Call_And_Notice": "4800,6"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "956,1",
              "Placements": "439,1",
              "ADB_Loans": "3873,9",
              "Call_And_Notice": "5269,1"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "547,1",
              "Placements": "581,3",
              "ADB_Loans": "4484,4",
              "Call_And_Notice": "5612,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "591,2",
              "Placements": "701,4",
              "ADB_Loans": "5074,4",
              "Call_And_Notice": "6367"
            },
            {
              "name": "Dealer 2",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "-",
              "Placements": "401,3",
              "ADB_Loans": "1342,9",
              "Call_And_Notice": "1744,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "23,3",
              "Placements": "162,4",
              "ADB_Loans": "1267,6",
              "Call_And_Notice": "1453,3"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "121,1",
              "Placements": "76,6",
              "ADB_Loans": "1838",
              "Call_And_Notice": "2035,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "133,4",
              "Placements": "42,4",
              "ADB_Loans": "2043,2",
              "Call_And_Notice": "2219"
            },
            {
              "name": "Dealer 3",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "128,1",
              "Placements": "86,6",
              "ADB_Loans": "167,6",
              "Call_And_Notice": "382,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "68,2",
              "Placements": "86",
              "ADB_Loans": "713",
              "Call_And_Notice": "867,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "280,2",
              "Placements": "122,8",
              "ADB_Loans": "197,7",
              "Call_And_Notice": "600,7"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "254,3",
              "Placements": "33,6",
              "ADB_Loans": "76,1",
              "Call_And_Notice": "364"
            },
            {
              "name": "3. Branch E",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "17",
              "Placements": "21,1",
              "ADB_Loans": "61,3",
              "Call_And_Notice": "99,4"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "16,2",
              "Placements": "23,8",
              "ADB_Loans": "38,9",
              "Call_And_Notice": "78,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "12,1",
              "Placements": "21,7",
              "ADB_Loans": "45",
              "Call_And_Notice": "78,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "14,7",
              "Placements": "21,5",
              "ADB_Loans": "49,2",
              "Call_And_Notice": "85,4"
            },
            {
              "name": "4. Branch F",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "958",
              "Placements": "190,8",
              "ADB_Loans": "1059,2",
              "Call_And_Notice": "2208"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "922,2",
              "Placements": "216,1",
              "ADB_Loans": "1753,1",
              "Call_And_Notice": "2891,4"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1106,1",
              "Placements": "416,2",
              "ADB_Loans": "394,1",
              "Call_And_Notice": "1916,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "1332,4",
              "Placements": "626,1",
              "ADB_Loans": "-",
              "Call_And_Notice": "-"
            },
            {
              "name": "5. Branch G",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "5207,5",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "5207,5"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "5957,7",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "5957,7"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "5109,8",
              "Placements": "1760,6",
              "ADB_Loans": "-",
              "Call_And_Notice": "6870,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "5012,9",
              "Placements": "1982,9",
              "ADB_Loans": "-",
              "Call_And_Notice": "6995,8"
            },
            {
              "name": "III. LQDT",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "5512,6",
              "Placements": "217,6",
              "ADB_Loans": "788,8",
              "Call_And_Notice": "6519"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "6025,2",
              "Placements": "46,7",
              "ADB_Loans": "484",
              "Call_And_Notice": "6555,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "7134,6",
              "Placements": "49,7",
              "ADB_Loans": "505,8",
              "Call_And_Notice": "7690,1"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "7786,5",
              "Placements": "211,5",
              "ADB_Loans": "790,5",
              "Call_And_Notice": "8788,5"
            },
            {
              "name": "1. Kuwait",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "75231",
              "Placements": "7513,6",
              "ADB_Loans": "23493,7",
              "Call_And_Notice": "106238,3"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "89574,7",
              "Placements": "7804,4",
              "ADB_Loans": "26659,8",
              "Call_And_Notice": "124038,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "113685,4",
              "Placements": "11632,6",
              "ADB_Loans": "27981",
              "Call_And_Notice": "153299"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "132228,2",
              "Placements": "12066,8",
              "ADB_Loans": "30055,2",
              "Call_And_Notice": "174350,2"
            },
            {
              "name": "IV. MGMT",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1131,6",
              "Placements": "887",
              "ADB_Loans": "2451,6",
              "Call_And_Notice": "4470,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1609,6",
              "Placements": "1304,8",
              "ADB_Loans": "2482,8",
              "Call_And_Notice": "5397,2"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "2248,8",
              "Placements": "1422,2",
              "ADB_Loans": "2848,8",
              "Call_And_Notice": "6519,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "2117,2",
              "Placements": "1573",
              "ADB_Loans": "3151",
              "Call_And_Notice": "6841,2"
            },
            {
              "name": "Delhi",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "1101,8",
              "Placements": "761,6",
              "ADB_Loans": "2205,6",
              "Call_And_Notice": "4069"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "1387,2",
              "Placements": "1024,5",
              "ADB_Loans": "2482,8",
              "Call_And_Notice": "4894,5"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "1990,1",
              "Placements": "1126,9",
              "ADB_Loans": "2848,8",
              "Call_And_Notice": "5965,8"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "1821",
              "Placements": "1234",
              "ADB_Loans": "3151",
              "Call_And_Notice": "6206"
            },
            {
              "name": "Mumbai",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "29,8",
              "Placements": "125,4",
              "ADB_Loans": "246",
              "Call_And_Notice": "401,2"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "222,4",
              "Placements": "280,3",
              "ADB_Loans": "-",
              "Call_And_Notice": "502,7"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "258,7",
              "Placements": "295,3",
              "ADB_Loans": "-",
              "Call_And_Notice": "554"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "296,2",
              "Placements": "339",
              "ADB_Loans": "-",
              "Call_And_Notice": "635,2"
            },
            {
              "name": "V. DSHA",
              "year": null,
              "Deposits": "",
              "Placements": "",
              "ADB_Loans": "",
              "Call_And_Notice": ""
            },
            {
              "name": "",
              "year": 2014,
              "Deposits": "17481",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "17481"
            },
            {
              "name": "",
              "year": 2015,
              "Deposits": "23150,9",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "23150,9"
            },
            {
              "name": "",
              "year": 2016,
              "Deposits": "39181,4",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "39181,4"
            },
            {
              "name": "",
              "year": 2017,
              "Deposits": "56752",
              "Placements": "-",
              "ADB_Loans": "-",
              "Call_And_Notice": "56752"
            }/*,
 {
   "name": "VI. MIRR",
   "year": null,
   "Deposits": "",
   "Placements": "",
   "ADB_Loans": "",
   "Call_And_Notice": ""
 },
 {
   "name": "",
   "year": 2014,
   "Deposits": "3458,3",
   "Placements": "-",
   "ADB_Loans": "-",
   "Call_And_Notice": "3458,3"
 },
 {
   "name": "",
   "year": 2015,
   "Deposits": "1955,3",
   "Placements": "-",
   "ADB_Loans": "-",
   "Call_And_Notice": "1955,3"
 },
 {
   "name": "",
   "year": 2016,
   "Deposits": "2062,4",
   "Placements": "-",
   "ADB_Loans": "-",
   "Call_And_Notice": "2062,4"
 },
 {
   "name": "",
   "year": 2017,
   "Deposits": "2201,9",
   "Placements": "-",
   "ADB_Loans": "-",
   "Call_And_Notice": "2801,9"
 }*/
          ];
      } else if (this.requestType == "risk") {
        /*   data = 
       [
        {
          "name": "I. Oman",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0,0",
          "Out_Flow": "1000000,0",
          "Net_Flow": "1000000,0",
          "FS_EOD": "100000,0",
          "FS_Live": "100000,0"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "1500000",
          "Net_Flow": "1500000",
          "FS_EOD": "150000",
          "FS_Live": "150000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "2000000",
          "Net_Flow": "2000000",
          "FS_EOD": "200000",
          "FS_Live": "200000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "2500000",
          "Net_Flow": "2500000",
          "FS_EOD": "250000",
          "FS_Live": "250000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "3000000",
          "Out_Flow": "0",
          "Net_Flow": "3000000",
          "FS_EOD": "300000",
          "FS_Live": "300000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "4000000",
          "Out_Flow": "0",
          "Net_Flow": "4000000",
          "FS_EOD": "400000",
          "FS_Live": "400000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "4500000",
          "Out_Flow": "0",
          "Net_Flow": "4500000",
          "FS_EOD": "450000",
          "FS_Live": "450000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "5000000",
          "Out_Flow": "0",
          "Net_Flow": "5000000",
          "FS_EOD": "500000",
          "FS_Live": "500000"
        },
        {
          "name": "1. CORE",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "350000",
          "Net_Flow": "350000",
          "FS_EOD": "35000",
          "FS_Live": "35000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "525000",
          "Net_Flow": "525000",
          "FS_EOD": "52500",
          "FS_Live": "52500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "700000",
          "Net_Flow": "700000",
          "FS_EOD": "70000",
          "FS_Live": "70000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "875000",
          "Net_Flow": "875000",
          "FS_EOD": "87500",
          "FS_Live": "87500"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "1050000",
          "Out_Flow": "0",
          "Net_Flow": "1050000",
          "FS_EOD": "105000",
          "FS_Live": "105000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "1400000",
          "Out_Flow": "0",
          "Net_Flow": "1400000",
          "FS_EOD": "140000",
          "FS_Live": "140000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "1575000",
          "Out_Flow": "0",
          "Net_Flow": "1575000",
          "FS_EOD": "157500",
          "FS_Live": "157500"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "1750000",
          "Out_Flow": "0",
          "Net_Flow": "1750000",
          "FS_EOD": "175000",
          "FS_Live": "175000"
        },
        {
          "name": "a) OMR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "157500",
          "Net_Flow": "157500",
          "FS_EOD": "15750",
          "FS_Live": "15750"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "236250",
          "Net_Flow": "236250",
          "FS_EOD": "23625",
          "FS_Live": "23625"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "315000",
          "Net_Flow": "315000",
          "FS_EOD": "31500",
          "FS_Live": "31500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "393750",
          "Net_Flow": "393750",
          "FS_EOD": "39375",
          "FS_Live": "39375"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "472500",
          "Out_Flow": "0",
          "Net_Flow": "472500",
          "FS_EOD": "47250",
          "FS_Live": "47250"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "630000",
          "Out_Flow": "0",
          "Net_Flow": "630000",
          "FS_EOD": "63000",
          "FS_Live": "63000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "708750",
          "Out_Flow": "0",
          "Net_Flow": "708750",
          "FS_EOD": "70875",
          "FS_Live": "70875"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "787500",
          "Out_Flow": "0",
          "Net_Flow": "787500",
          "FS_EOD": "78750",
          "FS_Live": "78750"
        },
        {
          "name": "b) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "87500",
          "Net_Flow": "87500",
          "FS_EOD": "8750",
          "FS_Live": "8750"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "131250",
          "Net_Flow": "131250",
          "FS_EOD": "13125",
          "FS_Live": "13125"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "175000",
          "Net_Flow": "175000",
          "FS_EOD": "17500",
          "FS_Live": "17500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "218750",
          "Net_Flow": "218750",
          "FS_EOD": "21875",
          "FS_Live": "21875"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "262500",
          "Out_Flow": "0",
          "Net_Flow": "262500",
          "FS_EOD": "26250",
          "FS_Live": "26250"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "350000",
          "Out_Flow": "0",
          "Net_Flow": "350000",
          "FS_EOD": "35000",
          "FS_Live": "35000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "393750",
          "Out_Flow": "0",
          "Net_Flow": "393750",
          "FS_EOD": "39375",
          "FS_Live": "39375"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "437500",
          "Out_Flow": "0",
          "Net_Flow": "437500",
          "FS_EOD": "43750",
          "FS_Live": "43750"
        },
        {
          "name": "c) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "122500",
          "Net_Flow": "122500",
          "FS_EOD": "12250",
          "FS_Live": "12250"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "183750",
          "Net_Flow": "183750",
          "FS_EOD": "18375",
          "FS_Live": "18375"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "245000",
          "Net_Flow": "245000",
          "FS_EOD": "24500",
          "FS_Live": "24500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "306250",
          "Net_Flow": "306250",
          "FS_EOD": "30625",
          "FS_Live": "30625"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "367500",
          "Out_Flow": "0",
          "Net_Flow": "367500",
          "FS_EOD": "36750",
          "FS_Live": "36750"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "490000",
          "Out_Flow": "0",
          "Net_Flow": "490000",
          "FS_EOD": "49000",
          "FS_Live": "49000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "551250",
          "Out_Flow": "0",
          "Net_Flow": "551250",
          "FS_EOD": "55125",
          "FS_Live": "55125"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "612500",
          "Out_Flow": "0",
          "Net_Flow": "612500",
          "FS_EOD": "61250",
          "FS_Live": "61250"
        },
        {
          "name": "2. LQDT",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "400000",
          "Net_Flow": "400000",
          "FS_EOD": "40000",
          "FS_Live": "40000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "600000",
          "Net_Flow": "600000",
          "FS_EOD": "60000",
          "FS_Live": "60000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "800000",
          "Net_Flow": "800000",
          "FS_EOD": "80000",
          "FS_Live": "80000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "1000000",
          "Net_Flow": "1000000",
          "FS_EOD": "100000",
          "FS_Live": "100000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "1200000",
          "Out_Flow": "0",
          "Net_Flow": "1200000",
          "FS_EOD": "120000",
          "FS_Live": "120000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "1600000",
          "Out_Flow": "0",
          "Net_Flow": "1600000",
          "FS_EOD": "160000",
          "FS_Live": "160000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "1800000",
          "Out_Flow": "0",
          "Net_Flow": "1800000",
          "FS_EOD": "180000",
          "FS_Live": "180000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "2000000",
          "Out_Flow": "0",
          "Net_Flow": "2000000",
          "FS_EOD": "200000",
          "FS_Live": "200000"
        },
        {
          "name": "d) OMR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "140000",
          "Net_Flow": "140000",
          "FS_EOD": "14000",
          "FS_Live": "14000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "210000",
          "Net_Flow": "210000",
          "FS_EOD": "21000",
          "FS_Live": "21000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "280000",
          "Net_Flow": "280000",
          "FS_EOD": "28000",
          "FS_Live": "28000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "350000",
          "Net_Flow": "350000",
          "FS_EOD": "35000",
          "FS_Live": "35000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "420000",
          "Out_Flow": "0",
          "Net_Flow": "420000",
          "FS_EOD": "42000",
          "FS_Live": "42000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "560000",
          "Out_Flow": "0",
          "Net_Flow": "560000",
          "FS_EOD": "56000",
          "FS_Live": "56000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "630000",
          "Out_Flow": "0",
          "Net_Flow": "630000",
          "FS_EOD": "63000",
          "FS_Live": "63000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "700000",
          "Out_Flow": "0",
          "Net_Flow": "700000",
          "FS_EOD": "70000",
          "FS_Live": "70000"
        },
        {
          "name": "e) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "160000",
          "Net_Flow": "160000",
          "FS_EOD": "16000",
          "FS_Live": "16000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "240000",
          "Net_Flow": "240000",
          "FS_EOD": "24000",
          "FS_Live": "24000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "320000",
          "Net_Flow": "320000",
          "FS_EOD": "32000",
          "FS_Live": "32000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "400000",
          "Net_Flow": "400000",
          "FS_EOD": "40000",
          "FS_Live": "40000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "480000",
          "Out_Flow": "0",
          "Net_Flow": "480000",
          "FS_EOD": "48000",
          "FS_Live": "48000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "640000",
          "Out_Flow": "0",
          "Net_Flow": "640000",
          "FS_EOD": "64000",
          "FS_Live": "64000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "720000",
          "Out_Flow": "0",
          "Net_Flow": "720000",
          "FS_EOD": "72000",
          "FS_Live": "72000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "800000",
          "Out_Flow": "0",
          "Net_Flow": "800000",
          "FS_EOD": "80000",
          "FS_Live": "80000"
        },
        {
          "name": "f) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "100000",
          "Net_Flow": "100000",
          "FS_EOD": "10000",
          "FS_Live": "10000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "150000",
          "Net_Flow": "150000",
          "FS_EOD": "15000",
          "FS_Live": "15000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "200000",
          "Net_Flow": "200000",
          "FS_EOD": "20000",
          "FS_Live": "20000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "250000",
          "Net_Flow": "250000",
          "FS_EOD": "25000",
          "FS_Live": "25000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "300000",
          "Out_Flow": "0",
          "Net_Flow": "300000",
          "FS_EOD": "30000",
          "FS_Live": "30000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "400000",
          "Out_Flow": "0",
          "Net_Flow": "400000",
          "FS_EOD": "40000",
          "FS_Live": "40000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "450000",
          "Out_Flow": "0",
          "Net_Flow": "450000",
          "FS_EOD": "45000",
          "FS_Live": "45000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "500000",
          "Out_Flow": "0",
          "Net_Flow": "500000",
          "FS_EOD": "50000",
          "FS_Live": "50000"
        },
        {
          "name": "3. INVT",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "250000",
          "Net_Flow": "250000",
          "FS_EOD": "25000",
          "FS_Live": "25000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "375000",
          "Net_Flow": "375000",
          "FS_EOD": "37500",
          "FS_Live": "37500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "500000",
          "Net_Flow": "500000",
          "FS_EOD": "50000",
          "FS_Live": "50000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "625000",
          "Net_Flow": "625000",
          "FS_EOD": "62500",
          "FS_Live": "62500"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "750000",
          "Out_Flow": "0",
          "Net_Flow": "750000",
          "FS_EOD": "75000",
          "FS_Live": "75000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "1000000",
          "Out_Flow": "0",
          "Net_Flow": "1000000",
          "FS_EOD": "100000",
          "FS_Live": "100000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "1125000",
          "Out_Flow": "0",
          "Net_Flow": "1125000",
          "FS_EOD": "112500",
          "FS_Live": "112500"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "1250000",
          "Out_Flow": "0",
          "Net_Flow": "1250000",
          "FS_EOD": "125000",
          "FS_Live": "125000"
        },
        {
          "name": "g) OMR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "75000",
          "Net_Flow": "75000",
          "FS_EOD": "7500",
          "FS_Live": "7500"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "112500",
          "Net_Flow": "112500",
          "FS_EOD": "11250",
          "FS_Live": "11250"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "150000",
          "Net_Flow": "150000",
          "FS_EOD": "15000",
          "FS_Live": "15000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "187500",
          "Net_Flow": "187500",
          "FS_EOD": "18750",
          "FS_Live": "18750"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "225000",
          "Out_Flow": "0",
          "Net_Flow": "225000",
          "FS_EOD": "22500",
          "FS_Live": "22500"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "300000",
          "Out_Flow": "0",
          "Net_Flow": "300000",
          "FS_EOD": "30000",
          "FS_Live": "30000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "337500",
          "Out_Flow": "0",
          "Net_Flow": "337500",
          "FS_EOD": "33750",
          "FS_Live": "33750"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "375000",
          "Out_Flow": "0",
          "Net_Flow": "375000",
          "FS_EOD": "37500",
          "FS_Live": "37500"
        },
        {
          "name": "h) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "112500",
          "Net_Flow": "112500",
          "FS_EOD": "11250",
          "FS_Live": "11250"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "168750",
          "Net_Flow": "168750",
          "FS_EOD": "16875",
          "FS_Live": "16875"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "225000",
          "Net_Flow": "225000",
          "FS_EOD": "22500",
          "FS_Live": "22500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "281250",
          "Net_Flow": "281250",
          "FS_EOD": "28125",
          "FS_Live": "28125"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "337500",
          "Out_Flow": "0",
          "Net_Flow": "337500",
          "FS_EOD": "33750",
          "FS_Live": "33750"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "450000",
          "Out_Flow": "0",
          "Net_Flow": "450000",
          "FS_EOD": "45000",
          "FS_Live": "45000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "506250",
          "Out_Flow": "0",
          "Net_Flow": "506250",
          "FS_EOD": "50625",
          "FS_Live": "50625"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "562500",
          "Out_Flow": "0",
          "Net_Flow": "562500",
          "FS_EOD": "56250",
          "FS_Live": "56250"
        },
        {
          "name": "i) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "62500",
          "Net_Flow": "62500",
          "FS_EOD": "6250",
          "FS_Live": "6250"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "93750",
          "Net_Flow": "93750",
          "FS_EOD": "9375",
          "FS_Live": "9375"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "125000",
          "Net_Flow": "125000",
          "FS_EOD": "12500",
          "FS_Live": "12500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "156250",
          "Net_Flow": "156250",
          "FS_EOD": "15625",
          "FS_Live": "15625"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "187500",
          "Out_Flow": "0",
          "Net_Flow": "187500",
          "FS_EOD": "18750",
          "FS_Live": "18750"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "250000",
          "Out_Flow": "0",
          "Net_Flow": "250000",
          "FS_EOD": "25000",
          "FS_Live": "25000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "281250",
          "Out_Flow": "0",
          "Net_Flow": "281250",
          "FS_EOD": "28125",
          "FS_Live": "28125"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "312500",
          "Out_Flow": "0",
          "Net_Flow": "312500",
          "FS_EOD": "31250",
          "FS_Live": "31250"
        },
        {
          "name": "II. Kuwait",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "1500000",
          "Net_Flow": "1500000",
          "FS_EOD": "150000",
          "FS_Live": "150000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "2000000",
          "Net_Flow": "2000000",
          "FS_EOD": "200000",
          "FS_Live": "200000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "2200000",
          "Net_Flow": "2200000",
          "FS_EOD": "220000",
          "FS_Live": "220000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "2500000",
          "Net_Flow": "2500000",
          "FS_EOD": "250000",
          "FS_Live": "250000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "2700000",
          "Out_Flow": "0",
          "Net_Flow": "2700000",
          "FS_EOD": "270000",
          "FS_Live": "270000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "3000000",
          "Out_Flow": "0",
          "Net_Flow": "3000000",
          "FS_EOD": "300000",
          "FS_Live": "300000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "3300000",
          "Out_Flow": "0",
          "Net_Flow": "3300000",
          "FS_EOD": "330000",
          "FS_Live": "330000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "3500000",
          "Out_Flow": "0",
          "Net_Flow": "3500000",
          "FS_EOD": "350000",
          "FS_Live": "350000"
        },
        {
          "name": "4. CORE",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "450000",
          "Net_Flow": "450000",
          "FS_EOD": "45000",
          "FS_Live": "45000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "600000",
          "Net_Flow": "600000",
          "FS_EOD": "60000",
          "FS_Live": "60000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "660000",
          "Net_Flow": "660000",
          "FS_EOD": "66000",
          "FS_Live": "66000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "750000",
          "Net_Flow": "750000",
          "FS_EOD": "75000",
          "FS_Live": "75000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "810000",
          "Out_Flow": "0",
          "Net_Flow": "810000",
          "FS_EOD": "81000",
          "FS_Live": "81000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "900000",
          "Out_Flow": "0",
          "Net_Flow": "900000",
          "FS_EOD": "90000",
          "FS_Live": "90000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "990000",
          "Out_Flow": "0",
          "Net_Flow": "990000",
          "FS_EOD": "99000",
          "FS_Live": "99000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "1050000",
          "Out_Flow": "0",
          "Net_Flow": "1050000",
          "FS_EOD": "105000",
          "FS_Live": "105000"
        },
        {
          "name": "j) KWD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "135000",
          "Net_Flow": "135000",
          "FS_EOD": "13500",
          "FS_Live": "13500"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "180000",
          "Net_Flow": "180000",
          "FS_EOD": "18000",
          "FS_Live": "18000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "198000",
          "Net_Flow": "198000",
          "FS_EOD": "19800",
          "FS_Live": "19800"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "225000",
          "Net_Flow": "225000",
          "FS_EOD": "22500",
          "FS_Live": "22500"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "243000",
          "Out_Flow": "0",
          "Net_Flow": "243000",
          "FS_EOD": "24300",
          "FS_Live": "24300"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "270000",
          "Out_Flow": "0",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "297000",
          "Out_Flow": "0",
          "Net_Flow": "297000",
          "FS_EOD": "29700",
          "FS_Live": "29700"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "315000",
          "Out_Flow": "0",
          "Net_Flow": "315000",
          "FS_EOD": "31500",
          "FS_Live": "31500"
        },
        {
          "name": "k) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "202500",
          "Net_Flow": "202500",
          "FS_EOD": "20250",
          "FS_Live": "20250"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "270000",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "297000",
          "Net_Flow": "297000",
          "FS_EOD": "29700",
          "FS_Live": "29700"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "337500",
          "Net_Flow": "337500",
          "FS_EOD": "33750",
          "FS_Live": "33750"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "364500",
          "Out_Flow": "0",
          "Net_Flow": "364500",
          "FS_EOD": "36450",
          "FS_Live": "36450"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "405000",
          "Out_Flow": "0",
          "Net_Flow": "405000",
          "FS_EOD": "40500",
          "FS_Live": "40500"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "445500",
          "Out_Flow": "0",
          "Net_Flow": "445500",
          "FS_EOD": "44550",
          "FS_Live": "44550"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "472500",
          "Out_Flow": "0",
          "Net_Flow": "472500",
          "FS_EOD": "47250",
          "FS_Live": "47250"
        },
        {
          "name": "l) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "112500",
          "Net_Flow": "112500",
          "FS_EOD": "11250",
          "FS_Live": "11250"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "150000",
          "Net_Flow": "150000",
          "FS_EOD": "15000",
          "FS_Live": "15000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "165000",
          "Net_Flow": "165000",
          "FS_EOD": "16500",
          "FS_Live": "16500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "187500",
          "Net_Flow": "187500",
          "FS_EOD": "18750",
          "FS_Live": "18750"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "202500",
          "Out_Flow": "0",
          "Net_Flow": "202500",
          "FS_EOD": "20250",
          "FS_Live": "20250"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "225000",
          "Out_Flow": "0",
          "Net_Flow": "225000",
          "FS_EOD": "22500",
          "FS_Live": "22500"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "247500",
          "Out_Flow": "0",
          "Net_Flow": "247500",
          "FS_EOD": "24750",
          "FS_Live": "24750"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "262500",
          "Out_Flow": "0",
          "Net_Flow": "262500",
          "FS_EOD": "26250",
          "FS_Live": "26250"
        },
        {
          "name": "5. LQDT",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "675000",
          "Net_Flow": "675000",
          "FS_EOD": "67500",
          "FS_Live": "67500"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "900000",
          "Net_Flow": "900000",
          "FS_EOD": "90000",
          "FS_Live": "90000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "990000",
          "Net_Flow": "990000",
          "FS_EOD": "99000",
          "FS_Live": "99000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "1125000",
          "Net_Flow": "1125000",
          "FS_EOD": "112500",
          "FS_Live": "112500"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "1215000",
          "Out_Flow": "0",
          "Net_Flow": "1215000",
          "FS_EOD": "121500",
          "FS_Live": "121500"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "1350000",
          "Out_Flow": "0",
          "Net_Flow": "1350000",
          "FS_EOD": "135000",
          "FS_Live": "135000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "1485000",
          "Out_Flow": "0",
          "Net_Flow": "1485000",
          "FS_EOD": "148500",
          "FS_Live": "148500"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "1575000",
          "Out_Flow": "0",
          "Net_Flow": "1575000",
          "FS_EOD": "157500",
          "FS_Live": "157500"
        },
        {
          "name": "m) KWD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "236250",
          "Net_Flow": "236250",
          "FS_EOD": "23625",
          "FS_Live": "23625"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "315000",
          "Net_Flow": "315000",
          "FS_EOD": "31500",
          "FS_Live": "31500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "346500",
          "Net_Flow": "346500",
          "FS_EOD": "34650",
          "FS_Live": "34650"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "393750",
          "Net_Flow": "393750",
          "FS_EOD": "39375",
          "FS_Live": "39375"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "425250",
          "Out_Flow": "0",
          "Net_Flow": "425250",
          "FS_EOD": "42525",
          "FS_Live": "42525"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "472500",
          "Out_Flow": "0",
          "Net_Flow": "472500",
          "FS_EOD": "47250",
          "FS_Live": "47250"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "519750",
          "Out_Flow": "0",
          "Net_Flow": "519750",
          "FS_EOD": "51975",
          "FS_Live": "51975"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "551250",
          "Out_Flow": "0",
          "Net_Flow": "551250",
          "FS_EOD": "55125",
          "FS_Live": "55125"
        },
        {
          "name": "n) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "236250",
          "Net_Flow": "236250",
          "FS_EOD": "23625",
          "FS_Live": "23625"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "315000",
          "Net_Flow": "315000",
          "FS_EOD": "31500",
          "FS_Live": "31500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "346500",
          "Net_Flow": "346500",
          "FS_EOD": "34650",
          "FS_Live": "34650"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "393750",
          "Net_Flow": "393750",
          "FS_EOD": "39375",
          "FS_Live": "39375"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "425250",
          "Out_Flow": "0",
          "Net_Flow": "425250",
          "FS_EOD": "42525",
          "FS_Live": "42525"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "472500",
          "Out_Flow": "0",
          "Net_Flow": "472500",
          "FS_EOD": "47250",
          "FS_Live": "47250"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "519750",
          "Out_Flow": "0",
          "Net_Flow": "519750",
          "FS_EOD": "51975",
          "FS_Live": "51975"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "551250",
          "Out_Flow": "0",
          "Net_Flow": "551250",
          "FS_EOD": "55125",
          "FS_Live": "55125"
        },
        {
          "name": "o) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "202500",
          "Net_Flow": "202500",
          "FS_EOD": "20250",
          "FS_Live": "20250"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "270000",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "297000",
          "Net_Flow": "297000",
          "FS_EOD": "29700",
          "FS_Live": "29700"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "337500",
          "Net_Flow": "337500",
          "FS_EOD": "33750",
          "FS_Live": "33750"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "364500",
          "Out_Flow": "0",
          "Net_Flow": "364500",
          "FS_EOD": "36450",
          "FS_Live": "36450"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "405000",
          "Out_Flow": "0",
          "Net_Flow": "405000",
          "FS_EOD": "40500",
          "FS_Live": "40500"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "445500",
          "Out_Flow": "0",
          "Net_Flow": "445500",
          "FS_EOD": "44550",
          "FS_Live": "44550"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "472500",
          "Out_Flow": "0",
          "Net_Flow": "472500",
          "FS_EOD": "47250",
          "FS_Live": "47250"
        },
        {
          "name": "6. INVT",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "375000",
          "Net_Flow": "375000",
          "FS_EOD": "37500",
          "FS_Live": "37500"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "500000",
          "Net_Flow": "500000",
          "FS_EOD": "50000",
          "FS_Live": "50000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "550000",
          "Net_Flow": "550000",
          "FS_EOD": "55000",
          "FS_Live": "55000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "625000",
          "Net_Flow": "625000",
          "FS_EOD": "62500",
          "FS_Live": "62500"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "675000",
          "Out_Flow": "0",
          "Net_Flow": "675000",
          "FS_EOD": "67500",
          "FS_Live": "67500"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "750000",
          "Out_Flow": "0",
          "Net_Flow": "750000",
          "FS_EOD": "75000",
          "FS_Live": "75000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "825000",
          "Out_Flow": "0",
          "Net_Flow": "825000",
          "FS_EOD": "82500",
          "FS_Live": "82500"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "875000",
          "Out_Flow": "0",
          "Net_Flow": "875000",
          "FS_EOD": "87500",
          "FS_Live": "87500"
        },
        {
          "name": "p) KWD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "93750",
          "Net_Flow": "93750",
          "FS_EOD": "9375",
          "FS_Live": "9375"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "125000",
          "Net_Flow": "125000",
          "FS_EOD": "12500",
          "FS_Live": "12500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "137500",
          "Net_Flow": "137500",
          "FS_EOD": "13750",
          "FS_Live": "13750"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "156250",
          "Net_Flow": "156250",
          "FS_EOD": "15625",
          "FS_Live": "15625"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "168750",
          "Out_Flow": "0",
          "Net_Flow": "168750",
          "FS_EOD": "16875",
          "FS_Live": "16875"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "187500",
          "Out_Flow": "0",
          "Net_Flow": "187500",
          "FS_EOD": "18750",
          "FS_Live": "18750"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "206250",
          "Out_Flow": "0",
          "Net_Flow": "206250",
          "FS_EOD": "20625",
          "FS_Live": "20625"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "218750",
          "Out_Flow": "0",
          "Net_Flow": "218750",
          "FS_EOD": "21875",
          "FS_Live": "21875"
        },
        {
          "name": "q) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "32813",
          "Net_Flow": "32813",
          "FS_EOD": "3281",
          "FS_Live": "3281"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "43750",
          "Net_Flow": "43750",
          "FS_EOD": "4375",
          "FS_Live": "4375"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "48125",
          "Net_Flow": "48125",
          "FS_EOD": "4813",
          "FS_Live": "4813"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "54688",
          "Net_Flow": "54688",
          "FS_EOD": "5469",
          "FS_Live": "5469"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "59063",
          "Out_Flow": "0",
          "Net_Flow": "59063",
          "FS_EOD": "5906",
          "FS_Live": "5906"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "65625",
          "Out_Flow": "0",
          "Net_Flow": "65625",
          "FS_EOD": "6563",
          "FS_Live": "6563"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "72188",
          "Out_Flow": "0",
          "Net_Flow": "72188",
          "FS_EOD": "7219",
          "FS_Live": "7219"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "76563",
          "Out_Flow": "0",
          "Net_Flow": "76563",
          "FS_EOD": "7656",
          "FS_Live": "7656"
        },
        {
          "name": "r) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "150000",
          "Net_Flow": "150000",
          "FS_EOD": "15000",
          "FS_Live": "15000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "200000",
          "Net_Flow": "200000",
          "FS_EOD": "20000",
          "FS_Live": "20000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "220000",
          "Net_Flow": "220000",
          "FS_EOD": "22000",
          "FS_Live": "22000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "250000",
          "Net_Flow": "250000",
          "FS_EOD": "25000",
          "FS_Live": "25000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "270000",
          "Out_Flow": "0",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "300000",
          "Out_Flow": "0",
          "Net_Flow": "300000",
          "FS_EOD": "30000",
          "FS_Live": "30000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "330000",
          "Out_Flow": "0",
          "Net_Flow": "330000",
          "FS_EOD": "33000",
          "FS_Live": "33000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "350000",
          "Out_Flow": "0",
          "Net_Flow": "350000",
          "FS_EOD": "35000",
          "FS_Live": "35000"
        },
        {
          "name": "III. Dubai",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "1300000",
          "Net_Flow": "1300000",
          "FS_EOD": "130000",
          "FS_Live": "130000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "1500000",
          "Net_Flow": "1500000",
          "FS_EOD": "150000",
          "FS_Live": "150000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "2000000",
          "Net_Flow": "2000000",
          "FS_EOD": "200000",
          "FS_Live": "200000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "2300000",
          "Net_Flow": "2300000",
          "FS_EOD": "230000",
          "FS_Live": "230000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "2700000",
          "Out_Flow": "0",
          "Net_Flow": "2400000",
          "FS_EOD": "240000",
          "FS_Live": "240000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "3500000",
          "Out_Flow": "0",
          "Net_Flow": "3500000",
          "FS_EOD": "350000",
          "FS_Live": "350000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "3000000",
          "Out_Flow": "0",
          "Net_Flow": "3000000",
          "FS_EOD": "300000",
          "FS_Live": "300000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "3300000",
          "Out_Flow": "0",
          "Net_Flow": "3300000",
          "FS_EOD": "330000",
          "FS_Live": "330000"
        },
        {
          "name": "7. CORE",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "390000",
          "Net_Flow": "390000",
          "FS_EOD": "39000",
          "FS_Live": "39000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "450000",
          "Net_Flow": "450000",
          "FS_EOD": "45000",
          "FS_Live": "45000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "600000",
          "Net_Flow": "600000",
          "FS_EOD": "60000",
          "FS_Live": "60000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "690000",
          "Net_Flow": "690000",
          "FS_EOD": "69000",
          "FS_Live": "69000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "720000",
          "Out_Flow": "0",
          "Net_Flow": "720000",
          "FS_EOD": "72000",
          "FS_Live": "72000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "1050000",
          "Out_Flow": "0",
          "Net_Flow": "1050000",
          "FS_EOD": "105000",
          "FS_Live": "105000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "900000",
          "Out_Flow": "0",
          "Net_Flow": "900000",
          "FS_EOD": "90000",
          "FS_Live": "90000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "990000",
          "Out_Flow": "0",
          "Net_Flow": "990000",
          "FS_EOD": "99000",
          "FS_Live": "99000"
        },
        {
          "name": "s) AED",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "117000",
          "Net_Flow": "117000",
          "FS_EOD": "11700",
          "FS_Live": "11700"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "135000",
          "Net_Flow": "135000",
          "FS_EOD": "13500",
          "FS_Live": "13500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "180000",
          "Net_Flow": "180000",
          "FS_EOD": "18000",
          "FS_Live": "18000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "207000",
          "Net_Flow": "207000",
          "FS_EOD": "20700",
          "FS_Live": "20700"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "216000",
          "Out_Flow": "0",
          "Net_Flow": "216000",
          "FS_EOD": "21600",
          "FS_Live": "21600"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "315000",
          "Out_Flow": "0",
          "Net_Flow": "315000",
          "FS_EOD": "31500",
          "FS_Live": "31500"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "270000",
          "Out_Flow": "0",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "297000",
          "Out_Flow": "0",
          "Net_Flow": "297000",
          "FS_EOD": "29700",
          "FS_Live": "29700"
        },
        {
          "name": "t) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "175500",
          "Net_Flow": "175500",
          "FS_EOD": "17550",
          "FS_Live": "17550"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "202500",
          "Net_Flow": "202500",
          "FS_EOD": "20250",
          "FS_Live": "20250"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "270000",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "310500",
          "Net_Flow": "310500",
          "FS_EOD": "31050",
          "FS_Live": "31050"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "324000",
          "Out_Flow": "0",
          "Net_Flow": "324000",
          "FS_EOD": "32400",
          "FS_Live": "32400"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "472500",
          "Out_Flow": "0",
          "Net_Flow": "472500",
          "FS_EOD": "47250",
          "FS_Live": "47250"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "405000",
          "Out_Flow": "0",
          "Net_Flow": "405000",
          "FS_EOD": "40500",
          "FS_Live": "40500"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "445500",
          "Out_Flow": "0",
          "Net_Flow": "445500",
          "FS_EOD": "44550",
          "FS_Live": "44550"
        },
        {
          "name": "u) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "97500",
          "Net_Flow": "97500",
          "FS_EOD": "9750",
          "FS_Live": "9750"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "112500",
          "Net_Flow": "112500",
          "FS_EOD": "11250",
          "FS_Live": "11250"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "150000",
          "Net_Flow": "150000",
          "FS_EOD": "15000",
          "FS_Live": "15000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "172500",
          "Net_Flow": "172500",
          "FS_EOD": "17250",
          "FS_Live": "17250"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "180000",
          "Out_Flow": "0",
          "Net_Flow": "180000",
          "FS_EOD": "18000",
          "FS_Live": "18000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "262500",
          "Out_Flow": "0",
          "Net_Flow": "262500",
          "FS_EOD": "26250",
          "FS_Live": "26250"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "225000",
          "Out_Flow": "0",
          "Net_Flow": "225000",
          "FS_EOD": "22500",
          "FS_Live": "22500"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "247500",
          "Out_Flow": "0",
          "Net_Flow": "247500",
          "FS_EOD": "24750",
          "FS_Live": "24750"
        },
        {
          "name": "8. LQDT",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "585000",
          "Net_Flow": "585000",
          "FS_EOD": "58500",
          "FS_Live": "58500"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "675000",
          "Net_Flow": "675000",
          "FS_EOD": "67500",
          "FS_Live": "67500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "900000",
          "Net_Flow": "900000",
          "FS_EOD": "90000",
          "FS_Live": "90000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "1035000",
          "Net_Flow": "1035000",
          "FS_EOD": "103500",
          "FS_Live": "103500"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "1080000",
          "Out_Flow": "0",
          "Net_Flow": "1080000",
          "FS_EOD": "108000",
          "FS_Live": "108000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "1575000",
          "Out_Flow": "0",
          "Net_Flow": "1575000",
          "FS_EOD": "157500",
          "FS_Live": "157500"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "1350000",
          "Out_Flow": "0",
          "Net_Flow": "1350000",
          "FS_EOD": "135000",
          "FS_Live": "135000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "1485000",
          "Out_Flow": "0",
          "Net_Flow": "1485000",
          "FS_EOD": "148500",
          "FS_Live": "148500"
        },
        {
          "name": "v) AED",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "204750",
          "Net_Flow": "204750",
          "FS_EOD": "20475",
          "FS_Live": "20475"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "236250",
          "Net_Flow": "236250",
          "FS_EOD": "23625",
          "FS_Live": "23625"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "315000",
          "Net_Flow": "315000",
          "FS_EOD": "31500",
          "FS_Live": "31500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "362250",
          "Net_Flow": "362250",
          "FS_EOD": "36225",
          "FS_Live": "36225"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "378000",
          "Out_Flow": "0",
          "Net_Flow": "378000",
          "FS_EOD": "37800",
          "FS_Live": "37800"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "551250",
          "Out_Flow": "0",
          "Net_Flow": "551250",
          "FS_EOD": "55125",
          "FS_Live": "55125"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "472500",
          "Out_Flow": "0",
          "Net_Flow": "472500",
          "FS_EOD": "47250",
          "FS_Live": "47250"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "519750",
          "Out_Flow": "0",
          "Net_Flow": "519750",
          "FS_EOD": "51975",
          "FS_Live": "51975"
        },
        {
          "name": "w) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "146250",
          "Net_Flow": "146250",
          "FS_EOD": "14625",
          "FS_Live": "14625"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "168750",
          "Net_Flow": "168750",
          "FS_EOD": "16875",
          "FS_Live": "16875"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "225000",
          "Net_Flow": "225000",
          "FS_EOD": "22500",
          "FS_Live": "22500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "258750",
          "Net_Flow": "258750",
          "FS_EOD": "25875",
          "FS_Live": "25875"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "270000",
          "Out_Flow": "0",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "393750",
          "Out_Flow": "0",
          "Net_Flow": "393750",
          "FS_EOD": "39375",
          "FS_Live": "39375"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "337500",
          "Out_Flow": "0",
          "Net_Flow": "337500",
          "FS_EOD": "33750",
          "FS_Live": "33750"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "371250",
          "Out_Flow": "0",
          "Net_Flow": "371250",
          "FS_EOD": "37125",
          "FS_Live": "37125"
        },
        {
          "name": "x) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "234000",
          "Net_Flow": "234000",
          "FS_EOD": "23400",
          "FS_Live": "23400"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "270000",
          "Net_Flow": "270000",
          "FS_EOD": "27000",
          "FS_Live": "27000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "360000",
          "Net_Flow": "360000",
          "FS_EOD": "36000",
          "FS_Live": "36000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "414000",
          "Net_Flow": "414000",
          "FS_EOD": "41400",
          "FS_Live": "41400"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "432000",
          "Out_Flow": "0",
          "Net_Flow": "432000",
          "FS_EOD": "43200",
          "FS_Live": "43200"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "630000",
          "Out_Flow": "0",
          "Net_Flow": "630000",
          "FS_EOD": "63000",
          "FS_Live": "63000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "540000",
          "Out_Flow": "0",
          "Net_Flow": "540000",
          "FS_EOD": "54000",
          "FS_Live": "54000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "594000",
          "Out_Flow": "0",
          "Net_Flow": "594000",
          "FS_EOD": "59400",
          "FS_Live": "59400"
        },
        {
          "name": "9. INVT",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "325000",
          "Net_Flow": "325000",
          "FS_EOD": "32500",
          "FS_Live": "32500"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "375000",
          "Net_Flow": "375000",
          "FS_EOD": "37500",
          "FS_Live": "37500"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "500000",
          "Net_Flow": "500000",
          "FS_EOD": "50000",
          "FS_Live": "50000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "575000",
          "Net_Flow": "575000",
          "FS_EOD": "57500",
          "FS_Live": "57500"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "600000",
          "Out_Flow": "0",
          "Net_Flow": "600000",
          "FS_EOD": "60000",
          "FS_Live": "60000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "875000",
          "Out_Flow": "0",
          "Net_Flow": "875000",
          "FS_EOD": "87500",
          "FS_Live": "87500"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "750000",
          "Out_Flow": "0",
          "Net_Flow": "750000",
          "FS_EOD": "75000",
          "FS_Live": "75000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "825000",
          "Out_Flow": "0",
          "Net_Flow": "825000",
          "FS_EOD": "82500",
          "FS_Live": "82500"
        },
        {
          "name": "y) AED",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "81250",
          "Net_Flow": "81250",
          "FS_EOD": "8125",
          "FS_Live": "8125"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "93750",
          "Net_Flow": "93750",
          "FS_EOD": "9375",
          "FS_Live": "9375"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "125000",
          "Net_Flow": "125000",
          "FS_EOD": "12500",
          "FS_Live": "12500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "143750",
          "Net_Flow": "143750",
          "FS_EOD": "14375",
          "FS_Live": "14375"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "150000",
          "Out_Flow": "0",
          "Net_Flow": "150000",
          "FS_EOD": "15000",
          "FS_Live": "15000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "218750",
          "Out_Flow": "0",
          "Net_Flow": "218750",
          "FS_EOD": "21875",
          "FS_Live": "21875"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "187500",
          "Out_Flow": "0",
          "Net_Flow": "187500",
          "FS_EOD": "18750",
          "FS_Live": "18750"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "206250",
          "Out_Flow": "0",
          "Net_Flow": "206250",
          "FS_EOD": "20625",
          "FS_Live": "20625"
        },
        {
          "name": "z) USD",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "113750",
          "Net_Flow": "113750",
          "FS_EOD": "11375",
          "FS_Live": "11375"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "131250",
          "Net_Flow": "131250",
          "FS_EOD": "13125",
          "FS_Live": "13125"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "175000",
          "Net_Flow": "175000",
          "FS_EOD": "17500",
          "FS_Live": "17500"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "201250",
          "Net_Flow": "201250",
          "FS_EOD": "20125",
          "FS_Live": "20125"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "210000",
          "Out_Flow": "0",
          "Net_Flow": "210000",
          "FS_EOD": "21000",
          "FS_Live": "21000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "306250",
          "Out_Flow": "0",
          "Net_Flow": "306250",
          "FS_EOD": "30625",
          "FS_Live": "30625"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "262500",
          "Out_Flow": "0",
          "Net_Flow": "262500",
          "FS_EOD": "26250",
          "FS_Live": "26250"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "288750",
          "Out_Flow": "0",
          "Net_Flow": "288750",
          "FS_EOD": "28875",
          "FS_Live": "28875"
        },
        {
          "name": "A) EUR",
          "year": "",
          "In_Flow": "",
          "Out_Flow": "",
          "Net_Flow": "",
          "FS_EOD": "",
          "FS_Live": ""
        },
        {
          "name": "",
          "year": "0D",
          "In_Flow": "0",
          "Out_Flow": "130000",
          "Net_Flow": "130000",
          "FS_EOD": "13000",
          "FS_Live": "13000"
        },
        {
          "name": "",
          "year": "1D",
          "In_Flow": "0",
          "Out_Flow": "150000",
          "Net_Flow": "150000",
          "FS_EOD": "15000",
          "FS_Live": "15000"
        },
        {
          "name": "",
          "year": "2D",
          "In_Flow": "0",
          "Out_Flow": "200000",
          "Net_Flow": "200000",
          "FS_EOD": "20000",
          "FS_Live": "20000"
        },
        {
          "name": "",
          "year": "3D",
          "In_Flow": "0",
          "Out_Flow": "230000",
          "Net_Flow": "230000",
          "FS_EOD": "23000",
          "FS_Live": "23000"
        },
        {
          "name": "",
          "year": "4D",
          "In_Flow": "240000",
          "Out_Flow": "0",
          "Net_Flow": "240000",
          "FS_EOD": "24000",
          "FS_Live": "24000"
        },
        {
          "name": "",
          "year": "5D",
          "In_Flow": "350000",
          "Out_Flow": "0",
          "Net_Flow": "350000",
          "FS_EOD": "35000",
          "FS_Live": "35000"
        },
        {
          "name": "",
          "year": "6D",
          "In_Flow": "300000",
          "Out_Flow": "0",
          "Net_Flow": "300000",
          "FS_EOD": "30000",
          "FS_Live": "30000"
        },
        {
          "name": "",
          "year": "7D",
          "In_Flow": "330000",
          "Out_Flow": "0",
          "Net_Flow": "330000",
          "FS_EOD": "33000",
          "FS_Live": "33000"
        }
       ];*/
        //Commmented above demo data block...

      }


      let scrnFont = "0.8vw";
      if (this.maxScreen) {
        scrnFont = "0.8vw";

      }

      //data = [];             
      //Check data size...        
      if (data.length == 0) {
        //alert("No Data"); 
        //let element = this.vis.nativeElement;
        let gdiv = d3.select(this.element2)
          .append("div")
          .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
          .append("table")
          .attr("width", this.width)
          .attr("height", this.height).append("tr").append("td").append("p")
          .text("No data available to load the graph")
          .style("color", "#fff")
          .style("font-size", scrnFont)
          .style("text-transform", "uppercase")
          .style("text-align", "center")
          .attr("x", this.width / 2)
          .attr("y", this.height / 2);
        return;
      }
      else if (data.length == 1 && data[0].status == "Fail") {
        let gdiv = d3.select(this.element2)
          .append("div")
          .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
          .append("table")
          .attr("width", this.width)
          .attr("height", this.height).append("tr").append("td").append("p")
          .text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
          .style("color", "red")
          .style("font-size", scrnFont)
          .style("text-transform", "uppercase")
          .style("text-align", "center")
          .attr("x", this.width / 2)
          .attr("y", this.height / 2);
        return;
      }

      let dataColumns = Object.keys(data[0]);
      console.log("--- all dataColumns:", dataColumns);

      dataColumns = dataColumns.slice(2, dataColumns.length);
      console.log("--- metric dataColumns: ", dataColumns);

      let metrics = new Object();
      for (let i = 0; i < dataColumns.length; i++) {
        metrics[dataColumns[i]] = dataColumns[i];
      }
      console.log("--- metrics: ", metrics);

      //  console.log("element3", element3);
      let arr = [this.element1, this.element2, this.element3, this.element4, this.element5, this.element6, null];
      // reserve(arr, data, this.width, this.height, metrics); //metrics object as an argument

    });
  }

  helpOut() {
    this.helpScreen = 0;
    console.log("***helpscreen surface 3D:", this.helpScreen);
  }

}


