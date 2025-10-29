import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ClientProxy } from '@nestjs/microservices';
import { CreateTypeDocumentDto, UpdateTypeDocumentDto } from './dto';
import {
  Auth,
  FindOneDto,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiBearerAuth()
@ApiTags('Documents Types 🪪')
@Controller({ path: 'type-document', version: '1' })
export class RhTypeDocumentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly typeDocumentClient: ClientProxy,
  ) {}

  @Auth('TIPOS_DOCUMENTOS', 'CREAR')
  @Post()
  async create(@Body() createTypeDocumentDto: CreateTypeDocumentDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.typeDocumentClient,
      'createTypeDocument',
      createTypeDocumentDto,
    );
  }

  @Auth('TIPOS_DOCUMENTOS', 'VER')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.typeDocumentClient,
      'findAllTypeDocument',
      pagination,
    );
  }

  @Auth('TIPOS_DOCUMENTOS', 'VER')
  @Get(':term')
  async findOne(@Param() findOne: FindOneDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.typeDocumentClient,
      'findOneTypeDocument',
      findOne,
    );
  }

  @Auth('TIPOS_DOCUMENTOS', 'EDITAR')
  @Patch(':id')
  async updated(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypeDocumentDto: UpdateTypeDocumentDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.typeDocumentClient,
      'updateTypeDocument',
      { id, ...updateTypeDocumentDto },
    );
  }
}
