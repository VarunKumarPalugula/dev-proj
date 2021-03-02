import {Component, ViewChild, Input, ElementRef, ViewEncapsulation} from '@angular/core';
import {DataService} from '../../services/data.service';
import * as d3 from 'd3';

@Component({

    selector: 'iRadialProgress',
    // moduleId: __moduleName,
    templateUrl: 'radialprogress.component.html',
    providers: [DataService],
    styleUrls: ['radialprogress.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class RadialComponent {

    // public __moduleName: string;
    public div1: any;
    public div2: any;
    public div3: any;
    @ViewChild('main', { static: false }) private main_Container: ElementRef;
    @ViewChild('div1', { static: false }) private div1_Container: ElementRef;
    @ViewChild('div2', { static: false }) private div2_Container: ElementRef;
    @ViewChild('div3', { static: false }) private div3_Container: ElementRef;
    @Input() requestType: any;
    @Input() maxScreen: boolean = false;
    @Input() width: any;
    @Input() height: any;  
    //@Input() helpScreen: any=0; 
    public dataREST: any; 

    constructor(private dataService: DataService) {
        console.log("****Radial Progress Called:");
    }
    ngOnInit() {
        console.log("--- In Radial Progress", this.requestType);
	this.dataService.getListItemsByPost('radialProgress/getData', this.requestType).subscribe((listItems: any[]) => {
	console.log("--- Radial Progress data:", listItems);
	this.dataREST = listItems;
		    
         //console.log("div1",this.div1);
         //console.log("div2",this.div2);
         //console.log("div3",this.div3);
        
        if (typeof this.div1 != "object" && typeof this.div2 != "object" && typeof this.div3 != "object") {
            this.div1 = this.div1_Container.nativeElement;
            this.div2 = this.div2_Container.nativeElement;
            this.div3 = this.div3_Container.nativeElement;
        }
        else {
            //    let child = this.element.childNodes;
            //  let len = child.length;
            this.div1.removeChild(this.div1.lastChild);
            this.div2.removeChild(this.div2.lastChild);
            this.div3.removeChild(this.div3.lastChild);
        }
        this.createChart();
      }); //end REST call
    }

    createChart() {
        let mainDiv = this.main_Container.nativeElement;
                
        let pWidth = this.width;
        let pHeight = this.height;
	
	let div1=this.div1;
        let div2=this.div2;
        let div3=this.div3;	
        
        //mainDiv.div.attr('style', 'width: '+this.width + '; height: '+this.height);
        /*mainDiv.append('div').style({        
        'width' : this.width+'px',        
        'height' : this.height+'px',
        'position' : 'absolute',
        'padding' : '25px',
        'border' : '1px solid red'
        });*/
        
	/*
        let data =        
        [
          [{
            "functionParam": "STP",
            "value": "96"
          }],
                
          [{
            "functionParam": "Pending BO Approval",
            "value": "70"
          }],
          
          [{
            "functionParam": "FX",
            "value": "90"
           },
           {
            "functionParam": "FIS",
            "value": "80"
           },
           {
            "functionParam": "MM",
            "value": "70"
           }]         
         
        ]; */  
        
            //this.dataREST = []; 
            
            //Check data size...
            if (this.dataREST.length == 0) {
                //alert("No Data"); 
                //let element = this.main_Container.nativeElement;
                let gdiv = d3.select(this.div1)
                            .append("div")                           
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
            else if (this.dataREST.length == 1 && this.dataREST[0].status == "Fail") {                
                let gdiv = d3.select(this.div1)
                            .append("div")                           
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
            }			
	    
       let dataColumnNames:any;
       //console.log("--- dataColumnNames:", dataColumnNames);	             
        
        this.dataREST.forEach(function(d, i){
           console.log("--- i:", i);
           console.log("--- d.length:", d.length);
           console.log("--- d:", d);
           if (d.length == 1) {
              let dataNode = d[0];
	      dataColumnNames = Object.keys(dataNode);
	      console.log("--- dataColumnNames:", dataColumnNames);
              console.log("--- dataNode:", dataNode); 
              //console.log("--- pWidth:", pWidth); 
              //console.log("--- pHeight:", pHeight);
                
              //Render the divs 
            //   let rp = radialProgress(eval("div" + (i+1)), d, pWidth, pHeight)
            //     .label(eval("dataNode." + dataColumnNames[0]).replace("_"," "))
                /*.onClick(function() {
                    // deselect();
                    div1.attr("class", "radial");
                    div2.attr("class", "radial");
                    div3.attr("class", "radial");
                    div1.attr("class", "selectedRadial");
                })*/ //onClick1
                // .diameter(pHeight - 35) //175
                // .value(eval("dataNode." + dataColumnNames[1]))
                // .render();
                              
           } else if (d.length > 1) { 
                let dataNode = d[0];
	      	dataColumnNames = Object.keys(dataNode);
		console.log("--- dataColumnNames:", dataColumnNames);
                // let rp = radialProgress(eval("div" + (i+1)), d, pWidth, pHeight)
                // .label(dataColumnNames[1].replace("_"," "))
                /*.onClick(function() {
                    //deselect();
                    div1.attr("class", "radial");
                    div2.attr("class", "radial");
                    div3.attr("class", "radial");
                    div2.attr("class", "selectedRadial");
                })*/ //onClick2
                // .diameter(pHeight - 35) //175
                // .value(d.length * 100)
                // .render();               
 
           }
        });    

    }
    /*  helpOut(){ 
        this.helpScreen =0;
        console.log("***helpscreen radial:",this.helpScreen);
    }*/
}