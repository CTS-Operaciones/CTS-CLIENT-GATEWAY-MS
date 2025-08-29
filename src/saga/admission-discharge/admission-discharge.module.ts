import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import {
  AddRemoveController,
  inventoryHasAddRemoveController,
} from './admission-discharge.controller';
@Module({
  imports: [NatsModule],
  controllers: [AddRemoveController, inventoryHasAddRemoveController],
})
export class AddRemoveModule {}
