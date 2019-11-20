import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Products } from './Products';
import { Auction_logs } from './Auction_logs';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login_id: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  name: string;

  @Column()
  profile_image: string;

  @Column()
  manner_point: number;

  @Column()
  is_delete: boolean;

  @OneToMany(type => Products, Products => Products.id)
  products: Products[];

  @OneToMany(type => Auction_logs, auction_logs => auction_logs.id)
  auction_logs: Auction_logs[];
}
