import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { UploaderService } from 'src/uploader/uploader.service';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>, private uploaderService: UploaderService) {}

  async create(product: CreateProductDto): Promise<Product> {
    const { image } = product;
    if (image) {
      const url = await this.uploaderService.uploadImage(image);
      product.image = url;
    }

    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const { image } = product;
    if (image) {
      const url = await this.uploaderService.uploadImage(image);
      product.image = url;
    }

    return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
