var apiURLWithKey = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={173d4962b14a682100b481e4cceca14d}'
var apiKey = '173d4962b14a682100b481e4cceca14d';
var savedSearch = [];

//HTML Elements
let cityWeatherDiv = $('#cityweather');


//BEGIN WORKING CODE

//Type a City and CLICK "searchbtn"
$('#searchbtn').on('click', displayCity)

//Function to Display Current Conditions
let displayCity = function () {
    //City Name
    var city = 
    //Current Date day.js
    var today = dayjs('dddd, MM/DD/YYYY')
    cityWeatherDiv.append( $('h2', today)).addClass('currentdate');


    //Icon with representing weather conditions

    //Temperature
    //Wind
    //Humidity
}


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