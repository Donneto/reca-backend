'use strict';

// Dependencies
    const FS = require('fs');
    const Path = require('path');

// Internals
    const internals = {
        routes: []
    };

// Methods
    FS.readdirSync(__dirname).forEach( file => {

        // If its the current file ignore it
        if (file === 'index.js') return;

        internals.routes = [...internals.routes, ...require(Path.join(__dirname, file))];
    });
    
// Exposing
    module.exports = internals.routes;
