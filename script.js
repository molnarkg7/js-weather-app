let currCity = "Kragujevac";
let units = "metric";

let city = document.querySelector(".weather-city");
let datetime = document.querySelector(".weather-date-time");
let weather_forecast = document.querySelector(".weather-forecast");
let weather_temperature = document.querySelector(".weather-temperature");
let weather_icon = document.querySelector(".weather-icon");
let weather_max_min = document.querySelector(".weather-max-min");
let weather_realfeel = document.querySelector(".weather-realfeel");
let weather_humidity = document.querySelector(".weather-humidity");
let weather_wind = document.querySelector(".weather-wind");
let weather_pressure = document.querySelector(".weather-pressure");

document.querySelector(".weather-search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather-search-form");

  e.preventDefault();

  currCity = search.value;

  getWeather();

  search.value = "";
});

//units

document.querySelector(".weather-units-c").addEventListener("click", () => {
  if (units !== "metric") {
    units = "metric";

    getWeather();
  }
});

document.querySelector(".weather-units-f").addEventListener("click", () => {
  if (units !== "imperial") {
    units = "imperial";

    getWeather();
  }
});

//country code to name

function convertCountryCode(country) {
  let regionName = new Intl.DisplayNames(["en"], { type: "region" });
  return regionName.of(country);
}

//getWeather

function getWeather() {
  const API_KEY = `5a4b858561d3ed7bfbe0df7f8d81457b`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      weather_forecast.innerHTML = `<p>${data.weather[0].main}`;
      weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
      weather_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
      weather_max_min.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p> <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
      weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      weather_humidity.innerHTML = `${data.main.humidity}%`;
      weather_wind.innerHTML = `${data.wind.speed} ${
        units === "metric" ? "m/s" : "mph"
      }`;
      weather_pressure.innerHTML = `${data.main.pressure} hPa`;
    });
}

document.body.addEventListener("load", getWeather());
