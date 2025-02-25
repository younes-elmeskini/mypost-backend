import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreatePostDto {
  bannerPic: string;
  description: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId: string;
}

@Controller('posts')
export class PostController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.prisma.post.update({ where: { postId: id }, data: updatePostDto });
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.prisma.post.delete({ where: { postId: id } });
  }
}





