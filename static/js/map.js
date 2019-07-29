
// var mapRender = function(interpolation){

// var serveGeotiff = function(vol) {
//     elev_geoURL = "/"+vol
//
//     map.addSource('Flood-Data', {
//       'type': 'raster',
//       'tiles': [
//         elev_geoURL
//       ],
//       'tileSize': 256
//     });
//
//     map.addLayer({
//     'id': 'Flood Model',
//     'type': 'raster',
//     'source': 'Flood-Data',
//     'paint': {}
//     });
// }

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

allCities.features.forEach(function(marker) {

  var makeMarker = function(stringHTML) {
    return new mapboxgl.Marker(elem)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({
        }) // add popups
        .setHTML(stringHTML))
      .addTo(map);
  }

  // create a HTML element for each feature
  if (marker.properties.country == "GH" || marker.properties.country == "BF"){
  var elem = document.createElement('img');
  elem.src = "https://openweathermap.org/img/w/" + marker.properties.value.weather[0].icon + ".png"

  // make a marker for each feature and add to the map
  var weatherDesc = capitalize(marker.properties.value.weather[0].description)
  var tempCelsius = String(parseInt(parseFloat(marker.properties.value.main.temp) - 273.15)) + " &deg;C"
  var iconMarker = ""

  if(marker.properties.value.rain){
    iconMarker = makeMarker('<h4>' + marker.properties.name + '</h4><p>' + tempCelsius + " : " + weatherDesc + '</p><p>' + marker.properties.value.rain["3h"] + " mm of rain" + '</p>')
  }
  else{
    makeMarker('<h4>' + marker.properties.name + '</h4><p>' + tempCelsius + " : " + weatherDesc + '</p>')
  }
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

    map.addSource('interpolation', {
      "type": "geojson",
      "data": interpolation
    });

    map.loadImage('https://i.imgur.com/FZZtcXI.png', function(error, image) {
      if (error) throw error;
      map.addImage('nsuicon', image);
      map.addLayer({
        "id": "iconlayer",
        "type": "symbol",
        "source": "single-point",
        "layout": {
          "icon-image": "nsuicon",
          "icon-size": 1
        },
        "minzoom": 10
      });
    });

    map.addLayer({

      "id": "Rain Heatmap",
      "type": "heatmap",
      "source": "interpolation",
      "paint": {
        // Increase the heatmap weight based on frequency and property precipitation
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "precip"],
          0, 0,
          6, 1
        ],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "rgb(103,169,207)",
          0.4, "rgb(209,229,240)",
          0.6, "rgb(253,219,199)",
          0.8, "rgb(239,138,98)",
          1, "rgb(178,24,43)"
        ],
      }
    });

    map.addSource('gridmap', {
      "type": "geojson",
      "data": clayGrid
    });

    map.addLayer({
      'id': 'Flood Vulnerability',
      'type': 'fill',
      'source': 'gridmap',
      'layout': {},
      'paint': {'fill-color': [
    'interpolate',
    ['linear'],
    ['get', 'perc_clay'],
    0, '#F2F12D',
    5, '#EED322',
    10, '#E6B71E',
    15, '#DA9C20',
    20, '#CA8323',
    25, '#B86B25',
    30, '#A25626',
    35, '#8B4225',
    40, '#723122'
  ],
  'fill-opacity': 0.75
  }
    });

    map.addSource('Bagre Dam', {
      "type": "geojson",
      "data": bagreDam
    });

    map.addLayer({
    'id': 'Bagre Dam Watershed',
    'type': 'fill',
    'source': 'Bagre Dam',
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
      }
    });

  // When a click event occurs on a feature in the states layer, open a popup at the
  // location of the click, with description HTML from its properties.
  map.on('click', 'Flood Vulnerability', function(e) {
    // console.log(e.features[0].properties.perc_clay)
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<p>' + e.features[0].properties.perc_clay + '% Clay<p>')
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'Flood Vulnerability', function() {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'Flood Vulnerability', function() {
    map.getCanvas().style.cursor = '';
  });

  // When a click event occurs on a feature in the states layer, open a popup at the
  // location of the click, with description HTML from its properties.
  map.on('click', 'Bagre Dam Watershed', function(e) {
    // console.log(e.features[0].properties.perc_clay)
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<p>Volume of Water to Bagre Dam : '+totvol.toFixed(2)+' cubic meters<p><p>Average Precipitation in Bagre Dam Watershed : '+avgprecip.toFixed(2)+' mm<p>')
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'Bagre Dam Watershed', function() {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'Bagre Dam Watershed', function() {
    map.getCanvas().style.cursor = '';
  });


  toggleLayers()
})

// }
