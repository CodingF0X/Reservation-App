import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDefined } from 'class-validator';

export class AvailabiltyDto {
  @IsDefined()
  @IsBoolean()
  @Type(() => Boolean)
  isAvailable: boolean;

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
