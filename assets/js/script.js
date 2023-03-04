
var apiKey = '173d4962b14a682100b481e4cceca14d';
//var apiKeyOneCall = '5accacce95343426ef0e8de035c83daf';
var savedSearch = [];

//BEGIN WORKING CODE
// fetching the lat/lon 
function geoLocation(nameofcity) {
    var apiCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${nameofcity}&limit=1&appid=${apiKey}`
    fetch(apiCityURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            // console.log("DATA of geolocation: ", data)
            // console.log("lat : ", data[0].lat);
            // console.log("lon : ", data[0].lon);
            getForecast(data[0].lat, data[0].lon)
            // getCurrentWeather(data[0].lat, data[0].lon)
        })
        .catch(function (err) {
            //reset input
            $('.form-control').val('')
            alert("City not found. Check spelling or search for a city nearby.")
        })
}

// fetching the forecast for the lat/lon and can use function to loop the 5 day future forecast
function getForecast(lat, lon) {
    var apiForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
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

    //Call temp, wind, humidity
}

function getCurrentWeather(q) {
     var apiOneCallURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + q + "&limit=5&appid=" + apiKey;
     fetch(apiOneCallURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            // console.log("DATA of current weather: ", data)
        })
}

//Function to Display Current Conditions
let displayCity = function () {
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    //City Name
    let city = $('.form-control').val().trim();
    geoLocation(city)

    //Function to Display Five Day Forecast
    // let displayFiveDay = function(){}

    //clear before append
    $('#cityweather').empty();
    //$('#cityweather').addClass('currentdate');
    $('#cityweather').append(`<h2 class="currentdate">${today}</h2>`);
    $('#cityweather').append(`<h2 class="city">${city}</h2>`);

    //Temp
    let currentTemperature = $('.temperature');
    getCurrentWeather(currentTemperature)
    //Wind
    let currentWind = $('.wind')
    getCurrentWeather(currentWind)
    //Humidity
    let currentHumidity = $('.humidity')
    getCurrentWeather(currentHumidity)

    //Icon representing weather conditions
    let weatherIcon = $('.weathericon')
    getCurrentWeather(weatherIcon)
    
    //Icon
    $('#currentstats').append(`<i class="weathericon">${weatherIcon}\u00B0F</i>`);
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