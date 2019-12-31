const request = require("request");
const geoCode = require("./utils/geoCode.js");
const foreCast = require("./utils/foreCast.js");


const path = require("path");
const hbs = require("hbs");

const express = require("express");
const app = express();

const chalk = require("chalk");

//Path For Public and Views Directory//
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");




//Setup Handlers and Views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static Directory to Serve
app.use("", express.static(publicDirectoryPath)); //Root router will be executed Defaultly

app.get("/", (req, res) => { //Its Called Route HAndler
  res.render("index", {
    title: "Weather App",
    name: "Brijesh"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Brijesh"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Cristiano Ronaldo"
  });
});

app.get("/products", (req, res) => {

  console.log(req.query.search);
  console.log(req.query.rating);


  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    })
  }
  res.send({
    products: []
  })

});

//Weather End-Point

app.get("/weather", (req, res) => {
 
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address term'
    });
  }

  
 console.log(req.query.address);

 geoCode(req.query.address, (error, {latitude,longitude,location}={}) => {
  if (error) {
    return res.send({error});
     console.log(chalk.red.inverse('Error:', chalk.white(error)));
  }
  
  

  foreCast(longitude,latitude, (error, foreCastData) => {
    if (error) {
      return res.send({error});
      console.log(chalk.red.inverse('Error:', chalk.white(error)))
    }
        
    res.send({
      foreCast: foreCastData.data,
      location,
      address: req.query.address
    });
  
    console.log(chalk.green.inverse(location));
    console.log(foreCastData.data);
  
  });
});

});



app.get("/about/*", (req, res) => {

  res.render('404', {
    title: '404',
    name: 'Brijesh Yadav',
    errorMessage: 'About Article not available'
  });
});

app.get("/help/*", (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Brijesh Yadav',
    errorMessage: 'Help Article not available'
  });
});


app.get("/weather/*", (req, res) => {
  res.render("404", {
    title: '404',
    name: 'Brijesh Yadav',
    errorMessage: 'Weather Article not available'
  });
});


app.get("*", (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Brijesh Yadav',
    errorMessage: '404 Page Error'
  });
});

app.listen(3000, () => {
  console.log(chalk.green.inverse("Started at port 3000!"));
});