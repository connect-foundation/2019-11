import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Products} from './Products';
import {Users} from './Users2';

@Entity()
export class Auction_logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auction_price: number;

  @Column()
  auction_date: Date;

  @Column()
  is_winning: boolean;

  @ManyToOne(type => Products, products => products.id)
  product: Products;
  @ManyToOne(type => Users, users => users.id)
  user: Users;
}
