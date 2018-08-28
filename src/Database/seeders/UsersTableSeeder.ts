import * as faker from "faker";
import * as bcrypt from "bcrypt";
import { Connection } from "typeorm";

import { User } from "../../Models/User";

const genders = [ 'male', 'female' ];

export default class UsersTableSeeder
{
    public static async seed(connection: Connection): Promise<any>
    {
        let repository = connection.getRepository(User);

        for (let i = 0; i <= 50; i++) {
            let user: User = new User;
        
            user.name = faker.name.findName();
            user.gender = await this.getGender();
            user.password = await bcrypt.hash('test123', 10);
            user.age = Math.floor(Math.random() * 10) + 28;

            await repository.save(user);
        }
        
        console.log("users table has been filled with dummy data!");

        return Promise.resolve();
    }

    protected static async getGender(): Promise<string>
    {
        return Promise.resolve(genders[Math.floor(Math.random() * genders.length)]);
    }
}
