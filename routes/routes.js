const Observation = require('../models/observation');
const Joi = require('joi');
const Boom = require('boom');

module.exports = [{
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Hello, world!');
        }
    },
    {
        method: 'GET',
        path: '/observation/{year}/year',
        handler: function(request, reply) {
            Observation.find({
                'year': encodeURIComponent(request.params.year)
            }, function(err, observation) {
                if (!err) {
                    reply(observation);
                } else {
                    reply(Boom.badImplementation(err));
                }
            });
        },
        config: {
            validate: {
                params: {
                    year: Joi.number().integer().min(2015).max(2020).required()
                }
            },
            description: 'Get list of observations by given year',
            notes: 'The year parameter defaults to current year if not specified',
            tags: ['api', 'observation listing']
        }
    },
    {
        method: 'GET',
        path: '/observation/{id}/id',
        handler: function(request, reply) {
            Observation.findOne({
                '_id': encodeURIComponent(request.params.id)
            }, function(err, obs) {
                if (!err) {
                    reply(obs);
                } else {
                    reply(Boom.badImplementation(err));
                }
            });
        },
        config: {
            validate: {
                params: {
                    id: Joi.required()
                }
            },
            description: 'Get observation by id',
            notes: 'Get observation by id',
            tags: ['api', 'observation details']
        }
    },
    {
        method: 'POST',
        path: '/observation',
        config: {
            validate: {
                payload: {
                    species: Joi.string().required(),
                    count: Joi.number().required(),
                    state: Joi.string().required(),
                }
            },
            description: 'Save new observation to db',
            notes: 'Save new observation to db',
            tags: ['api', 'save observation']
        },
        handler: function(request, reply) {
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
                        reply(Boom.forbidden(getErrorMessageFrom(err)));
                    }
                }
            });
        }
    }
];
