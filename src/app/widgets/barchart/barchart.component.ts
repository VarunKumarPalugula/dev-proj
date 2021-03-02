import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

// declare var __moduleName: string;

@Component({
    selector: "iBarChart",
    // moduleId: __moduleName,
    templateUrl: "barchart.component.html",
    styleUrls: ['barchart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {

    // public __moduleName: string;
    @ViewChild('chart', { static: false }) private chartContainer: ElementRef;
    @Input() requestType: any;
    @Input() width: any;
    @Input() height: any;
    @Input() private data: Array<any>;
    private margin: any = { top: 10, bottom: 50, left: 50, right: 10 };
    private chart: any;
    //private width: number;
    //private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    constructor() {
        console.log("********** Bar chart constructor called");
    }

    ngOnInit() {
        // give everything a chance to get loaded before starting the animation to reduce choppiness
        //setTimeout(() => {
        //this.generateData();

        this.data = [{ "Jan": 100 }, { "Feb": 120 }, { "Mar": 130 }, { "Apr": 140 }, { "May": 150 },
        { "June": 180 }, { "July": 200 }, { "Aug": 300 }, { "Sep": 400 }, { "Oct": 500 },
        { "Nov": 600 }, { "Dec": 700 }
        ];

        this.createChart();
        if (this.data) {
            console.log("************if data");
            this.updateChart();
        }
        //setInterval(() => this.generateData(), 10);
        //}, 10);
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    generateData() {
        this.data = [];
        for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
            this.data.push([
                `Index ${i}`,
                Math.floor(Math.random() * 100)
            ]);
        }
        console.log("*********** aa data:", this.data);
    }

    createChart() {

        console.log("***********bar** create chart");

        let element = this.chartContainer.nativeElement;
        //this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.width = this.width;
        //this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.height = this.height;

        let svg = d3.select(element).append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right + 5)
            .attr('height', this.height + this.margin.bottom + 5);

        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
        console.log("************svg1:", this.chart);

        // define X & Y domains
        let xDomain = this.data.map(d => d[0]);
        let yDomain = [0, d3.max(this.data, d => d[1])];
        console.log("*********x:", xDomain);
        console.log("*****y:", yDomain);
        // create scales
        this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
        console.log("************x scale:", this.xScale);
        console.log("**********y scale:", this.yScale);
        // bar colors
        this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));
        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
        console.log("***********svg:", svg);
    }

    updateChart() {
        // update scales & axis
        this.xScale.domain(this.data.map(d => d[0]));
        this.yScale.domain([0, d3.max(this.data, d => d[1])]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));

        let update = this.chart.selectAll('.bar')
            .data(this.data);

        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart.selectAll('.bar').transition()
            .attr('x', d => this.xScale(d[0]))
            .attr('y', d => this.yScale(d[1]))
            .attr('width', d => this.xScale.bandwidth())
            .attr('height', d => this.height - this.yScale(d[1]))
            .style('fill', (d, i) => this.colors(i));

        // add new bars

        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => this.xScale(d[0]))
            .attr('y', d => this.yScale(0))
            .attr('width', this.xScale.bandwidth() - 20)
            .attr('height', 0)
            .style('fill', (d, i) => this.colors(i))
            .transition()
            .delay((d, i) => i * 10)
            .attr('y', d => this.yScale(d[1]))
            .attr('height', d => this.height - this.yScale(d[1]));

    }
}
