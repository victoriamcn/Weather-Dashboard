
var apiKey = '173d4962b14a682100b481e4cceca14d';
//var apiKeyOneCall = '5accacce95343426ef0e8de035c83daf';
var search = [];

//BEGIN WORKING CODE

//save search history to a list
var loadSearchHistory = function (nameofcity) {
    // variable for div#citiesfromstorage
    let savedCitiesFromStorage = $('#citiesfromstorage');
    //create button with the City
    let savedSearchEntry = $("<button>");
    savedSearchEntry.addClass("btn btn-light historybtn");
    $("<button>").text(nameofcity);

    //append
    savedCitiesFromStorage.append(savedSearchEntry);

    //update search array with past searched cities from local storage
    if (search.length > 0) {
        let searchedCity = localStorage.getItem('search');
        search = JSON.stringify(searchedCity);
        //add searched cities to localStorage
        search.push(nameofcity);
        localStorage.setItem("search", search);
    }

    //load history into the div#citiesfromstorage
    function getSearchHistory() {
        //get from local storage
        let savedSearchFromStorage = localStorage.getItem("search");
        if (!savedSearchFromStorage) {
            return false;
        }

        //array maker
        savedSearchFromStorage = JSON.parse(savedSearchFromStorage);

        //for loop to make a button for each searched city
        for (let i = 0; i < savedSearchFromStorage.length; i++) {
            getSearchHistory(savedSearchFromStorage[i]);
        }
    }
    getSearchHistory()
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

// fetching the forecast for the lat/lon 
function getForecast(lat, lon) {
    var apiForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(apiForecastURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (response) {
            console.log("DATA of forecast: ", response)
                //current date at 12pm [6]

            //CURRENT ICON
            let iconCodeCurrent = response.weather[0].icon;
            let iconCurrentURL = 'http:/ / openweathermap.org / img / w / ' + iconCodeCurrent + '.png'
            //CURRENT TEMPERATURE
            let currentTemperature = data.main.temp;
            //CURRENT WIND SPEED
            let currentWind = data.wind.speed;
            //CURRENT HUMIDITY
            let currentHumidity = data.main.humidity;

            //APPEND ELEMENTS WITH DATA
            $('.currentWeatherIcon').attr('src', iconCurrentURL)
            $('#currentstats').append(`<img class="currentWeatherIcon">${currentWeatherIcon}</img>`);
            $('#currentstats').append(`<li class="list-group-item text-right temperature">Temperature: ${currentTemperature}\u00B0F</li>`);
            $('#currentstats').append(`<li class="list-group-item text-right wind">Wind Speed: ${currentWind} MPH</li>`);
            $('#currentstats').append(`<li class="list-group-item text-right humidity">Humidity: ${currentHumidity}%</li>`);
        })

    // using this lat and lon, display a 5-day forecast
    
}

// let currentWeather = function (city) {
//     let queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
//     //CURRENT ICON
//     // let iconCodeCurrent = response.list.weather[0].icon;
//     // let iconCurrentURL = 'http://openweathermap.org/img/w/' + iconCodeCurrent + '.png'
//     //CURRENT TEMPERATURE
//     let currentTemperature = $('.temperature').val()

//     //CURRENT WIND SPEED
//     let currentWind = $('.wind').val()
//     //CURRENT HUMIDITY
//     let currentHumidity = $('.humidity').val()
// }

// function getCurrentWeather(lat, lon) {
//     var apiOneCallURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}` //&exclude=minutely,hourly,daily,alerts
//     fetch(apiOneCallURL)
//         .then(function (response) {
//             // console.log(response)
//             return response.json()
//         })
//         .then(function (data) {
//             console.log("DATA of current weather: ", data)
//             searchHistory(nameofcity);
//         })
// }

//Function to Display Current Conditions
let displayCity = function () {
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    //City Name
    let city = $('.form-control').val().trim();
    geoLocation(city)

    //clear before append
    $('#cityweather').empty();
    //$('#cityweather').addClass('currentdate');
    $('#cityweather').append(`<h2 class="currentdate">${today}</h2>`);
    $('#cityweather').append(`<h2 class="city">${city}</h2>`);

    loadSearchHistory()
}



//Type a city name then click search
$('#searchbtn').on('click', displayCity);



    //Function to Display Five Day Forecast
    // let displayFiveDay = function(){}
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