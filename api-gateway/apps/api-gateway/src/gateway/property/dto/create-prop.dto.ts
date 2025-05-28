import { Type } from 'class-transformer';
import {
  IsArray,
  IsCurrency,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { AvailabiltyDto } from './availability.dto';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  hostId: string;

  @IsCurrency({ symbol_after_digits: true, symbol: '$' })
  @IsNotEmpty()
  pricePerNight: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsArray()
  amenities: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabiltyDto)
  availability: AvailabiltyDto[];

  @IsNumber()
  @IsNotEmpty()
  maxGuests: number;
}
