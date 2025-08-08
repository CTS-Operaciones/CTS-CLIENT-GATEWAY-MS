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
  PaginationDto,
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

  @Get('all')
  async findAll() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findAll',
      {},
    );
  }

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.create',
      createStaffDto,
    );
  }

  @Get('project/:id')
  async findAllEmployeeInProject(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findAll.project',
      { id, pagination },
    );
  }

  @Get('headquarter/:id')
  async findAllEmployeeInHeadquarter(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagination: PaginationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findAll.headquarter',
      { id, pagination },
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return sendAndHandleRpcExceptionPromise(this.clientProxy, 'staff.update', {
      id,
      ...updateStaffDto,
    });
  }
}
