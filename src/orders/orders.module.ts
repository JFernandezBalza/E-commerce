import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { OrdersService } from './order.services';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './order.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, Product, User, Order])],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
