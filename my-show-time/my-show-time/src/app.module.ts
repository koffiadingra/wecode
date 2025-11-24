import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConcertModule } from './concert/concert.module';
import { AppController } from './app.controller';
import { ArtisteModule } from './artiste/artiste.module';
import { UsersService } from './users/users.service';
import { ConcertService } from './concert/concert.service';
import { AuthService } from './auth/auth.service';
import { ArtisteService } from './artiste/artiste.service';
import { User, UserSchema } from './users/schemas/users.schema';
import { Concert, ConcertSchema } from './concert/schemas/Concert.shema';
import { Artiste, ArtistesSchema } from './artiste/schemas/Artiste.schema';
import { BookingController } from './booking/booking.controller';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { BookingService } from './booking/booking.service';
import { Booking, BookingSchema } from './booking/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
    MongooseModule.forFeature([{ name: Artiste.name, schema: ArtistesSchema }]),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),

    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://localhost/my_show_time',
    ),
    UsersModule,
    ConcertModule,
    ArtisteModule,
    AuthModule,
    BookingModule,
  ],
  controllers: [AppController, BookingController],
  providers: [
    UsersService,
    ConcertService,
    AuthService,
    ArtisteService,
    BookingService,
  ],
})
export class AppModule {}
