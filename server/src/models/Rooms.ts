import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Users } from './Users';
import { Reservations } from './Reservations';
import { Files } from './Files';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  maxPeople: number;

  @Column()
  minNights: number;

  @Column()
  roomType: string; // private, entire, shared, hotel

  @Column()
  region: string; // 서울, 경기, 강원, 경남, 경북, 광주, 대구, 대전, 부산, 인천, 전남, 전북, 제주, 세종, 울산, 충남, 충북

  @Column()
  bedroomCounts: number;

  @Column()
  bedCounts: number;

  @Column()
  bathroomCounts: number;

  @Column()
  reviewCounts: number;

  @Column()
  star: number;

  @ManyToOne(type => Users, user => user.rooms)
  user: Users;

  @OneToMany(type => Reservations, reservation => reservation.room)
  reservations: Reservations[];

  @OneToMany(type => Files, file => file.room, { eager: true })
  files: Files[];
}
