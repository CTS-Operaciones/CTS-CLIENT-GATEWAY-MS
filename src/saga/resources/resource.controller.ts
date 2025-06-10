import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto'; 
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ApiTags } from '@nestjs/swagger';
import { send } from 'process';
import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from 'src/common';
import { ClientProxy } from '@nestjs/microservices';
import path from 'path';

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
