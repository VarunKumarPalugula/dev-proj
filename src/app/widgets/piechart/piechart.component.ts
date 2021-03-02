import {Component, ViewChild, Input, ElementRef, ViewEncapsulation, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import * as d3 from 'd3v4';

// declare var __moduleName: string;

@Component({

    selector: 'iPieChart',
    // moduleId: __moduleName,
    templateUrl: 'piechart.component.html',
    styleUrls: ['piechart.component.css'],
    providers: [DataService]
})
export class PiechartComponent implements OnInit {

    // public __moduleName: string;
    public element:any;
	public pie:any;
    @ViewChild('chart', { static: false }) private chartContainer: ElementRef;
	@ViewChild('PieChart', { static: false }) private PieChart: ElementRef;
    @Input() requestType: any;
    @Input() width: any;
    @Input() height: any;
    @Input() changeTrigger: any;
  //  @Input() helpScreen: any=0;
    private chart: any;
    public dataREST: any;

    constructor(private dataService: DataService) {
        console.log("********piechart called:****************");
    }

    ngOnInit() {
        console.log("--- In Pie Chart", this.requestType);
	this.dataService.getListItemsByPost('pieChart/getData', this.requestType).subscribe((listItems: any[]) => {
		console.log("--- Pie Chart data:", listItems);
		this.dataREST = listItems;
		        
	        if (typeof this.element != "object") {
	            this.element = this.chartContainer.nativeElement;
				 this.pie = this.PieChart.nativeElement;
	        }
	        else {
	             console.log("else:");
	            this.element.removeChild(this.element.lastChild);
				this.pie.removeChild(this.pie.lastChild);
	        }
	        this.createChart();
	}); //end ngInit
    }

    createChart() { 
 
	let data = []; // An new empty array
	for (let i = 0, len = this.dataREST.length; i < len; i++) {
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
        
        let dataColumns = Object.keys(data[0]);
        console.log("--- dataColumns:", dataColumns);
  
        let element = this.chartContainer.nativeElement;
        //console.log("*************element:", element);

        let width = this.width;
        let height = this.height;
        let radius = Math.min(width, height) / 2;

        let gDiv = d3.select(this.element);
		
        let div=d3.select(this.pie).append("div")
					.style("position", "fixed")
					  .style("z-index", "10")
					  .style("opacity", 0);		
        //data = [];             
        //Check data size...
        if (data.length == 0 || (data.length == 1 && data[0].status == "Fail")) {
            //alert("No Data"); 
            //let element = this.chartContainer.nativeElement;
            gDiv.append("div")                           
                        .attr("style", "width: " + this.width + "px; height: "+this.height+ "px;")                            
                        .append("table")
                        .attr("width", this.width)
                        .attr("height", this.height).append("tr").append("td").append("p")                            
                        .text("No data available to load the graph")
                        .style("color", "#fff")
                        .style("font-size", 13)
                        .style("text-transform", "uppercase")
                        .style("text-align", "center")
                        .attr("x", this.width/2)
                        .attr("y", this.height/2);                
            return;
        } 
	/*else if (data.length == 1 && data[0].status == "Fail") {
            gDiv.append("div")                           
                        .attr("style", "width: " + this.width + "px; height: "+this.height+ "px;")                            
                        .append("table")
                        .attr("width", this.width)
                        .attr("height", this.height).append("tr").append("td").append("p")                            
                        .text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
                        .style("color", "#fff")
                        .style("font-size", 13)
                        .style("text-transform", "uppercase")
                        .style("text-align", "center")
                        .attr("x", this.width/2)
                        .attr("y", this.height/2);                
            return;		
		}*/
        
        let svg = gDiv.append("svg").attr('class', 'animated zoomIn')
            .attr("width", width)
            .attr("height", height);
            //.attr("style", "margin-top: 10px;");

        let formatNumber = d3.format(",d");
        let g = svg.append("g").attr("transform", "translate(" + (100+width / 2) + "," + height / 2 + ")");

        let color = d3.scaleOrdinal(d3.schemeCategory20c); //d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        let pie = d3.pie()
            .sort(null)
            .value(function(d) { return eval("d." + dataColumns[1]); });

        let path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let label = d3.arc()
            .outerRadius(radius - 40)//100)
            .innerRadius(radius - 40);//0);
        //console.log("***********label:", label);

        /* d3.tsv("app/shared/piechart/data.tsv", function(d) {
             console.log("*************d:", d);
             d.pie_value = +d.pie_value;
             return d;
         }, function(error, data) {
             if (error) throw error;*/
        let totalSum=0;
        for (let i = 0; i < data.length; i++) {
            let valStr = eval("data[i]." + dataColumns[1]);
            totalSum += parseFloat(valStr);
        }
        totalSum = Math.round(totalSum * 100)/100;
        console.log("**********totalSum:", totalSum);
        
        let arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            //.attr("stroke", "#fff")
            .attr("fill", function(d) { return color(eval("d.data." + dataColumns[0])); })//d.data.pie_name); })
			.on('mouseover',function(d) {
				 console.log("In Mouseover:d",d);
				 let mouseCoords = d3.mouse(this.parentNode);
				 	console.log("***parentNode:",this.parentNode);
                        console.log("mouseCoords:",mouseCoords);
						 let xCo = mouseCoords[0];
						let yCo = mouseCoords[1];
						div.transition()		
							.duration(200)		
							.style("opacity", .9)
							
							div.html(
								 "<span style='color:white;background: black; padding: 2px; text-align: center;width: 60px;height: 28px;border-radius: 8px;border: 0px;'>" 
								 +  eval("d.data." + dataColumns[0]) + " - "+ formatNumber(eval("d.data." + dataColumns[1])) + "</span>"
							)
													
			})
			.on('mousemove',function(event){
							   
					div.style("top", (event.pageY-10)+"px")
					.style("left", (event.pageX+10)+"px");
			})
			.on('mouseout',function(d) {
				 console.log("In Mouseout:");
						div.transition()		
							.duration(500)		
							.style("opacity", 0);
			})
           /* .append("title").text(function(d) { return eval("d.data." + dataColumns[0]) + " - "+ formatNumber(eval("d.data." + dataColumns[1])); });*/

        arc.append("text")
            .style("fill", "#fff")
            .attr("transform", function(d) {return "translate(" + label.centroid(d) + ")";})
            .attr("dy", "0.35em")
            .style("font-size", 9)
            .text(function(d) { let percent = parseFloat(eval("d.data." + dataColumns[1])) / totalSum; let perValue= Math.round((percent * 10000) / 100); if(perValue>0) {return  perValue + "%";} else {return "";} });

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
        let legend = svg.selectAll(".legend")
            //.data(partition.nodes(root))
            .data(pie(data))
            .enter().append("g")
            .attr("class", "legend"); 
        
        let legendElementheight = 14;

        legend.append("rect")
            .attr("x", function(d, i) { return 5; })
            .attr("y", function(d, i) { return (legendElementheight * i) + 18; })
            .attr("width", 14)
            .attr("height", 12)
            .style("fill", function(d, i) { return color(eval("d.data." + dataColumns[0])); });
        
        legend.append("text")
            .attr("class", "mono")
            //.text(function(d) { return eval("d.data." + dataColumns[0]) + " - USD " + formatNumber(eval("d.data." + dataColumns[1])); })
	    .text(function(d) { return eval("d.data." + dataColumns[0]); })
            .attr("fill", "#000")
            .style("font-size", 11)
            .style("text-transform", "uppercase")                 
            .attr("x", function(d, i) { return 25; })
            .attr("y", function(d, i) { return (legendElementheight * i) + 27; });                   
 
        //});
        
       //console.log("Heading:",this.heading);        
        //if (typeof(this.heading) != "undefined") {
            //let headingdiv = document.getElementById('pie_heading');
            //headingdiv.innerHTML = '<b>'+ pHeading + '</b>'; 
            //headingdiv.innerHTML = '<b>Asset Position</b>';
        //}                

    }
   /*   helpOut(){
        this.helpScreen =0;
        console.log("***helpscreen piechart:",this.helpScreen);
    }*/
}


