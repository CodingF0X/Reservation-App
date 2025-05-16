import { AbstractDocument, Role } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends AbstractDocument {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({type: String, required: true, enum: Role, default: Role.User })
  role: Role;
}

export const userModel = SchemaFactory.createForClass(User);
