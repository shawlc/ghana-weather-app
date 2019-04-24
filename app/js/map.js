var serveGeotiff = function() {
    elev_geoURL = "http://localhost:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=geotiff:elevation&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=image/png&TILECOL={x}&TILEROW={y}"
    // land_geoURL = "http://localhost:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=geotiff:landcover&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=image/png&TILECOL={x}&TILEROW={y}"

    // map.addSource('Landcover-Data', {
    //   'type': 'raster',
    //   'tiles': [
    //     land_geoURL
    //   ],
    //   'tileSize': 256
    // });

    map.addSource('Elevation-Data', {
      'type': 'raster',
      'tiles': [
        elev_geoURL
      ],
      'tileSize': 256
    });

    // map.addLayer({
    // 'id': 'Landcover',
    // 'type': 'raster',
    // 'source': 'Landcover-Data',
    // 'paint': {}
    // });

    map.addLayer({
    'id': 'Elevation',
    'type': 'raster',
    'source': 'Elevation-Data',
    'paint': {}
    });

}

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

  var makeMarker = function(stringHTML) {
    return new mapboxgl.Marker(elem)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({
        }) // add popups
        .setHTML(stringHTML))
      .addTo(map);
  }

  // create a HTML element for each feature
  if (marker.properties.country == "GH"){
  var elem = document.createElement('img');
  elem.src = "http://openweathermap.org/img/w/" + marker.properties.value.weather[0].icon + ".png"

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

  //toggleLayers()
  serveGeotiff()
})
