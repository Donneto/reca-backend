'use strict';

// Dependencies
    const Confidence = require('confidence');
    const Path = require('path');

// Plugins
    const RouterPG = require('../plugins/router');
    const DatabasePG = require('../plugins/database');

const internals = {
    defaults: {
        env: process.env.NODE_ENV || 'dev'
    },
    mongo: {
        uri: 'mongodb+srv://recadmin:wRcCLn59cwbLyUP@cluster0-c9l6i.mongodb.net/reca?retryWrites=true&w=majority',
        dbName: 'reca',
        mongoOptions: {
            user: 'recadmin',
            pass: 'wRcCLn59cwbLyUP'
        }
    }
};

internals.config = {
    root: Path.resolve(__dirname, '../'),
    env: internals.defaults.env,
    manifest: {
        server: {
            port: {
                $filter: 'env',
                production: process.env.PORT,
                $default: 3000
            },
            host: {
                $filter: 'env',
                production: '0.0.0.0',
                $default: 'localhost'
            },
            routes: {
                cors: true
            }
        },
        register: {
            plugins: [
                { plugin: RouterPG, options: { root: Path.resolve(__dirname, '../') } },
                { plugin: DatabasePG, options: internals.mongo }
            ]
        }
    },
    options: {
        relativeTo: __dirname
    }
};

internals.store = new Confidence.Store(internals.config);

// Exposing things
    exports.get = (key, opts = {}) => {
        const criteria = Object.assign({}, internals.defaults, opts);

        return internals.store.get(key, criteria);
    };