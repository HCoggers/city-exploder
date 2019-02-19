'use strict';

// Load dotenv to manage variables
require('dotenv').config();

// Load express to do the heavy lifting of the server
const express = require('express');
const app = express();

// Establish the PORT number
const PORT = process.env.PORT || 3000;

// Tell express where to load our 'data' files from
app.use(express.static('./data'));

// Create paths that the user can access the server from
// app.get();

// Add a catch-all to get routes that don't exist
app.use('*', (request, response) => response.send('Sorry, that route does not exist'));

// Turn the server on
app.listen(PORT, () => console.log(`Listening on ${PORT}`));