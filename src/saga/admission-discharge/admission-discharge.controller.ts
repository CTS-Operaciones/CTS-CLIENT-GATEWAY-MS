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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  PaginationDto,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from 'src/common';
import { CreateAdmissionsDischargeDto } from './dto/create-admissions-discharge.dto';
import { SearchDto } from '../generalDto/search.dto';

@ApiTags('Saga/Admission-discharge  💻🌸')
@Controller({ path: 'add-admission-discharge', version: '1' })
export class AdmissionDischargeController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly clientAdmissionDischarge: ClientProxy,
  ) {}

  @Post()
  async admission(
    @Body() createAdmissionDischargeDto: CreateAdmissionsDischargeDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAdmissionDischarge,
      'createAdmissionsDischarge',
      createAdmissionDischargeDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationRelationsDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAdmissionDischarge,
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
      this.clientAdmissionDischarge,
      'findOneAdmissionsDischarge',
      { term: id, ...find },
    );
  }
  @Post('/ByTerm')
  findByTerm(@Query() pagination: PaginationDto, @Body() searchDto: SearchDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAdmissionDischarge,
      'findByTermAdmissionsDischarge',
      { searchDto, pagination },
    );
  }
  @Get('/findOneByAssigment/:id')
  async findOneAdmissionsByAssigment(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAdmissionDischarge,
      'findOneAdmissionsByAssigment',
      { id },
    );
  }
}
