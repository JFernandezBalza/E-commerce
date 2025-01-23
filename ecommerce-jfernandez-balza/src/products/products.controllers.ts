import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.services';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Product } from './products.entity';

@Controller('products')
export class ProductsControllers {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProductsService(): Promise<Product[]> {
    return this.productsService.getProductsService();
  }
  @Get('seeder')
  seedProducts() {
    return this.productsService.seedProducts();
  }
  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductByIdService(id);
  }
  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: Product) {
    return this.productsService.createProductrService(product);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() productData: Product) {
    return this.productsService.updateProductService(id, productData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteProductService(id);
  }
}
