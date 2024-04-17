import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { readFile, writeFile } from 'fs/promises';
import { environment } from 'src/environment/environment';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MarvelFetchService {
  public serieName: string = 'House of M';
  public serieNumber: number = 855; //house of M 2005 edition

  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async getMarvelSerie() {
    const URL = `${environment.BASE_URL}/series/${this.serieNumber}?&ts=${environment.TS}&apikey=${environment.PUBLIC_KEY}&hash=${environment.HASH}`;

    const { data } = await firstValueFrom(
      this.httpService.get(URL).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw error;
        }),
      ),
    );

    await writeFile('marvel-fetch.json', JSON.stringify(data, null, 2));
    return await this.writeMarvelSerie();
  }

  async getCreators() {
    const { creators } = await this.readMarvelFile();
    await this.prisma.creators.createMany({
      data: creators.items.map((creator) => {
        return { name: creator.name, role: creator.role };
      }),
    });
    return await this.prisma.creators.findMany();
  }

  async getHeroes() {
    const { characters } = await this.readMarvelFile();
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${characters.collectionURI}?&ts=${environment.TS}&apikey=${environment.PUBLIC_KEY}&hash=${environment.HASH}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error('erro ao buscar herois:', error.response.data);
            throw error;
          }),
        ),
    );
    const heroesMapped = data.data.results.map((heroe) => {
      return {
        name: heroe.name,
        description: heroe.description,
        thumbnail: `${heroe.thumbnail.path}.${heroe.thumbnail.extension}`,
      };
    });

    await this.prisma.heroes.createMany({
      data: heroesMapped,
    });

    return await this.prisma.heroes.findMany();
  }

  async getComics() {
    const { comics } = await this.readMarvelFile();
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${comics.collectionURI}?&ts=${environment.TS}&apikey=${environment.PUBLIC_KEY}&hash=${environment.HASH}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error('erro ao buscar comics:', error.response.data);
            throw error;
          }),
        ),
    );
    const comicsMapped = data.data.results.map((comic) => {
      return {
        name: comic.title,
        description: comic.description,
        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        variantDescription: comic.variantDescription,
      };
    });

    await this.prisma.comics.createMany({
      data: comicsMapped,
    });

    return await this.prisma.comics.findMany();
  }

  private async writeMarvelSerie() {
    const data = await this.readMarvelFile();
    const obj: {
      title: string;
      startYear: number;
      endYear: number;
      thumbnail: string;
    } = {
      title: data.title,
      startYear: data.startYear,
      endYear: data.endYear,
      thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`,
    };

    if (
      (await this.prisma.serie.count({
        where: {
          title: obj.title,
        },
      })) <= 0
    )
      return await this.prisma.serie.create({
        data: obj,
      });
  }

  private async readMarvelFile() {
    const teste = JSON.parse(await readFile('marvel-fetch.json', 'utf-8'));
    return teste.data.results[0];
  }
}
