import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order)
      throw new NotFoundException('No se encuentra la orden con este id');

    return order;
  }

  async addOrder(userId: string, products: Partial<Product>[]): Promise<Order> {
    let totalPrice = 0;
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('No se encuentra el usuario con este id');
    }

    const order = new Order();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray: Product[] = await Promise.all(
      products.map(async (product) => {
        const existproducts = await this.productsRepository.findOneBy({
          id: product.id,
        });
        if (!existproducts) {
          throw new NotFoundException(
            `Producto ${product.id} no fue encontrado`,
          );
        }
        if (existproducts.stock < 1) {
          throw new NotFoundException(
            `Producto ${product.id} no tiene stock disponible`,
          );
        }

        totalPrice += Number(existproducts.price);

        await this.productsRepository.update(
          { id: product.id },
          { stock: existproducts.stock - 1 },
        );
        return existproducts;
      }),
    );
    const orderDetail = new OrderDetail();
    orderDetail.price = Number(Number(totalPrice.toFixed(2)));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
}
