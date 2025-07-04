import { Module } from '@nestjs/common';
import { BrandsController, ClasificationController, ModelsController, ResourceController } from './resource.controller';
import { NatsModule } from 'src/transports/nats.module';



@Module({
  imports: [NatsModule],
  controllers: [

    ResourceController,
    ClasificationController,
    BrandsController,
    ModelsController,


  ],
})
export class ResourceModule {}
