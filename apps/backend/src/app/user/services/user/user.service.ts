import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../../prisma/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //Create User Controller
  async createUser(userData: CreateUserDto) {
    try {
      console.log('userData Service', userData);
      const user = await this.prisma.user.create({
        data: {
          name: userData.name,
          age: Number(userData.age),
          address: userData.address,
        },
      });
      return {
        success: true,
        message: 'User created Successfully !!',
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  //Get All Users Service
  async getAllUsers(params: { crudQuery?: any }) {
    try {
      const users = await this.prisma.user.findMany();
      return {
        users,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  //Get Relevant User by Id Service
  async getUserById(id) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          iduser: Number(id),
        },
      });
      return {
        user,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  //Update Relevant User by Id Service
  async updateUserDetails(
    id,
    userData: UpdateUserDto
    // params: { crudQuery?: any }
  ) {
    try {
      const updateUser = await this.prisma.user.update({
        where: {
          iduser: Number(id),
        },

        data: {
          name: userData.name != '' ? userData.name : undefined, // If null, don't include ---> userData.name != null ? userData.name : undefined
          age: userData.age != 0 ? Number(userData.age) : undefined,
          address: userData.address != '' ? userData.address : undefined,
        },
      });
      return {
        updateUser,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  //Delete Releavant User by Id Service
  async deleteUserById(id) {
    try {
      const deleteUser = await this.prisma.user.delete({
        where: {
          iduser: Number(id),
        },
      });
      return {
        deleteUser,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
