import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MarvelFetchModule } from './marvel-fetch/marvel-fetch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MarvelFetchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
