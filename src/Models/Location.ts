import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from "typeorm";
import { Car } from "../Models/Car";

@Entity({"name": "locations"})
export class Location extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({"type": "varchar", "length": 30})
    name: string;

    @Column({"type": "varchar", "length": 50})
    street: string;

    @Column({"type": "varchar", "length": 20})
    zip: string;

    @Column({"type": "varchar", "length": 20})
    tel: string;

    @OneToMany(type => Car, cars => cars.location_id)
    cars: Array<Car>;
}
