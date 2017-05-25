'use strict';

const getMethods = require('../method-handlers/get');
const postMethods = require('../method-handlers/post');
const validator = require('../validators/params');


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
        handler: getMethods.getObservationsByYear,
        config: {
            validate: validator.getObservationsByYearParams,
            description: 'Get list of observations',
            notes: 'The year parameter defaults to current year if not specified',
            tags: ['api'] // tag attribute for Swagger to include this api endpoint in documentation
        }
    },
    {
        method: 'GET',
        path: '/observation/{id}/id',
        handler: getMethods.getObservationById,
        config: {
            validate: validator.getObservationByIdParams,
            description: 'Get observation',
            notes: 'Get observation by id',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/count',
        handler: getMethods.getCountOfSpecies,
        config: {
            validate: {},
            description: 'Get count of species',
            notes: 'NOT IMPLEMENTED YET. Returns the count of different species found in db (aka the elis count).',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/count/{year}/year',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'Get count of species by year',
            notes: 'NOT IMPLEMENTED YET. Returns the count of different species found in db for the specified year (aka the vuodari count).',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/observation/species',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'Get list of species',
            notes: 'NOT IMPLEMENTED YET. Returns the names of different species found in db (aka the elis list).',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/{year}/year',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'Get list of species by year',
            notes: 'NOT IMPLEMENTED YET. Returns the names of different species found in db for the specified year (aka the vuodari list).',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/{year}/year/elisdiff',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'Get diff of two species lists',
            notes: 'NOT IMPLEMENTED YET. Returns the names of species found in db for the specified year (vuodari elis diff).',
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/observation',
        handler: postMethods.saveObservation,
        config: {
            validate: validator.postObservationParams,
            description: 'Post observation',
            notes: 'Save new observation to db',
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/observation/many',
        handler: postMethods.saveObservationArray,
        config: {
            validate: {},
            description: 'Post multiple observations',
            notes: 'Insert array of observations to db',
            tags: ['api']
        }
    }
];
