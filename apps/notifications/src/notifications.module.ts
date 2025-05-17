import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule, SERVICE } from '@app/common';
import { LoggerModule } from 'nestjs-pino';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            autoLogging: false,
          },
        },
      },
    }),

     ClientsModule.registerAsync([
          {
            name: SERVICE.RESERVATION_SERVICE,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              transport: Transport.TCP,
              options: {
                host: configService.getOrThrow('RESERVATION_TCP_HOST'),
                port: configService.getOrThrow('RESERVATION_TCP_PORT'),
              },
            }),  
          }
        ])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
