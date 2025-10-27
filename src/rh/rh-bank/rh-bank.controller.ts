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

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

import {
  Auth,
  NATS_SERVICE,
  PaginationDto,
  sendAndHandleRpcExceptionPromise,
} from '../../common';

@ApiBearerAuth()
@ApiTags('Bank 🪪')
@Controller({ path: 'banks', version: '1' })
export class BankController {
  constructor(@Inject(NATS_SERVICE) private readonly bankClient: ClientProxy) {}

  @Auth('BANCOS', 'CREAR')
  @Post()
  create(@Body() createBankDto: CreateBankDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bankClient,
      'createBank',
      createBankDto,
    );
  }

  @Auth('BANCOS', 'VER')
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return sendAndHandleRpcExceptionPromise(
      this.bankClient,
      'findAllBank',
      pagination,
    );
  }

  @Auth('BANCOS', 'VER')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'findOneBank', {
      id,
    });
  }

  @Auth('BANCOS', 'EDITAR')
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

  @Auth('BANCOS', 'ELIMINAR')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'removeBank', {
      id,
    });
  }

  @Auth('BANCOS', 'RESTAURAR')
  @Delete('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return sendAndHandleRpcExceptionPromise(this.bankClient, 'restoreBank', {
      id,
    });
  }
}
