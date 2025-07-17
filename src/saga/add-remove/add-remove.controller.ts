import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from 'src/common';
import { CreateAddRemoveDto } from './dto/create-add-remove.dto';
import { CreateHasAddRemoveDto } from '../add-remove/dto/create-inventory-has-add-remove.dto';
@ApiTags('add-remove')
@Controller('add-remove')
export class AddRemoveController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientAddRemove: ClientProxy,
  ) {}

  @Post()
  async addRemove(@Body() createAddRemoveDto: CreateAddRemoveDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAddRemove,
      'createAddRemove',
      createAddRemoveDto,
    );
  }

  @Get()
  async findAll() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAddRemove,
      'findAllAddRemove',
      {},
    );
  }

  @Get(':id')
  async getResource(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAddRemove,
      'findOneAddRemove',
      { id },
    );
  }

  @Patch()
  async updateAddRemove(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddRemoveDto: CreateAddRemoveDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAddRemove,
      'updateAddRemove',
      { id, ...updateAddRemoveDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAddRemove,
      'removeAddRemove',
      { id },
    );
  }
}

export class inventoryHasAddRemoveController {
  @Inject(NATS_SERVICE) private readonly clientInventoryhasAdd: ClientProxy;
  @Post()
  async addRemove(@Body() createInventoryhasAdd: CreateHasAddRemoveDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAdd,
      'createInventoryHasAdd',
      createInventoryhasAdd,
    );
  }

  @Get()
  async findAll() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAdd,
      'findOneInventoryHasAdd',
      {},
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAdd,
      'removeInventoryHasAdd',
      { id },
    );
  }
}
  
