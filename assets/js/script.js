
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

            for (let i = 0; i < 5; i++) {
                if (response.list[i].dt_txt.split(' ')[i] === '12:00:00') {
                    //DATE
                    let futureDate = dayjs().add(i, 'day').format('dddd, MM/DD/YYYY');
                    let iconcodefuture = response.list[i].weather.icon;
                    let iconURLfuture = 'http://openweathermap.org/img/wn/' + iconcodefuture + '.png';
                    let futureTemperature = response.list[i].main.temp;
                    let futureWind = response.list[i].wind.speed;
                    let futureHumidity = response.list[i].main.humidity;

                    // //clear before append
                    // $('#cardssection').empty();

                    //CREATE THE FORECAST CARDS
                    $('#cardssection').append(`<div id="card" class="card"></div>`);
                    $('#card').append(`<div id="card-body" class="card-body"></div>`);
                    $('.card').append(`<h4>${futureDate}</h4>`);
                    $('.card').append(`<img src="${iconURLfuture}"></img>`);
                    //CREATE UL for the Forecast
                    $('#card-body').append(`<ul class="list-group list-group-flush futurelist"></ul>`);
                    //FORECAST
                    $('.futurelist').append(`<li class="list-group-item temperature">Temperature: ${futureTemperature}\u00B0F</li>`);
                    $('.futurelist').append(`<li class="list-group-item wind">Wind Speed: ${futureWind} mph</li>`);
                    $('.futurelist').append(`<li class="list-group-item humidity">Humidity: ${futureHumidity}%</li>`);
                }
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

    function setLocalStorage() {
        //Set City to localStorage
        let searchedCity = JSON.parse(localStorage.getItem('seachedArray')) || [];
        if (searchedCity.includes(city)) {
            return;
        } else {
            searchedCity.push(city)
        }
        localStorage.setItem('searchedCity', JSON.stringify(searchedCity));
    }

    //That city is listed individually in the "citiesfromstorage" div
    function createSearchHistoryList() {
        // Get search
        let storedData = JSON.parse(localStorage.getItem('searchedArray'));
        //create button with the City
        $('#citiesfromstorage').append(`<ul class="futureul"></ul>`);
        let listEl = $('.futureul').append(`<li class="1"></li>`);
        if (storedData === null) {
            storedData = []
        }

        for (let i = 0; i < storedData.length; i++) {
            listEl.append(`<button class="btn historybtn">${storedData[i]}</button>`);
            $('.historybtn').attr('id', 'historybtn')
        }
    }

    setLocalStorage();
    createSearchHistoryList();
};

//Type a city name then click search
$('#searchbtn').on('click', displayCity);


    // //Check data in localStorage for any cities
    // function checkLocalStorage() {
    //     let storedCity = JSON.parse(localStorage.getItem('searchedArray'));
    //     if (storedCity === null) {
    //         console.log("No saved data here.");
    //         storedCity = []
    //     }

    //     //create button with the City
    //     $('#citiesfromstorage').append(`<ul class="futureul"></ul>`);
    //     let listEl = $('.futureul').append(`<li class="1"></li>`);
    //     if (storedCity === null) {
    //         storedCity = []
    //     }
    //     for (let i = 0; i < storedCity.length; i++) {
    //         listEl.append(`<button class="historybtn">${storedCity[i]}</button>`);
    //         $('.historybtn').attr('id', 'historybtn');
    //         // Click search history list and then display
    //         $('#historybtn').on('click', function () {
    //             let clickedCity = $(this).val();
    //             displayCity(clickedCity);
    //         });
    //     }

    // }


