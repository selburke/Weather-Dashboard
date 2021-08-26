//Variables

var apiKey = "&appid=0f89b1daad62d8c1625c48e045b4b547";
var searchBtn = document.getElementById("searchBtn");
var city = document.getElementById("city")
var cityCurrent = document.getElementById("cityCurrent");
var temp = document.getElementById("tempBox");
var humidity = document.getElementById("humidityBox");
var wind = document.getElementById("windBox");
var uv = document.getElementById("uvBox");

//Search Button

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  getWeather(city);

//Current Weather

function getWeather(city) {
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + apiKey + "&units=imperial";

//Fetch

fetch(currentURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (currentData) {
        console.log(currentData);
        var currentDate = moment().format("L");

var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentData.coord.lat + "&lon=" + currentData.coord.lon + apiKey;

fetch(uvURL)
    .then(function (response) {
        return response.json();
        })
    .then(function (uvData) {
        console.log(uvData);

var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + apiKey + "&units=imperial";
      
fetch(forecastURL)
    .then(function (response) {
        return response.json();
        })
    .then(function (forecastData) {
        console.log(forecastData);
        var forecastResults = forecastData.list;

// Append

cityCurrent.innerHTML = currentData.name + " " + currentDate;
temp.innerHTML = currentData.main.temp + "°F";
humidity.innerHTML = currentData.main.humidity + "%";
wind.innerHTML = currentData.wind.speed;

uvContent = uvData.current.uvi;
uv.innerHTML = uvContent;

$("#forecast").html("");

for (var i = 0; i < forecastResults.length; i += 8) {
    var forecastDiv = $('<div class="forecastDiv">');

    var dateData = forecastResults[i].dt_txt;
    var formatDate = dateData.substr(0, 10);
    var tempData = forecastResults[i].main.temp;
    var humidityData = forecastResults[i].main.humidity;

    var forecastDate = $('<h5>').text(formatDate);
    var forecastTemp = $('<p>').text(
        "Temperature: " + tempData + "°F"
        );
    var forecastHumidity = $('<p>').text(
        "Humidity: " + humidityData + "%"
        );

    forecastDiv.append(forecastDate);
    forecastDiv.append(forecastTemp);
    forecastDiv.append(forecastHumidity);
    $("#forecast").append(forecastDiv);
    }
    });
    });
});
}

//Local Storage

var cityInput = city.value.trim();
var storeArr = [];
storeArr.push(cityInput);
localStorage.setItem("cityName", JSON.stringify(storeArr));

searchHistory();
});

function searchHistory() {
var lastCity = JSON.parse(localStorage.getItem("cityName"));
var historyDiv = $('<button type="button" class="btn btn-primary" style="width: 100%;"></button>').text(lastCity);
var prevSearch = $("<div>");
prevSearch.append(historyDiv);
$("#searchHistory").prepend(prevSearch);
}