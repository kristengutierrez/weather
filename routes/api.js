const request = require('request')
var router = require('express').Router();

var milwaukee = "Milwaukee";
var minneapolis = "Minneapolis";
var chicago = "Chicago";
var dallas = "Dallas";

//city ids from openweathermap
var milwaukee_id = 5263045;
var minneapolis_id = 5037649;
var chicago_id = 4887398;
var dallas_id = 4684888;

  router.get('/', function (req, res) {
    
    var secret = process.env.API_KEY;
    console.log("made it to post");
  	//build api URL 
    const baseUrl = "http://api.openweathermap.org/data/2.5/group?id=";

		const apiSpecifics = milwaukee_id + "," + minneapolis_id + "," + chicago_id + "," + dallas_id + "&units=imperial&appid=" + secret;

		const locations = (url1, url2) => {

		   let newUrl = url1 + url2;
		   return newUrl;
    };
  
    request(locations(baseUrl, apiSpecifics), function (err, response, body) {
      console.log("made it to request");
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.list[0].main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.list[0].main.temp} degrees in ${weather.list[0].name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })



module.exports = router;