import { Module } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { PostsController } from 'src/posts/posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
