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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  Auth,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@ApiBearerAuth()
@ApiTags('Roles 🔐')
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRole: ClientProxy) {}

  @Auth('ROLES', 'CREAR')
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'createRole',
      createRoleDto,
    );
  }

  @Auth('ROLES', 'VER')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'findAllRole',
      pagination,
    );
  }

  @Auth('ROLES', 'VER')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'findOneRole',
      { id },
    );
  }

  @Auth('ROLES', 'EDITAR')
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

  @Auth('ROLES', 'ELIMINAR')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'removeRole',
      { id },
    );
  }

  @Auth('ROLES', 'RESTAURAR')
  @Delete('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRole,
      'restoreRole',
      { id },
    );
  }
}
