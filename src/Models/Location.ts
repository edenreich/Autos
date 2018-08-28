import { Entity, PrimaryGeneratedColumn, Column, 
    BaseEntity, OneToMany, JoinColumn,
    UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Car } from "../Models/Car";

@Entity({"name": "locations"})
export class Location extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: "varchar", length: 50})
    name: string;

    @Column({nullable: false, type: "varchar", length: 50})
    street: string;

    @Column({nullable: false, type: "varchar", length: 50})
    zip: string;

    @Column({nullable: false, type: "varchar", length: 50})
    tel: string;

    @OneToMany(() => Car, cars => cars.location_id)
    cars: Array<Car>;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
}
