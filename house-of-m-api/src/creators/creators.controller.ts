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
import { CreatorsService } from './creators.service';
import { ICreatorCreateDto } from './models/creator.create';
import { ICreatorUpdateDto } from './models/creator.update';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('criadores')
@Controller('criadores')
export class CreatorsController {
  constructor(private service: CreatorsService) {}

  @Get()
  async list(@Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(new SuccessResponse(await this.service.creatorsList()));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao recuperar lista de criadores`));
    }
  }

  @Get(':id')
  async find(@Param('id') id: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          new SuccessResponse(await this.service.creatorById(Math.abs(id))),
        );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao recuperar criador ${id}`));
    }
  }

  @Post()
  async create(@Body() creator: ICreatorCreateDto, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .json(new SuccessResponse(await this.service.creatorsCreate(creator)));
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, 'Erro ao criar novo criador'));
    }
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() creator: ICreatorUpdateDto,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          new SuccessResponse(
            await this.service.creatorsUpdate(Math.abs(id), creator),
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao atualizar criador ${id}`));
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(
          new SuccessResponse(await this.service.creatorsDelete(Math.abs(id))),
        );
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ErrorResponse(error, `Erro ao deletar criador ${id}`));
    }
  }
}
