import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './order.services';
import { CreateOrderDto } from 'src/dtos/orders.dto';

@Controller(`orders`)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @Get(`:id`)
  getOrder(@Param(`id`, ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrder(orderId);
  }
}
