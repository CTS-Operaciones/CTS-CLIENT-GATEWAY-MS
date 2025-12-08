import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  Auth,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CheckInDto, CheckOutDto } from './dto/create-presence.dto';
import {
  FilterFindAllPresenceDto,
  FindStaffPresenceDto,
} from './dto/filter-findAll.dto';

@ApiTags('Presence ⚠️')
@Controller({ path: 'presence', version: '1' })
export class PresenceController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Auth('ASISTENCIA', 'CREAR')
  @Post('checkIn')
  checkIn(@Body() checkInDto: CheckInDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.checkIn',
      checkInDto,
    );
  }

  @Auth('ASISTENCIA', 'CREAR')
  @Post('checkOut/:id')
  checkOut(
    @Param('id', ParseIntPipe) id: number,
    @Body() checkOutDto: CheckOutDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.checkOut',
      { id, ...checkOutDto },
    );
  }

  @Auth('ASISTENCIA', 'VER')
  @Get('asistence')
  findByHeaderquarterAndDate(@Query() payload: FindStaffPresenceDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.findByHeaderquarterAndDate',
      payload,
    );
  }

  @Auth('ASISTENCIA', 'VER')
  @Get()
  findAll(@Query() pagination: FilterFindAllPresenceDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.findAll',
      pagination,
    );
  }

  @Auth('ASISTENCIA', 'ELIMINAR')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.remove',
      { id },
    );
  }
}
