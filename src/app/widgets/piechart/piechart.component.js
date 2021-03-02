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
    var core_1, data_service_1, d3, PiechartComponent;
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
            PiechartComponent = (function () {
                function PiechartComponent(dataService) {
                    this.dataService = dataService;
					this.maxScreen = false;
                    console.log("********piechart called:****************");
                }
                PiechartComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log("--- In Pie Chart", this.requestType);
                    this.dataService.getListItemsByPost('pieChart/getData', this.requestType).subscribe(function (listItems) {
                        console.log("--- Pie Chart data:", JSON.stringify(listItems));
                        _this.dataREST = listItems;
                        if (typeof _this.element != "object") {
                            _this.element = _this.chartContainer.nativeElement;
                            _this.pie = _this.PieChart.nativeElement;
                        }
                        else {
                            console.log("else:");
                            _this.element.removeChild(_this.element.lastChild);
                            _this.pie.removeChild(_this.pie.lastChild);
                        }
                        _this.createChart();
                    }); //end ngInit
                };
                PiechartComponent.prototype.createChart = function () {
                    var data = []; // An new empty array
                    for (var i = 0, len = this.dataREST.length; i < len; i++) {
                        data[i] = this.dataREST[i];
                    }
                    /*let data = [{ "pie_name": "T Bonds", "pie_value": 4000000 }, { "pie_name": "T Bills", "pie_value": 3000000 },
                        { "pie_name": "Discount", "pie_value": 2500000 }, { "pie_name": "TIPS", "pie_value": 1500000 },
                        { "pie_name": "Sukuk", "pie_value": 2000000 }];*/
                    /*
                    [
                      {
                        "PORTFOLIO": "CAMB",
                        "OUTFLOW": "1000000"
                      },
                      {
                        "PORTFOLIO": "LQDT",
                        "OUTFLOW": "8008205.6"
                      },
                      {
                        "PORTFOLIO": "VALO",
                        "OUTFLOW": "6880068.44"
                      }
                    ]; */
                    var dataColumns = Object.keys(data[0]);
                    console.log("--- dataColumns:", dataColumns);
                    var element = this.chartContainer.nativeElement;
                    //console.log("*************element:", element);
                    var width = this.width;
                    var height = this.height;
                    var radius = Math.min(width, height) / 2;
                    var gDiv = d3.select(this.element);
                    var div = d3.select(this.pie).append("div")
                        .style("position", "fixed")
                        .style("z-index", "10")
                        .style("opacity", 0);
                    //data = [];             
                    //Check data size...
                    if (data.length == 0 || (data.length == 1 && data[0].status == "Fail")) {
                        //alert("No Data"); 
                        //let element = this.chartContainer.nativeElement;
                        gDiv.append("div")
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
            		    /*else if (data.length == 1 && data[0].status == "Fail") {
            			gDiv.append("div")                           
            						.attr("style", "width: " + this.width + "px; height: "+this.height+ "px;")                            
            						.append("table")
            						.attr("width", this.width)
            						.attr("height", this.height).append("tr").append("td").append("p")                            
            						.text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
            						.style("color", "red")
            						.style("font-size", 13)
            						.style("text-transform", "uppercase")
            						.style("text-align", "center")
            						.attr("x", this.width/2)
            						.attr("y", this.height/2);                
            			return;		
            		    }*/
		    					
                    var svg = gDiv.append("svg").attr('class', 'animated zoomIn')
                        .attr("width", width)
                        .attr("height", height)
						.style("margin-left","-5%");
                    //.attr("style", "margin-top: 10px;");
                    var formatNumber = d3.format(",d");
                    var g = svg.append("g").attr("transform", "translate(" +  (100+width / 2) + "," + height / 2 + ")");
                    var color = d3.scaleOrdinal(d3.schemeCategory20c); //d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
                    var pie = d3.pie()
                        .sort(null)
                        .value(function (d) { return eval("d." + dataColumns[1]); });
                    var path = d3.arc()
                        .outerRadius(radius - 10)
                        .innerRadius(0);
                    var label = d3.arc()
                        .outerRadius(radius - 40) //100)
                        .innerRadius(radius - 40); //0);
                    //console.log("***********label:", label);
                    /* d3.tsv("app/shared/piechart/data.tsv", function(d) {
                         console.log("*************d:", d);
                         d.pie_value = +d.pie_value;
                         return d;
                     }, function(error, data) {
                         if (error) throw error;*/
                    var totalSum = 0;
                    for (var i = 0; i < data.length; i++) {
                        var valStr = eval("data[i]." + dataColumns[1]);
                        totalSum += parseFloat(valStr);
                    }
                    totalSum = Math.round(totalSum * 100) / 100;
                    console.log("**********totalSum:", totalSum);
                    var arc = g.selectAll(".arc")
                        .data(pie(data))
                        .enter().append("g")
                        .attr("class", "arc");
                    arc.append("path")
                        .attr("d", path)
                        .attr("fill", function (d) { return color(eval("d.data." + dataColumns[0])); }) //d.data.pie_name); })
                        .on('mouseover', function (d) {
                        console.log("In Mouseover:d", d);
                        var mouseCoords = d3.mouse(this.parentNode);
                        console.log("***parentNode:", this.parentNode);
                        console.log("mouseCoords:", mouseCoords);
                        var xCo = mouseCoords[0];
                        var yCo = mouseCoords[1];
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div.html("<span style='color:white;background: black; padding: 2px; text-align: center;width: 60px;height: 28px;border-radius: 8px;border: 0px;'>"
                            + eval("d.data." + dataColumns[0]) + " - " + formatNumber(eval("d.data." + dataColumns[1])) + "</span>");
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
                    /* .append("title").text(function(d) { return eval("d.data." + dataColumns[0]) + " - "+ formatNumber(eval("d.data." + dataColumns[1])); });*/
                    arc.append("text")
                        .style("fill", "#fff")
                        .attr("transform", function (d) { return "translate(" + label.centroid(d) + ")"; })
                        .attr("dy", "0.35em")
                        .style("font-size", 9)
                        .text(function (d) { var percent = parseFloat(eval("d.data." + dataColumns[1])) / totalSum; var perValue= Math.round((percent * 10000) / 100); if(perValue>0) {return  perValue + "%";} else {return "";}});
                    console.log("**********arc:", arc);
                    /*
                    let flags = []; let output = []; let l = data.length; let i;
                    for( i=0; i<l; i++) {
                        if( flags[data[i].pie_name]) continue;
                        flags[data[i].pie_name] = true;
                        output.push(data[i]);
                    } */
                    //console.log("-------------- before sorting output:",output); 
                    //Sort by depth
                    /*output.sort(function(a, b) {
                        return a.depth - b.depth;
                    });*/
                    //console.log("-------------- after sorting output:",output);         
					var xRectVal,xVal;
					console.log("******************maxscreen:",this.maxScreen);
					 if (this.maxScreen) {
						xRectVal=880;
						xVal=900;
                    }
					else{
						
						xRectVal=460;
						xVal=480;
					}
                    var legend = svg.selectAll(".legend")
                        .data(pie(data))
                        .enter().append("g")
                        .attr("class", "legend");
                    var legendElementheight = 13;
					var scrnVal = this.maxScreen;
                    legend.append("circle")
                        //.attr("x", function (d, i) { return 5; })
                        //.attr("y", function (d, i) { return (legendElementheight * i) + 18; })
						.attr("cx", function (d, i) { return xRectVal; })
                        .attr("cy", function (d, i) { return (legendElementheight * i) + 18; })
                        .attr("r","0.4em")
                        .style("fill", function (d, i) { return color(eval("d.data." + dataColumns[0])); });
                    legend.append("text")
                        .attr("class", "mono")
                        .text(function (d) { return eval("d.data." + dataColumns[0]); })
						.each(legendEllipsis)
                        .attr("fill", "#000")
                        .style("font-size", "11px")
						.style("font-family", "Tahoma, Helvetica, sans-serif")
                        .style("text-transform", "uppercase")
						.style("white-space","nowrap")
						.style("width","50px")
						.style("overflow","hidden")
						.style("text-overflow","ellipsis")
                       // .attr("x", function (d, i) { return 25; })
                        //.attr("y", function (d, i) { return (legendElementheight * i) + 27; });
						.attr("x", function (d, i) { return xVal; })
                        .attr("y", function (d, i) { return (legendElementheight * i) + 20; });
					
					  function legendEllipsis() {
						var self = d3.select(this);
						var legendText = self.text();
						if(legendText.length>25 && scrnVal==false){
							legendText = legendText.slice(0,25);
							self.text(legendText+"...");
						}
                    }
                };
                __decorate([
                    core_1.ViewChild('chart'),
                    __metadata("design:type", core_1.ElementRef)
                ], PiechartComponent.prototype, "chartContainer", void 0);
                __decorate([
                    core_1.ViewChild('PieChart'),
                    __metadata("design:type", core_1.ElementRef)
                ], PiechartComponent.prototype, "PieChart", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], PiechartComponent.prototype, "requestType", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], PiechartComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], PiechartComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], PiechartComponent.prototype, "changeTrigger", void 0);
				__decorate([
                    core_1.Input(),
                    __metadata("design:type", Boolean)
                ], PiechartComponent.prototype, "maxScreen", void 0);
                PiechartComponent = __decorate([
                    core_1.Component({
                        selector: 'iPieChart',
                        moduleId: __moduleName,
                        templateUrl: 'piechart.component.html',
			inputs:['maxScreen'],
                        styleUrls: ['piechart.component.css'],
                        providers: [data_service_1.DataService]
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _a || Object])
                ], PiechartComponent);
                return PiechartComponent;
                var _a;
            }());
            exports_1("PiechartComponent", PiechartComponent);
        }
    };
});
//# sourceMappingURL=piechart.component.js.map