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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateHeadquartersDto } from './dto/create-headquarters.dto';
import {
  UpdateAddQuotaEmployeePosition,
  UpdateHeadquartersDto,
} from './dto/update-headquarters.dto';

import {
  Auth,
  NATS_SERVICE,
  PaginationFilterHeadquartersExternalDto,
  RelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiBearerAuth()
@ApiTags('Headquarters 🧾')
@Controller({ path: 'headquarters', version: '1' })
export class HeadquartersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientHeadquarters: ClientProxy,
  ) {}

  @Auth('SEDES', 'CREAR')
  @Post()
  async create(@Body() createHeadquartersDto: CreateHeadquartersDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.create',
      createHeadquartersDto,
    );
  }

  @Auth('SEDES', 'VER')
  @Get()
  async findAll(@Query() pagination: PaginationFilterHeadquartersExternalDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.findAll',
      pagination,
    );
  }

  @Auth('SEDES', 'VER')
  @Get(':id')
  async findOne(@Param('id') id: number, @Query() relations: RelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.findOne',
      { id, relations },
    );
  }

  @Auth('SEDES', 'EDITAR')
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

  @Auth('SEDES', 'EDITAR')
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

  @Auth('SEDES', 'ELIMINAR')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHeadquarters,
      'headquarters.remove',
      { id },
    );
  }
}
