import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':postId')
  async getAllComments(@Param('postId', ParseIntPipe) postId: number) {
    try {
      const comments = await this.commentsService.getAllComments(postId);
      if (!comments || comments.length === 0) {
        throw new HttpException('Yorum bulunamadı', HttpStatus.NOT_FOUND);
      }
      return comments;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Yorumlar getirilemedi',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('single/:id')
  async getCommentById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.commentsService.getCommentsByPostId(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Yorum getirilemedi', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    try {
      return await this.commentsService.createComment(createCommentDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Yorum eklenirken hata', HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.commentsService.deleteComment(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Yorum silinirken hata', HttpStatus.BAD_REQUEST);
    }
  }
}
