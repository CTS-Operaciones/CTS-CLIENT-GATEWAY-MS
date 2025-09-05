import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import { CreateDismissalDto } from './dto/create-dismissal.dto';
import {
  NATS_SERVICE,
  PaginationRelationsDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiTags('Dismissal ⌛')
@Controller({ path: 'dismissal', version: '1' })
export class DismissalController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createDismissalDto: CreateDismissalDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'dismissal.create',
      createDismissalDto,
    );
  }

  @Get()
  findAll(pagination: PaginationRelationsDto) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'dismissal.findAll',
      pagination,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'dismissal.findOne',
      { id },
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDismissalDto: CreateDismissalDto,
  ) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'dismissal.update',
      { id, ...updateDismissalDto },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'dismissal.remove',
      { id },
    );
  }
}
