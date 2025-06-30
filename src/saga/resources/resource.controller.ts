import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto'; 
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ApiTags } from '@nestjs/swagger';
import { send } from 'process';
import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from 'src/common';
import { ClientProxy } from '@nestjs/microservices';
import path from 'path';
import { CreateClasificationDto } from './dto/create-clasification.dto';

@ApiTags('Saga/resources 💻🌸')
@Controller('resources')
export class ResourceController {
  constructor(@Inject(NATS_SERVICE) private readonly clientResource: ClientProxy) { }
  
  @Post()
  async createResource(@Body() createResourceDto: CreateResourceDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientResource,
      'createResource',
      createResourceDto
    )
  }

  @Patch()
  async updateResource(@Param('id', ParseIntPipe) id: number,@Body() updateResourceDto: UpdateResourceDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientResource,
      'updateResource',
      { id, ...updateResourceDto }
    )
  }
}
@ApiTags('Saga/Clasificacion 💻🌸')
@Controller('clasification')
export class ClasificationController {
  constructor(@Inject(NATS_SERVICE) private readonly clientClasification: ClientProxy) { }
  @Post()
  async createClasification(@Body() createClasificationDto: CreateClasificationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientClasification,
      'createClasification',
      createClasificationDto
    )
  }

  @Patch()
  async updateClasification(@Param('id', ParseIntPipe) id: number, @Body() updateClasificationDto: UpdateResourceDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientClasification,
      'updateClasification',
      { id, ...updateClasificationDto }
    )
  }
}
