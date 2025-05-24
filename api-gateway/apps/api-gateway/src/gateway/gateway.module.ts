import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, SERVICES } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsService } from './reservations/reservations.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [],
  providers: [GatewayService, ReservationsService, AuthService],
  controllers: [GatewayController, AuthController, ReservationsController],
})
export class GatewayModule {}
