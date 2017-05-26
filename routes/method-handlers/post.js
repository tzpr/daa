/* jshint node: true */

'use strict';

const Boom = require('boom'); // https://github.com/hapijs/boom
const Observation = require('../../data/models/observation');


module.exports.saveObservationArray = (request, reply) => {
    reply(new Promise(function(resolve, reject) {
        var observationArr = request.payload.speciesArr;
        var obsInstanceArr = observationArr.map(newObservationInstance);

        Observation.insertMany(obsInstanceArr, (err, docs) => {
            if (!err) {
                resolve(docs);
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reject(Boom.forbidden(
                        "Please provide another observation id, it already exist"));
                } else {
                    reject(Boom.forbidden(err));
                }
            }
        });
    }));
};

function newObservationInstance(observation){
    return new Observation({
        species: observation.species,
        time: new Date().getTime(),
        year: new Date().getFullYear(),
        count: observation.count,
        state: observation.state,
        location: {
            lat: (observation.location) ? observation.location.lat : "",
            lng: (observation.location) ? observation.location.lng : "",
            accuracy: (observation.location) ? observation.location.accuracy : ""
        }
    });
}

module.exports.saveObservation = (request, reply) => {
    reply(new Promise(function(resolve, reject) {

        var observation = newObservationInstance(request.payload);

        observation.save((err, observation) => {
            if (!err) {
                resolve(observation);
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
