import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, EurekaClientModule, SERVICE } from '@app/common';
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
      },
    ]),
    EurekaClientModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        instance: {
          app: configService.getOrThrow<string>('PAYMENTS_SERVICE'),
          hostName: configService.getOrThrow<string>('PAYMENTS_SERVICE_PORT'),
          instanceId: configService.getOrThrow<string>('PAYMENTS_SERVICE'),
          ipAddr: configService.getOrThrow<string>('PAYMENTS_SERVICE_ipAddr'),
          port: {
            $: Number(
              configService.getOrThrow<number>('PAYMENTS_SERVICE_PORT'),
            ),
            '@enabled': true,
          },
          vipAddress: configService.getOrThrow<string>('PAYMENTS_SERVICE'),
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
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
