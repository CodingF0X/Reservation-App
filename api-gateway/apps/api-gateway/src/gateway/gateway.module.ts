import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsService } from './reservations/reservations.service';
import { AuthService } from './auth/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ReservationsService, AuthService],
  controllers: [AuthController, ReservationsController],
})
export class GatewayModule {}
