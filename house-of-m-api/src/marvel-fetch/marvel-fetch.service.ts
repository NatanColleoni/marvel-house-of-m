import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { readFile, writeFile } from 'fs/promises';
import { environment } from 'src/environment/environment';

@Injectable()
export class MarvelFetchService {
  public serieName: string = 'House of M';
  public serieNumber: number = 362; //house of M 2006 edition
  constructor(private httpService: HttpService) {}

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

    return data;
  }

  async readMarvelFile() {
    const teste = JSON.parse(await readFile('marvel-fetch.json', 'utf-8'));
    console.log(teste.data.results[0]);
    return teste.data.results[0];
  }
}
