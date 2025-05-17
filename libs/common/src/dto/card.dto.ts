import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import Stripe from 'stripe';

export class CardDto implements Stripe.PaymentMethodCreateParams.Card {
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
