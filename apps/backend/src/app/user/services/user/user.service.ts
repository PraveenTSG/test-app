import { CreateUserDto } from './../../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../../prisma/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: userData,
      });
      return {
        success: true,
        message: 'User created Successfully !!',
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
