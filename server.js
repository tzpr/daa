/* jshint node: true */
'use strict';

// load env variables from .env file
require('dotenv').load();

const Hapi = require('hapi');
const Good = require('good'); // https://github.com/hapijs/good
const Inert = require('inert'); // https://github.com/hapijs/inert
const Vision = require('vision'); // https://github.com/hapijs/vision
const Swagger = require('hapi-swagger'); // https://github.com/glennjones/hapi-swagger
const server = new Hapi.Server();
const database = require('./data/database');
const routes = require('./routes/routes');


server.connection({
    port: process.env.PORT,
    host: process.env.HOST
});

server.route(routes);

server.register([
    Inert,
    Vision,
    {
        register: Swagger,
        options: {
            info: {
                title: 'API Documentation for havis REST API'
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
