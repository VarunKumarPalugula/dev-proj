import {Component, ViewChild, Input, ElementRef, ViewEncapsulation} from '@angular/core';
//import {DataService} from 'app/services/data.service';
import {BaseComponent} from '../../base/base.component';

import * as d3 from 'd3v4';

// declare let __moduleName : string;
import { saveAs } from 'file-saver';

@Component({

    selector: 'iStackedBars',
    // moduleId: __moduleName,
    templateUrl: 'stackedBars.component.html',
  
    styleUrls: ['stackedBars.component.css']
    //encapsulation: ViewEncapsulation.None
})
export class StackedBarsComponent extends BaseComponent {

    
    public jsonData: any=[];
    public barJsonList: any =[];
    public element: any="";
	public SBars:any ="";
    public dwndContainer:any ="";
  
    public brdArr: any=[];
    public ititle:string="";
    public prgStatus:boolean=false;
    public progressMode:any="";
   
    @Input() requestType: any;
    @Input() heading: any;
    @Input() width: any;
    @Input() height: any;
	@Input() xAxisUnit: any;
	@Input() yAxisUnit: any;
    //@Input() helpScreen: any=0;
    @Input() changeTrigger: any;
	@Input() maxScreen: boolean=false;
	@Input() IsdownloadImage: boolean=false;
	@ViewChild('chart', { static: false }) chartContainer:ElementRef;
    @ViewChild('dwnChart', { static: false }) dwnChart:ElementRef;
	@ViewChild('StackedBars', { static: false }) StackedBars: ElementRef;

    private margin: any = { top: 20, bottom: 10, left: 10, right: 20 };
    private chart: any;
    parentNode: any;
	//private xAxisUnit: string = "";
	//private yAxisUnit: string = "USD";

    constructor() {
        super();
    }

    ngOnInit() {    
        console.log("--- In Grouped Bars", this.requestType);
        this.IsdownloadImage = false;
        this.loadStackedBar(false);
    }
    
