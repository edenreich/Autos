/**
 * This script will run every 5min.
 */

import { createConnection, Between, Equal, Connection } from 'typeorm';
import { Inquiry } from '../Models/Inquiry';
import { Car } from '../Models/Car';
import moment = require("moment");

createConnection().then(async connection => {
    const repository = connection.getRepository(Inquiry);
    const now = moment();
    const yesterday = moment().subtract(1, 'd');

    // get all bookings between today and yesterday
    let inquiries = await repository.find({ where: { 
        created_at: Between(yesterday, now),
        approved: Equal(false),
        checked: Equal(false)
    }, relations: ["car", "pick_up_location", "drop_off_location"]});

    console.log(inquiries);

    // @todo loop each inquiry
    
    // @todo inquiry drop_off_location_time is greater than now ?
    // set car is_free flag to true and inquiry checked flag true, and break out of the loop.

    // @todo check if the inquiry constraints could be satesfied.

    // @todo constraints could be satesfied ?
    // set inquiry approved to true, set the related car is_free flag to false to 
    // and break out of the loop.

    // @todo constraints could not be satesfied ?
    // check for alternative locations and cars with exact match.
    // found a car ?
    // - set inquiry approved to true, set the related car is_free flag to false
    // - update inquiry car id
    // break out of the loop.

    // @todo mark the inquiry with approved flag set to true.
    // if false add remarks text to this inquiry.

    // @todo mark the inquiry with checked flag to true.

    // @todo close the loop.

}).catch(err => {
    if (process.env.APP_ENV == "testing" || process.env.APP_ENV == "local") {
        console.log("could not connect to the database.", err);
    } else {
        console.log("could not connect to the database.");
    }
});
