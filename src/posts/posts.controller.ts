import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { PostsService } from 'src/posts/posts.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    try {
      return this.postsService.getAllPosts();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Postları getirirken hata oluştu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findPostById(@Param('id') id: string) {
    try {
      const post = await this.postsService.getPostById(+id);
      if (!post) {
        throw new HttpException(
          'Post bulunamadı',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Post bulunamadı',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  async createPost(@Body() data: CreatePostDto) {
    try {
      const { title, content } = data;
      return await this.postsService.createPost(title, content);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Post oluşturulurken hata oluştu',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put(':id')
  async updatePost(
    @Param(':id') id: string,
    @Body() UpdatePostDto: UpdatePostDto,
  ) {
    try {
      const updatedPost = await this.postsService.updatePost(
        +id,
        UpdatePostDto,
      );
      if (!updatedPost) {
        throw new HttpException('Post bulunamadı', HttpStatus.NOT_FOUND);
      }
      return updatedPost;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Post güncellenirken hata oluştu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    try {
      const deletedPost = await this.postsService.deletePost(+id);
      if (!deletedPost) {
        throw new HttpException('Post bulunamadı', HttpStatus.NOT_FOUND);
      }
      return { message: 'Post silindi' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Post silinemedi',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
