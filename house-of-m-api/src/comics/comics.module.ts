import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';

@Module({
  imports: [],
  controllers: [ComicsController],
  providers: [PrismaService, ComicsService],
})
export class ComicsModule {}
