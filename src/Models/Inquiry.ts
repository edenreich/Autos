import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({"name": "inquiries"})
export class Inquiry extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    car_id: number;

    @Column()
    pick_up_location_id: number;

    @Column()
    drop_off_location_id: number;

    @CreateDateColumn()
    pick_up_earliest_time: Date;

    @UpdateDateColumn()
    drop_off_latest_time: Date;
}
