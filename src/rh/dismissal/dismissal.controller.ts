import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

import { CreateDismissalDto } from './dto/create-dismissal.dto';
import {
  FilterDateDismissalDto,
  NATS_SERVICE,
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
  findAll(@Query() pagination: FilterDateDismissalDto) {
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return sendAndHandleRpcExceptionPromise(
  //     this.clientProxy,
  //     'dismissal.remove',
  //     { id },
  //   );
  // }
}
