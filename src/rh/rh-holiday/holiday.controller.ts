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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  Auth,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@ApiBearerAuth()
@ApiTags('Holiday 📅')
@Controller({ path: 'holiday', version: '1' })
export class HolidayController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProcy: ClientProxy,
  ) {}

  @Auth('DIAS_FESTIVOS', 'CREAR')
  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.create',
      createHolidayDto,
    );
  }

  @Auth('DIAS_FESTIVOS', 'VER')
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.findAll',
      pagination,
    );
  }

  @Auth('DIAS_FESTIVOS', 'VER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.findOne',
      { id },
    );
  }

  @Auth('DIAS_FESTIVOS', 'EDITAR')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHolidayDto: UpdateHolidayDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.update',
      { id, ...updateHolidayDto },
    );
  }

  @Auth('DIAS_FESTIVOS', 'ELIMINAR')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.remove',
      { id },
    );
  }

  @Auth('DIAS_FESTIVOS', 'RESTAURAR')
  @Delete('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.restore',
      { id },
    );
  }
}
