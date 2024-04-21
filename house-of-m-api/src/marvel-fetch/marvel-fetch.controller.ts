import { Controller, Get } from '@nestjs/common';
import { MarvelFetchService } from './marvel-fetch.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('fetch marvel data')
@Controller('marvel-fetch')
export class MarvelFetchController {
  constructor(private service: MarvelFetchService) {}

  @Get()
  getMarvelData() {
    const marvelResponse = this.service.getMarvelSerie();
    return marvelResponse;
  }

  @Get('criadores')
  getHouseOfMCreators() {
    return this.service.getCreators();
  }

  @Get('herois')
  getHouseofMHeroes() {
    return this.service.getHeroes();
  }

  @Get('quadrinhos')
  getHouseOfMComics() {
    return this.service.getComics();
  }
}
