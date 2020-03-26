'use strict';

// Dependencies
    const moment = require('moment');
    const os = require('os');

// Exposing
    module.exports = [
        // heartbeat
        {method: 'GET', path: '/heartbeat', handler: (request, h) => { return `{ts '${moment().format('YYYY-MM-DD hh:mm:ss')}'} Server: ${os.hostname()}` } },
        // 404 Handler
        { method: '*', path: '/{any*}', handler: (request, h) => { return '404 Page not found.';} }
    ];