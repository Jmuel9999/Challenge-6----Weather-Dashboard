
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
const getCityWeather = function() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&limit=1&appid=${openWeatherApiKey}`)
        .then(response => response.json())
        .then((data) => {
            //console.log(data, "it works");
            // Get the lat and long for selectedCity
            let geoDataLat = data[0].lat;
            let geoDataLon = data[0].lon;
            //console.log(geoDataLat, geoDataLon);
        })
}
const renderWeather = function() {
    getCityWeather();
    fetch(`api.openweathermap.org/data/2.5/weather?lat=${geoDataLat}&lon=${geoDataLon}&limit=1&appid=${openWeatherApiKey}`)
        .then((response => response.json))
        .then ((data) => {
             console.log(data)
         //     Grab weather data from the city searched
         //     let temperature = detailsData[1].temp
         //     console.log(temperature);
         })
        //console.log("works");
    // Weather fetch
    // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=41.883228&lon=-87.632401&exclude=minutely,hourly&appid=${openWeatherApiKey}` + cityInput.value)
//         .then(response => response.json())
//         .then((data) => {
//             let temperature = data.current[]
//         })
//         .catch(error => console.error(error));
        // console.log("works")
}

// const showCityWeather = function() {

// }

getCityWeather();

searchBtn.addEventListener("click", getCityWeather);
searchBtn.addEventListener("click", renderWeather);