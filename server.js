'use strict';

// Load dotenv to manage variables
require('dotenv').config();

// Load express to do the heavy lifting of the server
const express = require('express');
const app = express();

// Establish the PORT number
const PORT = process.env.PORT || 3000;

// Create callback functions for our app methods
const Location = (query, res) => {
  console.log('res in Location', res);
  this.search_query = query;
  this.formatted_query = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}

const searchToLatLong = (query) => {
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  console.log('location in searchToLatLong()', location);
  return location;
}

const handleError = (err, res) => {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong');
}

// Tell express where to load our 'data' files from
app.use(express.static('./data'));

// Create paths that the user can access the server from
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
});

// Add a catch-all to get routes that don't exist
app.use('*', (request, response) => response.send('Sorry, that route does not exist'));

// Turn the server on
app.listen(PORT, () => console.log(`Listening on ${PORT}`));