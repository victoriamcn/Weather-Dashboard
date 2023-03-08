
let apiKey = '173d4962b14a682100b481e4cceca14d';

//BEGIN WORKING CODE
// fetching the lat/lon 
function geoLocation(nameofcity) {
    var apiCityURL = `https://api.openweathermap.org/geo/1.0/direct?q=${nameofcity}&limit=1&appid=${apiKey}`
    fetch(apiCityURL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
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
    var apiForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(apiForecastURL)
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log("DATA of forecast: ", data)

            let iconcode = data.list[0].weather[0].icon;
            let iconURL = 'http://openweathermap.org/img/wn/' + iconcode + '@2x.png';
            let temperature = data.list[0].main.temp;
            let wind = data.list[0].wind.speed;
            let humidity = data.list[0].main.humidity;

            //APPEND ELEMENTS WITH DATA
            $('#currentstats').append(`<img class="icon" src="${iconURL}"></img>`);
            $('#currentstats').append(`<ul id="currentlist" class="list-group list-group-flush currentlist"></ul>`);
            $('#currentlist').append(`<li class="list-group-item temperature">Temperature: ${temperature}\u00B0F</li>`);
            $('#currentlist').append(`<li class="list-group-item wind">Wind Speed: ${wind}mph</li>`);
            $('#currentlist').append(`<li class="list-group-item humidity">Humidity: ${humidity}%</li>`);

            //dt_text format = YYYY-MM-DD HH:mm:ss
            // let fiveDayDate = response.list[i * 8].dt_txt.slice(5 , -9);
            // console.log('Five Day Date: ', fiveDayDate);

            // ARRAY TO STORE FUTURE DATES AND FORECAST DATA
            let forecastData = [];

            // NEXT FIVE DAYS
            for (let i = 0; i < 5; i++) {
                let futureDate = dayjs().add(i, 'day').format('dddd, MM/DD');
                console.log(futureDate);
                let iconcodefuture = data.list[i * 8].weather[0].icon;
                let iconURLfuture = 'http://openweathermap.org/img/wn/' + iconcodefuture + '.png';
                let futureTemperature = data.list[i * 8].main.temp;
                let futureWind = data.list[i * 8].wind.speed;
                let futureHumidity = data.list[i * 8].main.humidity;

                // PUSH DATA TO ARRAY
                forecastData.push({
                    date: futureDate,
                    icon: iconURLfuture,
                    temp: futureTemperature,
                    wind: futureWind,
                    humidity: futureHumidity
                });
            }


            //CREATE THE FORECAST CARDS FROM ARRAY
            forecastData.forEach((data, index) => {
                $('#cardssection').append(`<div id="fiveday-${index}" class="col-md-3 fiveday"></div>`);
                $(`#fiveday-${index}`).append(`<p class ="border p-3 mb-2 bg-primary-subtle text-emphasis-primary futuredate">${data.date}</p>`);
                $(`#fiveday-${index} .futuredate`).append(`<div id="forecastcard-${index}" class="forecastcard"></div>`);
                $(`#forecastcard-${index}`).hide();
                $(`#forecastcard-${index}`).empty();

                $(`#fiveday-${index} p`).each(function () {
                    let cardFutureDate = $(this).text();
                    if (cardFutureDate === data.date) {
                        $(`#forecastcard-${index}`).show();
                        $(`#forecastcard-${index}`).append(`<img src="${data.icon}" class="weather"></img>`);
                        $(`#forecastcard-${index}`).append(`<p class="weather temperature">Temperature: ${data.temp}\u00B0F</p>`);
                        $(`#forecastcard-${index}`).append(`<p class="weather wind">Wind Speed: ${data.wind} mph</p>`);
                        $(`#forecastcard-${index}`).append(`<p class="weather humidity">Humidity: ${data.humidity}%</p>`);
                    }
                })
            });
        })
}




//Function to Display Current Conditions
function displayCity() {

    //CLEAR DATA BEFORE APPEND
    $('#dateandcity').empty();
    $('#currentstats').empty();
    //EMPTY FORECAST ELEMENTS
    $(`.fiveday`).empty();
    $(`.futuredate`).empty();
    $(`.forecastcard`).empty();
    //Current Date day.js
    let today = dayjs().format('dddd, MM/DD/YYYY')
    //City Name
    let city = $('.form-control').val().trim();
    console.log(city)
    geoLocation(city)

    //div cleared before appended
    // $('#dateandcity').empty();
    //$('#cityweather').addClass('currentdate');
    $('#currentweather').addClass('border')
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
            containerEl.append(`<div><button type="button" class="col btn btn-outline-secondary btn-sm historybtn">${storedData[i]}</button></div>`);
        }
    }
    createSearchHistory();
    //Check data in localStorage for the city when the button is clicked
    $('.historybtn').on('click', function () {
        let clickedHistoryBtn = $(this).text().val();
        displayCity(clickedHistoryBtn)
    })

};

//Type a city name then click search
$('#searchbtn').on('click', displayCity);


