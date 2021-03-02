System.register(["@angular/core", "app/services/data.service", "d3v4"], function (exports_1, context_1) {
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
    var core_1, data_service_1, d3, StackedBarsComponent;
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
            StackedBarsComponent = (function () {
                //private xAxisUnit: string = "";
                //private yAxisUnit: string = "USD";
                function StackedBarsComponent(dataService) {
                    this.dataService = dataService;
                    this.maxScreen = false;
					this.IsdownloadImage = false;
                    this.margin = { top: 20, bottom: 10, left: 10, right: 20 };
                    this.chartType = "Portfolio";
					this.brdArr=[];
					this.ititle="";
					this.jsonData=[];
					this.barJsonList = [];
					this.dwndContainer = "";
					this.prgStatus=false;
					this.progressMode="";
                    console.log("********stackedBars called:****************");
                }
                StackedBarsComponent.prototype.ngOnInit = function () {
                    var _this = this;
					this.IsdownloadImage = false;
					_this.loadStackedBar(false);
                };
				StackedBarsComponent.prototype.loadStackedBar = function (reloadVal) {
					 var _this = this;
					 _this.IsdownloadImage = false;
					 if(reloadVal==true){
							_this.prgStatus=true;
							setTimeout(function(){
								_this.progressMode="indeterminate";
							},1000);
						}
					   console.log("--- In Grouped Bars", _this.requestType);
                    _this.dataService.getListItemsByPost('stackedBars/getData', _this.requestType).subscribe(function (listItems) {
                        console.log("--- Grouped Bars data:", listItems);
                        _this.jsonData = listItems;
						_this.barJsonList = listItems;


                        /*	this.jsonData = [
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
						if (_this.requestType == "VaR") {
                            //  this.xAxisUnit = "Tenor";
                            //  this.yAxisUnit = "Million USD";	  
                            _this.jsonData = [
                                { "tenor": "1D", "CVAR": 15, "VaR": 22 },
                                { "tenor": "2D", "CVAR": 15, "VaR": 18 },
                                { "tenor": "3D", "CVAR": 18, "VaR": 20 },
                                { "tenor": "4D", "CVAR": 20, "VaR": 22 },
                                { "tenor": "5D", "CVAR": 20, "VaR": 21 },
                                { "tenor": "6D", "CVAR": 19, "VaR": 20 },
                                { "tenor": "7D", "CVAR": 18, "VaR": 19 }
                            ];
                        }
                        else if (_this.requestType == "Performance_Reporting") {
                            //  this.xAxisUnit = "Tenor";
                            //  this.yAxisUnit = "Percent";	
                            if (_this.chartType == "Portfolio") {
                                _this.portfolio.nativeElement.style.background = "#709fdc";
                                _this.benchmark.nativeElement.style.background = "#205570";
                                _this.jsonData = [
                                    { "tenor": "1M", "Performance": 11.5, "Max_Return": 25.1, "Min_Return": -20.2, "Volatility": 12.7, "Skewness": 28.1, "Ex_Post_Tracking_Error": 13.1 },
                                    { "tenor": "3M", "Performance": -1.01, "Max_Return": 25.1, "Min_Return": -20.2, "Volatility": 10.4, "Skewness": 34.9, "Ex_Post_Tracking_Error": 10.7 },
                                    { "tenor": "6M", "Performance": -2.3, "Max_Return": 25.1, "Min_Return": -20.2, "Volatility": 10.1, "Skewness": 24.7, "Ex_Post_Tracking_Error": 11.1 },
                                    { "tenor": "12M", "Performance": 8.3, "Max_Return": 25.1, "Min_Return": -20.2, "Volatility": 10.3, "Skewness": 28.3, "Ex_Post_Tracking_Error": 11.4 }
                                ];
                            }
                            else if (_this.chartType == "Benchmark") {
                                _this.portfolio.nativeElement.style.background = "#205570";
                                _this.benchmark.nativeElement.style.background = "#709fdc";
                                _this.jsonData = [
                                    { "tenor": "1M", "Performance": 4.6, "Max_Return": 9.8, "Min_Return": -7, "Volatility": 4.5, "Skewness": 11.5 },
                                    { "tenor": "3M", "Performance": -3.8, "Max_Return": 9.8, "Min_Return": -8.8, "Volatility": 4.3, "Skewness": 4.5 },
                                    { "tenor": "6M", "Performance": -4, "Max_Return": 9.8, "Min_Return": -8.8, "Volatility": 4.2, "Skewness": 24.1 },
                                    { "tenor": "12M", "Performance": -0.5, "Max_Return": 9.8, "Min_Return": -8.9, "Volatility": 4.2, "Skewness": 16.1 }
                                ];
                            }
                        }
                        if (typeof _this.element != "object") {
                            _this.element = _this.chartContainer.nativeElement;
                            _this.SBars = _this.StackedBars.nativeElement;
                        }
                        else {
                        
                            _this.element.removeChild(_this.element.lastChild);
                            _this.SBars.removeChild(_this.SBars.lastChild);
                        }
                     
                        //this.jsonData = []; 
                        //Check data size...
                        if (_this.jsonData.length == 0) {
                            _this.prgStatus=false;
							_this.progressMode="";
                            var element = _this.chartContainer.nativeElement;
                            var gdiv = d3.select(element)
                                .append("div")
                                .attr("style", "width: " + _this.width + "px; height: " + _this.height + "px;")
                                .append("table")
                                .attr("width", _this.width)
                                .attr("height", _this.height).append("tr").append("td").append("p")
                                .text("No Data Available")
                                .style("color", "#fff")
                                .style("font-size", 13)
                                .style("text-transform", "uppercase")
                                .style("text-align", "center")
                                .attr("x", _this.width / 2)
                                .attr("y", _this.height / 2);
                            return;
                        }
                        else if (_this.jsonData.length == 1 && _this.jsonData[0].status == "Fail") {
							_this.prgStatus=false;
							_this.progressMode="";
                            var element = _this.chartContainer.nativeElement;
                            var gdiv = d3.select(element)
                                .append("div")
                                .attr("style", "width: " + _this.width + "px; height: " + _this.height + "px;")
                                .append("table")
                                .attr("width", _this.width)
                                .attr("height", _this.height).append("tr").append("td").append("p")
                                //.text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
								.text("No Data Available")
                                .style("color", "red")
                                .style("font-size", 13)
                                .style("text-transform", "uppercase")
                                .style("text-align", "center")
                                .attr("x", _this.width / 2)
                                .attr("y", _this.height / 2);
                            return;
                        }
                        else {
                            _this.createChart();
                        }
                    }); //end ngInit
				   };
				
                StackedBarsComponent.prototype.prevDrilldown = function (ev) {
                    console.log("******prevDrilldown fired ev:",ev);
					
						this.requestType= ev;
						
						this.loadStackedBar(true);
						
						for(var i=0;i<this.brdArr.length;i++){
							if(ev==this.brdArr[i].reqType){
								var len= this.brdArr.length - i;
								this.brdArr.splice(i,len);
								if(i!=0){
								this.brdArr[i-1].seperator="";
								}	
							}
						}
						
						console.log("******prevDrilldown fired brdArr:",this.brdArr);
                };
                StackedBarsComponent.prototype.ngOnChanges = function () {
                    //console.log("******change fired:");
                   
                };
               
				 StackedBarsComponent.prototype.downloadImage = function (event) {
								this.jsonData  = this.barJsonList;
								this.IsdownloadImage = event;
								this.maxScreen = event;
								
								if (typeof this.dwndContainer != "object") {
									this.dwndContainer = this.dwnChart.nativeElement;
								}else{
									this.dwndContainer.removeChild(this.dwndContainer.lastChild);
								}
								
								this.createChart();
								
								
								var svgNode = this.dwndContainer.getElementsByTagName("svg")[0];
											
								// Put the svg into an image tag so that the Canvas element can read it in.			
								var fileType = "image/png";
								var dataURL = svgNode.toDataURL(fileType, {
									renderer: "canvg",
									callback: function (data) {
										var image = new Image();
										
										image.src = data;
									}
								});
								var binStr = atob(dataURL.split(',')[1]);
								var len = binStr.length;
								var arr = new Uint8Array(len);
								for (var i = 0; i < len; i++) {
									arr[i] = binStr.charCodeAt(i);
								}
								var blob = new Blob([arr], { type: fileType });
								var fileName = this.ititle;
								if (fileName == "") {
									fileName = "Widget";
								}
								saveAs(blob, fileName + '.png'); 
								this.IsdownloadImage = false;
								this.maxScreen = false;

				 };
                StackedBarsComponent.prototype.createChart = function () {
                    //   let element = this.chartContainer.nativeElement;
                    //  console.log("*************element:", element);
                    var data = this.jsonData;
					var dataAxis = data[0];
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
                    var dataColumns = Object.keys(data[0]);
                    console.log("--- dataColumns:", dataColumns);
                    //let xAxisColumn = dataColumns[0];          
                    // excluding the first column          
                    var keysArr = dataColumns.slice(1, dataColumns.length);
                    console.log("--- keysArr: ", keysArr);
                    var min = 0;
                    var max = 0;
                    for (var jj = 0; jj < data.length; jj++) {
                        //console.log("--- data[jj]: ",data[jj]);
                        for (var ii = 0; ii < keysArr.length; ii++) {
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
                    var series = d3.stack()
                        .keys(keysArr)
                        .offset(d3.stackOffsetDiverging)(data);
                    var gDiv = d3.select(this.element), margin = { top: 20, right: 0, bottom: 10, left: 0 }; //left is +30 for labels
                   var width = this.width ; //+svg.attr("width"),
                   var height = this.height - margin.top - margin.bottom; // +svg.attr("height");
				   if(this.IsdownloadImage){
						width = 1100 ;
						height = 540 - margin.top - margin.bottom;
						
						var svg = d3.select(this.dwndContainer).append("svg").attr("width", 1200)
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
						 var svg = gDiv.append("svg").attr('class', 'animated zoomIn')
                        .attr("width", width)
                        .attr("height", height + margin.top);
					}
                    var div = d3.select(this.SBars).append("div")
                        .style("position", "fixed")
                        .style("z-index", "10")
                        .style("opacity", 0);
					var addlLeftMargin = 70;
                    var x = d3.scaleBand()
                        .domain(data.map(function (d) { return eval("d." + dataColumns[0]); })) // d.TENOR
						.rangeRound([addlLeftMargin, width])
                        .paddingInner(0.1);
                    var y = d3.scaleLinear()
                        .domain([min, max])
                        .rangeRound([height - margin.bottom, margin.top]);
					var x1 = d3.scaleBand()
						.padding(0.05);
					x1.domain(keysArr).rangeRound([addlLeftMargin, x.bandwidth()]);
                    var z = d3.scaleOrdinal(d3.schemeCategory20);
                    //color(d3.scale.ordinal().range(["hexcolor1", "hexcolor2", "hexcolor3", "hexcolor4", "hexcolor5", "hexcolor6", "hexcolor7"]).range());
                    function stackMin(series) {
                        return d3.min(series, function (d) { return d[1]; });
                    }
                    function stackMax(series) {
                        return d3.max(series, function (d) { return d[1]; });
                    }

                    var k = -1;
                    var padding = 7;
                    if (this.maxScreen) {
                        padding = 16;
                    }
					var barWidth = 25;
					if((data.length * keysArr.length) > 13){
						barWidth = x.bandwidth(); 
					} 

                    svg.append("g")
                        .selectAll("g")
                        .data(series)
                        .enter().append("g")
                        .attr("fill", function (d) { return z(d.key); })
                        .selectAll("rect")
                        .data(function (d) { return d; })
                        .enter().append("rect")
						.attr("width", barWidth)
                        .attr("x", function (d, i) {
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
					.attr("y", function (d) { if (keysArr.length <= 1 && d[1] < 0) {
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
                        .attr("height", function (d) { if (d[1] >= 0) {
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
                            .attr("fill", function (d, i) { return z(eval("data[i]." + dataColumns[0])); });
                    }
                    //Title for each bar
				
					var _this = this;
					var drilldwnParam1='';
					var drilldwnParam2='';
					var result='';
					var reqArr=[];
                    svg.selectAll("rect")
						.on('dblclick', function (d) {
							
							console.log("******in on click****reqType:",_this.requestType);
							 
							result =_this.requestType.split("?");
							console.log("************result::::",result);
							var selectedData = d.data;
							var ccy,CPData,SovNonSovData,cntryGrp;
							if (_this.requestType == "FX_Dealerwise_MTM") {
							
								drilldwnParam1 = eval("selectedData." + dataColumns[0]);
								_this.brdArr=[{"reqType":_this.requestType,"selectedVal":drilldwnParam1}];
								_this.requestType = "FX_CcyPair_MTM"+"?"+drilldwnParam1;
								
								_this.loadStackedBar(true);
								
							}
							else if (_this.requestType == "Currency_Position") {
								
								drilldwnParam1 = eval("selectedData." + dataColumns[0]);
								 var CPCcy=drilldwnParam1;
								  localStorage.setItem("CPData", CPCcy);
								_this.brdArr=[{"reqType":_this.requestType,"selectedVal":drilldwnParam1}];
								_this.requestType = "Currency_Position_Net"+"?"+drilldwnParam1;
								_this.loadStackedBar(true);
							}
							else if (result[0] == "Currency_Position_Net") {
								
								drilldwnParam1 = eval("selectedData." + dataColumns[0]);
								var p1 = localStorage.getItem("CPData");
								var req1=_this.requestType;
								_this.brdArr=[{"reqType":"Currency_Position","selectedVal":p1,"seperator":">"},{"reqType":req1,"selectedVal":drilldwnParam1}];
								if(d[1] == selectedData.NETFLOW){
										console.log("********net cash if:");
										_this.requestType = "Currency_Position_NetCash"+"?"+p1;
								}	
								if(d[1] == selectedData.NETFLOW){
									console.log("********net forward if:");
									_this.requestType = "Currency_Position_NetForward"+"?"+p1;
								}
								_this.loadStackedBar(true);
							}
							else if (_this.requestType == "Currencywise_Nostro_Balances") {
								
							}
							else if (_this.requestType == "Daily_Reserve_Position") {
								
							}
							else if (_this.requestType == "MM_Tenorwise_Cashflow") {
								
								drilldwnParam1 = eval("selectedData." + dataColumns[0]);
								console.log("*********drilldwnParam1:",drilldwnParam1);
								var splitParam =drilldwnParam1.split("-");
								console.log("*********splitParam:",splitParam);
							
								 if(splitParam[1] == "D"){
									drilldwnParam2 = "DEPOSIT";
								 }
								 if(splitParam[1] == "P"){
									drilldwnParam2 = "PLACEMENT";
								 }
								_this.brdArr=[{"reqType":_this.requestType,"selectedVal":drilldwnParam1}];
								_this.requestType = "MM_ProdWise_CashFlow"+"?"+splitParam[0]+"?"+drilldwnParam2;
								_this.loadStackedBar(true);
							}
							else if (_this.requestType == "Sukuks_Currencywise_Holdings") {
								
								drilldwnParam1 = eval("selectedData." + dataColumns[0]);
								console.log("*********drilldwnParam1:",drilldwnParam1);
								_this.brdArr=[{"reqType":_this.requestType,"selectedVal":drilldwnParam1,"seperator":""}];
								var ccyData=drilldwnParam1;
								  localStorage.setItem("ccy", ccyData);
								_this.requestType = "Sukuks_Currencywise_Sovereign"+"?"+drilldwnParam1;
								_this.loadStackedBar(true);
							}
							else if (result[0] == "Sukuks_Currencywise_Sovereign") {
								
								ccy=localStorage.getItem("ccy");
								console.log("local storage get ccy:",ccy);
								var SovNonSovData=selectedData.SOVEREIGN_NONSOVEREIGN;
								  localStorage.setItem("SovNonSovData", SovNonSovData);
								//drilldwnParam1 = data[i].CURRENCY;
								drilldwnParam2 = eval("selectedData." + dataColumns[0]);
								console.log("*****drilldwnParam2:",drilldwnParam2);
								var req1=_this.requestType;
								_this.brdArr=[
											{"reqType":"Sukuks_Currencywise_Holdings","selectedVal":ccy,"seperator":" > "},
											{"reqType":_this.requestType,"selectedVal":drilldwnParam2,"seperator":""}];
								_this.requestType = "Sukuks_Purchased_Region"+"?"+ccy+"?"+drilldwnParam2;
								_this.loadStackedBar(true);
							}
							else if (result[0] == "Sukuks_Purchased_Region") {
								
								var cntryGrp = selectedData.COUNTRY_GROUP;
								localStorage.setItem("cntryGrp", cntryGrp);
								ccy=localStorage.getItem("ccy");
								SovNonSovData=localStorage.getItem("SovNonSovData");
								drilldwnParam2 = eval("selectedData." + dataColumns[0]);
								var req2=_this.requestType;
								var req1="Sukuks_Currencywise_Sovereign"+"?"+ccy;
								_this.brdArr=[
											{"reqType":"Sukuks_Currencywise_Holdings","selectedVal":ccy,"seperator":" > "},
											{"reqType":req1,"selectedVal":SovNonSovData,"seperator":" > "},
											{"reqType":_this.requestType,"selectedVal":drilldwnParam2,"seperator":""}];
								_this.requestType = "Sukuks_Countrywise_Holdings"+"?"+ccy+"?"+SovNonSovData+"?"+drilldwnParam2;
								_this.loadStackedBar(true);
							}
							else if (result[0] == "Sukuks_Countrywise_Holdings") {
							
								ccy=localStorage.getItem("ccy");
								SovNonSovData=localStorage.getItem("SovNonSovData");
								cntryGrp=localStorage.getItem("cntryGrp");
								drilldwnParam2 = eval("selectedData." + dataColumns[0]);
								 var req3=_this.requestType;
								 var req1="Sukuks_Currencywise_Sovereign"+"?"+ccy;
								var req2="Sukuks_Purchased_Region"+"?"+ccy+"?"+SovNonSovData;
								 _this.brdArr=[
											{"reqType":"Sukuks_Currencywise_Holdings","selectedVal":ccy,"seperator":" > "},
											{"reqType":req1,"selectedVal":SovNonSovData,"seperator":" > "},
											{"reqType":req2,"selectedVal":cntryGrp,"seperator":" > "},
											{"reqType":_this.requestType,"selectedVal":drilldwnParam2,"seperator":""}];
								_this.requestType = "Sukuks_Strategywise_Sovereign"+"?"+ccy+"?"+SovNonSovData+"?"+cntryGrp+"?"+drilldwnParam2;
								_this.loadStackedBar(true);
							}
							else{
								_this.prgStatus=false;
								_this.progressMode="";
							}
						
						})
                        .on('mouseover', function (d) {
                        var mouseCoords = d3.mouse(this.parentNode);
                        console.log("***parentNode:", this.parentNode);
                        console.log("mouseCoords:", mouseCoords);
                        var xCo = mouseCoords[0];
                        var yCo = mouseCoords[1];
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        var d1 = (d[0] - d[1]).toFixed(2);
                        var d2 = (d[1] - d[0]).toFixed(2);
                        if (d[0] < 0) {
                            div.html("<span style='color:white;background: black; padding: 2px; text-align: center;width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                                + d1 + "</span>");
                        }
                        else {
                            div.html("<span style='color:white;background: black;padding: 2px;text-align: center; width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                                + d2 + "</span>");
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
                    /*.append("title")
                    .text(function(d) { if (d[0] < 0) { return d[0] - d[1];} else {return d[1] - d[0];} }); */
					var xAxisTransform = height - y(0) + margin.top;
                    var vis =  svg.append("g").attr('class', 'x axis')
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
                        var legend = svg.selectAll(".legend")
                            .data(keysArr)
                            .enter().append("g")
                            .attr("class", "legend");
                        var legendElementheight = 12;
                        var legendElementwidth_1 = 120;
                        var scrnFont = "9px";
                        var boxWidth = 8;
                        var boxHeight = 8;
                        var charWidth = 10;
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
							.attr("y", function (d, i) { 
								if(i == 0)
									//if (this.maxScreen) 
										return boxHeight; 
									//else 
									//	return boxHeight; 
								else
									//if (this.maxScreen) 
										return ((boxHeight + 8) * i) + boxHeight;
									//else
									//	return ((boxHeight + 8) * i) + boxHeight;
							})
							.attr("width", 10)
							.attr("height", 10)
                            .attr("width", boxWidth)
                            .attr("height", boxHeight)
                            .style("fill", function (d, i) { return z(keysArr[i]); });
                        if (this.maxScreen) {
                            height = height + 3;
                        }
                        legend.append("text")
                            .attr("class", "mono")
                            .text(function (d, i) { return keysArr[i].replace('_', ' '); })
                            .attr("fill", "#000") //"#fff") function(d) { return color(d.name)}
                            .style("font-size", scrnFont)
                            .style("text-transform", "uppercase")
							.attr("x", (width - (legendElementwidth_1/3) + boxWidth))
							.attr("y", function (d, i) { 
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
					  text.each(function() {
						var text = d3.select(this),
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
                };
                __decorate([
                    core_1.ViewChild('chart'),
                    __metadata("design:type", core_1.ElementRef)
                ], StackedBarsComponent.prototype, "chartContainer", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], StackedBarsComponent.prototype, "requestType", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], StackedBarsComponent.prototype, "heading", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], StackedBarsComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], StackedBarsComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], StackedBarsComponent.prototype, "xAxisUnit", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], StackedBarsComponent.prototype, "yAxisUnit", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], StackedBarsComponent.prototype, "changeTrigger", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Boolean)
                ], StackedBarsComponent.prototype, "maxScreen", void 0);
                __decorate([
                    core_1.ViewChild('portfolio'),
                    __metadata("design:type", core_1.ElementRef)
                ], StackedBarsComponent.prototype, "portfolio", void 0);
                __decorate([
                    core_1.ViewChild('benchmark'),
                    __metadata("design:type", core_1.ElementRef)
                ], StackedBarsComponent.prototype, "benchmark", void 0);
                __decorate([
                    core_1.ViewChild('StackedBars'),
                    __metadata("design:type", core_1.ElementRef)
                ], StackedBarsComponent.prototype, "StackedBars", void 0);
				__decorate([
                    core_1.ViewChild('dwnChart'),
                    __metadata("design:type", core_1.ElementRef)
                ], StackedBarsComponent.prototype, "dwnChart", void 0);
				
                StackedBarsComponent = __decorate([
                    core_1.Component({
                        selector: 'iStackedBars',
                        moduleId: __moduleName,
                        templateUrl: 'stackedBars.component.html',
						inputs:['IsdownloadImage','maxScreen','svgNode'],
                        providers: [data_service_1.DataService],
                        styleUrls: ['stackedBars.component.css']
                        //encapsulation: ViewEncapsulation.None
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _a || Object])
                ], StackedBarsComponent);
                return StackedBarsComponent;
                var _a;
            }());
            exports_1("StackedBarsComponent", StackedBarsComponent);
        }
    };
});
//# sourceMappingURL=stackedBars.component.js.map