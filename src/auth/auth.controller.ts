import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE, PaginationDto, sendAndHandleRpcExceptionPromise } from '../common';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly clientAuth: ClientProxy) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAuth,
      'createUser',
      createUserDto,
    );
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientAuth,
      'findAllUsers',
      pagination,
    );
  }
}
