import {Component, ViewChild, Input, ElementRef, ViewEncapsulation, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import * as d3 from 'd3';

// declare var __moduleName: string;

@Component({

    selector: 'iLineChart',
    // moduleId: __moduleName,
    templateUrl: 'linechart.component.html',
    styleUrls: ['linechart.component.css'],
    providers: [DataService]
})
export class LineComponent implements OnInit {

    // public __moduleName: string;
    @ViewChild('chart', { static: false }) private chartContainer: ElementRef;
    @Input() requestType: any;
    @Input() width: any;
    @Input() height: any;
    @Input() changeTrigger: any;
    private chart: any;

    constructor(private dataService: DataService) {
        console.log("********linechart called:****************");
    }

    ngOnInit() {

        this.createChart();
    }

    createChart() {//order by date asc (limit the dates/rows... say by 365/1000/365 * 5?)
                   //params... path, w, h, date range or time period,                      
        let data = [
{"date":"24-Apr-07","value":93.24},{"date":"25-Apr-07","value":95.35},{"date":"26-Apr-07","value":98.84},{"date":"27-Apr-07","value":99.92},
{"date":"30-Apr-07","value":99.8},{"date":"1-May-07","value":99.47},{"date":"2-May-07","value":100.39},{"date":"3-May-07","value":100.4},
{"date":"4-May-07","value":100.81},{"date":"7-May-07","value":103.92},{"date":"8-May-07","value":105.06},{"date":"9-May-07","value":106.88},
{"date":"10-May-07","value":107.34},{"date":"11-May-07","value":108.74},{"date":"14-May-07","value":109.36},{"date":"15-May-07","value":107.52},
{"date":"16-May-07","value":107.34},{"date":"17-May-07","value":109.44},{"date":"18-May-07","value":110.02},{"date":"21-May-07","value":111.98},
{"date":"22-May-07","value":113.54},{"date":"23-May-07","value":112.89},{"date":"24-May-07","value":110.69},{"date":"25-May-07","value":113.62},
{"date":"29-May-07","value":114.35},{"date":"30-May-07","value":118.77},{"date":"31-May-07","value":121.19},{"date":"1-Jun-07","value":118.4},
{"date":"4-Jun-07","value":121.33},{"date":"5-Jun-07","value":122.67},{"date":"6-Jun-07","value":123.64},{"date":"7-Jun-07","value":124.07},
{"date":"8-Jun-07","value":124.49},{"date":"11-Jun-07","value":120.19},{"date":"12-Jun-07","value":120.38},{"date":"13-Jun-07","value":117.5},
{"date":"14-Jun-07","value":118.75},{"date":"15-Jun-07","value":120.5},{"date":"18-Jun-07","value":125.09},{"date":"19-Jun-07","value":123.66},
{"date":"20-Jun-07","value":121.55},{"date":"21-Jun-07","value":123.9},{"date":"22-Jun-07","value":123},{"date":"25-Jun-07","value":122.34},
{"date":"26-Jun-07","value":119.65},{"date":"27-Jun-07","value":121.89},{"date":"28-Jun-07","value":120.56},{"date":"29-Jun-07","value":122.04},
{"date":"2-Jul-07","value":121.26},{"date":"3-Jul-07","value":127.17},{"date":"5-Jul-07","value":132.75},{"date":"6-Jul-07","value":132.3},
{"date":"9-Jul-07","value":130.33},{"date":"10-Jul-07","value":132.35},{"date":"11-Jul-07","value":132.39},{"date":"12-Jul-07","value":134.07},
{"date":"13-Jul-07","value":137.73},{"date":"16-Jul-07","value":138.1},{"date":"17-Jul-07","value":138.91},{"date":"18-Jul-07","value":138.12},
{"date":"19-Jul-07","value":140},{"date":"20-Jul-07","value":143.75},{"date":"23-Jul-07","value":143.7},{"date":"24-Jul-07","value":134.89},
{"date":"25-Jul-07","value":137.26},{"date":"26-Jul-07","value":146},{"date":"27-Jul-07","value":143.85},{"date":"30-Jul-07","value":141.43},
{"date":"31-Jul-07","value":131.76},{"date":"1-Aug-07","value":135},{"date":"2-Aug-07","value":136.49},{"date":"3-Aug-07","value":131.85},
{"date":"6-Aug-07","value":135.25},{"date":"7-Aug-07","value":135.03},{"date":"8-Aug-07","value":134.01},{"date":"9-Aug-07","value":126.39},
{"date":"10-Aug-07","value":125},{"date":"13-Aug-07","value":127.79},{"date":"14-Aug-07","value":124.03},{"date":"15-Aug-07","value":119.9},
{"date":"16-Aug-07","value":117.05},{"date":"17-Aug-07","value":122.06},{"date":"20-Aug-07","value":122.22},{"date":"21-Aug-07","value":127.57},
{"date":"22-Aug-07","value":132.51},{"date":"23-Aug-07","value":131.07},{"date":"24-Aug-07","value":135.3},{"date":"27-Aug-07","value":132.25},
{"date":"28-Aug-07","value":126.82},{"date":"29-Aug-07","value":134.08},{"date":"30-Aug-07","value":136.25},{"date":"31-Aug-07","value":138.48},
{"date":"4-Sep-07","value":144.16},{"date":"5-Sep-07","value":136.76},{"date":"6-Sep-07","value":135.01},{"date":"7-Sep-07","value":131.77},
{"date":"10-Sep-07","value":136.71},{"date":"11-Sep-07","value":135.49},{"date":"12-Sep-07","value":136.85},{"date":"13-Sep-07","value":137.2},
{"date":"14-Sep-07","value":138.81},{"date":"17-Sep-07","value":138.41},{"date":"18-Sep-07","value":140.92},{"date":"19-Sep-07","value":140.77},
{"date":"20-Sep-07","value":140.31},{"date":"21-Sep-07","value":144.15},{"date":"24-Sep-07","value":148.28},{"date":"25-Sep-07","value":153.18},
{"date":"26-Sep-07","value":152.77},{"date":"27-Sep-07","value":154.5},{"date":"28-Sep-07","value":153.47},{"date":"1-Oct-07","value":156.34},
{"date":"2-Oct-07","value":158.45},{"date":"3-Oct-07","value":157.92},{"date":"4-Oct-07","value":156.24},{"date":"5-Oct-07","value":161.45},
{"date":"8-Oct-07","value":167.91},{"date":"9-Oct-07","value":167.86},{"date":"10-Oct-07","value":166.79},{"date":"11-Oct-07","value":162.23},
{"date":"12-Oct-07","value":167.25},{"date":"15-Oct-07","value":166.98},{"date":"16-Oct-07","value":169.58},{"date":"17-Oct-07","value":172.75},
{"date":"18-Oct-07","value":173.5},{"date":"19-Oct-07","value":170.42},{"date":"22-Oct-07","value":174.36},{"date":"23-Oct-07","value":186.16},
{"date":"24-Oct-07","value":185.93},{"date":"25-Oct-07","value":182.78},{"date":"26-Oct-07","value":184.7},{"date":"29-Oct-07","value":185.09},
{"date":"30-Oct-07","value":187},{"date":"31-Oct-07","value":189.95},{"date":"1-Nov-07","value":187.44},{"date":"2-Nov-07","value":187.87},
{"date":"5-Nov-07","value":186.18},{"date":"6-Nov-07","value":191.79},{"date":"7-Nov-07","value":186.3},{"date":"8-Nov-07","value":175.47},
{"date":"9-Nov-07","value":165.37},{"date":"12-Nov-07","value":153.76},{"date":"13-Nov-07","value":169.96},{"date":"14-Nov-07","value":166.11},
{"date":"15-Nov-07","value":164.3},{"date":"16-Nov-07","value":166.39},{"date":"19-Nov-07","value":163.95},{"date":"20-Nov-07","value":168.85},
{"date":"21-Nov-07","value":168.46},{"date":"23-Nov-07","value":171.54},{"date":"26-Nov-07","value":172.54},{"date":"27-Nov-07","value":174.81},
{"date":"28-Nov-07","value":180.22},{"date":"29-Nov-07","value":184.29},{"date":"30-Nov-07","value":182.22},{"date":"3-Dec-07","value":178.86},
{"date":"4-Dec-07","value":179.81},{"date":"5-Dec-07","value":185.5},{"date":"6-Dec-07","value":189.95},{"date":"7-Dec-07","value":194.3},
{"date":"10-Dec-07","value":194.21},{"date":"11-Dec-07","value":188.54},{"date":"12-Dec-07","value":190.86},{"date":"13-Dec-07","value":191.83},
{"date":"14-Dec-07","value":190.39},{"date":"17-Dec-07","value":184.4},{"date":"18-Dec-07","value":182.98},{"date":"19-Dec-07","value":183.12},
{"date":"20-Dec-07","value":187.21},{"date":"21-Dec-07","value":193.91},{"date":"24-Dec-07","value":198.8},{"date":"26-Dec-07","value":198.95},
{"date":"27-Dec-07","value":198.57},{"date":"28-Dec-07","value":199.83},{"date":"31-Dec-07","value":198.08},{"date":"2-Jan-08","value":194.84},
{"date":"3-Jan-08","value":194.93},{"date":"4-Jan-08","value":180.05},{"date":"7-Jan-08","value":177.64},{"date":"8-Jan-08","value":171.25},
{"date":"9-Jan-08","value":179.4},{"date":"10-Jan-08","value":178.02},{"date":"11-Jan-08","value":172.69},{"date":"14-Jan-08","value":178.78},
{"date":"15-Jan-08","value":169.04},{"date":"16-Jan-08","value":159.64},{"date":"17-Jan-08","value":160.89},{"date":"18-Jan-08","value":161.36},
{"date":"22-Jan-08","value":155.64},{"date":"23-Jan-08","value":139.07},{"date":"24-Jan-08","value":135.6},{"date":"25-Jan-08","value":130.01},
{"date":"28-Jan-08","value":130.01},{"date":"29-Jan-08","value":131.54},{"date":"30-Jan-08","value":132.18},{"date":"31-Jan-08","value":135.36},
{"date":"1-Feb-08","value":133.75},{"date":"4-Feb-08","value":131.65},{"date":"5-Feb-08","value":129.36},{"date":"6-Feb-08","value":122},
{"date":"7-Feb-08","value":121.24},{"date":"8-Feb-08","value":125.48},{"date":"11-Feb-08","value":129.45},{"date":"12-Feb-08","value":124.86},
{"date":"13-Feb-08","value":129.4},{"date":"14-Feb-08","value":127.46},{"date":"15-Feb-08","value":124.63},{"date":"19-Feb-08","value":122.18},
{"date":"20-Feb-08","value":123.82},{"date":"21-Feb-08","value":121.54},{"date":"22-Feb-08","value":119.46},{"date":"25-Feb-08","value":119.74},
{"date":"26-Feb-08","value":119.15},{"date":"27-Feb-08","value":122.96},{"date":"28-Feb-08","value":129.91},{"date":"29-Feb-08","value":125.02},
{"date":"3-Mar-08","value":121.73},{"date":"4-Mar-08","value":124.62},{"date":"5-Mar-08","value":124.49},{"date":"6-Mar-08","value":120.93},
{"date":"7-Mar-08","value":122.25},{"date":"10-Mar-08","value":119.69},{"date":"11-Mar-08","value":127.35},{"date":"12-Mar-08","value":126.03},
{"date":"13-Mar-08","value":127.94},{"date":"14-Mar-08","value":126.61},{"date":"17-Mar-08","value":126.73},{"date":"18-Mar-08","value":132.82},
{"date":"19-Mar-08","value":129.67},{"date":"20-Mar-08","value":133.27},{"date":"24-Mar-08","value":139.53},{"date":"25-Mar-08","value":140.98},
{"date":"26-Mar-08","value":145.06},{"date":"27-Mar-08","value":140.25},{"date":"28-Mar-08","value":143.01},{"date":"31-Mar-08","value":143.5},
{"date":"1-Apr-08","value":149.53},{"date":"2-Apr-08","value":147.49},{"date":"3-Apr-08","value":151.61},{"date":"4-Apr-08","value":153.08},
{"date":"7-Apr-08","value":155.89},{"date":"8-Apr-08","value":152.84},{"date":"9-Apr-08","value":151.44},{"date":"10-Apr-08","value":154.55},
{"date":"11-Apr-08","value":147.14},{"date":"14-Apr-08","value":147.78},{"date":"15-Apr-08","value":148.38},{"date":"16-Apr-08","value":153.7},
{"date":"17-Apr-08","value":154.49},{"date":"18-Apr-08","value":161.04},{"date":"21-Apr-08","value":168.16},{"date":"22-Apr-08","value":160.2},
{"date":"23-Apr-08","value":162.89},{"date":"24-Apr-08","value":168.94},{"date":"25-Apr-08","value":169.73},{"date":"28-Apr-08","value":172.24},
{"date":"29-Apr-08","value":175.05},{"date":"30-Apr-08","value":173.95},{"date":"1-May-08","value":180},{"date":"2-May-08","value":180.94},
{"date":"5-May-08","value":184.73},{"date":"6-May-08","value":186.66},{"date":"7-May-08","value":182.59},{"date":"8-May-08","value":185.06},
{"date":"9-May-08","value":183.45},{"date":"12-May-08","value":188.16},{"date":"13-May-08","value":189.96},{"date":"14-May-08","value":186.26},
{"date":"15-May-08","value":189.73},{"date":"16-May-08","value":187.62},{"date":"19-May-08","value":183.6},{"date":"20-May-08","value":185.9},
{"date":"21-May-08","value":178.19},{"date":"22-May-08","value":177.05},{"date":"23-May-08","value":181.17},{"date":"27-May-08","value":186.43},
{"date":"28-May-08","value":187.01},{"date":"29-May-08","value":186.69},{"date":"30-May-08","value":188.75},{"date":"2-Jun-08","value":186.1},
{"date":"3-Jun-08","value":185.37},{"date":"4-Jun-08","value":185.19},{"date":"5-Jun-08","value":189.43},{"date":"6-Jun-08","value":185.64},
{"date":"9-Jun-08","value":181.61},{"date":"10-Jun-08","value":185.64},{"date":"11-Jun-08","value":180.81},{"date":"12-Jun-08","value":173.26},
{"date":"13-Jun-08","value":172.37},{"date":"16-Jun-08","value":176.84},{"date":"17-Jun-08","value":181.43},{"date":"18-Jun-08","value":178.75},
{"date":"19-Jun-08","value":180.9},{"date":"20-Jun-08","value":175.27},{"date":"23-Jun-08","value":173.16},{"date":"24-Jun-08","value":173.25},
{"date":"25-Jun-08","value":177.39},{"date":"26-Jun-08","value":168.26},{"date":"27-Jun-08","value":170.09},{"date":"30-Jun-08","value":167.44},
{"date":"1-Jul-08","value":174.68},{"date":"2-Jul-08","value":168.18},{"date":"3-Jul-08","value":170.12},{"date":"7-Jul-08","value":175.16},
{"date":"8-Jul-08","value":179.55},{"date":"9-Jul-08","value":174.25},{"date":"10-Jul-08","value":176.63},{"date":"11-Jul-08","value":172.58},
{"date":"14-Jul-08","value":173.88},{"date":"15-Jul-08","value":169.64},{"date":"16-Jul-08","value":172.81},{"date":"17-Jul-08","value":171.81},
{"date":"18-Jul-08","value":165.15},{"date":"21-Jul-08","value":166.29},{"date":"22-Jul-08","value":162.02},{"date":"23-Jul-08","value":166.26},
{"date":"24-Jul-08","value":159.03},{"date":"25-Jul-08","value":162.12},{"date":"28-Jul-08","value":154.4},{"date":"29-Jul-08","value":157.08},
{"date":"30-Jul-08","value":159.88},{"date":"31-Jul-08","value":158.95},{"date":"1-Aug-08","value":156.66},{"date":"4-Aug-08","value":153.23},
{"date":"5-Aug-08","value":160.64},{"date":"6-Aug-08","value":164.19},{"date":"7-Aug-08","value":163.57},{"date":"8-Aug-08","value":169.55},
{"date":"11-Aug-08","value":173.56},{"date":"12-Aug-08","value":176.73},{"date":"13-Aug-08","value":179.3},{"date":"14-Aug-08","value":179.32},
{"date":"15-Aug-08","value":175.74},{"date":"18-Aug-08","value":175.39},{"date":"19-Aug-08","value":173.53},{"date":"20-Aug-08","value":175.84},
{"date":"21-Aug-08","value":174.29},{"date":"22-Aug-08","value":176.79},{"date":"25-Aug-08","value":172.55},{"date":"26-Aug-08","value":173.64},
{"date":"27-Aug-08","value":174.67},{"date":"28-Aug-08","value":173.74},{"date":"29-Aug-08","value":169.53},{"date":"2-Sep-08","value":166.19},
{"date":"3-Sep-08","value":166.96},{"date":"4-Sep-08","value":161.22},{"date":"5-Sep-08","value":160.18},{"date":"8-Sep-08","value":157.92},
{"date":"9-Sep-08","value":151.68},{"date":"10-Sep-08","value":151.61},{"date":"11-Sep-08","value":152.65},{"date":"12-Sep-08","value":148.94},
{"date":"15-Sep-08","value":140.36},{"date":"16-Sep-08","value":139.88},{"date":"17-Sep-08","value":127.83},{"date":"18-Sep-08","value":134.09},
{"date":"19-Sep-08","value":140.91},{"date":"22-Sep-08","value":131.05},{"date":"23-Sep-08","value":126.84},{"date":"24-Sep-08","value":128.71},
{"date":"25-Sep-08","value":131.93},{"date":"26-Sep-08","value":128.24},{"date":"29-Sep-08","value":105.26},{"date":"30-Sep-08","value":113.66},
{"date":"1-Oct-08","value":109.12},{"date":"2-Oct-08","value":100.1},{"date":"3-Oct-08","value":97.07},{"date":"6-Oct-08","value":98.14},
{"date":"7-Oct-08","value":89.16},{"date":"8-Oct-08","value":89.79},{"date":"9-Oct-08","value":88.74},{"date":"10-Oct-08","value":96.8},
{"date":"13-Oct-08","value":110.26},{"date":"14-Oct-08","value":104.08},{"date":"15-Oct-08","value":97.95},{"date":"16-Oct-08","value":101.89},
{"date":"17-Oct-08","value":97.4},{"date":"20-Oct-08","value":98.44},{"date":"21-Oct-08","value":91.49},{"date":"22-Oct-08","value":96.87},
{"date":"23-Oct-08","value":98.23},{"date":"24-Oct-08","value":96.38},{"date":"27-Oct-08","value":92.09},{"date":"28-Oct-08","value":99.91},
{"date":"29-Oct-08","value":104.55},{"date":"30-Oct-08","value":111.04},{"date":"31-Oct-08","value":107.59},{"date":"3-Nov-08","value":106.96},
{"date":"4-Nov-08","value":110.99},{"date":"5-Nov-08","value":103.3},{"date":"6-Nov-08","value":99.1},{"date":"7-Nov-08","value":98.24},
{"date":"10-Nov-08","value":95.88},{"date":"11-Nov-08","value":94.77},{"date":"12-Nov-08","value":90.12},{"date":"13-Nov-08","value":96.44},
{"date":"14-Nov-08","value":90.24},{"date":"17-Nov-08","value":88.14},{"date":"18-Nov-08","value":89.91},{"date":"19-Nov-08","value":86.29},
{"date":"20-Nov-08","value":80.49},{"date":"21-Nov-08","value":82.58},{"date":"24-Nov-08","value":92.95},{"date":"25-Nov-08","value":90.8},
{"date":"26-Nov-08","value":95},{"date":"27-Nov-08","value":95},{"date":"28-Nov-08","value":92.67},{"date":"1-Dec-08","value":88.93},
{"date":"2-Dec-08","value":92.47},{"date":"3-Dec-08","value":95.9},{"date":"4-Dec-08","value":91.41},{"date":"5-Dec-08","value":94},
{"date":"8-Dec-08","value":99.72},{"date":"9-Dec-08","value":100.06},{"date":"10-Dec-08","value":98.21},{"date":"11-Dec-08","value":95},
{"date":"12-Dec-08","value":98.27},{"date":"15-Dec-08","value":94.75},{"date":"16-Dec-08","value":95.43},{"date":"17-Dec-08","value":89.16},
{"date":"18-Dec-08","value":89.43},{"date":"19-Dec-08","value":90},{"date":"22-Dec-08","value":85.74},{"date":"23-Dec-08","value":86.38},
{"date":"24-Dec-08","value":85.04},{"date":"25-Dec-08","value":85.04},{"date":"26-Dec-08","value":85.81},{"date":"29-Dec-08","value":86.61},
{"date":"30-Dec-08","value":86.29},{"date":"31-Dec-08","value":85.35},{"date":"1-Jan-09","value":85.35},{"date":"2-Jan-09","value":90.75},
{"date":"5-Jan-09","value":94.58},{"date":"6-Jan-09","value":93.02},{"date":"7-Jan-09","value":91.01},{"date":"8-Jan-09","value":92.7},
{"date":"9-Jan-09","value":90.58},{"date":"12-Jan-09","value":88.66},{"date":"13-Jan-09","value":87.71},{"date":"14-Jan-09","value":85.33},
{"date":"15-Jan-09","value":83.38},{"date":"16-Jan-09","value":82.33},{"date":"20-Jan-09","value":78.2},{"date":"21-Jan-09","value":82.83},
{"date":"22-Jan-09","value":88.36},{"date":"23-Jan-09","value":88.36},{"date":"26-Jan-09","value":89.64},{"date":"27-Jan-09","value":90.73},
{"date":"28-Jan-09","value":94.2},{"date":"29-Jan-09","value":93},{"date":"30-Jan-09","value":90.13},{"date":"2-Feb-09","value":91.51},
{"date":"3-Feb-09","value":92.98},{"date":"4-Feb-09","value":93.55},{"date":"5-Feb-09","value":96.46},{"date":"6-Feb-09","value":99.72},
{"date":"9-Feb-09","value":102.51},{"date":"10-Feb-09","value":97.83},{"date":"11-Feb-09","value":96.82},{"date":"12-Feb-09","value":99.27},
{"date":"13-Feb-09","value":99.16},{"date":"17-Feb-09","value":94.53},{"date":"18-Feb-09","value":94.37},{"date":"19-Feb-09","value":90.64},
{"date":"20-Feb-09","value":91.2},{"date":"23-Feb-09","value":86.95},{"date":"24-Feb-09","value":90.25},{"date":"25-Feb-09","value":91.16},
{"date":"26-Feb-09","value":89.19},{"date":"27-Feb-09","value":89.31},{"date":"2-Mar-09","value":87.94},{"date":"3-Mar-09","value":88.37},
{"date":"4-Mar-09","value":91.17},{"date":"5-Mar-09","value":88.84},{"date":"6-Mar-09","value":85.3},{"date":"9-Mar-09","value":83.11},
{"date":"10-Mar-09","value":88.63},{"date":"11-Mar-09","value":92.68},{"date":"12-Mar-09","value":96.35},{"date":"13-Mar-09","value":95.93},
{"date":"16-Mar-09","value":95.42},{"date":"17-Mar-09","value":99.66},{"date":"18-Mar-09","value":101.52},{"date":"19-Mar-09","value":101.62},
{"date":"20-Mar-09","value":101.59},{"date":"23-Mar-09","value":107.66},{"date":"24-Mar-09","value":106.5},{"date":"25-Mar-09","value":106.49},
{"date":"26-Mar-09","value":109.87},{"date":"27-Mar-09","value":106.85},{"date":"30-Mar-09","value":104.49},{"date":"31-Mar-09","value":105.12},
{"date":"1-Apr-09","value":108.69},{"date":"2-Apr-09","value":112.71},{"date":"3-Apr-09","value":115.99},{"date":"6-Apr-09","value":118.45},
{"date":"7-Apr-09","value":115},{"date":"8-Apr-09","value":116.32},{"date":"9-Apr-09","value":119.57},{"date":"10-Apr-09","value":119.57},
{"date":"13-Apr-09","value":120.22},{"date":"14-Apr-09","value":118.31},{"date":"15-Apr-09","value":117.64},{"date":"16-Apr-09","value":121.45},
{"date":"17-Apr-09","value":123.42},{"date":"20-Apr-09","value":120.5},{"date":"21-Apr-09","value":121.76},{"date":"22-Apr-09","value":121.51},
{"date":"23-Apr-09","value":125.4},{"date":"24-Apr-09","value":123.9},{"date":"27-Apr-09","value":124.73},{"date":"28-Apr-09","value":123.9},
{"date":"29-Apr-09","value":125.14},{"date":"30-Apr-09","value":125.83},{"date":"1-May-09","value":127.24},{"date":"4-May-09","value":132.07},
{"date":"5-May-09","value":132.71},{"date":"6-May-09","value":132.5},{"date":"7-May-09","value":129.06},{"date":"8-May-09","value":129.19},
{"date":"11-May-09","value":129.57},{"date":"12-May-09","value":124.42},{"date":"13-May-09","value":119.49},{"date":"14-May-09","value":122.95},
{"date":"15-May-09","value":122.42},{"date":"18-May-09","value":126.65},{"date":"19-May-09","value":127.45},{"date":"20-May-09","value":125.87},
{"date":"21-May-09","value":124.18},{"date":"22-May-09","value":122.5},{"date":"26-May-09","value":130.78},{"date":"27-May-09","value":133.05},
{"date":"28-May-09","value":135.07},{"date":"29-May-09","value":135.81},{"date":"1-Jun-09","value":139.35},{"date":"2-Jun-09","value":139.49},
{"date":"3-Jun-09","value":140.95},{"date":"4-Jun-09","value":143.74},{"date":"5-Jun-09","value":144.67},{"date":"8-Jun-09","value":143.85},
{"date":"9-Jun-09","value":142.72},{"date":"10-Jun-09","value":140.25},{"date":"11-Jun-09","value":139.95},{"date":"12-Jun-09","value":136.97},
{"date":"15-Jun-09","value":136.09},{"date":"16-Jun-09","value":136.35},{"date":"17-Jun-09","value":135.58},{"date":"18-Jun-09","value":135.88},
{"date":"19-Jun-09","value":139.48},{"date":"22-Jun-09","value":137.37},{"date":"23-Jun-09","value":134.01},{"date":"24-Jun-09","value":136.22},
{"date":"25-Jun-09","value":139.86},{"date":"26-Jun-09","value":142.44},{"date":"29-Jun-09","value":141.97},{"date":"30-Jun-09","value":142.43},
{"date":"1-Jul-09","value":142.83},{"date":"2-Jul-09","value":140.02},{"date":"3-Jul-09","value":140.02},{"date":"6-Jul-09","value":138.61},
{"date":"7-Jul-09","value":135.4},{"date":"8-Jul-09","value":137.22},{"date":"9-Jul-09","value":136.36},{"date":"10-Jul-09","value":138.52},
{"date":"13-Jul-09","value":142.34},{"date":"14-Jul-09","value":142.27},{"date":"15-Jul-09","value":146.88},{"date":"16-Jul-09","value":147.52},
{"date":"17-Jul-09","value":151.75},{"date":"20-Jul-09","value":152.91},{"date":"21-Jul-09","value":151.51},{"date":"22-Jul-09","value":156.74},
{"date":"23-Jul-09","value":157.82},{"date":"24-Jul-09","value":159.99},{"date":"27-Jul-09","value":160.1},{"date":"28-Jul-09","value":160},
{"date":"29-Jul-09","value":160.03},{"date":"30-Jul-09","value":162.79},{"date":"31-Jul-09","value":163.39},{"date":"3-Aug-09","value":166.43},
{"date":"4-Aug-09","value":165.55},{"date":"5-Aug-09","value":165.11},{"date":"6-Aug-09","value":163.91},{"date":"7-Aug-09","value":165.51},
{"date":"10-Aug-09","value":164.72},{"date":"12-Aug-09","value":165.31},{"date":"13-Aug-09","value":168.42},{"date":"14-Aug-09","value":166.78},
{"date":"17-Aug-09","value":159.59},{"date":"18-Aug-09","value":164},{"date":"19-Aug-09","value":164.6},{"date":"20-Aug-09","value":166.33},
{"date":"21-Aug-09","value":169.22},{"date":"24-Aug-09","value":169.06},{"date":"25-Aug-09","value":169.4},{"date":"26-Aug-09","value":167.41},
{"date":"27-Aug-09","value":169.45},{"date":"28-Aug-09","value":170.05},{"date":"31-Aug-09","value":168.21},{"date":"1-Sep-09","value":165.3},
{"date":"2-Sep-09","value":165.18},{"date":"3-Sep-09","value":166.55},{"date":"4-Sep-09","value":170.31},{"date":"8-Sep-09","value":172.93},
{"date":"9-Sep-09","value":171.14},{"date":"10-Sep-09","value":172.56},{"date":"11-Sep-09","value":172.16},{"date":"14-Sep-09","value":173.72},
{"date":"15-Sep-09","value":175.16},{"date":"16-Sep-09","value":181.87},{"date":"17-Sep-09","value":184.55},{"date":"18-Sep-09","value":185.02},
{"date":"21-Sep-09","value":184.02},{"date":"22-Sep-09","value":184.48},{"date":"23-Sep-09","value":185.5},{"date":"24-Sep-09","value":183.82},
{"date":"25-Sep-09","value":182.37},{"date":"28-Sep-09","value":186.15},{"date":"29-Sep-09","value":185.38},{"date":"30-Sep-09","value":185.35},
{"date":"1-Oct-09","value":180.86},{"date":"2-Oct-09","value":184.9},{"date":"5-Oct-09","value":186.02},{"date":"6-Oct-09","value":190.01},
{"date":"7-Oct-09","value":190.25},{"date":"8-Oct-09","value":189.27},{"date":"9-Oct-09","value":190.47},{"date":"12-Oct-09","value":190.81},
{"date":"13-Oct-09","value":190.02},{"date":"14-Oct-09","value":191.29},{"date":"15-Oct-09","value":190.56},{"date":"16-Oct-09","value":188.05},
{"date":"19-Oct-09","value":189.86},{"date":"20-Oct-09","value":198.76},{"date":"21-Oct-09","value":204.92},{"date":"22-Oct-09","value":205.2},
{"date":"23-Oct-09","value":203.94},{"date":"26-Oct-09","value":202.48},{"date":"27-Oct-09","value":197.37},{"date":"28-Oct-09","value":192.4},
{"date":"29-Oct-09","value":196.35},{"date":"30-Oct-09","value":188.5},{"date":"2-Nov-09","value":189.31},{"date":"3-Nov-09","value":188.75},
{"date":"4-Nov-09","value":190.81},{"date":"5-Nov-09","value":194.03},{"date":"6-Nov-09","value":194.34},{"date":"9-Nov-09","value":201.46},
{"date":"10-Nov-09","value":202.98},{"date":"11-Nov-09","value":203.25},{"date":"12-Nov-09","value":201.99},{"date":"13-Nov-09","value":204.45},
{"date":"16-Nov-09","value":206.63},{"date":"17-Nov-09","value":207},{"date":"18-Nov-09","value":205.96},{"date":"19-Nov-09","value":200.51},
{"date":"20-Nov-09","value":199.92},{"date":"23-Nov-09","value":205.88},{"date":"24-Nov-09","value":204.44},{"date":"25-Nov-09","value":204.19},
{"date":"26-Nov-09","value":204.19},{"date":"27-Nov-09","value":200.59},{"date":"30-Nov-09","value":199.91},{"date":"1-Dec-09","value":196.97},
{"date":"2-Dec-09","value":196.23},{"date":"3-Dec-09","value":196.48},{"date":"4-Dec-09","value":193.32},{"date":"7-Dec-09","value":188.95},
{"date":"8-Dec-09","value":189.87},{"date":"9-Dec-09","value":197.8},{"date":"10-Dec-09","value":196.43},{"date":"11-Dec-09","value":194.67},
{"date":"14-Dec-09","value":196.98},{"date":"15-Dec-09","value":194.17},{"date":"16-Dec-09","value":195.03},{"date":"17-Dec-09","value":191.86},
{"date":"18-Dec-09","value":195.43},{"date":"21-Dec-09","value":198.23},{"date":"22-Dec-09","value":200.36},{"date":"23-Dec-09","value":202.1},
{"date":"24-Dec-09","value":209.04},{"date":"25-Dec-09","value":209.04},{"date":"28-Dec-09","value":211.61},{"date":"29-Dec-09","value":209.1},
{"date":"30-Dec-09","value":211.64},{"date":"31-Dec-09","value":210.73},{"date":"1-Jan-10","value":210.73},{"date":"4-Jan-10","value":214.01},
{"date":"5-Jan-10","value":214.38},{"date":"6-Jan-10","value":210.97},{"date":"7-Jan-10","value":210.58},{"date":"8-Jan-10","value":211.98},
{"date":"11-Jan-10","value":210.11},{"date":"12-Jan-10","value":207.72},{"date":"13-Jan-10","value":210.65},{"date":"14-Jan-10","value":209.43},
{"date":"15-Jan-10","value":205.93},{"date":"18-Jan-10","value":205.93},{"date":"19-Jan-10","value":215.04},{"date":"20-Jan-10","value":211.72},
{"date":"21-Jan-10","value":208.07},{"date":"22-Jan-10","value":197.75},{"date":"25-Jan-10","value":203.08},{"date":"26-Jan-10","value":205.94},
{"date":"27-Jan-10","value":207.88},{"date":"28-Jan-10","value":199.29},{"date":"29-Jan-10","value":192.06},{"date":"1-Feb-10","value":194.73},
{"date":"2-Feb-10","value":195.86},{"date":"3-Feb-10","value":199.23},{"date":"4-Feb-10","value":192.05},{"date":"5-Feb-10","value":195.46},
{"date":"8-Feb-10","value":194.12},{"date":"9-Feb-10","value":196.19},{"date":"10-Feb-10","value":195.12},{"date":"11-Feb-10","value":198.67},
{"date":"12-Feb-10","value":200.38},{"date":"15-Feb-10","value":200.38},{"date":"16-Feb-10","value":203.4},{"date":"17-Feb-10","value":202.55},
{"date":"18-Feb-10","value":202.93},{"date":"19-Feb-10","value":201.67},{"date":"22-Feb-10","value":200.42},{"date":"23-Feb-10","value":197.06},
{"date":"24-Feb-10","value":200.66},{"date":"25-Feb-10","value":202},{"date":"26-Feb-10","value":204.62},{"date":"1-Mar-10","value":208.99},
{"date":"2-Mar-10","value":208.85},{"date":"3-Mar-10","value":209.33},{"date":"4-Mar-10","value":210.71},{"date":"5-Mar-10","value":218.95},
{"date":"8-Mar-10","value":219.08},{"date":"9-Mar-10","value":223.02},{"date":"10-Mar-10","value":224.84},{"date":"11-Mar-10","value":225.5},
{"date":"12-Mar-10","value":226.6},{"date":"15-Mar-10","value":223.84},{"date":"16-Mar-10","value":224.45},{"date":"17-Mar-10","value":224.12},
{"date":"18-Mar-10","value":224.65},{"date":"19-Mar-10","value":222.25},{"date":"22-Mar-10","value":224.75},{"date":"23-Mar-10","value":228.36},
{"date":"24-Mar-10","value":229.37},{"date":"25-Mar-10","value":226.65},{"date":"26-Mar-10","value":230.9},{"date":"29-Mar-10","value":232.39},
{"date":"30-Mar-10","value":235.84},{"date":"31-Mar-10","value":235},{"date":"1-Apr-10","value":235.97},{"date":"2-Apr-10","value":235.97},
{"date":"5-Apr-10","value":238.49},{"date":"6-Apr-10","value":239.54},{"date":"7-Apr-10","value":240.6},{"date":"8-Apr-10","value":239.95},
{"date":"9-Apr-10","value":241.79},{"date":"12-Apr-10","value":242.29},{"date":"13-Apr-10","value":242.43},{"date":"14-Apr-10","value":245.69},
{"date":"15-Apr-10","value":248.92},{"date":"16-Apr-10","value":247.4},{"date":"19-Apr-10","value":247.07},{"date":"20-Apr-10","value":244.59},
{"date":"21-Apr-10","value":259.22},{"date":"22-Apr-10","value":266.47},{"date":"23-Apr-10","value":270.83},{"date":"26-Apr-10","value":269.5},
{"date":"27-Apr-10","value":262.04},{"date":"28-Apr-10","value":261.6},{"date":"29-Apr-10","value":268.64},{"date":"30-Apr-10","value":261.09},
{"date":"3-May-10","value":266.35},{"date":"4-May-10","value":258.68},{"date":"5-May-10","value":255.98},{"date":"6-May-10","value":246.25},
{"date":"7-May-10","value":235.86},{"date":"10-May-10","value":253.99},{"date":"11-May-10","value":256.52},{"date":"12-May-10","value":262.09},
{"date":"13-May-10","value":258.36},{"date":"14-May-10","value":253.82},{"date":"17-May-10","value":254.22},{"date":"18-May-10","value":252.36},
{"date":"19-May-10","value":248.34},{"date":"20-May-10","value":237.76},{"date":"21-May-10","value":242.32},{"date":"24-May-10","value":246.76},
{"date":"25-May-10","value":245.22},{"date":"26-May-10","value":244.11},{"date":"27-May-10","value":253.35},{"date":"28-May-10","value":256.88},
{"date":"31-May-10","value":256.88},{"date":"1-Jun-10","value":260.83},{"date":"2-Jun-10","value":263.95},{"date":"3-Jun-10","value":263.12},
{"date":"4-Jun-10","value":255.96},{"date":"7-Jun-10","value":250.94},{"date":"8-Jun-10","value":249.33},{"date":"9-Jun-10","value":243.2},
{"date":"10-Jun-10","value":250.51},{"date":"11-Jun-10","value":253.51},{"date":"14-Jun-10","value":254.28},{"date":"15-Jun-10","value":259.69},
{"date":"16-Jun-10","value":267.25},{"date":"17-Jun-10","value":271.87},{"date":"18-Jun-10","value":274.07},{"date":"21-Jun-10","value":270.17},
{"date":"22-Jun-10","value":273.85},{"date":"23-Jun-10","value":270.97},{"date":"24-Jun-10","value":269},{"date":"25-Jun-10","value":266.7},
{"date":"28-Jun-10","value":268.3},{"date":"29-Jun-10","value":256.17},{"date":"30-Jun-10","value":251.53},{"date":"1-Jul-10","value":248.48},
{"date":"2-Jul-10","value":246.94},{"date":"5-Jul-10","value":246.94},{"date":"6-Jul-10","value":248.63},{"date":"7-Jul-10","value":258.66},
{"date":"8-Jul-10","value":258.09},{"date":"9-Jul-10","value":259.62},{"date":"12-Jul-10","value":257.28},{"date":"13-Jul-10","value":251.8},
{"date":"14-Jul-10","value":252.73},{"date":"15-Jul-10","value":251.45},{"date":"16-Jul-10","value":249.9},{"date":"19-Jul-10","value":245.58},
{"date":"20-Jul-10","value":251.89},{"date":"21-Jul-10","value":254.24},{"date":"22-Jul-10","value":259.02},{"date":"23-Jul-10","value":259.94},
{"date":"26-Jul-10","value":259.28},{"date":"27-Jul-10","value":264.08},{"date":"28-Jul-10","value":260.96},{"date":"29-Jul-10","value":258.11},
{"date":"30-Jul-10","value":257.25},{"date":"2-Aug-10","value":261.85},{"date":"3-Aug-10","value":261.93},{"date":"4-Aug-10","value":262.98},
{"date":"5-Aug-10","value":261.7},{"date":"6-Aug-10","value":260.09},{"date":"9-Aug-10","value":261.75},{"date":"10-Aug-10","value":259.41},
{"date":"11-Aug-10","value":250.19},{"date":"12-Aug-10","value":251.79},{"date":"13-Aug-10","value":249.1},{"date":"16-Aug-10","value":247.64},
{"date":"17-Aug-10","value":251.97},{"date":"18-Aug-10","value":253.07},{"date":"19-Aug-10","value":249.88},{"date":"20-Aug-10","value":249.64},
{"date":"23-Aug-10","value":245.8},{"date":"24-Aug-10","value":239.93},{"date":"25-Aug-10","value":242.89},{"date":"26-Aug-10","value":240.28},
{"date":"27-Aug-10","value":241.62},{"date":"30-Aug-10","value":242.5},{"date":"31-Aug-10","value":243.1},{"date":"1-Sep-10","value":250.33},
{"date":"2-Sep-10","value":252.17},{"date":"3-Sep-10","value":258.77},{"date":"6-Sep-10","value":258.77},{"date":"7-Sep-10","value":257.81},
{"date":"8-Sep-10","value":262.92},{"date":"9-Sep-10","value":263.07},{"date":"10-Sep-10","value":263.41},{"date":"13-Sep-10","value":267.04},
{"date":"14-Sep-10","value":268.06},{"date":"15-Sep-10","value":270.22},{"date":"16-Sep-10","value":276.57},{"date":"17-Sep-10","value":275.37},
{"date":"20-Sep-10","value":283.23},{"date":"21-Sep-10","value":283.77},{"date":"22-Sep-10","value":287.75},{"date":"23-Sep-10","value":288.92},
{"date":"24-Sep-10","value":292.32},{"date":"27-Sep-10","value":291.16},{"date":"28-Sep-10","value":286.86},{"date":"29-Sep-10","value":287.37},
{"date":"30-Sep-10","value":283.75},{"date":"1-Oct-10","value":282.52},{"date":"4-Oct-10","value":278.64},{"date":"5-Oct-10","value":288.94},
{"date":"6-Oct-10","value":289.19},{"date":"7-Oct-10","value":289.22},{"date":"8-Oct-10","value":294.07},{"date":"11-Oct-10","value":295.36},
{"date":"12-Oct-10","value":298.54},{"date":"13-Oct-10","value":300.14},{"date":"14-Oct-10","value":302.31},{"date":"15-Oct-10","value":314.74},
{"date":"18-Oct-10","value":318},{"date":"19-Oct-10","value":309.49},{"date":"20-Oct-10","value":310.53},{"date":"21-Oct-10","value":309.52},
{"date":"22-Oct-10","value":307.47},{"date":"25-Oct-10","value":308.84},{"date":"26-Oct-10","value":308.05},{"date":"27-Oct-10","value":307.83},
{"date":"28-Oct-10","value":305.24},{"date":"29-Oct-10","value":300.98},{"date":"1-Nov-10","value":304.18},{"date":"2-Nov-10","value":309.36},
{"date":"3-Nov-10","value":312.8},{"date":"4-Nov-10","value":318.27},{"date":"5-Nov-10","value":317.13},{"date":"8-Nov-10","value":318.62},
{"date":"9-Nov-10","value":316.08},{"date":"10-Nov-10","value":318.03},{"date":"11-Nov-10","value":316.66},{"date":"12-Nov-10","value":308.03},
{"date":"15-Nov-10","value":307.04},{"date":"16-Nov-10","value":301.59},{"date":"17-Nov-10","value":300.5},{"date":"18-Nov-10","value":308.43},
{"date":"19-Nov-10","value":306.73},{"date":"22-Nov-10","value":313.36},{"date":"23-Nov-10","value":308.73},{"date":"24-Nov-10","value":314.8},
{"date":"26-Nov-10","value":315},{"date":"29-Nov-10","value":316.87},{"date":"30-Nov-10","value":311.15},{"date":"1-Dec-10","value":316.4},
{"date":"2-Dec-10","value":318.15},{"date":"3-Dec-10","value":317.44},{"date":"6-Dec-10","value":320.15},{"date":"7-Dec-10","value":318.21},
{"date":"8-Dec-10","value":321.01},{"date":"9-Dec-10","value":319.76},{"date":"10-Dec-10","value":320.56},{"date":"13-Dec-10","value":321.67},
{"date":"14-Dec-10","value":320.29},{"date":"15-Dec-10","value":320.36},{"date":"16-Dec-10","value":321.25},{"date":"17-Dec-10","value":320.61},
{"date":"20-Dec-10","value":322.21},{"date":"21-Dec-10","value":324.2},{"date":"22-Dec-10","value":325.16},{"date":"23-Dec-10","value":323.6},
{"date":"27-Dec-10","value":324.68},{"date":"28-Dec-10","value":325.47},{"date":"29-Dec-10","value":325.29},{"date":"30-Dec-10","value":323.66},
{"date":"31-Dec-10","value":322.56},{"date":"3-Jan-11","value":329.57},{"date":"4-Jan-11","value":331.29},{"date":"5-Jan-11","value":334},
{"date":"6-Jan-11","value":333.73},{"date":"7-Jan-11","value":336.12},{"date":"10-Jan-11","value":342.46},{"date":"11-Jan-11","value":341.64},
{"date":"12-Jan-11","value":344.42},{"date":"13-Jan-11","value":345.68},{"date":"14-Jan-11","value":348.48},{"date":"18-Jan-11","value":340.65},
{"date":"19-Jan-11","value":338.84},{"date":"20-Jan-11","value":332.68},{"date":"21-Jan-11","value":326.72},{"date":"24-Jan-11","value":337.45},
{"date":"25-Jan-11","value":341.4},{"date":"26-Jan-11","value":343.85},{"date":"27-Jan-11","value":343.21},{"date":"28-Jan-11","value":336.1},
{"date":"31-Jan-11","value":339.32},{"date":"1-Feb-11","value":345.03},{"date":"2-Feb-11","value":344.32},{"date":"3-Feb-11","value":343.44},
{"date":"4-Feb-11","value":346.5},{"date":"7-Feb-11","value":351.88},{"date":"8-Feb-11","value":355.2},{"date":"9-Feb-11","value":358.16},
{"date":"10-Feb-11","value":354.54},{"date":"11-Feb-11","value":356.85},{"date":"14-Feb-11","value":359.18},{"date":"15-Feb-11","value":359.9},
{"date":"16-Feb-11","value":363.13},{"date":"17-Feb-11","value":358.3},{"date":"18-Feb-11","value":350.56},{"date":"22-Feb-11","value":338.61},
{"date":"23-Feb-11","value":342.62},{"date":"24-Feb-11","value":342.88},{"date":"25-Feb-11","value":348.16},{"date":"28-Feb-11","value":353.21},
{"date":"1-Mar-11","value":349.31},{"date":"2-Mar-11","value":352.12},{"date":"3-Mar-11","value":359.56},{"date":"4-Mar-11","value":360},
{"date":"7-Mar-11","value":355.36},{"date":"8-Mar-11","value":355.76},{"date":"9-Mar-11","value":352.47},{"date":"10-Mar-11","value":346.67},
{"date":"11-Mar-11","value":351.99},{"date":"14-Mar-11","value":353.56},{"date":"15-Mar-11","value":345.43},{"date":"16-Mar-11","value":330.01},
{"date":"17-Mar-11","value":334.64},{"date":"18-Mar-11","value":330.67},{"date":"21-Mar-11","value":339.3},{"date":"22-Mar-11","value":341.2},
{"date":"23-Mar-11","value":339.19},{"date":"24-Mar-11","value":344.97},{"date":"25-Mar-11","value":351.54},{"date":"28-Mar-11","value":350.44},
{"date":"29-Mar-11","value":350.96},{"date":"30-Mar-11","value":348.63},{"date":"31-Mar-11","value":348.51},{"date":"1-Apr-11","value":344.56},
{"date":"4-Apr-11","value":341.19},{"date":"5-Apr-11","value":338.89},{"date":"6-Apr-11","value":338.04},{"date":"7-Apr-11","value":338.08},
{"date":"8-Apr-11","value":335.06},{"date":"11-Apr-11","value":330.8},{"date":"12-Apr-11","value":332.4},{"date":"13-Apr-11","value":336.13},
{"date":"14-Apr-11","value":332.42},{"date":"15-Apr-11","value":327.46},{"date":"18-Apr-11","value":331.85},{"date":"19-Apr-11","value":337.86},
{"date":"20-Apr-11","value":342.41},{"date":"21-Apr-11","value":350.7},{"date":"25-Apr-11","value":353.01},{"date":"26-Apr-11","value":350.42},
{"date":"27-Apr-11","value":350.15},{"date":"28-Apr-11","value":346.75},{"date":"29-Apr-11","value":350.13},{"date":"2-May-11","value":346.28},
{"date":"3-May-11","value":348.2},{"date":"4-May-11","value":349.57},{"date":"5-May-11","value":346.75},{"date":"6-May-11","value":346.66},
{"date":"9-May-11","value":347.6},{"date":"10-May-11","value":349.45},{"date":"11-May-11","value":347.23},{"date":"12-May-11","value":346.57},
{"date":"13-May-11","value":340.5},{"date":"16-May-11","value":333.3},{"date":"17-May-11","value":336.14},{"date":"18-May-11","value":339.87},
{"date":"19-May-11","value":340.53},{"date":"20-May-11","value":335.22},{"date":"23-May-11","value":334.4},{"date":"24-May-11","value":332.19},
{"date":"25-May-11","value":336.78},{"date":"26-May-11","value":335},{"date":"27-May-11","value":337.41},{"date":"31-May-11","value":347.83},
{"date":"1-Jun-11","value":345.51},{"date":"2-Jun-11","value":346.1},{"date":"3-Jun-11","value":343.44},{"date":"6-Jun-11","value":338.04},
{"date":"7-Jun-11","value":332.04},{"date":"8-Jun-11","value":332.24},{"date":"9-Jun-11","value":331.49},{"date":"10-Jun-11","value":325.9},
{"date":"13-Jun-11","value":326.6},{"date":"14-Jun-11","value":332.44},{"date":"15-Jun-11","value":326.75},{"date":"16-Jun-11","value":325.16},
{"date":"17-Jun-11","value":320.26},{"date":"20-Jun-11","value":315.32},{"date":"21-Jun-11","value":325.3},{"date":"22-Jun-11","value":322.61},
{"date":"23-Jun-11","value":331.23},{"date":"24-Jun-11","value":326.35},{"date":"27-Jun-11","value":332.04},{"date":"28-Jun-11","value":335.26},
{"date":"29-Jun-11","value":334.04},{"date":"30-Jun-11","value":335.67},{"date":"1-Jul-11","value":343.26},{"date":"5-Jul-11","value":349.43},
{"date":"6-Jul-11","value":351.76},{"date":"7-Jul-11","value":357.2},{"date":"8-Jul-11","value":359.71},{"date":"11-Jul-11","value":354},
{"date":"12-Jul-11","value":353.75},{"date":"13-Jul-11","value":358.02},{"date":"14-Jul-11","value":357.77},{"date":"15-Jul-11","value":364.92},
{"date":"18-Jul-11","value":373.8},{"date":"19-Jul-11","value":376.85},{"date":"20-Jul-11","value":386.9},{"date":"21-Jul-11","value":387.29},
{"date":"22-Jul-11","value":393.3},{"date":"25-Jul-11","value":398.5},{"date":"26-Jul-11","value":403.41},{"date":"27-Jul-11","value":392.59},
{"date":"28-Jul-11","value":391.82},{"date":"29-Jul-11","value":390.48},{"date":"1-Aug-11","value":396.75},{"date":"2-Aug-11","value":388.91},
{"date":"3-Aug-11","value":392.57},{"date":"4-Aug-11","value":377.37},{"date":"5-Aug-11","value":373.62},{"date":"8-Aug-11","value":353.21},
{"date":"9-Aug-11","value":374.01},{"date":"10-Aug-11","value":363.69},{"date":"11-Aug-11","value":373.7},{"date":"12-Aug-11","value":376.99},
{"date":"15-Aug-11","value":383.41},{"date":"16-Aug-11","value":380.48},{"date":"17-Aug-11","value":380.44},{"date":"18-Aug-11","value":366.05},
{"date":"19-Aug-11","value":356.03},{"date":"22-Aug-11","value":356.44},{"date":"23-Aug-11","value":373.6},{"date":"24-Aug-11","value":376.18},
{"date":"25-Aug-11","value":373.72},{"date":"26-Aug-11","value":383.58},{"date":"29-Aug-11","value":389.97},{"date":"30-Aug-11","value":389.99},
{"date":"31-Aug-11","value":384.83},{"date":"1-Sep-11","value":381.03},{"date":"2-Sep-11","value":374.05},{"date":"6-Sep-11","value":379.74},
{"date":"7-Sep-11","value":383.93},{"date":"8-Sep-11","value":384.14},{"date":"9-Sep-11","value":377.48},{"date":"12-Sep-11","value":379.94},
{"date":"13-Sep-11","value":384.62},{"date":"14-Sep-11","value":389.3},{"date":"15-Sep-11","value":392.96},{"date":"16-Sep-11","value":400.5},
{"date":"19-Sep-11","value":411.63},{"date":"20-Sep-11","value":413.45},{"date":"21-Sep-11","value":412.14},{"date":"22-Sep-11","value":401.82},
{"date":"23-Sep-11","value":404.3},{"date":"26-Sep-11","value":403.17},{"date":"27-Sep-11","value":399.26},{"date":"28-Sep-11","value":397.01},
{"date":"29-Sep-11","value":390.57},{"date":"30-Sep-11","value":381.32},{"date":"3-Oct-11","value":374.6},{"date":"4-Oct-11","value":372.5},
{"date":"5-Oct-11","value":378.25},{"date":"6-Oct-11","value":377.37},{"date":"7-Oct-11","value":369.8},{"date":"10-Oct-11","value":388.81},
{"date":"11-Oct-11","value":400.29},{"date":"12-Oct-11","value":402.19},{"date":"13-Oct-11","value":408.43},{"date":"14-Oct-11","value":422},
{"date":"17-Oct-11","value":419.99},{"date":"18-Oct-11","value":422.24},{"date":"19-Oct-11","value":398.62},{"date":"20-Oct-11","value":395.31},
{"date":"21-Oct-11","value":392.87},{"date":"24-Oct-11","value":405.77},{"date":"25-Oct-11","value":397.77},{"date":"26-Oct-11","value":400.6},
{"date":"27-Oct-11","value":404.69},{"date":"28-Oct-11","value":404.95},{"date":"31-Oct-11","value":404.78},{"date":"1-Nov-11","value":396.51},
{"date":"2-Nov-11","value":397.41},{"date":"3-Nov-11","value":403.07},{"date":"4-Nov-11","value":400.24},{"date":"7-Nov-11","value":399.73},
{"date":"8-Nov-11","value":406.23},{"date":"9-Nov-11","value":395.28},{"date":"10-Nov-11","value":385.22},{"date":"11-Nov-11","value":384.62},
{"date":"14-Nov-11","value":379.26},{"date":"15-Nov-11","value":388.83},{"date":"16-Nov-11","value":384.77},{"date":"17-Nov-11","value":377.41},
{"date":"18-Nov-11","value":374.94},{"date":"21-Nov-11","value":369.01},{"date":"22-Nov-11","value":376.51},{"date":"23-Nov-11","value":366.99},
{"date":"25-Nov-11","value":363.57},{"date":"28-Nov-11","value":376.12},{"date":"29-Nov-11","value":373.2},{"date":"30-Nov-11","value":382.2},
{"date":"1-Dec-11","value":387.93},{"date":"2-Dec-11","value":389.7},{"date":"5-Dec-11","value":393.01},{"date":"6-Dec-11","value":390.95},
{"date":"7-Dec-11","value":389.09},{"date":"8-Dec-11","value":390.66},{"date":"9-Dec-11","value":393.62},{"date":"12-Dec-11","value":391.84},
{"date":"13-Dec-11","value":388.81},{"date":"14-Dec-11","value":380.19},{"date":"15-Dec-11","value":378.94},{"date":"16-Dec-11","value":381.02},
{"date":"19-Dec-11","value":382.21},{"date":"20-Dec-11","value":395.95},{"date":"21-Dec-11","value":396.44},{"date":"22-Dec-11","value":398.55},
{"date":"23-Dec-11","value":403.43},{"date":"27-Dec-11","value":406.53},{"date":"28-Dec-11","value":402.64},{"date":"29-Dec-11","value":405.12},
{"date":"30-Dec-11","value":405},{"date":"3-Jan-12","value":411.23},{"date":"4-Jan-12","value":413.44},{"date":"5-Jan-12","value":418.03},
{"date":"6-Jan-12","value":422.4},{"date":"9-Jan-12","value":421.73},{"date":"10-Jan-12","value":423.24},{"date":"11-Jan-12","value":422.55},
{"date":"12-Jan-12","value":421.39},{"date":"13-Jan-12","value":419.81},{"date":"17-Jan-12","value":424.7},{"date":"18-Jan-12","value":429.11},
{"date":"19-Jan-12","value":427.75},{"date":"20-Jan-12","value":420.3},{"date":"23-Jan-12","value":427.41},{"date":"24-Jan-12","value":420.41},
{"date":"25-Jan-12","value":446.66},{"date":"26-Jan-12","value":444.63},{"date":"27-Jan-12","value":447.28},{"date":"30-Jan-12","value":453.01},
{"date":"31-Jan-12","value":456.48},{"date":"1-Feb-12","value":456.19},{"date":"2-Feb-12","value":455.12},{"date":"3-Feb-12","value":459.68},
{"date":"6-Feb-12","value":463.97},{"date":"7-Feb-12","value":468.83},{"date":"8-Feb-12","value":476.68},{"date":"9-Feb-12","value":493.17},
{"date":"10-Feb-12","value":493.42},{"date":"13-Feb-12","value":502.6},{"date":"14-Feb-12","value":509.46},{"date":"15-Feb-12","value":497.67},
{"date":"16-Feb-12","value":502.21},{"date":"17-Feb-12","value":502.12},{"date":"21-Feb-12","value":514.85},{"date":"22-Feb-12","value":513.04},
{"date":"23-Feb-12","value":516.39},{"date":"24-Feb-12","value":522.41},{"date":"27-Feb-12","value":525.76},{"date":"28-Feb-12","value":535.41},
{"date":"29-Feb-12","value":542.44},{"date":"1-Mar-12","value":544.47},{"date":"2-Mar-12","value":545.18},{"date":"5-Mar-12","value":533.16},
{"date":"6-Mar-12","value":530.26},{"date":"7-Mar-12","value":530.69},{"date":"8-Mar-12","value":541.99},{"date":"9-Mar-12","value":545.17},
{"date":"12-Mar-12","value":552},{"date":"13-Mar-12","value":568.1},{"date":"14-Mar-12","value":589.58},{"date":"15-Mar-12","value":585.56},
{"date":"16-Mar-12","value":585.57},{"date":"19-Mar-12","value":601.1},{"date":"20-Mar-12","value":605.96},{"date":"21-Mar-12","value":602.5},
{"date":"22-Mar-12","value":599.34},{"date":"23-Mar-12","value":596.05},{"date":"26-Mar-12","value":606.98},{"date":"27-Mar-12","value":614.48},
{"date":"28-Mar-12","value":617.62},{"date":"29-Mar-12","value":609.86},{"date":"30-Mar-12","value":599.55},{"date":"2-Apr-12","value":618.63},
{"date":"3-Apr-12","value":629.32},{"date":"4-Apr-12","value":624.31},{"date":"5-Apr-12","value":633.68},{"date":"9-Apr-12","value":636.23},
{"date":"10-Apr-12","value":628.44},{"date":"11-Apr-12","value":626.2},{"date":"12-Apr-12","value":622.77},{"date":"13-Apr-12","value":605.23},
{"date":"16-Apr-12","value":580.13},{"date":"17-Apr-12","value":609.7},{"date":"18-Apr-12","value":608.34},{"date":"19-Apr-12","value":587.44},
{"date":"20-Apr-12","value":572.98},{"date":"23-Apr-12","value":571.7},{"date":"24-Apr-12","value":560.28},{"date":"25-Apr-12","value":610},
{"date":"26-Apr-12","value":607.7},{"date":"27-Apr-12","value":603},{"date":"30-Apr-12","value":583.98},{"date":"1-May-12","value":582.13}
];

        console.log("**********data line:", data);


        let element = this.chartContainer.nativeElement;
        console.log("*************element:", element);
        
        let margin = { top: 50, right: 50, bottom: 50, left: 50 };
        let width = this.width - margin.left - margin.right;
        let height = this.height- margin.top - margin.bottom;

        let svg = d3.select(element)
                  .attr("width",width)
                  .attr("height",height);
       
        let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let parseTime = d3.timeParse("%d-%b-%y");

        let x = d3.scaleTime()
            .rangeRound([0, width]);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value); });

        /* d3.tsv("app/widgets/linechart/data.tsv", function(d) {
             console.log("***********d:",d);
             d.date = parseTime(d.date);
             d.value = +d.value;
             return d;
         }, function(error, data) {
             if (error) throw error;*/
        
        for(let i=0;i<data.length;i++) {          
            data[i].date = parseTime(data[i].date);
            data[i].value = +data[i].value;           
        }

            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain(d3.extent(data, function(d) { return d.value; }));

            g.append("g")//.attr('class', 'axis axis-x')
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .append("text")
                .attr("x", width + 25)
                .attr("y", 20)
                .attr("dx", "0.71em")
                .attr("fill", "#000")
                .attr("text-anchor", "end")
                .text("YEAR")
                .select(".domain")
                .remove();

            g.append("g")//.attr('class', 'axis axis-y')
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("x", 25)
                .attr("y", -20)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("USD");

            g.append("path")
                .datum(data)
                .attr("fill", "none") //red to make area chart
                .attr("stroke", "#709fdc") //#709fdc, lime, steelblue
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.2)
                .attr("d", line);
            // });

        }
    }


