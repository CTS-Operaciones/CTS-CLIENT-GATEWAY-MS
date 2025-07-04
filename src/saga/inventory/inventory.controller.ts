import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy} from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from 'src/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@ApiTags('Saga/Inventory 💻🌸')
  @Controller('inventories')
export class InventoryController {
  constructor(@Inject(NATS_SERVICE) private readonly clientInventory: ClientProxy) {}
  @Post()
  async createInventory(@Body() createInventoryDto: CreateInventoryDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'createInventory',
      createInventoryDto
    )
  }

  @Get()
  async getInventory() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'findAllInventory',
      {}
    )
  }

  @Get(':id')
  async getInventoryById(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'findOneInventory',
      { id }
    )
  }
 
  @Patch ()
  async updateInventory(@Body() updateInventoryDto: CreateInventoryDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'updateInventory',
      updateInventoryDto
    )
  } 

  @Delete(':id')
  async removeInventory(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventory,
      'removeInventory',
      { id }
    )
  }

}

@ApiTags('Saga/Ubications 💻🌸')
@Controller('ubications')
export class UbicationsController {
  constructor(@Inject(NATS_SERVICE) private readonly clientUbications: ClientProxy) { }
  
  @Post()
  async createUbication(@Body() createInventoryDto: CreateInventoryDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'createUbication',
      createInventoryDto
    )
  }

  @Get()
  async getUbication() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'findAllUbication',
      {}
    )
  }

  @Get(':id')
  async getUbicationById(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'findOneUbication',
      { id }
    )
  }

  @Patch ()
  async updateUbication(@Body() updateInventoryDto: CreateInventoryDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'updateUbication',
      updateInventoryDto
    )
  }

  @Delete(':id')
  async removeUbication(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUbications,
      'removeUbication',
      { id }
    )
  }

}

@ApiTags('Saga/StateInventories 💻🌸')
@Controller('state')
export class StateController {
  constructor(@Inject(NATS_SERVICE) private readonly clientState: ClientProxy) { }

  @Get()
  async getState() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'findAllState',
      {}
    )
  }

  @Get(':id')
  async getStateById(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'findOneState',
      { id }
    )
  }
  @Post()
  async createState(@Body() createStateDto: CreateStateDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'createState',
      createStateDto
    )
  }
  @Patch()
  async updateState(@Body() UpdateStateDto: CreateStateDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'updateState',
      UpdateStateDto
    )
  }
  @Delete(':id')
  async removeState(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientState,
      'removeState',
      { id }
    )
  }
}