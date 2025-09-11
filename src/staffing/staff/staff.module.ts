import { Module } from '@nestjs/common';

import { StaffController } from './staff.controller';
import { NatsModule } from '../../transports/nats.module';
import {
  SignatureController,
  TypeSignatureController,
} from './signature.controller';
import { PayrollController } from './payroll.controller';

@Module({
  imports: [NatsModule],
  controllers: [
    StaffController,
    TypeSignatureController,
    SignatureController,
    PayrollController,
  ],
})
export class StaffModule {}
