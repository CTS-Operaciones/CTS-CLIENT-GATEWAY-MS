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
import {createAdmissionDischargeDto} from './dto/create-habilitation.dto';

import { UpdateHabilitationDto } from './dto/update-habilitation.dto';

@ApiTags('Saga/Habilitation  💻🌸')
@Controller({ path: 'habilitation', version: '1' })
export class AdmissionDischargeController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly clientHabilitation: ClientProxy,
  ) {}

  @Post()
  async admission(
    @Body() createAdmissionDischargeDto: createAdmissionDischargeDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'createAdmissionsDischarge',
      createAdmissionDischargeDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationRelationsDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'findAllAdmissionsDischarges',
      pagination,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of the acta admission discharge',
  })
  async getAdmissionDischargeById(
    @Param('id') id: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'findOneAdmissionsDischarge',
      { term: id, ...find },
    );
  }

  @Patch(':id')
  async updateAdmissionDischarge(
    @Param('id') id: number,
    @Body() updateAdmissionDisschargeDto: UpdateAdmissionsDischargeDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'updateAdmissionsDischarge',
      { id, ...updateAdmissionDisschargeDto },
    );
  }
}
