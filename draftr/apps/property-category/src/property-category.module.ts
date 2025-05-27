import { Module } from '@nestjs/common';
import { PropertyCategoryController } from './property-category.controller';
import { PropertyCategoryService } from './property-category.service';
import { PropertiesRepository } from './properties.repository';
import { ConfigModule, DatabaseModule } from '@app/common';
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
  ],
  controllers: [PropertyCategoryController],
  providers: [PropertyCategoryService, PropertiesRepository],
})
export class PropertyCategoryModule {}
