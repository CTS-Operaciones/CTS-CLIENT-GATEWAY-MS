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
import { ApiTags } from '@nestjs/swagger';

import { CreateTypeContractDto, UpdateTypeContractDto } from './dto';
import {
  FindOneDto,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiTags('Contracts Types 🪪')
@Controller({ path: 'type-contract', version: '1' })
export class ContractController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createTypeContractDto: CreateTypeContractDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createTypeContract',
      createTypeContractDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllTypeContract',
      pagination,
    );
  }

  @Get(':term')
  async findOne(@Param() findOne: FindOneDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findOneTypeContract',
      findOne,
    );
  }

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
