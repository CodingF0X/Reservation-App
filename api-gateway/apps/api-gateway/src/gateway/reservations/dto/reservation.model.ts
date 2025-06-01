import { PickType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';

export class ReservationModel extends PickType(CreateReservationDto, [
  'startDate',
  'endDate',
  'placeId',
  'charge',
] as const) {}
