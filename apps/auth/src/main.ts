import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, { bufferLogs: true });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8001,
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
