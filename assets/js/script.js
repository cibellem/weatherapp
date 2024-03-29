

//setting some global variables
var city = $("#userCity").val().trim();
var iconw = $("#wicon");
var timeNow = moment().format('l');

var bttnSearch = $("#bttnSearch");
var searchedCity = [];

bttnSearch.on('click', currentConditions);


//hides the content when page loads.
$(".daysForecastheader").hide();
$(".daysForecast").hide();


function currentConditions(e) {
    e.preventDefault();

    //setting the city searched in the localstorage


    //sets the user's parameter and sets api for the Ajax Call
    var city = $("#userCity").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9ff2356a02ea9802929dcef5b6128c26";
    $.ajax({
        url: queryURL,
        method: "GET"


    }).then(function (response) {


        //content now it's displayed with the response we got back
        $(".daysForecastheader").show();
        $(".daysForecast").show();

        //creating a variable for each info I want to display in my page
        var cityName = response.name;
        var temperature = response.main.temp.toFixed(0);
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var lon = response.coord.lon;
        var lat = response.coord.lat;

        uvIndex(lat, lon)

        //creating  elements and appending the information stored in the variables above
        var $currentConditions = $("<div>");
        var $cityName = $("<h3>").text(cityName).append(" " + timeNow);
        var $temperature = $("<p>").text("Temperature: " + temperature + "°F");
        var $humidity = $("<p>").text("Humidity: " + humidity + "%");
        var $windSpeed = $("<p>").text("Wind Speed: " + windSpeed + " MPH");

        iconw.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $cityName.attr("style", "font-weight: bolder");


        $("#currentConditions").empty()

        $("#iconSpan").append(iconw);
        iconw.attr("style", "font-size:8em")

        $currentConditions.prepend($cityName, $temperature, $humidity, $windSpeed)
        $("#currentConditions").append($currentConditions);

        var recentSearch = $("<button>").text(cityName);
        recentSearch.addClass("list-group-item list-group-item-warning btn btn-warning");
        $("#recentSearches").prepend(recentSearch);


        var citiesSearched = JSON.parse(localStorage.getItem("city-search") || [])
        citiesSearched.push(recentSearch);
        localStorage.setItem("city-search", JSON.stringify(citiesSearched));




    })



    recentSearches();

    forecast5Days()

}




function forecast5Days() {


    var city = $("#userCity").val().trim();
    // var city = "Phoenix"
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=9ff2356a02ea9802929dcef5b6128c26";

    $.ajax({
        url: queryURLForecast,
        method: "GET"


    }).then(function (response) {



        //this variable will help me to assign the new values to the p tags I have in the HTML
        var forecastCount = 1;

        //the forecast it's updated every 3 hours but I want to know the forecast every 24 hour 
        //in every loop will check if the time it's equal to 00 which means it's another day.

        for (var i = 0; i < response.list.length; i++) {

            //changing the format of the time to two digits //Midnight it's 00 the whole rest it's in militar time zone. 18,19,20,21,22 ,23,00 
            var checkTime = moment(response.list[i].dt_txt).format("HH");


            //if time is equal to 00 a paragraph with the temperature , humidity and  icon // 
            if (checkTime == 00) {

                $("#date" + forecastCount).text(moment(response.list[i].dt_txt).format("l"));
                $("#temperature" + forecastCount).text("Temperature " + response.list[i].main.temp.toFixed(0) + "°F");//to fixed will return only 2 digits in the temp
                $("#wicon" + forecastCount).attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                $("#humidity" + forecastCount).text("Humidity " + response.list[i].main.humidity + "%");
                forecastCount++
            }

        }
    })

}


function recentSearches(cityName) {

    var cityName = $("#userCity").val().trim();
    if (!cityName) {
        alert("Please enter a city")
        return false;

    }








}





function uvIndex(lat, lon) {


    var queryURLUvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=9ff2356a02ea9802929dcef5b6128c26";

    $.ajax({
        url: queryURLUvIndex,
        method: "GET"


    }).then(function (response) {


        console.log(response.value)
        var uvIndex = response.value
        var $uvIndex = $("<p>").text("Uv Index: " + uvIndex);
        $("#currentConditions").append($uvIndex)

    })
}















