import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Concert, ConcertSchema } from './schemas/Concert.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
  ],
  controllers: [ConcertController],
  providers: [ConcertService],
  exports: [ConcertService],
})
export class ConcertModule {}
