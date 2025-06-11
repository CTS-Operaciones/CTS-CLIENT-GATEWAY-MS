import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import { UpdateHeadquartersDto } from './dto/update-headquarters.dto';

import {
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@Controller('headquarters')
export class HeadquartersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientHeadquarters: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createHeadquartersDto: CreateHeadquartersDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'createHeadquarters',
      createHeadquartersDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'findAllHeadquarters',
      pagination,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'findOneHeadquarters',
      { id },
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHeadquartersDto: UpdateHeadquartersDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'updateHeadquarters',
      { id, ...updateHeadquartersDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'removeHeadquarters',
      { id },
    );
  }
}
