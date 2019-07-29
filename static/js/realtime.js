var ghanaCities
var burkinaCities

var getWeatherData = function(urlpath) {
    $.ajax(
      {
        url : urlpath,
        async:false
    }).done(function(ajaxResponseValue) {

      if(urlpath == "/weatherghana"){
        ghanaCities = JSON.parse(ajaxResponseValue)
        }
      else if(urlpath == "/weatherburkina"){
        burkinaCities = JSON.parse(ajaxResponseValue)
        }

    })
}


getWeatherData("/weatherghana")
getWeatherData("/weatherburkina")

var allCities = ghanaCities

allCities["features"].push(...burkinaCities["features"])
