const express = require('express')
const request = require('request')
const app = express()

var port = process.env.PORT || 8080

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

var milwaukee = "Milwaukee";
var minneapolis = "Minneapolis";
var chicago = "Chicago";
var dallas = "Dallas";

//city ids from openweathermap
var milwaukee_id = 5263045;
var minneapolis_id = 5037649;
var chicago_id = 4887398;
var dallas_id = 4684888;

  app.post('/', function (req, res) {
    var secret = process.env.API_KEY;
    let url = "http://api.openweathermap.org/data/2.5/group?id=" + milwaukee_id + "," + minneapolis_id + "," + chicago_id + "," + dallas_id + "&units=imperial&appid=" + secret;
    //let url = 'http://api.openweathermap.org/data/2.5/weather?id=2172797&units=imperial&appid='+ secret;
  
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.list[0].main.temp} degrees in ${weather.list[0].name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })


app.listen(port, function () {
  console.log('weather app running')
})