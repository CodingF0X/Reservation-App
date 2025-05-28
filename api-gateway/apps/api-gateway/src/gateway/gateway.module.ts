import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { ReservationsService } from './reservations/reservations.service';
import { AuthService } from './auth/auth.service';
import { PropertyController } from './property/property.controller';
import { PropertyService } from './property/property.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ReservationsService, AuthService, PropertyService],
  controllers: [AuthController, ReservationsController, PropertyController],
})
export class GatewayModule {}
