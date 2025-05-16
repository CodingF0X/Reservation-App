import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule, { bufferLogs: true });

  const conifgService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: conifgService.getOrThrow('PAYMENTS_TCP_PORT'),
      host: conifgService.getOrThrow('PAYMENTS_HOST'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(conifgService.getOrThrow('PAYMENTS_HTTP_PORT'));

  console.log(
    `HTTP server listening on ${conifgService.getOrThrow<number>(
      'PAYMENTS_HTTP_PORT',
    )}, TCP on ${conifgService.get<number>('PAYMENTS_TCP_PORT')}`,
  );
}
bootstrap();
