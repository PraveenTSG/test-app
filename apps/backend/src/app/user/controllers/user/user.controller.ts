import { CreateUserDto } from './../../dto/user.dto';
import { UserService } from './../../services/user/user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('user-add')
  async signupUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
