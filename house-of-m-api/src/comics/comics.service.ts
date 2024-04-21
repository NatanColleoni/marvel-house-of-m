import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IComicsCreateDto } from './models/comics.create';
import { IComicsUpdateDto } from './models/comics.update';

@Injectable()
export class ComicsService {
  constructor(private prisma: PrismaService) {}

  async comicsList() {
    return await this.prisma.comics.findMany();
  }

  async comicById(id: number) {
    return await this.prisma.comics.findFirst({
      where: {
        id: id,
      },
    });
  }

  async comicsCreate(comic: IComicsCreateDto) {
    return await this.prisma.comics.create({
      data: {
        name: comic.name,
        variantDescription: comic.variantDescription,
        thumbnail: comic.thumbnail,
        description: comic.description,
      },
    });
  }

  async comicsUpdate(id: number, comic: IComicsUpdateDto) {
    return await this.prisma.comics.update({
      data: {
        name: comic.name,
        variantDescription: comic.variantDescription,
        thumbnail: comic.thumbnail,
        description: comic.description,
      },
      where: {
        id: id,
      },
    });
  }

  async comicsDelete(id: number) {
    return await this.prisma.comics.delete({
      where: {
        id: id,
      },
    });
  }
}
