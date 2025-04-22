import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: `categories`,
})
export class Category {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column({ type: `varchar`, length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];
}
