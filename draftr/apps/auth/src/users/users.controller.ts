import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';

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

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.updateUser(id, updateUserInput);
  }
}
