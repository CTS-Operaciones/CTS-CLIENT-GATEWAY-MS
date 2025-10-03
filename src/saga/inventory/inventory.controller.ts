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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  FindOneWhitTermAndRelationDto,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from 'src/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { filter } from 'src/common/interfaces/searchFilter.interface';

@ApiTags('Saga/Inventory 💻🌸')
@Controller({ path: 'inventories', version: '1' })
export class InventoryController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientInventory: ClientProxy,
  ) {}
  @Post()
  async createInventory(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      return await sendAndHandleRpcExceptionPromise(
        this.clientInventory,
        'createInventory',
        createInventoryDto,
      );
    } catch (error) {
      console.log(error);
      throw new RpcException(error.message || 'Error interno del servidor');
    }
  }

  @Get()
  async getInventory(
    @Query() pagination: PaginationDto,
    @Query() filter: filter,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'findAllInventory',
      { pagination, filter },
    );
  }

  @Get(':id')
  async getInventoryById(
    @Param('id') id: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    console.log(id, typeof id);
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'findOneInventory',
      { term: id, ...find },
    );
  }
  @Get('/getInventoryBySede/:id')
  async getInventoryBySedeId(
    @Param('id') id: string,
    @Query()
    pagination: PaginationDto,
  ) {
    console.log(id, typeof id);
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'findBySedeInventory',
      { id, pagination },
    );
  }

  @Get('/getInventoryByProject/:id')
  async getInventoryByProjectId(
    @Param('id') id: string,
    @Query()
    pagination: PaginationDto,
  ) {
    console.log(id, typeof id);
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'findByProjectInventory',
      { id, pagination },
    );
  }
  @Patch(':id')
  async updateInventory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'updateInventory',
      { id, ...updateInventoryDto },
    );
  }

  @Delete(':id')
  async removeInventory(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'removeInventory',
      { id },
    );
  }
}

@ApiTags('Saga/Ubications 💻🌸')
@Controller({ path: 'ubications', version: '1' })
export class UbicationsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientUbications: ClientProxy,
  ) {}

  @Post()
  async createUbication(@Body() createInventoryDto: CreateUbicationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'createUbication',
      createInventoryDto,
    );
  }

  @Get()
  async getUbication() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'findAllUbications',
      {},
    );
  }

  @Get(':id')
  async getUbicationById(@Param('id') id: string) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'findOneUbication',
      { id },
    );
  }

  @Patch(':id')
  async updateUbication(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateUbicationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'updateUbication',
      { id, ...updateInventoryDto },
    );
  }

  @Delete(':id')
  async removeUbication(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'removeUbication',
      { id },
    );
  }
}

@ApiTags('Saga/StateInventories 💻🌸')
@Controller({ path: 'states', version: '1' })
export class StateController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientState: ClientProxy,
  ) {}

  @Get()
  async getState() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'findAllState',
      {},
    );
  }

  @Get(':id')
  async getStateById(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'findOneState',
      { id },
    );
  }
  @Post()
  async createState(@Body() createStateDto: CreateStateDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'createState',
      createStateDto,
    );
  }
  @Patch(':id')
  async updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateStateDto: UpdateStateDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'updateState',
      { id, ...UpdateStateDto },
    );
  }
  @Delete(':id')
  async removeState(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'removeState',
      { id },
    );
  }
}
