import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@app/common';

@Module({
  imports: [
    GatewayModule,
    ConfigModule,
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          transport: {
            targets: [
              // // send logs to Loki
              // {
              //   target: 'pino-loki',
              //   options: {
              //     host: configService.getOrThrow<string>('LOKI_URL'),
              //     labels: { app: 'auth-service', env: 'development' },
              //     batching: true,
              //     interval: 5,
              //   },
              // },
              // // keeping pretty-printing for local development
              {
                target: 'pino-pretty',
                options: { singleLine: true, autoLogging: false },
              },
            ],
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
