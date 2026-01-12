import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    });
  }

  // GET ALL
  findAll() {
    return this.prisma.product.findMany();
  }

  // GET ONE
  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // UPDATE ✅ (THIS WAS MISSING / NOT SAVED)
  update(id: number, data: Partial<CreateProductDto>) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // DELETE ✅ (THIS WAS MISSING / NOT SAVED)
  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
