'use strict';

const Boom = require('boom'); // https://github.com/hapijs/boom
const Observation = require('../data/models/observation');

module.exports.saveObservation = function(request, reply) {
    var observation = new Observation({
        species: request.payload.species,
        time: new Date().getTime(),
        year: new Date().getFullYear(),
        count: request.payload.count,
        state: request.payload.state,
        location: {
            lat: (request.payload.location) ? request.payload.location.lat : "",
            lng: (request.payload.location) ? request.payload.location.lng : "",
            accuracy: (request.payload.location) ? request.payload.location.accuracy : ""
        }

    });
    observation.save(function(err, user) {
        if (!err) {
            reply(observation).created(
                '/observation/' + observation._id + "/id");
        } else {
            if (11000 === err.code || 11001 === err.code) {
                reply(Boom.forbidden(
                    "please provide another observationi id, it already exist"));
            } else {
                //reply(Boom.forbidden(getErrorMessageFrom(err)));
                reply(Boom.create(err.code, err.message, {
                    timestamp: Date.now()
                }));
            }
        }
    });
}
