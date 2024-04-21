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
import { IComicsCreateDto } from './models/comics.create';
import { IComicsUpdateDto } from './models/comics.update';
import { ErrorResponse, SuccessResponse } from 'src/common/base.response';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quadrinhos')
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
        .json(new SuccessResponse(await this.service.comicById(Math.abs(id))));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao recuperar quadrinho ${id}`));
    }
  }

  @Post()
  async create(@Body() comic: IComicsCreateDto, @Res() res: Response) {
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
    @Body() comic: IComicsUpdateDto,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          new SuccessResponse(
            await this.service.comicsUpdate(Math.abs(id), comic),
          ),
        );
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
        .json(
          new SuccessResponse(await this.service.comicsDelete(Math.abs(id))),
        );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao deletar quadrinho ${id}`));
    }
  }
}
