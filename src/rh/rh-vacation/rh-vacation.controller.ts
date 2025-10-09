import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreateVacationDto,
  FindHistoryByEmployeeDto,
  UpdateVacationDto,
} from './dto';

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

  @Get('history/employee/:employee_id')
  @ApiParam({
    name: 'employee_id',
    type: Number,
    required: true,
    description: 'Employee ID',
  })
  findHistoryByEmployee(
    @Param('employee_id', ParseIntPipe) employee_id: string,
    @Query() pagination: FindHistoryByEmployeeDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.findHistoryByEmployee',
      { employee_id: Number(employee_id) },
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
