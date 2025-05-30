import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule, EurekaClientModule, SERVICE } from '@app/common';
import { LoggerModule } from 'nestjs-pino';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          transport: {
            targets: [
              // send logs to Loki
              {
                target: 'pino-loki',
                options: {
                  host: configService.getOrThrow<string>('LOKI_URL'),
                  labels: { app: 'notifications-service', env: 'development' },
                  batching: true,
                  interval: 5,
                },
              },
              // keeping pretty-printing for local development
              {
                target: 'pino-pretty',
                options: { singleLine: true, autoLogging: false },
              },
            ],
          },
        },
      }),
    }),

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
      },
    ]),
    EurekaClientModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        instance: {
          app: configService.getOrThrow<string>('NOTIFICATIONS_SERVICE'),
          hostName: configService.getOrThrow<string>(
            'NOTIFICATIONS_HOST',
          ),
          instanceId: configService.getOrThrow<string>('NOTIFICATIONS_SERVICE'),
          ipAddr: configService.getOrThrow<string>(
            'NOTIFICATIONS_SERVICE_ipAddr',
          ),
          port: {
            $: Number(
              configService.getOrThrow<number>('NOTIFICATIONS_HTTP_PORT'),
            ),
            '@enabled': true,
          },
          vipAddress: configService.getOrThrow<string>('NOTIFICATIONS_SERVICE'),
          dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
          },
          metadata: {
            version: configService.getOrThrow<string>(
              'NOTIFICATIONS_API_VERSION',
            ),
          },
        },
        eureka: {
          host: configService.getOrThrow<string>('EUREKA_SERVER_HOST'),
          port: configService.getOrThrow<number>('EUREKA_SERVER_PORT'),
          fetchRegistry: true,
          registryFetchInterval: 10000,
          maxRetries: 5,
          requestRetryDelay: 10000,
          heartbeatInterval: 1000,
          servicePath: '/eureka/apps/',
        },
        shouldUseDelta: true,
      }),
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
