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

import {
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateSignatureDto, CreateTypeSignatureDto } from './dto';
import { UpdateTypeSignatureDto } from './dto/update-typeSignature.dto';

@ApiTags('Signature ⚠️')
@Controller({ path: 'signature', version: '1' })
export class SignatureController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async created(@Body() createdSignatureDto: CreateSignatureDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createdSignature',
      createdSignatureDto,
    );
  }
}

@ApiTags('TypeSignature ✅')
@Controller({ path: 'typeSignature', version: '1' })
export class TypeSignatureController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async created(@Body() createTypeSignatureDto: CreateTypeSignatureDto) {
    console.log({ ...createTypeSignatureDto });
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createTypeSignature',
      createTypeSignatureDto,
    );
  }

  @Get()
  async findAll(@Query() paginations: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllTypeSignature',
      paginations,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findOneTypeSignature',
      { id },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypeSignatureDto: UpdateTypeSignatureDto,
  ) {
    console.log(updateTypeSignatureDto, id);
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'updateTypeSignature',
      {
        id,
        ...updateTypeSignatureDto,
      },
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'removeTypeSignature',
      { id },
    );
  }
}
