import { IsEmail, IsNotEmpty } from 'class-validator';
import { ChargeDto } from './charge.dto';

export class PaymentDto extends ChargeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
