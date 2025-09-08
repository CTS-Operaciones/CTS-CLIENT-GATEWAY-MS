import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  CreateBondDto,
  CreateDescriptionBondDto,
  CreateTypeBondDto,
  UpdateBondDto,
  UpdateDescriptionBondDto,
  UpdateTypeBondDto,
} from './dto';
import {
  NATS_SERVICE,
  PaginationDto,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bonds 💰')
@Controller({ path: 'bond', version: '1' })
export class BondsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly bondsService: ClientProxy,
  ) {}

  // Types Bond
  @Post('type')
  createType(@Body() createTypeBondDto: CreateTypeBondDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.create',
      createTypeBondDto,
    );
  }

  @Get('type')
  findAllTypes(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.findAll',
      pagination,
    );
  }

  @Get('type/:id')
  findOneType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.findOne',
      { id },
    );
  }

  @Patch('type/:id')
  updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypeBondDto: UpdateTypeBondDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.update',
      { id, ...updateTypeBondDto },
    );
  }

  @Delete('type/:id')
  removeType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.remove',
      { id },
    );
  }

  @Delete('type/restore/:id')
  restoreType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.restore',
      { id },
    );
  }

  // Description Bond

  @Post('description')
  createDescription(
    @Body() createDescriptionBondDto: CreateDescriptionBondDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.create',
      createDescriptionBondDto,
    );
  }

  @Get('description')
  findAllDescriptions(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.findAll',
      pagination,
    );
  }

  @Get('description/:id')
  findOneDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.findOne',
      { id },
    );
  }

  @Patch('description/:id')
  updateDescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDescriptionBondDto: UpdateDescriptionBondDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.update',
      { id, ...updateDescriptionBondDto },
    );
  }

  @Delete('description/:id')
  removeDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.remove',
      { id },
    );
  }

  @Delete('description/restore/:id')
  restoreDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.restore',
      { id },
    );
  }

  // Bond
  @Post()
  create(@Body() createBondDto: CreateBondDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.create',
      createBondDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationRelationsDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.findAll',
      pagination,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bond.findOne', {
      id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBondDto: UpdateBondDto,
  ) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bond.update', {
      id,
      ...updateBondDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bond.remove', {
      id,
    });
  }

  @Delete('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bond.restore', {
      id,
    });
  }
}
