import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RouteInfo } from '../interfaces';
import { Request } from 'express';

export const RouteInfoDecorator = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RouteInfo => {
    const req = ctx.switchToHttp().getRequest<Request>();

    const [_gateway, serviceName, ...rest] = req.path.split('/').filter(Boolean);

    return {
      serviceName,
      targetPath: rest.join('/'),
    };
  },
);