    loadStackedBar(reloadVal) {
       
        this.IsdownloadImage = false;
        if(reloadVal==true){
               this.prgStatus=true;
               setTimeout(()=>{
                   this.progressMode="indeterminate";
               },1000);
           }
          console.log("--- In Grouped Bars", this.requestType);
       this.dataService.getListItemsByPost('stackedBars/getData', this.requestType).subscribe( (listItems) =>{
           console.log("--- Grouped Bars data:", listItems);
           this.jsonData = listItems;
           this.barJsonList = listItems;


           /*  this.jsonData = [
             {
               "SECURITY_CODE": "TEST5195",
               "PRICE": "-101"
             },
             {
               "SECURITY_CODE": "LKB00619G019",
               "PRICE": "101"
             },
             {
               "SECURITY_CODE": "SECREPODEMO",
               "PRICE": "101"
             },
             {
               "SECURITY_CODE": "SLDB1",
               "PRICE": "101"
             },
             {
               "SECURITY_CODE": "TBNDGBP",
               "PRICE": "-99.9"
             }
           ];  */
           /*        this.jsonData =
           [
             {
               "tenor": "0D",
               "INFLOW": "-1000000.1",
               "OUTFLOW": "-1000038.9",
               "NETFLOW":"-1000000.3"
             },
             {
               "tenor": "1D",
               "INFLOW": "2000000.01",
               "OUTFLOW": "7000000.02",
               "NETFLOW":"2000000.03"
             },
             {
               "tenor": "2D",
               "INFLOW": "4000000",
               "OUTFLOW": "2000533.34",
               "NETFLOW":"3000000"
             },
             {
               "tenor": "3D",
               "INFLOW": "0",
               "OUTFLOW": "1000916.67",
               "NETFLOW":"4000000"
             },
             {
               "tenor": "4D",
               "INFLOW": "1001470.59",
               "OUTFLOW": "6920000",
               "NETFLOW":"5000000"
             },
             {
               "tenor": "5D",
               "INFLOW": "0",
               "OUTFLOW": "1000000",
               "NETFLOW":"6000000"
             },
             {
               "tenor": "6D",
               "INFLOW": "0",
               "OUTFLOW": "1000000",
               "NETFLOW":"7000000"
             },
             {
               "tenor": "7D",
               "INFLOW": "0",
               "OUTFLOW": "1000000",
               "NETFLOW":"6000000"
             },
             {
               "tenor": "10D",
               "INFLOW": "0",
               "OUTFLOW": "3000000",
               "NETFLOW":"5000000"
             }
             
             ,
             {
               "tenor": "1M",
               "INFLOW": "-1000500",
               "OUTFLOW": "-1000300",
               "NETFLOW":"4000000"
             },
             {
               "tenor": "2M",
               "INFLOW": "1000000",
               "OUTFLOW": "-1000700",
               "NETFLOW":"3000000"
             }
           ];   */
           /* [
            { "tenor" : "Jan-2017", "Global_Portfolio" : 25, "Benchmark" : 12},
            { "tenor" : "Feb-2017", "Global_Portfolio" : 18, "Benchmark" : 15},
            { "tenor" : "Mar-2017", "Global_Portfolio" : 20, "Benchmark" : 18},
            { "tenor" : "Apr-2017", "Global_Portfolio" : 22, "Benchmark" : 20},
            { "tenor" : "May-2017", "Global_Portfolio" : 21, "Benchmark" : 20},
            { "tenor" : "Jun-2017", "Global_Portfolio" : 20, "Benchmark" : 19},
            { "tenor" : "Jul-2017", "Global_Portfolio" : 19, "Benchmark" : 18}
        ];*/
           
           if (typeof this.element != "object") {
               this.element = this.chartContainer.nativeElement;
               this.SBars = this.StackedBars.nativeElement;
           }
           else {
           
               this.element.removeChild(this.element.lastChild);
               this.SBars.removeChild(this.SBars.lastChild);
           }
        
           //this.jsonData = []; 
           //Check data size...
           if (this.jsonData.length == 0) {
               this.prgStatus=false;
               this.progressMode="";
               let element = this.chartContainer.nativeElement;
               let gdiv = d3.select(element)
                   .append("div")
                   .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                   .append("table")
                   .attr("width", this.width)
                   .attr("height", this.height).append("tr").append("td").append("p")
                   .text("No Data Available")
                   .style("color", "#fff")
                   .style("font-size", 13)
                   .style("text-transform", "uppercase")
                   .style("text-align", "center")
                   .attr("x", this.width / 2)
                   .attr("y", this.height / 2);
               return;
           }
           else if (this.jsonData.length == 1 && this.jsonData[0].status == "Fail") {
               this.prgStatus=false;
               this.progressMode="";
               let element = this.chartContainer.nativeElement;
               let gdiv = d3.select(element)
                   .append("div")
                   .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                   .append("table")
                   .attr("width", this.width)
                   .attr("height", this.height).append("tr").append("td").append("p")
                   //.text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
                   .text("No Data Available")
                   .style("color", "red")
                   .style("font-size", 13)
                   .style("text-transform", "uppercase")
                   .style("text-align", "center")
                   .attr("x", this.width / 2)
                   .attr("y", this.height / 2);
               return;
           }
           else {
               this.createChart();
           }
       }); //end ngInit
      }
    
        prevDrilldown(ev) {
            console.log("******prevDrilldown fired ev:",ev);
            
                this.requestType= ev;
                
                this.loadStackedBar(true);
                
                for(let i=0;i<this.brdArr.length;i++){
                    if(ev==this.brdArr[i].reqType){
                        let len= this.brdArr.length - i;
                        this.brdArr.splice(i,len);
                        if(i!=0){
                        this.brdArr[i-1].seperator="";
                        }   
                    }
                }
                
                console.log("******prevDrilldown fired brdArr:",this.brdArr);
        }
                
        ngOnChanges() {
                //console.log("******change fired:");
               
            }
                
