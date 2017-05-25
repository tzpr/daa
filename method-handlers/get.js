'use strict';

const Boom = require('boom'); // https://github.com/hapijs/boom
const Observation = require('../data/models/observation');


module.exports.getObservationsByYear = (request, reply) => {
    Observation.find({
        'year': encodeURIComponent(request.params.year)
    }, (err, observation) => {
        if (!err) {
            reply(observation);
        } else {
            reply(Boom.badImplementation(err));
        }
    });
}


module.exports.getObservationById = (request, reply) => {
    Observation.findOne({
        '_id': encodeURIComponent(request.params.id)
    }, (err, observation) => {
        if (!err) {
            reply(observation);
        } else {
            reply(Boom.badImplementation(err));
        }
    });
}

//https://github.com/Automattic/mongoose/issues/4063
module.exports.getCountOfSpecies = (request, reply) => {
    Observation.distinct('species', (err, count) => {
        if (!err) {
            reply(count.length);
        } else {
            reply(Boom.badImplementation(err));
        }
    });
}

module.exports.emptyPlaceHolderToBeImplemented = (request, reply) => {
    reply(Boom.badImplementation("not implemented"));
}
