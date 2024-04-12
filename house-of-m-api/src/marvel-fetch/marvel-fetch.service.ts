import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { writeFile } from 'fs/promises';

@Injectable()
export class MarvelFetchService {
    public serieName: string = 'House of M';
    public serieNumber: number = 362; //house of M 2006 edition
    constructor(private httpService: HttpService) { }

    async getMarvelSerie() {
        const URL = `${process.env.BASE_URL}/series/${this.serieNumber}?&ts=${process.env.TS}&apikey=${process.env.PUBLIC_KEY}&hash=${process.env.HASH}`
        const { data } = await firstValueFrom(
            this.httpService.get(URL).pipe(
                catchError((error: AxiosError) => {
                    console.error(error.response.data);
                    throw error;
                }),
            )
        );
        await writeFile('marvel-fetch.json', JSON.stringify(data), 'utf-8');
        return data;
    }
}