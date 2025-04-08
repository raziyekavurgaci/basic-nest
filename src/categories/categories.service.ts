import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categori bulunamadı`);
    }
    return category;
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });
    if (existCategory) {
      throw new NotFoundException(`Bu kategori zaten mevcut`);
    }
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categori bulunamadı`);
    }
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }
  async deleteCategory(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categori bulunamadı`);
    }
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
