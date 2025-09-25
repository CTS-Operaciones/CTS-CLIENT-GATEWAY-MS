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
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from 'src/common';

import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateHasAssignDto } from './dto/create-inventory-has-assign.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { SearchDto } from '../generalDto/search.dto';

@ApiTags('Saga/Assignment 💻 🌸')
@Controller({ path: 'assignment', version: '1' })
export class AssigmentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientAssigment: ClientProxy,
  ) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'createAssignment',
      createAssignmentDto,
    );
  }

  @Get()
  findAll(
    @Query()
    pagination: PaginationRelationsDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'findAllAssignments',
      pagination,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id del acta de asignacion',
  })
  async findOne(
    @Param('id') id: string,
    @Query() findOne: FindOneWhitTermAndRelationDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'findOneAssignment',
      { term: id, ...findOne },
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'updateAssignment',
      { id, ...updateAssignmentDto },
    );
  }
  @Post('/ByTerm')
  findByTerm(@Body() searchDto: SearchDto) {
    console.log(searchDto);
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'findByTermRemoveAssignment',
      searchDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return sendAndHandleRpcExceptionPromise(
      this.clientAssigment,
      'removeAssignment',
      { id },
    );
  }
}

@ApiTags('Saga/Inventory Has Assigment 💻🌸')
@Controller({ path: 'inventory-has-assigment', version: '1' })
export class inventoryHasAssignRemoveController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly clientInventoryhasAssign: ClientProxy,
  ) {}
  @Post()
  async assignment(@Body() createInventoryhasAssign: CreateHasAssignDto) {
    console.log(createInventoryhasAssign);
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAssign,
      'createInventoryHasAssign',
      createInventoryhasAssign,
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
      this.clientInventoryhasAssign,
      'findOneInventoryHasAssign',
      { term: id, ...find },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAssign,
      'removeInventoryHasAssign',
      { id },
    );
  }

  @Patch()
  async update(@Body() updateAssignmentHasDto: CreateHasAssignDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientInventoryhasAssign,
      'updateInventoryHasAssigment',
      { ...updateAssignmentHasDto },
    );
  }
}
