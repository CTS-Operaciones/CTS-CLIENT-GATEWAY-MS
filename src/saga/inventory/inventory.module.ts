import { Module } from '@nestjs/common';
import { InventoryController, StateController, UbicationsController } from './inventory.controller';
import { NatsModule } from 'src/transports/nats.module';
@Module({
  imports: [NatsModule],
  controllers: [
    InventoryController,
    UbicationsController,
    StateController
  ],

})
export class InventoryModule {}
