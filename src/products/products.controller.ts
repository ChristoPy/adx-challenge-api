import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Inject, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NoAuth } from 'src/auth/constants';
import { CACHE_MANAGER, CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Product } from './schemas/product.schema';

@UsePipes(new ValidationPipe())
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @NoAuth()
  @CacheKey('products')
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @NoAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const products = await this.cacheManager.get<Product[]>('products')
    if (products) {
      const product = products.find((product: any) => product._id === id);
      if (product) {
        const index = products.indexOf(product);
        products[index] = updateProductDto;
        this.cacheManager.set('products', products);
      }
    }
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const products = await this.cacheManager.get<Product[]>('products')
    if (products) {
      const product = products.find((product: any) => product._id === id);
      if (product) {
        const index = products.indexOf(product);
        products.splice(index, 1);
        this.cacheManager.set('products', products);
      }
    }
    return this.productsService.remove(id);
  }
}
