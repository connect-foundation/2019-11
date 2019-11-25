import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Images } from "./Images";
import { Users } from "./Users";
import { AuctionLogs } from "./AuctionLogs";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  immediatePrice: number;

  @Column()
  hopePrice: number;

  @Column()
  minAuctionPrice: number;

  @Column()
  registerDate: Date;

  @Column()
  productDeadline: Date;

  @Column()
  categoryCode: number;

  @Column()
  isAuction: boolean;

  @Column()
  isSale: boolean;

  @OneToMany(
    type => Images,
    images => images.id
  )
  images: Images[];

  @ManyToOne(
    type => Users,
    users => users.id
  )
  user: Users;

  @OneToMany(
    type => AuctionLogs,
    auctionlogs => auctionlogs.id
  )
  auctionLogs: AuctionLogs[];
}
