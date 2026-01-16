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
import { CreateMantenanceDto } from './dto/create-maintenance.dto';
import { UpdateMantenanceDto} from './dto/update-maintenance.dto';
import { CreateHasMaintenanceDto } from './dto/create-inventory-has-maintenance.dto';
import { searchMaintenanceDto } from '../generalDto/search.dto';
@ApiTags('Maintenance  💻🌸')
@Controller({ path: 'maintenance', version: '1' })
export class MaintenanceController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientMaintenance: ClientProxy,
  ) {}

  @Post()
  async maintenance(@Body() CreateMantenanceDto: CreateMantenanceDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientMaintenance,
      'createMaintenance',
      CreateMantenanceDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientMaintenance,
      'findAllMantenance',
      pagination,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of create maintenance',
  })
  async getMaintenanceById(
    @Param('id') id: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientMaintenance,
      'findOneMaintenance',
      { term: id, ...find },
    );
  }
  @Post('/ByTerm')
  findByTerm(
    @Query() pagination: PaginationDto,
    @Body() searchDto: searchMaintenanceDto,
  ) {
    console.log(searchDto);
    return sendAndHandleRpcExceptionPromise(
      this.clientMaintenance,
      'findByTermMaintenance',
      { searchDto, pagination },
    );
  }

  @Patch(':id')
  async updateMaintenance(
    @Param('id') id: number,
    @Body() updateMaintenance: UpdateMantenanceDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientMaintenance,
      'updateMaintenance',
      { id, ...updateMaintenance },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientMaintenance,
      'removeMaintenance',
      { id },
    );
  }
}
@ApiTags('Saga/Inventory has maintenance 💻🌸')
@Controller({ path: 'inventory-has-maintenance', version: '1' })
export class inventoryHasMaintenanceController {
  @Inject(NATS_SERVICE)
  private readonly clientInventoryhasMaintenance: ClientProxy;
  @Post()
  async inventoryHasmaintenance(
    @Body() CreateHasMaintenanceDto: CreateHasMaintenanceDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasMaintenance,
      'createInventoryHasMaintenance',
      CreateHasMaintenanceDto,
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of maintenance' })
  async getInventoryHasMaintenanceById(
    @Param('id') id: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasMaintenance,
      'findOneInventoryHasMaintenance',
      { term: id, ...find },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasMaintenance,
      'removeInventoryHasMaintenance',
      { id },
    );
  }
  @Patch()
  async update(@Body() updateInventoryHasMaintenance: CreateHasMaintenanceDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasMaintenance,
      'updateInventoryHasMaintenance',
      { ...updateInventoryHasMaintenance },
    );
  }
}
