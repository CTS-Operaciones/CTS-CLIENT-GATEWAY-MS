import { Module } from '@nestjs/common';
import { InventoryController, UbicationsController } from './inventory.controller';
import { NatsModule } from 'src/transports/nats.module';
@Module({
  imports: [NatsModule],
  controllers: [
    InventoryController,
    UbicationsController
  ],

})
export class InventoryModule {}
