'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Joi = require('joi');
const Inert = require('inert');
const Vision = require('vision');
const Mongoose = require('mongoose');
const Swagger = require('hapi-swagger');
const server = new Hapi.Server();

server.connection({
    port: (process.env.PORT || 3000),
    host: '0.0.0.0'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Hello, world!');
    }
});

server.route({
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
});

server.route({
    method: 'GET',
    path: '/observations/{year}',
    handler: function(request, reply) {
        reply('[{name: "Kangaskiuru", year: ' + encodeURIComponent(request.params.year) +
            ', location: {lat: 23.34322, lng: 32.3456}}]');
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
});

server.register([
    Inert,
    Vision,
    {
        register: Swagger,
        options: {
            info: {
                title: 'Test API Documentation'
            }
        }
    },
    {
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }
], (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;
