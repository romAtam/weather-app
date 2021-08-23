const hbs = require("hbs");
const path = require("path");
const express = require("express");
const geocode = require("./geocode.js");
const forecast= require("./forecast.js")


const app = express();
const port=process.env.PORT ||3000;
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const pathPublic = path.join(__dirname, "../public");
app.use(express.static(pathPublic));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "roman baraban",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "weather about",
    name: "roman caban",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    location: "borispol",
    age: 27,
    title: "help",
    name: "roman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return  geocode("Kiev",(error, {latitude, longitude,location}={}) => {
        if (error) {
          return res.send({error})
        }
      
        forecast(latitude, longitude, (error, {observation_time,temperature,feelslike,weather_descriptions}) => {
          if (error) {
            return res.send({error});
          }
        res.send({location,observation_time,temperature,feelslike,weather_descriptions:weather_descriptions[0],address:"Kiev"})
        });
      })
  }
  geocode(req.query.address,(error, {latitude, longitude,location}={}) => {
    if (error) {
      return res.send({error})
    }
  
    forecast(latitude, longitude, (error, {observation_time,temperature,feelslike,weather_descriptions}) => {
      if (error) {
        return res.send({error});
      }
    res.send({location,observation_time,temperature,feelslike,weather_descriptions:weather_descriptions[0],address:req.query.address})
    });
  })
//   res.send({
//     forecast: "snowing",

//     address: req.query.address,
//   });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "enter a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "roman caban",
    massage: "page does not exist",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "weather about",
    name: "roman caban",
    massage: "page  exist",
  });
});

app.listen(port, () => {
  console.log(`listening on...${port}`);
});
