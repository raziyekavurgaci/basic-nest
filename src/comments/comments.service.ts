import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllComments(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        post: true,
      },
    });
  }
  async getCommentsByPostId(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Yorum bulunamadı');
    }
    return comment;
  }

  async createComment(data: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: data.postId },
    });
    if (!post) {
      throw new NotFoundException('Postu bulamadım sori');
    }
    return this.prisma.comment.create({
      data: { content: data.content, postId: data.postId },
    });
  }

  async deleteComment(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
