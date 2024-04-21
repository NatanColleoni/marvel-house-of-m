import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MarvelFetchModule } from './marvel-fetch/marvel-fetch.module';
import { PrismaService } from './prisma.service';
import { ComicsModule } from './comics/comics.module';
import { HeroesModule } from './heroes/heroes.module';
import { CreatorsModule } from './creators/creators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MarvelFetchModule,
    ComicsModule,
    HeroesModule,
    CreatorsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
