$(document).ready(function () {

    var city = "Phoenix";
    var city = $("#userCity").val()

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9ff2356a02ea9802929dcef5b6128c26";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL)
        // Log the resulting object
        console.log(response);








    })











})
