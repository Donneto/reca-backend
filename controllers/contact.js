'use strict';

// Dependencies
    const jsend = require('jsend');
    const contactCollection = require('../models/contact');

// Internals
    const internals = {};

// Methods
    internals.create =  async (request, h) => {
        const data = request.payload;
        let contact;
        let doc;

        try {
            contact = new contactCollection(data);
            doc = await contact.save();

            return jsend.success(doc);
        } catch(e) {
            console.log(e.message);

            return jsend.error('Something went wrong!');
        }
    };


// Exposing
    module.exports = internals;