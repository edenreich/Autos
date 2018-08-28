import * as faker from "faker";
import { Connection } from "typeorm";

import { Location } from "../../Models/Location";

const locations = [ 'Berlin', 'Hamburg', 'Stuttgard', 'München' ];

export default class LocationsTableSeeder
{
    public static async seed(connection: Connection): Promise<any>
    {
        let repository = connection.getRepository(Location);

        for (let i = 0; i < locations.length; i++) {
            let location: Location = new Location;
        
            location.name = locations[i];
            location.street = faker.address.streetName();
            location.zip = faker.address.zipCode();
            location.tel = faker.phone.phoneNumber();

            await repository.save(location);
        }
        
        console.log("locations table has been filled with dummy data!");

        return Promise.resolve();
    }
}
