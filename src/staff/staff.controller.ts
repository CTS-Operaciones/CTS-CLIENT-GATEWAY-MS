import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import {
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../common';

import { CreateStaffDto } from './dto';

@ApiTags('Staff ⚠️')
@Controller({ path: 'staff', version: '1' })
export class StaffController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createStaff',
      createStaffDto,
    );
  }

  @Get(':id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationRelationsDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllStaff',
      { id, pagination },
    );
  }
}
