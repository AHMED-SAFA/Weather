const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const weatherdt = require("../utils/weatherData");
const { error } = require("console");
const { title } = require("process");

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App" });
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
  res.render("notfound", { title: "invalid!" });
});

app.listen(port, () => {
  console.log("server is listening");
});
