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
    // - set car is_free flag to true.
    // - set inquiry checked flag true.
    // - break out of the loop.

    // @todo inquiry constraints could be satesfied ?
    // - check if car is_free is true
    // - check if location drop_off and pick_up times are ok
    // - if so, set inquiry approved and checked to true and break out of the loop.

    // @todo otherwise, if constraints could not be satesfied ?
    // check for alternative locations and cars with exact match.
    // found a similer car ?
    // - set inquiry approved and checked to true.
    // - update inquiry car id.
    // - set related car is_free to false.
    // - break out of the loop.

    // @todo nothing could be found ? 
    // - set inquiry checked flag to true.
    // - set inquiry approved flag to false.
    // - save remarks text to this inquiry.

    // [loop end].

}).catch(err => {
    if (process.env.APP_ENV == "testing" || process.env.APP_ENV == "local") {
        console.log("could not connect to the database.", err);
    } else {
        console.log("could not connect to the database.");
    }
});
