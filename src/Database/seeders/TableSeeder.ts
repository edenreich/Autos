import { createConnection, Connection } from "typeorm";
import CarsTableSeeder from "./CarsTableSeeder";
import UsersTableSeeder from "./UsersTableSeeder";
import LocationsTableSeeder from "./LocationsTableSeeder";

export class TableSeeder
{
    protected static connection: Connection | undefined;

    public async createConnection(): Promise<Connection>
    {
        if (TableSeeder.connection) {
            return Promise.resolve(TableSeeder.connection);
        }

        TableSeeder.connection = await createConnection();

        return Promise.resolve(TableSeeder.connection);
    }

    public async seed(connection: Connection): Promise<any>
    {
        try {
            await connection.dropDatabase();
            await connection.synchronize();
            await UsersTableSeeder.seed(connection);
            await LocationsTableSeeder.seed(connection);
            await CarsTableSeeder.seed(connection);
            return Promise.resolve();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }

        return process.exit(0);
    }
}

let seeder: TableSeeder = new TableSeeder;

seeder.createConnection().then(async connection => {
    await seeder.seed(connection);
});