        downloadImage(event) {
               
                this.jsonData  = this.barJsonList;
                this.IsdownloadImage = event;
                this.maxScreen = event;
                
                if (typeof this.dwndContainer != "object") {
                    this.dwndContainer = this.dwnChart.nativeElement;
                }else{
                    this.dwndContainer.removeChild(this.dwndContainer.lastChild);
                }
                
                this.createChart();
                
                
                let svgNode = this.dwndContainer.getElementsByTagName("svg")[0];
                            
                // Put the svg into an image tag so that the Canvas element can read it in.         
                let fileType = "image/png";
                let dataURL = svgNode.toDataURL(fileType, {
                    renderer: "canvg",
                    callback: function (data) {
                        let image = new Image();
                        
                        image.src = data;
                    }
                });
                let binStr = atob(dataURL.split(',')[1]);
                let len = binStr.length;
                let arr = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }
                let blob = new Blob([arr], { type: fileType });
                let fileName = this.ititle;
                if (fileName == "") {
                    fileName = "Widget";
                }
                saveAs(blob, fileName + '.png'); 
                this.IsdownloadImage = false;
                this.maxScreen = false;
         }
                
        createChart() {
                //   let element = this.chartContainer.nativeElement;
                //  console.log("*************element:", element);
                let data = this.jsonData;
                let dataAxis = data[0];
                data = data.slice(1,data.length);   //data.splice(0,1);
                
                 if (!this.maxScreen && data.length > 10) {
                     console.log(" -- inside ");
                    data = data.slice(0,11);
                 }
                if(typeof(dataAxis.X_AXIS)!="undefined"){
                this.xAxisUnit = dataAxis.X_AXIS;
                }
                if(typeof(dataAxis.Y_AXIS)!="undefined"){
                this.yAxisUnit = dataAxis.Y_AXIS;
                }
                if(typeof(dataAxis.TITLE)!="undefined"){
                this.ititle = dataAxis.TITLE;
                }
                let dataColumns = Object.keys(data[0]);
                console.log("--- dataColumns:", dataColumns);
                //let xAxisColumn = dataColumns[0];          
                // excluding the first column          
                let keysArr = dataColumns.slice(1, dataColumns.length);
                console.log("--- keysArr: ", keysArr);
                let min = 0;
                let max = 0;
               
                for (let jj = 0; jj < data.length; jj++) {
                    //console.log("--- data[jj]: ",data[jj]);
                    for (let ii = 0; ii < keysArr.length; ii++) {
                        if (parseFloat(eval("data[jj]." + keysArr[ii])) < min) {
                            min = parseFloat(eval("data[jj]." + keysArr[ii]));
                        }
                        
                       /* if (parseFloat(eval("data[jj]." + keysArr[ii])) > max) {
                            max = parseFloat(eval("data[jj]." + keysArr[ii]));
                        }
                        else*/ if(parseFloat(eval("data[jj]." + keysArr[ii])) > min){
                            if(max==0)
                                max = parseFloat(eval("data[jj]." + keysArr[ii]));
                            else{
                                if (parseFloat(eval("data[jj]." + keysArr[ii])) > max) {
                                    max = parseFloat(eval("data[jj]." + keysArr[ii]));
                                }
                            }   
                        }
                        
                    }
                }
                console.log("--- min: ", min);
                console.log("--- max: ", max);
               
                let series = d3.stack().keys(keysArr).offset(d3.stackOffsetDiverging)(data);
               
                let gDiv = d3.select(this.element), margin = { top: 20, right: 0, bottom: 10, left: 0 }; //left is +30 for labels
               
                let width = this.width ; //+svg.attr("width"),
              
                let height = this.height - margin.top - margin.bottom; // +svg.attr("height");
              
                if(this.IsdownloadImage){
                    width = 1100 ;
                    height = 540 - margin.top - margin.bottom;
                    
                    let svg = d3.select(this.dwndContainer).append("svg").attr("width", 1200)
                                .attr("height", height + margin.top)
                                .style("background-color", "#000");
                                
                                svg.append("g")
                                .append("text")
                                .attr("fill", "#000")
                                .style("font-size", "13px")
                                .style("text-transform", "uppercase")
                                .style("font-weight", "100")
                                .style("font-family", "Tahoma, Helvetica, sans-serif")
                                .text(this.ititle)
                                .attr("transform", "translate(" + (width/2) + " ," + 
                                   (margin.top-10) + ")")
                                .style("fill", "darkorange")
                                .style("text-anchor", "middle");
                    
                }else{
                     let svg = gDiv.append("svg").attr('class', 'animated zoomIn')
                    .attr("width", width)
                    .attr("height", height + margin.top);
                }
               
                let div = d3.select(this.SBars).append("div")
                    .style("position", "fixed")
                    .style("z-index", "10")
                    .style("opacity", 0);
                let addlLeftMargin = 70;
                let x = d3.scaleBand()
                    .domain(data.map( (d) => { return eval("d." + dataColumns[0]); })) // d.TENOR
                    .rangeRound([addlLeftMargin, width])
                    .paddingInner(0.1);
                let y = d3.scaleLinear()
                    .domain([min, max])
                    .rangeRound([height - margin.bottom, margin.top]);
                let x1 = d3.scaleBand()
                    .padding(0.05).domain(keysArr).rangeRound([addlLeftMargin, x.bandwidth()]);
               
                let z = d3.scaleOrdinal(d3.schemeCategory20);
                //color(d3.scale.ordinal().range(["hexcolor1", "hexcolor2", "hexcolor3", "hexcolor4", "hexcolor5", "hexcolor6", "hexcolor7"]).range());
               
                function stackMin(series) {
                    return d3.min(series,  (d) => { return d[1]; });
                }
                function stackMax(series) {
                    return d3.max(series,  (d) => { return d[1]; });
                }

                let k = -1;
                let padding = 7;
                if (this.maxScreen) {
                    padding = 16;
                }
                let barWidth = 25;
                if((data.length * keysArr.length) > 13){
                    barWidth = x.bandwidth(); 
                } 
                let element = this.chartContainer.nativeElement;
                let svg = d3.select(element).append('svg')

                svg.append("g")
                    .selectAll("g")
                    .data(series)
                    .enter().append("g")
                    .attr("fill",  (d) => { return z(d.key); })
                    .selectAll("rect")
                    .data( (d) => { return d; })
                    .enter().append("rect")
                    .attr("width", barWidth)
                    .attr("x",  (d, i) => {
                        k++;
                        
                        if(k >= keysArr.length)
                            k = 0;
                                                        
                        if(keysArr.length > 1){
                            //return x(eval("d.data." + dataColumns[0])) + ((x.bandwidth()/keysArr.length)*k);
                            return x(eval("d.data." + dataColumns[0])) 
                                + ((x.bandwidth()-(barWidth*keysArr.length))/2) + (barWidth * k);
                        }else {
                            return x(eval("d.data." + dataColumns[0])) + ((x.bandwidth()-barWidth)/2);
                        }
                    })
                    .attr("y",  (d) => { 
                            if (keysArr.length <= 1 && d[1] < 0) {
                            return y(0);
                            } if (d[0] >= 0 && d[1] >= 0) {
                            return y(d[1] - d[0]);
                            }
                            else if (d[0] < 0 && d[1] < 0) {
                            return y(0);
                            }
                            else {
                            return y(d[1]);
                            } })
                 .attr("height",  (d) => { 
                            if (d[1] >= 0) {
                                    return y(d[0]) - y(d[1]);
                            }
                            else if (d[0] < 0 && d[1] < 0) {
                                return y(d[0]) - y(d[1]);
                            }
                            else {
                                return y(d[1]) - y(d[0]);
                            }
                });
               
                //In case of simple bar chart 
                if (keysArr.length <= 1) {
                    //Color for each bar        
                    svg.selectAll("rect")
                        .attr("fill",  (d, i) => { return z(eval("data[i]." + dataColumns[0])); });
                }
                //Title for each bar
            
               
                let drilldwnParam1='';
                let drilldwnParam2='';
                let result='';
                let reqArr=[];
                svg.selectAll("rect")
                    .on('dblclick',  (d) => {
                        
                        console.log("******in on click****reqType:",this.requestType);
                         
                        result =this.requestType.split("?");
                        console.log("************result::::",result);
                        let selectedData = d.data;
                        let ccy,CPData,SovNonSovData,cntryGrp;
                        if (this.requestType == "FX_Dealerwise_MTM") {
                        
                            drilldwnParam1 = eval("selectedData." + dataColumns[0]);
                            this.brdArr=[{"reqType":this.requestType,"selectedVal":drilldwnParam1}];
                            this.requestType = "FX_CcyPair_MTM"+"?"+drilldwnParam1;
                            
                            this.loadStackedBar(true);
                            
                        }
                        else if (this.requestType == "Currency_Position") {
                            
                            drilldwnParam1 = eval("selectedData." + dataColumns[0]);
                             let CPCcy=drilldwnParam1;
                              localStorage.setItem("CPData", CPCcy);
                            this.brdArr=[{"reqType":this.requestType,"selectedVal":drilldwnParam1}];
                            this.requestType = "Currency_Position_Net"+"?"+drilldwnParam1;
                            this.loadStackedBar(true);
                        }
                        else if (result[0] == "Currency_Position_Net") {
                            
                            drilldwnParam1 = eval("selectedData." + dataColumns[0]);
                            let p1 = localStorage.getItem("CPData");
                            let req1=this.requestType;
                            this.brdArr=[{"reqType":"Currency_Position","selectedVal":p1,"seperator":">"},{"reqType":req1,"selectedVal":drilldwnParam1}];
                            if(d[1] == selectedData.NETFLOW){
                                    console.log("********net cash if:");
                                    this.requestType = "Currency_Position_NetCash"+"?"+p1;
                            }   
                            if(d[1] == selectedData.NETFLOW){
                                console.log("********net forward if:");
                                this.requestType = "Currency_Position_NetForward"+"?"+p1;
                            }
                            this.loadStackedBar(true);
                        }
                        else if (this.requestType == "Currencywise_Nostro_Balances") {
                            
                        }
                        else if (this.requestType == "Daily_Reserve_Position") {
                            
                        }
                        else if (this.requestType == "MM_Tenorwise_Cashflow") {
                            
                            drilldwnParam1 = eval("selectedData." + dataColumns[0]);
                            console.log("*********drilldwnParam1:",drilldwnParam1);
                            let splitParam =drilldwnParam1.split("-");
                            console.log("*********splitParam:",splitParam);
                        
                             if(splitParam[1] == "D"){
                                drilldwnParam2 = "DEPOSIT";
                             }
                             if(splitParam[1] == "P"){
                                drilldwnParam2 = "PLACEMENT";
                             }
                            this.brdArr=[{"reqType":this.requestType,"selectedVal":drilldwnParam1}];
                            this.requestType = "MM_ProdWise_CashFlow"+"?"+splitParam[0]+"?"+drilldwnParam2;
                            this.loadStackedBar(true);
                        }
                        else if (this.requestType == "Sukuks_Currencywise_Holdings") {
                            
                            drilldwnParam1 = eval("selectedData." + dataColumns[0]);
                            console.log("*********drilldwnParam1:",drilldwnParam1);
                            this.brdArr=[{"reqType":this.requestType,"selectedVal":drilldwnParam1,"seperator":""}];
                            let ccyData=drilldwnParam1;
                              localStorage.setItem("ccy", ccyData);
                            this.requestType = "Sukuks_Currencywise_Sovereign"+"?"+drilldwnParam1;
                            this.loadStackedBar(true);
                        }
                        else if (result[0] == "Sukuks_Currencywise_Sovereign") {
                            
                            ccy=localStorage.getItem("ccy");
                            console.log("local storage get ccy:",ccy);
                            let SovNonSovData=selectedData.SOVEREIGN_NONSOVEREIGN;
                              localStorage.setItem("SovNonSovData", SovNonSovData);
                            //drilldwnParam1 = data[i].CURRENCY;
                            drilldwnParam2 = eval("selectedData." + dataColumns[0]);
                            console.log("*****drilldwnParam2:",drilldwnParam2);
                            let req1=this.requestType;
                            this.brdArr=[
                                        {"reqType":"Sukuks_Currencywise_Holdings","selectedVal":ccy,"seperator":" > "},
                                        {"reqType":this.requestType,"selectedVal":drilldwnParam2,"seperator":""}];
                            this.requestType = "Sukuks_Purchased_Region"+"?"+ccy+"?"+drilldwnParam2;
                            this.loadStackedBar(true);
                        }
                        else if (result[0] == "Sukuks_Purchased_Region") {
                            
                            let cntryGrp = selectedData.COUNTRY_GROUP;
                            localStorage.setItem("cntryGrp", cntryGrp);
                            ccy=localStorage.getItem("ccy");
                            SovNonSovData=localStorage.getItem("SovNonSovData");
                            drilldwnParam2 = eval("selectedData." + dataColumns[0]);
                            let req2=this.requestType;
                            let req1="Sukuks_Currencywise_Sovereign"+"?"+ccy;
                            this.brdArr=[
                                        {"reqType":"Sukuks_Currencywise_Holdings","selectedVal":ccy,"seperator":" > "},
                                        {"reqType":req1,"selectedVal":SovNonSovData,"seperator":" > "},
                                        {"reqType":this.requestType,"selectedVal":drilldwnParam2,"seperator":""}];
                            this.requestType = "Sukuks_Countrywise_Holdings"+"?"+ccy+"?"+SovNonSovData+"?"+drilldwnParam2;
                            this.loadStackedBar(true);
                        }
                        else if (result[0] == "Sukuks_Countrywise_Holdings") {
                        
                            ccy=localStorage.getItem("ccy");
                            SovNonSovData=localStorage.getItem("SovNonSovData");
                            cntryGrp=localStorage.getItem("cntryGrp");
                            drilldwnParam2 = eval("selectedData." + dataColumns[0]);
                             let req3=this.requestType;
                             let req1="Sukuks_Currencywise_Sovereign"+"?"+ccy;
                            let req2="Sukuks_Purchased_Region"+"?"+ccy+"?"+SovNonSovData;
                             this.brdArr=[
                                        {"reqType":"Sukuks_Currencywise_Holdings","selectedVal":ccy,"seperator":" > "},
                                        {"reqType":req1,"selectedVal":SovNonSovData,"seperator":" > "},
                                        {"reqType":req2,"selectedVal":cntryGrp,"seperator":" > "},
                                        {"reqType":this.requestType,"selectedVal":drilldwnParam2,"seperator":""}];
                            this.requestType = "Sukuks_Strategywise_Sovereign"+"?"+ccy+"?"+SovNonSovData+"?"+cntryGrp+"?"+drilldwnParam2;
                            this.loadStackedBar(true);
                        }
                        else{
                            this.prgStatus=false;
                            this.progressMode="";
                        }
                    
                    })
                    
                    .on('mouseover',  (d) =>{
                            let mouseCoords = d3.mouse(this.parentNode);
                            console.log("***parentNode:", this.parentNode);
                            console.log("mouseCoords:", mouseCoords);
                            let xCo = mouseCoords[0];
                            let yCo = mouseCoords[1];
                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            let d1 = (d[0] - d[1]).toFixed(2);
                            let d2 = (d[1] - d[0]).toFixed(2);
                            if (d[0] < 0) {
                                div.html("<span style='color:white;background: black; padding: 2px; text-align: center;width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                                    + d1 + "</span>");
                            }
                            else {
                                div.html("<span style='color:white;background: black;padding: 2px;text-align: center; width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                                    + d2 + "</span>");
                            }
                    })
                    
                   .on('mousemove',  (d) =>{
                        div.style("top", (d.pageY - 10) + "px")
                            .style("left", (d.pageX + 10) + "px");
                   })
                   
                    .on('mouseout',  (d)=> {
                        console.log("In Mouseout:");
                        div.transition().duration(500).style("opacity", 0);
                });
                
                /*.append("title")
                .text(function(d) { if (d[0] < 0) { return d[0] - d[1];} else {return d[1] - d[0];} }); */
                let xAxisTransform = height - y(0) + margin.top;
                let vis =  svg.append("g").attr('class', 'x axis')
                    .style("fill", "none").attr("stroke", "#f1f1f1").attr("stroke-width", "0.5").attr("shape-rendering", "geometricPrecision")
                    .attr("transform", "translate(0," + y(0) + ")")
                    .attr("stroke", "#f1f1f1")
                    .attr("stroke-width", "0.5")
                    .call(d3.axisBottom(x));
                
                if (data.length > 10) {
                    vis.selectAll("text")                       
                    .style("text-anchor", "end")
                    .attr("dx", "-.5em")
                    .attr("dy", ".5em")
                    .attr("transform", "rotate(-45)");
                }
                vis.append("text")
                    .attr("fill", "#000")
                    .style("font-size", "11px")
                                .style("text-transform", "uppercase")
                    .style("font-weight", "100")
                    .style("font-family", "Tahoma, Helvetica, sans-serif")
                    .text(this.xAxisUnit)
                    .attr("transform", "translate(" + (width/2) + " ," + xAxisTransform
                        + ")")
                    .style("fill", "darkorange");

                    vis.selectAll(".tick text")
                    .call(wrap, x.bandwidth());
                svg.append("g").attr('class', 'y axis')
                    .style("fill", "#none").attr("stroke", "#f1f1f1").attr("stroke-width", "0.5").attr("shape-rendering", "geometricPrecision")
                    .attr("transform", "translate(" + addlLeftMargin +", 0)")
                    .attr("stroke", "#f1f1f1")
                    .attr("stroke-width", "0.5")
                    .style("text-transform", "uppercase")
                    .call(d3.axisLeft(y).ticks(null, "s"))
                    .append("text")
                    .attr("fill", "#000")
                    .style("font-size", "11px")
                    .style("text-transform", "uppercase")
                    .style("font-weight", "100")
                    .style("font-family", "Tahoma, Helvetica, sans-serif")
                    .attr("x", -30)
                    .attr("dx", 0)
                    .attr("dy", -87.109375)
                    .text(this.yAxisUnit)
                    .attr("transform", "rotate(-90)")
                    .style("fill", "darkorange")
                    .attr("dy", "1em")
                    .attr("y", 0 - margin.left - addlLeftMargin)
                    .attr("x", 0 - (height / 2))
                    .style("text-anchor", "middle");
                    
                    
                //Plot the legend...
                if (keysArr.length > 1) {
                    let legend = svg.selectAll(".legend")
                        .data(keysArr)
                        .enter().append("g")
                        .attr("class", "legend");
                    let legendElementheight = 12;
                    let legendElementwidth_1 = 120;
                    let scrnFont = "9px";
                    let boxWidth = 8;
                    let boxHeight = 8;
                    let charWidth = 10;
                    if (this.maxScreen) {
                        legendElementheight = 13;
                        legendElementwidth_1 = 150;
                        scrnFont = "14px";
                        boxWidth = 12;
                        charWidth = 17;
                        boxHeight = 12;
                    }
                    legend.append("rect")
                        //.attr("x", function (d, i) { return (legendElementwidth_1 * i) + 35; }) //{ return ((keysArr[i].length + 2) * charWidth * i); })
                        //.attr("y", height + 10)
                        .attr("x", (width - (legendElementwidth_1/3) - 3))
                        .attr("y",  (d, i)=> { 
                            if(i == 0)
                                //if (this.maxScreen) 
                                    return boxHeight; 
                                //else 
                                //  return boxHeight; 
                            else
                                //if (this.maxScreen) 
                                    return ((boxHeight + 8) * i) + boxHeight;
                                //else
                                //  return ((boxHeight + 8) * i) + boxHeight;
                        })
                        .attr("width", 10)
                        .attr("height", 10)
                        .attr("width", boxWidth)
                        .attr("height", boxHeight)
                        .style("fill",  (d, i) => { return z(keysArr[i]); });
                    if (this.maxScreen) {
                        height = height + 3;
                    }
                    legend.append("text")
                        .attr("class", "mono")
                        .text( (d, i) =>{ return keysArr[i].replace('_', ' '); })
                        .attr("fill", "#000") //"#fff") function(d) { return color(d.name)}
                        .style("font-size", scrnFont)
                        .style("text-transform", "uppercase")
                        .attr("x", (width - (legendElementwidth_1/3) + boxWidth))
                        .attr("y",  (d, i) =>{ 
                            if(i == 0)
                                if (this.maxScreen) 
                                    return boxHeight + 14; 
                                else 
                                    return boxHeight + 8; 
                            else
                                if (this.maxScreen) 
                                    return ((boxHeight + 8) * i) + boxHeight + 14;
                                else
                                    return ((boxHeight + 8) * i) + boxHeight + 8;
                        });
                        //.attr("x", function (d, i) { return (legendElementwidth_1 * i) + 50; })
                        //.attr("y", height + 20);
                }
                this.prgStatus=false;
                this.progressMode="";
                
                function wrap (text, width) {
                console.log("-- wrap    ",text, "  -     ",width);
                  text.each(() =>{
                    let text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1.1, // ems
                        y = text.attr("y"),
                        dy = parseFloat(text.attr("dy")),
                        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                    while (word = words.pop()) {
                      line.push(word);
                      if(line.length > 1){
                      tspan.text(line);
                      console.log("-- line ",line);
                     //if (tspan.node().getComputedTextLength() > width) {
                      console.log(word ,"-- line 111  ",line);
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                     // }
                    }
                    else{
                        tspan.text(word);
                    }
                    }
                  });
                }
            }
         
}


