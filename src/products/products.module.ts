import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { UploaderModule } from 'src/uploader/uploader.module';
import { UploaderService } from 'src/uploader/uploader.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UploaderModule
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ProductsService,
    UploaderService
  ]
})
export class ProductsModule {}
