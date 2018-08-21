const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Configure Express Application Server
const app = express();
const PORT = process.env.PORT || 3000;

// Set up directory for static resources
// app.use(express.static(path.join(__dirname, '/public')));

// Set up morgan
app.use(morgan('dev'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start Server
app.listen(PORT, () => console.log('Server started on port', PORT));
