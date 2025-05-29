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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { UpdateRoleDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rols')
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRole: ClientProxy) {}

  @Post()
  async create() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'createRole',
      {},
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'findAllRoles',
      pagination,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'findOneRole',
      { id },
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'updateRole',
      { id, ...updateRoleDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'removeRole',
      { id },
    );
  }

  @Delete('restore/:id')
  async restore(@Param('id') id: string) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'restoreRole',
      { id },
    );
  }
}
