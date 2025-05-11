import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import { validationSchema } from './validation.schema';
import * as path from 'path';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [path.resolve(process.cwd(), '.env')],
      isGlobal: true,
      ignoreEnvFile: false,
      load: [databaseConfig],
      validationSchema: validationSchema,
    }),
  ],
})
export class ConfigModule {}
