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
import { ApiTags } from '@nestjs/swagger';

import { AddRoleProfileDto, CreateUserDto } from './dto';
import {
  FindOneRelationsDto,
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiTags('Users')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly clientUser: ClientProxy) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUser,
      'createUser',
      createUserDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationRelationsDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUser,
      'findAllUser',
      pagination,
    );
  }

  @Get(':term')
  async findOne(
    @Param('term') term: string,
    @Query() { relations }: FindOneRelationsDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUser,
      'findOneUser',
      { term, relations },
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: AddRoleProfileDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUser,
      'updateUser',
      { id, ...updateUserDto },
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUser,
      'removeUser',
      { id },
    );
  }

  @Delete('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientUser,
      'restoreUser',
      { id },
    );
  }
}
