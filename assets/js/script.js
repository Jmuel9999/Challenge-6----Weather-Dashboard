
// Important variables to note:
const openWeatherApiKey = `643d2bf23896d3c3a3c726330b6ea84c`

// Various function variables
//const curWeatherDiv = document.getElementById(`currentCityDiv`)
const forecastDaysDiv = document.getElementById(`forecastDaysDiv`)
const selectedCity = document.getElementById(`selectedCity`)
const cityInput = document.getElementById(`cityInput`)
const curWeatherDisplay = document.getElementById(`curWeatherDisplay`)

// Define variable to save searches to an array
let searchArray = [];

// Search button variable
const searchBtn = document.getElementById(`searchBtn`)

// Fetch function for openweathermap API
const getCity = function() {
    //showRecentSearch();
    //debugger;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&units=imperial&limit=1&appid=${openWeatherApiKey}`)
        .then(response => response.json())
        .then((data) => {
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
                
                // Get date for forecast days
                // Tunred this into a dayjs object
                let firstDay = dayjs.unix(uvData.daily[0].dt).format('MMM D, YYYY')
                // Weather conditions for first forecast card
                let firstDayTemp = uvData.daily[0].temp.max;
                let firstDayWind = uvData.daily[0].wind_speed;
                let firstDayHumidity = uvData.daily[0].humidity;
                // Weather conditions for day 2 forecast
                // Get date for forecast days
                let secondDay = uvData.daily[1].dt
                // Weather conditions for second forecast card
                let secondDayTemp = uvData.daily[1].temp.max;
                let secondDayWind = uvData.daily[1].wind_speed;
                let secondDayHumidity = uvData.daily[1].humidity;
                // Weather conditions for day 3 forecast
                // Get date for forecast days
                let thirdDay = uvData.daily[2].dt
                // Weather conditions for third forecast card
                let thirdDayTemp = uvData.daily[2].temp.max;
                let thirdDayWind = uvData.daily[2].wind_speed;
                let thirdDayHumidity = uvData.daily[2].humidity;
                // Weather conditions for day 4 forecast
                // Get date for forecast days
                let fourthDay = uvData.daily[3].dt
                // Weather conditions for fourth forecast card
                let fourthDayTemp = uvData.daily[3].temp.max;
                let fourthDayWind = uvData.daily[3].wind_speed;
                let fourthDayHumidity = uvData.daily[3].humidity;
                // Weather conditions for day 5 forecast
                // Get date for forecast days
                let fifthDay = uvData.daily[4].dt
                // Weather conditions for fifth forecast card
                let fifthDayTemp = uvData.daily[4].temp.max;
                let fifthDayWind = uvData.daily[4].wind_speed;
                let fifthDayHumidity = uvData.daily[4].humidity;
                // Current weather data
                let cityName = uvData.timezone;
                let uvIndex = uvData.current.uvi;
                let curWeatherIcon = uvData.current.weather.id;
                // Needed to keep these variables with 'data' due to scope of first fetch
                let curTemp = data.main.temp;
                let curWind = data.wind.speed;
                let curHumidity = data.main.humidity;
                displayCurWeather(curTemp, curWind, curHumidity ,uvIndex, curWeatherIcon, cityName);
                // displayForecastOne(firstDay, firstDayTemp, firstDayWind, firstDayHumidity);
                // displayForecastTwo(secondDay, secondDayTemp, secondDayWind, secondDayHumidity);
                // displayForecastThree(thirdDay, thirdDayTemp, thirdDayWind, thirdDayHumidity);
                // displayForecastFour(fourthDay, fourthDayTemp, fourthDayWind, fourthDayHumidity);
                // displayForecastFive(fifthDay, fifthDayTemp, fifthDayWind, fifthDayHumidity);
                // Create cards dynamically
                let innerHTMLString = ``;
                let forecastRow = document.getElementById(`forecast-row`);
                for(let i = 0; i < 5; i++){
                    // Create card HTML
                    innerHTMLString = innerHTMLString + createForecastCard(showForecast(uvData.daily[i]));
                }
                forecastRow.innerHTML = innerHTMLString;
                // Save search result to local storage
                saveToLocalStorage();
            })
        })
}

const showForecast = function(data){
    return{
        //key              value pairs
        cardDate: dayjs.unix(data.dt).format('MMM D, YYYY'),
        temperature: data.temp.max,
        windspeed: data.wind_speed,
        humidity: data.humidity
    }
    // Need dt need .temp.max need .wind_speed need .humidity
}

