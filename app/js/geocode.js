function weatherInfo(darkData, name, lat, lon){

  var staticMap = () => {
    var url = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/url-https%3A%2F%2Fwww.mapbox.com%2Fimg%2Frocket.png("+lon+","+lat+")/"+lon+","+lat+",15/250x250?access_token=pk.eyJ1IjoibGVvc2hhdzU3IiwiYSI6ImNqdDNndm1pZTJhM3Q0NG9zYW41ZzBoNDEifQ.tKNCXe9vMN94CtgABlIjPg"
    $('#static').append("<img id = 'staticmap' src='"+url+"' style=''>")
  //   $.ajax("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/url-https%3A%2F%2Fwww.mapbox.com%2Fimg%2Frocket.png(-76.9,38.9)/-76.9,38.9,15/1000x1000?access_token=pk.eyJ1IjoibGVvc2hhdzU3IiwiYSI6ImNqdDNndm1pZTJhM3Q0NG9zYW41ZzBoNDEifQ.tKNCXe9vMN94CtgABlIjPg").done(function(ajaxResponseValue) {
  // // a function that does some kind of transformation on the response
  //   window.localStorage.setItem(name, JSON.stringify(ajaxResponseValue));
  //   console.log("Stored " + name + " data")
  // // Logging our computed result (within the body of the ajax function
  //   })
  }

  var current = (currentData) => {
    var celsius = (currentData.temperature - 32) * 5/9
    $('#geoinfo').append("<div class='current' style='float:left'>" +  celsius.toFixed(2) + " &deg;C</div>")
    $('#geoinfo').append("<div class='current' style='float:left'>" + currentData.precipIntensity + " mm per hr</div>")
  }

  var nArr = name.split(", ")
  var bottom = nArr.length-4
  if (bottom < 0){bottom = 0}
  var nameArr = nArr.slice(bottom,nArr.length)
  var nameTitle = () => {
    $('#locale').append("<h2 class='name' style='float:left;margin:0px;padding:5px;display:inline'>" +  nArr[0] + "</h2>")
    $('#locale').append("<div class='name' id='nameblock' style='float:left;padding:10px;'></div>")
    for(var i=1;i<nameArr.length;i++){
      $('#nameblock').append("<div class='name' style='font-size:12px;text-align:left;'>" + nameArr[i] +"</div>")
    }
  }


  var cleanup = () => {
    $('#staticmap').remove()
    $('.current').remove()
    $('.name').remove()
  }

  cleanup()
  staticMap()
  nameTitle()
  current(darkData.currently)

}


function chooseAddr(lat1, lng1, lat2, lng2, name) {
  var latc = (lat1+lat2)/2
  var lngc = (lng1+lng2)/2

  markerPoint.features[0].geometry.coordinates = [lngc,latc];
  map.jumpTo({ 'center': [lngc,latc], 'zoom': 14 });
  map.getSource('single-point').setData(markerPoint);


  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiLinkDS = "https://api.darksky.net/forecast/cd3d24ffaea4788204617eadc9619e1d/"+latc+","+lngc+"";

  $.ajax({
    url: proxy + apiLinkDS,
    success:function(data) {
      weatherInfo(data, name, latc, lngc);
      console.log(data);
    }
  });


}

function addr_search() {
    var inp = document.getElementById("addr");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
        var items = [];

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            items.push("<li><a href='#' onclick='chooseAddr(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.display_name + "\");return false;'>" + val.display_name + '</a></li>');
        });

		$('#results').empty();
        if (items.length != 0) {
            $('<p>', { 'id' : "response",html: "Search results:" }).appendTo('#results');
            $('<ul/>', {
                'class': "w3-ul w3-card",
                'id' : "resultlist",
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { 'id' : "response",html: "No results found" }).appendTo('#results');
        }
    });
}
