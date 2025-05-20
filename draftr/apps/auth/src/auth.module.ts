import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { EurekaClientModule, RolesGuard } from '@app/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.get<number>('JWT_EXPIRATION')),
        },
      }),
    }),
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

    ClientsModule.register([
      {
        name: 'RESERVATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8002,
        },
      },
    ]),
    EurekaClientModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        instance: {
          app: configService.getOrThrow<string>('AUTH_SERVICE'),
          hostName: configService.getOrThrow<string>(
            'AUTH_SERVICE_PORT',
          ),
          instanceId: configService.getOrThrow<string>('AUTH_SERVICE'),
          ipAddr: configService.getOrThrow<string>(
            'AUTH_SERVICE_ipAddr',
          ),
          port: {
            $: Number(
              configService.getOrThrow<number>('AUTH_SERVICE_PORT'),
            ),
            '@enabled': true,
          },
          vipAddress: configService.getOrThrow<string>('AUTH_SERVICE'),
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
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard, // globally enforce JWT
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard, // globally enforce roles when @Roles() used
    // },
  ],
})
export class AuthModule {}
