/**
 * Created at 23.01.2015
 * @author {@link http://artzub.com|Artem Zubkov}
 */

"use strict";

var reserve = function(comps, data, pWidth, pHeight, pMetrics) {
	//console.log("Finally call is being executed");	
	var rawData, tree, width = pWidth, height = pHeight, selectedMetric, selectedData, metrics = pMetrics, colors = d3.scale.ordinal().range(d3.range(50, 300, 20)), yearReg = /^\d{0,4}[A-Za-z]{0,25}$/;
	
	var ui = d3.select(comps[0]), vis = d3.select(comps[1]).append('div'), surfaceContainer = layers
			.layer().addTo(vis), metricsContainer = layers.layer({
		position : "metricstop right menu"
	}).addTo(vis), controls = layers.layer({
		position : "left menu"
	}).addTo(ui), bottomBar = layers.layer({
		position : "bottom left"
	}).addTo(ui), df = d3.format(",.2f"), dfp = d3.format(",.2%");
	//console.log("comps[2]",comps[2]);
	var templateCell = d3.select(comps[2]).html(), templateTreeNode = d3.select(comps[3]).html();
	//console.log("templateCell",templateCell);
	//console.log("templateTreeNode",templateTreeNode);
	
	var lastOver = {
		cell : {},
		node : {},
		year : {}
	};
	//console.log("---d3.helper:", d3.helper);
	var tooltip = helperTooltip().padding(16).text(
			function(d) {
				return d ? d.data ? textForCell(d) : d.key ? yearReg
						.test(d.key) ? textForTreeNodeYear(d)
						: textForTreeNode(d) : "" : ""
			});

	function textForTreeNodeYear(d) {
		//console.log("**Main****in textForTreeNodeYear:", d);
		var delta, pr = 0;
		if (!d)
			return "";

		if (lastOver.node != d) {
			if (lastOver.node) {
				delta = d.value - lastOver.node.value;
				pr = delta / (Math.max(d.value, lastOver.node.value) || 1);
			}
			d.colorClass = !delta ? "" : delta > 0 ? "green" : "red";
			d.lastDelta = !delta ? "" : dfp(Math.abs(pr));
			lastOver.node = d;
		}
		d.valueText = df(d.value);
		d.name = d.tree_id.replace('_' + d.key, '');
		d.year = d.key;

		return template(templateCell, d);
	}

	function textForTreeNode(d) {
		//console.log("**Main****in textForTreeNode:", d);
		var delta = {
			min : 0,
			max : 0,
			mid : 0,
			value : 0
		}, pr = {
			min : 0,
			max : 0,
			mid : 0,
			value : 0
		}, data, max = -Infinity, min = Infinity;
		if (!d)
			return "";

		var k = d;
		while ((data = safeValues(k))[0].key == k.key)
			k = data[0];
		d.midValue = d3.mean(data, function(k) {
			var value = k.hasOwnProperty('value') ? k.value : yearReg
					.test(k.key) ? k.values[0][selectedMetric] : 0;
			max = Math.max(value, max);
			min = Math.min(value, min);
			return value;
		});

		d.minValue = min;
		d.maxValue = max;

		var key, keyObj;

		if (lastOver.node != d) {
			for (key in delta) {
				if (!delta.hasOwnProperty(key))
					continue;
				keyObj = key == "value" ? key : key + "Value";
				if (lastOver.node) {
					delta[key] = d[keyObj] - lastOver.node[keyObj];
					pr[key] = delta[key]
							/ (Math.max(d[keyObj], lastOver.node[keyObj]) || 1);
				}

				key = key == "value" ? "" : key;
				d[key + 'colorClass'] = !delta[key || "value"] ? "" : delta[key
						|| "value"] > 0 ? "green" : "red";
				d[key + 'lastDelta'] = !delta[key || "value"] ? "" : dfp(Math
						.abs(pr[key || "value"]));
			}
			lastOver.node = d;
		}
		for (key in delta)
			if (delta.hasOwnProperty(key))
				d[key + 'Text'] = df(d[key == "value" ? key : key + "Value"]);

		return template(templateTreeNode, d);
	}

	function textForCell(d) {
		//console.log("**Main****in textForCell:", d);
		var delta, pr = 0;
		if (!d || !d.data)
			return "";

		if (lastOver.cell != d) {
			if (lastOver.cell && lastOver.cell.data) {
				delta = d.data.value - lastOver.cell.data.value;
				pr = delta
						/ (Math.max(d.data.value, lastOver.cell.data.value) || 1);

			}
			d.data.colorClass = delta > 0 ? "green" : delta < 0 ? "red" : "";
			d.data.lastDelta = !delta ? "" : dfp(Math.abs(pr));
			lastOver.cell = d;
		}
		d.data.valueText = df(d.data.value);

		return template(templateCell, d.data);
	}
	var resizedFlag = false;
	function resize() {
		//console.log("**Main - in resize request"); 
		if (resizedFlag) { return; }			
		var importJS = document.createElement('script');
		importJS.src = 'app/widgets/surface3D/js/lib/surface3d.js';
		//document.head.removeChild(importJS);
		document.head.appendChild(importJS);		
		//console.log("**Main - document.head:",document.head);		
		width = pWidth;
		height = pHeight;
		//console.log("**width:", width);
		//console.log("**height:", height);
		tooltip.spaceWidth(width).spaceHeight(height);
		tree && tree.resize();
		surface && surface.size([width, height]);
		resizedFlag = true;
	}

	d3.select(window).on('resize', resize);
	bottomBar.div.attr('id', 'bottomBar').classed('override', true);	
	
	//fireOnResizeEvent();
	function fireOnResizeEvent() {
		 var width, height;

		 if (navigator.appName.indexOf("Microsoft") != -1) {
			 width  = document.body.offsetWidth;
			 height = document.body.offsetHeight;
		 } else {
			 width  = window.outerWidth;
			 height = window.outerHeight;
		 }

		 window.resizeTo(width - 1, height);
		 window.resizeTo(width + 1, height);
	}
	/*
	window.onresize = function() {
		 //alert("Resized!");
	}*/

	function toggleBar() {
		//console.log("**Main****in toggleBar:");
		bottomBar.container.classed("open", !bottomBar.container
				.classed("open"));
		//bottomBar.container.classed("open", true);
	}

	//bottomBar.div.append("span").attr("class", "before").style({"display": "none"}).on('click', toggleBar);
	//bottomBar.div.append("span").attr("class", "before").on('click', toggleBar);
	//setTimeout(toggleBar, 2000);

	bottomBar = layers.layer().addTo(bottomBar.div);
	//console.log("**bottomBar.parentElement:", bottomBar.div.parentElement.nodeName);
	//bottomBar.parentElement.setAttribute("style", "height: "+500);

	var treeContainer = bottomBar.div.append('div').style({
		'float' : 'bottom',		
		//'margin-top' : Math.round(height / 100) + '%',
		'position' : 'relative',
		'width' : '100%',
		//'bottom': '4px',
		'height' : '90px'
	});//.attr('class', 'left bottom');

	var progress = layers.progressBar().addTo(
			bottomBar.div.append('div').style({
				'position' : 'absolute',
				'width' : '100%',
				'bottom' : '1px',
				'display' : 'none',
			}).attr('class', 'left bottom'));

	progress.div.style('height', '3px');

	surfaceContainer.div.attr('id', 'surfaceContainer');
	metricsContainer.div.attr('id', 'metricsContainer');	

	var surface = layers.surface().addTo(surfaceContainer.div);
	//console.log("********surface.div.clientHeight:", surface.div.clientHeight)
	//surface.div.clientHeight = height + 110;
	//console.log("********surface.div.clientHeight:", surface.div.clientHeight)
	var zero = {
		value : 0,
		data : null,
		normalized : 0
	};
	function getZero(name, year) {
		//console.log("**Main****in getZero:", name + " : " + year);
		return name ? {
			value : 0,
			data : null,
			name : name,
			year : year,
			normalized : 0
		} : zero;
	}

	function safeValues(d) {
		//console.log("**Main****in safeValues:", d);
		return d.items || d.values || d._values || [];
	}

	function makeMatrix(metric, selected) {
		//console.log("**Main****in makeMatrix:", metric);
		var result = {}, stack = [], d = selected, value, data, i, j, max = 0, years = {}, name, year, entryDepth = d.depth;

		data = safeValues(d);
		i = data.length;

		var key = entryDepth == 0 ? 'level' : entryDepth == 1 ? 'subLevel'
				: entryDepth == 2 ? 'subSubLevel' : 'name';

		while (i--) {
			d = data[i];
			if (yearReg.test(d.key)) {
				d = safeValues(d)[0];

				if (key != 'name' && entryDepth > 1 && d[key] == d['subLevel']) {
					key = 'name';
				}

				value = result[d[key]];
				if (!value)
					value = result[d[key]] = {};
				years[d.year] = 1;
				value = value[d.year] = {
					value : d[metric],
					data : d
				};
				max = Math.max(value.value, max);
			} else {
				stack.push({
					data : data,
					i : i
				});
				if (d.depth > 1 && d.key == d.parent.key
						&& safeValues(d.parent).length > 1)
					break;
				while ((data = safeValues(d))[0].key == d.key) {
					value = d.key;
					d = data[0];
				}
				i = data.length;
			}
			if (!i && stack.length) {
				d = stack.pop();
				data = d.data;
				i = d.i;
			}
		}

		data = Object.keys(result);
		years = Object.keys(years);
		j = years.length;
		i = data.length;
		if (!i || !j)
			return [ [] ];

		years.sort().reverse();

		stack = new Array(i + 1);
		while (i--) {
			name = data[i];
			j = years.length;
			stack[i] = new Array(j + 1);
			while (j--) {
				year = years[j];
				value = result[name];
				value = value[year];
				stack[i][j] = value ? {
					value : value.value,
					data : value.data,
					name : name,
					year : year,
					normalized : value.value ? value.value
							/ (max || value.value) : 0
				} : getZero(name, year);
			}
			stack[i][stack[i].length - 1] = getZero(name, 0);
		}
		stack[stack.length - 1] = years.map(getZero);
		stack[stack.length - 1].push(getZero());

		//console.log(stack);
		return stack;
	}

	var currentSurface;
	var surfaceChangeTimer;
	function makeSurface(d, multi) {
		//console.log("**Main****in makeSurface:", d);
		selectedData = d;

		if (!selectedMetric || !metrics[selectedMetric]) {
			var m = Object.keys(metrics);
			selectedMetric = m && m.length ? m[0] : null;
		}

		if (!selectedMetric)
			return;

		if (surfaceChangeTimer)
			clearTimeout(surfaceChangeTimer);

		surfaceChangeTimer = setTimeout(function() {
			currentSurface = surface.appendSurface(selectedMetric, makeMatrix(
					selectedMetric, d), multi).surface.surfaceCellId(
					surfaceCellId).surfaceCellOver(surfaceCellOver)
					.surfaceCellOut(surfaceCellOut).surfaceCellMove(
							tooltip.mousemove).transition().duration(500)
					.surfaceHeight(surfaceHeight).surfaceColor(surfaceColor);
		}, currentSurface ? 0 : 500);
	}

	var hovered;
	function surfaceCellOver(d) {
		//console.log("**Main****in surfaceCellOver:", d);
		tooltip.mouseover(d);
		hovered = d;
		currentSurface.colorize();
		currentSurface.highlightEdgeByKey(d ? d.data.name : null);
	}

	function surfaceCellOut(d) {
		//console.log("**Main****in surfaceCellOut:", d);
		tooltip.mouseout();
		hovered = null;
		currentSurface.colorize();
		currentSurface.highlightEdgeByKey();
	}

	function surfaceCellId(d, x, y) {
		//console.log("**Main****in surfaceCellId:", d);
		return d.name ? d.name + y : x + ' ' + y
	}

	function surfaceHeight(d) {
		//console.log("**Main****in surfaceHeight:", d);
		return -d.normalized * height * .4; //Height of the chart/graph
	}

	function surfaceColor(d) {
		//console.log("**Main****in surfaceColor:", d);
		var c = d.name ? colors(d.name) : 0;

		var real = hovered;
		if (real && !real.data && selectedData != real.parent)
			real = null;

		var o = real && real.data && d == real.data ? .8 : .5;

		real = real ? real.data ? real.data.name : real.key : null;

		var s = real && d.name !== real ? .3 : 1;
		c = d3.hsl(c, s, d.name ? 0.5 + d.normalized / 2 : 0).rgb();
		return "rgba(" + parseInt(c.r) + "," + parseInt(c.g) + ","
				+ parseInt(c.b) + "," + o + ")";
	}

	function treeColor(d) {
		//console.log("**Main****in treeColor:", d);
		var key = d.key, l = 0, mkey = "mv_" + selectedMetric;
		if (yearReg.test(d.key)) {
			key = d.parent.key;
			l = d.parent[mkey] ? d.value / d.parent[mkey] : 0
		}
		var c = d.key ? colors(key) : 0;
		c = d3.hsl(c, 1, .5 + l / 2).rgb();
		return "rgb(" + parseInt(c.r) + "," + parseInt(c.g) + ","
				+ parseInt(c.b) + ")";
	}

	function initMetrics() {
		//console.log("**Main****in initMetrics:");
		metricsContainer.div.selectAll('ul').remove();

		if (!metrics || !selectedMetric)
			selectedMetric = null;

		var data = Object.keys(metrics);

		selectedMetric = !selectedMetric ? (data && data.length ? data[0]
				: null) : selectedMetric;
		console.log("**Metrics length: ", data.length);
		if (data.length == 1)  { return;}
		metricsContainer.div.append('ul').selectAll('li').data(data).enter()
				.append('li').text(function(d) {
					return metrics[d].replace(/_/g, ' ');
				}).on(
						'click',
						function(d) {

							setWait();
							d3.select(this.parentNode).selectAll('li').classed(
									'selected', false);
							d3.select(this).classed('selected', true);

							selectedMetric = d;

							selectedData && updateTree(selectedData);

							selectedData && makeSurface(selectedData);

							unsetWait();
						}).classed("selected", function(d) {
					return d == selectedMetric;
				});
	}

	!function() {
		//console.log("**Main****in !function:")
		var temp = d3.select(comps[4]).html();
		//console.log("*****temp:", temp);
		//console.log("*****controls:", controls);
		controls.div.style("float", "left");
		controls.div.style("position", "absolute");		
		controls.div.style("margin-top", "5%").html(temp);
		controls.div.selectAll("li").on('click', function() {
			var that = d3.select(this).select("span:first-child");

			if (!currentSurface)
				return;

			if (that.classed("expand-right")) {
				surface.turntable(0, 0);
			} else if (that.classed("expand-left")) {
				surface.turntable(1.57, 0);
			} else if (that.classed("expand-down")) {
				surface.turntable(1.57, 1.58);
			} else if (that.classed("loop")) {
				surface.turntable(.5, .3);
			}
		})
	}();

	function setWait() {
		//console.log("**Main****in setWait:");
		d3.select("body").classed('wait', true);
	}
	function unsetWait() {
		//console.log("**Main****in unsetWait:");
		d3.select("body").classed('wait', false);
	}

	function treeItemSelect(d) {
		//console.log("**Main****in treeItemSelect:");
		setWait();
		makeSurface(d);
		unsetWait();
	}

	function treeItemOver(d) {
		//console.log("**Main****in treeItemOver:");
		tooltip.mouseover(d);
		hovered = d;
		currentSurface.colorize();
		currentSurface.highlightEdgeByKey(d ? d.key : null);
	}

	var treeItemOut = surfaceCellOut;

	function initTree(data) {
		//console.log("**Main****in initTree:");
		if (tree)
			tree.remove();
		else {
			tree = layers.treeBar();
			tree.on('select', treeItemSelect).on('mouseover', treeItemOver).on(
					'mouseout', treeItemOut).on('mousemove', tooltip.mousemove);
		}
		//console.log("------treeContainer: ", treeContainer);
		tree.addTo(treeContainer).color(treeColor).data(data);
	}

	function updateTree(selected) {
		//console.log("**Main****in updateTree:");
		rawData.values.forEach(restructure(rawData));
		tree && tree.data(rawData, selected);
	}

	/**
	 * @param {string} cost
	 * @returns {number}
	 */
	function fixCost(cost) {
		//console.log("**Main****in fixCost:");
		return !cost || cost == "-" ? 0 : parseFloat(cost.replace(',', '.'));
	}

	var costKeys = Object.keys(metrics);
	function fixCosts(d) {
		//console.log("**Main****in fixCosts:");
		var key, i = costKeys.length;

		while (i--)
			if (d.hasOwnProperty(key = costKeys[i]))
				d[key] = fixCost(d[key]);
	}

//	function dataParsing(err, inData) {
	function dataParsing(inData) {	
		console.log("**Main****in dataParsing: ", inData);
		var data = [], hashNames = {};

		progress.title('Analyse data...').position(20).max(100);

		if ( /*err || */ !inData || !inData.length) {
			progress.title('Not data!').position(100);
			//err && app.logErr(err);
			return initTree(data);
		}

		var lastName, level, subLevel, subSubLevel, reg = /^[IVX]+/, reg2 = /^\d+/, reg3 = /^.\)/;
		data = d3
				.nest()
				.key(function(d) {
					return d.level;
				})
				.key(function(d) {
					return d.subLevel;
				})
				.key(function(d) {
					return d.subSubLevel;
				})
				.key(function(d) {
					return d.name;
				})
				.key(function(d) {
					return d.year;
				})
				.entries(
						inData
								.filter(function(d) {
									lastName = d.name || lastName;

									if (lastName == "?????????? ??????? ???????????????? ??????????") {
										lastName = "1. " + lastName;
									} else if (lastName == "???????? ??????????, ??????????? ? ????????") {
										lastName = "2. " + lastName;
									}

									d.name = lastName;
									hashNames[lastName] = 1;

									if (reg.test(d.name)) {
										level = d.name;
										subLevel = level;
										subSubLevel = level;
									} else if (reg2.test(d.name)) {
										subLevel = d.name;
										subSubLevel = subLevel;
									} else if (reg3.test(d.name)) {
										subSubLevel = d.name;
									}

									d.level = level;
									d.subLevel = subLevel;
									d.subSubLevel = subSubLevel;

									fixCosts(d);

									return d.year && d.name != "????? ????????";
								}));
		rawData = {
			key : "Top Level",//key : "Top Level",
			values : data,
			items : data
		};

		hashNames = Object.keys(hashNames);

		colors.range(d3.range(0, 300, 500 / (hashNames.length || 1))).domain(
				hashNames);

		progress.position(100).title('Complete!');

		initMetrics(metrics);

		rawData.values.forEach(restructure(rawData));
		initTree(rawData);
		
	}

	function restructure(parent) {
		//console.log("**Main****in restructure:");
		return function(d) {
			if (!d.values)
				return;

			var maxMetricKey;

			d.tree_id = d.key;

			if (yearReg.test(d.key)) {
				d.tree_id = parent.key + '_' + d.key;
				d.metric = d.values[0][selectedMetric];

				maxMetricKey = "mv_" + selectedMetric;

				parent[maxMetricKey] = Math.max(d.metric,
						typeof parent[maxMetricKey] === "undefined" ? -Infinity
								: parent[maxMetricKey]);
				return;
			}

			var arr = d.values, curParent = d;
			if (d.key == parent.key) {
				if (parent.items.length > 1) {
					d.metric = 0;
					return;
				}

				parent.items = arr;
				curParent = parent;
			} else {
				d.items = arr;
			}

			arr.forEach(restructure(curParent));
		}
	}

	app.dataLoader({
		beforesend : function() {
			progress.title('loading...').max(100).position(20);
		},
		progress : function(e) {
			if (!d3.event)
				return;
			e = d3.event;
			progress.max(e.total).position(e.loaded);
		}
	})//.loadData(
	//['data/1937-1940.csv', 'data/1941-1945.csv', 'data/1946-1950.csv']
	//[ 'app/widgets/reserve/data/data.csv' ], dataParsing);
	dataParsing(data);
	resize();

	// fixed zoom event

	var timerResize;
	
	//console.log("comps[5].contentWindow: ", document.querySelector("#" + comps[5].id).contentWindow);
			//document.querySelector("#zoomEvent").contentWindow
	//document.getElementById("zoomEvent")
	/*comps[5].contentWindow.on('resize',
			function() {
				if (timerResize)
					clearTimeout(timerResize);
				timerResize = setTimeout(resize, 300);
			});*/
	d3.select(document.querySelector("#" + comps[5].id).contentWindow).on(
			'resize', function() {
				if (timerResize)
					clearTimeout(timerResize);
				timerResize = setTimeout(resize, 300);
			});	


	function template(template, item) {
		//console.log("**Main****in template:", template);
		if (!template || !item)
			return "";

		for ( var key in item) {
			if (!item.hasOwnProperty(key))
				continue;
			template = template.replace("[[" + key + "]]", item[key]);
			//console.log("**Main****in template:", template);
		}

		return template;
	}

	setTimeout(function() {
		//d3.select(comps[6]).classed('open', true);
		//d3.select(comps[2]).classed('open', true);
		d3.select(comps[1]).classed('open', true);
		resizedFlag = false;
		resize();
	}, 10);
}
