import { Module } from '@nestjs/common';
import { ArtisteService } from './artiste.service';
import { ArtisteController } from './artiste.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artiste, ArtistesSchema } from './schemas/Artiste.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artiste.name, schema: ArtistesSchema }]),
  ],
  controllers: [ArtisteController],
  providers: [ArtisteService],
  exports: [ArtisteService],
})
export class ArtisteModule {}
