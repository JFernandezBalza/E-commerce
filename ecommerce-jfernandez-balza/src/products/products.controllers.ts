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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
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
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() product: Partial<Product>) {
    return this.productsService.createProductrService(product);
  }
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: Product,
  ) {
    return this.productsService.updateProductService(id, productData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProductService(id);
  }
}
