import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.services';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Product } from './products.entity';
import { Roles } from 'src/decorators/roles';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from 'src/dtos/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsControllers {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProductsService(
    @Query(`page`) page: string,
    @Query(`limit`) limit: string,
  ): Promise<{ data: Product[]; total: number }> {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    return this.productsService.getProductsService(pageNumber, limitNumber);
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
    @Body() productData: UpdateProductDto,
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
