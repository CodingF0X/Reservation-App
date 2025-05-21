import { Inject, Module } from '@nestjs/common';
import {
  ConfigModule,
  DatabaseModule,
  EurekaClientModule,
  SERVICE,
} from '@app/common';
import { ReservationService } from './reservation.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { Reservation, reservationModel } from './entities/reservation.entity';
import { LoggerModule } from 'nestjs-pino';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Reservation.name, schema: reservationModel },
    ]),
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
        name: SERVICE.AUTH_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_TCP_PORT'),
          },
        }),
      },
      {
        name: SERVICE.PAYEMENTS_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('PAYMENTS_HOST'),
            port: configService.get('PAYMENTS_TCP_PORT'),
          },
        }),
      },
      {
        name: SERVICE.NOTIFICATIONS_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFICATIONS_HOST'),
            port: configService.get('NOTIFICATIONS_TCP_PORT'),
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

    EurekaClientModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        instance: {
          app: configService.getOrThrow<string>('RESERVATIONS_SERVICE'),
          hostName: configService.getOrThrow<string>(
            'RESERVATIONS_SERVICE_PORT',
          ),
          instanceId: configService.getOrThrow<string>('RESERVATIONS_SERVICE'),
          ipAddr: configService.getOrThrow<string>(
            'RESERVATIONS_SERVICE_ipAddr',
          ),
          port: {
            $: Number(
              configService.getOrThrow<number>('RESERVATIONS_SERVICE_PORT'),
            ),
            '@enabled': true,
          },
          vipAddress: configService.getOrThrow<string>('RESERVATIONS_SERVICE'),
          dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
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
  controllers: [ReservationsController],
  providers: [ReservationService, ReservationsRepository],
})
export class ReservationsModule {}
