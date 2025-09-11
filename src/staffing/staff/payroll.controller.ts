import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from '../../common';
import { FindPayrollDto } from './dto';

@ApiTags('Payroll 📊')
@Controller({ path: 'payroll', version: '1' })
export class PayrollController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Get()
  async created(@Query() findPayrollDto: FindPayrollDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientProxy,
      'payroll.getPayrollByDate',
      findPayrollDto,
    );
  }
}
