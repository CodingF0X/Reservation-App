import {
  All,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('gateway')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  async register(@Req() req: Request, @Res() res) {
    const result = await this.authService.register(req);
    res.status(result.status).send(result.data);
    return result;
  }

  @Post('auth/login')
  async forwardReqAuth(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const result = await this.authService.authentication(req);

    const setCookie = result.headers['set-cookie'];
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }
    res.status(result.status);
    return result.data;
  }

  @Post('auth/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.authentication(req);
    const setCookie = result.headers['set-cookie'];
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }
    res.status(result.status).send(result.data);
    return result.data;
  }

  @Get('users')
  async forwardReq(@Req() req: Request, @Res() res) {
    const result = await this.authService.forwardReq(req);
    res.status(result.status).send(result.data);
    return result;
  }
}
