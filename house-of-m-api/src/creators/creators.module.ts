import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';

@Module({
  imports: [],
  controllers: [CreatorsController],
  providers: [PrismaService, CreatorsService],
})
export class CreatorsModule {}
