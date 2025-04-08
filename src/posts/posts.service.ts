import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts() {
    return this.prisma.post.findMany();
  }
  async getPostById(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        categories: {
          include: { category: true },
        },
        comments: true,
      },
    });
  }

  async createPost(title: string, content: string) {
    return this.prisma.post.create({
      data: { title, content },
    });
  }

  async updatePost(id: number, data: { title?: string; content?: string }) {
    return this.prisma.post.update({
      where: { id },
      data: { ...data },
    });
  }

  async deletePost(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
