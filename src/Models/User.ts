import { Entity, PrimaryGeneratedColumn, Column, 
    BaseEntity, OneToMany,
    UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Inquiry } from "./Inquiry"


@Entity({"name": "users"})
export class User extends BaseEntity 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 50})
    name: string;

    @Column({type: "varchar", length: 10})
    gender: string;

    @Column("int")
    age: number;

    @Column({select: false})
    password: string;

    @OneToMany(type => Inquiry, inquiries => inquiries.user_id)
    inquiries: Array<Inquiry>;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;
}
