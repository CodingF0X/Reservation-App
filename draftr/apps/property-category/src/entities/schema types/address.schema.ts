// address.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@Schema({ _id: false })
export class Address {
  @Prop({ required: true })
  @IsString()
  street: string;

  @Prop({ required: true })
  @IsString()
  city: string;

  @Prop({ required: true })
  @IsString()
  state: string;

  @Prop({ required: true })
  @IsString()
  country: string;

  @Prop({ required: true })
  @IsString()
  postalCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
