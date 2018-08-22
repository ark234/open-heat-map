const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

// Create connection to Mongo DB via Mongoose
mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => console.log('Hello from ohm-db'));
mongoose.Promise = global.Promise;

// Configure Express Application Server
const app = express();
const PORT = process.env.PORT || 8080;

// Set up directory for static resource
app.use(express.static('dist'));

// Set up morgan
app.use(morgan('dev'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup dummy route
app.get('/api/getFoo', (req, res) => {
  res.json({ foo: 'bar' });
});

// Set up heat router
// const heatRouter = require('./controllers/heat.js');

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error Encountered:', err);
  res.status(500);
  res.send(err);
});

// Start Server
app.listen(PORT, () => console.log('Server started on port', PORT));
