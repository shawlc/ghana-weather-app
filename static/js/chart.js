var numHistBins = 10; // number of bins for the histogram
var calcHistBinsAutmoatic = true; // if true, the number of bins are calculated automatically and
// numHistBins is overwritten
var showKDP = true; // show the kernel density plot?
var bandwith = 4; // bandwith (smoothing constant) h of the kernel density estimator // the filename of the data to be visualized
var dataFN = []

for(var i=0;i<ghanaGrid["features"].length;i++){
  dataFN.push(ghanaGrid["features"][i]["properties"]["perc_clay"])
}

// USER DEFINABLE VARIABLES END


var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// the x-scale parameters
var x = d3.scale.linear()
    .domain([0, 30])
    .range([0, width]);

// the y-scale parameters
var y = d3.scale.linear()
    .domain([0, 0.1])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format("%"));

var line = d3.svg.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

// the histogram function
var histogram;

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// draw the background
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Time between Eruptions (min.)");

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


// draw the histogram and kernel density plot

    // calculate the number of histogram bins
	if( calcHistBinsAutmoatic == true) {
		 numHistBins = Math.ceil(Math.sqrt(dataFN.length));  // global variable
	}
 // the histogram function
  histogram = d3.layout.histogram()
    .frequency(false)
    .bins(numHistBins);
	//.bins(x.ticks(500));

  var data = histogram(dataFN);
  //var kde = kernelDensityEstimator(epanechnikovKernel(7), x.ticks(100));
  var kde = kernelDensityEstimator(epanechnikovKernel(bandwith), x.ticks(100));

  //alert("kde is " + kde.toSource());

  //console.log(svg.datum(kde(dataFN)));

  svg.selectAll(".bar")
      .data(data)
    .enter().insert("rect", ".axis")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.x) + 1; })
      .attr("y", function(d) { return y(d.y); })
      .attr("width", x(data[0].dx + data[0].x) - x(data[0].x) - 1)
      .attr("height", function(d) { return height - y(d.y); });

	// show the kernel density plot
	if(showKDP == true) {
		svg.append("path")
		  .datum(kde(dataFN))
		  .attr("class", "line")
		  .attr("d", line);
	  }


function kernelDensityEstimator(kernel, x) {
  return function(sample) {
    return x.map(function(x) {
		//console.log(x + " ... " + d3.mean(sample, function(v) { return kernel(x - v); }));
		return [x, d3.mean(sample, function(v) { return kernel(x - v); })];
    });
  };
}

function epanechnikovKernel(bandwith) {
  return function(u) {
    //return Math.abs(u /= bandwith) <= 1 ? .75 * (1 - u * u) / bandwith : 0;
	if(Math.abs(u = u /  bandwith) <= 1) {
	 return 0.75 * (1 - u * u) / bandwith;
	} else return 0;
  };
}
