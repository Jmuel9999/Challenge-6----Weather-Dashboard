
// Important variables to note:
const openWeatherApiKey = `643d2bf23896d3c3a3c726330b6ea84c`;

// Various function variables
//const curWeatherDiv = document.getElementById(`currentCityDiv`)
const forecastDaysDiv = document.getElementById(`forecastDaysDiv`);
const selectedCity = document.getElementById(`selectedCity`);
const cityInput = document.getElementById(`cityInput`);
const curWeatherDisplay = document.getElementById(`curWeatherDisplay`);
const recentSearchBtns = document.querySelector(`#recentSearchButtons`);

// Search button variable
const searchBtn = document.getElementById(`searchBtn`);

// Define variable to save searches to an array
let searchArray = [];

// Display recent searches as clickable links
const showRecentSearch = function(){
    // Define recent search div
    let searchHistory = document.getElementById('searchHistory');
    // Clear the innerHTML between searches to only add the most recent search to the array
    searchHistory.innerHTML = '';
    for(let i = 0; i < searchArray.length; i++){
        // Create a button named after last city that was searched
        let showSearch = document.createElement('button');
        // The city searched will be shown in the button
        showSearch.innerHTML = searchArray[i];
        // Add styling to the created search history value
        showSearch.classList = 'btn btn-primary';
        // Attach recent search to specified div to be used for user
        searchHistory.appendChild(showSearch);
        // showSearch.onclick = function(){
        //     getCity();
        // }
    }    
}

const saveToLocalStorage = function(){
    // Get value of city typed in by user
    let searchInput = cityInput.value
    // Check to see if array has room
    if(searchArray.length < 5){
        // Push the search value into the search array
        searchArray.push(searchInput);
        // Update localStorage, 'stringify' puts the searches into the searchArray in ['X', 'Y', 'Z'] format
        localStorage.setItem('City Name', JSON.stringify(searchArray));
    }
    // Like saying: if ^ happens, then THIS, 'else if' (otherwise) if (below) happens, THIS
    else if(searchArray.length >= 5){
        // Attach value to searchArray, i+1
        searchArray.push(searchInput);
        // Drop the first value in array to make room for the new one
        searchArray.shift();
        localStorage.setItem('City Name', JSON.stringify(searchArray));
    }
}  

const getLocalStorage = function(){
    // Define variable for getting a recent search from local storage
    let recentSearch = JSON.parse(localStorage.getItem('City Name'));
    // If the local storage is empty, show nothing in Recent Searches
    if (recentSearch !== null && recentSearch !== undefined) {
        searchArray = recentSearch;
    // If the local storage has searched City Names, pull the data and show it in Recent Searches
    } else {
        localStorage.setItem('City Name', JSON.stringify(searchArray));
    }
    showRecentSearch();
}

// Call any recent searches
getLocalStorage();

// Fetch function for openweathermap API
const getCity = function() {
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
                // Turned this into a dayjs object
                let firstDay = dayjs.unix(uvData.daily[0].dt).format('MMM D, YYYY')
                // Current weather data
                let cityName = uvData.timezone;
                let uvIndex = uvData.current.uvi;
                let curWeatherIcon = uvData.current.weather.id;
                // Needed to keep these variables with 'data' due to scope of first fetch
                let curTemp = data.main.temp;
                let curWind = data.wind.speed;
                let curHumidity = data.main.humidity;
                displayCurWeather(curTemp, curWind, curHumidity ,uvIndex, curWeatherIcon, cityName);
                // Define empty string to use for forecast cards
                let innerHTMLString = ``;
                // The div to put the created cards
                let forecastRow = document.getElementById(`forecast-row`);
                for(let i = 0; i < 5; i++){
                    // Create card HTML --> display the conditions by creating the day's card and pairing it with the proper info in the daily array
                    innerHTMLString = innerHTMLString + createForecastCard(showForecast(uvData.daily[i]));
                }
                // Put information from functions into the div 'forecastRow'
                forecastRow.innerHTML = innerHTMLString;
                // Save search result to local storage
                saveToLocalStorage();
                showRecentSearch();
            })
        })
        .catch(err => console.error(err));
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
    //icon.src = curWeatherIcon
    temperature.textContent = 'Temp: ' + temp + '°F'
    windspeed.textContent = 'Wind: ' + wind + ' MPH'
    humidity.textContent = 'Humidity: ' + humid + '%'
    // Still need to make the outside change color
    uvI.textContent = 'UV Index: ' + uvi
}

searchBtn.addEventListener('click', getCity);