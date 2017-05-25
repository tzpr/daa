/* jshint node: true */

'use strict';

var mongoose = require('mongoose');

var observationSchema = new mongoose.Schema({
    species: {type: String, required: true},
    time: {type: Number, required: true, unique: true},
    count: {type: Number, required: true},
    year: {type: Number, required: true},
    state: {type: String, required: true},
    location: {
        lat: {type: Number},
        lng: {type: Number},
        accuracy: {type: Number}
    }
});

var Observation = mongoose.model('Observation', observationSchema);

module.exports = Observation;
