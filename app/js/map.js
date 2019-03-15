/* =====================
  Set up our map
===================== */

// var map = L.map('map', {
//   center: [8, -1.26],
//   zoom: 7
// });
// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
// }).addTo( map );
// starting zoom

var tileset = 'examples.map-i86nkdio';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
  center: [-1.26, 8], // starting position
  zoom: 6 // starting zoom
});

map.addControl(new mapboxgl.ScaleControl(), "bottom-left");
map.addControl(new mapboxgl.NavigationControl(),"bottom-left");



var capitalize = function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

ghanaCities.features.forEach(function(marker) {
  // create a HTML element for each feature
  if (marker.properties.country == "GH"){
  var elem = document.createElement('img');
  elem.src = "http://openweathermap.org/img/w/" + marker.properties.value.weather[0].icon + ".png"

  // make a marker for each feature and add to the map
  var weatherDesc = capitalize(marker.properties.value.weather[0].description)

  var tempCelsius = String(parseInt(parseFloat(marker.properties.value.main.temp) - 273.15)) + " &deg;C"

  var iconMarker = new mapboxgl.Marker(elem)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({

      }) // add popups
      .setHTML('<h2>' + marker.properties.name + '</h2><p>' + tempCelsius + " : " + weatherDesc + '</p>'))
    .addTo(map);
  }
});

var markerPoint = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [,]
          }
        }]
      };

map.on('load', function() {

  map.addSource('single-point', {
    "type": "geojson",
    "data": markerPoint
  });

  map.addLayer({
    "id": "point",
    "source": "single-point",
    "type": "circle",
    "paint": {
      "circle-radius": 10,
      "circle-color": "#007cbf"
    }
  });

  map.addSource('interpolation', {
    "type": "geojson",
    "data": interpolation
  });

//   map.addLayer({
//   'id': 'wms-test-layer',
//   'type': 'raster',
//   'source': {
//     'type': 'raster',
//     'tiles': [
//       "http://localhost:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=geotiff:Altitude&STYLE=&TILEMATRIX=EPSG:2136:{z}&TILEMATRIXSET=EPSG:2136&FORMAT=image/png&TILECOL={x}&TILEROW={y}"
//     ],
//     'tileSize': 256
//   },
//   'paint': {}
// }, 'aeroway-taxiway');

//   map.addLayer({
//   'id': 'state-population',
//   'source': 'interpolation',
//   'type': 'fill',
//   'paint': {
//     'fill-color': [
//       'interpolate',
//       ['linear'],
//       ['get', 'population'],
//       0, '#F2F12D',
//       500000, '#EED322',
//       750000, '#E6B71E',
//       1000000, '#DA9C20',
//       2500000, '#CA8323',
//       5000000, '#B86B25',
//       7500000, '#A25626',
//       10000000, '#8B4225',
//       25000000, '#723122'
//     ],
//     'fill-opacity': 0.75
//   }
// }, 'waterway-label');
//
  })



//
//   map.addLayer({
//     "id": "inter-heat",
//     "type": "heatmap",
//     "source": "interpolation",
//     "maxzoom": 9,
//     "paint": {
//       // Increase the heatmap weight based on frequency and property precipitation
//       "heatmap-weight": [
//         "interpolate",
//         ["linear"],
//         ["get", "precip"],
//         0, 0,
//         6, 1
//       ],
//       // Increase the heatmap color weight weight by zoom level
//       // heatmap-intensity is a multiplier on top of heatmap-weight
//       "heatmap-intensity": [
//         "interpolate",
//         ["linear"],
//         ["zoom"],
//         0, 1,
//         9, 3
//       ],
//       // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
//       // Begin color ramp at 0-stop with a 0-transparancy color
//       // to create a blur-like effect.
//       "heatmap-color": [
//         "interpolate",
//         ["linear"],
//         ["heatmap-density"],
//         0, "rgba(33,102,172,0)",
//         0.2, "rgb(103,169,207)",
//         0.4, "rgb(209,229,240)",
//         0.6, "rgb(253,219,199)",
//         0.8, "rgb(239,138,98)",
//         1, "rgb(178,24,43)"
//       ],
//       // Adjust the heatmap radius by zoom level
//       "heatmap-radius": [
//         "interpolate",
//         ["linear"],
//         ["zoom"],
//         0, 2,
//         9, 20
//       ],
//       // Transition from heatmap to circle layer by zoom level
//       // "heatmap-opacity": [
//       //   "interpolate",
//       //   ["linear"],
//       //   ["zoom"],
//       //   7, 1,
//       //   9, 0
//       // ],
//     }
//   }, 'waterway-label');
//
//   map.addLayer({
//     "id": "inter-point",
//     "type": "circle",
//     "source": "interpolation",
//     "minzoom": 7,
//     "paint": {
//       // Size circle radius by earthquake precipnitude and zoom level
//       "circle-radius": [
//         "interpolate",
//         ["linear"],
//         ["zoom"],
//         7, [
//           "interpolate",
//           ["linear"],
//           ["get", "precip"],
//           1, 1,
//           6, 4
//         ],
//         16, [
//           "interpolate",
//           ["linear"],
//           ["get", "precip"],
//           1, 5,
//           6, 50
//         ]
//       ],
//       // Color circle by earthquake precipnitude
//       "circle-color": [
//         "interpolate",
//         ["linear"],
//         ["get", "precip"],
//         1, "rgba(33,102,172,0)",
//         2, "rgb(103,169,207)",
//         3, "rgb(209,229,240)",
//         4, "rgb(253,219,199)",
//         5, "rgb(239,138,98)",
//         6, "rgb(178,24,43)"
//       ],
//       "circle-stroke-color": "white",
//       "circle-stroke-width": 1,
//       // Transition from heatmap to circle layer by zoom level
//       "circle-opacity": [
//         "interpolate",
//         ["linear"],
//         ["zoom"],
//         7, 0,
//         8, 1
//       ]
//     }
//   }, 'waterway-label');
//
// })
