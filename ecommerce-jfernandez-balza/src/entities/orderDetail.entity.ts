import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { Product } from 'src/products/products.entity';

@Entity({
  name: `order_details`,
})
export class OrderDetail {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: `order_id` })
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable({
    name: `ORDER_DETAILS_PRODUCT`,
  })
  products: Product[];
}
