import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ConfigModule, SERVICES } from '@app/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RolesGuard } from '@app/common/auth';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    GatewayModule,
    ConfigModule,
    HttpModule,
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          transport: {
            targets: [
              // // send logs to Loki
              {
                target: 'pino-loki',
                options: {
                  host: configService.getOrThrow<string>('LOKI_URL'),
                  labels: { app: 'auth-service', env: 'development' },
                  batching: true,
                  interval: 5,
                },
              },
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

    ClientsModule.registerAsync([
      {
        name: SERVICES.AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.getOrThrow<string>('AUTH_HOST'),
            port: configService.getOrThrow<number>('AUTH_TCP_PORT'),
          },
        }),
      },
    ]),

     HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),

    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // globally enforce JWT
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // globally enforce roles when @Roles() used
    },
  ],
})
export class AppModule {}
