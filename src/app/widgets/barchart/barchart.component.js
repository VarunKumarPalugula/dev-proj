System.register(["@angular/core", "d3"], function (exports_1, context_1) {
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
    var core_1, d3, BarchartComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }
        ],
        execute: function () {
            BarchartComponent = (function () {
                function BarchartComponent() {
                    this.margin = { top: 10, bottom: 50, left: 50, right: 10 };
                    console.log("********** Bar chart constructor called");
                }
                BarchartComponent.prototype.ngOnInit = function () {
                    // give everything a chance to get loaded before starting the animation to reduce choppiness
                    //setTimeout(() => {
                    //this.generateData();
                    this.data = [["Jan", 100], ["Feb", 120], ["Mar", 130], ["Apr", 140], ["May", 150],
                        ["June", 180], ["July", 200], ["Aug", 300], ["Sep", 400], ["Oct", 500],
                        ["Nov", 600], ["Dec", 700]
                    ];
                    this.createChart();
                    if (this.data) {
                        console.log("************if data");
                        this.updateChart();
                    }
                    //setInterval(() => this.generateData(), 10);
                    //}, 10);
                };
                BarchartComponent.prototype.ngOnChanges = function () {
                    if (this.chart) {
                        this.updateChart();
                    }
                };
                BarchartComponent.prototype.generateData = function () {
                    this.data = [];
                    for (var i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
                        this.data.push([
                            "Index " + i,
                            Math.floor(Math.random() * 100)
                        ]);
                    }
                    console.log("*********** aa data:", this.data);
                };
                BarchartComponent.prototype.createChart = function () {
                    console.log("***********bar** create chart");
                    var element = this.chartContainer.nativeElement;
                    //this.width = element.offsetWidth - this.margin.left - this.margin.right;
                    this.width = this.width;
                    //this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
                    this.height = this.height;
                    var svg = d3.select(element).append('svg')
                        .attr('width', this.width + this.margin.left + this.margin.right + 5)
                        .attr('height', this.height + this.margin.bottom + 5);
                    // chart plot area
                    this.chart = svg.append('g')
                        .attr('class', 'bars')
                        .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")");
                    console.log("************svg1:", this.chart);
                    // define X & Y domains
                    var xDomain = this.data.map(function (d) { return d[0]; });
                    var yDomain = [0, d3.max(this.data, function (d) { return d[1]; })];
                    console.log("*********x:", xDomain);
                    console.log("*****y:", yDomain);
                    // create scales
                    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
                    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
                    console.log("************x scale:", this.xScale);
                    console.log("**********y scale:", this.yScale);
                    // bar colors
                    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(['red', 'blue']);
                    // x & y axis
                    this.xAxis = svg.append('g')
                        .attr('class', 'axis axis-x')
                        .attr('transform', "translate(" + this.margin.left + ", " + (this.margin.top + this.height) + ")")
                        .call(d3.axisBottom(this.xScale));
                    this.yAxis = svg.append('g')
                        .attr('class', 'axis axis-y')
                        .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")")
                        .call(d3.axisLeft(this.yScale));
                    console.log("***********svg:", svg);
                };
                BarchartComponent.prototype.updateChart = function () {
                    var _this = this;
                    // update scales & axis
                    this.xScale.domain(this.data.map(function (d) { return d[0]; }));
                    this.yScale.domain([0, d3.max(this.data, function (d) { return d[1]; })]);
                    this.colors.domain([0, this.data.length]);
                    this.xAxis.transition().call(d3.axisBottom(this.xScale));
                    this.yAxis.transition().call(d3.axisLeft(this.yScale));
                    var update = this.chart.selectAll('.bar')
                        .data(this.data);
                    // remove exiting bars
                    update.exit().remove();
                    // update existing bars
                    this.chart.selectAll('.bar').transition()
                        .attr('x', function (d) { return _this.xScale(d[0]); })
                        .attr('y', function (d) { return _this.yScale(d[1]); })
                        .attr('width', function (d) { return _this.xScale.bandwidth(); })
                        .attr('height', function (d) { return _this.height - _this.yScale(d[1]); })
                        .style('fill', function (d, i) { return _this.colors(i); });
                    // add new bars
                    update
                        .enter()
                        .append('rect')
                        .attr('class', 'bar')
                        .attr('x', function (d) { return _this.xScale(d[0]); })
                        .attr('y', function (d) { return _this.yScale(0); })
                        .attr('width', this.xScale.bandwidth() - 20)
                        .attr('height', 0)
                        .style('fill', function (d, i) { return _this.colors(i); })
                        .transition()
                        .delay(function (d, i) { return i * 10; })
                        .attr('y', function (d) { return _this.yScale(d[1]); })
                        .attr('height', function (d) { return _this.height - _this.yScale(d[1]); });
                };
                __decorate([
                    core_1.ViewChild('chart'),
                    __metadata("design:type", core_1.ElementRef)
                ], BarchartComponent.prototype, "chartContainer", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], BarchartComponent.prototype, "requestType", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], BarchartComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], BarchartComponent.prototype, "height", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Array)
                ], BarchartComponent.prototype, "data", void 0);
                BarchartComponent = __decorate([
                    core_1.Component({
                        selector: "iBarChart",
                        moduleId: __moduleName,
                        templateUrl: "barchart.component.html",
                        styleUrls: ['barchart.component.css'],
                        encapsulation: core_1.ViewEncapsulation.None
                    }),
                    __metadata("design:paramtypes", [])
                ], BarchartComponent);
                return BarchartComponent;
            }());
            exports_1("BarchartComponent", BarchartComponent);
        }
    };
});
//# sourceMappingURL=barchart.component.js.map