import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import { validationSchema } from './validation.schema';
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      ignoreEnvFile: false,
      load: [databaseConfig],
      validationSchema: validationSchema,
    }),
  ],
})
export class ConfigModule {}
