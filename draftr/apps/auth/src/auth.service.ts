import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entity/user.entity';
import { Request, Response } from 'express';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User, res: Response) {
    const expiresIn = new Date();
    expiresIn.setSeconds(
      Number(
        expiresIn.getSeconds() +
          this.configService.getOrThrow('JWT_EXPIRATION'),
      ),
    );

    const tokenPayload: JwtPayload = {
      _id: user._id.toHexString(), // or to.String() as both deliver the same performance
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    res.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires: expiresIn,
    });

    return res.send({
    event: 'logged In',
    http_status: HttpStatus.OK
    })
  }

  verify(req: Request) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException({ status: 'expired' }, HttpStatus.UNAUTHORIZED);
    }
    
    const token = authHeader.substring(7);
    try {
      this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
      return { status: 'alive' };
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
      throw new HttpException({ status: 'expired' }, HttpStatus.UNAUTHORIZED);
      }
      throw new UnauthorizedException(err.message);
    }
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });

    return response.status(response.statusCode).send({
      event: 'logged out',
      http_status: HttpStatus.ACCEPTED
    });
  }
}
