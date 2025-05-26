import { Transform, Type } from 'class-transformer';
import { IsDate, IsDefined } from 'class-validator';

export class AvailabiltyDto {
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  start: Date;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  end: Date;
}
