import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as path from 'path';
import uriConfig from './uri.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [path.resolve(process.cwd(), '.env')],
      isGlobal: true,
      ignoreEnvFile: false,
      load:[uriConfig]
    }),
  ],
})
export class ConfigModule {}
