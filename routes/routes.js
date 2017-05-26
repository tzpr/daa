/* jshint node: true */

'use strict';

const getMethods = require('./method-handlers/get');
const postMethods = require('./method-handlers/post');
const validator = require('../validators/params');


module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: getMethods.rootHandler

    },
    {
        method: 'GET',
        path: '/observation/{year}/year',
        handler: getMethods.getObservationsByYear,
        config: {
            validate: validator.getObservationsByYearParams,
            description: 'Get list of observations',
            notes: 'Get list of observations by given year',
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
        path: '/observation/species',
        handler: getMethods.getElisListOfSpecies,
        config: {
            validate: {},
            description: 'Get count of different species and a list of them',
            notes: 'Returns the count of different species found in db (aka the elis count) and ' +
                'also a list of different species found in db (aka the elis list).',
            tags: ['api']
        }
    },
     {
        method: 'GET',
        path: '/observation/species/{year}/year',
        handler: getMethods.getListOfSpeciesByYear,
        config: {
            validate: validator.getObservationsByYearParams, // re-using the validation. maybe should rename.
            description: 'Get count of different species by year and a list of them',
            notes: 'Returns the count of different species found in db for the specified year (aka the vuodari count) and ' +
                'also list of the species (aka the vuodari list)',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/observation/species/{year}/missing',
        handler: getMethods.getMissingObervationsForYear,
        config: {
            validate: validator.getObservationsByYearParams, // re-using the validation. maybe should rename.
            description: 'Get diff of two species lists, the missing species',
            notes: 'This is actually vuodari elis diff',
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
            validate: validator.postArrayOfObservationsParams,
            description: 'Post multiple observations',
            notes: 'NOT READY. Insert array of observations to db',
            tags: ['api']
        }
    }
];
