import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { ArtisteController } from './artiste.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { ArtisteService } from './artiste.service';
import { ArtisteModule } from './artiste.module';

@Module({
  imports: [
    ArtisteModule,
    MongooseModule.forRoot('mongodb://localhost:27017/show'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
