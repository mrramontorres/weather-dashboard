//City search submission process.
document.getElementById("submitBtn").addEventListener("click",function(event) {
    event.preventDefault();
        //Create a city object from submission
        var cityName = {
          city: citySearch.value.trim(),
        };

        if(cityName.city == ""){
          alert("Enter a city!");
        } else {
          
        }

    console.log(cityName);
});

var APIKey = "c015bf6d88825f9546c67756f3da9172";
var APIKey2 = "96e67339da4fefa3ae347dc38139bc90";

// Here we are building the URLs we need to query the database
var city = "London"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API for the today's weather
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Transfer content to HTML
    $("#cityName").text(response.name);
    $("#todayWind").text(response.wind.speed + " MPH");
    $("#todayHumi").text(response.main.humidity + "%");
    
    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    // Add temp content to html
    $("#todayTemp").text(tempF.toFixed(1));

    // Converting dt to date format - SOURCE FROM: https://usefulangle.com/post/258/javascript-timestamp-to-date-time
    var ts = response.dt;
    // Convert unix timestamp to milliseconds
    var ts_ms = ts * 1000;
    // initialize new Date object
    var date_ob = new Date(ts_ms);
    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear().toString().substr(-2);
    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);
    // Convert object to string
    var t = " " + month + "/" + date+ "/" + year + " ";

    // Add temp content to html
    $("#todayDate").text(t);

  });

  // Here we run our AJAX call to the OpenWeatherMap API for the 5 day forecast
$.ajax({
  url: queryURL2,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response2"
  .then(function(response2) {

    // Converting dt - SOURCE CODE from above
    var tsF = response2.list[10].dt;
    // Convert unix timestamp to milliseconds 
    var tsF_ms = tsF * 1000;
    // initialize new Date object
    var date_ob = new Date(tsF_ms);
    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear().toString().substr(-2);
    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);
    // date as MM/DD/YY format
    var t2 = " " + month + "/" + date+ "/" + year + " ";

    // Transfer date content to HTML
    $("#day2date").text(t2);

    // Convert the temp to fahrenheit and transfer content to HTML
    var tempF = (response2.list[10].main.temp - 273.15) * 1.80 + 32;
    $("#day2temp").text(tempF.toFixed(1));
    
    // Transfer humidity content to HTML
    $("#day2humi").text(response2.list[10].main.humidity.toFixed(0)+ "%");

    // Transfer icon to HTML
    var dayIcon = response2.list[10].weather[0].icon;
    var iconLocation = "http://openweathermap.org/img/wn/" + dayIcon + "@2x.png";
    $("#day2icon").html('<img src="' + iconLocation +'" </img>');

  });


