import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

import { CreateTypeContractDto, UpdateTypeContractDto } from './dto';
import {
  FindOneDto,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contracts Types ✅')
@Controller({ path: 'type-contract', version: '1' })
export class ContractController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async create(@Payload() createTypeContractDto: CreateTypeContractDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createTypeContract',
      createTypeContractDto,
    );
  }

  @Get()
  async findAll(@Payload() pagination: PaginationDto) {
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
