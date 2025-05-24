import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto{
  // @IsString()
  // @IsNotEmpty()
  // cvc: string;

  // @IsNumber()
  // @IsNotEmpty()
  // exp_month: number;

  // @IsNumber()
  // @IsNotEmpty()
  // exp_year: number;

  // @IsCreditCard()
  // @IsNotEmpty()
  // number: string;
  @IsString()
  @IsNotEmpty()
  token?: string;
}
