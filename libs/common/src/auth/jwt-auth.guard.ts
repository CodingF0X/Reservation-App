import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';
import { SERVICE } from '../constants/services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(SERVICE.AUTH_SERVICE) private readonly authClientProxy: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.Authentication;

    if (!token) {
      throw new UnauthorizedException('Token not found');
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
      );
  }
}
