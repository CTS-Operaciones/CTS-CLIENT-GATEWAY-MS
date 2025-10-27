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

import { CreateModuleDto, UpdateModuleDto } from './dto';
import {
  Auth,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiBearerAuth()
@ApiTags('Module 🔐')
@Controller({ path: 'module', version: '1' })
export class ModuleController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Auth('MODULOS', 'CREAR')
  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createModule',
      createModuleDto,
    );
  }

  @Auth('MODULOS', 'VER')
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllModule',
      pagination,
    );
  }

  @Auth('MODULOS', 'VER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.clientProxy, 'findOneModule', {
      id,
    });
  }

  @Auth('MODULOS', 'EDITAR')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return sendAndHandleRpcExceptionPromise(this.clientProxy, 'updateModule', {
      id,
      ...updateModuleDto,
    });
  }

  @Auth('MODULOS', 'ELIMINAR')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.clientProxy, 'removeModule', {
      id,
    });
  }
}
