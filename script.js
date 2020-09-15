// console.log("You can do it!")
$(document).ready(function () {


})

var APIKey = "2585be6037c996f63abad19c6e9a36ea";
var url = "https://api.openweathermap.org/data/2.5/weather?q="
var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat="
//var currentWeatherDiv = $("#Current_Weather");
var cityName = $("#Name");
var currentTemp = $("#Current-Temp");
var humidityEl = $("#Humidity");
var windSpeed = $("#Wind-Speed");
var uvIndex = $("#UV-index");
var fiveDayForecast = $("#Five_Day_Forecast");


$("#SearchCity").on("click", function () {
    console.log("It worked");
    var city = $("#SearchBar").val();
    $.ajax({
        url: url + city + '&appid=' + APIKey,
        method: "GET",
        //dataType: "text",
        success: function (result) {
            //console.log(result);
            cityName.text(result.name);
            currentTemp.text("Temp: " + result.main.temp);
            humidityEl.text("Humidity: " + result.main.humidity + "%");
            windSpeed.text("Wind-Speed: " + result.wind.speed);
            var lat = JSON.stringify(result.coord.lat);
            var long = JSON.stringify(result.coord.lon);
            $.ajax({
                url: fiveDayUrl + lat + '&lon=' + long + '&exclude=current,minutely,hourly&appid=' + APIKey,
                method: 'GET',
                success: function (result) {
                    console.log(result);
                    var importantStuff = result.daily;
                    for(var i = 0; i < (importantStuff.length - 2); i++){
                        console.log(importantStuff[i]);
                    }
                }
            });

        }
    });




});

/*function popFiveDayForecast(fiveDay) {
    // for loop to make cards for five day forecast
    for (var i = 0; i < 5; i++) {
        console.log(fiveDay.daily);
    }

}*/

// ## Acceptance Criteria

// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
