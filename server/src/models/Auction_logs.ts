import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Products} from './Products';
import {Users} from './Users';

@Entity()
export class Auction_logs {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  AuctionPrice: number;

  @Column()
  AuctionDate: Date;

  @Column()
  IsWinning: boolean;

  @ManyToOne(type => Products, products => products.Id)
  Product: Products;
  @ManyToOne(type => Users, users => users.Id)
  User: Users;
}
