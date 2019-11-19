import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Products } from './Products';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @ManyToOne(type => Products, products => products.id)
  product: Products;
}
