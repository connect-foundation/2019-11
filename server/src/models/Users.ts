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

  @Column({ nullable: true, default: null })
  profileUrl: string;

  @Column({ default: 10 })
  mannerPoint: number;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ nullable: true, default: null })
  email: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

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
