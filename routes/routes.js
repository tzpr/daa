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
            description: 'Get list of observations by given year',
            notes: 'The year parameter defaults to current year if not specified',
            tags: ['api', 'observation listing']
        }
    },
    {
        method: 'GET',
        path: '/observation/{id}/id',
        handler: getMethods.getObservationById,
        config: {
            validate: validator.getObservationByIdParams,
            description: 'Get observation by id',
            notes: 'Get observation by id',
            tags: ['api', 'observation details']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/count',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'The all time number of different species',
            notes: 'NOT IMPLEMENTED YET. Returns the count of different species found in db.',
            tags: ['api', 'elis']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/count/{year}/year',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'The number of different species in given year',
            notes: 'NOT IMPLEMENTED YET. Returns the count of different species found in db for the specified year.',
            tags: ['api', 'vuodari']
        }
    },
    {
        method: 'GET',
        path: '/observation/species',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'Get list of different species',
            notes: 'NOT IMPLEMENTED YET. Returns the names of different species found in db.',
            tags: ['api', 'observation listing, elis list']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/{year}/year',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'Get list of different species by given year',
            notes: 'NOT IMPLEMENTED YET. Returns the names of different species found in db for the specified year.',
            tags: ['api', 'observation listing, vuodari list']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/{year}/year/elisdiff',
        handler: getMethods.emptyPlaceHolderToBeImplemented,
        config: {
            validate: {},
            description: 'Get the diff of species by given a year and all time species list',
            notes: 'NOT IMPLEMENTED YET. Returns the names of species found in db for the specified year.',
            tags: ['api', 'observation listing, missing from vuodari list']
        }
    },
    {
        method: 'POST',
        path: '/observation',
        handler: postMethods.saveObservation,
        config: {
            validate: validator.postObservationParams,
            description: 'Save new observation to db',
            notes: 'Save new observation to db',
            tags: ['api', 'save observation']
        }
    }
];
