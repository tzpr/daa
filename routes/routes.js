const Observation = require('../models/observation').Observation;
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
            notes: 'dadaa',
            tags: ['api', 'observation details']
        }
    },
    {
        method: 'POST',
        path: '/observation',
        config: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    year: Joi.number().integer().min(2015).max(2020).required()
                }
            },
            description: 'Save new observation to db',
            notes: 'Save new observation to db',
            tags: ['api', 'save observation']
        },
        handler: function(request, reply) {
            var observation = new Observation(request.payload);
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
