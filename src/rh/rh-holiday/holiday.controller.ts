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
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@ApiTags('Holiday 📅')
@Controller({ path: 'holiday', version: '1' })
export class HolidayController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProcy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.create',
      createHolidayDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.findAll',
      pagination,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.findOne',
      { id },
    );
  }

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

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.remove',
      { id },
    );
  }

  @Delete('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProcy,
      'holiday.restore',
      { id },
    );
  }
}
