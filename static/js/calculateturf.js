
//var rainCities = $(ghanaCities.features).filter(function(iter, elem){return elem.properties.value.rain})


// add a random property to each point
turf.featureEach(ghanaCities, function(point) {
    if (point.properties.value.rain){
      point.properties.precip = point.properties.value.rain["3h"];
    } else {
      point.properties.precip = 0
    }
});

var options = {gridType: 'square', property: "precip", units: 'miles'};

var squareinter = turf.interpolate(ghanaCities, 5, options);

var simplified = turf.simplify(ghanaBorder, {tolerance: 0.05, highQuality: false});
var new_border = turf.bboxClip(simplified, [-3.49639, 4.86992, 0.9879, 11.0616]);


var ghana_grid = turf.pointGrid([-3.411707, 4.5947988958, 1.316302727, 11.3081978], 5, {units: 'miles', mask:new_border});
var interpolation = turf.tag(ghana_grid, squareinter, 'precip', 'precip');

var sumarr = interpolation.features.map(x => x.properties.precip)
var avgprecip = sumarr.reduce((tot,num)=>tot+num)/sumarr.length

var totvol = avgprecip*0.001*2.38535*10^11

console.log("Average Precipitation in mm")
console.log(avgprecip)

console.log("Total Volume of Rainfall in cubic meters")
console.log(totvol)
