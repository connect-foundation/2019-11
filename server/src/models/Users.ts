import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Products } from './Products';
import { Auction_logs } from './Auction_logs';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  LoginId: string;

  @Column()
  Password: string;

  @Column()
  Salt: string;

  @Column()
  Name: string;

  @Column()
  ProfileImage: string;

  @Column()
  MannerPoint: number;

  @Column()
  IsDelete: boolean;

  @OneToMany(type => Products, Products => Products.Id)
  Products: Products[];

  @OneToMany(type => Auction_logs, auction_logs => auction_logs.Id)
  AuctionLogs: Auction_logs[];
}
