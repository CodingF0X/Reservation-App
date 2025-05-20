import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(Reservation.name) reservationModel: Model<Reservation>,
  ) {
    super(reservationModel);
  }
}
