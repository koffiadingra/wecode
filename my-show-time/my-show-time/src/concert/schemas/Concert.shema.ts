import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Category } from 'src/categories/schema/Categorie.schema';

export type ConcertDocument = Document<Concert>;

@Schema({ timestamps: true })
export class Concert {
  @Prop({ required: true })
  artist_name: string;

  @Prop()
  category: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: Date })
  date_concert: Date;

  @Prop()
  image: string;

  @Prop()
  description: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);