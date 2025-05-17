import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { PaymentDto } from './payment.dto';
import { ReservationDto } from './reservation.dto';
import { Type } from 'class-transformer';

export class ReservationProcessedDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ReservationDto)
  reservation: ReservationDto;
}
