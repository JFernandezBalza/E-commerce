import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { User } from 'src/users/users.entity';

@Entity({
  name: `orders`,
})
export class Order {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetail, (OrderDetails) => OrderDetails.order)
  orderDetails: OrderDetail;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: `user_id` })
  user: User;
}
