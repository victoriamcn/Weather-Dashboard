
var apiKey = '173d4962b14a682100b481e4cceca14d';
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
            console.log("DATA of geolocation: ", data)
            console.log("lat : ", data[0].lat);
            console.log("lon : ", data[0].lon);
            getForecast(data[0].lat, data[0].lon)
        })
        .catch(function(err) ){
            //reset input
            $('.form-control').val('')
            alert("City not found. Check spelling or search for a city nearby.")
        }
}

// fetching the forecast for the lat/lon
function getForecast(lat, lon) {
    var apiForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    fetch(apiForecastURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log("DATA of forecast: ", data)
            // cityWeather()
        })

    //Call temp, wind, humidity
}

// // Fetching the City Temp
// function fetchCityTemp(temp) {
//     var apiCityTempURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//             // console.log(response)
//             return response.json()
//         })
//         .then(function (data) {
//             console.log("DATA of Temp: ", data)
//             console.log("temp : ", data[0].list);
//         })
// }


//Function to Display Current Conditions
let displayCity = function () {
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    //City Name
    let city = $('.form-control').val().trim();
    geoLocation(city)
    //Temp
    let cityTemp = $('.temperature');

    //Wind
    // let cityWind = $('.wind')
    //Humidity
    // let cityHumidity = $('.humidity')

    //clear before append
    $('#cityweather').empty();
    //$('#cityweather').addClass('currentdate');
    $('#cityweather').append(`<h2 class="currentdate">${today}</h2>`);
    $('#cityweather').append(`<h2 class="city">${city}</h2>`);
    //Icon representing weather conditions
    // $('#cityweather').append()
    //Temperature
    $('#cityweather').append(`<li class="list-group-item temperature">Temperature: ${cityTemp}\u00B0F</li>`);
    //Wind
    $('#cityweather').append(`<li class="list-group-item wind">Wind Speed: ${cityWind} MPH</li>`);
    //Humidity
    $('#cityweather').append(`<li class="list-group-item humidity">Humidity: ${cityHumidity}%</li>`);

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