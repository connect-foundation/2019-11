import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Products } from './Products';
import { AuctionLogs } from './AuctionLogs';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginId: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  name: string;

  @Column()
  profileImage: string;

  @Column()
  mannerPoint: number;

  @Column()
  isDelete: boolean;

  @Column()
  email: string;

  @OneToMany(type => Products, Products => Products.id)
  products: Products[];

  @OneToMany(type => AuctionLogs, auctionlogs => auctionlogs.id)
  auctionLogs: AuctionLogs[];
}
