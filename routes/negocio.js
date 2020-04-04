'use strict';
const joi = require('@hapi/joi');

// Dependencies
    const negocioController = require('../controllers/negocio');

// Internals
    const internals = {
        collection: 'negocios',
        postValidationSettings: joi.object({
            nombre: joi.string().required(),
            activo: joi.boolean().default(true),
            ciudad: joi.string().required(),
            direccion: joi.string().required(),
            direccionb: joi.string().allow(''),
            domicilio: joi.boolean().default(false),
            email: joi.string().email().required(),
            horas: joi.object().keys({
                startTime: joi.string().required(),
                endTime: joi.string().required()
            }),
            horario: joi.string().required(),
            productos: joi.string().required(),
            revisado: joi.boolean().default(false),
            tags: joi.array().items(joi.string()),
            telefono: joi.string().required(),
            uniqueKey: joi.string().required(),
            whatsapp: joi.string().allow(''),
            website: joi.string().allow(''),
        }),
        checkUniqueKeySetting: joi.object({
            uniqueKey: joi.string().required()
        }),
        checkEmailSetting: joi.object({
            email: joi.string().required()
        }),
        fetchInformationSetting: joi.object({
            email: joi.string().required(),
            uniqueKey: joi.string().required(),
        }),
        updateBusiness: joi.object({
            nombre: joi.string().required(),
            activo: joi.boolean().default(true),
            ciudad: joi.string().required(),
            direccion: joi.string().required(),
            direccionb: joi.string().allow(''),
            domicilio: joi.boolean().default(false),
            email: joi.string().email().required(),
            horas: joi.object().keys({
                startTime: joi.string().required(),
                endTime: joi.string().required()
            }),
            horario: joi.string().required(),
            productos: joi.string().required(),
            revisado: joi.boolean().default(false),
            tags: joi.array().items(joi.string()),
            telefono: joi.string().required(),
            uniqueKey: joi.string().required(),
            whatsapp: joi.string().allow(''),
            website: joi.string().allow(''),
            _id: joi.string().required(),
        }),
    };

// Exposing
    module.exports = [
        {
            method: 'POST',
            path: `/${internals.collection}`,
            handler: negocioController.create,
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
        {
            method: 'POST',
            path: `/${internals.collection}/validate-uniquekey`,
            handler: negocioController.checkUniqueKeyDB,
            options: {
                validate: {
                    payload: internals.checkUniqueKeySetting,
                    failAction: async (request, h, err) => {
                        console.error(err);
                        throw err;
                    }
                }
            }
        },
        {
            method: 'POST',
            path: `/${internals.collection}/validate-email`,
            handler: negocioController.checkEmailDB,
            options: {
                validate: {
                    payload: internals.checkEmailSetting,
                    failAction: async (request, h, err) => {
                        console.error(err);
                        throw err;
                    }
                }
            }
        },
        {
            method: 'POST',
            path: `/${internals.collection}/fetch-information`,
            handler: negocioController.fetchInformation,
            options: {
                validate: {
                    payload: internals.fetchInformationSetting,
                    failAction: async (request, h, err) => {
                        console.error(err);
                        throw err;
                    }
                }
            }
        },
        {
            method: 'POST',
            path: `/${internals.collection}/update-information`,
            handler: negocioController.updateBusiness,
            options: {
                validate: {
                    payload: internals.updateBusiness,
                    failAction: async (request, h, err) => {
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    ];