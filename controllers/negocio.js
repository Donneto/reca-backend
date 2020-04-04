'use strict';

// Dependencies
    const jsend = require('jsend');
    const algoliasearch = require('algoliasearch');
    const negocioCollection = require('../models/negocio');

    const client = algoliasearch('SIXFN4ICTO', '7f949d497ee2fb57463ef4116d4ad0ae');

    // const algoliaClient = algolia(process.env.algoliaappid, process.env.algoliaadminkey);
    const index = client.initIndex('reca_prod');

// Internals
    const internals = {};

// Methods
    internals.create =  async (request, h) => {
        const data = request.payload;
        let negocio;
        let doc;
        let algoliaTransaction;

        try {
            negocio = new negocioCollection(data);
            doc = await negocio.save();
            console.log(doc._id);

            algoliaTransaction = await index.saveObject({
                objectID: doc._id,
                ...data
              });

            return jsend.success(doc);
        } catch(e) {
            console.log(e.message);

            return jsend.error('Something went wrong!');
        }
    };

    internals.checkUniqueKeyDB = async (request, h) => {
        const data = request.payload.uniqueKey;
        let transaction;

        try {

            transaction = await negocioCollection.findOne({ uniqueKey: data });

            if (!transaction) {
                return jsend.success({ exists: false});
            }

            return jsend.success({ exists: true});

        } catch(e) {
            console.log(e.message);

            return jsend.error('Something went wrong!');
        }
    };

    internals.checkEmailDB = async (request, h) => {
        const data = request.payload.email;
        let transaction;

        try {

            transaction = await negocioCollection.findOne({ email: data });

            if (!transaction) {
                return jsend.success({ exists: false});
            }

            return jsend.success({ exists: true});

        } catch(e) {
            console.log(e.message);

            return jsend.error('Something went wrong!');
        }
    };

    internals.fetchInformation =  async (request, h) => {
        const data = request.payload;
        let negocio;

        try {
            negocio = await negocioCollection.findOne({ email: data.email, uniqueKey: data.uniqueKey });

            if (!negocio) {
                return jsend.success({ error: 'Informacion Invalida, por favor revise su correo y/o llave secreta.' });
            }

            return jsend.success(negocio);
        } catch(e) {
            console.log(e.message);

            return jsend.error('Something went wrong!');
        }
    };

    internals.updateBusiness = async (request, h) => {
        const data = request.payload;
        let negocio;

        try {

            negocio = await negocioCollection.findOne({ _id: data._id});

            negocio = Object.assign(negocio, data);

            await negocio.save();

            return jsend.success(negocio);

        } catch(e) {
            console.log(e.message);

            return jsend.error('Something went wrong!');
        }
    };

    // internals.update =  async (request, h) => {
    //     const data = request.payload;
    //     let category;

    //     try {

    //         category = await categoryCollection.findOne({ _id: data._id });

    //         category = Object.assign(category, data);

    //         await category.save();

    //         return jsend.success(category);

    //     } catch(e) {
    //         return jsend.error('Something went wrong!');
    //     }
    // };

    // internals.delete = async (request, h) => {
    //     const id = request.params.id || null;
    //     let result;

    //     try {

    //         if (id === null) {
    //             return jsend.error('ID must not be null');
    //         }

    //         result = await categoryCollection.deleteOne( { _id: id });

    //         return jsend.success(result);

    //     } catch (e) {
    //         return jsend.error('Something went wrong!');
    //     }
    // };

// Exposing
    module.exports = internals;