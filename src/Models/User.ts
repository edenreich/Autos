import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Inquiry } from "./Inquiry"


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

    @Column({"select": false})
    password: string;

    @OneToMany(type => Inquiry, Inquiry => Inquiry.user_id)
    inquiries: Inquiry[];
}
