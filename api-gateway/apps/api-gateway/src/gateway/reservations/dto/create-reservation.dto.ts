import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ChargeDto } from './charge.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Start date of the reservation',
    example: '12/20/2004',
  })
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'End date of the reservation',
    example: '12/20/2005',
  })
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the user making the reservation',
    example: '123456',
  })
  placeId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ChargeDto)
  @ApiProperty({
    description: 'Charge details for the reservation',
    example: {
      card: { token: 'tok_visa' },
      amount: 340,
    },
  })
  charge: ChargeDto;
}
