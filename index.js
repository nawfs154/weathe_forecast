//getting necessary element using dom
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");


const autocompleteResults = document.getElementById('autocomplete-results');

const inputField = form.querySelector('.search');

inputField.addEventListener('input', function() {
    const searchQuery = inputField.value;
  
    fetch(`https://api.weatherapi.com/v1/search.json?key=d8cc1b40e61b4b009c8100544233003&q=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        const cities = data.map(city => city.name);
  
        autocompleteResults.innerHTML = '';
        cities.forEach(city => {
          const cityElement = document.createElement('div');
          cityElement.innerHTML = city;
          cityElement.addEventListener('click', function() {
            inputField.value = city;
            autocompleteResults.innerHTML = '';
          });
          autocompleteResults.appendChild(cityElement);
        });
      });
  });
  
  // Hide the autocomplete results when the user clicks outside the container
  document.addEventListener('click', function(event) {
    if (!form.contains(event.target)) {
      autocompleteResults.innerHTML = '';
    }
  });

//Default city when the page loads
let cityInput = "Dhaka";

//Adding click events to each city in the panel
cities.forEach((city) => {
    fetch(`http://api.weatherapi.com/v1/search.json?key=d8cc1b40e61b4b009c8100544233003&q=Dhaka`)
  city.addEventListener("click", (e) => {
    //Change from default city to the clicked one
    cityInput = e.target.innerHTML;
    /*function that fetches and displays all the data from the weather API*/
    fetchWeatherData();
    //fade out the app(animation)
    app.style.opacity = "0";
  });
});

//Add submit event to the form
form.addEventListener("submit", (e) => {
  /*If the input field is empty, it wil throw an alert*/
  if (search.value.length == 0) {
    alert("Please type a city name");
  } else {
    /*Change default city to the written one*/
    cityInput = search.value;
    /*Function that fetches and displays all the data from the weather API */
    fetchWeatherData();
    //Remove all text from the input field
    search.value = "";
    //Fade out the app(animation)
    app.style.opacity = "0";
  }

  //Prevents the default behaviour of the form
  e.preventDefault();
});

/*function that returns a day of the week from a date*/
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

// function that fetches and displays the data from the weather api
function fetchWeatherData() {
  /*Fetch the data dynamically and add the city name*/
  fetch(
      `https://api.weatherapi.com/v1/current.json?key=d8cc1b40e61b4b009c8100544233003&q=${cityInput}`
    )
    /*Take data which is in json format and convert it into a regular js object */
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Adding temperature to the webpage
      temp.innerHTML = data.current.temp_c + "&#176";
      conditionOutput.innerHTML = data.current.condition.text;

      //Getting the date and time from the city and extract day,month,year and time into individual variables
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      /*reformatting the date into something more appealing */
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/ ${m}/ ${y}`;
      timeOutput.innerHTML = time;
      //Adding the name of the city into webpage
      nameOutput.innerHTML = data.location.name;
      //Getting the relevant icon
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      //taking the icon from local folder
      icon.src = "./icons/" + iconId;

      //add the weather detail to the page
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      //Set default time of day
      let timeOfDay = "day";
      //Get the unique id for each weather condition
      const code = data.current.condition.code;
      console.log(code);

      //Change to night if it's night in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        //Setting the background image to clear if the weather is clear
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

        //button color
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";

        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
          code == 1063 ||
          code == 1069 ||
          code == 1072 ||
          code == 1150 ||
          code == 1153 ||
          code == 1180 ||
          code == 1183 ||
          code == 1186 ||
          code == 1189 ||
          code == 1192 ||
          code == 1195 ||
          code == 1204 ||
          code == 1207 ||
          code == 1240 ||
          code == 1243 ||
          code == 1246 ||
          code == 1249 ||
          code == 1252
        ) {
          app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
          btn.style.background = "#647d75";
          if (timeOfDay == "night") {
            btn.style.background = "#325c80";
          }
        } else {
          app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
          btn.style.background = "#4d72aa";
          if (timeOfDay == "night") {
            btn.style.background = "#1b1b1b";
          }
        }
      
      //Fade in the page once all is done
      app.style.opacity = "1";
    });
}

//Call the function on page load
fetchWeatherData();

//fade in the page
app.style.opacity = "1";