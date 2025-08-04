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
  sendAndHandleRpcExceptionPromise,
} from 'src/common';
import { CreateAddRemoveDto } from './dto/create-add-remove.dto';
import { CreateHasAddRemoveDto } from '../add-remove/dto/create-inventory-has-add-remove.dto';
import { UpdateAddRemoveDto } from './dto/update-add-remove.dto';
@ApiTags('add-remove  💻🌸')
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
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of the acta add-remove',
  })
  async getAddRemoveById(
    @Param('id') id: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAddRemove,
      'findOneAddRemove',
      { term: id, ...find },
    );
  }

  @Patch(':id')
  async updateAddRemove(
    @Param('id') id: number,
    @Body() updateAddRemoveDto: UpdateAddRemoveDto,
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
@ApiTags('Saga/Inventory has add-remove  💻🌸')
@Controller('inventory-has-add-remove')
export class inventoryHasAddRemoveController {
  @Inject(NATS_SERVICE) private readonly clientInventoryhasAdd: ClientProxy;
  @Post()
  async addRemove(@Body() createInventoryhasAdd: CreateHasAddRemoveDto) {
    console.log(createInventoryhasAdd);
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAdd,
      'createInventoryHasAdd',
      createInventoryhasAdd,
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id del acta' })
  async getInventoryById(
    @Param('id') id: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAdd,
      'findOneInventoryHasAdd',
      { term: id, ...find },
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
