import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    try {
      const category = await this.categoriesService.getCategoryById(id);
      if (!category) {
        throw new HttpException('Kategori bulunamadı', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Kategori bulunamadı', HttpStatus.NOT_FOUND);
    }
  }
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory =
        await this.categoriesService.createCategory(createCategoryDto);
      if (!newCategory) {
        throw new HttpException(
          'Kategori oluşturulamadı',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return newCategory;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Kategori oluşturulurken hata oluştu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const updatedCategory = await this.categoriesService.updateCategory(
        id,
        updateCategoryDto,
      );
      if (!updatedCategory) {
        throw new HttpException('Kategori bulunamadı', HttpStatus.NOT_FOUND);
      }
      return updatedCategory;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Kategori güncellenirken hata oluştu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedCategory = await this.categoriesService.deleteCategory(id);
      if (!deletedCategory) {
        throw new HttpException('Kategori bulunamadı', HttpStatus.NOT_FOUND);
      }
      return deletedCategory;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Kategori silinirken hata oluştu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
