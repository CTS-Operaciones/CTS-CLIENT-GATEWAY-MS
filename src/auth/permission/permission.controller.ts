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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import {
  Auth,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiBearerAuth()
@ApiTags('Permission 🔐')
@Controller({ path: 'permission', version: '1' })
export class PermissionController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Auth('PERMISOS', 'CREAR')
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createPermission',
      createPermissionDto,
    );
  }

  @Auth('PERMISOS', 'VER')
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllPermission',
      pagination,
    );
  }

  @Auth('PERMISOS', 'VER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findOnePermission',
      {
        id,
      },
    );
  }

  @Auth('PERMISOS', 'EDITAR')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'updatePermission',
      {
        id,
        ...updatePermissionDto,
      },
    );
  }

  @Auth('PERMISOS', 'ELIMINAR')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'removePermission',
      {
        id,
      },
    );
  }
}
