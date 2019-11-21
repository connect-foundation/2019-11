import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Images } from './Images';
import { Users } from './Users';
import { Auction_logs } from './Auction_logs';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Title: string;

  @Column()
  Contents: string;

  @Column()
  ImmediatePrice: number;

  @Column()
  HopePrice: number;

  @Column()
  MinAuctionPrice: number;

  @Column()
  RegisterDate: Date;

  @Column()
  ProductDeadline: Date;

  @Column()
  CategoryCode: number;

  @Column()
  IsAuction: boolean;

  @Column()
  IsSale: boolean;

  @OneToMany(type => Images, images => images.Id)
  Images: Images[];

  @ManyToOne(type => Users, users => users.Id)
  User: Users;

  @OneToMany(type => Auction_logs, auction_logs => auction_logs.Id)
  AuctionLogs: Auction_logs[];
}
