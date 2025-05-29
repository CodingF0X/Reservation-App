import { Module } from '@nestjs/common';
import { PropertyCategoryController } from './property-category.controller';
import { PropertyCategoryService } from './property-category.service';
import { PropertiesRepository } from './properties.repository';
import { ConfigModule, DatabaseModule, EurekaClientModule } from '@app/common';
import {
  PropertyCategory,
  propertyCategoryModel,
} from './entities/property.entity';
import { LoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: PropertyCategory.name, schema: propertyCategoryModel },
    ]),

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
                  labels: { app: 'reservations-service', env: 'development' },
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

     EurekaClientModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            instance: {
              app: configService.getOrThrow<string>('PROPERTY_SERVICE'),
              hostName: configService.getOrThrow<string>(
                'PROPERTY_HOST',
              ),
              instanceId: configService.getOrThrow<string>('PROPERTY_SERVICE'),
              ipAddr: configService.getOrThrow<string>(
                'PROPERTY_SERVICE_ipAddr',
              ),
              port: {
                $: Number(
                  configService.getOrThrow<number>('PROPERTY_HTTP_PORT'),
                ),
                '@enabled': true,
              },
              vipAddress: configService.getOrThrow<string>('PROPERTY_SERVICE'),
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
  controllers: [PropertyCategoryController],
  providers: [PropertyCategoryService, PropertiesRepository],
})
export class PropertyCategoryModule {}
