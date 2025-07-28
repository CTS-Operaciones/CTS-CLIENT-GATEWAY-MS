import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@ApiTags('Roles 🔐')
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRole: ClientProxy) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'createRole',
      createRoleDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'findAllRole',
      pagination,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'findOneRole',
      { id },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const payload = { id, ...updateRoleDto };
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'updateRole',
      payload,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'removeRole',
      { id },
    );
  }

  @Delete('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'restoreRole',
      { id },
    );
  }
}
