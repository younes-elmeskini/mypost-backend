import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
interface CreateUserDto {
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId: string;
}

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Post('Register')
  async Register(@Body() createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
          userName: createUserDto.userName,
        },
      });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.prisma.user.create({
        data: { ...createUserDto, password: hashedPassword },
        select: {
          userId: true,
          userName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      return {
        status: 201,
        data: user,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Failed to register user',
        error: error,
      };
    }
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      return {
        status: 200,
        data: user,
        message: 'Login successful',
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Failed to login',
        error: error,
      };
    }
  }

  @Get('profil')
  async profil(@Param('id') id: string) {
    try {
      const user = this.prisma.user.findUnique({
        where: {
          userId: id,
        },
        select: {
          userId: true,
          userName: true,
        },
      });
      if (!user) {
        return {
          status: 404,
          message: 'user not found',
        };
      }
      return {
        status: 200,
        data: user,
        message: 'user found',
      };
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        message: 'Failed to get user',
        error: error,
      };
    }
  }
}
