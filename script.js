$(document).ready(function () {

    var city = $("#userCity").val().trim();

    localStorage.getItem("search");
    var timeNow = moment().format('l');
    console.log(timeNow)

    $(".daysForecastheader").hide();
    $(".daysForecast").hide();



    $("button").on("click", function currentConditions(e) {
        e.preventDefault();



        uvIndex()


        //sets the user's parameter and sets api for the Ajax Call
        var city = $("#userCity").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9ff2356a02ea9802929dcef5b6128c26";
        $.ajax({
            url: queryURL,
            method: "GET"


        }).then(function (response) {


            $(".daysForecastheader").show();
            $(".daysForecast").show();


            var cityName = response.name;
            var temperature = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            var lon = response.coord.lon;
            console.log(lon)
            var lat = response.coord.lat;
            console.log(lat)
            // var iconcode = a.weather[0].icon;
            // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            // var uvindex = CRIAr
            var $currentConditions = $("<div>");
            var $cityName = $("<h3>").text(cityName).append(" " + timeNow);
            var $temperature = $("<p>").text("Temperature: " + temperature + "°F");
            var $humidity = $("<p>").text("Humidity: " + humidity + "%");
            var $windSpeed = $("<p>").text("Wind Speed: " + windSpeed + " MPH");


            $("#currentConditions").empty()

            $currentConditions.prepend($cityName, $temperature, $humidity, $windSpeed)
            $("#currentConditions").append($currentConditions);
            localStorage.setItem("recent-search", city)


        })

        recentSearches();

        forecast5Days()

    })


    function forecast5Days() {


        var city = $("#userCity").val().trim();
        // var city = "Phoenix"
        var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=9ff2356a02ea9802929dcef5b6128c26";

        $.ajax({
            url: queryURLForecast,
            method: "GET"


        }).then(function (response) {
            console.log(response)


            //this variable will help me to assign the new values to the p tags I have in the HTML
            var forecastCount = 1;

            //the forecast it's updated every 3 hours but I want to know the forecast every 24 hour 

            for (var i = 0; i < response.list.length; i++) {

                //changing the format of the time to two digits //Midnight it's 00 the whole rest it's in militar time zone. 18,19,20,21,22 ,23,00 
                var checkTime = moment(response.list[i].dt_txt).format("HH");

                //in every loop wil check if the time it's equal to 00 which means it's another day. 
                //if so creetes a paragraph with the temperature and humidity // vai fazer o loop com o i da vez e criar 2 paragrafos para mostra o conteudo na tela

                if (checkTime == 00) {


                    $("#date" + forecastCount).text(moment(response.list[i].dt_txt).format("l"));

                    $("#temperature" + forecastCount).text("Temperature " + response.list[i].main.temp + "°F");//to fixed will return only 2 digits in the temp


                    $("#humidity" + forecastCount).text("Humidity " + response.list[i].main.humidity + "%");
                    forecastCount++
                }

            }
        })

    }


    function recentSearches() {

        var city = $("#userCity").val().trim();
        var recentSearch = $("<button>").text(city);
        $("#recentSearches").prepend(recentSearch)

        recentSearch.addClass(".bttn");
        localStorage.setItem("search", city);
    }


    function uvIndex(lat, lon) {


        queryURLUvIndex = "https://api.openweathermap.org/data/2.5/uvi?appid=9ff2356a02ea9802929dcef5b6128c26&lat=" + lat + "&lon=" + lon + "";

        $.ajax({
            url: queryURLUvIndex,
            method: "GET"


        }).then(function (response) {


            console.log(response.lat.value)



        })
    }














})


