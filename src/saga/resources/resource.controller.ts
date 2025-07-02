import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { NATS_SERVICE, sendAndHandleRpcExceptionPromise } from 'src/common';
import { CreateClasificationDto } from './dto/create-clasification.dto';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { UpdateClasificationDto } from './dto/update-clasification.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

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
  @Get()
  async getAllResources() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientResource,
      'getAllResources',
      {}
    )
  }

  @Get(':id')
  async getResource(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientResource,
      'getResource',
      { id }
    )
  }
  @Patch()
  async updateResource(@Param('id', ParseIntPipe) id: number, @Body() updateResourceDto: UpdateResourceDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientResource,
      'updateResource',
      { id, ...updateResourceDto }
    )
  }
  @Delete(':id')
  async removeResource(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientResource,
      'removeResource',
      { id }
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

  @Get()
  async getAllClasifications() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientClasification,
      'findAllClasifications',
      {}
    )
  }

  @Get(':id')
  async getClasification(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientClasification,
      'findClasification',
      { id }
    )
  }

  @Patch()
  async updateClasification(@Param('id', ParseIntPipe) id: number, @Body() updateClasificationDto: UpdateClasificationDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientClasification,
      'updateClasification',
      { id, ...updateClasificationDto }
    )
  }

  @Delete(':id')
  async removeClasification(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientClasification,
      'removeClasification',
      { id }
    )
  }
}

@ApiTags('Saga/Brands 💻🌸')
@Controller('brands')
export class BrandsController {
  constructor(@Inject(NATS_SERVICE) private readonly clientBrands: ClientProxy) { }

  @Get()
  async getAllBrands() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientBrands,
      'findAllBrands',
      {}
    )
  }
  @Post()
  async createBrand(@Body() createBrandsDto: CreateBrandDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientBrands,
      'createBrand',
      createBrandsDto
    )
  }

  @Get(':id')
  async getBrand(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientBrands,
      'findBrand',
      { id }
    )
  }

  @Patch()
  async updateBrand(@Param('id', ParseIntPipe) id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientBrands,
      'updateBrand',
      { id, ...updateBrandDto }
    )
  }
  @Delete(':id')
  async removeBrand(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientBrands,
      'removeBrand',
      { id }
    )
  }

}

@ApiTags('Saga/Models 💻🌸')
@Controller('models')
export class ModelsController {
  constructor(@Inject(NATS_SERVICE) private readonly clientModels: ClientProxy) { }
  @Get()
  async getAllModels() {
    return await sendAndHandleRpcExceptionPromise(
      this.clientModels,
      'findAllModels',
      {}
    )
  }
  @Post()
  async createModel(@Body() createModelDto: CreateModelDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientModels,
      'createModel',
      createModelDto
    )
  }

  @Get(':id')
  async getModel(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientModels,
      'findModel',
      { id }
    )
  }

  @Patch()
  async updateModel(@Param('id', ParseIntPipe) id: number, @Body() updateModelDto: UpdateModelDto) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientModels,
      'updateModel',
      { id, ...UpdateModelDto }
    )
  }
  @Delete(':id')
  async removeModel(@Param('id', ParseIntPipe) id: number) {
    return await sendAndHandleRpcExceptionPromise(
      this.clientModels,
      'removeModel',
      { id }
    )
  }
}

