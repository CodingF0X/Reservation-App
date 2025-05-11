import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, DatabaseModule } from '@app/common';
import { User, userModel } from './entity/user.entity';
import { UsersRepository } from './user.repository';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: userModel,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
