import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest();
      const { email, _id: userId } = req.headers;
      const user: UserDto = { email, userId };
      return user;
    }
  },
);
