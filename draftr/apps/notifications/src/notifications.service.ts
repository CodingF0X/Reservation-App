import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ReservationProcessedDto } from '@app/common';

@Injectable()
export class NotificationsService {

  mockNotifyEmail (data: ReservationProcessedDto){
    return data;
  }
  //private transporter: nodemailer.Transporter;

  // constructor(private readonly configService: ConfigService) {
  //   this.transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       type: 'OAuth2',
  //       user: this.configService.getOrThrow('SMTP_USER'),
  //       clientId: this.configService.getOrThrow('CLIENT_ID'),
  //       clientSecret: this.configService.getOrThrow('CLIENT_SECRET'),
  //       refreshToken: this.configService.getOrThrow('REFRESH_TOKEN'),
  //       // accessToken: this.configService.getOrThrow('ACCESS_TOKEN'),
  //     },
  //   });
  // }
  // async notifyEmail(data: ReservationProcessedDto) {
  //   const email = data.payment.email;
  //   await this.transporter.sendMail({
  //     from: this.configService.getOrThrow('SMTP_USER'),
  //     to: email,
  //     subject: 'Reservation made !!',
  //     text: 'Hello World! Reservation made',
  //     html: `
  //     <h1>Your Reservation</h1>
  //     <p>Thank you! Here’s your reservation data:</p>
  //     <pre style="background:#f4f4f4;padding:10px;border-radius:4px;"> 
  //     ${JSON.stringify(data, null, 2)}
  //     </pre>
  //     <p>And here’s your mmea ready to fly:</p>
  //     <img src="cid:voucher_cid"/> `,
  //     attachments: [
  //       {
  //         filename: 'mmea.png',
  //         path: 'apps/notifications/src/public/mmea.png',
  //         contentType: 'image/png',
  //       },
  //     ],
  //   });
  // }
}
