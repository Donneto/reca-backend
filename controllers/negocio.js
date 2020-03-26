'use strict';

// Dependencies
    const jsend = require('jsend');
    const negocioCollection = require('../models/negocio');

// Internals
    const internals = {};

// Methods
    // internals.get = async (request, h) =>  {
    //     let docs;

    //     try {
          
    //         docs = await categoryCollection.find({}).sort({ name: 1 });
            
    //         return jsend.success(docs);

    //     } catch(e) {
    //         return jsend.error('Something went wrong!');
    //     }
    // };

    internals.create =  async (request, h) => {
        const data = request.payload;
        let negocio;
        let doc;
        
        try {
            console.log('here');
            console.log(data);
            
            negocio = new negocioCollection(data);
            doc = await negocio.save();
            
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