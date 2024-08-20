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

  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(true, "weather data error " + error);
    }
    callback(false, data?.body);
  });
};

module.exports = weatherData;

