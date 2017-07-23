/* jshint node: true */

'use strict';

const Boom = require('boom'); // https://github.com/hapijs/boom
const Observation = require('../../data/models/observation');


module.exports.rootHandler = (request, reply) => {
    reply.view('index', {
        title: 'Havis | Hapi ' + request.server.version,
        message: 'Hello World!'
    });
};

module.exports.getObservationsByYear = (request, reply) => {
    reply(new Promise(function(resolve, reject) {
        Observation.find({
            'year': encodeURIComponent(request.params.year)
        }, (err, observation) => {
            if (!err) {
                resolve(observation);
            } else {
                reject(Boom.badImplementation(err));
            }
        });
    }));
};

module.exports.getObservationById = (request, reply) => {
    reply(new Promise(function(resolve, reject) {
        Observation.findOne({
            '_id': encodeURIComponent(request.params.id)
        }, (err, observation) => {
            if (!err) {
                resolve(observation);
            } else {
                reject(Boom.badImplementation(err));
            }
        });
    }));
};

//https://github.com/Automattic/mongoose/issues/4063
module.exports.getElisListOfSpecies = (request, reply) => {
    reply(new Promise(function(resolve, reject) {
        Observation.distinct('species', (err, species) => {
            if (!err) {
                resolve({
                    count: species.length,
                    list: species
                });
            } else {
                reject(Boom.badImplementation(err));
            }
        });
    }));
};

module.exports.getListOfSpeciesByYear = (request, reply) => {
    reply(new Promise(function(resolve, reject) {
        Observation.find({
            'year': encodeURIComponent(request.params.year)
        }).distinct('species', (err, species) => {
            if (!err) {
                resolve({
                    count: species.length,
                    list: species
                });
            } else {
                reject(Boom.badImplementation(err));
            }
        });
    }));
};

module.exports.getMissingObervationsForYear = (request, reply) => {
    reply(new Promise(function(resolve, reject) {

        var elisList,
            yearList;

        function yearListEmpty(list) {
            return !yList || yList.length === 0;
        }

        function speciesDiff(eList, yList) {
            var missingSpecies = [];

            if (eList) {
                if (yearListEmpty(yList)) {
                    return eList;
                }
                for (let i = 0; i < eList.length; i++) {
                    if (!yList.includes(eList[i])) {
                        missingSpecies.push(eList[i]);
                    }
                }
            }
            return missingSpecies;
        }

        Observation.distinct('species', (err, species) => {
            if (!err) {
                elisList = species;
                Observation.find({
                    'year': encodeURIComponent(request.params.year)
                }).distinct(
                    'species', (err, species) => {
                        if (!err) {
                            yearList = species;
                            resolve({
                                missingSpecies: speciesDiff(elisList, yearList)
                            });
                        } else {
                            reject(Boom.badImplementation(err));
                        }
                    });
            } else {
                reject(Boom.badImplementation(err));
            }
        });
    }));
};


module.exports.emptyPlaceHolderToBeImplemented = (request, reply) => {
    reply(Boom.badImplementation("not implemented"));
};
