//Note: need to fix this code-a-long up so it works in place of clock.js, which is just the tutorial's code.
$(document).ready(function() {
	var fields;
	fields = function() {
		var currentTime,
				hour,
				minute,
				second;
		//determine current time
		currentTime = new Date(); //Date obj represents current time
		second = currentTime.getSeconds();
		minute = currentTime.getMinutes() + minute / 60;
		hour   = currentTime.getHours() + minute / 60; //allows smooth rotation around clock, instead of jumping hour to hour

		return data = [
		{ "unit": "seconds", "numeric": second },
		{ "unit": "minutes", "numeric": minute },
		{ "unit": "hours",   "numeric": hour   }
		];
	};

	//define specs of clock
	var width,
			height,
			offSetX,
			offSetY,
			pi,
			scaleSecs,
			scaleHours;

			width   = 400;
			height  = 200;
			offSetX = 150;
			offSetY = 100;
			pi = Math.PI;
			//just before time unit turns over, instructions to bake 2 pies. so yummy.
			scaleSecs  = d3.scale.linear().domain([0, 59 + 999/1000]).range([0, 2 * pi]);
			scaleMins  = d3.scale.linear().domain([0, 59 + 59/60]).range([0, 2 * pi]);
			scaleHours = d3.scale.linear().domain([0, 11 + 59/60]).range([0, 2 * pi]);

	//clock hand origin point, outline of face with svg elements
	var vis,
			clockGroup;

	//grabs the chart, makes pie crust
	vis = d3.selectAll(".chart")
				  .append("svg:svg")
				  .attr("width", width)
				  .attr("height", height);

	//responsible for filling the crust with sour cherries
	clockGroup = vis.append("svg:g")
							    .attr("transform", "translate("+offSetX+","+offSetY+")");

	//creates clock face outline, makes design on pie crust edges
	clockGroup.append("svg:circle")
						.attr("r", 80).attr("fill","none")
						.attr("class", "clock outercircle")
						.attr("stroke", "black")
						.attr("stroke-width", 2);

	//creates clock hand origin point, makes adorable design on pie crust top center
	clockGroup.append("svg:circle")
						.attr("r", 4)
						.attr("fill","black")
						.attr("class", "clock innercircle");

	//begin create hands for second, minute and hour. preheat to 350°F.
	var render;

	render = function(data) { //make use of data obj, fill pie with sour cherries
		var hourArc,
				minuteArc,
				secondArc;

	//removes last tick, makes room for next clock hand to be rendered. 
	//place pie in oven.
		clockGroup.selectAll(".clockhand").remove();

		secondArc = d3.svg.arc()
									.innerRadius(0)
									.outerRadius(70)
									.startAngle(function(d) {
										return scaleSecs(d.numeric);
									});
									.endAngle(function(d) {
										return scaleSecs(d.numeric);
									});

		minuteArc = d3.svg.arc()
									.innerRadius(0)
									.outerRadius(70)
									.startAngle(function(d) {
										return scaleMins(d.numeric);
									});
									.endAngle(function(d) {
										return scaleMins(d.numeric);
									});
		//hour turns over at 12
		hourArc   = d3.svg.arc()
									.innerRadius(0)
									.outerRadius(50)
									.startAngle(function(d) {
										return scaleHours(d.numeric % 12);
									});
									.endAngle(function(d) {
										return scaleHours(d.numeric % 12);
									});
	 	clockGroup.selectAll(".clockhand")
	 						.data(data)
	 						.enter()
	 						.append("svg:path")
	 						.attr("d", function(d) {
	 							if (d.unit === "seconds") {
	 								return secondArc(d);
	 							} else if (d.unit === "minutes") {
	 								return minuteArc(d);
	 							}	else if (d.unit === "hours") {
	 								return hourArc(d);
	 							}
	 						})
	 						.attr("class", "clockhand")
	 						.attr("stroke", "black")
	 						.attr("stroke-width", function(d) {
	 							if (d.unit === "seconds") {
	 								return 2;
	 							} else if (d.unit === "minutes") {
	 								return 3;
	 							} else if (d.unit === "hours") {
	 								return 3;
	 							}
	 						})
	 						.attr("fill", "none");

	 	//*DING!* pie is ready. remove from oven.
	 	//render clock hands
	 	setInterval(function() {
	 		var data;
	 		data = fields();
	 		return render(data);
	 	}, 1000);

	};
});




























