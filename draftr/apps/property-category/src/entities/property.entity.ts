import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class PropertyCategory extends AbstractDocument {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    required: true,
  })
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

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

  @Prop([
    {
      start: Date,
      end: Date,
    },
  ])
  availability: {
    start: Date;
    end: Date;
  }[];

  @Prop({ default: 1 })
  maxGuests: number;

  //   @Prop({ default: [] })
  //   ratings: number[];
}

export const propertyCategoryModel = SchemaFactory.createForClass(PropertyCategory);