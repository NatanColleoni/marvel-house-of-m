import { Controller, Get } from '@nestjs/common';
import { MarvelFetchService } from './marvel-fetch.service';

@Controller('marvel-fetch')
export class MarvelFetchController {
  constructor(private service: MarvelFetchService) {}

  @Get()
  getMarvelData() {
    const marvelResponse = this.service.getMarvelSerie();
    return marvelResponse;
  }

  @Get('readfile')
  readMarvelFile() {
    this.service.readMarvelFile();
    return '';
  }
}
