import { Module } from '@nestjs/common';
import { MarvelFetchController } from './marvel-fetch.controller';
import { HttpModule } from '@nestjs/axios';
import { MarvelFetchService } from './marvel-fetch.service';

@Module({
  imports: [HttpModule],
  controllers: [MarvelFetchController],
  providers: [MarvelFetchService],
})
export class MarvelFetchModule {}
