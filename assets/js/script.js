
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
            let iconURL = 'http://openweathermap.org/img/wn/' + iconcode + '@2x.png';
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
            for (let i = 0; i < 8; i++) {
                // if (response.list[i].dt_txt.split(' ')[1] === '12:00:00') { }
                let futureDate = dayjs().add(i, 'day').format('MM-DD');
                console.log(futureDate);
                let iconcodefuture = response.list[i * 8].weather[0].icon;
                let iconURLfuture = 'http://openweathermap.org/img/wn/' + iconcodefuture + '.png';
                let futureTemperature = response.list[i * 8].main.temp;
                let futureWind = response.list[i * 8].wind.speed;
                let futureHumidity = response.list[i * 8].main.humidity;

                //dt_text format = YYYY-MM-DD HH:mm:ss
                let fiveDayDate = response.list[i * 8].dt_txt.slice(5 , -9);
                console.log('Five Day Date: ', fiveDayDate);

                //CREATE THE FORECAST CARDS for each Date
                $('#cardssection').append(`<div id="fiveday" class="row d-flex justify-content-around w-100 p-3"></div>`);
                $('#fiveday').append(`<div class="col-md-2 border futuredate"><h5 class ="date">${futureDate}</h5></div>`);

                $('.futuredate').each(function () {
                    // $('.futuredate').append(`<div id="forecastcard" class="forecastcard"></div>`);
                    // if (futureDate == fiveDayDate) {}
                        // ICON
                        $('.futuredate').append(`<img src="${iconURLfuture}"></img>`);
                        //FORECAST
                        $('.futuredate').append(`<p class="temperature">Temperature: ${futureTemperature}\u00B0F</p>`);
                        $('.futuredate').append(`<p class="wind">Wind Speed: ${futureWind} mph</p>`);
                        $('.futuredate').append(`<p class="humidity">Humidity: ${futureHumidity}%</p>`);
                    
                })
            }
        })
};



//Function to Display Current Conditions
function displayCity() {

    //CLEAR DATA BEFORE APPEND
    $('#dateandcity').empty();
    $('#currentstats').empty();
    $('#fiveday').empty();
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    //City Name
    let city = $('.form-control').val().trim();
    console.log(city)
    geoLocation(city)

    //div cleared before appended
    // $('#dateandcity').empty();
    //$('#cityweather').addClass('currentdate');
    $('#dateandcity').append(`<h2 class="currentdate"> ${today} in ${city}</h2>`);
    // $('#dateandcity').append(`<h2 class="city">${city}</h2>`);


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
            containerEl.append(`<button type="button" class="col historybtn">${storedData[i]}</button>`);
        }
    }
    createSearchHistory();
};

//Type a city name then click search
$('#searchbtn').on('click', displayCity);


//Check data in localStorage for the city when the button is clicked
$('.historybtn').on('click', function () {
    let clickedHistoryBtn = $('historybtn').val();
    displayCity(clickedHistoryBtn)
})