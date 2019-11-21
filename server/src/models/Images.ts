import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Products } from './Products';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  ImageUrl: string;

  @ManyToOne(type => Products, products => products.Id)
  Product: Products;
}
