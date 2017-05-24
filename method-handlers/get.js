'use strict';

const Boom = require('boom'); // https://github.com/hapijs/boom
const Observation = require('../data/models/observation');


module.exports.getObservationsByYear = function(request, reply) {
    Observation.find({
        'year': encodeURIComponent(request.params.year)
    }, function(err, observation) {
        if (!err) {
            reply(observation);
        } else {
            reply(Boom.badImplementation(err));
        }
    });
}


module.exports.getObservationById = function(request, reply) {
    Observation.findOne({
        '_id': encodeURIComponent(request.params.id)
    }, function(err, observation) {
        if (!err) {
            reply(observation);
        } else {
            reply(Boom.badImplementation(err));
        }
    });
}
