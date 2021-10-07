import { Injectable } from '@nestjs/common';
import { ProductDao } from './dao/Product.dao';
import { ProductEditedDto } from './dto/prodcut-edited.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private productDao: ProductDao) {}

  create(productDto: ProductDto): Promise<ProductDto> {
    return this.productDao.create(productDto);
  }

  findAll(): Promise<ProductDto[]> {
    return this.productDao.findAll();
  }

  findById(id: string): Promise<ProductDto> {
    return this.productDao.findById(id);
  }

  update(id: string, productDto: ProductEditedDto): Promise<ProductDto> {
    return this.productDao.update(id, productDto);
  }

  remove(id: string): Promise<ProductDto> {
    return this.productDao.remove(id);
  }
}
