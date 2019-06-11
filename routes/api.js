const request = require('request')
var router = require('express').Router();

const CITY_COUNT = 4

//city ids from openweathermap
var milwaukee_id = 5263045;
var minneapolis_id = 5037649;
var chicago_id = 4887398;
var dallas_id = 4684888;


  router.get('/', function (req, res) {
    
    var secret = process.env.API_KEY;
    
  	//build api URL 
    const baseUrl = "http://api.openweathermap.org/data/2.5/group?id=";

		const apiSpecifics = milwaukee_id + "," + minneapolis_id + "," + chicago_id + "," + dallas_id + "&units=imperial&appid=" + secret;

		const completeUrl = (url1, url2) => {
		   let newUrl = url1 + url2;
		   return newUrl;
    };
  
    //making the http call
    request(completeUrl(baseUrl, apiSpecifics), function (err, response, body) {
      if(err){
        res.render('index', {milWeather: null, milDesc: null, minWeather: null, minDesc: null, chiWeather: null, chiDesc: null, dalWeather: null, dalDesc: null, error: 'Error fetching weather.'});
      } else {
        let weather = JSON.parse(body);
        console.log(weather);
        if(weather.list[0].main == undefined){
          res.render('index', {milWeather: null, milDesc: null, minWeather: null, minDesc: null, chiWeather: null, chiDesc: null, dalWeather: null, dalDesc: null, error: 'Error fetching weather.'});
        } else {
          //assigning each city with the right weather details
          //array doesn't always come back in the same order
          var i;
          for (i = 0; i < CITY_COUNT; i++) {

            if (weather.list[i].name == "Milwaukee") {
              let temp = Math.round(weather.list[i].main.temp);
              var milwaukee_temp = temp + "°";
              var milwaukee_desc = weather.list[i].weather[0].description;

            } else if (weather.list[i].name == "Minneapolis") {
              let temp = Math.round(weather.list[i].main.temp);
              var minneapolis_temp = temp + "°";
              var minneapolis_desc = weather.list[i].weather[0].description;

              } else if (weather.list[i].name == "Chicago") {
                let temp = Math.round(weather.list[i].main.temp);
                var chicago_temp = temp + "°";
                var chicago_desc = weather.list[i].weather[0].description;

                } else if (weather.list[i].name == "Dallas") {
                  let temp = Math.round(weather.list[i].main.temp);
                  var dallas_temp = temp + "°";
                  var dallas_desc = weather.list[i].weather[0].description;

                } 
            }
          res.render('index', {milWeather: milwaukee_temp, milDesc: milwaukee_desc, minWeather: minneapolis_temp, minDesc: minneapolis_desc, chiWeather: chicago_temp, chiDesc: chicago_desc, dalWeather: dallas_temp, dalDesc: dallas_desc, error: null});
        }
      }
    });
  })



module.exports = router;