import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { AdmissionDischargeController } from './habilitation.controller';
@Module({
  imports: [NatsModule],
  controllers: [AdmissionDischargeController],
})
export class AdmissionDischargeModule {}
