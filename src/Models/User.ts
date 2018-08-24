import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({"name": "users"})
export class User extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({"type": "varchar", "length": 50})
    name: string;

    @Column({"type": "varchar", "length": 10})
    gender: string;

    @Column()
    age: number;
}
