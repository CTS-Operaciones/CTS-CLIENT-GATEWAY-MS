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

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';

import {
  CreateStaffDto,
  FindBossForStaffDto,
  FindStaffInHeadquarterDto,
  FindStaffInProjectDto,
  UpdateStaffDto,
} from './dto';

@ApiTags('Staff 👩‍💼👨‍💼')
@Controller({ path: 'staff', version: '1' })
export class StaffController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

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
    @Query() filters: FindStaffInProjectDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findAll.project',
      { id, filters },
    );
  }

  @Get('headquarter/finalized/:id')
  async findStaffHeadquarterFinalized(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findStaffHeadquarterFinalized',
      { id },
    );
  }

  @Get('headquarter/:id')
  async findAllEmployeeInHeadquarter(
    @Param('id', ParseIntPipe) id: number,
    @Query() filters: FindStaffInHeadquarterDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findAll.headquarter',
      { id, filters },
    );
  }

  @Get('boss/staff')
  async findAllBossStaff(@Query() params: FindBossForStaffDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'staff.findBossForStaff',
      params,
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
