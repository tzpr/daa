'use strict';

const Joi = require('joi');



module.exports.postObservationParams = {
    payload: {
        species: Joi.string().min(3).required(),
        count: Joi.number().required(),
        state: Joi.string().regex(/^[p | ä | Än | Ä | m]$/).required(),
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
