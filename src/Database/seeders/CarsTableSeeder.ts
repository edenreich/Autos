import * as faker from "faker";
import { Connection } from "typeorm";

import { Car } from "../../Models/Car";

const models = [ 'Tesla M-3', 'Tesla M-S', 'BMW-X6', 'Toyota Corola' ];
const engines = [ '4-cylinder', '6-cylinder', '8-cylinder', '12-cylinder' ];
const infotainments = [ 'TV', 'Radio', 'Navigation' ];
const designs = [ 'leather', 'luxus', 'urban' ];

export default class CarsTableSeeder
{
    public static async seed(connection: Connection): Promise<any>
    {
        let repository = connection.getRepository(Car);

        await repository.query('SET session_replication_role = replica;');

        for (let i = 1; i <= 50; i++) {
            let car: Car = new Car;
        
            car.location_id = Math.floor((Math.random() * 4) + 1);
            car.model = await this.getModel();
            car.engine = await this.getEngine();
            car.infotainment_system = await this.getInfotainment();
            car.interior_design = await this.getInteriorDesign();
            car.coordinate_x = faker.address.latitude();
            car.coordinate_y = faker.address.longitude();

            await repository.save(car);
        }
        
        console.log("cars table has been filled with dummy data!");

        await repository.query('SET session_replication_role = DEFAULT;');

        return Promise.resolve();
    }

    protected static async getModel(): Promise<string> 
    {
        return Promise.resolve(models[Math.floor(Math.random() * models.length)]);
    }

    protected static async getEngine(): Promise<string> 
    {
        return Promise.resolve(engines[Math.floor(Math.random() * engines.length)]);
    }

    protected static async getInfotainment(): Promise<string> 
    {
        return Promise.resolve(infotainments[Math.floor(Math.random() * infotainments.length)]);
    }

    protected static async getInteriorDesign(): Promise<string> 
    {
        return Promise.resolve(designs[Math.floor(Math.random() * designs.length)]);
    }
}
