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

import { ClientProxy } from '@nestjs/microservices';
import { CreateTypeDocumentDto, UpdateTypeDocumentDto } from './dto';
import {
  FindOneDto,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Documents Types 🪪')
@Controller({ path: 'type-document', version: '1' })
export class RhTypeDocumentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly typeDocumentClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createTypeDocumentDto: CreateTypeDocumentDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.typeDocumentClient,
      'createTypeDocument',
      createTypeDocumentDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.typeDocumentClient,
      'findAllTypeDocument',
      pagination,
    );
  }

  @Get(':term')
  async findOne(@Param() findOne: FindOneDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.typeDocumentClient,
      'findOneTypeDocument',
      findOne,
    );
  }

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
