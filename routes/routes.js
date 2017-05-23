const Observation = require('../models/observation').Observation;
const Joi = require('joi');


module.exports = [{
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Hello, world!');
        }
    },
    {
        method: 'GET',
        path: '/{name}',
        handler: function(request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        },
        config: {
            validate: {
                params: {
                    name: Joi.required()
                }
            },
            description: 'Just testing, say hello!',
            notes: 'Just for testing, passing name as a request param',
            tags: ['api', 'hello']
        }
    },
    {
        method: 'GET',
        path: '/observation/{year}',
        handler: function(request, reply) {
            Observation.findOne({
                'year': encodeURIComponent(request.params.year)
            }, function(err, obs) {
                if (!err) {
                    reply(obs);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
            //handler: function(request, reply) {
            //    reply('[{name: "Kangaskiuru", year: ' + encodeURIComponent(request.params.year) +
            //        ', location: {lat: 23.34322, lng: 32.3456}}]');
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
        path: '/observation/id/{id}',
        handler: function(request, reply) {
            Observation.findOne({
                '_id': encodeURIComponent(request.params.id)
            }, function(err, obs) {
                if (!err) {
                    reply(obs);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
            //handler: function(request, reply) {
            //    reply('[{name: "Kangaskiuru", year: ' + encodeURIComponent(request.params.year) +
            //        ', location: {lat: 23.34322, lng: 32.3456}}]');
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
            notes: 'dadaa',
            tags: ['api', 'save observation']
        },
        handler: function(request, reply) {
            var observation = new Observation(request.payload);
            observation.save(function(err, user) {
                if (!err) {
                    reply(observation).created('/observation/' + observation._id); // HTTP 201
                } else {
                    if (11000 === err.code || 11001 === err.code) {
                        reply(Boom.forbidden("please provide another observationi id, it already exist"));
                    } else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
    }
];
