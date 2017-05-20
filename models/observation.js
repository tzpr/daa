var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObservationSchema = new Schema({
  name: String,
  year: Number,
  description: String,
  location: { lat: String, lng: String },
  date: { type: Date, default: Date.now }
});

var observation = mongoose.model('Observation', ObservationSchema);

module.exports = {
    Observation: observation
};
