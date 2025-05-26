import { PickType } from '@nestjs/mapped-types';
import { Address } from '../entities/schema types/address.schema';

export class AddressDto extends PickType(Address, [
  'street',
  'city',
  'state',
  'country',
  'postalCode',
] as const) {}
