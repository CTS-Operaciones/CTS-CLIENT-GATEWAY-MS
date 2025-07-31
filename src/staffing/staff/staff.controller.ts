import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import {
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

import { CreateStaffDto, UpdateStaffDto } from './dto';

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

  @Get('project')
  async findAllEmployeeInProject() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllEmployeeInProject',
      {},
    );
  }

  @Get(':id')
  async findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationRelationsDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllByHeadquarterIdStaff',
      { id, pagination },
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return sendAndHandleRpcExceptionPromise(this.clientProxy, 'updateStaff', {
      id,
      ...updateStaffDto,
    });
  }
}
