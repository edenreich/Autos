import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({"name": "cars"})
export class Car extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

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
}
