import { Entity, PrimaryGeneratedColumn, Column, 
    BaseEntity, ManyToOne, JoinColumn, 
    CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Location } from "../Models/Location";
import { Inquiry } from "./Inquiry";

@Entity({"name": "cars"})
export class Car extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    location_id: number;

    @Column({nullable: false, type: "varchar", length: 50})
    model: string;

    @Column({nullable: false, type: "varchar", length: 50})
    engine: string;

    @Column({nullable: false, type: "varchar", length: 50})
    infotainment_system: string;

    @Column({nullable: false, type: "varchar", length: 50})
    interior_design: string;

    @Column({nullable: false, type: "varchar", length: 50})
    coordinate_y: string;

    @Column({nullable: false, type: "varchar", length: 50})
    coordinate_x: string;

    @Column({default: true})
    is_free: boolean

    @ManyToOne(type => Location, location => location.cars)
    @JoinColumn({name: "location_id"})
    location: Location;

    @OneToMany(type => Inquiry, inquiry => inquiry.car)
    inquiries: Location;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
}
