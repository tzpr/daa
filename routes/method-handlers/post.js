/* jshint node: true */

'use strict';

const Boom = require('boom'); // https://github.com/hapijs/boom
const Observation = require('../../data/models/observation');


module.exports.saveObservationArray = (request, reply) => {
    var observationArr = request.payload.observations;

    Observation.insertMany(observationArr, (err, docs) => {
        if (!err) {
            reply(docs).created('/observation/');
        } else {
            if (11000 === err.code || 11001 === err.code) {
                reply(Boom.forbidden(
                    "please provide another observationi id, it already exist"));
            } else {
                reply(Boom.forbidden(err));
            }
        }
    });
};

module.exports.saveObservation = (request, reply) => {
    reply(new Promise(function(resolve, reject) {
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
        observation.save((err, observation) => {
            if (!err) {
                resolve(observation);
                //.created(
                //    '/observation/' + observation._id + "/id");
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reject(Boom.forbidden(
                        "please provide another observationi id, it already exist"));
                } else {
                    //reply(Boom.forbidden(getErrorMessageFrom(err)));
                    reject(Boom.create(err.code, err.message, {
                        timestamp: Date.now()
                    }));
                }
            }
        });
    }));
};
