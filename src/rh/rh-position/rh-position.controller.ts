import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import {
  FindOneRelationsDto,
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreatePositionDto, UpdatePositionDto } from './dto';

@ApiTags('Positions')
@Controller({ path: 'position', version: '1' })
export class RhPositionController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRH: ClientProxy) {}

  @Post()
  async createPosition(@Body() createPositionDto: CreatePositionDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'create-position',
      createPositionDto,
    );
  }

  @Get()
  async getAllPositions(@Query() pagination: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-all-positions',
      pagination,
    );
  }

  @Get(':term')
  async findOnePosition(
    @Param('term') term: string,
    @Query() { relations }: FindOneRelationsDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-one-position',
      { term, relations },
    );
  }

  @Patch(':id')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'update-position',
      { id, ...updatePositionDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'remove-position',
      { id },
    );
  }

  @Delete('restore/:id')
  async restorePosition(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'restore-position',
      { id },
    );
  }
}
