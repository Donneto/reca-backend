'use strict';

// Dependencies
    const Glue = require('@hapi/glue');
    const Config = require('./config');

const internals = {};

internals.init = async () => {
    try {
        const manifest = Config.get('/manifest');
        const options = Config.get('/options');
        const Server = await Glue.compose(manifest, options);

        await Server.start();
        
        console.log(`Server running at: ${Server.info.uri} on env: ${Config.get('/env')}`);
        
        // Catch and error
        process.on('unhandledRejection', (err) => {

            console.log(err);
            process.exit(1);
        });        
    } catch(err) {
        console.log(err);
        process.exit(1);  
    }
};


internals.init();