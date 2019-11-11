import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rooms } from './Rooms';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(type => Rooms, room => room.files)
  room: Rooms;
}
