import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
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

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';
import {
  CheckInDto,
  CheckOutDto,
  CreatePresenceDto,
} from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/updae-presence.dto';
import { FilterFindAllPresenceDto } from './dto/filter-findAll.dto';

@ApiTags('Presence ⚠️')
@Controller({ path: 'presence', version: '1' })
export class PresenceController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post('checkIn')
  checkIn(@Body() checkInDto: CheckInDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.checkIn',
      checkInDto,
    );
  }

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

  @Get()
  findAll(@Query() pagination: FilterFindAllPresenceDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.findAll',
      pagination,
    );
  }

  @Delete(':id')
  remove(@Param() id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.remove',
      { id },
    );
  }
}
