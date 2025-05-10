import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}


  @Post('/register')
  async create(@Body() createUserInput: CreateUserInput) {
    return await this.userService.signup(createUserInput);
  }
}
