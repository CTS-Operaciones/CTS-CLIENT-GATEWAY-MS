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

import {
  CreateSignatureDto,
  CreateSignatureTemplateDto,
  CreateTypeSignatureDto,
  UpdateSignatureDto,
} from './dto';

import { UpdateTypeSignatureDto } from './dto/update-typeSignature.dto';
import { UpdateSignatureTemplateDto } from './dto/update-signature-template.dto';

@ApiTags('Signature 🖊️')
@Controller({ path: 'signature', version: '1' })
export class SignatureController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createSignatureDto: CreateSignatureDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.created',
      createSignatureDto,
    );
  }

  @Get()
  async findAll(@Query() paginations: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.findAll',
      paginations,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.findOne',
      { id },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSignatureDto: UpdateSignatureDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.updated',
      { id, ...updateSignatureDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.remove',
      { id },
    );
  }

  @Post('generate-for-document')
  async generateSignaturesForDocument(
    @Body()
    body: {
      reference_table: string;
      reference_id: number;
    },
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.generateForDocument',
      body,
    );
  }
}

@ApiTags('SignatureTemplate 📋')
@Controller({ path: 'signature-template', version: '1' })
export class SignatureTemplateController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createSignatureTemplateDto: CreateSignatureTemplateDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.created',
      createSignatureTemplateDto,
    );
  }

  @Get()
  async findAll(@Query() paginations: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.findAll',
      paginations,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.findOne',
      { id },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSignatureTemplateDto: UpdateSignatureTemplateDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.updated',
      {
        id,
        ...updateSignatureTemplateDto,
      },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.remove',
      { id },
    );
  }
}

@ApiTags('TypeSignature 🧾')
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
      'typeSignature.created',
      createTypeSignatureDto,
    );
  }

  @Get()
  async findAll(@Query() paginations: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'typeSignature.findAll',
      paginations,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'typeSignature.findOne',
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
      'typeSignature.updated',
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
      'typeSignature.remove',
      { id },
    );
  }
}
