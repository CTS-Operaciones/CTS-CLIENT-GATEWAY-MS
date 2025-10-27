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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import {
  NATS_SERVICE,
  sendAndHandleRpcExceptionPromise,
  PaginationRelationsDto,
  FindOneWhitTermAndRelationDto,
  Auth,
} from '../../common';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';

@ApiBearerAuth()
@ApiTags('Departments 🪪')
@Controller({ path: 'department', version: '1' })
export class RhDepartmentController {
  constructor(@Inject(NATS_SERVICE) private readonly clientRH: ClientProxy) {}

  @Auth('DIRECCIONES', 'CREAR')
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'create-department',
      createDepartmentDto,
    );
  }

  @Auth('DIRECCIONES', 'VER')
  @Get()
  async findAllEmployees(@Query() pagination: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-all-department',
      pagination,
    );
  }

  @Auth('DIRECCIONES', 'VER')
  @Get(':term')
  async findOneEmployee(
    @Param('term') term: string,
    @Query()
    find: FindOneWhitTermAndRelationDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'find-one-department',
      { term, ...find },
    );
  }

  @Auth('DIRECCIONES', 'EDITAR')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'update-department',
      { id, ...updateDepartmentDto },
    );
  }

  @Auth('DIRECCIONES', 'ELIMINAR')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'remove-department',
      { id },
    );
  }

  @Auth('DIRECCIONES', 'RESTAURAR')
  @Delete('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientRH,
      'restore-department',
      { id },
    );
  }
}