const createForecastCard = function(dataObj){
    // Deconstruct object
    const {cardDate, temperature, windspeed, humidity} = dataObj
    return `
    <div class="col-sm-2">
        <div class="card-header">${cardDate}</div>
        <ul>
            <li class="list-group-item icon"></li>
            <li class="list-group-item">Temp: ${temperature} °F</li>
            <li class="list-group-item">Wind: ${windspeed} MPH</li>
            <li class="list-group-item">Humidity: ${humidity}%</li>
        </ul>
    </div> `
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

// Second forecast card information
const displayForecastTwo = function(secondDay, secondDayTemp, secondDayWind, secondDayHumidity){
    // Variable definitions for the second card
    let dayTwo = document.getElementById('dayTwo');
    let dayTwoTemp = document.getElementById('dayTwoTemp');
    let dayTwoWind = document.getElementById('dayTwoWind');
    let dayTwoHumidity = document.getElementById('dayTwoHumidity');
    let dayOneIcon = document.getElementById('dayTwoIcon');
    // Appending the forecast day conditions to their divs
    dayTwo.textContent = secondDay;
    //dayOneIcon.src = something????
    dayTwoTemp.textContent = 'Temp: ' + secondDayTemp + '°F';
    dayTwoWind.textContent = 'Wind: ' + secondDayWind + ' MPH';
    dayTwoHumidity.textContent = 'Humidity: ' + secondDayHumidity + '%'; 
}

// Third forecast card information
const displayForecastThree = function(thirdDay, thirdDayTemp, thirdDayWind, thirdDayHumidity){
    // Variable definitions for the third card
    let dayThree = document.getElementById('dayThree');
    let dayThreeTemp = document.getElementById('dayThreeTemp');
    let dayThreeWind = document.getElementById('dayThreeWind');
    let dayThreeHumidity = document.getElementById('dayThreeHumidity');
    let dayThreeIcon = document.getElementById('dayThreeIcon');
    // Appending the forecast day conditions to their divs
    dayThree.textContent = thirdDay;
    //dayOneIcon.src = something????
    dayThreeTemp.textContent = 'Temp: ' + thirdDayTemp + '°F';
    dayThreeWind.textContent = 'Wind: ' + thirdDayWind + ' MPH';
    dayThreeHumidity.textContent = 'Humidity: ' + thirdDayHumidity + '%'; 
}

// Fourth forecast card information
const displayForecastFour = function(fourthDay, fourthDayTemp, fourthDayWind, fourthDayHumidity){
    // Variable definitions for the first card
    let dayFour = document.getElementById('dayFour');
    let dayFourTemp = document.getElementById('dayFourTemp');
    let dayFourWind = document.getElementById('dayFourWind');
    let dayFourHumidity = document.getElementById('dayFourHumidity');
    let dayFourIcon = document.getElementById('dayFourIcon');
    // Appending the forecast day conditions to their divs
    dayFour.textContent = fourthDay;
    //dayOneIcon.src = something????
    dayFourTemp.textContent = 'Temp: ' + fourthDayTemp + '°F';
    dayFourWind.textContent = 'Wind: ' + fourthDayWind + ' MPH';
    dayFourHumidity.textContent = 'Humidity: ' + fourthDayHumidity + '%'; 
}

// Fifth forecast card information
const displayForecastFive = function(fifthDay, fifthDayTemp, fifthDayWind, fifthDayHumidity){
    // Variable definitions for the fifth card
    let dayFive = document.getElementById('dayFive');
    let dayFiveTemp = document.getElementById('dayFiveTemp');
    let dayFiveWind = document.getElementById('dayFiveWind');
    let dayFiveHumidity = document.getElementById('dayFiveHumidity');
    let dayFiveIcon = document.getElementById('dayFiveIcon');
    // Appending the forecast day conditions to their divs
    dayFive.textContent = fifthDay;
    //dayOneIcon.src = something????
    dayFiveTemp.textContent = 'Temp: ' + fifthDayTemp + '°F';
    dayFiveWind.textContent = 'Wind: ' + fifthDayWind + ' MPH';
    dayFiveHumidity.textContent = 'Humidity: ' + fifthDayHumidity + '%'; 
}

const saveToLocalStorage = function(){
    // Get value of city typed in by user
    let searchInput = cityInput.value
    localStorage.setItem(searchInput);
    //console.log()
}



// const showRecentSearch = function(){
//     // Define recent search div
//     let searchHistory = document.getElementById('searchHistory');
//     for(let i = 0; i < searchArray.length; i++){
//         let showSearch = document.createElement('li');
//         console.log(showSearch);
//         // showSearch.innerHTML = searchArray[i];
//         // showSearch.classList = 'text-muted';
//         // searchHistory.appendChild(showSearch);
//     }    
// }

searchBtn.addEventListener("click", getCity);