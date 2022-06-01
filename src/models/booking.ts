import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Room } from "./room";
import { User } from "./user";

@Entity()
@Unique(["date", "roomId"])
export class Booking extends BaseEntity {
    
    @PrimaryColumn({type: 'date', nullable: false})
    date!: String;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Column({})
    userId!: number;
    @ManyToOne(type=> User)
    user!: User;

    @PrimaryColumn({nullable: false})
    roomId!: number;
    @ManyToOne(type=>Room)
    room!: Room;
}