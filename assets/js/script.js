
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
}
// fetching the forecast for the lat/lon
function getForecast(lat, lon) {
    var apiForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(apiForecastURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log("DATA of forecast: ", data)

        })
}

//Function to Display Current Conditions
let displayCity = function () {
    //City Name

    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={apiKey}
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    let city = $('.form-control').val()
    geoLocation(city)

    //clear before append
    $('#cityweather').empty();
    //$('#cityweather').addClass('currentdate');
    $('#cityweather').append(`<h2 class="currentdate">${today}</h2>`);
    $('#cityweather').append(`<h2 class="city">${city}</h2>`);



    //Icon with representing weather conditions

    //Temperature
    //Wind
    //Humidity
}

//Type a City and CLICK "searchbtn"
$('#searchbtn').on('click', displayCity);

    //Display Five-Day Forecast
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