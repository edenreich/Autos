import { Entity, PrimaryGeneratedColumn, Column,
    BaseEntity, CreateDateColumn, UpdateDateColumn, 
    ManyToOne, JoinColumn } from "typeorm";
import { User } from "../Models/User";
import { Car } from "../Models/Car";
import { Location } from "../Models/Location";


@Entity({"name": "inquiries"})
export class Inquiry extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    user_id: number;

    @Column({nullable: false})
    car_id: number;

    @Column({nullable: false})
    pick_up_location_id: number;

    @Column({nullable: false})
    drop_off_location_id: number;

    @Column({type: "timestamp"})
    pick_up_earliest_time: Date;

    @Column({type: "timestamp"})
    drop_off_latest_time: Date;

    @Column({type: "boolean", default: false})
    approved: boolean;

    @Column({type: "boolean", default: false})
    checked: boolean;

    @Column({nullable: true, type: "text"})
    remarks: string;

    @ManyToOne(type => User, user => user.inquiries)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Car, car => car.inquiries)
    @JoinColumn({name: "car_id"})
    car: Car

    @ManyToOne(() => Location, location => location.id)
    @JoinColumn({name: "pick_up_location_id"})
    pick_up_location: Location

    @ManyToOne(() => Location, location => location.id)
    @JoinColumn({name: "drop_off_location_id"})
    drop_off_location: Location

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
}
