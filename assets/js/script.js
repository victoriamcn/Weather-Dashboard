
var apiKey = '173d4962b14a682100b481e4cceca14d';
//var apiKeyOneCall = '5accacce95343426ef0e8de035c83daf';
var searchedArray = [];

//BEGIN WORKING CODE
//That city is listed individually in the "citiesfromstorage" div
function createSearchHistory(nameofcity) {
    // variable for div#citiesfromstorage
    let savedCityEl = $('#citiesfromstorage');
    //create button with the City
    let savedSearchBtn = $("<button>");
    savedSearchBtn.attr('id', 'historybtn');
    savedSearchBtn.addClass("btn btn-light historybtn");
    $("<button>").text(nameofcity);
    //append savedsearchbtn
    savedCityEl.append(savedSearchBtn);
    localStorage.setItem("search", nameofcity)
    
    $('#historybtn').on('click', function(){
        let fromSearch = $(this).text();
        displayCity(fromSearch);
    })
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
    var apiForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(apiForecastURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (response) {
            console.log("DATA of forecast: ", response)

            //CURRENT ICON
            let iconCodeCurrent = response.list[0].weather[0].icon;
            let iconCurrentURL = 'http://openweathermap.org/img/wn/' + iconCodeCurrent + '.png';
            $('.currentWeatherIcon').attr('src', iconCurrentURL)
            //CURRENT TEMPERATURE
            let currentTemperature = response.list[0].main.temp;
            //CURRENT WIND SPEED
            let currentWind = response.list[0].wind.speed;
            //CURRENT HUMIDITY
            let currentHumidity = response.list[0].main.humidity;

            //APPEND ELEMENTS WITH DATA
            $('#currentstats').innerHTML = `<img class="icon">${iconCodeCurrent}</img>`;
            $('#currentstats').append(`<img class="icon">${iconCodeCurrent}</img>`);
            $('#currentstats').append(`<ul id="currentlist" class="list-group list-group-flush currentlist"></ul>`);
            $('#currentlist').append(`<li class="list-group-item temperature">Temperature: ${currentTemperature}\u00B0F</li>`);
            $('#currentlist').append(`<li class="list-group-item wind">Wind Speed: ${currentWind}mph</li>`);
            $('#currentlist').append(`<li class="list-group-item humidity">Humidity: ${currentHumidity}%</li>`);
    
            //Then Display Five Day Forecast
            // using this lat and lon, display a 5-day forecast 12pm
            let arrayList = response.list;
            for (let i = 0; i < arrayList.length; i++) {
                if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
                    //DATE
                    let futureDate = arrayList.dt_txt;
                    //ICON
                    let iconCodeFuture = arrayList[0].weather[0].icon;
                    let iconFutureURL = `http://openweathermap.org/img/wn/${iconCodeFuture}.png`;
                    $('.futureicon').attr('src', iconFutureURL)
                    //CURRENT TEMPERATURE
                    let futureTemperature = arrayList[0].main.temp;
                    //CURRENT WIND SPEED
                    let futureWind = arrayList[0].wind.speed;
                    //CURRENT HUMIDITY
                    let futureHumidity = arrayList[0].main.humidity;
                    
                    //clear before append
                    $('#cardssection').empty();
                    //create cards
                    $('#cardssection').append(`<div id="card" class="card"></div>`);
                    $('#card').append(`<div id="card-body" class="card-body"></div>`);
                    //DATE
                    $('.card').append(`<h4></h4>`).text(futureDate);
                    //ICON
                    $('.card').append(`<img class="icon">${iconCodeFuture}</img>`);
                    //UL
                    $('#card-body').append(`<ul class="list-group list-group-flush futurelist"></ul>`);
                    //TEMPERATURE
                    $('.futurelist').append(`<li class="list-group-item temperature">Temperature: ${futureTemperature}\u00B0F</li>`);
                    //WIND
                    $('.futurelist').append(`<li class="list-group-item wind">Wind Speen: ${futureWind} mph</li>`);
                    //HUMIDITY
                    $('.futurelist').append(`<li class="list-group-item humidity">Humidity: ${futureHumidity}%</li>`);
                }
            }
        })
};

//Set City to localStorage
function saveSearchedCity(storedata) {
    let citysearched = $('.form-control').val().trim();
    let data = localStorage.getItem('search');
    if (!data) {
        data = storedata;
        localStorage.setItem('search', citysearched);
    } else {
        console.log(data, storedata);
        createSearchHistory(citysearched)
    }
    // if (data.indexOf(nameofcity) === -1) {
    //     data = data + ',' + nameofcity;
    //     localStorage.setItem('search', data);
    // }
}

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
    $('#dateandcity').append(`<h2 class="currentdate">${today}</h2>`);
    $('#dateandcity').append(`<h2 class="city">${city}</h2>`);
    
    saveSearchedCity();
};

//Type a city name then click search
$('#searchbtn').on('click', displayCity);

//Check data in localStorage for any cities
function checkLocalStorage() {
    let storedCity = localStorage.getItem('search');
    if (!storedCity) {
    console.log("No saved data here.");
    } else {
        // let citysearched = $('.form-control').val().trim();

        storedCity.trim();
        searchedArray = storedCity.split(',');
        for (let i = 0; i < searchedArray.length; i++){
            createSearchHistory(searchedArray[i])
        }
    }
}
//when the window loads, check local storage
$(window).load(checkLocalStorage())