'use strict';

const Joi = require('joi');

module.exports.postObservationParams = {
    payload: {
        species: Joi.string().required(),
        count: Joi.number().required(),
        state: Joi.string().required(),
    }
};

module.exports.getObservationsByYearParams = {
    params: {
        year: Joi.number().integer().min(2015).max(2020).required()
    }
};

module.exports.getObservationByIdParmas = {
    params: {
        id: Joi.required()
    }
};
