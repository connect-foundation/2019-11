import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rooms } from './Rooms';
import { Reservations } from './Reservations';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  super: boolean;

  @OneToMany(type => Rooms, room => room.user)
  rooms: Rooms[];

  @OneToMany(type => Reservations, reservation => reservation.user)
  reservations: Reservations[];
}
