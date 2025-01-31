import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.services';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Product } from './products.entity';
import { Roles } from 'src/decorators/roles';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.getProductByIdService(id);
  }
  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: Product) {
    return this.productsService.createProductrService(product);
  }
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: Product,
  ) {
    return this.productsService.updateProductService(id, productData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProductService(id);
  }
}
