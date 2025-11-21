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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreateVacationDto,
  FindHistoryByEmployeeDto,
  SetStatusOfVacationDto,
  UpdateVacationDto,
} from './dto';

import {
  Auth,
  NATS_SERVICE,
  RelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiBearerAuth()
@ApiTags('Vacation 🏖️')
@Controller({ path: 'vacation', version: '1' })
export class RhVacationController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Auth('SOLICITUD_VACACIONES', 'CREAR')
  @Post()
  create(@Body() createRhVacationDto: CreateVacationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.create',
      createRhVacationDto,
    );
  }

  @Auth('SOLICITUD_VACACIONES', 'CREAR')
  @Post('change-status')
  changeStatus(@Body() updateStatus: SetStatusOfVacationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.setStatusOfVacation',
      updateStatus,
    );
  }

  @Auth('SOLICITUD_VACACIONES', 'VER')
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Vacations ID',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() relations: RelationsDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.findOne',
      { id, relations },
    );
  }

  @Auth('SOLICITUD_VACACIONES', 'VER')
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

  @Auth('SOLICITUD_VACACIONES', 'EDITAR')
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

  @Auth('SOLICITUD_VACACIONES', 'ELIMINAR')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'vacation.remove',
      { id },
    );
  }
}
