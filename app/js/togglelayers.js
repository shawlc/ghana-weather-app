var toggleLayers = function(){

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

  var toggleableLayerIds = ['Rain Heatmap','Elevation'];

  for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function(e) {
      var clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
      } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
  }
}

function sourceCallback() {
    // assuming 'map' is defined globally, or you can use 'this'
    if (map.getSource('Elevation-Data') && map.isSourceLoaded('Elevation-Data')) {
        console.log("status = "+ String(status));
        if(status == 0){status = 1}
        if(status == 1){
          toggleLayers()
          status = 2
        }
    }
}
var status = 0
map.on('sourcedata', sourceCallback);
