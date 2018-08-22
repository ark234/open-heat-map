const Heat = require('../models/HeatModel');
const dotenv = require('dotenv').config();
const axios = require('axios');

const HeatController = {
  // Middleware for looking up nearby weather stations, creates a collection of Heat objects
  getNearbyStations(req, res, next) {
    const { lat, lon } = req.params;
    // console.log('lat/long ===>', lat, lon);
    const url = `https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude=${lat}&longitude=${lon}&metric=false&app_id=${
      process.env.HERE_ID
    }&app_code=${process.env.HERE_CODE}`;
    // find nearby weather stations
    axios
      .get(url)
      .then(response => {
        // map over nested location array in response object, constructing an array of Heat objects with location values
        res.locals.models = response.data.observations.location.map(location => {
          return new Heat({
            latitude: location.observation[0].latitude,
            longitude: location.observation[0].longitude,
            temperature: location.observation[0].temperature
          });
        });
        next();
      })
      .catch(err => {
        console.error('Error in HeatController.getHeat() ===>', err);
        res.send(err);
      });
  },
  // save collection of models to database and send saved docs as response json
  saveToDb(req, res) {
    Heat.insertMany(res.locals.models)
      .then(docs => {
        console.log('insert success! docs ===>', docs);
        res.json(docs);
      })
      .catch(err => {
        console.error('Error in HeatController.saveToDb() ===>', err);
        res.send(err);
      });
  }
};

module.exports = HeatController;
