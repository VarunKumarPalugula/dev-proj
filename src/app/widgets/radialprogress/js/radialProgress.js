 
  function radialProgress(parent, data, width, height) {
	console.log("*****parent:",parent);
	console.log("*****data:",data);
	//console.log("*****width:",width);
    var _data=data,
        _duration= 1000,
        _selection,
        _margin = {top:10, right:25, bottom:10, left:10},
        __width = (width / 3.6),//150,
        __height = height,//250,
        _diameter = height - 10,//150,
        _label="",
        _fontSize=10;

    var _mouseClick;

    var _value= 0,
        _minValue = 0,
        _maxValue = 100;

    var  _currentArc= 0, _currentArc2= 0,_currentArc3= 0, _currentValue=0;

    var _arc = d3.svg.arc().startAngle(0);
        //.startAngle(0);//.startAngle(0 * (Math.PI/180)); //just radians

    var _arc2 = d3.svg.arc()
        .startAngle(0)
        //.endAngle(0 * (Math.PI/180)); //just radians

    var _arc3 = d3.svg.arc()
    .startAngle(0)
    //.endAngle(0 * (Math.PI/180)); //just radians
  
    _selection=d3.select(parent);

    function component() {

        _selection.each(function (data) {    	
        	var singleBandColor = ['pink','#4e8fff','purple','gold','grey'];        	 
        	 var color = ['green','orange','red','yellow','brown','pink','black','white'];//d3.scale.category20();
		 //console.log("*****color---:",color[0]);
		 var legendData=[];//["FX", "FIS", "MM"];

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            var enter = svg.enter().append("svg").attr("class","radial-svg").append("g");

            measure();

            svg.attr("width", __width + 25)
                .attr("height", __height);


            var background = enter.append("g").attr("class","component");
                //.attr("cursor","pointer")
                //.on("click",onMouseClick);

            //_arc.endAngle(180 * (Math.PI/180))
            _arc.endAngle(360 * (Math.PI/180))
            _arc2.endAngle(360 * (Math.PI/180))
            _arc3.endAngle(360 * (Math.PI/180))
            //_arc.endAngle((Math.PI))

            background.append("rect")
                .attr("class","background")
                .attr("width", _width)
                .attr("height", _height);

            background.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);
           
            var ratio=(_value-_minValue)/(_maxValue-_minValue);
            var endAngle=Math.min(360*ratio,360);
            
            if(ratio>1){
            	background.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc2);
            	
            }
            if(ratio>2){
            	background.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc3);
            }
            
            background.append("path2")
            .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
            .attr("d", _arc2);
            
            background.append("path3")
            .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
            .attr("d", _arc3);            

            background.append("text")
                .attr("class", "label")
                .attr("transform", "translate(" + _width/2 + "," + (_width + _fontSize) + ")")
                .text(_label);
           var g = svg.select("g")
                .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");


            _arc.endAngle(_currentArc);
            _arc2.endAngle(_currentArc2);
            _arc3.endAngle(_currentArc3);
            enter.append("g").attr("class", "arcs");
            
            var path = svg.select(".arcs").selectAll(".arc").data(data);
            path.enter().append("path")
                //.attr("class","arc")
                .attr("fill",function () { if(_data.length > 1) {return color[0];} else {var index = parent.id.substring(3, parent.id.length); return singleBandColor[parseInt(index)];} })
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")                
                .attr("d", _arc);

            //Another path in case we exceed 100%
            var path2 = svg.select(".arcs").selectAll(".arc2").data(data);
            path2.enter().append("path")
                //.attr("class","arc2")
                .attr("fill",color[1])
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")                
                .attr("d", _arc2);//rotate(-90," + _width/2 + ", " + _width/2 + ")
            
            //for arc3 exceeds 200%
            var path3 = svg.select(".arcs").selectAll(".arc3").data(data);
            path3.enter().append("path")
                //.attr("class","arc3")
                .attr("fill",color[2])
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")                
                .attr("d", _arc3);

            enter.append("g").attr("class", "labels");
            var label = svg.select(".labels").selectAll(".label").data(data);
            label.enter().append("text")
                .attr("class","label")
                .attr("y",_width/2+_fontSize/3)
                .attr("x",_width/2)
                //.attr("cursor","pointer")
                .attr("width",_width)
                // .attr("x",(3*_fontSize/2))
                .text(function (d) { 
                	console.log("---Radial value:z",parseInt(Math.round((_value-_minValue)/(_maxValue-_minValue)*100)));
                	
                	if (parseInt(Math.round((_value-_minValue)/(_maxValue-_minValue)*100)) > 100) {
                		return "";
                	}
                	else { return Math.round((_value-_minValue)/(_maxValue-_minValue)*100) + "%"; }               		
                })            
                .style("font-size",_fontSize+"px")
                .on("click",onMouseClick);

            path.exit().transition().duration(500).attr("x",1000).remove();
            
            layout(svg);

            function layout(svg) {
	    
	        var dataColumnNames = Object.keys(_data[0]);
        	console.log("---js dataColumnNames:", dataColumnNames);
		
		//console.log("---_data[0].value:", _data[0].value);
		console.log("---js", eval("_data[0]." + dataColumnNames[1]));

              //Math.min(180*ratio,180);//Math.min(180*ratio,360);//
                endAngle=endAngle * Math.PI/180;
                
                path.datum(endAngle); 
                path.datum(Math.min(360*(eval("_data[0]." + dataColumnNames[1]) / 100),360) * Math.PI/180);
		//path.datum(Math.min(360*(_data[0].value / 100),360) * Math.PI/180);
		
                path.transition().duration(_duration)
                    .attrTween("d", arcTween);   
                
                
               // _value = _data[0].value; //set value
               console.log("***ratio:", ratio);
               
               path.append("title") 
               .text(function() { return (eval("_data[0]." + dataColumnNames[0])).replace("_"," ")+" - "+eval("_data[0]." + dataColumnNames[1]) + "%"; });               
               
               if (ratio > 1) {
                	console.log("******ratio-1:",ratio-1);
                    var endAngle2=Math.min(180*ratio,360);
                    endAngle2=endAngle2 * Math.PI/180;
                	path2.datum(endAngle2);
                	
                    //path2.datum(Math.min(360*(ratio-1),360) * Math.PI/180);
                    //path2.datum(Math.min(360*(_data[1].value / 100),360) * Math.PI/180);
		    path2.datum(Math.min(360*(eval("_data[1]." + dataColumnNames[1]) / 100),360) * Math.PI/180);
		    
                    path2.transition().delay(_duration).duration(_duration)
                        .attrTween("d", arcTween2); 
                    
                    //Legend array for nested radials...
                    legendData.length=0;
                    _data.forEach(function(dataObj, dj){
                  	  //legendData.push(dataObj.functionParam);
			  legendData.push(eval("dataObj." + dataColumnNames[0]));
                    });
                    console.log("********legendData:",legendData);
                    
                    path2.append("title") 
                    .text(function() { return (eval("_data[1]." + dataColumnNames[0])).replace("_"," ")+" - "+eval("_data[1]." + dataColumnNames[1]) + "%"; });
               
                    if (ratio > 2){ 
                        var endAngle3=Math.min(180*ratio,360);
                        endAngle3=endAngle3 * Math.PI/180;
                    	path3.datum(endAngle3);                    	
                    	
                        //path3.datum(Math.min(360*(ratio-2),360) * Math.PI/180);
                    	//path3.datum(Math.min(360*(_data[2].value / 100),360) * Math.PI/180);
			path3.datum(Math.min(360*(eval("_data[2]." + dataColumnNames[1]) / 100),360) * Math.PI/180);
                        path3.transition().delay(_duration).duration(_duration)
                            .attrTween("d", arcTween3);
                        
                        path3.append("title") 
                        .text(function() { return (eval("_data[2]." + dataColumnNames[0])).replace("_"," ")+" - "+eval("_data[2]." + dataColumnNames[1]) + "%"; });                        
                    }
                 

               }
               
               if (legendData.length > 1) {
		              var legendG = svg.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
		   			  .data(legendData)
		   			  .enter().append("g")
		   			  .attr("transform", function(d,i){
		   			    return "translate(" + (__width - 110) + "," + (i * 11 + 2) + ")"; // place each legend on the right and bump each one down 15 pixels
		   			  })
		   			  .attr("class", "legend");  
		
		            var legendElementheight = 8;
		   			legendG.append("rect") // make a matching color rect
		   			  .attr("x", function(d, i) { return 102; })
		               		  .attr("y", function(d, i) { return (legendElementheight * i); })
		   			  .attr("width", 11)
		   			  .attr("height", 11)
		   			  .attr("fill", function(d, i) { return color[i]; });//color(d); });
		   			
		   			legendG.append("text")
		            .attr("class", "mono")
		            .text(function(d) { return d; })
		            .style("fill", "#fff")
		            .style("font-size", 9)
		            .style("text-transform", "uppercase")                 
		            .attr("x", function(d, i) { return 115; })
		            .attr("y", function(d, i) { return (legendElementheight * i) + 10; }); 
			    

                }
               
                label.datum(Math.round(ratio*100));
                label.transition().duration(_duration)
                    .tween("text",labelTween);

            } 

        });

        function onMouseClick(d) {
            if (typeof _mouseClick == "function") {
                _mouseClick.call();
            }
        }
    }

    function labelTween(a) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);

        return function(t) {
            _currentValue = i(t);
            if (Math.round(i(t)) <= 100) { this.textContent = Math.round(i(t)) + "%"; }
            else { this.textContent = ""; }//FX, FIS, MM
        }
    }

    function arcTween(a) {
        var i = d3.interpolate(_currentArc, a);

        return function(t) {
            _currentArc=i(t);
            return _arc.endAngle(i(t))();
        };
    }

    function arcTween2(a) {
        var i = d3.interpolate(_currentArc2, a);

        return function(t) {
            return _arc2.endAngle(i(t))();
        };
    }
    
    function arcTween3(a) { //if exceeds 200%
        var i = d3.interpolate(_currentArc3, a);

        return function(t) {
            return _arc3.endAngle(i(t))();
        };
    }


    function measure() {
        _width=_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
        _height=_width;
        _fontSize=_width*.2;
        _arc.outerRadius(_width/2);
        _arc.innerRadius(_width/2 * .85);
        _arc2.outerRadius(_width/2 * .85);
        _arc2.innerRadius(_width/2 * .85 - (_width/2 * .15));
        _arc3.outerRadius(_width/2 * .85 - (_width/2 * .15));
        _arc3.innerRadius(_width/2 * .85 - (_width/2 * .30));
    }


    component.render = function() {
        measure();
        component();
        return component;
    }

    component.value = function (_) {
        if (!arguments.length) return _value;
        _value = [_];
        _selection.datum([_value]);
        return component;
    }


    component.margin = function(_) {
        if (!arguments.length) return _margin;
        _margin = _;
        return component;
    };

    component.diameter = function(_) {
        if (!arguments.length) return _diameter
        _diameter =  _;
        return component;
    };

    component.minValue = function(_) {
        if (!arguments.length) return _minValue;
        _minValue = _;
        return component;
    };

    component.maxValue = function(_) {
        if (!arguments.length) return _maxValue;
        _maxValue = _;
        return component;
    };

    component.label = function(_) {
        if (!arguments.length) return _label;
        _label = _;
        return component;
    };

    component._duration = function(_) {
        if (!arguments.length) return _duration;
        _duration = _;
        return component;
    };

    component.onClick = function (_) {
        if (!arguments.length) return _mouseClick;
        _mouseClick=_;
        return component;
    }
    //console.log("****component:",component);
    return component;

}