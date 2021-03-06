/* jshint node: true */

'use strict';

var mongoose = require('mongoose');

const observationModelObject = {
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
};

var observationSchema = new mongoose.Schema(observationModelObject);

var Observation = mongoose.model('Observation', observationSchema);

module.exports = Observation;
