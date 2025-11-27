import { Module } from '@nestjs/common';

import { StaffController } from './staff.controller';
import { NatsModule } from '../../transports/nats.module';
import {
  SignatureController,
  SignatureTemplateController,
  TypeSignatureController,
} from './signature.controller';
import { PayrollController } from './payroll.controller';

@Module({
  imports: [NatsModule],
  controllers: [
    StaffController,
    TypeSignatureController,
    SignatureTemplateController,
    SignatureController,
    PayrollController,
  ],
})
export class StaffModule {}
