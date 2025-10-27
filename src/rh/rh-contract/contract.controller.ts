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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateTypeContractDto, UpdateTypeContractDto } from './dto';
import {
  Auth,
  FindOneDto,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiBearerAuth()
@ApiTags('Contracts Types 🪪')
@Controller({ path: 'type-contract', version: '1' })
export class ContractController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Auth('CONTRATOS', 'CREAR')
  @Post()
  async create(@Body() createTypeContractDto: CreateTypeContractDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createTypeContract',
      createTypeContractDto,
    );
  }

  @Auth('CONTRATOS', 'VER')
  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllTypeContract',
      pagination,
    );
  }

  @Auth('CONTRATOS', 'VER')
  @Get(':term')
  async findOne(@Param() findOne: FindOneDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findOneTypeContract',
      findOne,
    );
  }

  @Auth('CONTRATOS', 'EDITAR')
  @Patch(':id')
  async updated(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypeContractDto: UpdateTypeContractDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'updateTypeContract',
      { id, ...updateTypeContractDto },
    );
  }
}
