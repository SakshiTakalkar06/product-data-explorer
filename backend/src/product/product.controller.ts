import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // CREATE
@ApiBody({
  schema: {
    example: {
      name: 'Keyboard',
      price: 1200,
      description: 'Mechanical keyboard'
    }
  }
})

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // GET ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  // ✅ UPDATE
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>,
  ) {
    return this.productService.update(Number(id), body);
  }

  // ✅ DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }
}
