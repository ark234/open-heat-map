const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heatSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  temperature: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now, index: { expires: '1h' } }
});

const Heat = mongoose.model('Heat', heatSchema);

module.exports = Heat;
