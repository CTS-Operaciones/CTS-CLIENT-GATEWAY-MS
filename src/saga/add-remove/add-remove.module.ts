import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import {
  AddRemoveController,
  inventoryHasAddRemoveController,
} from './add-remove.controller';
@Module({
  imports: [NatsModule],
  controllers: [AddRemoveController, inventoryHasAddRemoveController],
})
export class AddRemoveModule {}
