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
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import {
  UpdateAddQuotaEmployeePosition,
  UpdateHeadquartersDto,
} from './dto/update-headquarters.dto';

import {
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiTags('Headquarters 🧾')
@Controller({ path: 'headquarters', version: '1' })
export class HeadquartersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientHeadquarters: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createHeadquartersDto: CreateHeadquartersDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.create',
      createHeadquartersDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationRelationsDto) {
    console.log({ ...pagination });
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.findAll',
      pagination,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.findOne',
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
      'headquarters.update',
      { id, ...updateHeadquartersDto },
    );
  }

  @Put(':id')
  async updateQuotaEmployeeForPosition(
    @Param('id') id: string,
    @Body() updateAddQuotaEmployeePosition: UpdateAddQuotaEmployeePosition,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.updateQuotaEmploye',
      { id, ...updateAddQuotaEmployeePosition },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.remove',
      { id },
    );
  }
}
