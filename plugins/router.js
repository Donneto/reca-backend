'use strict';

// Dependencies
    const Routes = require('../routes');

// Exposing
    exports.plugin = {
        name: 'Router',
        version: '1.0.0',
        register: async (server, options) => {
            
            server.route(Routes);
        }
    };