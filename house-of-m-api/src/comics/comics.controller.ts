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
import { ComicsService } from './comics.service';
import { IComicsCreate } from './models/comics.create';
import { IComicsUpdate } from './models/comics.update';
import { ErrorResponse, SuccessResponse } from 'src/common/base.response';
import { Response } from 'express';

@Controller('quadrinhos')
export class ComicsController {
  constructor(private service: ComicsService) {}

  @Get()
  async list(@Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new SuccessResponse(await this.service.comicsList()));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new ErrorResponse(error, `Erro ao recuperar lista de quadrinhos `),
        );
    }
  }

  @Get(':id')
  async find(@Param('id') id: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new SuccessResponse(await this.service.comicById(id)));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao recuperar quadrinho ${id}`));
    }
  }

  @Post()
  async create(@Body() comic: IComicsCreate, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .json(new SuccessResponse(await this.service.comicsCreate(comic)));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, 'Erro ao criar novo quadrinho'));
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() comic: IComicsUpdate,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new SuccessResponse(await this.service.comicsUpdate(id, comic)));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao atualizar quadrinho ${id}`));
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new SuccessResponse(await this.service.comicsDelete(id)));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao deletar quadrinho ${id}`));
    }
  }
}
