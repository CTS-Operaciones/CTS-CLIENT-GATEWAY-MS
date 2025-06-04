import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateDocumentDto, UpdateDocumentDto } from './dto copy';

import {
  FindOneRelationsDto,
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Documents ❎')
@Controller({ path: 'document', version: '1' })
export class RhDocumentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly documentClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createRhDocumentDto: CreateDocumentDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'createDocument',
      createRhDocumentDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'findAllDocument',
      pagination,
    );
  }

  @Get(':term')
  async findOne(
    @Param('term', ParseIntPipe) id: number,
    @Query() relations: FindOneWhitTermAndRelationDto,
  ) {
    const findOneWhitTermAndRelationDto = {
      ...relations,
      term: id,
    };

    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'findOneDocument',
      findOneWhitTermAndRelationDto,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRhDocumentDto: UpdateDocumentDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'updateDocument',
      { id, ...updateRhDocumentDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.documentClient,
      'removeDocument',
      { id },
    );
  }
}
