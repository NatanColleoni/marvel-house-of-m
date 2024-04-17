import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';

@Module({
  imports: [],
  controllers: [HeroesController],
  providers: [PrismaService, HeroesService],
})
export class HeroesModule {}
