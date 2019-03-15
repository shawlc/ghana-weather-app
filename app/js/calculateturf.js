
var rainCities = $(ghanaCities.features).filter(function(iter, elem){return elem.properties.value.rain})


// add a random property to each point
turf.featureEach(ghanaCities, function(point) {
    if (point.properties.value.rain){
      point.properties.precip = point.properties.value.rain["3h"];
    } else {
      point.properties.precip = 0
    }
});

var options = {gridType: 'points', property: "precip", units: 'miles'};

var interpolation = turf.interpolate(ghanaCities, 5, options);

// var maxInter = Math.max.apply(Math,_.map(interpolation.features,function(elem){return elem.properties.precip}))
// var minInter = Math.min.apply(Math,_.map(interpolation.features,function(elem){return elem.properties.precip}))
//
// var heatRange = function(max, min, interval){
//   var arr = []
//   for(var i = 0; i<interval; i++){
//     arr.push(min+i*(max-min)/interval)
//   }
//   return arr
// }
//
// var range = heatRange(maxInter,minInter,8)
