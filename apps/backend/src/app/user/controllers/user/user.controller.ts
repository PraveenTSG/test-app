import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { UserService } from './../../services/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //Create User Controller
  @Post('user-add')
  async signupUser(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto Controller', createUserDto);
    return this.userService.createUser(createUserDto);
  }

  //Get All Users Controller
  @Get('getUsers')
  async getUsers(@Query('crudQuery') crudQuery: string) {
    const users = await this.userService.getAllUsers({ crudQuery });
    return users;
  }

  //Get Relevant User by Id Controller
  @Get('getUser/:id')
  async getUser(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string
  ) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  //Update relevant user by ID Controller
  @Patch('updateUser/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatePostDto: UpdateUserDto
    // @Query('crudQuery') crudQuery: string
  ) {
    console.log('DTO', updatePostDto);

    const updated = await this.userService.updateUserDetails(
      id,
      updatePostDto
      // { crudQuery }
    );
    return updated;
  }

  //Delete Relevant User by Id Controller
  @Delete('deleteUser/:id')
  async deleteUser(
    @Param('id') id: string
    // @Query('crudQuery') crudQuery: string
  ) {
    return this.userService.deleteUserById(
      id
      // { crudQuery }
    );
  }
}
