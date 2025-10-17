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
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreatePositionDto, FilterPositionDto, UpdatePositionDto } from './dto';

@ApiTags('Positions 🪪')
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
  async getAllPositions(@Query() pagination: FilterPositionDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-all-positions',
      pagination,
    );
  }

  @Get('list')
  async getAllPlainFormat(@Query() pagination: FilterPositionDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-all-positions-plainformat',
      pagination,
    );
  }

  @Get('headquarter/:id')
  async getPositionsByHeadquarter(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'position.find-all-by-headquarterQuota',
      { id },
    );
  }

  @Get(':term')
  async findOnePosition(
    @Param('term') term: string,
    @Query()
    { relations, allRelations, deletes }: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-one-position',
      { term, relations, allRelations, deletes },
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
