import { NestFactory } from '@nestjs/core';
import { PropertyCategoryModule } from './property-category.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PropertyCategoryModule, {
    bufferLogs: true,
  });

  const conifgService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: conifgService.getOrThrow('PROPERITY_TCP_PORT'),
      host: conifgService.getOrThrow('PROPERTY_HOST'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(conifgService.getOrThrow('PROPERTY_HTTP_PORT'));
}
bootstrap();
