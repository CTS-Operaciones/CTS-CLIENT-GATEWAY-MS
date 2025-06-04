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
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
  FindOneRelationsDto,
  PaginationRelationsDto,
} from '../../common';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';

@ApiTags('Departments ✅')
@Controller({ path: 'department', version: '1' })
export class RhDepartmentController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRH: ClientProxy) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'create-department',
      createDepartmentDto,
    );
  }

  @Get()
  async findAllEmployees(@Query() pagination: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-all-department',
      pagination,
    );
  }

  @Get(':term')
  async findOneEmployee(
    @Param('term') term: string,
    @Query()
    { relations }: FindOneRelationsDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-one-department',
      { term, relations },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'update-department',
      { id, ...updateDepartmentDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'remove-department',
      { id },
    );
  }

  @Delete('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'restore-department',
      { id },
    );
  }
}
