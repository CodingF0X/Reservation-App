import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule, {
    bufferLogs: true,
  });

  const conifgService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: conifgService.getOrThrow('NOTIFICATIONS_TCP_PORT'),
      host: conifgService.getOrThrow('NOTIFICATIONS_HOST'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(conifgService.getOrThrow('NOTIFICATIONS_HTTP_PORT'));

}
bootstrap();
