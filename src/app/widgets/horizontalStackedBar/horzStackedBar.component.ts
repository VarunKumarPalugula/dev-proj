import { Component, ViewChild, Input, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3v4';
import { BaseComponent } from '../../base/base.component';
import { DataService } from '../../../app/services/data.service';

@Component({

    selector: 'iHorzStackedBar',
    // moduleId: __moduleName,
    templateUrl: 'horzStackedBar.component.html',
    styleUrls: ['horzStackedBar.component.css']
    //encapsulation: ViewEncapsulation.None
})
export class HorizontalStackedBarComponent extends BaseComponent implements OnInit {

    // public __moduleName: string;


    public jsonData: any = [];
    public barJsonList: any = [];
    public element: any = "";
    public SBars: any = "";
    public dwndContainer: any = "";
    public ititle: string = "";
    public IsdownloadImage: boolean = false;
    public prgStatus: boolean = false;
    public progressMode: string = "";
    @Input() requestType: any;
    @Input() width: any;
    @Input() height: any;

    @Input() maxScreen: boolean = false;

    @ViewChild('StackedBars', { static: false }) StackedBars: ElementRef;
    @ViewChild('chart', { static: false }) chartContainer: ElementRef;
    @ViewChild('dwnChart', { static: false }) dwnChart: ElementRef;

    private margin: any = { top: 20, bottom: 10, left: 10, right: 20 };
    xAxisUnit: any;
    yAxisUnit: any;

    constructor(private dataService: DataService) {

        super();
    }

    ngOnInit() {
        console.log("--- In Grouped Bars", this.requestType);
        this.IsdownloadImage = false;
        this.loadStackedBar(false);
    }

    ngOnChanges() {
        //console.log("******change fired:");

    }
    loadStackedBar(reloadVal) {

        this.IsdownloadImage = false;
        if (reloadVal == true) {
            this.prgStatus = true;
            setTimeout(() => {
                this.progressMode = "indeterminate";
            }, 1000);
        }

        console.log("--- In Grouped Bars", this.requestType);

        this.dataService.getListItemsByPost('stackedBars/getData', this.requestType).subscribe((listItems) => {
            console.log("--- Grouped Bars data:", listItems);
            listItems = [
                {
                    "TITLE": "Currency Composition",
                    "X_AXIS": "Currency Position(USD)",
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
                {
                    "CCY": "EUR",
                    "MAX_VALUE": "2246.83",
                    "MIN_VALUE": "1000.00",
                    "CURRENT_VALUE": "1500.44"
                },
                {
                    "CCY": "JPY",
                    "MAX_VALUE": "3000.55",
                    "MIN_VALUE": "500.43",
                    "CURRENT_VALUE": "1300.44"
                }
            ];

            this.jsonData = listItems;
            this.barJsonList = listItems;

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
                this.prgStatus = false;
                this.progressMode = "";
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
                this.prgStatus = false;
                this.progressMode = "";
                let element = this.chartContainer.nativeElement;
                let gdiv = d3.select(element)
                    .append("div")
                    .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                    .append("table")
                    .attr("width", this.width)
                    .attr("height", this.height).append("tr").append("td").append("p")
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

    createChart() {
        //   let element = this.chartContainer.nativeElement;
        console.log("*************this.jsonData:", this.jsonData);

        let data = this.jsonData;
        let dataAxis = data[0];
        data = data.slice(1, data.length);   //data.splice(0,1);

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

        let dataColumns = Object.keys(data[0]);
        console.log("--- dataColumns:", dataColumns);

        // excluding the first column          
        let keysArr = dataColumns.slice(1, dataColumns.length);
        console.log("--- keysArr: ", keysArr);

        let min = 0;
        let max = 0;

        for (let jj = 0; jj < data.length; jj++) {

            for (let ii = 0; ii < keysArr.length; ii++) {

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

        let svg = d3.select(this.element).append("center"),
            margin = { top: 10, right: 30, bottom: 20, left: 10 },
            width = this.width - margin.right,
            height = this.height - margin.top - margin.bottom;

        let addlLeftMargin = 50;
        //let addlbottomMargin = 20;
        svg = svg.append("svg").attr("width", this.width + addlLeftMargin + margin.right).attr("height", this.height);

        let y = d3.scaleBand().domain(data.map((d) => { return eval("d." + dataColumns[0]); }))
            .rangeRound([height - margin.bottom, margin.top]).paddingInner(0.1);

        let x = d3.scaleLinear().domain([min, max]).rangeRound([addlLeftMargin, width]);

        if (keysArr.length <= 3) {
            let z = d3.scaleOrdinal().range(["#fcad6b", "rgb(117, 107, 177)", "rgb(49, 163, 84)"]);
        } else {
            let z = d3.scaleOrdinal(d3.schemeCategory20);
        }
        // d3.scaleOrdinal(d3.schemeCategory20);//d3.scaleOrdinal().range(["#98abc5","#7b6888","green"]); rgb(230, 85, 13);rgb(117, 107, 177);rgb(49, 163, 84)

        let series = d3.stack().keys(keysArr).offset(d3.stackOffsetDiverging)(data);

        console.log("series**********: ", series);

        let div = d3.select(this.SBars).append("div").style("position", "fixed").style("z-index", "10").style("opacity", 0);


        function stackMin(series) {
            return d3.min(series, (d) => { return d[1]; });
        }
        function stackMax(series) {
            return d3.max(series, (d) => { return d[1]; });
        }

        let k = -1;
        let padding = 7;
        if (this.maxScreen) {
            padding = 16;
        }
        let barWidth = 15;
        if ((data.length * keysArr.length) > 13) {
            barWidth = y.bandwidth();
        }

        svg.append("g")
            .selectAll("g")
            .data(series)
            .enter().append("g")
            .attr("fill", (d) => { console.log("z", d);  })
            //  .attr("transform", function(d) { return "translate(" + x0(eval("d[0].data." + dataColumns[0])) + ",0)"; })
            .selectAll("rect")
            .data((d) => { return d; })
            .enter().append("rect")
            .attr("y", (d) => {

                console.log("y.bandwidth() :", y.bandwidth());
                console.log("(y.bandwidth() - barWidth )/2 :", (y.bandwidth() - barWidth) / 2);
                if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                    return y(eval("d.data." + dataColumns[0])) + (y.bandwidth() - barWidth - 10) / 2;
                }

                return y(eval("d.data." + dataColumns[0])) + (y.bandwidth() - barWidth) / 2;
            }) //y1.bandwidth()
            .attr("x", (d) => {
                if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                    return x(d[1] - d[0]);
                }
                return x(0);
            })
            .attr("height", (d) => {
                if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                    return (barWidth + 10);
                }
                return barWidth;
            })
            .attr("width", (d) => {
                console.log("dy height* ", d);
                let w = x(d[1]) - x(d[0]);
                if (d.data["CURRENT_VALUE"] == Math.round((d[1] - d[0]) * 100) / 100) {
                    w = 5;
                }
                return w;
            })
            .on("mouseover", () => { tooltip.style("display", null); })
            .on("mouseout", () => { tooltip.style("display", "none"); })
            .on("mousemove", (d) => {
                console.log(d);
                let xPosition = d3.mouse(this)[0] - 5;
                let yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(Math.round((d[1] - d[0]) * 100) / 100);
            });

        //svg.selectAll("rect").attr("fill", function (d, i) { return z(eval("data[i]." + dataColumns[0])); });

        //  let xAxisTransform = height - x(0)+ margin.top;

        let vis = svg.append("g")
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
            let boxWidth = 8;
            let boxHeight = 8;
            let scrnFont = '0.7rem';

            if (this.maxScreen) {
                boxWidth = 12;
                boxHeight = 12;
                scrnFont = '0.8rem';
            }

            let legend = svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                //.attr("text-anchor", "end")
                .selectAll("g")
                .data(keysArr) //.slice().reverse()
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => { return "translate(" + 5 + "," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 3)
                .attr("y", boxHeight)
                .attr("width", boxWidth)
                .attr("height", boxHeight)
                .attr("fill", 'z');

            legend.append("text")
                .attr("class", "mono")
                .attr("x", (width + boxWidth + 1))
                .attr("y", boxHeight + 1)
                .attr("dy", "0.7em")
                .text((d, i) => { return keysArr[i].replace('_', ' '); })
                .style("font-size", scrnFont)
                .style("text-transform", "uppercase");
        }

        // Prep the tooltip bits, initial display is hidden
        let tooltip = svg.append("g")
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
            console.log("-- wrap    ", text, "  -     ", width);
            text.each(() => {
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
    }

}


