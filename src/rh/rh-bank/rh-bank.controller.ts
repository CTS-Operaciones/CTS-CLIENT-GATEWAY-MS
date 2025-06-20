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
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bank ✅')
@Controller({ path: 'banks', version: '1' })
export class BankController {
  constructor(@Inject(NATS_SERVICE) private readonly bankClient: ClientProxy) {}

  @Post()
  create(@Body() createBankDto: CreateBankDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bankClient,
      'createBank',
      createBankDto,
    );
  }

  @Get()
  findAll() {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'findAllBank', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'findOneBank', {
      id,
    });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBankDto: UpdateBankDto,
  ) {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'updateBank', {
      id,
      ...updateBankDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'removeBank', {
      id,
    });
  }

  @Delete('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'restoreBank', {
      id,
    });
  }
}
