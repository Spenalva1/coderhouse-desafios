import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductEditedDto } from '../dto/prodcut-edited.dto';
import { ProductDto } from '../dto/product.dto';
import { Product, ProductDocument } from '../schemas/product.schema';

const isValidId = Types.ObjectId.isValid;

@Injectable()
export class ProductDao {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  public async create(productDto: ProductDto): Promise<ProductDto> {
    const product = await this.productModel.create(productDto);
    return new ProductDto(
      product._id,
      product.title,
      product.price,
      product.thumbnail,
    );
  }

  public async findAll(): Promise<ProductDto[]> {
    return (await this.productModel.find()).map(
      (product) =>
        new ProductDto(
          product._id,
          product.title,
          product.price,
          product.thumbnail,
        ),
    );
  }

  public async findById(id: string): Promise<ProductDto> {
    if (!isValidId(id)) return null;
    const product = await this.productModel.findById(id);
    if (!product) return null;
    return new ProductDto(
      product._id,
      product.title,
      product.price,
      product.thumbnail,
    );
  }

  public async update(
    id: string,
    productDto: ProductEditedDto,
  ): Promise<ProductDto> {
    if (!isValidId(id)) return null;
    const product = await this.productModel.findByIdAndUpdate(id, productDto);
    if (!product) return null;
    return new ProductDto(
      product._id,
      product.title,
      product.price,
      product.thumbnail,
    );
  }

  public async remove(id: string): Promise<ProductDto> {
    if (!isValidId(id)) return null;
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) return null;
    return new ProductDto(
      product._id,
      product.title,
      product.price,
      product.thumbnail,
    );
  }
}
