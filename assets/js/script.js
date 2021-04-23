
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
            //forecastFetch();
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
            fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${openWeatherApiKey}`)
            .then(res => res.json())
            .then((uvData) => {
                let firstDay = uvData.daily[0].dt
                // Weather conditions for the forecast days
                let firstDayTemp = uvData.daily[0].temp.max;
                let firstDayWind = uvData.daily[0].wind_speed;
                let firstDayHumidity = uvData.daily[0].humidity;

                let cityName = uvData.timezone;
                let uvIndex = uvData.current.uvi;
                let curWeatherIcon = uvData.current.weather.id;
                // Needed to keep these variables with 'data' due to scope of first fetch
                let curTemp = data.main.temp;
                let curWind = data.wind.speed;
                let curHumidity = data.main.humidity;
                displayCurWeather(curTemp, curWind, curHumidity ,uvIndex, curWeatherIcon, cityName);
                displayForecast(firstDay, firstDayTemp, firstDayWind, firstDayHumidity);
            })
        })
}
// Displays current weather
const displayCurWeather = function(temp, wind, humid, uvi, curWeatherIcon, cityName) {
    let icon = document.getElementById("icon");
    let title = document.getElementById("title");
    let temperature = document.getElementById("temperature");
    let windspeed = document.getElementById("windspeed");
    let humidity = document.getElementById("humidity");
    let uvI = document.getElementById("uvI");

    // Appending the conditions to their rightful divs
    title.textContent = cityName
    icon.src = curWeatherIcon
    temperature.textContent = 'Temp: ' + temp + '°F'
    windspeed.textContent = 'Wind: ' + wind + ' MPH'
    humidity.textContent = 'Humidity: ' + humid + '%'
    // Still need to make the outside change color
    uvI.textContent = 'UV Index: ' + uvi
}

// Pulls 5 day forecast
// const forecastFetch = function(){
//     fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${openWeatherApiKey}`)
// }

// Displays next 5 days of weather
const displayForecast = function(){
    displayForecastOne();
    console.log(displayForecastOne, 'works')
}

// First forecast card information
const displayForecastOne = function(firstDay, firstDayTemp, firstDayWind, firstDayHumidity){
    // Variable definitions for the first card
    let dayOne = document.getElementById('dayOne');
    let dayOneTemp = document.getElementById('dayOneTemp');
    let dayOneWind = document.getElementById('dayOneWind');
    let dayOneHumidity = document.getElementById('dayOneHumidity');
    let dayOneIcon = document.getElementById('dayOneIcon');
    // Appending the forecast day conditions to their divs
    dayOne.textContent = firstDay;
    //dayOneIcon.src = something????
    dayOneTemp.textContent = 'Temp: ' + firstDayTemp + '°F';
    dayOneWind.textContent = 'Wind: ' + firstDayWind + ' MPH';
    dayOneHumidity.textContent = 'Humidity: ' + firstDayHumidity + '%'; 
}


searchBtn.addEventListener("click", getCity);