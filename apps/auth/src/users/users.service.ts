import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async signup(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.create(createUserInput);
  }
}
