import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schema types/address.schema';

@Schema({ versionKey: false })
export class PropertyCategory extends AbstractDocument {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: AddressSchema,
    required: true,
    _id: false,
  })
  address: Address;

  @Prop({ required: true })
  hostId: string;

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ default: 'usd' })
  currency: string;

  @Prop([String])
  amenities: string[];

  //   @Prop([String])
  //   images: string[];

  @Prop({
    type: [
      {
        start: Date,
        end: Date,
      },
    ],
    required: true,
    _id: false,
    default: [],
  })
  availability: {
    start: Date;
    end: Date;
  }[];

  @Prop({ default: 1 })
  maxGuests: number;

  //   @Prop({ default: [] })
  //   ratings: number[];
}

export const propertyCategoryModel =
  SchemaFactory.createForClass(PropertyCategory);
