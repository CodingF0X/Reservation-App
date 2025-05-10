import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule } from '@app/common';
import { ReservationService } from './reservation.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { Reservation, reservationModel } from './entities/reservation.entity';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Reservation.name, schema: reservationModel },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationService, ReservationsRepository],
})
export class ReservationsModule {}
