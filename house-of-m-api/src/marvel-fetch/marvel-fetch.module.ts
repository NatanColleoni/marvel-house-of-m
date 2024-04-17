import { Module } from '@nestjs/common';
import { MarvelFetchController } from './marvel-fetch.controller';
import { HttpModule } from '@nestjs/axios';
import { MarvelFetchService } from './marvel-fetch.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [MarvelFetchController],
  providers: [MarvelFetchService, PrismaService],
})
export class MarvelFetchModule {}
