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

import {
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import {
  AddJustificationDto,
  CreateAttendancePermissionDto,
  SetStatusOfPermissionDto,
  UpdateAttendancePermissionDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Attendance Permission 🗓️')
@Controller({ path: 'attendance-permission', version: '1' })
export class AttendancePermissionController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRH: ClientProxy) {}

  @Post()
  create(@Body() createAttendancePermissionDto: CreateAttendancePermissionDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.create',
      createAttendancePermissionDto,
    );
  }

  @Post('change-status')
  setStatus(@Body() setStatusOfPermissionDto: SetStatusOfPermissionDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.setStatusOfPermission',
      setStatusOfPermissionDto,
    );
  }

  @Post('add-justification')
  addJustification(@Body() addJustificationDto: AddJustificationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.addJustificationPresence',
      addJustificationDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationRelationsDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.findAll',
      pagination,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.findOne',
      { id },
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAttemptancePermissionDto: UpdateAttendancePermissionDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.update',
      { id, ...updateAttemptancePermissionDto },
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.remove',
      { id },
    );
  }
}
