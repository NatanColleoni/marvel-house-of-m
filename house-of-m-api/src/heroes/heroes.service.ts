import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IHeroeCreateDto } from './models/heroes.create';
import { IHeroeUpdateDto } from './models/heroes.update';

@Injectable()
export class HeroesService {
  constructor(private prisma: PrismaService) {}

  async heroesList() {
    return await this.prisma.heroes.findMany();
  }

  async heroeById(id: number) {
    return await this.prisma.heroes.findFirst({
      where: {
        id: id,
      },
    });
  }

  async heroesCreate(heroe: IHeroeCreateDto) {
    return await this.prisma.heroes.create({
      data: {
        name: heroe.name,
        thumbnail: heroe.thumbnail,
        description: heroe.description,
      },
    });
  }

  async heroesUpdate(id: number, heroe: IHeroeUpdateDto) {
    return await this.prisma.heroes.update({
      data: {
        name: heroe.name,
        thumbnail: heroe.thumbnail,
        description: heroe.description,
      },
      where: {
        id: id,
      },
    });
  }

  async heroesDelete(id: number) {
    return await this.prisma.heroes.delete({
      where: {
        id: id,
      },
    });
  }
}
