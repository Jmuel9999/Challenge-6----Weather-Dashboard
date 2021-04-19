
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
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=41.883228&lon=-87.632401&exclude=minutely,hourly&appid=${openWeatherApiKey}` + cityInput.value)
//         .then(response => response.json())
//         .then((data) => {
//             let temperature = data.current[]
//         })
//         .catch(error => console.error(error));
        console.log("works")
}

const showCityWeather = function() {

}

getCityWeather();

searchBtn.addEventListener("click", getCityWeather);






// Challenge 6 Weather Dashboard
//      1 Make sure page loads
//      2 Create input form
//      -	create id for the input (city id)
//      -	create search button
// 3 write function to extract the data from the city input
//      4 “Clean” the data from the city input (take away spacing, meets API requirements)
//      5 Make AJAX call to API’s url (look at the API’s docs to make the AJAX call)
//      6 Get data back, parse through the data. 
//      -	look for dot notation to get what I need
//      7 **5dayforcastdiv**Create a div on the landing page that is going to hold the data (landing spot for info)
//      -	make special ID for this div
//      8**currentforecast** Create another div for current weather conditions
//      -	make special ID 
// -	city name, date, icon representing weather conditions, temperature, wind speed, UV index
// 9 create function that uses conditions (eventListener) and a conditional (if) for favorable, moderate, and severe – 3 different colors for uv
//      10 Create another div for “search history”
// 11 create function to store search in localStorage
// 12 create function to retrieve search history from local storage
// 13 create buttons for each search history item (loops)
// 14 Store current weather data in local storage, “drill into the data”
