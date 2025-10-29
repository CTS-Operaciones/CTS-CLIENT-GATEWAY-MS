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
  Auth,
  NATS_SERVICE,
  PaginationDto,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Bonds 💰')
@Controller({ path: 'bond', version: '1' })
export class BondsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly bondsService: ClientProxy,
  ) {}

  // Types Bond
  @Auth('TIPOS_BONOS', 'CREAR')
  @Post('type')
  createType(@Body() createTypeBondDto: CreateTypeBondDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.create',
      createTypeBondDto,
    );
  }

  @Auth('TIPOS_BONOS', 'VER')
  @Get('type')
  findAllTypes(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.findAll',
      pagination,
    );
  }

  @Auth('TIPOS_BONOS', 'VER')
  @Get('type/:id')
  findOneType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.findOne',
      { id },
    );
  }

  @Auth('TIPOS_BONOS', 'EDITAR')
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

  @Auth('TIPOS_BONOS', 'ELIMINAR')
  @Delete('type/:id')
  removeType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.remove',
      { id },
    );
  }

  @Auth('TIPOS_BONOS', 'RESTAURAR')
  @Delete('type/restore/:id')
  restoreType(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.type.restore',
      { id },
    );
  }

  // Description Bond
  @Auth('DESCRIPCION_BONOS', 'CREAR')
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

  @Auth('DESCRIPCION_BONOS', 'VER')
  @Get('description')
  findAllDescriptions(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.findAll',
      pagination,
    );
  }

  @Auth('DESCRIPCION_BONOS', 'VER')
  @Get('description/:id')
  findOneDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.findOne',
      { id },
    );
  }

  @Auth('DESCRIPCION_BONOS', 'EDITAR')
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

  @Auth('DESCRIPCION_BONOS', 'ELIMINAR')
  @Delete('description/:id')
  removeDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.remove',
      { id },
    );
  }

  @Auth('DESCRIPCION_BONOS', 'RESTAURAR')
  @Delete('description/restore/:id')
  restoreDescription(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.description.restore',
      { id },
    );
  }

  // Bond
  @Auth('BONOS', 'CREAR')
  @Post()
  create(@Body() createBondDto: CreateBondDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.create',
      createBondDto,
    );
  }

  @Auth('BONOS', 'VER')
  @Get()
  findAll(@Query() pagination: PaginationRelationsDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bondsService,
      'bond.findAll',
      pagination,
    );
  }

  @Auth('BONOS', 'VER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bond.findOne', {
      id,
    });
  }

  @Auth('BONOS', 'EDITAR')
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

  @Auth('BONOS', 'ELIMINAR')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bond.remove', {
      id,
    });
  }

  @Auth('BONOS', 'RESTAURAR')
  @Delete('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bondsService, 'bond.restore', {
      id,
    });
  }
}
