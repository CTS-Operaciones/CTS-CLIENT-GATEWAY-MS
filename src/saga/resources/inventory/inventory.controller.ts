import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy} from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from 'src/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@ApiTags('Saga/Inventory 💻🌸')
@Controller('')
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