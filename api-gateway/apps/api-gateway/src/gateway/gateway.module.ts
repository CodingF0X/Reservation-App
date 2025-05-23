import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, SERVICES } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [GatewayService],
  controllers: [GatewayController],
})
export class GatewayModule {}
