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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  Auth,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@ApiBearerAuth()
@ApiTags('Profile 🔐')
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Auth('PERFILES', 'CREAR')
  @Post()
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'createProfile',
      createProfileDto,
    );
  }

  @Auth('PERFILES', 'VER')
  @Get()
  async getProfile(@Query() pagination: PaginationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findAllProfile',
      pagination,
    );
  }

  @Auth('PERFILES', 'VER')
  @Get(':id')
  async getProfileById(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'findOneProfile',
      { id },
    );
  }

  @Auth('PERFILES', 'EDITAR')
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

  @Auth('PERFILES', 'ELIMINAR')
  @Delete(':id')
  async deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'removeProfile',
      { id },
    );
  }
}
