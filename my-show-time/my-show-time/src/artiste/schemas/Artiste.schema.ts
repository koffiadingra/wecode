import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtisteDocument = Document<Artiste>;
@Schema({ timestamps: true })
export class Artiste {
  @Prop({ required: true })
  name: string;
}

export const ArtistesSchema = SchemaFactory.createForClass(Artiste);
