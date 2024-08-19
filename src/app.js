const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const weatherdt = require("../utils/weatherData");
const { error } = require("console");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("address required");
  }

  weatherdt(req.query.address, (error, result) => {
    if (error) return res.send(error);
    res.send(result);
  });
});

app.get("*", (req, res) => {
  res.send("Invalid route!");
});

app.listen(port, () => {
  console.log("server is listening");
});
