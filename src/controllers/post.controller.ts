import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreatePostDto {
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
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
    return this.prisma.post.update({ where: { id }, data: updatePostDto });
  }
}





