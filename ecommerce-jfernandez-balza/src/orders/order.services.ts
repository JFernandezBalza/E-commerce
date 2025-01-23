import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Product } from 'src/products/products.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  addOrder(userId: string, product: Partial<Product>[]) {
    return this.ordersRepository.addOrder(userId, product);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
