import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Images } from "./Images";
import { Users } from "./Users";
import { Bids } from "./Bids";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  contents: string;

  @Column()
  immediatePrice: number;

  @Column({ nullable: true })
  hopePrice: number;

  @Column({ nullable: true })
  startBidPrice: number;

  @Column()
  registerDate: Date;

  @Column({ nullable: true })
  auctionDeadline: Date;

  @Column({ nullable: true })
  extensionDate: Date;

  @Column({ nullable: true })
  soldPrice: number;

  @Column({ nullable: true })
  soldDate: Date;

  @Column()
  thumbnailUrl: string;

  @Column()
  categoryCode: number;

  @Column()
  isAuction: boolean;

  @OneToMany(
    type => Images,
    image => image.product
  )
  images: Images[];

  @Column({ nullable: true })
  buyerId: number;

  @ManyToOne(
    type => Users,
    user => user.products
  )
  seller: Users;

  @OneToMany(
    type => Bids,
    bid => bid.product
  )
  bids: Bids[];
}
