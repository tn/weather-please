#!/usr/bin/env node

var request = require('request');
var color = require('cli-color');
var apiKey = require('../api-key');

//request.debug = true;

var cityName = process.argv[2];

var url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';

request(url + cityName + '&APPID=' + apiKey, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var obj = JSON.parse(body);
    var city = color.red(obj.name);
    var weather = color.white(obj.weather[0].description);
    var temp = obj.main.temp <= 0 ? color.blue(obj.main.temp) : color.green(obj.main.temp);
    var wind = color.white(obj.wind.speed + 'm/s');
    var clouds = color.white(obj.clouds.all + '%');
    var humidity = color.white(obj.main.humidity + '%');

    console.log(
      city,
      '\n Weather:',
      weather,
      '\n Temperature:',
      temp,
      '\n Wind:',
      wind,
      '\n Clouds:',
      clouds,
      '\n Humidity:',
      humidity
    );
  } else {
    return error;
  }
});
