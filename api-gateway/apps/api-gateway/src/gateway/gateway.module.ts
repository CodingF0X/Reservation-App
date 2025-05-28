import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsService } from './reservations/reservations.service';
import { AuthService } from './auth/auth.service';
import { PropertyController } from './property/property.controller';
import { PropertyService } from './property/property.service';
import { HttpModule } from '@nestjs/axios';
import { EurekaClientModule } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule,
    EurekaClientModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        instance: {
          app: configService.getOrThrow<string>('API_GATEWAY'),
          hostName: configService.getOrThrow<string>(
            'GATEWAY_HOST',
          ),
          instanceId: configService.getOrThrow<string>('API_GATEWAY'),
          ipAddr: configService.getOrThrow<string>(
            'API_GATEWAY_ipAddr',
          ),
          port: {
            $: Number(
              configService.getOrThrow<number>('GATEWAY_HTTP_PORT'),
            ),
            '@enabled': true,
          },
          vipAddress: configService.getOrThrow<string>('API_GATEWAY'),
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
  providers: [ReservationsService, AuthService, PropertyService],
  controllers: [AuthController, ReservationsController, PropertyController],
})
export class GatewayModule {}
