// const request = require("request");

// const openWeatheapi = {
//     BASE_url: "",
//     SECRET_KEY: "d7e557506bafa5a7e42ee47ba11dfa94"
// }

const { json } = require("express");
const request = require("request");

const openWeatheapi = {
  BASE_url: "https://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: "d7e557506bafa5a7e42ee47ba11dfa94",
};

const weatherData = (address, callback) => {
  const url =
    openWeatheapi.BASE_url +
    encodeURIComponent(address) +
    "&APPID=" +
    openWeatheapi.SECRET_KEY;

  console.log(url);

  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(true, "weather data error " + error);
    }
    callback(false, data?.body);
  });
};

module.exports = weatherData;

// const city = "London";
// const url = `${openWeatheapi.BASE_url}weather?q=${city}&appid=${openWeatheapi.SECRET_KEY}`;
