
let apiKey = '173d4962b14a682100b481e4cceca14d';

//BEGIN WORKING CODE
// fetching the lat/lon 
function geoLocation(nameofcity) {
    var apiCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${nameofcity}&limit=1&appid=${apiKey}`
    fetch(apiCityURL)
        .then(function (response) {
            // if (!response.ok) {
            //     throw new Error(`HTTP error: ${response.status}`);
            // }
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
    var apiForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(apiForecastURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (response) {
            console.log("DATA of forecast: ", response)

            let iconcode = response.list[0].weather[0].icon;
            let iconURL = 'http://openweathermap.org/img/wn/' + iconcode + '.png';
            let temperature = response.list[0].main.temp;
            let wind = response.list[0].wind.speed;
            let humidity = response.list[0].main.humidity;

            //APPEND ELEMENTS WITH DATA
            $('#currentstats').append(`<img class="icon" src="${iconURL}"></img>`);
            $('#currentstats').append(`<ul id="currentlist" class="list-group list-group-flush currentlist"></ul>`);
            $('#currentlist').append(`<li class="list-group-item temperature">Temperature: ${temperature}\u00B0F</li>`);
            $('#currentlist').append(`<li class="list-group-item wind">Wind Speed: ${wind}mph</li>`);
            $('#currentlist').append(`<li class="list-group-item humidity">Humidity: ${humidity}%</li>`);

            // NEXT FIVE DAYS
            for (let i = 1; i <= 5; i++) {
                // if (response.list[i].dt_txt.split(' ')[1] === '12:00:00') { }
                let futureDate = dayjs().add(i, 'day').format('dddd, MM/DD/YYYY');
                console.log(futureDate);
                let iconcodefuture = response.list[i * 5].weather[0].icon;
                let iconURLfuture = 'http://openweathermap.org/img/wn/' + iconcodefuture + '.png';
                let futureTemperature = response.list[i * 5].main.temp;
                let futureWind = response.list[i * 5].wind.speed;
                let futureHumidity = response.list[i * 5].main.humidity;

                // //clear before append
                // $('#fiveday').empty();
                // .forEach
                //CREATE THE FORECAST CARDS
                // $('#cardssection').append(`<div id="card" class="card"></div>`);
                $('#fiveday').append(`<div id="forecastcard" class="col-sm-8 forecastcard"></div>`);
                $('#forecastcard').append(`<p class ="date">${futureDate}</p>`);
                $('#forecastcard').append(`<img src="${iconURLfuture}"></img>`);
                //FORECAST
                $('#forecastcard').append(`<p class="temperature">Temperature: ${futureTemperature}\u00B0F</p>`);
                $('#forecastcard').append(`<p class="wind">Wind Speed: ${futureWind} mph</p>`);
                $('#forecastcard').append(`<p class="humidity">Humidity: ${futureHumidity}%</p>`);
            }
        })
};



//Function to Display Current Conditions
function displayCity() {
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    //City Name
    let city = $('.form-control').val().trim();
    console.log(city)
    geoLocation(city)

    //clear before append
    $('#dateandcity').empty();
    //$('#cityweather').addClass('currentdate');
    $('#dateandcity').append(`<h2 class="currentdate">${today}</h2>`);
    $('#dateandcity').append(`<h2 class="city">${city}</h2>`);


    //That city is listed individually in the "citiesfromstorage" div
    function createSearchHistory() {
        let searchedCity = $('.form-control').val().trim();
        //Container for the search history
        let containerEl = $('#citiesfromstorage');

        //Set City to localStorage
        let storedData = JSON.parse(localStorage.getItem('searchedArray'));
        if (storedData === null) {
            storedData = []
        }
        if (!storedData.includes(searchedCity)) {
            storedData.push(searchedCity)
        }
        localStorage.setItem('searchedCity', JSON.stringify(storedData));

        for (let i = 0; i < storedData.length; i++) {
            containerEl.append(`<button type="button" id="historybtn" class="col historybtn">${storedData[i]}</button>`);
        }

    }

    createSearchHistory();
};

//Type a city name then click search
$('#searchbtn').on('click', displayCity);


//Check data in localStorage for any cities
function checkLocalStorage() {
    let storedCity = JSON.parse(localStorage.getItem('searchedArray'));
    console.log(storedCity)
    // if (storedCity != null) {
    //     for (let i = 0; i < storedCity.length; i++) {
    //         $('#citiesfromstorage').append(`<button type="button" id="historybtn" class="col historybtn">${storedCityObj[i]}</button>`);
    //         // Click search history list and then display
    //         $('#historybtn').on('click', function () {
    //             let clickedCity = $(this).val();
    //             displayCity(clickedCity);
    //         });
    //     }
    // } else {
    //     storedCity = []
    // }
}

$('window').on('load', checkLocalStorage)


