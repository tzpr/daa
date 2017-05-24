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
