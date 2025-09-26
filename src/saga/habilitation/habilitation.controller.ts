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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  PaginationDto,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from 'src/common';
import { CreateHabilitationDto } from './dto/create-habilitation.dto';
import { SearchDto } from '../generalDto/search.dto';

@ApiTags('Saga/Habilitation  💻🌸')
@Controller({ path: 'habilitation', version: '1' })
export class AdmissionDischargeController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly clientHabilitation: ClientProxy,
  ) {}

  @Post()
  async habilitation(@Body() createHabilitationDto: CreateHabilitationDto) {
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
  async getHabilitationById(
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

  @Post('/ByTerm')
  findByTerm(@Query() pagination: PaginationDto, @Body() searchDto: SearchDto) {
    console.log(searchDto);
    return sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'findByTerm',
      { searchDto, pagination },
    );
  }

  @Get('/findOneHabilitationByAssigment/:id')
  async findOneHabilitationByAssigment(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientHabilitation,
      'findOneHabilitationByAssigment',
      { id },
    );
  }
}
