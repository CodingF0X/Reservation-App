import { PickType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-prop.dto';

export class PropertyModel extends PickType(CreatePropertyDto, [
  'name',
  'address',
  'hostId',
  'pricePerNight',
  'currency',
  'amenities',
  'availability',
  'maxGuests',
] as const) {}
