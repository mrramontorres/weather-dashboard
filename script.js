  var cityList = [];
  var savedList = JSON.parse(localStorage.getItem('theList'));
  var addedCityCount = 0;

  function runCity() {

      // Erases any exisiting city data at second click
      $("#addHere").html("");

          // Create a city object from submission
          var cityName = citySearch.value.trim();

          // Check function is not b a city object from submission
          if(cityName == ""){
            alert("Enter a city!");
          }
          cityList.push(cityName);
          console.log(JSON.stringify(cityList));
          localStorage.setItem("theList",JSON.stringify(cityList));

      // Creates list based on city name entered in aside form
      var newCity = $("<li id='addedcity" + addedCityCount + "'></li>").text(cityName).addClass("list-group-item");
      $("#list").prepend(newCity);

      document.getElementById("addedcity" + addedCityCount).addEventListener("click", function(event) {
        console.log(event);
        $("#addHere").html("");
        runSpecificCity(event.target.innerHTML);
      });

      runSpecificCity(cityName);
  }

  function runSpecificCity(cityText) {
    //APIKey for source
    var APIKey = "c015bf6d88825f9546c67756f3da9172";

    // Here we are building the URLs we need to query the database
    var city = cityText;
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
      $("#cityName").text(cityText);
      $("#todayWind").text(response.wind.speed + " MPH");
      $("#todayHumi").text(response.main.humidity + "%");

      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;

      // Add temp content to html
      $("#todayTemp").text(tempF.toFixed(1));

      // Converting dt to date format - SOURCE FROM: https://usefulangle.com/post/258/javascript-timestamp-to-date-time
      var ts = response.dt;
      var ts_ms = ts * 1000;                                    // Convert unix timestamp to milliseconds
      var date_ob = new Date(ts_ms);                            // initialize new Date object
      var year = date_ob.getFullYear().toString().substr(-2);   // year as 4 digits (YYYY)
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);   // month as 2 digits (MM)
      var date = ("0" + date_ob.getDate()).slice(-2);           // date as 2 digits (DD)
      var t = " " + month + "/" + date+ "/" + year + " ";       // Convert object to string

      // Add temp content to html
      $("#todayDate").text(t);

      // Transfer icon to HTML
      var todayIcon = response.weather[0].icon;
      var iconLocation = "http://openweathermap.org/img/wn/" + todayIcon + "@2x.png";
      $("#todayIcon").html('<img src="' + iconLocation +'" </img>');

      // Add UV index by collecting lat and lon from first URL and passing it through to a different ajax call
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

      $.ajax({
        url: queryURL3,
        method: "GET"
      })
        .then(function(response3) {
          var uv = response3.value;
          $("#todayUV").text(uv);
        });
    });

    // Here we run our AJAX call to the OpenWeatherMap API for the 5 day forecast
    $.ajax({
      url: queryURL2,
      method: "GET"
    })

    // We store all of the retrieved data inside of an object called "response2"
    .then(function(response2) {

      var forecastArray = [2,10,18,26,34];
      for (i = 0; i <forecastArray.length; i++) {

      // Converting dt - SOURCE CODE from above
        var tsF = response2.list[forecastArray[i]].dt;
        var tsF_ms = tsF * 1000;                                    // Convert unix timestamp to milliseconds
        var date_ob = new Date(tsF_ms);                             // initialize new Date object
        var year = date_ob.getFullYear().toString().substr(-2);     // year as 4 digits (YYYY)
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);     // month as 2 digits (MM)
        var date = ("0" + date_ob.getDate()).slice(-2);             // date as 2 digits (DD)
        var t2 = " " + month + "/" + date+ "/" + year + " ";        // date as MM/DD/YY format

        // Prepare fahrenheit for transfer
        var tempF = (response2.list[forecastArray[i]].main.temp - 273.15) * 1.80 + 32;

        // Prepare icon for transfer
        var dayIcon = response2.list[forecastArray[i]].weather[0].icon;
        var iconLocation = "http://openweathermap.org/img/wn/" + dayIcon + "@2x.png";

        // Prepare variables for transfer append
        var forcastDate = $("<p></p>").text(t2);
        var forcastIcon = $("<a></a>").html('<img src="' + iconLocation +'" </img>');
        var forcastTemp = $("<p></p>").text("Temperature: " + tempF.toFixed(1) + " deg");
        var forcastHumi = $("<p></p>").text("Humidity: " + response2.list[forecastArray[i]].main.humidity.toFixed(0)+ "%");
        var newDiv = $("<div></div>").append(forcastDate, forcastIcon, forcastTemp, forcastHumi).addClass("col card bg-primary text-white");

        // Transfer variables in newDiv
        $("#addHere").append(newDiv);
      };

    });
  }
 if(savedList){

  for (i = 0; i < savedList.length; i++) {
    var theCityInTheLoop = savedList[i];
    var newCity = $("<li id='city" + i + "'></li>").text(savedList[i]).addClass("list-group-item");
    $("#list").prepend(newCity);
    if (i== (savedList.length-1)){
      runSpecificCity(savedList[i])
    }
    
    document.getElementById("city"+i).addEventListener("click", function(event) {
      console.log(event);
      $("#addHere").html("");
      runSpecificCity(event.target.innerHTML);
    });

  }

 } 
  
  // City search submission process
  document.getElementById("submitBtn").addEventListener("click",function(event) {
      event.preventDefault();
      runCity();

    });