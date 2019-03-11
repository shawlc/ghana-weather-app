
var getWeatherData = function(name, idVal) {
    $.ajax("http://api.openweathermap.org/data/2.5/weather?id="+idVal+"&APPID=cbc32ce70a7e7195d25c0083ef418511").done(function(ajaxResponseValue) {
    // a function that does some kind of transformation on the response
    window.localStorage.setItem(name, JSON.stringify(ajaxResponseValue));
    console.log("Stored " + name + " data")
    // Logging our computed result (within the body of the ajax function
    })
}

var updateLiveData = function(){

    var currentTime = new Date();
    console.log("Current time is " + currentTime)
    var oneMin = 60 * 1000

    var lastTime = moment(window.localStorage.getItem("lastTime")).toDate()

    if(currentTime - lastTime > oneMin){
      window.localStorage.setItem('lastTime', currentTime);
      console.log("Updating OpenWeatherMap Data!")

      _.each(ghanaCities["features"], function(city){
        getWeatherData(city["properties"]["name"],city["properties"]["id"])
      })
    }
    console.log("Stored time is " + window.localStorage.getItem("lastTime"))
}

var joinCachedData = function(){

  _.each(ghanaCities["features"], function(city){

    var cityName = city["properties"]["name"]
    var cityStorage = window.localStorage.getItem(cityName)

    city.properties.value = JSON.parse(cityStorage)

  })

}

updateLiveData()
joinCachedData()
