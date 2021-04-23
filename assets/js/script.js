
// Important variables to note:
const openWeatherApiKey = `643d2bf23896d3c3a3c726330b6ea84c`

// Various function variables
//const curWeatherDiv = document.getElementById(`currentCityDiv`)
const forecastDaysDiv = document.getElementById(`forecastDaysDiv`)
const selectedCity = document.getElementById(`selectedCity`)
const cityInput = document.getElementById(`cityInput`)
const curWeatherDisplay = document.getElementById(`curWeatherDisplay`)

// Search button variable
const searchBtn = document.getElementById(`searchBtn`)

// Fetch function for openweathermap API
const getCity = function() {
    //debugger;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&units=imperial&limit=1&appid=${openWeatherApiKey}`)
        .then(response => response.json())
        .then((data) => {
            //console.log(data, "it works");
            // Get the lat and long for selectedCity
            let geoDataLat = data[0].lat;
            let geoDataLon = data[0].lon;
            // console.log(geoDataLat, geoDataLon);
            renderWeather(geoDataLat, geoDataLon);
            //getUV(geoDataLat, geoDataLon);
            //displayCurWeather();
        })
}

// Pulls the information needed for the current weather of the slected city
const renderWeather = function(param1, param2) {
    // Passing .then to .then only returns whatever was returned prior
    // Check to see if the parameters pass through to renderWeather properly
    //console.log(param1, param2);
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${param1}&lon=${param2}&units=imperial&appid=${openWeatherApiKey}`)      
        .then(response => response.json())
        .then ((data) => {
            // Check API return data
            // console.log(data)
            // data.coord from API documentation
            fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${openWeatherApiKey}`)
            .then(res => res.json())
            .then((uvData) => {
                let cityDate = uvData.timezone;
                let uvIndex = uvData.current.uvi;
                let curWeatherIcon = uvData.current.weather.id;
                // Needed to keep these variables with 'data' due to scope of first fetch
                let curTemp = data.main.temp;
                let curWind = data.wind.speed;
                let curHumidity = data.main.humidity;
                displayCurWeather(curTemp, curWind, curHumidity ,uvIndex, curWeatherIcon, cityDate);
            })
        })
}
// Displays current weather
const displayCurWeather = function(temp, wind, humid, uvi, curWeatherIcon, date) {
    let title = document.getElementById("title");
    let temperature = document.getElementById("temperature");
    let windspeed = document.getElementById("windspeed");
    let humidity = document.getElementById("humidity");
    let uvI = document.getElementById("uvI");

    // Appending the conditions to their rightful divs
    title.textContent = date
    icon.textContent = curWeatherIcon
    temperature.textContent = 'Temp: ' + temp + '°F'
    windspeed.textContent = 'Wind: ' + wind + ' MPH'
    humidity.textContent = 'Humidity: ' + humid + '%'
    // Still need to make the outside change color
    uvI.textContent = 'UV Index: ' + uvi
}

searchBtn.addEventListener("click", getCity);