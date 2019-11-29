import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Products } from "./Products";
import { Users } from "./Users";

@Entity()
export class Bids {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  bidPrice: number;

  @Column({ type: "datetime" })
  bidDate: string;

  @ManyToOne(
    type => Products,
    product => product.bids
  )
  product: Products;

  @ManyToOne(
    type => Users,
    user => user.bids
  )
  user: Users;
}
