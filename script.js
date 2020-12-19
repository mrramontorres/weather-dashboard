// This is our API key
var APIKey = "bb112b280c04aa2586dddb642810a9b4";

// Here we are building the URL we need to query the database
var city = "London"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $("#cityName").text(response.name);
    $("#todayWind").text(response.wind.speed + " MPH");
    $("#todayHumi").text(response.main.humidity + "%");
    
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // Add temp content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);
  });