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
} from './dto/';
import {
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

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
      'bondTypeCreate',
      createTypeBondDto,
    );
  }

  @Get('type')
  findAllTypes(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondTypeFindAll',
      pagination,
    );
  }

  @Get('type/:id')
  findOneType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondTypeFindOne',
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
      'bondTypeUpdate',
      { id, ...updateTypeBondDto },
    );
  }

  @Delete('type/:id')
  removeType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondTypeRemove',
      { id },
    );
  }

  @Delete('type/restore/:id')
  restoreType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondTypeRestore',
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
      'bondDescriptionCreate',
      createDescriptionBondDto,
    );
  }

  @Get('description')
  findAllDescriptions(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondDescriptionFindAll',
      pagination,
    );
  }

  @Get('description/:id')
  findOneDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondDescriptionFindOne',
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
      'bondDescriptionUpdate',
      { id, ...updateDescriptionBondDto },
    );
  }

  @Delete('description/:id')
  removeDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondDescriptionRemove',
      { id },
    );
  }

  @Delete('description/restore/:id')
  restoreDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondDescriptionRestore',
      { id },
    );
  }

  // Bond
  @Post()
  create(@Body() createBondDto: CreateBondDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondCreate',
      createBondDto,
    );
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bondFindAll',
      pagination,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bondFindOne', {
      id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBondDto: UpdateBondDto,
  ) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bondUpdate', {
      id,
      ...updateBondDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bondRemove', {
      id,
    });
  }

  @Delete('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bondRestore', {
      id,
    });
  }
}
