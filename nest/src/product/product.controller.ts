import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductEditedDto } from './dto/prodcut-edited.dto';

@Controller('api/productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('guardar')
  create(@Body() productDto: ProductDto) {
    const { title, price, thumbnail } = productDto;
    if (!title || !price || !thumbnail)
      return new BadRequestException({ error: 'faltan parametros' });
    return this.productService.create(productDto);
  }

  @Get('listar')
  findAll() {
    return this.productService.findAll();
  }

  @Get('listar/:id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      return new NotFoundException({ error: 'producto no encontrado' });
    }
    return product;
  }

  @Put('actualizar/:id')
  async update(@Param('id') id: string, @Body() productDto: ProductEditedDto) {
    const { title, price, thumbnail } = productDto;
    if (!title || !price || !thumbnail)
      return new BadRequestException({ error: 'faltan parametros' });
    const product = await this.productService.update(id, productDto);
    if (!product) {
      return new NotFoundException({ error: 'producto no encontrado' });
    }
    return product;
  }

  @Delete('borrar/:id')
  async remove(@Param('id') id: string) {
    const product = await this.productService.remove(id);
    if (!product) {
      return new NotFoundException({ error: 'producto no encontrado' });
    }
    return product;
  }
}
