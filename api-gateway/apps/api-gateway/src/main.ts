import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: configService.getOrThrow('GATEWAY_TCP_PORT'),
      host: configService.getOrThrow('GATEWAY_HOST'),
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  await app.startAllMicroservices();

  await app.listen(configService.getOrThrow('GATEWAY_HTTP_PORT'));
}
bootstrap();
