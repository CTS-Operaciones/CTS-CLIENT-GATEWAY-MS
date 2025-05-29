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
import { ApiTags } from '@nestjs/swagger';

import {
  FindOneRelationsDto,
  IEmployee,
  NATS_SERVICE,
  PaginationFilterStatusDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@ApiTags('Employees')
@Controller({ path: 'employee', version: '1' })
export class RhEmployeeController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientEmployee: ClientProxy,
  ) {}

  @Post()
  async create(@Body() payload: CreateEmployeeDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'create-employee',
      payload,
    );
  }

  @Get()
  async getItems(@Query() pagination: PaginationFilterStatusDto<IEmployee>) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'findAll-employees',
      pagination,
    );
  }

  @Get(':id')
  getItem(
    @Param('id') id: string,
    @Query() { relations }: FindOneRelationsDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'find-one-employee',
      { term: id, relations },
    );
  }

  @Patch(':id')
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEmployeeDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'update-employee',
      { id, ...payload },
    );
  }

  @Delete(':id')
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'remove-employee',
      { id },
    );
  }

  @Delete('restore/:id')
  async restoreItem(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'restore-employee',
      { id },
    );
  }
}
