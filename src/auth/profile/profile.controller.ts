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

import {
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@ApiTags('Profile ✅')
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createProfile',
      createProfileDto,
    );
  }

  @Get()
  async getProfile(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllProfile',
      pagination,
    );
  }

  @Get(':id')
  async getProfileById(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findOneProfile',
      { id },
    );
  }

  @Patch(':id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'updateProfile',
      { id, ...updateProfileDto },
    );
  }

  @Delete(':id')
  async deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'removeProfile',
      { id },
    );
  }
}
