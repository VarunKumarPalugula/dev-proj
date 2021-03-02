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
    var core_1, data_service_1, d3, HorizontalStackedBarComponent;
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
            HorizontalStackedBarComponent = (function () {
                function HorizontalStackedBarComponent(dataService) {
                    this.dataService = dataService;
                    this.barJsonList = [];
                    this.element = "";
                    this.SBars = "";
                    this.dwndContainer = "";
                    this.ititle = "";
                    this.IsdownloadImage = false;
                    this.prgStatus = false;
                    this.progressMode = "";
                    this.maxScreen = false;
                    this.margin = { top: 20, bottom: 10, left: 10, right: 20 };
                }
                HorizontalStackedBarComponent.prototype.ngOnInit = function () {
                    console.log("--- In Grouped Bars", this.requestType);
                    this.IsdownloadImage = false;
                    this.loadStackedBar(false);
                };
                HorizontalStackedBarComponent.prototype.ngOnChanges = function () {
                    //console.log("******change fired:");
                };
                HorizontalStackedBarComponent.prototype.loadStackedBar = function (reloadVal) {
                    var _this = this;
                    this.IsdownloadImage = false;
                    if (reloadVal == true) {
                        this.prgStatus = true;
                        setTimeout(function () {
                            _this.progressMode = "indeterminate";
                        }, 1000);
                    }
                    console.log("--- In Horizontal stacked Bar : ", this.requestType);
                    this.dataService.getListItemsByPost('stackedBars/getData', this.requestType).subscribe(function (listItems) {
                        console.log("---In Horizontal stacked Bar data:", listItems);
						 listItems = [
                        {
                            "TITLE": "Currency Composition",
                            "X_AXIS": "Currency Position (USD)",
                            "Y_AXIS": "Currency"
                        },
                        {
                            "CCY": "USD",
                            "MAX_VALUE": "5000.99",
                            "MIN_VALUE": "2779.77",
                            "CURRENT_VALUE": "3667.77"
                        },
                        {
                            "CCY": "GBP",
                            "MAX_VALUE": "4000.00",
                            "MIN_VALUE": "1500.00",
                            "CURRENT_VALUE": "2000.66"
                        },
                        { "CCY": "EUR",
                            "MAX_VALUE": "2246.83",
                            "MIN_VALUE": "1000.00",
                            "CURRENT_VALUE": "1500.44"
                        },
                        { "CCY": "JPY",
                            "MAX_VALUE": "3000.55",
                            "MIN_VALUE": "500.43",
                            "CURRENT_VALUE": "1300.44"
                        }
                    ];
                        _this.jsonData = listItems;
                        _this.barJsonList = listItems;
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
                            _this.prgStatus = false;
                            _this.progressMode = "";
                            var element = _this.chartContainer.nativeElement;
                            var gdiv = d3.select(element)
                                .append("div").append("center")
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
                            _this.prgStatus = false;
                            _this.progressMode = "";
                            var element = _this.chartContainer.nativeElement;
                            var gdiv = d3.select(element)
                                .append("div").append("center")
                                .attr("style", "width: " + _this.width + "px; height: " + _this.height + "px;")
                                .append("table")
                                .attr("width", _this.width)
                                .attr("height", _this.height).append("tr").append("td").append("p")
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
                HorizontalStackedBarComponent.prototype.createChart = function () {
                    var _this = this;
                    //   let element = this.chartContainer.nativeElement;
                    console.log("*************this.jsonData:", this.jsonData);
                   
                    var data = this.jsonData;
                    var dataAxis = data[0];
                    data = data.slice(1, data.length); //data.splice(0,1);
                    if (!this.maxScreen && data.length > 10) {
                        console.log(" -- inside ");
                        data = data.slice(0, 11);
                    }
                    if (typeof (dataAxis.X_AXIS) != "undefined") {
                        this.xAxisUnit = dataAxis.X_AXIS;
                    }
                    if (typeof (dataAxis.Y_AXIS) != "undefined") {
                        this.yAxisUnit = dataAxis.Y_AXIS;
                    }
                    if (typeof (dataAxis.TITLE) != "undefined") {
                        this.ititle = dataAxis.TITLE;
                    }
                    var dataColumns = Object.keys(data[0]);
                    console.log("--- dataColumns:", dataColumns);
                    // excluding the first column          
                    var keysArr = dataColumns.slice(1, dataColumns.length);
                    console.log("--- keysArr: ", keysArr);
                    var min = 0;
                    var max = 0;
                    for (var jj = 0; jj < data.length; jj++) {
                        for (var ii = 0; ii < keysArr.length; ii++) {
                            if (parseFloat(eval("data[jj]." + keysArr[ii])) < min) {
                                min = parseFloat(eval("data[jj]." + keysArr[ii]));
                            }
                            if (parseFloat(eval("data[jj]." + keysArr[ii])) > min) {
                                if (max == 0)
                                    max = parseFloat(eval("data[jj]." + keysArr[ii]));
                                else {
                                    if (parseFloat(eval("data[jj]." + keysArr[ii])) > max) {
                                        max = parseFloat(eval("data[jj]." + keysArr[ii]));
                                    }
                                }
                            }
                        }
                    }
                    console.log("--- min: ", min);
                    console.log("--- max: ", max);
                    var svg = d3.select(this.element).append("center"), margin = { top: 10, right: 30, bottom: 20, left: 10 }, width = this.width - margin.right, height = this.height - margin.top - margin.bottom;
                    var addlLeftMargin = 50;
                    //let addlbottomMargin = 20;
                    svg = svg.append("svg").attr("width", this.width + addlLeftMargin + margin.right).attr("height", this.height);
                    var y = d3.scaleBand().domain(data.map(function (d) { return eval("d." + dataColumns[0]); }))
                        .rangeRound([height - margin.bottom, margin.top]).paddingInner(0.1);
                    var x = d3.scaleLinear().domain([min, max]).rangeRound([addlLeftMargin, width]);
                    if (keysArr.length <= 3) {
                        var z = d3.scaleOrdinal().range(["#fcad6b", "rgb(117, 107, 177)", "rgb(49, 163, 84)"]);
                    }
                    else {
                        var z = d3.scaleOrdinal(d3.schemeCategory20);
                    }
                    // d3.scaleOrdinal(d3.schemeCategory20);//d3.scaleOrdinal().range(["#98abc5","#7b6888","green"]); rgb(230, 85, 13);rgb(117, 107, 177);rgb(49, 163, 84)
                    var series = d3.stack().keys(keysArr).offset(d3.stackOffsetDiverging)(data);
                    console.log("series**********: ", series);
                    var div = d3.select(this.SBars).append("div").style("position", "fixed").style("z-index", "10").style("opacity", 0);
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
                    var barWidth = 15;
                    if ((data.length * keysArr.length) > 13) {
                        barWidth = y.bandwidth();
                    }
                    svg.append("g")
                        .selectAll("g")
                        .data(series)
                        .enter().append("g")
                        .attr("fill", function (d) { console.log("z", d); console.log("zzz****656******: ", z(d.key)); return z(d.key); })
                        .selectAll("rect")
                        .data(function (d) { return d; })
                        .enter().append("rect")
                        .attr("y", function (d) {
                        console.log("y.bandwidth() :", y.bandwidth());
                        console.log("(y.bandwidth() - barWidth )/2 :", (y.bandwidth() - barWidth) / 2);
                        if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                            return y(eval("d.data." + dataColumns[0])) + (y.bandwidth() - barWidth - 10) / 2;
                        }
                        return y(eval("d.data." + dataColumns[0])) + (y.bandwidth() - barWidth) / 2;
                    }) //y1.bandwidth()
                        .attr("x", function (d) {
                        if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                            return x(d[1] - d[0]);
                        }
                        return x(0);
                    })
                        .attr("height", function (d) {
                        if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                            return (barWidth + 10);
                        }
                        return barWidth;
                    })
                        .attr("width", function (d) {
                        console.log("dy height* ", d);
                        var w = x(d[1]) - x(d[0]);
                        if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                            w = 5;
                        }
                        return w;
                    })
                        .on("mouseover", function () { tooltip.style("display", null); })
                        .on("mouseout", function () { tooltip.style("display", "none"); })
                        .on("mousemove", function (d) {
								var _this = this;
								console.log(d);
								var xPosition = d3.mouse(_this)[0] - 5;
								var yPosition = d3.mouse(_this)[1] - 25;
								tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
								tooltip.select("text").text(Math.round((d[1] - d[0]) * 100) / 100);
                    });
                    //svg.selectAll("rect").attr("fill", function (d, i) { return z(eval("data[i]." + dataColumns[0])); });
                    //  let xAxisTransform = height - x(0)+ margin.top;
                    var vis = svg.append("g")
                        .attr("class", "x axis")
                        .style("fill", "none").attr("stroke-width", "0.5").attr("shape-rendering", "geometricPrecision")
                        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                        .attr("stroke-width", ".5")
                        .call(d3.axisBottom(x).ticks(null, "s"))
                        .append("text")
                        .style("font-size", "11px")
                        .style("text-transform", "uppercase")
                        .style("font-weight", "100")
                        .style("font-family", "Tahoma, Helvetica, sans-serif")
                        .text(this.xAxisUnit)
                        .attr("transform", "translate(" + ((width + addlLeftMargin) / 2) + " ," + (margin.bottom + margin.top) + ")")
                        .style("fill", "darkorange");
                    if (data.length > 4) {
                        vis.selectAll("text")
                            .style("text-anchor", "end")
                            .attr("dx", "-.5em")
                            .attr("dy", ".5em")
                            .attr("transform", "rotate(-45)");
                    }
                    /*  vis.selectAll(".tick text")
                            .call(wrap, x0.bandwidth());*/
                    svg.append("g")
                        .attr("class", "y axis")
                        .style("fill", "none").attr("stroke-width", "0.5").attr("shape-rendering", "geometricPrecision")
                        .attr("transform", "translate(" + addlLeftMargin + ", 0)")
                        .call(d3.axisLeft(y).ticks(null, "s"))
                        .append("text")
                        .attr("x", 0 - ((height - margin.bottom) / 2))
                        .attr("y", 0 - addlLeftMargin)
                        .attr("dy", "1em")
                        .style("font-size", "11px")
                        .style("text-transform", "uppercase")
                        .style("font-weight", "100")
                        .style("font-family", "Tahoma, Helvetica, sans-serif")
                        .text(this.yAxisUnit)
                        .attr("transform", "rotate(-90)")
                        .style("fill", "darkorange")
                        .attr("dy", "1em")
                        .style("text-anchor", "middle");
                    if (keysArr.length > 1) {
                        var boxWidth = 8;
                        var boxHeight = 8;
                        var scrnFont = '0.7rem';
                        if (this.maxScreen) {
                            boxWidth = 12;
                            boxHeight = 12;
                            scrnFont = '0.8rem';
                        }
                        var legend = svg.append("g")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", 10)
                            .selectAll("g")
                            .data(keysArr) //.slice().reverse()
                            .enter().append("g")
                            .attr("class", "legend")
                            .attr("transform", function (d, i) { return "translate(" + 5 + "," + i * 20 + ")"; });
                        legend.append("rect")
                            .attr("x", width - 3)
                            .attr("y", boxHeight)
                            .attr("width", boxWidth)
                            .attr("height", boxHeight)
                            .attr("fill", z);
                        legend.append("text")
                            .attr("class", "mono")
                            .attr("x", (width + boxWidth + 1))
                            .attr("y", boxHeight + 1)
                            .attr("dy", "0.7em")
                            .text(function (d, i) { return keysArr[i].replace('_', ' '); })
                            .style("font-size", scrnFont)
                            .style("text-transform", "uppercase");
                    }
                    // Prep the tooltip bits, initial display is hidden
                    var tooltip = svg.append("g")
                        .attr("class", "tooltip")
                        .style("display", "none");
                    tooltip.append("rect")
                        .attr("width", 60)
                        .attr("height", 20)
                        .attr("fill", "white")
                        .style("opacity", 0.5);
                    tooltip.append("text")
                        .attr("x", 30)
                        .attr("dy", "1.2em")
                        .style("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold");
                    function wrap(text, width) {
                        var _this = this;
                        console.log("-- wrap    ", text, "  -     ", width);
                        text.each(function () {
                            var text = d3.select(_this), words = text.text().split(/\s+/).reverse(), word, line = [], lineNumber = 0, lineHeight = 1.1, // ems
                            y = text.attr("y"), dy = parseFloat(text.attr("dy")), tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                            while (word = words.pop()) {
                                line.push(word);
                                if (line.length > 1) {
                                    tspan.text(line);
                                    console.log("-- line ", line);
                                    //if (tspan.node().getComputedTextLength() > width) {
                                    console.log(word, "-- line 111  ", line);
                                    line.pop();
                                    tspan.text(line.join(" "));
                                    line = [word];
                                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                                    // }
                                }
                                else {
                                    tspan.text(word);
                                }
                            }
                        });
                    }
                };
                __decorate([
                    core_1.ViewChild('chart'),
                    __metadata("design:type", core_1.ElementRef)
                ], HorizontalStackedBarComponent.prototype, "chartContainer", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], HorizontalStackedBarComponent.prototype, "requestType", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], HorizontalStackedBarComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], HorizontalStackedBarComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Boolean)
                ], HorizontalStackedBarComponent.prototype, "maxScreen", void 0);
                __decorate([
                    core_1.ViewChild('StackedBars'),
                    __metadata("design:type", core_1.ElementRef)
                ], HorizontalStackedBarComponent.prototype, "StackedBars", void 0);
                __decorate([
                    core_1.ViewChild('chart'),
                    __metadata("design:type", core_1.ElementRef)
                ], HorizontalStackedBarComponent.prototype, "chartContainer", void 0);
                __decorate([
                    core_1.ViewChild('dwnChart'),
                    __metadata("design:type", core_1.ElementRef)
                ], HorizontalStackedBarComponent.prototype, "dwnChart", void 0);
                HorizontalStackedBarComponent = __decorate([
                    core_1.Component({
                        selector: 'iHorzStackedBar',
                        moduleId: __moduleName,
                        templateUrl: 'horzStackedBar.component.html',
                       
                        styleUrls: ['horzStackedBar.component.css']
                        //encapsulation: ViewEncapsulation.None
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _a || Object])
                ], HorizontalStackedBarComponent);
                return HorizontalStackedBarComponent;
                var _a;
            }());
            exports_1("HorizontalStackedBarComponent", HorizontalStackedBarComponent);
        }
    };
});
//# sourceMappingURL=horzStackedBar.component.js.map