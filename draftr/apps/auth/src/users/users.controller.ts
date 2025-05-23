import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.dto';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async create(@Body() createUserInput: CreateUserInput) {
    return await this.userService.signup(createUserInput);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
