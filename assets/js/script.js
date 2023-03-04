
var apiKey = '173d4962b14a682100b481e4cceca14d';
//var apiKeyOneCall = '5accacce95343426ef0e8de035c83daf';
var search = [];

//BEGIN WORKING CODE

//save search history to a list
var searchHistory = function(cityName) {
    // variable for div#citiesfromstorage
    let savedCitiesFromStorage = $('#citiesfromstorage');
    //create button with the City
    let savedSearchEntry = $("<button>");
    savedSearchEntry.addClass("historybtn");
    savedSearchEntry.textContent(cityName);

    //append
    savedCitiesFromStorage.append(savedSearchEntry);

    //update search array with past searched cities from local storage
    if (search.length > 0 ){
        let searchedCity = localStorage.getItem('searches');
        search = JSON.parse(searchedCity);
    }
    
    //add searched cities to localStorage
    search.push(cityName);
    localStorage.setItem("search", JSON.stringify(search));

    //load history into the div#citiesfromstorage
    function loadSearchHistory() {
        //get from local storage
        let savedSearchFromStorage =localStorage.getItem("search");
        if(!savedSearchFromStorage){
            return false;
        }

        //array maker
        savedSearchFromStorage = JSON.parse(savedSearchFromStorage);

        //for loop to make a button for each searched city
        for (let i = 0; i<savedSearchFromStorage.length; i++) {
            searchHistory(savedSearchFromStorage[i]);
        }
    }

}



// fetching the lat/lon 
function geoLocation(nameofcity) {
    var apiCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${nameofcity}&limit=1&appid=${apiKey}`
    fetch(apiCityURL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
              }
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log("DATA of geolocation: ", data)
            console.log("lat : ", data[0].lat);
            console.log("lon : ", data[0].lon);
            getForecast(data[0].lat, data[0].lon)
            // getCurrentWeather(data[0].lat, data[0].lon)
        })
}

// fetching the forecast for the lat/lon and can use function to loop the 5 day future forecast
function getForecast(lat, lon) {
    var apiForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyOneCall}`;
    fetch(apiForecastURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log("DATA of forecast: ", data)
            // getCurrentWeather(data[0].current[4].temp); //temp, zero-index 3
            // getCurrentWeather(data[0].current[4].wind); //wind, zero-index 11
            // getCurrentWeather(data[0].current[4].humidity); //humidity, zero-index 6
            // getCurrentWeather(data[0].current[4].weather[13].icon); //weather zero-index 13 to access the icon
        })
//when loaded, display search history
}

function getCurrentWeather(lat, lon) {
     var apiOneCallURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}` //&exclude=minutely,hourly,daily,alerts
     fetch(apiOneCallURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log("DATA of current weather: ", data)
        })
}

//Function to Display Current Conditions
let displayCity = function () {
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    //City Name
    let city = $('.form-control').val().trim();
    geoLocation(city)

    let weatherIcon

    //Function to Display Five Day Forecast
    // let displayFiveDay = function(){}

    //clear before append
    $('#cityweather').empty();
    //$('#cityweather').addClass('currentdate');
    $('#cityweather').append(`<h2 class="currentdate">${today}</h2>`);
    $('#cityweather').append(`<h2 class="city">${city}</h2>`);
    
    //Icon
    $('#currentstats').append(`<i class="weathericon">${weatherIcon}</i>`);
    //Temperature
    $('#currentstats').append(`<li class="list-group-item text-right temperature">Temperature: ${currentTemperature}\u00B0F</li>`);
    //Wind
    $('#currentstats').append(`<li class="list-group-item text-right wind">Wind Speed: ${currentWind} MPH</li>`);
    //Humidity
    $('#currentstats').append(`<li class="list-group-item text-right humidity">Humidity: ${currentHumidity}%</li>`);
}



//Type a city name then click search
$('#searchbtn').on('click', displayCity);

//Display Five-Day Forecast
// let fiveDayForecastDiv = function(){

// }

        //Each Forecast will Have:
            //City Name
            //Current Date
            //Icon with representing weather conditions
                //Temperature
                //Wind
                //Humidity

//That city is added to localStorage

//That city is displayed individually in the "citiesfromstorage" div

//Click city "searchhistory" btn
    //Display the city current and future weather again