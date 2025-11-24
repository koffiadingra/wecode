import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Concert } from 'src/concert/schemas/Concert.shema';
import { User } from 'src/users/schemas/users.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: string | User;

  @Prop({ type: Types.ObjectId, ref: 'Concert', required: true })
  concert: string | Concert;

  @Prop({ default: new Date() })
  bookedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
