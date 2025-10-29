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
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import {
  FindOneWhitTermAndRelationDto,
  IEmployee,
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

import {
  AddEmploymentRecordDto,
  CreateEmployeeDto,
  CreateEmployeeOnlyDto,
  EmployeeHasPositionDto,
  FilterRelationsDto,
  UpdateEmployeeContractDto,
  UpdateEmployeeDto,
} from './dto';

@ApiTags('Employees 🪪')
@Controller({ path: 'employee', version: '1' })
export class RhEmployeeController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientEmployee: ClientProxy,
  ) {}

  @Post()
  async create(@Body() payload: CreateEmployeeDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'create-employee',
      payload,
    );
  }

  @Post('/add')
  async add(@Body() payload: CreateEmployeeOnlyDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'employee.create-only-employee',
      payload,
    );
  }

  @Post('/addContract')
  async addContract(@Body() payload: AddEmploymentRecordDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'employee.create-employee-contract',
      payload,
    );
  }

  @Get(':name')
  @ApiParam({ name: 'name', type: String, description: 'Name of employee' })
  async getItems(
    @Param('name') name: string | undefined = undefined,
    @Query() pagination: FilterRelationsDto<IEmployee>,
  ) {
    if (name === ' ') name = undefined;

    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'findAll-employees',
      { name, ...pagination },
    );
  }

  @Get('/findOne/:id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of employee' })
  getItem(
    @Param('id') id: string,
    @Query()
    { allRelations, deletes, relations }: FindOneWhitTermAndRelationDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'find-one-employee',
      { term: id, allRelations, deletes, relations },
    );
  }

  @Get('/findByBossId/:boss_id')
  @ApiParam({ name: 'boss_id', type: Number, description: 'Id of boss' })
  getItembyBossId(@Param('boss_id') boss_id: number) {
    return sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'findByBossId-employees',
      { boss_id },
    );
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of employee' })
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEmployeeDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'update-employee',
      { id, ...payload },
    );
  }

  @Patch('contract/:id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of contract' })
  async updateContract(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEmployeeContractDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'update-employee-contract',
      { id, ...payload },
    );
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of employee' })
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'remove-employee',
      { id },
    );
  }

  @Delete('restore/:id')
  async restoreItem(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployee,
      'restore-employee',
      { id },
    );
  }
}

@ApiTags('Asigned Positions 🪪')
@Controller({ path: 'asignedPositions', version: '1' })
export class RhAsignedPositionsController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly clientEmployeeHasPosition: ClientProxy,
  ) {}

  @Post(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of contract' })
  async createAsignedPosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: EmployeeHasPositionDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployeeHasPosition,
      'create-asignedPositions',
      { id, ...payload },
    );
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of contract' })
  async updateAsignedPosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: EmployeeHasPositionDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployeeHasPosition,
      'update-asignedPositions',
      { id, ...payload },
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Id of contract' })
  async getAsignedPositions(
    @Param('id') id: string,
    @Query()
    { allRelations, deletes, relations }: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployeeHasPosition,
      'findByEmployeeId-asignedPositions',
      {
        term: id,
        allRelations,
        deletes,
        relations,
      },
    );
  }

  @Get('verify/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of employeeHasPosition',
  })
  async verifyAsignedPositions(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientEmployeeHasPosition,
      'verifyEmployeeHasPosition-asignedPositions',
      {
        id,
      },
    );
  }
}
