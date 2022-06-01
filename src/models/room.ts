import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./booking";
@Entity()
export class Room extends BaseEntity{
  @PrimaryGeneratedColumn('identity', { name: 'id', generatedIdentity: 'BY DEFAULT' })
  id!: number;

  @Column()
  name!: string;

  @OneToMany((type) => Booking, (booking) => booking.room)
    bookings!: Booking[]
}