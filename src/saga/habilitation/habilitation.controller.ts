import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from 'src/common';
import { CreateHabilitationDto } from './dto/create-habilitation.dto';

import { UpdateHabilitationDto } from './dto/update-habilitation.dto';

@ApiTags('Saga/Habilitation  💻🌸')
@Controller({ path: 'habilitation', version: '1' })
export class AdmissionDischargeController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly clientHabilitation: ClientProxy,
  ) {}

  @Post()
  async admission(@Body() createHabilitationDto: CreateHabilitationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'createHabilitation',
      createHabilitationDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationRelationsDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'findAllHabilitation',
      pagination,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of the acta',
  })
  async getAdmissionDischargeById(
    @Param('id') id: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'findOneHabilitation',
      { term: id, ...find },
    );
  }

  @Patch(':id')
  async updateHabilitation(
    @Param('id') id: number,
    @Body() updateHabilitationDto: UpdateHabilitationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'updateHabilitation',
      { id, ...updateHabilitationDto },
    );
  }
}
