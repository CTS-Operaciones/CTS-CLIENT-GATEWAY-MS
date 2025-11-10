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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  Auth,
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import {
  CreatePositionDto,
  FilterPositionDto,
  UpdatePositionDto,
  UpdateProductionOrderDto,
} from './dto';

@ApiBearerAuth()
@ApiTags('Positions 🪪')
@Controller({ path: 'position', version: '1' })
export class RhPositionController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRH: ClientProxy) {}

  @Auth('PUESTOS', 'CREAR')
  @Post()
  async createPosition(@Body() createPositionDto: CreatePositionDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'create-position',
      createPositionDto,
    );
  }

  @Auth('PUESTOS', 'VER')
  @Get()
  async getAllPositions(@Query() pagination: FilterPositionDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-all-positions',
      pagination,
    );
  }

  @Auth('PUESTOS', 'VER')
  @Get('list')
  async getAllPlainFormat(@Query() pagination: FilterPositionDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-all-positions-plainformat',
      pagination,
    );
  }

  @Auth('PUESTOS', 'VER')
  @Get('headquarter/:id')
  async getPositionsByHeadquarter(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'position.find-all-by-headquarterQuota',
      { id },
    );
  }

  @Auth('PUESTOS', 'CREAR')
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

  @Auth('PUESTOS', 'EDITAR')
  @Patch('production-order')
  async updateProductionOrder(
    @Body() updateProductionOrderDto: UpdateProductionOrderDto,
  ) {
    console.log('updateProductionOrderDto', updateProductionOrderDto);
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'position.update-production-order',
      updateProductionOrderDto,
    );
  }

  @Auth('PUESTOS', 'EDITAR')
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

  @Auth('PUESTOS', 'ELIMINAR')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'remove-position',
      { id },
    );
  }

  @Auth('PUESTOS', 'RESTAURAR')
  @Delete('restore/:id')
  async restorePosition(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'restore-position',
      { id },
    );
  }
}
