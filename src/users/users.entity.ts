import { Order } from 'src/entities/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: `users`,
})
export class User {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column({ type: `varchar`, length: 50, nullable: false })
  name: string;

  @Column({ type: `varchar`, length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: `text`, nullable: false })
  password: string;

  @Column({ type: `int` })
  phone: number;

  @Column({ type: `varchar`, length: 50 })
  country: string;

  @Column({ type: `varchar` })
  address: string;

  @Column({ type: `varchar`, length: 50 })
  city: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
