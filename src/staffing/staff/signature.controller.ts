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
  Auth,
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

  @Auth('FIRMAS', 'CREAR')
  @Post()
  async create(@Body() createSignatureDto: CreateSignatureDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.created',
      createSignatureDto,
    );
  }

  @Auth('FIRMAS', 'VER')
  @Get()
  async findAll(@Query() paginations: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.findAll',
      paginations,
    );
  }

  @Auth('FIRMAS', 'VER')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.findOne',
      { id },
    );
  }

  @Auth('FIRMAS', 'EDITAR')
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

  @Auth('FIRMAS', 'ELIMINAR')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signature.remove',
      { id },
    );
  }

  @Auth('FIRMAS', 'VER')
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

  @Auth('FIRMAS', 'CREAR')
  @Post()
  async create(@Body() createSignatureTemplateDto: CreateSignatureTemplateDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.created',
      createSignatureTemplateDto,
    );
  }

  @Auth('FIRMAS', 'VER')
  @Get()
  async findAll(@Query() paginations: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.findAll',
      paginations,
    );
  }

  @Auth('FIRMAS', 'VER')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'signatureTemplate.findOne',
      { id },
    );
  }

  @Auth('FIRMAS', 'EDITAR')
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

  @Auth('FIRMAS', 'ELIMINAR')
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

  @Auth('FIRMAS', 'CREAR')
  @Post()
  async created(@Body() createTypeSignatureDto: CreateTypeSignatureDto) {
    console.log({ ...createTypeSignatureDto });
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'typeSignature.created',
      createTypeSignatureDto,
    );
  }

  @Auth('FIRMAS', 'VER')
  @Get()
  async findAll(@Query() paginations: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'typeSignature.findAll',
      paginations,
    );
  }

  @Auth('FIRMAS', 'VER')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'typeSignature.findOne',
      { id },
    );
  }

  @Auth('FIRMAS', 'EDITAR')
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

  @Auth('FIRMAS', 'ELIMINAR')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'typeSignature.remove',
      { id },
    );
  }
}
