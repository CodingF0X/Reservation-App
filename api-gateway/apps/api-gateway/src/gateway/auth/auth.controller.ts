import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { Role, RouteInfo, RouteInfoDecorator } from '@app/common';
import { RegisterDto } from './dto/register.dto';
import { Roles } from '@app/common/auth';

@Controller('gateway')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  async register(
    @Req() req: Request,
    @Res() res,
    @RouteInfoDecorator() route: RouteInfo,
    @Body() body: RegisterDto,
  ) {
    const result = await this.authService.register(req, route, body);
    res.status(result.status).send(result.data);
    return result;
  }

  @Post('auth/login')
  async forwardReqAuth(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @RouteInfoDecorator() route: RouteInfo,
    @Body() body: LoginDto,
  ) {
    const result = await this.authService.login(req, route, body);

    const setCookie = result.headers['set-cookie'];
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }
    res.status(result.status);
    return result.data;
  }

  @Post('auth/logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @RouteInfoDecorator() route: RouteInfo,
  ) {
    const result = await this.authService.logout(req, route);
    const setCookie = result.headers['set-cookie'];
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }
    res.status(result.status);
    return result.data;
  }

  @Get('users')
  @Roles(Role.Admin)
  async forwardReq(
    @Req() req: Request,
    @Res() res,
    @RouteInfoDecorator() route: RouteInfo,
  ) {
    const result = await this.authService.getUsers(req, route);

    res.status(result.status).send(result.data);
    return result;
  }
}
