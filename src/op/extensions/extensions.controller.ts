import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';

import {
  Auth,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiTags('Extensions 🧾')
@Controller({ path: 'extensions', version: '1' })
export class ExtensionsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientExtensions: ClientProxy,
  ) {}

  @Auth('EXTENSIONES', 'CREAR')
  @Post()
  async create(@Body() createExtensionDto: CreateExtensionDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientExtensions,
      'createExtension',
      createExtensionDto,
    );
  }

  @Auth('EXTENSIONES', 'VER')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientExtensions,
      'findAllExtensions',
      pagination,
    );
  }

  @Auth('EXTENSIONES', 'VER')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientExtensions,
      'findOneExtension',
      { id },
    );
  }

  @Auth('EXTENSIONES', 'EDITAR')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExtensionDto: UpdateExtensionDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientExtensions,
      'updateExtension',
      { id, ...updateExtensionDto },
    );
  }

  @Auth('EXTENSIONES', 'ELIMINAR')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientExtensions,
      'removeExtension',
      { id },
    );
  }

  @Auth('EXTENSIONES', 'RESTAURAR')
  @Delete('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientExtensions,
      'restoreExtension',
      { id },
    );
  }
}
