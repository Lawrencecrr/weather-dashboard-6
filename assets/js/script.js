// when i click the button i get the value from the input
var searchBtn = $("#searchBtn")
console.log(searchBtn)
var apiKey = "d73851b69ba0e6fce9cc19cc026965a8"
searchBtn.click(function() {
var searchValue = $("#searchValue").val()
// console.log(searchValue)
getGeo(searchValue)
})

function getGeo(city) {
    // get city name 
    // run a fetch to get latitude and longitutde from geo coding api
    console.log(city)
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+apiKey
    fetch(geoUrl).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        var lat = data[0].lat
        var long = data[0].lon
        var name = data[0].name
        getWeather(lat,long,name)
    })
}

function getWeather(lat,lon,name){
    var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(weatherUrl).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        var card = $("<div>").addClass("card")
        var cardTitle = $("<h3>").addClass("card-title").text(name)
        $("#weatherContainer").append(card.append(cardTitle))
    })
}