// console.log("You can do it!")
$(document).ready(function () {


})

var APIKey = "2585be6037c996f63abad19c6e9a36ea";
var url = "https://api.openweathermap.org/data/2.5/weather?q="
var fiveDayUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat="
var cityName = $("#Name");
var currentTemp = $("#Current-Temp");
var humidityEl = $("#Humidity");
var windSpeed = $("#Wind-Speed");
var uvIndex = $("#UV-index");
var fiveDayForecast = $("#Five_Day_Forecast");
var date = new Date();


$("#SearchCity").on("click", function () {
    console.log("It worked");
    var city = $("#SearchBar").val();
    $.ajax({
        url: url + city + '&appid=' + APIKey,
        method: "GET",
       
        success: function (result) {
            console.log(result);
            cityName.text(result.name + " (" + date.toDateString() + ")");
            currentTemp.text("Temp: " + result.main.temp);
            humidityEl.text("Humidity: " + result.main.humidity + "%");
            windSpeed.text("Wind-Speed: " + result.wind.speed);
            var lat = JSON.stringify(result.coord.lat);
            var long = JSON.stringify(result.coord.lon);
            $.ajax({
                url: fiveDayUrl + lat + '&lon=' + long + '&exclude=current,minutely,hourly&appid=' + APIKey,
                method: 'GET',
                success: function (result) {
                  
                    // create 5 day forecast columns to populate and show future weather conditions
                    var weeklyResult = result.daily;
                    for(var i = 0; i < (weeklyResult.length - 3); i++){
                        date.setDate(date.getDate() + 1);
                        var  fiveDayResult = weeklyResult[i];
                        var forecastCol = $("<div>");
                        forecastCol.addClass("col forecast bg-primary text-white ml-3 mb-3 rounded");
                        forecastCol.text(date.toDateString());
                        forecastCol.append($("<img src=" + '"https://openweathermap.org/img/wn/' + fiveDayResult.weather[0].icon + '@2x.png"' + ">"));
                        forecastCol.append($("<p>Temperature: " + fiveDayResult.temp.day + " F" + "</p>"));
                        forecastCol.append($("<p>Humidity: " + fiveDayResult.humidity + "%</p>"));

                        fiveDayForecast.append(forecastCol);
                    }
                }
            });

        }
    });




});
// change kelvin to farenheight
function kelvinConversion (K){
    return Math.floor((K - 273.15) *1.8 + 32);
}
console.log(kelvinConversion)


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
