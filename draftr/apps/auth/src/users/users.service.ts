import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User } from './entity/user.entity';
import { CreateUserInput } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async signup(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = await this.userRepository.create({
        ...createUserInput,
        password: await this.hashPassword(createUserInput.password),
      });

      return user;
    } catch (error) {
      if (error.message.includes('E11000')) {
        throw new UnprocessableEntityException('Email already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
