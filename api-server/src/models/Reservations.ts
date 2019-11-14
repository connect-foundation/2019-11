import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rooms } from './Rooms';
import { Users } from './Users';

@Entity()
export class Reservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: Date;

  @Column()
  day: number;

  @ManyToOne(type => Users, user => user.reservations)
  user: Users[];

  @ManyToOne(type => Rooms, room => room.reservations)
  room: Rooms;
}
