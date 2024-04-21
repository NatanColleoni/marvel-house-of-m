import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ICreatorUpdateDto } from './models/creator.update';
import { ICreatorCreateDto } from './models/creator.create';

@Injectable()
export class CreatorsService {
  constructor(private prisma: PrismaService) {}

  async creatorsList() {
    return await this.prisma.creators.findMany();
  }

  async creatorById(id: number) {
    return await this.prisma.creators.findFirst({
      where: {
        id: id,
      },
    });
  }

  async creatorsCreate(creator: ICreatorCreateDto) {
    return await this.prisma.creators.create({
      data: {
        name: creator.name,
        role: creator.role,
      },
    });
  }

  async creatorsUpdate(id: number, creator: ICreatorUpdateDto) {
    return await this.prisma.creators.update({
      data: {
        name: creator.name,
        role: creator.role,
      },
      where: {
        id: id,
      },
    });
  }

  async creatorsDelete(id: number) {
    return await this.prisma.creators.delete({
      where: {
        id: id,
      },
    });
  }
}
