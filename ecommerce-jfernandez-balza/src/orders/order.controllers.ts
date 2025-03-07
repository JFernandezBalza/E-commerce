import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './order.services';
import { CreateOrderDto } from 'src/dtos/orders.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @Get(`:id`)
  @UseGuards(AuthGuard)
  getOrder(@Param(`id`, ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrder(orderId);
  }

  @ApiBearerAuth()
  @Delete(`:id`)
  @UseGuards(AuthGuard)
  ordercancell(@Param(`id`, ParseUUIDPipe) orderId: string) {
    return this.ordersService.ordencancell(orderId);
  }
}
