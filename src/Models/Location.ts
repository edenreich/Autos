import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({"name": "locations"})
export class Location extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    auto_id: number;

    @Column({"type": "varchar", "length": 30})
    name: string;

    @Column({"type": "varchar", "length": 50})
    street: string;

    @Column({"type": "varchar", "length": 20})
    zip: string;

    @Column({"type": "varchar", "length": 20})
    tel: string;
}
