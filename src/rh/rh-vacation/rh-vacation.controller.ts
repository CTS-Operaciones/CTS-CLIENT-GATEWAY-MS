import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import { CreateVacationDto, UpdateVacationDto } from './dto';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';

@ApiTags('Vacation 🏖️')
@Controller({ path: 'vacation', version: '1' })
export class RhVacationController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createRhVacationDto: CreateVacationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.create',
      createRhVacationDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRhVacationDto: UpdateVacationDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.update',
      { id, ...updateRhVacationDto },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.remove',
      { id },
    );
  }
}
