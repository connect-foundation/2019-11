import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Products } from "./Products";
import { Bids } from "./Bids";

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
  profileUrl: string;

  @Column()
  mannerPoint: number;

  @Column()
  isDelete: boolean;

  @Column()
  email: string;

  @OneToMany(
    type => Products,
    product => product.seller
  )
  products: Products[];

  @OneToMany(
    type => Bids,
    bid => bid.user
  )
  bids: Bids[];
}
