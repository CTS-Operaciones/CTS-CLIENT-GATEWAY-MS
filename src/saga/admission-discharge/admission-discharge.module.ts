import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import {
  AdmissionDischargeController,
  inventoryHasAddRemoveController,
} from './admission-discharge.controller';
@Module({
  imports: [NatsModule],
  controllers: [AdmissionDischargeController, inventoryHasAddRemoveController],
})
export class AdmissionDischargeModule {}
