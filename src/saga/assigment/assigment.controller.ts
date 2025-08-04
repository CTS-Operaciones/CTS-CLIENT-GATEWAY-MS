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
import { ApiParam, ApiTags } from '@nestjs/swagger';

import {
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
} from 'src/common';

import {CreateAssignmentDto } from './dto/create-assignment.dto';
import { NumericType } from 'typeorm';


@ApiTags('Saga/Assignment 💻 🌸')
@Controller('assignment')
export class AssigmentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientAssigment: ClientProxy,
  ) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'createAssignment',
      createAssignmentDto,
    );
  }

  
  @Get()
  findAll() {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'findAllAssignments',
      {}
    );
  }

  @Get(':id')
    @ApiParam({ name: 'id', type: Number, description: 'Id del acta de asignacion' })
  async findOne(
    @Param('id') id: string,
    @Query() findOne: FindOneWhitTermAndRelationDto
  
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'findOneAssignment',
      { term:id, ...findOne },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssignmentDto: CreateAssignmentDto
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'updateAssignment',
      { id, ...updateAssignmentDto },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'removeAssignment',
      { id },
    );
  }
}