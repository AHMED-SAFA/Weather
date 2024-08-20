var weatherapi = "/weather";

const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const weatherCondition = document.querySelector(".condition");
const weatherTemperature = document.querySelector(".temperature");
const weatherMoreInfo = document.querySelector(".more-info");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const pressureElement = document.querySelector(".pressure");
const feels_like = document.querySelector(".feels-like");

const cityLocation = document.querySelector(".location");
const searchDate = document.querySelector(".date");

const currentDate = new Date();
const options = { month: "long", day: "numeric", year: "numeric" };
const formattedDate = currentDate.toLocaleDateString("en-US", options);

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cityLocation.textContent = "Loading...";
  weatherCondition.textContent = "";
  weatherTemperature.textContent = "";
  weatherMoreInfo.style.display = "none";

  if (weatherInput.value.trim() === "") {
    cityLocation.textContent = "Enter a city name.";
    return;
  }

  show(weatherInput.value);
});

function getWeatherData(city, callback) {
  const locationApi = weatherapi + "?address=" + city;
  fetch(locationApi).then((response) => {
    response.json().then((response) => {
      callback(response);
    });
  });
}

function show(city) {
  getWeatherData(city, (result) => {
    if (result.cod !== 200) {
      cityLocation.textContent = "Invalid city name. Try again";
      weatherCondition.textContent = "";
      weatherTemperature.textContent = "";
      weatherMoreInfo.style.display = "none";
      searchDate.textContent = "";
      return;
    } else {
      displayData(result);
    }
  });
}

function displayData(result) {
  weatherTemperature.textContent =
    "temperature: " +
    (result?.main?.temp - 273.5).toFixed(2) +
    String.fromCharCode(176) +
    "C";

  weatherCondition.textContent = "Condition: " + result?.weather[0]?.main;

  cityLocation.textContent = "City name: " + result?.name;

  searchDate.textContent = formattedDate;

  humidityElement.textContent = "Humidity: " + result?.main?.humidity + "%";

  windElement.textContent = "Wind Speed: " + result?.wind?.speed + " m/s";

  pressureElement.textContent = "Pressure: " + result?.main?.pressure + " hPa";

  feels_like.textContent =
    "Feels like: " +
    (result?.main?.feels_like - 273.5).toFixed(2) +
    String.fromCharCode(176) +
    "C";

  weatherMoreInfo.style.display = "block";
}
