/* jshint node: true */

'use strict';

const Boom = require('boom'); // https://github.com/hapijs/boom
const Observation = require('../../data/models/observation');


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
};

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
};

//https://github.com/Automattic/mongoose/issues/4063
module.exports.getElisListOfSpecies = (request, reply) => {
    Observation.distinct('species', (err, species) => {
        if (!err) {
            reply({count: species.length,
                   list: species });
        } else {
            reply(Boom.badImplementation(err));
        }
    });
};

module.exports.getCountOfSpeciesByYear = (request, reply) => {
    Observation.find(
        {'year': encodeURIComponent(request.params.year)}).distinct(
            'species', (err, count) => {
        if (!err) {
            reply({count: count.length});
        } else {
            reply(Boom.badImplementation(err));
        }
    });
};

module.exports.getListOfSpecies = (request, reply) => {
    Observation.distinct('species', (err, species) => {
        if (!err) {
            reply({elis: species});
        } else {
            reply(Boom.badImplementation(err));
        }
    });
};

module.exports.emptyPlaceHolderToBeImplemented = (request, reply) => {
    reply(Boom.badImplementation("not implemented"));
};
