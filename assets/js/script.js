
// Important variables to note:
const openWeatherApiKey = `643d2bf23896d3c3a3c726330b6ea84c`

// Various function variables
const curWeatherDiv = document.getElementById(`currentCityDiv`)
const forecastDaysDiv = document.getElementById(`forecastDaysDiv`)
const selectedCity = document.getElementById(`selectedCity`)
const cityInput = document.getElementById(`cityInput`)
const curWeatherDisplay = document.getElementById(`curWeatherDisplay`)

// Search button variable
const searchBtn = document.getElementById(`searchBtn`)

// Fetch function for openweathermap API
const getCity = function() {
    //debugger;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&metric=imperial&limit=1&appid=${openWeatherApiKey}`)
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
    // Check to see if the parameters pass through to renderWeather properly
    //console.log(param1, param2);
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${param1}&lon=${param2}&appid=${openWeatherApiKey}`)      
        .then(response => response.json())
        .then ((data) => {
            // Check API return data
            // console.log(data)
            // data.coord from API documentation
            fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,daily,alerts&appid=${openWeatherApiKey}`)
            .then(res => res.json())
            .then((uvData) => {
                let uvIndex = uvData.current.uvi;
                let curWeatherIcon = data.weather.icon
                let curTemp = data.main.temp;
                let curWind = data.wind.speed;
                let curHumidity = data.main.humidity;
                displayCurWeather(curTemp, curWind, curHumidity ,uvIndex, curWeatherIcon);
            })
        })
}
// Displays current weather
const displayCurWeather = function(temp, wind, humid, uvi, curIcon) {
    const weatherArray = [temp, wind, humid, uvi, curIcon];
    for(var i = 0; i < weatherArray.length; i++){
        const conditionName = weatherArray[i]
        // create container for each condition
        const weatherArrayEl = document.createElement("div")

        const condEl = document.createElement("span")
        condEl.textContent = conditionName

        
        //console.log(weatherArrayEl)
    }
    
    // curWeatherDisplay.textContent = curIcon;
    // curWeatherDisplay.textContent = temp;
    // curWeatherDisplay.textContent = wind;
    // curWeatherDisplay.textContent = humid;
    // curWeatherDisplay.textContent = uvi;
}

searchBtn.addEventListener("click", getCity);