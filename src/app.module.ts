import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CategoriesModule, CommentsModule, PostsModule, PrismaModule],
  controllers: [
    AppController,
    CategoriesController,
    CommentsController,
    PostsController,
  ],
  providers: [
    AppService,
    CategoriesService,
    CommentsService,
    PostsService,
    PrismaService,
  ],
})
export class AppModule {}
