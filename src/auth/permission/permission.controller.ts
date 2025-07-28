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

import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import {
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiTags('Permission 🔐')
@Controller({ path: 'permission', version: '1' })
export class PermissionController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createPermission',
      createPermissionDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllPermission',
      pagination,
    );
  }

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
