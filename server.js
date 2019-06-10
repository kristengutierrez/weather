const express = require('express')
const request = require('request')
const app = express()

var port = process.env.PORT || 8080

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})

  app.post('/', function (req, res) {
    var secret = process.env.API_KEY;

    let url = 'http://api.openweathermap.org/data/2.5/weather?id=2172797&units=imperial&appid='+ secret;
  
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })


app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})