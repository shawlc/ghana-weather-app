var toggleLayers = function(){



  var toggleableLayerIds = ['Rain Heatmap'];

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

// function sourceCallback() {
//     // assuming 'map' is defined globally, or you can use 'this'
//     if (map.getSource('Elevation-Data') && map.isSourceLoaded('Elevation-Data')) {
//         console.log("status = "+ String(status));
//         if(status == 0){status = 1}
//         if(status == 1){
//           toggleLayers()
//           status = 2
//         }
//     }
// }
// var status = 0
