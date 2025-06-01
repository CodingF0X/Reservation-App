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
import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {
  @IsString()
  @ApiProperty({
    description: 'Property name',
    example: 'Property name',
  })
  name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @ApiProperty({
    description: 'Property address',
    example: {
      street: 'Broadway',
      city: 'NYC',
      state: 'NY',
      country: 'USA',
      postalCode: '132355',
    },
  })
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'the _id of the host user',
    example: '1234567890asfaefjadfea',
  })
  hostId: string;

  @IsCurrency({ symbol_after_digits: true, symbol: '$' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price per night',
    example: '$100',
  })
  pricePerNight: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Property description',
    example: 'USD',
  })
  currency: string;

  @IsArray()
  @ApiProperty({
    description: 'Property amenities',
    example: ['amenity1', 'amenity2'],
  })
  amenities: string[];

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabiltyDto)
  @ApiProperty({
    description: 'Property availability',
    example: [
      {
        isAvailable: true,
        start: '2021-01-01',
        end: '2021-01-02',
      },
    ],
  })
  availability: AvailabiltyDto[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Maximum number of guests',
    example: 2,
  })
  maxGuests: number;
}
