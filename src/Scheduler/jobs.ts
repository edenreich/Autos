/**
 * This script will run every 10min.
 */

import { createConnection } from 'typeorm';

createConnection().then(async _connection => {
    console.log("connected");

}).catch(err => {
    console.log("could not connect to the database.");
});
