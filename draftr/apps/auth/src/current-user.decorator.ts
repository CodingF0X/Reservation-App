import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const req = ctx.switchToHttp().getRequest();
      return req.user;
    }
  },
);

