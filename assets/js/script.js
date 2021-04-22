
// Important variables to note:
const openWeatherApiKey = `643d2bf23896d3c3a3c726330b6ea84c`

// Various function variables
const currentCityDiv = document.getElementById(`currentCityDiv`)
const forecastDaysDiv = document.getElementById(`forecastDaysDiv`)
const selectedCity = document.getElementById(`selectedCity`)
const cityInput = document.getElementById(`cityInput`)

// Search button variable
const searchBtn = document.getElementById(`searchBtn`)

// Fetch function for openweathermap API
const getCity = function() {
    //debugger;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&limit=1&appid=${openWeatherApiKey}`)
        .then(response => response.json())
        .then((data) => {
            //console.log(data, "it works");
            // Get the lat and long for selectedCity
            let geoDataLat = data[0].lat;
            let geoDataLon = data[0].lon;
            // console.log(geoDataLat, geoDataLon);
            renderWeather(geoDataLat, geoDataLon);
            getUV(geoDataLat, geoDataLon);
            displayCurWeather();
        })
}

// Pulls the information needed for the current weather of the slected city
const renderWeather = function(param1, param2) {
    // Check to see if the parameters pass through to renderWeather properly
    //console.log(param1, param2);
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${param1}&lon=${param2}&appid=${openWeatherApiKey}`)      
        .then(response => response.json())
        .then ((data) => {
            // Check API return data
            //console.log(data)
            let curWeatherIcon = data.weather.icon
            let curTemp = data.main.temp;
            let curWind = data.wind.speed;
            let curHumidity = data.main.humidity;
            displayCurWeather(curTemp, curWind, curHumidity);
            //console.log(curWeatherIcon);
        })
}

// Pulls UV index information from API
const getUV = function(param1, param2) {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${param1}&lon=${param2}&exclude=minutely,hourly,daily,alerts&appid=${openWeatherApiKey}`)
        .then(response => response.json())
        .then((data) => {
            let uvIndex = data.current.uvi;
            displayCurWeather(uvIndex);
            // console.log(uvIndex);
        })
}

// Displays current weather
const displayCurWeather = function(temp, wind, humid, uvi,) {
    currentCityDiv.textContent = ``;
    cityInput.textContent = temp;
    // console.log(temp);
    // console.log(wind);
    // console.log(humid);
    // console.log(uvi);
    //console.log(displayCurWeather)
}

searchBtn.addEventListener("click", getCity);