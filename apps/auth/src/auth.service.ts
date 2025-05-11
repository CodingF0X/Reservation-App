import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entity/user.entity';
import { Response } from 'express';
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
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    res.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires: expiresIn,
    });
  }

 logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
