import { UsersTableSeeder } from "./UsersTableSeeder"
import { Table } from "typeorm";

export class TableSeeder
{
    public static seed()
    {
        UsersTableSeeder.seed();
    }
}

TableSeeder.seed();