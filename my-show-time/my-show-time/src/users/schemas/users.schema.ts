import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false }) // false = user, true = admin
  isAdmin: boolean;

  @Prop({ type: [String], default: [] }) //  vide par défaut
  favoris: string[];

  _id: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
