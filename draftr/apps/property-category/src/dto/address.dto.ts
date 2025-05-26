import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  country: string;
  @IsString()
  postalCode: string;
}
