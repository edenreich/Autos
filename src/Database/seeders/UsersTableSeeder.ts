import * as faker from "faker";
import { getConnection } from "typeorm";
import { User } from "../../Models/User";

export class UsersTableSeeder
{
    public static seed()
    {
        let connection = getConnection("local");

        connection.query("TRUNCATE TABLE users;");
        
        for (let i = 1; i < 50; i++) {
            let user = new User;
            user.name = "test";
            user.name = faker.name.firstName();
            user.age = faker.random.number(60);
            user.gender = faker.random.number(1) ? "m" : "f";
            user.save();
            connection.manager.save(user);
        }
    }
}
