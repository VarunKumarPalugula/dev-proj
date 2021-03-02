System.register(["@angular/core", "app/services/data.service", "d3"], function (exports_1, context_1) {
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
    var core_1, data_service_1, d3, RadialComponent;
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
            RadialComponent = (function () {
                function RadialComponent(dataService) {
                    this.dataService = dataService;
                    this.maxScreen = false;
                    console.log("****Radial Progress Called:");
                }
                RadialComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log("--- In Radial Progress", this.requestType);
                    this.dataService.getListItemsByPost('radialProgress/getData', this.requestType).subscribe(function (listItems) {
                        console.log("--- Radial Progress data:", listItems);
                        _this.dataREST = listItems;
                        //console.log("div1",this.div1);
                        //console.log("div2",this.div2);
                        //console.log("div3",this.div3);
                        if (typeof _this.div1 != "object" && typeof _this.div2 != "object" && typeof _this.div3 != "object") {
                            _this.div1 = _this.div1_Container.nativeElement;
                            _this.div2 = _this.div2_Container.nativeElement;
                            _this.div3 = _this.div3_Container.nativeElement;
                        }
                        else {
                            //    let child = this.element.childNodes;
                            //  let len = child.length;
                            _this.div1.removeChild(_this.div1.lastChild);
                            _this.div2.removeChild(_this.div2.lastChild);
                            _this.div3.removeChild(_this.div3.lastChild);
                        }
                        _this.createChart();
                    }); //end REST call
                };
                RadialComponent.prototype.createChart = function () {
                    var mainDiv = this.main_Container.nativeElement;
                    var pWidth = this.width;
                    var pHeight = this.height;
                    var div1 = this.div1;
                    var div2 = this.div2;
                    var div3 = this.div3;
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
                        var gdiv = d3.select(this.div1)
                            .append("div")
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
                    else if (this.dataREST.length == 1 && this.dataREST[0].status == "Fail") {
                        var gdiv = d3.select(this.div1)
                            .append("div")
                            .attr("style", "width: " + this.width + "px; height: " + this.height + "px;")
                            .append("table")
                            .attr("width", this.width)
                            .attr("height", this.height).append("tr").append("td").append("p")
                            .text("tb_widget_service not defined. Execute the script TB_WIDGET_SERVICE.sql")
                            .style("color", "red")
                            .style("font-size", 13)
                            .style("text-transform", "uppercase")
                            .style("text-align", "center")
                            .attr("x", this.width / 2)
                            .attr("y", this.height / 2);
                        return;
                    }
                    var dataColumnNames;
                    //console.log("--- dataColumnNames:", dataColumnNames);	             
                    this.dataREST.forEach(function (d, i) {
                        console.log("--- i:", i);
                        console.log("--- d.length:", d.length);
                        console.log("--- d:", d);
                        if (d.length == 1) {
                            var dataNode = d[0];
                            dataColumnNames = Object.keys(dataNode);
                            console.log("--- dataColumnNames:", dataColumnNames);
                            console.log("--- dataNode:", dataNode);
                            //console.log("--- pWidth:", pWidth); 
                            //console.log("--- pHeight:", pHeight);
                            //Render the divs 
                            var rp = radialProgress(eval("div" + (i + 1)), d, pWidth, pHeight)
                                .label(eval("dataNode." + dataColumnNames[0]).replace("_", " "))
                                .diameter(pHeight - 35) //175
                                .value(eval("dataNode." + dataColumnNames[1]))
                                .render();
                        }
                        else if (d.length > 1) {
                            var dataNode = d[0];
                            dataColumnNames = Object.keys(dataNode);
                            console.log("--- dataColumnNames:", dataColumnNames);
                            var rp = radialProgress(eval("div" + (i + 1)), d, pWidth, pHeight)
                                .label(dataColumnNames[1].replace("_", " "))
                                .diameter(pHeight - 35) //175
                                .value(d.length * 100)
                                .render();
                        }
                    });
                };
                __decorate([
                    core_1.ViewChild('main'),
                    __metadata("design:type", core_1.ElementRef)
                ], RadialComponent.prototype, "main_Container", void 0);
                __decorate([
                    core_1.ViewChild('div1'),
                    __metadata("design:type", core_1.ElementRef)
                ], RadialComponent.prototype, "div1_Container", void 0);
                __decorate([
                    core_1.ViewChild('div2'),
                    __metadata("design:type", core_1.ElementRef)
                ], RadialComponent.prototype, "div2_Container", void 0);
                __decorate([
                    core_1.ViewChild('div3'),
                    __metadata("design:type", core_1.ElementRef)
                ], RadialComponent.prototype, "div3_Container", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], RadialComponent.prototype, "requestType", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Boolean)
                ], RadialComponent.prototype, "maxScreen", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], RadialComponent.prototype, "width", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], RadialComponent.prototype, "height", void 0);
                RadialComponent = __decorate([
                    core_1.Component({
                        selector: 'iRadialProgress',
                        moduleId: __moduleName,
                        templateUrl: 'radialprogress.component.html',
                        providers: [data_service_1.DataService],
                        styleUrls: ['radialprogress.component.css'],
                        encapsulation: core_1.ViewEncapsulation.None
                    }),
                    __metadata("design:paramtypes", [typeof (_a = typeof data_service_1.DataService !== "undefined" && data_service_1.DataService) === "function" && _a || Object])
                ], RadialComponent);
                return RadialComponent;
                var _a;
            }());
            exports_1("RadialComponent", RadialComponent);
        }
    };
});
//# sourceMappingURL=radialprogress.component.js.map