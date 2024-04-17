import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ErrorResponse, SuccessResponse } from 'src/common/base.response';
import { Response } from 'express';
import { HeroesService } from './heroes.service';
import { IHeroeCreate } from './models/heroes.create';
import { IHeroeUpdate } from './models/heroes.update';

@Controller('herois')
export class HeroesController {
  constructor(private service: HeroesService) {}

  @Get()
  async list(@Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new SuccessResponse(await this.service.heroesList()));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao recuperar lista de heróis`));
    }
  }

  @Get(':id')
  async find(@Param('id') id: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new SuccessResponse(await this.service.heroeById(Math.abs(id))));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao recuperar herói ${id}`));
    }
  }

  @Post()
  async create(@Body() heroe: IHeroeCreate, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .json(new SuccessResponse(await this.service.heroesCreate(heroe)));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, 'Erro ao criar novo herói'));
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() heroe: IHeroeUpdate,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          new SuccessResponse(
            await this.service.heroesUpdate(Math.abs(id), heroe),
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao atualizar herói ${id}`));
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          new SuccessResponse(await this.service.heroesDelete(Math.abs(id))),
        );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao deletar herói ${id}`));
    }
  }
}
