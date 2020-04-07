'use strict';
const joi = require('@hapi/joi');

// Dependencies
    const contactController = require('../controllers/contact');

// Internals
    const internals = {
        collection: 'contacts',
        postValidationSettings: joi.object({
          nombre: joi.string().required(),
          email: joi.string().email().required(),
          mensaje: joi.string().required(),
        })
    };

// Exposing
    module.exports = [
      {
        method: 'POST',
        path: `/${internals.collection}`,
        handler: contactController.create,
        options: {
            validate: {
              payload: internals.postValidationSettings,
              failAction: async (request, h, err) => {
                console.error(err);
                throw err;
              }
            }
        }
      },
    ];