import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Images } from './Images';
import { Users } from './Users';
import { Auction_logs } from './Auction_logs';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  immediate_price: number;

  @Column()
  hope_price: number;

  @Column()
  min_auction_price: number;

  @Column()
  register_date: Date;

  @Column()
  product_deadline: Date;

  @Column()
  category_code: number;

  @Column()
  is_auction: boolean;

  @Column()
  is_sale: boolean;

  @OneToMany(type => Images, images => images.id)
  images: Images[];

  @ManyToOne(type => Users, users => users.id)
  user: Users;

  @OneToMany(type => Auction_logs, auction_logs => auction_logs.id)
  auction_logs: Auction_logs[];
}
