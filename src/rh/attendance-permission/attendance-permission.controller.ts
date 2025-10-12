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
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  NATS_SERVICE,
  RelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import {
  AddJustificationDto,
  CreateAttendancePermissionDto,
  FilterDateDto,
  FindHistoryByEmployeeDto,
  SetStatusOfPermissionDto,
  UpdateAttendancePermissionDto,
} from './dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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

  @Get('generate-docx')
  async generateDocument(@Res() res: Response) {
    try {
      const buffer = await sendAndHandleRpcExceptionPromise<Buffer>(
        this.clientRH,
        'document-generate.rh-permission.docx',
        {},
      );

      res.setHeader(
        'Content-Disposition',
        'attachment; filename=permiso_rh.docx',
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.setHeader('Content-Length', buffer.length);

      res.send(buffer);
    } catch (error) {
      console.error(
        'Error al comunicarse con el microservicio generador',
        error,
      );
      res.status(500).send('Error al generar el documento.');
    }
  }

  @Get('generate-pdf')
  async generateDocumentPDF(@Res() res: Response) {
    try {
      const buffer = await sendAndHandleRpcExceptionPromise<Buffer>(
        this.clientRH,
        'document-generate.rh-permission.pdf',
        {},
      );

      res.setHeader(
        'Content-Disposition',
        'attachment; filename=permiso_rh.pdf',
      );
      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    } catch (error) {
      console.error(
        'Error al comunicarse con el microservicio generador',
        error,
      );
      res.status(500).send('Error al generar el documento.');
    }
  }

  @Get()
  findAll(@Query() pagination: FilterDateDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.findAll',
      pagination,
    );
  }

  @Get('history/employee/:employee_id')
  @ApiParam({ name: 'employee_id', type: Number, description: 'Employee ID' })
  findHistoryByEmployee(
    @Param('employee_id', ParseIntPipe) employee_id: number,
    @Query() query: FindHistoryByEmployeeDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.findHistoryByEmployee',
      { employee_id, ...query },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Attendance Permission ID',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() relations: RelationsDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.findOne',
      { id, relations },
    );
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Attendance Permission ID',
  })
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Attendance Permission ID',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'attendancePermission.remove',
      { id },
    );
  }
}
