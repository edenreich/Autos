import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Location } from "../Models/Location";

@Entity({"name": "cars"})
export class Car extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location_id: number;

    @Column({"type": "varchar", "length": 50})
    model: string;

    @Column({"type": "varchar", "length": 50})
    engine: string;

    @Column({"type": "varchar", "length": 50})
    infotainment_system: string;

    @Column({"type": "varchar", "length": 50})
    interior_design: string;

    @Column({"type": "varchar", "length": 50})
    coordinate_y: string;

    @Column({"type": "varchar", "length": 50})
    coordinate_x: string;

    @ManyToOne(type => Location)
    @JoinColumn({name: "location_id"})
    location: Array<Location>
}
