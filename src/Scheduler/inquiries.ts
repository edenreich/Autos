/**
 * This script will run every 5min.
 */

import { createConnection, Between, Equal, Repository } from 'typeorm';
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

    let remarks: string = "";
    let inquiryRepository: Repository<Inquiry> =  connection.getRepository(Inquiry);
    let carRepository: Repository<Car>  =  connection.getRepository(Car);

    // loop each inquiry
    for (let inquiry of inquiries) {

        // inquiry drop_off_location_time is greater than now ?
        // - set car is_free flag to true.
        // - set inquiry checked flag true.
        // - break out of the loop.
        if (inquiry.drop_off_latest_time >= now.toDate()) {
            inquiry.checked = true;
            inquiry.car.is_free = true;
            await carRepository.save(inquiry.car);
            await inquiryRepository.save(inquiry);
            continue;
        }

        // inquiry constraints could be satesfied ?
        // - check if car is_free is true.
        // - check if location drop_off and pick_up times are ok.
        // - if so:
        //   - set inquiry approved and checked to true.
        //   - set car is_free flag to false.
        //   - break out of the loop.
        // - otherwise:
        //   - continue to the next step.
        if (inquiry.car.is_free && inquiry.pick_up_location_id === inquiry.car.location_id) {
            inquiry.checked = true;
            inquiry.approved = true;
            inquiry.car.is_free = false;
            await carRepository.save(inquiry.car);
            await inquiryRepository.save(inquiry);
            continue;
        } else {
            remarks = "car is not free or there is no car available in the chosen location";
        }

        // otherwise, if constraints could not be satesfied ?
        // check for alternative locations and cars with exact match.
        // found a similar car ?
        // - set inquiry approved and checked to true.
        // - update inquiry car id.
        // - set related car is_free to false.
        // - break out of the loop.
        let cars: Array<Car> = inquiry.car.alternatives;
        let alternativeCar: any = undefined;

        for (let car in cars) {
            if (cars[car].is_free && 
                inquiry.car.engine === cars[car].engine &&
                inquiry.car.interior_design === cars[car].interior_design &&
                inquiry.car.infotainment_system === cars[car].infotainment_system &&
                inquiry.pick_up_location_id === cars[car].location_id) {
                alternativeCar = cars[car];
                break;  
            }
        }

        if (alternativeCar) {
            inquiry.checked = true;
            inquiry.approved = true;
            inquiry.car_id = alternativeCar.id;
            alternativeCar.is_free = false;
            await carRepository.save(alternativeCar);
            await inquiryRepository.save(inquiry);
            continue;
        } else {
            remarks += ", could not find an alternative car";
        }

        // nothing could be found ? 
        // - set inquiry checked flag to true.
        // - set inquiry approved flag to false.
        // - save remarks text to this inquiry.
        inquiry.checked = true;
        inquiry.approved = false;
        inquiry.remarks = remarks;
        await inquiryRepository.save(inquiry);

        // [loop end].
    }

}).catch(err => {
    if (process.env.APP_ENV == "testing" || process.env.APP_ENV == "local") {
        console.log("could not connect to the database.", err);
    } else {
        console.log("could not connect to the database.");
    }
});
