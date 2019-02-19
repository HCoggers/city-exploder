'use strict';

// Load dotenv to manage variables
require('dotenv').config();

// Load express to do the heavy lifting of the server
const express = require('express');
const cors = require('cors');

// Establish the PORT number
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// API Paths
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
});

app.get('/weather', (request,response) => {
  const weatherData = getWeather();
  response.send(weatherData);
})

// Turn the server on
app.listen(PORT, () => console.log(`App is up on ${PORT}`));

// Create callback functions for our app methods

function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong');
}


function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  console.log('location in searchToLatLong()', location);
  return location;
}

function getWeather() {
  const darkSkyData = require ('./data/darksky.json');
  const weatherSummaries = [];
  darkSkyData.daily.data.forEach( day => {
    weatherSummaries.push(new Weather(day));
  })
  return weatherSummaries;
}

function Location(query, res) {
  console.log('res in Location', res);
  this.search_query = query;
  this.formatted_query = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15)
}

// Add a catch-all to get routes that don't exist
app.use('*', (request, response) => response.send('Sorry, that route does not exist'));

