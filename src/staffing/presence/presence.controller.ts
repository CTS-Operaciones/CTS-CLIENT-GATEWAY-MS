import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';
import {
  CheckInDto,
  CheckOutDto,
  UpdatePresenceDto,
  FilterFindAllPresenceDto,
} from './dto';

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

  @Post('checkOut')
  checkOut(@Body() checkOutDto: CheckOutDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.checkOut',
      checkOutDto,
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

  // @Patch(':id')
  // update(@Param() id: number, @Body() updatePresenceDto: UpdatePresenceDto) {
  //   return sendAndHandleRpcExceptionPromise(
  //     this.clientProxy,
  //     'presence.update',
  //     { id, ...updatePresenceDto },
  //   );
  // }

  @Delete(':id')
  remove(@Param() id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'presence.remove',
      { id },
    );
  }
}
