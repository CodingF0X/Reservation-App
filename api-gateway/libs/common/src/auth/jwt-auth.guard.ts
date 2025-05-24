import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { SERVICES } from '../constants';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(SERVICES.AUTH_SERVICE)
    private readonly authClientProxy: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies?.Authentication;
    const path = request.url;

    if (path.includes('/register')) {
      return true;
    }

    if (path.includes('/login')) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('Access Denied - Token not found ');
    }

    return this.authClientProxy
      .send('authenticate', {
        Authentication: token,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError(() => {
          throw new UnauthorizedException('Token not found');
        }),
      );
  }
}
